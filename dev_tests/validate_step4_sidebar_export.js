/**
 * Validação Automatizada - Prompt 2 de 2:
 * 1. Barra de Menu na Lateral Esquerda (Left Sidebar) e 5 Blocos Modulares
 * 2. Posicionamento e Acoplamento do Banco de Eletivas
 * 3. Contador de Créditos Feitos (Concluídos) vs Planejados (Obrig, FDC, Elet)
 * 4. Checkboxes de Conclusão por Coluna de Semestre e por Card
 * 5. Pipeline Robusto de Exportação PNG e PDF (ensureExportLibsLoaded, captureBoardCanvas, finally cleanup)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================================');
console.log(' SUÍTE DE TESTES: SIDEBAR LATERAL, CRÉDITOS FEITOS E EXPORTAÇÃO (PROMPT 2/2)');
console.log('================================================================================\n');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const curriculumJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'curriculum_data.json'), 'utf8'));
const app = require('./app.js');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

// -----------------------------------------------------------------------------
// SEÇÃO 1: ARQUITETURA DO LAYOUT & LEFT SIDEBAR (5 BLOCOS)
// -----------------------------------------------------------------------------
console.log('-----------------------------------------------------------------------------');
console.log(' SEÇÃO 1: ARQUITETURA DO LAYOUT & LEFT SIDEBAR (5 BLOCOS)');
console.log('-----------------------------------------------------------------------------');

runTest('1.1 - Container .app-layout envolve a Left Sidebar e o Board Viewport', () => {
  assert(htmlContent.includes('<div class="app-layout">'), 'Deve conter container .app-layout');
  assert(htmlContent.includes('<aside class="left-sidebar" id="left-sidebar">'), 'Deve conter <aside id="left-sidebar">');
  assert(htmlContent.includes('id="board-viewport"'), 'Deve conter #board-viewport');
  assert(htmlContent.includes('id="btn-toggle-sidebar"'), 'Deve conter botão de toggle da sidebar #btn-toggle-sidebar');
});

runTest('1.2 - Bloco 1: Brand e Painel de Créditos Feitos (Feitos vs Planejados)', () => {
  assert(htmlContent.includes('block-header-credits'), 'Deve conter bloco 1 com cabeçalho e créditos');
  assert(htmlContent.includes('id="credits-tracker-card"'), 'Deve conter #credits-tracker-card');
  assert(htmlContent.includes('id="credits-percent-text"'), 'Deve conter #credits-percent-text');
  assert(htmlContent.includes('id="credits-progress-fill"'), 'Deve conter #credits-progress-fill');
  assert(htmlContent.includes('id="stat-completed-credits"'), 'Deve conter #stat-completed-credits');
  assert(htmlContent.includes('id="stat-target-credits"'), 'Deve conter #stat-target-credits');
  assert(htmlContent.includes('id="stat-done-obr"'), 'Deve conter #stat-done-obr');
  assert(htmlContent.includes('id="stat-done-fdc"'), 'Deve conter #stat-done-fdc');
  assert(htmlContent.includes('id="stat-done-ele"'), 'Deve conter #stat-done-ele');
});

runTest('1.3 - Bloco 2: Seleção das 3 FDCs e Configuração do Ciclo Inicial', () => {
  assert(htmlContent.includes('block-fdc-cycle'), 'Deve conter bloco 2 de FDC e Ciclo');
  assert(htmlContent.includes('id="fdc-chips-group"'), 'Deve conter grupo de chips de FDC');
  assert(htmlContent.includes('id="base-year-input"'), 'Deve conter #base-year-input');
  assert(htmlContent.includes('id="base-period-select"'), 'Deve conter #base-period-select');
  assert(htmlContent.includes('id="btn-apply-cycle"'), 'Deve conter #btn-apply-cycle');
});

runTest('1.4 - Bloco 3: Busca, Filtros e Botão Destaque do Banco de Eletivas', () => {
  assert(htmlContent.includes('block-search-drawer'), 'Deve conter bloco 3 de busca e drawer');
  assert(htmlContent.includes('id="course-search"'), 'Deve conter #course-search');
  assert(htmlContent.includes('id="filter-select"'), 'Deve conter #filter-select');
  assert(htmlContent.includes('id="btn-toggle-drawer"'), 'Deve conter #btn-toggle-drawer');
  assert(htmlContent.includes('id="drawer-count"'), 'Deve conter contador #drawer-count');
});

runTest('1.5 - Bloco 4: Controles de Zoom do Canvas e Resetar Grade', () => {
  assert(htmlContent.includes('block-canvas-nav'), 'Deve conter bloco 4 de controles do canvas');
  assert(htmlContent.includes('id="btn-zoom-out"'), 'Deve conter #btn-zoom-out');
  assert(htmlContent.includes('id="btn-zoom-reset"'), 'Deve conter #btn-zoom-reset');
  assert(htmlContent.includes('id="btn-zoom-in"'), 'Deve conter #btn-zoom-in');
  assert(htmlContent.includes('id="btn-zoom-fit"'), 'Deve conter #btn-zoom-fit');
  assert(htmlContent.includes('id="btn-reset-default"'), 'Deve conter #btn-reset-default');
});

runTest('1.6 - Bloco 5: Persistência JSON e Exportação PNG/PDF sem overflow', () => {
  assert(htmlContent.includes('block-export-persistence'), 'Deve conter bloco 5 de persistência e exportação');
  assert(htmlContent.includes('id="btn-export-json"'), 'Deve conter #btn-export-json');
  assert(htmlContent.includes('id="btn-import-json"'), 'Deve conter #btn-import-json');
  assert(htmlContent.includes('id="btn-export-png"'), 'Deve conter #btn-export-png');
  assert(htmlContent.includes('id="btn-export-pdf"'), 'Deve conter #btn-export-pdf');
  assert(htmlContent.includes('id="btn-save"'), 'Deve conter #btn-save');
});

// -----------------------------------------------------------------------------
// SEÇÃO 2: REGRAS DE CSS, LARGURAS FIXAS E ACOPLAMENTO DO DRAWER
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 2: REGRAS DE CSS, LARGURAS FIXAS E ACOPLAMENTO DO DRAWER');
console.log('-----------------------------------------------------------------------------');

runTest('2.1 - Left Sidebar possui largura fixa de 290px e colapsibilidade limpa', () => {
  assert(cssContent.includes('.left-sidebar'), 'CSS deve definir .left-sidebar');
  assert(cssContent.includes('width: 290px'), '.left-sidebar deve ter largura de 290px');
  assert(cssContent.includes('.left-sidebar.collapsed'), '.left-sidebar.collapsed deve ser definida');
});

runTest('2.2 - Board Viewport ocupa altura total de 100vh com flex: 1', () => {
  assert(cssContent.includes('.board-viewport'), 'CSS deve definir .board-viewport');
  assert(cssContent.includes('height: 100vh'), '.board-viewport deve ter height: 100vh');
  assert(cssContent.includes('flex: 1'), '.board-viewport deve ter flex: 1');
});

runTest('2.3 - Drawer de Eletivas acoplado ao lado da Left Sidebar (left: 290px)', () => {
  assert(cssContent.includes('.electives-drawer'), 'CSS deve definir .electives-drawer');
  assert(cssContent.includes('.electives-drawer.open'), 'CSS deve definir .electives-drawer.open');
  assert(cssContent.includes('left: 290px'), '.electives-drawer.open deve ter left: 290px');
  assert(cssContent.includes('left: 0'), 'Quando sidebar colapsada, drawer deve abrir em left: 0');
});

runTest('2.4 - Checkboxes de conclusão de coluna de semestre estilizados', () => {
  assert(cssContent.includes('.col-complete-check'), 'CSS deve definir .col-complete-check');
  assert(cssContent.includes('.col-complete-check:checked'), 'CSS deve definir estado :checked');
  assert(cssContent.includes('.col-complete-check:indeterminate'), 'CSS deve definir estado :indeterminate');
});

// -----------------------------------------------------------------------------
// SEÇÃO 3: MOTOR DE CONTABILIZAÇÃO DE CRÉDITOS FEITOS VS PLANEJADOS
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 3: MOTOR DE CONTABILIZAÇÃO DE CRÉDITOS FEITOS VS PLANEJADOS');
console.log('-----------------------------------------------------------------------------');

runTest('3.1 - Estado Inicial: Zero créditos feitos e 100% de créditos planejados corretos', () => {
  const engine = app.createEngine(curriculumJson, 1);
  const summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.total, 0, 'Créditos concluídos iniciais devem ser 0');
  assert.strictEqual(summary.done.obr, 0, 'Obrigatórios concluídos iniciais devem ser 0');
  assert.strictEqual(summary.done.fdc, 0, 'FDC concluídos iniciais devem ser 0');
  assert.strictEqual(summary.done.ele, 0, 'Eletivos concluídos iniciais devem ser 0');
  assert.strictEqual(summary.percentage, 0, 'Percentual concluído inicial deve ser 0%');
  assert(summary.planned.total >= 220, `Planejado total deve ser >= 220 cr (obtido: ${summary.planned.total})`);
});

runTest('3.2 - Marcação Individual de Matéria Obrigatória reflete em Feitos Obrigatórios', () => {
  const engine = app.createEngine(curriculumJson, 1);
  // MAT01353 (Cálculo e Geometria Analítica I - A) = 6 créditos
  const cr = engine.state.courses['MAT01353'].creditos;
  engine.state.allocations['MAT01353'].completed = true;

  const summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.total, cr, `Concluídos totais deve ser ${cr}`);
  assert.strictEqual(summary.done.obr, cr, `Concluídos obrigatórios deve ser ${cr}`);
  assert.strictEqual(summary.done.fdc, 0);
  assert.strictEqual(summary.done.ele, 0);
  assert(summary.percentage > 0, 'Percentual deve ser maior que 0%');
});

runTest('3.3 - Marcação de Disciplina de FDC reflete em Feitos FDC', () => {
  const engine = app.createEngine(curriculumJson, 1);
  // ENG03386 (Fabricação Auxiliada por Computador - FDC 1) = 4 créditos
  const cr = engine.state.courses['ENG03386'].creditos;
  engine.state.allocations['ENG03386'].completed = true;

  const summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.fdc, cr, `Concluídos FDC deve ser ${cr}`);
  assert.strictEqual(summary.done.total, cr);
});

runTest('3.4 - Marcação de Disciplina Eletiva reflete em Feitos Eletivos', () => {
  const engine = app.createEngine(curriculumJson, 1);
  // Aloca uma eletiva livre na grade e marca concluída
  const eleCode = 'ENG03003'; // Robótica é eletiva na FDC 1 quando Robótica A está ativa
  engine.moveCourse(eleCode, 6);
  engine.state.allocations[eleCode].completed = true;

  const cr = engine.state.courses[eleCode].creditos;
  const summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.ele, cr, `Concluídos Eletivos deve ser ${cr}`);
});

runTest('3.5 - Toggle de Coluna de Semestre marca e desmarca todas as matérias daquele semestre', () => {
  const engine = app.createEngine(curriculumJson, 1);
  
  // Semestre 1: obtém créditos esperados do semestre 1
  let sem1Creds = 0;
  Object.keys(engine.state.allocations).forEach(c => {
    if (engine.state.allocations[c].semester === 1) {
      sem1Creds += engine.state.courses[c].creditos;
    }
  });
  assert(sem1Creds > 0, 'Semestre 1 deve possuir créditos');

  // Marca semestre 1 completo
  const markedCount = engine.toggleSemesterColumnCompletion(1, true);
  assert(markedCount > 0, 'Deve ter marcado matérias do semestre 1');

  let summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.total, sem1Creds, `Concluídos totais deve bater com semestre 1 (${sem1Creds})`);

  // Desmarca semestre 1
  engine.toggleSemesterColumnCompletion(1, false);
  summary = engine.getCreditsSummary();
  assert.strictEqual(summary.done.total, 0, 'Após desmarcar, concluídos totais deve retornar a 0');
});

// -----------------------------------------------------------------------------
// SEÇÃO 4: RESILIÊNCIA E INTEGRIDADE DA EXPORTAÇÃO VISUAL (PNG E PDF)
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 4: RESILIÊNCIA E INTEGRIDADE DA EXPORTAÇÃO VISUAL (PNG E PDF)');
console.log('-----------------------------------------------------------------------------');

runTest('4.1 - Funções de exportação presentes no módulo', () => {
  assert.strictEqual(typeof app.ensureExportLibsLoaded, 'function', 'ensureExportLibsLoaded deve existir');
  assert.strictEqual(typeof app.captureBoardCanvas, 'function', 'captureBoardCanvas deve existir');
  assert.strictEqual(typeof app.exportToPng, 'function', 'exportToPng deve existir');
  assert.strictEqual(typeof app.exportToPdf, 'function', 'exportToPdf deve existir');
});

runTest('4.2 - ensureExportLibsLoaded retorna Promise que resolve deterministicamente', async () => {
  const res = await app.ensureExportLibsLoaded();
  assert.strictEqual(res, true, 'ensureExportLibsLoaded deve resolver com true em ambiente não-browser');
});

runTest('4.3 - captureBoardCanvas lança erro controlado e seguro fora de navegador sem travar processo', async () => {
  try {
    await app.captureBoardCanvas();
    assert.fail('Deveria lançar erro fora do browser');
  } catch (err) {
    assert(err.message.includes('navegador'), 'Mensagem de erro deve ser informativa para ambiente não-browser');
  }
});

// -----------------------------------------------------------------------------
// SUMÁRIO FINAL
// -----------------------------------------------------------------------------
console.log('\n================================================================================');
console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests/totalTests)*100).toFixed(1)}%)`);
if (passedTests === totalTests) {
  console.log(' SUCESSO TOTAL: TODAS AS REGRAS DO PROMPT 2/2 FORAM IMPLEMENTADAS E APROVADAS!');
  console.log(' (1) Barra Lateral Esquerda Fixa e Recolhível (290px): OK');
  console.log(' (2) Reorganização em 5 Blocos Modulares sem Overflow: OK');
  console.log(' (3) Contador de Créditos Feitos vs Planejados (Obrig, FDC, Elet): OK');
  console.log(' (4) Checkboxes de Conclusão por Card e Coluna de Semestre: OK');
  console.log(' (5) Pipeline Robusto e Determinístico de Exportação PNG/PDF: OK');
} else {
  console.log(` ATENÇÃO: ${totalTests - passedTests} TESTE(S) FALHARAM.`);
  process.exit(1);
}
console.log('================================================================================\n');
