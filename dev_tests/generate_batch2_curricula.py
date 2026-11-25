"""Generate batch-2 official UFRGS curriculum datasets from live plone.php endpoints.

Produces `curriculum_data.json` and `curriculum_data.js` for 10 new simulators:
  1. ciencia-computacao (305/36/95)
  2. engenharia-civil (317/70/204)
  3. engenharia-quimica (326/79/220)
  4. engenharia-materiais (320/73/208)
  5. engenharia-ambiental (526/135/1)
  6. engenharia-metalurgica (325/78/218)
  7. engenharia-minas (321/74/209)
  8. engenharia-fisica (911/161/1)
  9. engenharia-cartografica-agrimensura (316/202/1)
 10. matematica (4 curricula: lic_diurno, lic_noturno, bach_pura, bach_aplicada w/ 3 FDCs)
"""

from __future__ import annotations

import json
import re
import unicodedata
from collections import deque
from pathlib import Path
from typing import Any

import requests
import urllib3
from bs4 import BeautifulSoup, Tag

BASE_URL = "https://www1.ufrgs.br/PortalEnsino/GraduacaoCurriculos/plone.php"
REPO_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = REPO_ROOT / "dist"

LOWERCASE_WORDS = {
    "de", "da", "do", "das", "dos", "e", "em", "para", "com", "por",
    "a", "o", "as", "os", "ao", "aos", "na", "no", "nas", "nos", "à", "às",
}
UPPERCASE_TOKENS = {
    "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x",
    "b", "c", "d", "f", "cic", "ead", "ecp", "ele", "cca", "mec",
    "eco", "cam", "rf", "tcc", "pd1", "pd2", "demec", "ufrgs",
    "car", "sig", "cad", "gnss", "bim", "ia", "so", "bd", "sql",
    "uml", "clp", "cfd", "ti", "rh", "eng", "min", "mat", "fis", "qui",
}
SUFFIX_LETTERS = {"a", "b", "c", "d", "e", "f", "o"}

MOJIBAKE_RE = re.compile(r"ï¿½|Ã[©ª¡³º­\xa0µ¢´‰“š‡ƒ•ˆ€]|Â·|Â\s")
CODE_RE = re.compile(r"\b([A-Z]{3}\d{4,5})\b")
STAGE_LEGEND_RE = re.compile(r"^Etapa\s+(\d+)$", re.IGNORECASE)
SEM_ETAPA_RE = re.compile(r"^Sem\s+Etapa$", re.IGNORECASE)
VAERE_RE = re.compile(r"^VAERE\d+$", re.IGNORECASE)

SINGLE_TRACK_SPECS: list[dict[str, Any]] = [
    {
        "folder": "ciencia-computacao",
        "curso_nome": "Ciência da Computação",
        "prefix": "CIC",
        "curso": 305,
        "habilitacao": 36,
        "curriculo": 95,
    },
    {
        "folder": "engenharia-civil",
        "curso_nome": "Engenharia Civil",
        "prefix": "CIV",
        "curso": 317,
        "habilitacao": 70,
        "curriculo": 204,
    },
    {
        "folder": "engenharia-quimica",
        "curso_nome": "Engenharia Química",
        "prefix": "QUI",
        "curso": 326,
        "habilitacao": 79,
        "curriculo": 220,
    },
    {
        "folder": "engenharia-materiais",
        "curso_nome": "Engenharia de Materiais",
        "prefix": "EMT",
        "curso": 320,
        "habilitacao": 73,
        "curriculo": 208,
    },
    {
        "folder": "engenharia-ambiental",
        "curso_nome": "Engenharia Ambiental",
        "prefix": "EAM",
        "curso": 526,
        "habilitacao": 135,
        "curriculo": 1,
    },
    {
        "folder": "engenharia-metalurgica",
        "curso_nome": "Engenharia Metalúrgica",
        "prefix": "MET",
        "curso": 325,
        "habilitacao": 78,
        "curriculo": 218,
    },
    {
        "folder": "engenharia-minas",
        "curso_nome": "Engenharia de Minas",
        "prefix": "MIN",
        "curso": 321,
        "habilitacao": 74,
        "curriculo": 209,
    },
    {
        "folder": "engenharia-fisica",
        "curso_nome": "Engenharia Física",
        "prefix": "EFI",
        "curso": 911,
        "habilitacao": 161,
        "curriculo": 1,
    },
    {
        "folder": "engenharia-cartografica-agrimensura",
        "curso_nome": "Engenharia Cartográfica e de Agrimensura",
        "prefix": "CAR",
        "curso": 316,
        "habilitacao": 202,
        "curriculo": 1,
    },
]

MATEMATICA_SPECS: list[dict[str, Any]] = [
    {
        "shift": "lic_diurno",
        "label": "Licenciatura em Matemática (Diurno)",
        "curso_nome": "Matemática",
        "prefix": "MAT",
        "curso": 335,
        "habilitacao": 110,
        "curriculo": 306,
        "hasFdc": False,
    },
    {
        "shift": "lic_noturno",
        "label": "Licenciatura em Matemática (Noturno)",
        "curso_nome": "Matemática",
        "prefix": "MAT",
        "curso": 335,
        "habilitacao": 111,
        "curriculo": 307,
        "hasFdc": False,
    },
    {
        "shift": "bach_pura",
        "label": "Bacharelado — Matemática Pura",
        "curso_nome": "Matemática",
        "prefix": "MAT",
        "curso": 335,
        "habilitacao": 48,
        "curriculo": 146,
        "hasFdc": False,
    },
    {
        "shift": "bach_aplicada",
        "label": "Bacharelado — Matemática Aplicada e Computacional",
        "curso_nome": "Matemática",
        "prefix": "MAT",
        "curso": 335,
        "habilitacao": 48,
        "curriculo": 147,
        "hasFdc": True,
    },
]

FDC_VISUALS = [
    {"id": 1, "cor": "#d97706", "fundo": "#271e14"},
    {"id": 2, "cor": "#10b981", "fundo": "#112622"},
    {"id": 3, "cor": "#8b5cf6", "fundo": "#1e1630"},
]


def title_case_pt(text: str) -> str:
    """Convert uppercase Portuguese catalog strings into clean Title Case."""
    if not text or not isinstance(text, str):
        return text

    s = re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()
    parts = re.split(r"(\s+|[-/–—:()])", s)
    non_empty_indices = [
        idx for idx, p in enumerate(parts)
        if p and not p.isspace() and p not in {"-", "/", "–", "—", ":", "(", ")"}
    ]
    last_word_idx = non_empty_indices[-1] if non_empty_indices else -1

    out: list[str] = []
    is_start = True
    for idx, p in enumerate(parts):
        if not p:
            continue
        if p.isspace() or p in {"-", "/", "–", "—", ":", "(", ")"}:
            out.append(p)
            if p in {"-", "/", "–", "—", ":", "("}:
                is_start = True
            continue

        low = p.lower()
        if (low in SUFFIX_LETTERS and (is_start or idx == last_word_idx)) or low in UPPERCASE_TOKENS:
            out.append(low.upper())
        elif low in LOWERCASE_WORDS and not is_start:
            out.append(low)
        else:
            out.append(low[:1].upper() + low[1:])
        is_start = False

    return unicodedata.normalize("NFC", "".join(out))


def fetch_html(params: dict[str, Any], session: requests.Session) -> str:
    """Fetch plone.php page and decode ISO-8859-1 strictly as Latin-1."""
    try:
        resp = session.get(BASE_URL, params=params, timeout=30, verify=True)
    except requests.exceptions.SSLError:
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
        resp = session.get(BASE_URL, params=params, timeout=30, verify=False)
    resp.raise_for_status()
    return resp.content.decode("latin-1")


def fetch_periodicity_map(
    curso: int, habilitacao: int, curriculo: int, session: requests.Session
) -> dict[str, str]:
    """Compare r=grade across 2026012 and 2026022 to tag single-semester offerings."""
    def get_codes(periodo: str) -> set[str]:
        html = fetch_html(
            {
                "r": "grade",
                "curso": curso,
                "habilitacao": habilitacao,
                "curriculo": curriculo,
                "periodo": periodo,
            },
            session,
        )
        soup = BeautifulSoup(html, "lxml")
        codes: set[str] = set()
        for div in soup.select("div.divAtividade"):
            lbl = div.find("label", class_="labelAtividade")
            if lbl:
                code = lbl.get_text(strip=True)
                if code:
                    codes.add(code)
        return codes

    codes_1 = get_codes("2026012")
    codes_2 = get_codes("2026022")
    pmap: dict[str, str] = {}
    for code in codes_1 - codes_2:
        pmap[code] = "1"
    for code in codes_2 - codes_1:
        pmap[code] = "2"
    return pmap


def parse_moldura_metadata(soup: BeautifulSoup) -> tuple[dict[str, str], dict[str, int]]:
    """Extract course header metadata and exact estatisticas_nominais from div.moldura."""
    molduras = soup.select("div.moldura")
    if len(molduras) < 3:
        raise ValueError(f"Expected >= 3 div.moldura blocks, found {len(molduras)}")

    m0_text = " ".join(molduras[0].stripped_strings)
    m1_text = " ".join(molduras[1].stripped_strings)
    m2_text = " ".join(molduras[2].stripped_strings)

    def extract_text(pattern: str, source: str) -> str:
        m = re.search(pattern, source, re.IGNORECASE)
        return m.group(1).strip() if m else ""

    def extract_int(pattern: str, source: str, default: int = 0) -> int:
        m = re.search(pattern, source, re.IGNORECASE)
        return int(m.group(1)) if m else default

    meta = {
        "curso": extract_text(r"Curso:\s*(.+?)\s*Habilita[çc][ãa]o:", m0_text),
        "habilitacao": extract_text(r"Habilita[çc][ãa]o:\s*(.+?)\s*Curr[íi]culo:", m0_text),
        "curriculo": extract_text(r"Curr[íi]culo:\s*(.+)$", m0_text),
    }

    stats = {
        "creditos_obrigatorios": extract_int(r"Cr[ée]ditos\s+Obrigat[óo]rios:\s*(\d+)", m1_text),
        "creditos_eletivos": extract_int(r"Cr[ée]ditos\s+Eletivos:\s*(\d+)", m1_text),
        "creditos_complementares": extract_int(r"Cr[ée]ditos\s+Complementares:\s*(\d+)", m1_text),
        "creditos_convertidos": extract_int(r"Cr[ée]ditos\s+Convertidos:\s*(\d+)", m1_text),
        "creditos_totais_diplomacao": extract_int(r"Total:\s*(\d+)", m1_text),
        "carga_horaria_obrigatoria": extract_int(r"Carga\s+Hor[áa]ria\s+Obrigat[óo]ria:\s*(\d+)", m2_text),
        "carga_horaria_eletiva": extract_int(r"Carga\s+Hor[áa]ria\s+Eletiva:\s*(\d+)", m2_text),
        "carga_horaria_total": extract_int(r"Total:\s*(\d+)$", m2_text),
        "horas_extensao_diplomacao": extract_int(
            r"Total\s+Horas\s+Extens[ãa]o\s+para\s+Diploma[çc][ãa]o\s*\(CHE\+UCE\):\s*(\d+)",
            m2_text,
        ),
    }
    return meta, stats


def extract_row_title_and_dnf(td1: Tag) -> tuple[str, list[list[tuple[str, Any]]]]:
    """Extract course title and DNF prerequisite clauses from tds[1]."""
    title_parts: list[str] = []
    for child in td1.children:
        if isinstance(child, Tag):
            if child.name == "span":
                break
            if child.name == "br":
                break
            title_parts.append(child.get_text(" ", strip=True))
        else:
            txt = str(child).replace("\xa0", " ").strip()
            if txt:
                title_parts.append(txt)

    raw_title = re.sub(r"\s+", " ", " ".join(title_parts)).strip().rstrip("-").strip()

    disjuncts: list[list[tuple[str, Any]]] = [[]]
    for sp in td1.find_all("span"):
        txt = re.sub(r"\s+", " ", sp.get_text(" ", strip=True).replace("\xa0", " ")).strip()
        if not txt:
            continue
        txt = re.sub(r"^-\s*", "", txt).strip()
        if re.match(r"^ou\b", txt, re.IGNORECASE):
            disjuncts.append([])
            txt = re.sub(r"^ou\s+", "", txt, flags=re.IGNORECASE).strip()
        elif re.match(r"^e\b", txt, re.IGNORECASE):
            txt = re.sub(r"^e\s+", "", txt, flags=re.IGNORECASE).strip()

        m_code = CODE_RE.search(txt)
        if m_code:
            disjuncts[-1].append(("code", m_code.group(1), txt))
            continue

        m_min = re.search(r"Cr[ée]ditos\s+Obrigat[óo]rios\s*-\s*(\d+)", txt, re.IGNORECASE)
        if m_min:
            disjuncts[-1].append(("min_credits", int(m_min.group(1)), txt))
            continue

        m_syn = re.match(r"^(?:TRABALHO|EST[ÁA]GIO)\s*-\s*(.+)$", txt, re.IGNORECASE)
        if m_syn:
            disjuncts[-1].append(("synthetic", m_syn.group(1).strip(), txt))

    non_empty = [d for d in disjuncts if d]
    return raw_title, non_empty


def classify_sem_quebra_legend(sq: Tag) -> tuple[bool, int | None]:
    """Return (should_process, stage_or_none) for a div.sem-quebra block."""
    leg = sq.find("legend")
    if not leg:
        return False, None
    lt = leg.get_text(" ", strip=True)
    m = STAGE_LEGEND_RE.match(lt)
    if m:
        return True, int(m.group(1))
    if SEM_ETAPA_RE.match(lt):
        return True, None
    return False, None


def parse_sem_quebra_sections(
    sections: list[Tag],
    prefix: str,
    reserved_codes: set[str],
    existing_synthetic_by_title: dict[str, str] | None = None,
) -> tuple[list[dict[str, Any]], dict[str, str]]:
    """Parse stage and elective rows from a list of div.sem-quebra blocks."""
    raw_entries: list[dict[str, Any]] = []
    synthetic_by_title: dict[str, str] = dict(existing_synthetic_by_title or {})

    # Pre-collect all explicit course codes in these sections to prevent synthetic collisions
    used_codes = set(reserved_codes)
    for sq in sections:
        table = sq.find("table", class_="modelo1")
        if not table:
            continue
        for tr in table.find_all("tr"):
            tds = tr.find_all("td")
            if len(tds) >= 6:
                code = tds[0].get_text(strip=True)
                if code:
                    used_codes.add(code)

    syn_counter = 1

    def next_synthetic_code(norm_title: str) -> str:
        nonlocal syn_counter
        if norm_title in synthetic_by_title:
            return synthetic_by_title[norm_title]
        while True:
            cand = f"{prefix}99{syn_counter:03d}"
            syn_counter += 1
            if cand not in used_codes:
                used_codes.add(cand)
                synthetic_by_title[norm_title] = cand
                return cand

    for sq in sections:
        ok, stage = classify_sem_quebra_legend(sq)
        if not ok:
            continue
        table = sq.find("table", class_="modelo1")
        if not table:
            continue

        rows = table.find_all("tr")
        i = 0
        while i < len(rows):
            tr = rows[i]
            row_text = tr.get_text(" ", strip=True)

            if "Grupo de Alternativas" in row_text:
                m_ce = re.search(r"\[(\d*)\]\s*Cr[ée]ditos\s+Exigidos", row_text, re.IGNORECASE)
                req_credits = int(m_ce.group(1)) if m_ce and m_ce.group(1) else None
                m_ae = re.search(r"\[(\d*)\]\s*Atividades\s+Exigidas", row_text, re.IGNORECASE)
                req_count = int(m_ae.group(1)) if m_ae and m_ae.group(1) else 1

                group_items: list[dict[str, Any]] = []
                j = i + 1
                while j < len(rows):
                    tds = rows[j].find_all("td")
                    if len(tds) >= 6 and tds[2].get_text(strip=True) == "Alternativa":
                        entry = _build_raw_entry(tds, stage, next_synthetic_code)
                        if entry:
                            group_items.append(entry)
                        j += 1
                    else:
                        break

                if group_items:
                    # Pick promoted items matching req_credits (e.g., MAT01153 4cr in cartografica), else index 0..req_count-1
                    promoted_indices: list[int] = []
                    if req_credits is not None:
                        for idx, item in enumerate(group_items):
                            if item["creditos"] == req_credits and len(promoted_indices) < req_count:
                                promoted_indices.append(idx)
                    if len(promoted_indices) < req_count:
                        for idx in range(len(group_items)):
                            if idx not in promoted_indices and len(promoted_indices) < req_count:
                                promoted_indices.append(idx)

                    alt_partner_map: dict[str, str] = {}
                    if len(group_items) == 2:
                        c0, c1 = group_items[0]["codigo"], group_items[1]["codigo"]
                        alt_partner_map[c0] = c1
                        alt_partner_map[c1] = c0

                    for idx, item in enumerate(group_items):
                        if idx in promoted_indices:
                            item["tipo"] = "obrigatoria"
                            item["etapa_sugerida"] = stage
                        else:
                            item["tipo"] = "eletiva"
                            item["etapa_sugerida"] = None
                        item["alternativeOf"] = alt_partner_map.get(item["codigo"])
                        raw_entries.append(item)

                i = j
                continue

            tds = tr.find_all("td")
            if len(tds) >= 6:
                carater = tds[2].get_text(strip=True)
                if carater in {"Obrigatória", "Eletiva", "Adicional", "Alternativa"}:
                    entry = _build_raw_entry(tds, stage, next_synthetic_code)
                    if entry:
                        if carater == "Obrigatória" and stage is not None:
                            entry["tipo"] = "obrigatoria"
                            entry["etapa_sugerida"] = stage
                        else:
                            entry["tipo"] = "eletiva"
                            entry["etapa_sugerida"] = None
                        entry["alternativeOf"] = None
                        raw_entries.append(entry)
            i += 1

    return raw_entries, synthetic_by_title


def _build_raw_entry(
    tds: list[Tag],
    stage: int | None,
    synthetic_fn: Any,
) -> dict[str, Any] | None:
    raw_code = tds[0].get_text(strip=True)
    if raw_code and VAERE_RE.match(raw_code):
        return None

    raw_title, dnf_disjuncts = extract_row_title_and_dnf(tds[1])
    norm_title = re.sub(r"\s+", " ", raw_title.upper()).strip()
    code = raw_code if raw_code else synthetic_fn(norm_title)

    creditos = int(tds[3].get_text(strip=True) or "0")
    carga_horaria = int(tds[4].get_text(strip=True) or "0")
    che = int(tds[5].get_text(strip=True) or "0")

    return {
        "codigo": code,
        "raw_title": raw_title,
        "norm_title": norm_title,
        "nome": title_case_pt(raw_title),
        "creditos": creditos,
        "carga_horaria": carga_horaria,
        "horas_extensao": che,
        "carga_horaria_extensao": che,
        "stage_raw": stage,
        "dnf_disjuncts": dnf_disjuncts,
        "tipo": "eletiva",
        "etapa_sugerida": None,
        "alternativeOf": None,
    }


def resolve_dnf_prerequisites(
    code: str,
    dnf_disjuncts: list[list[tuple[str, Any, str]]],
    disciplinas_meta: dict[str, dict[str, Any]],
    synthetic_by_title: dict[str, str],
) -> tuple[list[str], int]:
    """Select the canonical non-EAD/mandatory DNF branch and unconditional min_credits."""
    if not dnf_disjuncts:
        return [], 0

    parsed_branches: list[tuple[tuple[int, int, int], list[str], int]] = []
    for idx, clause in enumerate(dnf_disjuncts):
        prereqs: list[str] = []
        min_credits = 0
        demoted_count = 0
        ead_count = 0

        for kind, val, raw_span in clause:
            if kind == "code":
                if val == code:
                    continue
                if val in disciplinas_meta:
                    if val not in prereqs:
                        prereqs.append(val)
                    info = disciplinas_meta[val]
                    if info["tipo"] != "obrigatoria":
                        demoted_count += 1
                    if "EAD" in info["norm_title"] or "EAD" in raw_span.upper():
                        ead_count += 1
            elif kind == "synthetic":
                norm_target = re.sub(r"\s+", " ", val.upper()).strip()
                syn_code = synthetic_by_title.get(norm_target)
                if not syn_code:
                    for k_title, k_code in synthetic_by_title.items():
                        if norm_target in k_title or k_title in norm_target:
                            syn_code = k_code
                            break
                if syn_code and syn_code != code and syn_code not in prereqs:
                    prereqs.append(syn_code)
            elif kind == "min_credits":
                min_credits = max(min_credits, int(val))

        score = (demoted_count, ead_count, idx)
        parsed_branches.append((score, prereqs, min_credits))

    parsed_branches.sort(key=lambda x: x[0])
    _, best_prereqs, best_min_credits = parsed_branches[0]
    return best_prereqs, best_min_credits


def entries_to_disciplinas(
    entries: list[dict[str, Any]],
    periodicity_map: dict[str, str],
    synthetic_by_title: dict[str, str],
) -> dict[str, dict[str, Any]]:
    """Deduplicate raw entries into canonical disciplinas dictionary with resolved prereqs."""
    merged: dict[str, dict[str, Any]] = {}
    for item in entries:
        code = item["codigo"]
        if code not in merged:
            merged[code] = item
        else:
            # Prefer obrigatoria entry over eletiva duplicate if a course appears twice
            if item["tipo"] == "obrigatoria" and merged[code]["tipo"] != "obrigatoria":
                merged[code] = item

    disciplinas: dict[str, dict[str, Any]] = {}
    for code, item in merged.items():
        prereqs, min_credits = resolve_dnf_prerequisites(
            code, item["dnf_disjuncts"], merged, synthetic_by_title
        )
        disciplinas[code] = {
            "codigo": code,
            "nome": item["nome"],
            "creditos": item["creditos"],
            "carga_horaria": item["carga_horaria"],
            "horas_extensao": item["horas_extensao"],
            "carga_horaria_extensao": item["carga_horaria_extensao"],
            "etapa_sugerida": item["etapa_sugerida"],
            "tipo": item["tipo"],
            "prerequisitos": prereqs,
            "corequisitos": [],
            "min_credits": min_credits,
            "periodicidade": periodicity_map.get(code, "ambos"),
            "alternativeOf": item["alternativeOf"],
        }
    return disciplinas


def validate_dag_and_credits(
    label: str,
    disciplinas: dict[str, dict[str, Any]],
    expected_obrig_credits: int,
    fdc_id: str | None = None,
) -> int:
    """Assert exact mandatory credits, zero orphan prereqs, Kahn DAG acyclicity, zero mojibake."""
    codes = set(disciplinas.keys())
    if not codes:
        raise AssertionError(f"[{label}] Empty disciplinas dictionary")

    obrig_credits = 0
    for code, d in disciplinas.items():
        if fdc_id is not None:
            st = d["status_fdc"][fdc_id]
            if st["tipo"] == "obrigatoria":
                obrig_credits += d["creditos"]
        else:
            if d["tipo"] == "obrigatoria":
                obrig_credits += d["creditos"]

        for p in d.get("prerequisitos", []):
            if p not in codes:
                raise AssertionError(f"[{label}] Orphan prerequisite {p} referenced by {code}")
            if p == code:
                raise AssertionError(f"[{label}] Self-prerequisite detected on {code}")

        if MOJIBAKE_RE.search(d["nome"]):
            raise AssertionError(f"[{label}] Mojibake detected in {code}: {d['nome']}")

    if obrig_credits != expected_obrig_credits:
        raise AssertionError(
            f"[{label}] Mandatory credits mismatch: computed {obrig_credits} != nominal {expected_obrig_credits}"
        )

    # Kahn's topological sort
    in_degree = {c: 0 for c in codes}
    adj: dict[str, list[str]] = {c: [] for c in codes}
    for c, d in disciplinas.items():
        for p in d.get("prerequisitos", []):
            adj[p].append(c)
            in_degree[c] += 1

    queue = deque([c for c in codes if in_degree[c] == 0])
    visited = 0
    while queue:
        curr = queue.popleft()
        visited += 1
        for nxt in adj[curr]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)

    if visited != len(codes):
        raise AssertionError(f"[{label}] Cycle detected in DAG: {visited}/{len(codes)} visited")

    return obrig_credits


def scrape_single_track(spec: dict[str, Any], session: requests.Session) -> dict[str, Any]:
    """Scrape a single-track curriculum from r=relatorio + r=grade periodicity."""
    html = fetch_html(
        {
            "r": "relatorio",
            "curso": spec["curso"],
            "habilitacao": spec["habilitacao"],
            "curriculo": spec["curriculo"],
        },
        session,
    )
    soup = BeautifulSoup(html, "lxml")
    meta, stats = parse_moldura_metadata(soup)
    periodicity_map = fetch_periodicity_map(
        spec["curso"], spec["habilitacao"], spec["curriculo"], session
    )

    sections = soup.find_all("div", class_="sem-quebra")
    entries, synthetic_by_title = parse_sem_quebra_sections(
        sections, spec["prefix"], set()
    )
    disciplinas = entries_to_disciplinas(entries, periodicity_map, synthetic_by_title)

    obrig_sum = validate_dag_and_credits(
        spec["curso_nome"], disciplinas, stats["creditos_obrigatorios"]
    )
    stages = [d["etapa_sugerida"] for d in disciplinas.values() if d["etapa_sugerida"]]
    max_stage = max(stages) if stages else 0

    print(
        f"[OK] {spec['curso_nome']} ({spec['curso']}/{spec['habilitacao']}/{spec['curriculo']}): "
        f"{len(disciplinas)} courses | obrig {obrig_sum}/{stats['creditos_obrigatorios']} cr | "
        f"elet {stats['creditos_eletivos']} cr | total {stats['creditos_totais_diplomacao']} cr | "
        f"maxStage {max_stage}"
    )

    return {
        "curso": spec["curso_nome"],
        "codigo": spec["curso"],
        "habilitacao": spec["habilitacao"],
        "curriculo": spec["curriculo"],
        "habilitacao_nome": title_case_pt(meta["habilitacao"]),
        "instituicao": "UFRGS",
        "versao_catalogo": "2026/1",
        "estatisticas_nominais": stats,
        "disciplinas": disciplinas,
    }


def scrape_matematica_bach_aplicada(
    spec: dict[str, Any], session: requests.Session
) -> dict[str, Any]:
    """Scrape Matemática Bacharelado Aplicada e Computacional (335/48/147) with 3 FDC tracks."""
    html = fetch_html(
        {
            "r": "relatorio",
            "curso": spec["curso"],
            "habilitacao": spec["habilitacao"],
            "curriculo": spec["curriculo"],
        },
        session,
    )
    soup = BeautifulSoup(html, "lxml")
    _, stats = parse_moldura_metadata(soup)
    periodicity_map = fetch_periodicity_map(
        spec["curso"], spec["habilitacao"], spec["curriculo"], session
    )

    common_sections = [
        sq for sq in soup.find_all("div", class_="sem-quebra")
        if sq.find_parent("fieldset", class_="fdc") is None
    ]

    fdc_fieldsets: list[tuple[str, str, list[Tag]]] = []
    fdc_idx = 1
    for fs in soup.find_all("fieldset", class_="fdc"):
        leg = fs.find("legend", class_="legend-2")
        leg_name = leg.get_text(" ", strip=True) if leg else ""
        if "Formação Essencial" in leg_name or not fs.find_all("table", class_="modelo1"):
            continue
        fdc_sections = fs.find_all("div", class_="sem-quebra")
        fdc_fieldsets.append((str(fdc_idx), leg_name, fdc_sections))
        fdc_idx += 1

    if len(fdc_fieldsets) != 3:
        raise ValueError(f"Expected 3 active FDC fieldsets in 335/48/147, found {len(fdc_fieldsets)}")

    # Parse common + each FDC independently to preserve per-FDC Caráter, Etapa, and Prereqs
    reserved_codes: set[str] = set()
    for sq in soup.find_all("div", class_="sem-quebra"):
        table = sq.find("table", class_="modelo1")
        if not table:
            continue
        for tr in table.find_all("tr"):
            tds = tr.find_all("td")
            if len(tds) >= 6:
                c = tds[0].get_text(strip=True)
                if c:
                    reserved_codes.add(c)

    common_entries, syn_map = parse_sem_quebra_sections(
        common_sections, spec["prefix"], reserved_codes
    )
    common_disc = entries_to_disciplinas(common_entries, periodicity_map, syn_map)

    per_fdc_discs: dict[str, dict[str, dict[str, Any]]] = {}
    fdcs_meta: list[dict[str, Any]] = []
    for fid_str, raw_name, fdc_secs in fdc_fieldsets:
        vis = FDC_VISUALS[int(fid_str) - 1]
        clean_name = title_case_pt(raw_name)
        fdcs_meta.append({
            "id": int(fid_str),
            "nome": clean_name,
            "descricao": f"Ênfase {clean_name}",
            "cor": vis["cor"],
            "fundo": vis["fundo"],
        })
        f_entries, syn_map = parse_sem_quebra_sections(
            fdc_secs, spec["prefix"], reserved_codes, syn_map
        )
        # Merge common + FDC entries so DNF resolution sees common mandatory courses
        combined_entries = list(common_entries) + f_entries
        per_fdc_discs[fid_str] = entries_to_disciplinas(
            combined_entries, periodicity_map, syn_map
        )

    # Build unified disciplinas dictionary with status_fdc across FDC "1", "2", "3"
    all_codes: list[str] = []
    seen_codes: set[str] = set()
    for fid_str in ("1", "2", "3"):
        for c in per_fdc_discs[fid_str]:
            if c not in seen_codes:
                seen_codes.add(c)
                all_codes.append(c)

    unified: dict[str, dict[str, Any]] = {}
    for code in all_codes:
        # Pick representative metadata from the first FDC where it is obrigatoria, else first present
        rep = None
        for fid_str in ("1", "2", "3"):
            cand = per_fdc_discs[fid_str].get(code)
            if cand and cand["tipo"] == "obrigatoria":
                rep = cand
                break
        if rep is None:
            for fid_str in ("1", "2", "3"):
                if code in per_fdc_discs[fid_str]:
                    rep = per_fdc_discs[fid_str][code]
                    break
        assert rep is not None

        status_fdc: dict[str, dict[str, Any]] = {}
        obrig_fdcs: list[int] = []
        for fid_str in ("1", "2", "3"):
            d_f = per_fdc_discs[fid_str].get(code)
            if d_f:
                status_fdc[fid_str] = {
                    "tipo": d_f["tipo"],
                    "etapa": d_f["etapa_sugerida"],
                }
                if d_f["tipo"] == "obrigatoria":
                    obrig_fdcs.append(int(fid_str))
            else:
                status_fdc[fid_str] = {
                    "tipo": "eletiva",
                    "etapa": None,
                }

        # Preserve common 2-way alternativeOf (e.g., MAT01355 <-> MAT01214)
        alt_of = common_disc[code]["alternativeOf"] if code in common_disc else None
        fdc_especifica = obrig_fdcs[0] if len(obrig_fdcs) == 1 else None
        st1 = status_fdc["1"]

        unified[code] = {
            "codigo": code,
            "nome": rep["nome"],
            "creditos": rep["creditos"],
            "carga_horaria": rep["carga_horaria"],
            "horas_extensao": rep["horas_extensao"],
            "carga_horaria_extensao": rep["carga_horaria_extensao"],
            "etapa_sugerida": st1["etapa"],
            "tipo": st1["tipo"],
            "tipo_padrao": st1["tipo"],
            "fdc_especifica": fdc_especifica,
            "status_fdc": status_fdc,
            "prerequisitos": rep["prerequisitos"],
            "corequisitos": [],
            "min_credits": rep["min_credits"],
            "periodicidade": periodicity_map.get(code, "ambos"),
            "alternativeOf": alt_of,
        }

    for fid_str in ("1", "2", "3"):
        obrig_sum = validate_dag_and_credits(
            f"{spec['label']} [FDC {fid_str}]",
            unified,
            stats["creditos_obrigatorios"],
            fdc_id=fid_str,
        )
        print(
            f"[OK] {spec['label']} FDC {fid_str} ({fdcs_meta[int(fid_str)-1]['nome']}): "
            f"{len(unified)} total courses | obrig {obrig_sum}/{stats['creditos_obrigatorios']} cr"
        )

    stages = [
        d["status_fdc"][fid]["etapa"]
        for d in unified.values()
        for fid in ("1", "2", "3")
        if d["status_fdc"][fid]["etapa"]
    ]
    max_stage = max(stages) if stages else 8

    return {
        "label": spec["label"],
        "shift": spec["shift"],
        "curso": spec["curso_nome"],
        "codigo": spec["curso"],
        "habilitacao": spec["habilitacao"],
        "curriculo": spec["curriculo"],
        "instituicao": "UFRGS",
        "versao_catalogo": "2026/1",
        "totalMandatoryCredits": stats["creditos_obrigatorios"],
        "totalElectiveCredits": stats["creditos_eletivos"],
        "totalTargetCredits": stats["creditos_totais_diplomacao"],
        "maxStage": max_stage,
        "hasFdc": True,
        "fdcs": fdcs_meta,
        "estatisticas_nominais": stats,
        "disciplinas": unified,
    }


def scrape_matematica_track(
    spec: dict[str, Any], session: requests.Session
) -> dict[str, Any]:
    """Scrape a non-FDC Matemática track matching ciencias-economicas container schema."""
    if spec["hasFdc"]:
        return scrape_matematica_bach_aplicada(spec, session)

    base = scrape_single_track(spec, session)
    stats = base["estatisticas_nominais"]
    discs = base["disciplinas"]
    stages = [d["etapa_sugerida"] for d in discs.values() if d["etapa_sugerida"]]
    max_stage = max(stages) if stages else 8

    return {
        "label": spec["label"],
        "shift": spec["shift"],
        "curso": spec["curso_nome"],
        "codigo": spec["curso"],
        "habilitacao": spec["habilitacao"],
        "curriculo": spec["curriculo"],
        "instituicao": "UFRGS",
        "versao_catalogo": "2026/1",
        "totalMandatoryCredits": stats["creditos_obrigatorios"],
        "totalElectiveCredits": stats["creditos_eletivos"],
        "totalTargetCredits": stats["creditos_totais_diplomacao"],
        "maxStage": max_stage,
        "hasFdc": False,
        "estatisticas_nominais": stats,
        "disciplinas": discs,
    }


def write_single_track_bundle(folder: str, payload: dict[str, Any]) -> None:
    """Write UTF-8 without BOM curriculum_data.json and curriculum_data.js."""
    target_dir = DIST_DIR / folder
    target_dir.mkdir(parents=True, exist_ok=True)

    json_str = json.dumps(payload, ensure_ascii=False, indent=2)
    if MOJIBAKE_RE.search(json_str):
        raise AssertionError(f"[{folder}] Mojibake detected in serialized JSON")

    (target_dir / "curriculum_data.json").write_text(json_str + "\n", encoding="utf-8", newline="\n")

    js_str = (
        f"var CURRICULUM_DATA = {json_str};\n\n"
        "if (typeof globalThis !== 'undefined') {\n"
        "  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;\n"
        "}\n"
        "if (typeof module !== 'undefined' && module.exports) {\n"
        "  module.exports = { CURRICULUM_DATA };\n"
        "}\n"
    )
    (target_dir / "curriculum_data.js").write_text(js_str, encoding="utf-8", newline="\n")


def write_matematica_bundle(payload: dict[str, Any]) -> None:
    """Write UTF-8 without BOM dist/matematica/curriculum_data.{json,js}."""
    target_dir = DIST_DIR / "matematica"
    target_dir.mkdir(parents=True, exist_ok=True)

    json_str = json.dumps(payload, ensure_ascii=False, indent=2)
    if MOJIBAKE_RE.search(json_str):
        raise AssertionError("[matematica] Mojibake detected in serialized JSON")

    (target_dir / "curriculum_data.json").write_text(json_str + "\n", encoding="utf-8", newline="\n")

    js_str = (
        f"var MATEMATICA_CURRICULA = {json_str};\n"
        "var CURRICULUM_DATA = MATEMATICA_CURRICULA.lic_diurno;\n\n"
        "if (typeof globalThis !== 'undefined') {\n"
        "  globalThis.MATEMATICA_CURRICULA = MATEMATICA_CURRICULA;\n"
        "  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;\n"
        "}\n"
        "if (typeof module !== 'undefined' && module.exports) {\n"
        "  module.exports = { MATEMATICA_CURRICULA, CURRICULUM_DATA };\n"
        "}\n"
    )
    (target_dir / "curriculum_data.js").write_text(js_str, encoding="utf-8", newline="\n")


def main() -> None:
    session = requests.Session()
    session.headers.update({"User-Agent": "Organogramas-UFRGS-Scraper/2.0"})

    for spec in SINGLE_TRACK_SPECS:
        payload = scrape_single_track(spec, session)
        write_single_track_bundle(spec["folder"], payload)

    matematica_payload: dict[str, Any] = {}
    for mspec in MATEMATICA_SPECS:
        matematica_payload[mspec["shift"]] = scrape_matematica_track(mspec, session)
    write_matematica_bundle(matematica_payload)

    print("\nALL 13 CURRICULA GENERATED AND SELF-VERIFIED SUCCESSFULLY.")


if __name__ == "__main__":
    main()
