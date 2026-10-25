import glob
import json
import os
import re
import unicodedata

# Function to convert text to Portuguese Title Case with proper accents
LOWERCASE_WORDS = {"de", "da", "do", "das", "dos", "e", "em", "para", "com", "por", "a", "o", "as", "os", "ao", "aos", "na", "no", "nas", "nos", "à", "às"}
UPPERCASE_ROMAN = {"i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "a", "b", "c", "d", "e", "f", "cic", "ead", "ecp", "ele", "cca", "mec", "eco", "cam", "rf", "tcc", "pd1", "pd2", "demec", "ufrgs"}

def title_case_pt(s: str) -> str:
    if not s or not isinstance(s, str):
        return s
    
    # Pre-clean known byte sequences
    s = s.replace("Ã§", "ç").replace("Ã£", "ã").replace("Ã©", "é").replace("Ãª", "ê")
    s = s.replace("Ã¡", "á").replace("Ã³", "ó").replace("Ãº", "ú").replace("Ã­", "í")
    s = s.replace("Ã\xa0", "à").replace("Ãµ", "õ").replace("Ã¢", "â").replace("Ã´", "ô")
    s = s.replace("Ã‰", "É").replace("Ã“", "Ó").replace("Ãš", "Ú").replace("Ã‡", "Ç")
    s = s.replace("Ãƒ", "Ã").replace("Ã•", "Õ").replace("Ãˆ", "È").replace("Ã€", "À")
    s = s.replace("Â·", "·").replace("Â ", " ").replace("Â", "")
    
    parts = re.split(r'(\s+|[-/–—])', s)
    out = []
    is_start = True
    for p in parts:
        if not p:
            continue
        if re.match(r'^\s+$', p) or p in {'-', '/', '–', '—'}:
            out.append(p)
            if p in {'-', '/', '–', '—'}:
                is_start = True
            continue
        
        low = p.lower()
        if low in UPPERCASE_ROMAN:
            out.append(low.upper())
        elif low in LOWERCASE_WORDS and not is_start:
            out.append(low)
        else:
            out.append(low[:1].upper() + low[1:])
        is_start = False
    
    res = "".join(out)
    res = unicodedata.normalize("NFC", res)
    return res

def clean_value(val):
    if isinstance(val, str):
        if re.match(r'^[A-Z]{3,4}\d{4,5}$', val) or ('/' in val and any(c.isdigit() for c in val)):
            return val
        if val in {"obrigatoria", "eletiva", "ambos", "/1", "/2", "diurno", "noturno"}:
            return val
        return title_case_pt(val)
    elif isinstance(val, list):
        return [clean_value(x) for x in val]
    elif isinstance(val, dict):
        return {k: clean_value(v) for k, v in val.items()}
    return val

def sanitize_course(course_dir: str):
    json_path = os.path.join(course_dir, "curriculum_data.json")
    js_path = os.path.join(course_dir, "curriculum_data.js")
    course_id = os.path.basename(course_dir)

    with open(json_path, "r", encoding="utf-8", errors="replace") as f:
        data = json.load(f)

    data = clean_value(data)

    # 1. ENGENHARIA MECANICA
    if course_id == "engenharia-mecanica":
        discs = data.get("disciplinas", {})
        if "ENG03381" in discs:
            discs["ENG03381"]["min_credits"] = 180
            discs["ENG03381"]["etapa_sugerida"] = 10
            discs["ENG03381"]["originalSemester"] = 10
        if "ENG03399" in discs:
            discs["ENG03399"]["min_credits"] = 150
            discs["ENG03399"]["etapa_sugerida"] = 10
            discs["ENG03399"]["originalSemester"] = 10
        if "ENG03046" in discs:
            discs["ENG03046"]["etapa_sugerida"] = 9
            discs["ENG03046"]["originalSemester"] = 9
        if "ECO02254" in discs:
            discs["ECO02254"]["etapa_sugerida"] = 9
            discs["ECO02254"]["originalSemester"] = 9
        if "ADM01135" in discs:
            discs["ADM01135"]["etapa_sugerida"] = 9
            discs["ADM01135"]["originalSemester"] = 9
        if "ENG03010" in discs:
            discs["ENG03010"]["etapa_sugerida"] = 9
            discs["ENG03010"]["originalSemester"] = 9
        if "MED05011" in discs:
            discs["MED05011"]["etapa_sugerida"] = 10
            discs["MED05011"]["originalSemester"] = 10

        # Alternatives
        if "ENG03112" in discs and "ENG03111" in discs:
            discs["ENG03112"]["is_alternative"] = True
            discs["ENG03112"]["alternativeGroup"] = "Sistemas de Climatização"
            discs["ENG03112"]["alternativeOf"] = "ENG03111"
            discs["ENG03111"]["is_alternative"] = True
            discs["ENG03111"]["alternativeGroup"] = "Sistemas de Climatização"
            discs["ENG03111"]["alternativeOf"] = "ENG03112"

        if "ENG03348" in discs and "ENG03349" in discs:
            discs["ENG03348"]["is_alternative"] = True
            discs["ENG03348"]["alternativeGroup"] = "Sistemas Térmicos e Máquinas Térmicas"
            discs["ENG03348"]["alternativeOf"] = "ENG03349"
            discs["ENG03349"]["is_alternative"] = True
            discs["ENG03349"]["alternativeGroup"] = "Sistemas Térmicos e Máquinas Térmicas"
            discs["ENG03349"]["alternativeOf"] = "ENG03348"

        for code, disc in discs.items():
            if "etapa_sugerida" in disc and "originalSemester" not in disc:
                disc["originalSemester"] = disc["etapa_sugerida"]
            elif "originalSemester" in disc and "etapa_sugerida" not in disc:
                disc["etapa_sugerida"] = disc["originalSemester"]

    # 2. ENGENHARIA DE COMPUTACAO
    elif course_id == "engenharia-computacao":
        discs = data.get("disciplinas", {})
        if "ECP99003" in discs:
            discs["ECP99003"]["min_credits"] = 150
            discs["ECP99003"]["etapa_sugerida"] = 9
            discs["ECP99003"]["originalSemester"] = 9
        if "ECP99004" in discs:
            discs["ECP99004"]["min_credits"] = 180
            discs["ECP99004"]["etapa_sugerida"] = 10
            discs["ECP99004"]["originalSemester"] = 10
        if "ECP99001" in discs:
            discs["ECP99001"]["min_credits"] = 150

    # 3. ENGENHARIA ELETRICA
    elif course_id == "engenharia-eletrica":
        discs = data.get("disciplinas", {})
        if "ELE99003" in discs:
            discs["ELE99003"]["min_credits"] = 180
        if "ELE99004" in discs:
            discs["ELE99004"]["min_credits"] = 180
        if "ELE99001" in discs:
            discs["ELE99001"]["min_credits"] = 180
        if "ELE99002" in discs:
            discs["ELE99002"]["min_credits"] = 180

    # 4. ENGENHARIA DE CONTROLE E AUTOMACAO
    elif course_id == "engenharia-controle-automacao":
        discs = data.get("disciplinas", {})
        if "CCA99002" in discs:
            discs["CCA99002"]["min_credits"] = 160
        if "CCA99003" in discs:
            discs["CCA99003"]["min_credits"] = 180

    # 5. ENGENHARIA DE PRODUCAO
    elif course_id == "engenharia-producao":
        discs = data.get("disciplinas", {})
        if "ENG09091" in discs:
            discs["ENG09091"]["min_credits"] = 160
        if "ENG09092" in discs:
            discs["ENG09092"]["min_credits"] = 180

    # 6. CIENCIAS ECONOMICAS
    elif course_id == "ciencias-economicas":
        for shift in ["diurno", "noturno"]:
            if shift in data and "disciplinas" in data[shift]:
                discs = data[shift]["disciplinas"]
                if "ECO02274" in discs:
                    discs["ECO02274"]["min_credits"] = 100
                if "TRABALHO" in discs:
                    discs["TRABALHO"]["min_credits"] = 140

    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    with open(json_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(json_str + "\n")

    if course_id == "ciencias-economicas":
        js_content = f"""/**
 * Base Curricular Oficial Unificada - Ciências Econômicas (UFRGS)
 * Catálogo Oficial COMGRAD Economia 2026/1 - Modalidades Diurno e Noturno
 */
var ECONOMIA_CURRICULA = {json_str};

// Fallback padrão para inicialização síncrona
var CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
if (typeof globalThis !== 'undefined') {{
  globalThis.ECONOMIA_CURRICULA = ECONOMIA_CURRICULA;
  globalThis.CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
}}
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ ECONOMIA_CURRICULA, CURRICULUM_DATA }};
}}
"""
    else:
        course_display = {
            "engenharia-mecanica": "Engenharia Mecânica",
            "engenharia-controle-automacao": "Engenharia de Controle e Automação",
            "engenharia-producao": "Engenharia de Produção",
            "engenharia-eletrica": "Engenharia Elétrica",
            "engenharia-computacao": "Engenharia de Computação"
        }.get(course_id, course_id)

        js_content = f"""/**
 * Base Curricular Oficial - {course_display} (UFRGS)
 * Catálogo 2026/1
 */
var CURRICULUM_DATA = {json_str};
if (typeof globalThis !== 'undefined') {{
  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;
}}
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ CURRICULUM_DATA }};
}}
"""

    with open(js_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(js_content)
    print(f"Sanitized and synchronized: {course_id}")

def main():
    course_dirs = sorted(glob.glob("dist/*"))
    for d in course_dirs:
        if os.path.isdir(d):
            sanitize_course(d)
    
    temp_inspect = os.path.join("dev_tests", "inspect_curricula.py")
    if os.path.exists(temp_inspect):
        os.remove(temp_inspect)
        
    print("All 6 curriculum distributions successfully updated.")

if __name__ == "__main__":
    main()
