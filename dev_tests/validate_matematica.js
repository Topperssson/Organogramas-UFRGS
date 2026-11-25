const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('🧪 SUITE DE VALIDAÇÃO: MATEMÁTICA UFRGS');
console.log('====================================================\n');

let failedTests = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

const distDir = path.resolve(__dirname, '../dist/matematica');

// ----------------------------------------------------
// TESTE 1: Arquivos estritamente standalone na pasta dist/matematica/ & UTF-8 sem BOM
// ----------------------------------------------------
console.log('1. Verificação de Isolamento, Conteúdo e UTF-8 (sem BOM) de dist/matematica/:');
const allowedFiles = new Set([
  'app.js',
  'curriculum_data.js',
  'curriculum_data.json',
  'organograma.html',
  'styles.css',
  'README.md'
]);
const currentFiles = fs.readdirSync(distDir);
assert(currentFiles.length === allowedFiles.size, `Exatamente ${allowedFiles.size} arquivos esperados (encontrados: ${currentFiles.length})`);
currentFiles.forEach(f => {
  assert(allowedFiles.has(f), `Arquivo permitido standalone: ${f}`);
  const buf = fs.readFileSync(path.join(distDir, f));
  const hasBom = buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  assert(!hasBom, `Arquivo em UTF-8 puro sem BOM: ${f}`);
});

// ----------------------------------------------------
// TESTE 2: Verificação de Sintaxe JS (node --check)
// ----------------------------------------------------
console.log('\n2. Verificação de Sintaxe JavaScript (node --check):');
['app.js', 'curriculum_data.js'].forEach(file => {
  const filePath = path.join(distDir, file);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    assert(true, `Sintaxe JS válida sem erros: ${file}`);
  } catch (err) {
    assert(false, `Erro de sintaxe em ${file}: ${err.message}`);
  }
});

// ----------------------------------------------------
// TESTE 3: Presença das 4 Matrizes e Metas Oficiais
// ----------------------------------------------------
console.log('\n3. Presença das 4 Matrizes em curriculum_data.js & .json:');
const currModule = require(path.join(distDir, 'curriculum_data.js'));
const curricula = currModule.MATEMATICA_CURRICULA;
const jsonCurricula = JSON.parse(fs.readFileSync(path.join(distDir, 'curriculum_data.json'), 'utf8'));

assert(Boolean(curricula), 'Objeto unificado MATEMATICA_CURRICULA exportado');
assert(Boolean(currModule.CURRICULUM_DATA), 'Fallback CURRICULUM_DATA exportado');

const expectedTracks = {
  lic_diurno: { label: 'Licenciatura em Matemática (Diurno)', maxStage: 8, hasFdc: false, obr: 204, ele: 8, target: 222 },
  lic_noturno: { label: 'Licenciatura em Matemática (Noturno)', maxStage: 10, hasFdc: false, obr: 204, ele: 8, target: 222 },
  bach_pura: { label: 'Bacharelado — Matemática Pura', maxStage: 8, hasFdc: false, obr: 136, ele: 8, target: 150 },
  bach_aplicada: { label: 'Bacharelado — Matemática Aplicada e Computacional', maxStage: 8, hasFdc: true, obr: 132, ele: 8, target: 148 }
};

for (const [key, spec] of Object.entries(expectedTracks)) {
  const tr = curricula[key];
  assert(Boolean(tr), `Matriz ${key} presente em curriculum_data.js`);
  assert(Boolean(jsonCurricula[key]), `Matriz ${key} presente em curriculum_data.json`);
  assert(tr.label === spec.label, `Label ${key} correto: ${tr.label}`);
  assert(tr.maxStage === spec.maxStage, `maxStage ${key}: ${spec.maxStage} (obtido: ${tr.maxStage})`);
  assert(tr.hasFdc === spec.hasFdc, `hasFdc ${key}: ${spec.hasFdc} (obtido: ${tr.hasFdc})`);
  assert(tr.totalMandatoryCredits === spec.obr, `Metas ${key}: ${spec.obr} cr obrigatórios (obtido: ${tr.totalMandatoryCredits})`);
  assert(tr.totalElectiveCredits === spec.ele, `Metas ${key}: ${spec.ele} cr eletivos (obtido: ${tr.totalElectiveCredits})`);
  assert(tr.totalTargetCredits === spec.target, `Total de Diplomação ${key}: ${spec.target} cr (obtido: ${tr.totalTargetCredits})`);
}

assert(Array.isArray(curricula.bach_aplicada.fdcs) && curricula.bach_aplicada.fdcs.length === 3, 'bach_aplicada define exatamente 3 FDCs');

// ----------------------------------------------------
// TESTE 4: Integridade Referencial de 100% dos Pré-Requisitos
// ----------------------------------------------------
console.log('\n4. Integridade Referencial de Pré-Requisitos:');
function verifyPrereqs(shiftCurric, shiftName) {
  const courses = shiftCurric.disciplinas;
  const courseKeys = new Set(Object.keys(courses));
  let brokenPrereqs = 0;

  for (const [code, c] of Object.entries(courses)) {
    (c.prerequisitos || []).forEach(p => {
      if (!courseKeys.has(p)) {
        console.error(`    Pré-requisito ausente em ${shiftName}: ${code} depende de ${p}`);
        brokenPrereqs++;
      }
    });
  }

  assert(brokenPrereqs === 0, `100% dos pré-requisitos válidos no catálogo de ${shiftName} (${courseKeys.size} disciplinas)`);
}

Object.entries(curricula).forEach(([k, v]) => verifyPrereqs(v, k));

// ----------------------------------------------------
// TESTE 5: Validação Topológica DAG em Todas as 4 Matrizes e 3 FDCs
// ----------------------------------------------------
console.log('\n5. Validação Topológica do Grafo DAG (4 Matrizes + 3 FDCs da Aplicada):');
function verifyDagTopology(shiftCurric, shiftName, fdcId = null) {
  const courses = shiftCurric.disciplinas;
  let topologicalViolations = 0;

  const resolveType = (c) => {
    if (fdcId && c.status_fdc && c.status_fdc[String(fdcId)]) return c.status_fdc[String(fdcId)].tipo;
    return c.tipo || c.tipo_padrao;
  };
  const resolveStage = (c) => {
    if (fdcId && c.status_fdc && c.status_fdc[String(fdcId)]) return c.status_fdc[String(fdcId)].etapa;
    return c.etapa_sugerida;
  };

  for (const [code, c] of Object.entries(courses)) {
    const tipoB = resolveType(c);
    const semB = resolveStage(c);
    if (tipoB === 'obrigatoria' && typeof semB === 'number' && semB > 0) {
      (c.prerequisitos || []).forEach(pCode => {
        const p = courses[pCode];
        if (!p) return;
        const tipoA = resolveType(p);
        const semA = resolveStage(p);
        if (tipoA === 'obrigatoria' && typeof semA === 'number' && semA > 0) {
          if (semB <= semA) {
            console.error(`    Violação DAG em ${shiftName}${fdcId ? ` FDC ${fdcId}` : ''}: ${code} (Sem ${semB}) <= pré-req ${pCode} (Sem ${semA})`);
            topologicalViolations++;
          }
        }
      });
    }
  }

  assert(topologicalViolations === 0, `Zero violações topológicas em ${shiftName}${fdcId ? ` (FDC ${fdcId})` : ''}`);
}

verifyDagTopology(curricula.lic_diurno, 'lic_diurno');
verifyDagTopology(curricula.lic_noturno, 'lic_noturno');
verifyDagTopology(curricula.bach_pura, 'bach_pura');
[1, 2, 3].forEach(fdcId => verifyDagTopology(curricula.bach_aplicada, 'bach_aplicada', fdcId));

// ----------------------------------------------------
// TESTE 6: Headless DOM Mock — Habilitações, LocalStorage, Stage Chips, FDC UI e 7 Compartilhadas
// ----------------------------------------------------
console.log('\n6. Teste Headless DOM Mock (4 Habilitações, LocalStorage, Chips, FDCs & 7 Compartilhadas):');
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => (k in mockLocalStorage ? mockLocalStorage[k] : null),
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; },
  clear: () => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }
};

function makeClassList(initial = []) {
  const set = new Set(initial);
  return {
    add: (...cls) => cls.forEach(c => set.add(c)),
    remove: (...cls) => cls.forEach(c => set.delete(c)),
    toggle: (c, force) => {
      if (force === undefined) {
        if (set.has(c)) { set.delete(c); return false; }
        set.add(c); return true;
      }
      if (force) set.add(c);
      else set.delete(c);
      return Boolean(force);
    },
    contains: (c) => set.has(c)
  };
}

function makeMockEl(id, extra = {}) {
  return {
    id,
    style: { display: '' },
    value: '',
    textContent: '',
    title: '',
    dataset: extra.dataset || {},
    classList: makeClassList(extra.classes || []),
    querySelectorAll: extra.querySelectorAll || (() => [])
  };
}

const chip9 = makeMockEl(null, { dataset: { stage: '9' } });
const chip10 = makeMockEl(null, { dataset: { stage: '10' } });
const fdcChipEls = [1, 2, 3].map(id => makeMockEl(null, { dataset: { fdc: String(id) }, classes: id === 1 ? ['fdc-chip', 'active'] : ['fdc-chip'] }));
const mockElsById = {
  'shift-select': makeMockEl('shift-select'),
  'fdc-selector-section': makeMockEl('fdc-selector-section'),
  'fdc-chips-group': makeMockEl('fdc-chips-group', { querySelectorAll: (sel) => (sel === '.fdc-chip' ? fdcChipEls : []) }),
  'fdc-select': makeMockEl('fdc-select'),
  'tracker-obrig-title': makeMockEl('tracker-obrig-title')
};
const mockPillFdc = makeMockEl(null, { classes: ['credit-pill', 'pill-fdc'] });
const mockCreditsPills = makeMockEl(null, { classes: ['credits-category-pills'] });

global.MATEMATICA_CURRICULA = curricula;
global.CURRICULUM_DATA = curricula.lic_diurno;
global.window = {
  MATEMATICA_CURRICULA: curricula,
  CURRICULUM_DATA: curricula.lic_diurno,
  addEventListener: () => {}
};
global.document = {
  getElementById: (id) => mockElsById[id] || null,
  querySelector: (sel) => {
    if (sel === '.stage-chip[data-stage="9"]') return chip9;
    if (sel === '.stage-chip[data-stage="10"]') return chip10;
    if (sel === '.pill-fdc') return mockPillFdc;
    if (sel === '.credits-category-pills') return mockCreditsPills;
    return null;
  },
  querySelectorAll: () => []
};
global.requestAnimationFrame = (cb) => cb();

const appModule = require(path.join(distDir, 'app.js'));

assert(typeof appModule.getShiftStorageKey === 'function', 'Função getShiftStorageKey exportada');
assert(typeof appModule.switchShift === 'function', 'Função switchShift exportada');
assert(typeof appModule.applyCurriculumShift === 'function', 'Função applyCurriculumShift exportada');
assert(typeof appModule.switchFdc === 'function', 'Função switchFdc exportada');

const expectedStorageKeys = {
  lic_diurno: 'trajetoria_matematica_lic_diurno_ufrgs_v1',
  lic_noturno: 'trajetoria_matematica_lic_noturno_ufrgs_v1',
  bach_pura: 'trajetoria_matematica_bach_pura_ufrgs_v1',
  bach_aplicada: 'trajetoria_matematica_bach_aplicada_ufrgs_v1'
};
const seenKeys = new Set();
for (const [shift, key] of Object.entries(expectedStorageKeys)) {
  const actual = appModule.getShiftStorageKey(shift);
  assert(actual === key, `Chave ${shift}: ${actual}`);
  seenKeys.add(actual);
}
assert(seenKeys.size === 4, 'Todas as 4 chaves de localStorage são estritamente únicas');

// Test switching across all 4 tracks & stage/FDC UI visibility
appModule.switchShift('lic_diurno');
assert(appModule.state.activeShift === 'lic_diurno', 'Habilitação comutada para lic_diurno');
assert(chip9.style.display === 'none' && chip10.style.display === 'none', 'Chips 9º e 10º ocultos em lic_diurno (8 etapas)');
assert(mockElsById['fdc-chips-group'].style.display === 'none', '#fdc-chips-group oculto em lic_diurno');
assert(mockPillFdc.style.display === 'none', '.pill-fdc oculto em lic_diurno');
assert(!mockCreditsPills.classList.contains('has-fdc'), '.has-fdc ausente em lic_diurno');

appModule.switchShift('lic_noturno');
assert(appModule.state.activeShift === 'lic_noturno', 'Habilitação comutada para lic_noturno');
assert(mockLocalStorage['trajetoria_matematica_active_shift'] === 'lic_noturno', 'Última habilitação salva em trajetoria_matematica_active_shift');
assert(chip9.style.display === 'inline-flex' && chip10.style.display === 'inline-flex', 'Chips 9º e 10º visíveis em lic_noturno (10 etapas)');
assert(mockElsById['fdc-chips-group'].style.display === 'none', '#fdc-chips-group oculto em lic_noturno');

appModule.switchShift('bach_pura');
assert(appModule.state.activeShift === 'bach_pura', 'Habilitação comutada para bach_pura');
assert(chip9.style.display === 'none' && chip10.style.display === 'none', 'Chips 9º e 10º ocultos em bach_pura (8 etapas)');
assert(mockElsById['fdc-chips-group'].style.display === 'none', '#fdc-chips-group oculto em bach_pura');
// Guard check: switchFdc must no-op on hasFdc: false
appModule.switchFdc(3);
assert(appModule.state.currentFdc === 1, 'switchFdc(3) ignorado com segurança quando hasFdc === false');

appModule.switchShift('bach_aplicada');
assert(appModule.state.activeShift === 'bach_aplicada', 'Habilitação comutada para bach_aplicada');
assert(chip9.style.display === 'none' && chip10.style.display === 'none', 'Chips 9º e 10º ocultos em bach_aplicada (8 etapas)');
assert(mockElsById['fdc-chips-group'].style.display === 'flex', '#fdc-chips-group visível em bach_aplicada');
assert(mockPillFdc.style.display === 'flex', '.pill-fdc visível em bach_aplicada');
assert(mockCreditsPills.classList.contains('has-fdc'), '.has-fdc ativo em bach_aplicada');

// Test FDC switching & 7 shared 2-of-3 courses + 132 mandatory credits per FDC
const shared2of3 = ['MAT01058', 'MAT01126', 'MAT01326', 'FIS01182', 'MAT01099', 'MAT01028', 'MAT01027'];
function countMandatoryCreditsActive() {
  return Object.keys(appModule.state.courses).reduce((sum, code) => {
    const tipo = appModule.getCourseTypeInCurrentFdc(code);
    const alloc = appModule.state.allocations[code];
    if (tipo === 'obrigatoria' && alloc && alloc.semester !== null) {
      return sum + (appModule.state.courses[code].creditos || 0);
    }
    return sum;
  }, 0);
}

appModule.switchFdc(1);
assert(appModule.state.currentFdc === 1, 'FDC 1 ativa (Acadêmica Aplicada)');
assert(countMandatoryCreditsActive() === 132, `FDC 1 soma 132 créditos obrigatórios alocados (obtido: ${countMandatoryCreditsActive()})`);
assert(appModule.getCourseTypeInCurrentFdc('MAT01126') === 'eletiva', 'MAT01126 é eletiva na FDC 1');
assert(appModule.getCourseTypeInCurrentFdc('MAT01058') === 'obrigatoria', 'MAT01058 é obrigatória na FDC 1');
assert(appModule.getCourseStageInFdc('MAT01156', 1) === 4, 'MAT01156 tem etapa 4 na FDC 1');

appModule.switchFdc(2);
assert(appModule.state.currentFdc === 2, 'FDC 2 ativa (Acadêmica Computacional)');
assert(countMandatoryCreditsActive() === 132, `FDC 2 soma 132 créditos obrigatórios alocados (obtido: ${countMandatoryCreditsActive()})`);
assert(shared2of3.every(c => appModule.getCourseTypeInCurrentFdc(c) === 'obrigatoria' && appModule.state.allocations[c].semester !== null), 'Todas as 7 compartilhadas 2-de-3 são obrigatórias e alocadas na FDC 2');
assert(appModule.getCourseStageInFdc('MAT01126', 2) === 6, 'MAT01126 resolve etapa 6 na FDC 2 via status_fdc');

appModule.switchFdc(3);
assert(appModule.state.currentFdc === 3, 'FDC 3 ativa (Profissional)');
assert(countMandatoryCreditsActive() === 132, `FDC 3 soma 132 créditos obrigatórios alocados (obtido: ${countMandatoryCreditsActive()})`);
assert(appModule.getCourseTypeInCurrentFdc('MAT01126') === 'obrigatoria' && appModule.state.allocations['MAT01126'].semester !== null, 'MAT01126 permanece obrigatória e alocada na FDC 3');
assert(appModule.getCourseStageInFdc('MAT01126', 3) === 4, 'MAT01126 resolve etapa 4 na FDC 3 via status_fdc');
assert(['MAT01058', 'MAT01326', 'FIS01182', 'MAT01099', 'MAT01028', 'MAT01027'].every(
  c => appModule.getCourseTypeInCurrentFdc(c) === 'eletiva' && appModule.state.allocations[c].semester === null
), '6 compartilhadas FDC 1/2 demovidas para Banco de Eletivas na FDC 3');
assert(appModule.getCourseStageInFdc('MAT01156', 3) === 6 && appModule.getCourseStageInFdc('MAT01078', 3) === 7 && appModule.getCourseStageInFdc('MAT02022', 3) === 4,
  'Deslocamento de etapa em FDC 3 (MAT01156->6, MAT01078->7, MAT02022->4) resolvido via status_fdc');

// Also check createEngine DAG & cycles across all 4 tracks
for (const [k, tr] of Object.entries(curricula)) {
  const eng = appModule.createEngine(tr, 1);
  assert(eng.findCycles().length === 0, `createEngine: 0 ciclos em ${k}`);
  assert(eng.validateTrajectoryDag().isValid, `createEngine: DAG inicial válido em ${k}`);
}
const engApp = appModule.createEngine(curricula.bach_aplicada, 1);
[1, 2, 3].forEach(fdcId => {
  engApp.switchFdc(fdcId);
  const sum = engApp.getCreditsSummary();
  assert(sum.planned.obr + sum.planned.fdc === 132, `createEngine FDC ${fdcId}: 132 cr obrig+fdc planejados (obtido: ${sum.planned.obr + sum.planned.fdc})`);
});

// ----------------------------------------------------
// TESTE 7: Verificação dos Elementos Visuais no organograma.html
// ----------------------------------------------------
console.log('\n7. Verificação dos Elementos Visuais no organograma.html:');
const htmlContent = fs.readFileSync(path.join(distDir, 'organograma.html'), 'utf8');

assert(htmlContent.includes('<h1>Organograma Matemática <span class="badge-ufrgs">UFRGS</span></h1>'), 'Título Organograma Matemática com badge UFRGS');
assert(htmlContent.includes('id="shift-select"'), 'Seletor #shift-select presente no DOM');
['lic_diurno', 'lic_noturno', 'bach_pura', 'bach_aplicada'].forEach(opt => {
  assert(htmlContent.includes(`value="${opt}"`), `Opção ${opt} presente em #shift-select`);
});
assert(htmlContent.includes('id="fdc-chips-group"'), 'Seletor #fdc-chips-group presente no DOM');
['1', '2', '3'].forEach(id => {
  assert(htmlContent.includes(`data-fdc="${id}"`), `Chip data-fdc="${id}" presente no DOM`);
});
assert(htmlContent.includes('pill-fdc') && htmlContent.includes('id="stat-done-fdc"'), 'Pílula .pill-fdc (#stat-done-fdc) presente no DOM');
assert(htmlContent.includes('id="stat-obrig-target">204</span>'), 'Meta obrigatória padrão (lic_diurno) de 204 créditos no HTML');
assert(htmlContent.includes('id="stat-ele-target">8</span>'), 'Meta eletiva padrão de 8 créditos no HTML');
assert(htmlContent.includes('id="stat-target-credits">212</span>'), 'Meta total grade padrão (204+8=212) no HTML');

// ----------------------------------------------------
// TESTE 8: Verificação dos Estilos no styles.css
// ----------------------------------------------------
console.log('\n8. Verificação dos Estilos no styles.css:');
const cssContent = fs.readFileSync(path.join(distDir, 'styles.css'), 'utf8');
assert(cssContent.includes('.shift-selector-wrapper'), 'Classe .shift-selector-wrapper definida no CSS');
assert(cssContent.includes('.shift-select'), 'Classe .shift-select definida no CSS');
assert(cssContent.includes('.fdc-chip'), 'Classe .fdc-chip definida no CSS');
assert(cssContent.includes('.credits-category-pills.has-fdc'), 'Classe .credits-category-pills.has-fdc definida no CSS');
assert(cssContent.includes('#161F30'), 'Cor de fundo dark #161F30 aplicada');

// ----------------------------------------------------
// TESTE 9: Exportação e Importação JSON Contextualizada & Prefixo grade_matematica
// ----------------------------------------------------
console.log('\n9. Teste de Exportação/Importação JSON e Prefixo grade_matematica:');
const appSource = fs.readFileSync(path.join(distDir, 'app.js'), 'utf8');
assert(appSource.includes('grade_matematica_'), 'Prefixo de exportação grade_matematica_ presente em app.js');

appModule.switchShift('lic_noturno');
const exportedNoturno = JSON.parse(appModule.exportStateToJson());
assert(exportedNoturno.shift === 'lic_noturno', 'JSON exportado contém shift: "lic_noturno"');

appModule.switchShift('bach_aplicada');
appModule.switchFdc(3);
const exportedAplicadaFdc3 = JSON.parse(appModule.exportStateToJson());
assert(exportedAplicadaFdc3.shift === 'bach_aplicada' && exportedAplicadaFdc3.currentFdc === 3, 'JSON exportado contém shift: "bach_aplicada" e currentFdc: 3');

appModule.switchShift('lic_diurno');
appModule.importStateFromJson(JSON.stringify(exportedAplicadaFdc3));
assert(appModule.state.activeShift === 'bach_aplicada' && appModule.state.currentFdc === 3, 'Importação de JSON da Aplicada FDC 3 comutou turno e FDC automaticamente');

appModule.importStateFromJson(JSON.stringify(exportedNoturno));
assert(appModule.state.activeShift === 'lic_noturno', 'Importação de JSON do lic_noturno comutou turno automaticamente');

// ----------------------------------------------------
// TESTE 10: Regressão (Undo Cross-Shift, Undo FDC Atômico, min_credits Global, Validação/Backfill JSON)
// ----------------------------------------------------
console.log('\n10. Testes de Regressão (Bugs 1-5):');

// Bug 1: Cross-track undoAction() após switchShift() não deve vazar disciplinas
appModule.switchShift('lic_diurno');
appModule.moveCourse('MAT01341', 4, false);
appModule.switchShift('bach_pura');
const bachPuraCountBeforeUndo = Object.keys(appModule.state.allocations).length;
global.window.undoAction();
global.window.redoAction();
assert(appModule.state.activeShift === 'bach_pura', 'Bug 1: activeShift permanece bach_pura após undoAction/redoAction pós-switchShift');
assert(Object.keys(appModule.state.allocations).length === bachPuraCountBeforeUndo && bachPuraCountBeforeUndo === 86,
  `Bug 1: undoAction após switchShift não vazou chaves de lic_diurno para bach_pura (${Object.keys(appModule.state.allocations).length} chaves)`);
assert(!('EDU01010' in appModule.state.allocations), 'Bug 1: disciplina exclusiva de lic_diurno (EDU01010) ausente em bach_pura após undoAction');

// Bug 2: switchFdc() atômico no Undo/Redo
appModule.switchShift('bach_aplicada');
appModule.switchFdc(1);
const mat01058SemBeforeFdc3 = appModule.state.allocations['MAT01058'].semester;
const mat01126SemBeforeFdc3 = appModule.state.allocations['MAT01126'].semester;
appModule.switchFdc(3);
assert(appModule.state.currentFdc === 3 && appModule.state.allocations['MAT01126'].semester !== null, 'Bug 2 setup: switchFdc(3) promoveu MAT01126');
global.window.undoAction();
assert(appModule.state.currentFdc === 1, `Bug 2: um único undoAction() restaura currentFdc=1 (obtido: ${appModule.state.currentFdc})`);
assert(appModule.state.allocations['MAT01058'].semester === mat01058SemBeforeFdc3 && appModule.state.allocations['MAT01126'].semester === mat01126SemBeforeFdc3,
  'Bug 2: undoAction() após switchFdc(3) restaura integralmente alocações da FDC 1');
assert(fdcChipEls[0].classList.contains('active') && !fdcChipEls[2].classList.contains('active') && String(mockElsById['fdc-select'].value) === '1',
  'Bug 2: chips e seletor FDC sincronizados com FDC 1 após undoAction()');
global.window.redoAction();
assert(appModule.state.currentFdc === 3 && appModule.state.allocations['MAT01126'].semester !== null,
  'Bug 2: redoAction() após undo restaura FDC 3 atomicamente');

// Bug 3: Revalidação global de barreiras min_credits após moveCourse() / createEngine.moveCourse()
const engBug3 = appModule.createEngine(curricula.lic_diurno, 1);
const earlyCoursesEng = Object.keys(engBug3.state.courses)
  .filter(c => engBug3.state.allocations[c].semester !== null && engBug3.state.allocations[c].semester <= 2 && !engBug3.state.courses[c].min_credits)
  .slice(0, 5);
earlyCoursesEng.forEach(c => engBug3.moveCourse(c, 10));
const dagBug3 = engBug3.validateTrajectoryDag();
assert(dagBug3.isValid && dagBug3.violations.length === 0,
  `Bug 3 (createEngine): mover 5 disciplinas iniciais para sem 10 mantém DAG válido sem violações MIN_CREDITS (violações: ${dagBug3.violations.length})`);

appModule.switchShift('lic_diurno');
const earlyCoursesMain = Object.keys(appModule.state.courses)
  .filter(c => appModule.state.allocations[c].semester !== null && appModule.state.allocations[c].semester <= 2 && !appModule.state.courses[c].min_credits)
  .slice(0, 5);
earlyCoursesMain.forEach(c => appModule.moveCourse(c, 10, false));
assert(appModule.validateTrajectoryDag() === true,
  'Bug 3 (main scope): mover 5 disciplinas iniciais para sem 10 mantém validateTrajectoryDag() === true');

// Bug 4: importStateFromJson rejeita objetos não-Blob inválidos e arrays sem cair no FileReader
const invalidJsonInputs = [{ foo: 123 }, { allocations: [] }, [1, 2], '{"allocations":[]}'];
invalidJsonInputs.forEach((badInput, idx) => {
  let caughtMsg = '';
  try {
    appModule.importStateFromJson(badInput);
  } catch (err) {
    caughtMsg = err && err.message ? err.message : String(err);
  }
  assert(caughtMsg.includes('allocations') && !caughtMsg.includes('FileReader') && !caughtMsg.includes('Blob'),
    `Bug 4 (caso ${idx + 1}): importStateFromJson rejeita entrada inválida com erro de validação (${caughtMsg})`);
});

// Bug 5: importação parcial de JSON preenche disciplinas omitidas no mapa allocations
const partialPayload = JSON.stringify({
  shift: 'lic_diurno',
  allocations: {
    MAT01341: { semester: 1, completed: false, hasOverflow: false }
  }
});
appModule.importStateFromJson(partialPayload);
const expectedLicDiurnoCount = Object.keys(curricula.lic_diurno.disciplinas).length;
assert(Object.keys(appModule.state.allocations).length === expectedLicDiurnoCount,
  `Bug 5 (main scope): importação parcial preenche todas as ${expectedLicDiurnoCount} disciplinas`);
let bug5MainErr = null;
try {
  appModule.moveCourse('EDU01010', 2, false);
} catch (err) {
  bug5MainErr = err;
}
assert(!bug5MainErr && appModule.state.allocations['EDU01010'].semester === 2,
  'Bug 5 (main scope): moveCourse em disciplina omitida no JSON parcial funciona sem TypeError');

const engBug5 = appModule.createEngine(curricula.lic_diurno, 1);
engBug5.importStateFromJson(partialPayload);
let bug5EngErr = null;
try {
  engBug5.moveCourse('EDU01010', 2);
} catch (err) {
  bug5EngErr = err;
}
assert(!bug5EngErr && Object.keys(engBug5.state.allocations).length === expectedLicDiurnoCount && engBug5.state.allocations['EDU01010'].semester === 2,
  'Bug 5 (createEngine): importStateFromJson parcial + moveCourse em disciplina omitida funciona sem TypeError');

console.log('\n----------------------------------------------------');
if (failedTests === 0) {
  console.log('🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
} else {
  console.error(`🚨 ${failedTests} TESTE(S) FALHARAM!`);
  process.exit(1);
}
console.log('----------------------------------------------------');
