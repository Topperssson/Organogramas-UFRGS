import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
dist_dir = ROOT / "dist" / "ciencias-economicas"
html_path = dist_dir / "index.html"
css_path = dist_dir / "styles.css"
app_path = dist_dir / "app.js"

# 1. Adapt index.html
html = html_path.read_text(encoding="utf-8")

# Title
html = re.sub(
    r"<title>.*?</title>",
    "<title>Simulador de Trajetória Acadêmica | Ciências Econômicas UFRGS</title>",
    html,
    count=1
)

# Brand text & header shift selector
old_brand_text = """          <div class="brand-text">
            <h1>Trajetória Produção <span class="badge-ufrgs">UFRGS</span></h1>
            <p class="subtitle">Engenharia de Produção • Catálogo 2026/1</p>
          </div>"""

new_brand_text = """          <div class="brand-text">
            <h1>Trajetória Economia <span class="badge-ufrgs">UFRGS</span></h1>
            <div class="shift-selector-wrapper">
              <select id="shift-select" class="shift-select" aria-label="Modalidade do Curso de Ciências Econômicas">
                <option value="diurno">☀️ Ciências Econômicas • Diurno</option>
                <option value="noturno">🌙 Ciências Econômicas • Noturno</option>
              </select>
            </div>
          </div>"""

if old_brand_text in html:
    html = html.replace(old_brand_text, new_brand_text)
else:
    # Use regex replacement if whitespace differed
    html = re.sub(
        r'<div class="brand-text">[\s\S]*?</div>',
        new_brand_text.strip(),
        html,
        count=1
    )

# Credit targets: Mandatory 128, Elective 44, Total 172
html = re.sub(r'<span id="stat-obrig-target">\d+</span>', '<span id="stat-obrig-target">128</span>', html)
html = re.sub(r'<span id="stat-planned-obrig-target">\d+</span>', '<span id="stat-planned-obrig-target">128</span>', html)
html = re.sub(r'<span id="stat-ele-target">\d+</span>', '<span id="stat-ele-target">44</span>', html)
html = re.sub(r'<span id="stat-planned-ele-target">\d+</span>', '<span id="stat-planned-ele-target">44</span>', html)
html = re.sub(r'<span id="stat-target-credits">\d+</span>', '<span id="stat-target-credits">172</span>', html)
html = re.sub(r'<strong id="stat-credits">0 / \d+</strong>', '<strong id="stat-credits">0 / 172</strong>', html)
html = re.sub(r'<strong id="stat-max-sem">\d+ sem</strong>', '<strong id="stat-max-sem">8 sem</strong>', html)

html_path.write_text(html, encoding="utf-8")
print("index.html adapted successfully")

# 2. Adapt styles.css
css = css_path.read_text(encoding="utf-8")
shift_css = """
/* Shift Selector Pill Menu no Topo da Sidebar */
.shift-selector-wrapper {
  margin-top: 4px;
  position: relative;
  width: 100%;
  max-width: 185px;
}

.shift-select {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background-color: #161F30;
  border: 1px solid #263554;
  border-radius: 5px;
  color: #E2E8F0;
  font-family: inherit;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 20px 3px 6px;
  cursor: pointer;
  line-height: 1.3;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%233B82F6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shift-select:hover {
  border-color: #3B82F6;
  background-color: #1A253A;
}

.shift-select:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  background-color: #1A253A;
}

.shift-select option {
  background-color: #0F172A;
  color: #F8FAFC;
  font-size: 11px;
  padding: 4px 6px;
}
"""

if ".shift-selector-wrapper" not in css:
    css = css.replace(".subtitle {", shift_css + "\n.subtitle {")
    css_path.write_text(css, encoding="utf-8")
    print("styles.css adapted with shift selector styles")

# 3. Adapt app.js
app = app_path.read_text(encoding="utf-8")

# Title comment
app = re.sub(
    r"\* Simulador de Trajetória Acadêmica - Engenharia de Produção \(UFRGS\)",
    "* Simulador de Trajetória Acadêmica - Ciências Econômicas (UFRGS)",
    app
)

# State initialization: add activeShift
if "activeShift:" not in app:
    app = app.replace(
        "const state = {",
        "const state = {\n    activeShift: 'diurno',     // 'diurno' | 'noturno'",
        1
    )

# Dom elements: add shiftSelect
if "shiftSelect:" not in app:
    app = app.replace(
        "leftSidebar: document.getElementById('left-sidebar'),",
        "shiftSelect: document.getElementById('shift-select'),\n    leftSidebar: document.getElementById('left-sidebar'),",
        1
    )

# Storage keys helper & shift persistence functions
shift_functions = """
  // =========================================================================
  // GESTÃO DE MODALIDADES (DIURNO / NOTURNO)
  // =========================================================================
  function getShiftStorageKey(shift = state.activeShift) {
    return shift === 'noturno'
      ? 'trajetoria_economia_noturno_ufrgs_v1'
      : 'trajetoria_economia_diurno_ufrgs_v1';
  }

  function updateStageChipsForShift(shift) {
    if (!isBrowser) return;
    const isNoturno = shift === 'noturno';
    const chip9 = document.querySelector('.stage-chip[data-stage="9"]');
    const chip10 = document.querySelector('.stage-chip[data-stage="10"]');
    if (chip9) chip9.style.display = isNoturno ? 'inline-flex' : 'none';
    if (chip10) chip10.style.display = isNoturno ? 'inline-flex' : 'none';
    if (!isNoturno && (state.highlightStage === '9' || state.highlightStage === '10')) {
      state.highlightStage = null;
      updateStageHighlightChips();
      applyStageHighlightToCards();
    }
  }

  function applyCurriculumShift(newShift, savePrevious = true) {
    if (savePrevious) {
      saveToLocalStorage(false);
    }

    state.activeShift = (newShift === 'noturno') ? 'noturno' : 'diurno';
    if (isBrowser && typeof localStorage !== 'undefined') {
      localStorage.setItem('trajetoria_economia_active_shift', state.activeShift);
    }

    const curricula = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                      (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                      (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));

    if (curricula && curricula[state.activeShift]) {
      state.curriculum = curricula[state.activeShift];
    } else if (curricula && curricula.disciplinas) {
      state.curriculum = curricula;
    }

    state.courses = state.curriculum?.disciplinas || {};

    if (dom.shiftSelect) {
      dom.shiftSelect.value = state.activeShift;
    }

    updateStageChipsForShift(state.activeShift);
    buildDagMaps();
    loadOrInitializeAllocations();

    if (isBrowser) {
      updateDynamicColumnVisibility();
      revalidateAllCascades();
      renderAllCards();
      renderDrawerCourses();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
    }
  }

  function switchShift(newShift) {
    if (newShift === state.activeShift) return;
    applyCurriculumShift(newShift, true);
    const shiftLabel = state.activeShift === 'noturno' ? 'Noturno' : 'Diurno';
    showToast(`Modalidade alterada para Ciências Econômicas (${shiftLabel}).`, 'info');
  }
"""

if "function getShiftStorageKey" not in app:
    # Insert right before loadCurriculumData
    app = app.replace(
        "async function loadCurriculumData() {",
        shift_functions + "\n  async function loadCurriculumData() {"
    )

# Replace loadCurriculumData implementation to support ECONOMIA_CURRICULA and shifts
old_load_curriculum = """  async function loadCurriculumData() {
    // 1. Resolve fallback pré-carregado via <script src="curriculum_data.js">
    const localFallback = (typeof window !== 'undefined' && (window.CURRICULUM_DATA_FALLBACK || window.CURRICULUM_DATA)) ||
                          (typeof CURRICULUM_DATA !== 'undefined' ? CURRICULUM_DATA : null) ||
                          (typeof globalThis !== 'undefined' && (globalThis.CURRICULUM_DATA_FALLBACK || globalThis.CURRICULUM_DATA));

    // Se estiver executando via protocolo file:// (duplo clique local), prioriza o fallback para evitar bloqueio de CORS de fetch
    const isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
    if (isFileProtocol && localFallback) {
      state.curriculum = localFallback;
      state.courses = state.curriculum.disciplinas || {};
      return;
    }

    try {
      const resp = await fetch('curriculum_data.json');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      state.curriculum = await resp.json();
    } catch (e) {
      console.warn('Fetch de curriculum_data.json falhou, utilizando fallback local em memória:', e);
      if (localFallback) {
        state.curriculum = localFallback;
      } else {
        showToast('Não foi possível carregar curriculum_data.json. Verifique o servidor estático.', 'error');
        throw new Error('Falha ao carregar dados curriculares: curriculum_data.json inacessível e fallback indisponível.');
      }
    }

    state.courses = state.curriculum.disciplinas || {};
  }"""

new_load_curriculum = """  async function loadCurriculumData() {
    if (isBrowser && typeof localStorage !== 'undefined') {
      const savedShift = localStorage.getItem('trajetoria_economia_active_shift');
      if (savedShift === 'noturno' || savedShift === 'diurno') {
        state.activeShift = savedShift;
      }
    }

    const localFallback = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                          (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                          (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));

    let loadedCurricula = null;
    const isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
    if (isFileProtocol && localFallback) {
      loadedCurricula = localFallback;
    } else {
      try {
        const resp = await fetch('curriculum_data.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        loadedCurricula = await resp.json();
      } catch (e) {
        console.warn('Fetch de curriculum_data.json falhou, utilizando fallback local em memória:', e);
        if (localFallback) {
          loadedCurricula = localFallback;
        } else {
          showToast('Não foi possível carregar curriculum_data.json. Verifique o servidor estático.', 'error');
          throw new Error('Falha ao carregar dados curriculares.');
        }
      }
    }

    if (loadedCurricula && loadedCurricula.diurno && loadedCurricula.noturno) {
      if (typeof window !== 'undefined') window.ECONOMIA_CURRICULA = loadedCurricula;
    }

    applyCurriculumShift(state.activeShift, false);
  }"""

app = app.replace(old_load_curriculum, new_load_curriculum)

# Update loadOrInitializeAllocations to use getShiftStorageKey()
app = re.sub(
    r"const saved = localStorage\.getItem\('trajetoria_eng_producao_ufrgs_v1'\);",
    "const saved = localStorage.getItem(getShiftStorageKey());",
    app
)

# Update saveToLocalStorage
old_save_ls = """    const payload = {
      allocations: state.allocations,
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      columnNames: state.columnNames,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('trajetoria_eng_producao_ufrgs_v1', JSON.stringify(payload));"""

new_save_ls = """    const payload = {
      course: 'Ciências Econômicas',
      shift: state.activeShift,
      allocations: state.allocations,
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      columnNames: state.columnNames,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(getShiftStorageKey(), JSON.stringify(payload));
    localStorage.setItem('trajetoria_economia_active_shift', state.activeShift);"""

app = app.replace(old_save_ls, new_save_ls)

# Update resetToDefaultCurriculum to properly handle alternativeOf defaults
old_reset_curric = """      if (tipo === 'obrigatoria' && etapa && etapa >= 1 && etapa <= 10) {"""
new_reset_curric = """      if (tipo === 'obrigatoria' && etapa && etapa >= 1 && etapa <= 10) {"""
# (tipo is already 'obrigatoria' for presencial and 'eletiva' for ead in our dataset)

# Update default metrics fallbacks: 128 and 44
app = re.sub(
    r"creditos_obrigatorios \|\| 210",
    "creditos_obrigatorios || 128",
    app
)
app = re.sub(
    r"creditos_eletivos \|\| 20",
    "creditos_eletivos || 44",
    app
)

# Update export filenames
app = re.sub(
    r"const suggestedName = `grade_producao_ufrgs_\${dateStr}\.json`;",
    "const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';\n    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.json`;",
    app
)
app = re.sub(
    r"const suggestedName = `grade_producao_ufrgs_\${dateStr}\.png`;",
    "const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';\n    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.png`;",
    app
)
app = re.sub(
    r"const suggestedName = `grade_producao_ufrgs_\${dateStr}\.pdf`;",
    "const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';\n    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.pdf`;",
    app
)

# Update exportStateToJson to include shift
old_export_json = """  function exportStateToJson() {
    const payload = {
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      columnNames: state.columnNames,
      allocations: state.allocations
    };
    return JSON.stringify(payload, null, 2);
  }"""

new_export_json = """  function exportStateToJson() {
    const payload = {
      course: 'Ciências Econômicas',
      shift: state.activeShift,
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      columnNames: state.columnNames,
      allocations: state.allocations
    };
    return JSON.stringify(payload, null, 2);
  }"""

app = app.replace(old_export_json, new_export_json)

# Update importStateFromJson to switch shift if specified in JSON
import_shift_patch = """        if (parsed.shift && (parsed.shift === 'diurno' || parsed.shift === 'noturno') && parsed.shift !== state.activeShift) {
          applyCurriculumShift(parsed.shift, false);
        }
        state.allocations = parsed.allocations;"""

app = re.sub(
    r"state\.allocations = parsed\.allocations;",
    import_shift_patch,
    app
)

# In setupEventListeners, attach change listener for shift-select
event_listener_hook = """    // 0. Toggle Left Sidebar (Recolher / Expandir Menu Lateral)
    if (dom.shiftSelect) {
      dom.shiftSelect.addEventListener('change', (e) => {
        switchShift(e.target.value);
      });
    }"""

app = app.replace(
    "// 0. Toggle Left Sidebar (Recolher / Expandir Menu Lateral)",
    event_listener_hook,
    1
)

# In createEngine, support ECONOMIA_CURRICULA
old_engine_res = """    const activeCurriculum = curriculumData || state.curriculum ||
      (typeof window !== 'undefined' && (window.CURRICULUM_DATA_FALLBACK || window.CURRICULUM_DATA)) ||
      (typeof CURRICULUM_DATA !== 'undefined' ? CURRICULUM_DATA : null) ||
      (typeof globalThis !== 'undefined' && (globalThis.CURRICULUM_DATA_FALLBACK || globalThis.CURRICULUM_DATA));"""

new_engine_res = """    let activeCurriculum = curriculumData || state.curriculum;
    if (!activeCurriculum) {
      const allC = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                   (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                   (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));
      activeCurriculum = (allC && allC.diurno) ? allC.diurno : allC;
    }"""

app = app.replace(old_engine_res, new_engine_res)

# Export shift utilities from IIFE
app = app.replace(
    "resetToDefaultCurriculum,",
    "resetToDefaultCurriculum,\n    switchShift,\n    applyCurriculumShift,\n    getShiftStorageKey,\n    updateStageChipsForShift,",
    1
)

app_path.write_text(app, encoding="utf-8")
print("app.js adapted successfully")
