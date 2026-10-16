import json
import re
import shutil
import sys
from pathlib import Path
from bs4 import BeautifulSoup
ROOT = Path(__file__).resolve().parent.parent
DEV_TESTS = ROOT / "dev_tests"
DIST = ROOT / "dist"

STAGE_MAP = {
    15: 1, 112: 2, 209: 3, 306: 4, 403: 5,
    500: 6, 597: 7, 694: 8, 791: 9, 888: 10
}

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

def get_grid_stages(grade_path):
    raw = grade_path.read_bytes()
    soup = BeautifulSoup(raw, "html.parser")
    divs = soup.find_all("div", id=re.compile(r"^ATIV_\d+_\d+"))
    grid_stages = {}
    for d in divs:
        sigla_inp = d.find("input", id=re.compile(r"^SIGLA@@@"))
        if not sigla_inp:
            continue
        sigla = sigla_inp["value"].strip()
        style = d.get("style", "")
        left_m = re.search(r"left:\s*(\d+)px", style)
        left = int(left_m.group(1)) if left_m else 0
        stage = STAGE_MAP.get(left, None)
        if sigla and stage:
            grid_stages[sigla] = stage
    return grid_stages

def parse_full_course(relatorio_path, grade_path, config):
    grid_stages = get_grid_stages(grade_path)
    raw = relatorio_path.read_bytes()
    soup = BeautifulSoup(raw, "html.parser")

    sem_quebra_divs = soup.find_all("div", class_="sem-quebra")
    disciplines = {}

    for div in sem_quebra_divs:
        legend = div.find("legend")
        if not legend:
            continue
        legend_text = legend.get_text(strip=True)
        m_etapa = re.search(r"Etapa\s*(\d+)", legend_text, re.IGNORECASE)
        section_etapa = int(m_etapa.group(1)) if m_etapa else (0 if "sem etapa" in legend_text.lower() else None)
        if section_etapa is None:
            continue

        tables = div.find_all("table", class_="modelo1")
        for table in tables:
            for row in table.find_all("tr"):
                if "Grupo de Alternativas" in row.get_text(" ", strip=True):
                    continue
                cols = row.find_all("td")
                if len(cols) < 5:
                    continue

                code = cols[0].get_text(strip=True)
                if not re.match(r"^[A-Z]{3}\d{4,5}$", code):
                    continue

                name_prereq_col = cols[1]
                spans = name_prereq_col.find_all("span")

                name_copy = BeautifulSoup(str(name_prereq_col), "html.parser")
                for s in name_copy.find_all("span"):
                    s.decompose()
                for br in name_copy.find_all("br"):
                    br.replace_with("\n")
                name_lines = [clean_text(l) for l in name_copy.get_text().split("\n") if clean_text(l)]
                name = name_lines[0] if name_lines else code

                prereqs = []
                min_credits = 0
                for span in spans:
                    span_text = span.get_text(" ", strip=True)
                    p_codes = re.findall(r"\b([A-Z]{3}\d{5})\b", span_text)
                    for pc in p_codes:
                        if pc != code and pc not in prereqs:
                            prereqs.append(pc)
                    if "crédito" in span_text.lower() or "credito" in span_text.lower():
                        num_m = re.search(r"\b(\d{2,3})\b", span_text)
                        if num_m:
                            min_credits = int(num_m.group(1))

                carater = cols[2].get_text(strip=True)
                creditos_str = cols[3].get_text(strip=True)
                ch_str = cols[4].get_text(strip=True)
                che_str = cols[5].get_text(strip=True) if len(cols) > 5 else "0"

                creditos = int(creditos_str) if creditos_str.isdigit() else 0
                ch = int(ch_str) if ch_str.isdigit() else creditos * 15
                che = int(che_str) if che_str.isdigit() else 0

                # Determine suggested stage
                suggested_stage = grid_stages.get(code, section_etapa if section_etapa > 0 else None)

                # Determine type
                if "alternat" in carater.lower():
                    tipo = "alternativa"
                elif "obrigat" in carater.lower():
                    tipo = "obrigatoria"
                else:
                    tipo = "eletiva"

                disciplines[code] = {
                    "codigo": code,
                    "nome": name,
                    "creditos": creditos,
                    "carga_horaria": ch,
                    "horas_extensao": che,
                    "etapa_sugerida": suggested_stage,
                    "tipo": tipo,
                    "prerequisitos": prereqs,
                    "min_credits": min_credits,
                    "periodicidade": "ambos",
                    "alternativeOf": None
                }

    # Add custom capstone disciplines if present in config
    for capstone in config.get("custom_disciplines", []):
        code = capstone["codigo"]
        disciplines[code] = capstone

    # Wire alternative pairs
    for pair in config.get("alt_pairs", []):
        ca, cb = pair["a"], pair["b"]
        if ca in disciplines and cb in disciplines:
            disciplines[ca]["alternativeOf"] = cb
            disciplines[cb]["alternativeOf"] = ca
            # Main alternative stays in stage, secondary goes to bank
            main_code = pair.get("default_main", ca)
            sec_code = cb if main_code == ca else ca
            disciplines[main_code]["tipo"] = "obrigatoria"
            disciplines[sec_code]["tipo"] = "alternativa"
            disciplines[sec_code]["etapa_sugerida"] = None

    # Audit & clean DAG dependencies
    all_codes = set(disciplines.keys())
    for code, d in disciplines.items():
        d["prerequisitos"] = [p for p in d["prerequisitos"] if p in all_codes]

    # Topological sort validation
    in_degree = {c: 0 for c in disciplines}
    adj = {c: [] for c in disciplines}
    for c, d in disciplines.items():
        for p in d["prerequisitos"]:
            adj[p].append(c)
            in_degree[c] += 1

    queue = [c for c, deg in in_degree.items() if deg == 0]
    visited = 0
    while queue:
        curr = queue.pop(0)
        visited += 1
        for nxt in adj[curr]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)

    if visited != len(disciplines):
        print(f"ERROR: Cycle detected in {config['curso']}! Visited {visited}/{len(disciplines)}", file=sys.stderr)
        sys.exit(1)

    print(f"[{config['curso']}] Cleaned & verified {len(disciplines)} disciplines. Zero cycles!")
    return disciplines

def build_simulator_package(config, disciplines):
    folder_name = config["folder"]
    dest_dir = DIST / folder_name
    dest_dir.mkdir(parents=True, exist_ok=True)

    # 1. Prepare curriculum data payload
    total_obrig = sum(d["creditos"] for d in disciplines.values() if d["tipo"] == "obrigatoria")
    ch_obrig = sum(d["carga_horaria"] for d in disciplines.values() if d["tipo"] == "obrigatoria")

    curriculum_payload = {
        "curso": config["curso"],
        "codigo": config["codigo"],
        "habilitacao": config["habilitacao"],
        "instituicao": "UFRGS",
        "versao_catalogo": "2026/1",
        "estatisticas_nominais": {
            "creditos_obrigatorios": config["creditos_obrigatorios"],
            "creditos_eletivos": config["creditos_eletivos"],
            "creditos_complementares": 6,
            "creditos_convertidos": config.get("creditos_convertidos", 12),
            "creditos_totais_diplomacao": config["creditos_totais"],
            "carga_horaria_obrigatoria": config["ch_obrigatoria"],
            "carga_horaria_eletiva": config["ch_eletiva"],
            "carga_horaria_total": config["ch_total"],
            "horas_extensao_diplomacao": config["ch_extensao"]
        },
        "disciplinas": disciplines
    }

    # Write curriculum_data.json
    json_path = dest_dir / "curriculum_data.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(curriculum_payload, f, indent=2, ensure_ascii=False)

    # Write curriculum_data.js
    js_path = dest_dir / "curriculum_data.js"
    js_header = f"/**\n * Base Curricular Oficial - {config['curso']} (UFRGS)\n * Catálogo 2026/1\n */\n"
    js_content = f"{js_header}var CURRICULUM_DATA = {json.dumps(curriculum_payload, indent=2, ensure_ascii=False)};\n\nif (typeof module !== 'undefined' && module.exports) {{\n  module.exports = {{ CURRICULUM_DATA }};\n}}\n"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    # 2. Clone and customize index.html, styles.css, app.js from engenharia-producao
    src_dir = DIST / "engenharia-producao"

    # Copy styles.css verbatim
    shutil.copy2(src_dir / "styles.css", dest_dir / "styles.css")

    # Customize index.html
    html_src = (src_dir / "index.html").read_text(encoding="utf-8")
    html_custom = html_src.replace(
        "Engenharia de Produção UFRGS", f"{config['curso']} UFRGS"
    ).replace(
        "Trajetória Produção", f"Trajetória {config['short_name']}"
    ).replace(
        "Engenharia de Produção • Catálogo 2026/1", f"{config['curso']} • Catálogo 2026/1"
    ).replace(
        'id="stat-obrig-target">210<', f'id="stat-obrig-target">{config["creditos_obrigatorios"]}<'
    ).replace(
        'id="stat-ele-target">20<', f'id="stat-ele-target">{config["creditos_eletivos"]}<'
    ).replace(
        'id="stat-target-credits">236<', f'id="stat-target-credits">{config["creditos_totais"]}<'
    ).replace(
        'Grade: <strong id="stat-credits">0 / 236</strong>', f'Grade: <strong id="stat-credits">0 / {config["creditos_totais"]}</strong>'
    )
    (dest_dir / "index.html").write_text(html_custom, encoding="utf-8")

    # Customize app.js
    app_src = (src_dir / "app.js").read_text(encoding="utf-8")
    app_custom = app_src.replace(
        "Engenharia de Produção (UFRGS)", f"{config['curso']} (UFRGS)"
    ).replace(
        "trajetoria_eng_producao_ufrgs_v1", config["storage_key"]
    ).replace(
        "grade_producao_ufrgs", config["export_prefix"]
    ).replace(
        "Engenharia de Produção", config["curso"]
    ).replace(
        "grade_producao", config["export_prefix"]
    )
    (dest_dir / "app.js").write_text(app_custom, encoding="utf-8")

    print(f"Successfully generated 5 standalone files in dist/{folder_name}/")

if __name__ == "__main__":
    ee_cfg = {
        "curso": "Engenharia Elétrica",
        "short_name": "Elétrica",
        "folder": "engenharia-eletrica",
        "codigo": 323,
        "habilitacao": 76,
        "storage_key": "trajetoria_eng_eletrica_ufrgs_v1",
        "export_prefix": "grade_eletrica_ufrgs",
        "creditos_obrigatorios": 246,
        "creditos_eletivos": 20,
        "creditos_totais": 284,
        "ch_obrigatoria": 3880,
        "ch_eletiva": 300,
        "ch_total": 4345,
        "ch_extensao": 435,
        "creditos_convertidos": 12,
        "alt_pairs": [
            {"a": "FIS01080", "b": "FIS01181", "default_main": "FIS01181"},
            {"a": "ENG03055", "b": "ENG09044", "default_main": "ENG03055"},
            {"a": "ENG03010", "b": "BIO11010", "default_main": "ENG03010"}
        ],
        "custom_disciplines": [
            {
                "codigo": "ELE99003",
                "nome": "PROJETO DE DIPLOMAÇÃO I - ELE (PD1)",
                "creditos": 6,
                "carga_horaria": 90,
                "horas_extensao": 0,
                "etapa_sugerida": 9,
                "tipo": "obrigatoria",
                "prerequisitos": [],
                "min_credits": 180,
                "periodicidade": "ambos",
                "alternativeOf": None
            },
            {
                "codigo": "ELE99004",
                "nome": "PROJETO DE DIPLOMAÇÃO II - ELE (PD2)",
                "creditos": 10,
                "carga_horaria": 150,
                "horas_extensao": 0,
                "etapa_sugerida": 10,
                "tipo": "obrigatoria",
                "prerequisitos": ["ELE99001", "ELE99003"],
                "min_credits": 0,
                "periodicidade": "ambos",
                "alternativeOf": None
            }
        ]
    }

    ecp_cfg = {
        "curso": "Engenharia de Computação",
        "short_name": "Computação",
        "folder": "engenharia-computacao",
        "codigo": 318,
        "habilitacao": 72,
        "storage_key": "trajetoria_eng_computacao_ufrgs_v1",
        "export_prefix": "grade_computacao_ufrgs",
        "creditos_obrigatorios": 148,
        "creditos_eletivos": 46,
        "creditos_totais": 216,
        "ch_obrigatoria": 2460,
        "ch_eletiva": 690,
        "ch_total": 3600,
        "ch_extensao": 360,
        "creditos_convertidos": 16,
        "alt_pairs": [
            {"a": "MAT02219", "b": "MAT02050", "default_main": "MAT02219"}
        ],
        "custom_disciplines": [
            {
                "codigo": "ECP99003",
                "nome": "TRABALHO DE GRADUAÇÃO I - ECP",
                "creditos": 6,
                "carga_horaria": 90,
                "horas_extensao": 0,
                "etapa_sugerida": 9,
                "tipo": "obrigatoria",
                "prerequisitos": [],
                "min_credits": 150,
                "periodicidade": "ambos",
                "alternativeOf": None
            },
            {
                "codigo": "ECP99004",
                "nome": "TRABALHO DE GRADUAÇÃO II - ECP",
                "creditos": 10,
                "carga_horaria": 150,
                "horas_extensao": 0,
                "etapa_sugerida": 10,
                "tipo": "obrigatoria",
                "prerequisitos": ["ECP99001", "ECP99003"],
                "min_credits": 0,
                "periodicidade": "ambos",
                "alternativeOf": None
            }
        ]
    }

    ee_disc = parse_full_course(DEV_TESTS / "ee_relatorio.html", DEV_TESTS / "ee_grade.html", ee_cfg)
    build_simulator_package(ee_cfg, ee_disc)

    ecp_disc = parse_full_course(DEV_TESTS / "ecp_relatorio.html", DEV_TESTS / "ecp_grade.html", ecp_cfg)
    build_simulator_package(ecp_cfg, ecp_disc)
