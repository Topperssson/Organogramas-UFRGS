import re
from pathlib import Path

app_path = Path(r"C:\dev\projetos\ufrgs\dist\engenharia-mecanica\app.js")
content = app_path.read_text(encoding="utf-8")

# 1. Update title / header comments
content = re.sub(
    r"Simulador de Trajetória Acadêmica - Engenharia de Controle e Automação \(UFRGS\)",
    "Simulador de Trajetória Acadêmica - Engenharia Mecânica (UFRGS)",
    content
)

# 2. Update localStorage key
content = content.replace("'trajetoria_eca_ufrgs'", "'trajetoria_eng_mecanica_ufrgs_v1'")

# 3. Update export filenames
content = content.replace("`plano_curricular_ufrgs_${dateStr}.json`", "`grade_mecanica_ufrgs_${dateStr}.json`")
content = content.replace("`grade_eca_ufrgs_${dateStr}.png`", "`grade_mecanica_ufrgs_${dateStr}.png`")
content = content.replace("`grade_eca_ufrgs_${dateStr}.pdf`", "`grade_mecanica_ufrgs_${dateStr}.pdf`")

# 4. In dom references: guard fdc elements
content = re.sub(
    r"fdcSelect:\s*document\.getElementById\('fdc-select'\),",
    "fdcSelect: null,",
    content
)
content = re.sub(
    r"fdcChipsGroup:\s*document\.getElementById\('fdc-chips-group'\),",
    "fdcChipsGroup: null,",
    content
)

# 5. Course type and stage without FDCs
old_type_funcs = """  function getCourseTypeInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return 'inexistente';
    const altType = resolveAlternativeType(courseCode, c, state.altChoice);
    if (altType) return altType;

    const fdcIdStr = String(fdcId || state.currentFdc);
    if (c.status_fdc && c.status_fdc[fdcIdStr]) {
      return c.status_fdc[fdcIdStr].tipo; // 'obrigatoria' ou 'eletiva'
    }

    return c.tipo_padrao || 'obrigatoria';
  }

  function getCourseStageInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return null;

    const fdcIdStr = String(fdcId || state.currentFdc);
    if (c.status_fdc && c.status_fdc[fdcIdStr] && c.status_fdc[fdcIdStr].etapa) {
      return c.status_fdc[fdcIdStr].etapa;
    }

    return c.etapa_sugerida || null;
  }"""

new_type_funcs = """  function getCourseTypeInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return 'inexistente';
    return c.tipo || c.tipo_padrao || (c.etapa_sugerida ? 'obrigatoria' : 'eletiva');
  }

  function getCourseStageInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return null;
    return c.etapa_sugerida || null;
  }"""

content = content.replace(old_type_funcs, new_type_funcs)

# 6. Simplify credits tracker calculation:
# Remove FDC logic from done credits
old_done_calc = """      // Disciplina marcada como Feita / Concluída
      if (alloc.completed) {
        doneTotal += cr;
        if (tipo === 'eletiva') {
          doneEle += cr;
        } else if (course.fdc_especifica) {
          doneFdc += cr;
        } else {
          doneObr += cr;
        }
      }"""

new_done_calc = """      // Disciplina marcada como Feita / Concluída
      if (alloc.completed) {
        doneTotal += cr;
        if (tipo === 'eletiva') {
          doneEle += cr;
        } else {
          doneObr += cr;
        }
      }"""
content = content.replace(old_done_calc, new_done_calc)

# Update combined credits:
content = content.replace("const doneObrigCombined = doneObr + doneFdc;", "const doneObrigCombined = doneObr;")

# Default metas:
content = content.replace("creditos_obrigatorios || 222", "creditos_obrigatorios || 224")
content = content.replace("creditos_eletivos || 8", "creditos_eletivos || 20")

# Guard statDoneFdc
content = content.replace("if (dom.statDoneFdc) dom.statDoneFdc.textContent = `${doneFdc} cr`;", "// statDoneFdc removed for Mecanica")

# Remove FDC event listeners in initEventListeners
old_fdc_events = """    // Seletor de FDC (Select nativo e Chips visuais)
    if (dom.fdcSelect) {
      dom.fdcSelect.addEventListener('change', e => {
        switchFdc(parseInt(e.target.value, 10));
      });
    }

    if (dom.fdcChipsGroup) {
      dom.fdcChipsGroup.addEventListener('click', e => {
        const btn = e.target.closest('.fdc-chip');
        if (!btn) return;
        const fdcId = parseInt(btn.dataset.fdc, 10);
        if (!isNaN(fdcId)) {
          switchFdc(fdcId);
        }
      });
    }"""

new_fdc_events = """    // FDCs não aplicáveis para Engenharia Mecânica"""
content = content.replace(old_fdc_events, new_fdc_events)

# In test engine createEngine:
content = content.replace("creditos_obrigatorios || 222", "creditos_obrigatorios || 224")

app_path.write_text(content, encoding="utf-8")
print("app.js updated successfully for Engenharia Mecânica")
