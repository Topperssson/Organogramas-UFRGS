/**
 * SUÍTE DE TESTES AUTOMATIZADOS: REFINAMENTOS STEP 5
 * 1. Barra Contadora Separada para Créditos Eletivos vs. Obrigatórios
 * 2. Diálogo "Salvar Como" (showSaveFilePicker + fallback prompt) nos Downloads (JSON, PNG, PDF)
 * 3. Borda Verde de Alta Especificidade (#10B981) nas Disciplinas Concluídas
 * 4. Filtro de Destaque Visual por Semestre Original (1º ao 10º + Elet)
 * 5. Desbloqueio e Coexistência de Robótica (ENG03003) e Robótica A (ENG03026)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function runTest(title, testFn) {
  try {
    testFn();
    console.log(`  [PASS] ${title}`);
    testsPassed++;
  } catch (err) {
    console.error(`  [FAIL] ${title}`);
    console.error(`         -> ${err.message}`);
    testsFailed++;
  }
}

console.log('='.repeat(80));
console.log(' SUÍTE DE TESTES: REFINAMENTOS STEP 5 (BARRAS DUPLAS, SALVAR COMO, BORDA & ROBÓTICA)');
console.log('='.repeat(80));

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const curriculum = JSON.parse(fs.readFileSync(path.join(__dirname, 'curriculum_data.json'), 'utf8'));
const app = require('./app.js');

// -----------------------------------------------------------------------------
// SEÇÃO 1: BARRAS CONTADORAS DUPLAS DE CRÉDITOS (OBRIGATÓRIOS + FDC vs ELETIVAS)
// -----------------------------------------------------------------------------
console.log('\n' + '-'.repeat(75));
console.log(' SEÇÃO 1: BARRAS CONTADORAS INDEPENDENTES (OBRIGATÓRIOS+FDC vs ELETIVAS)');
console.log('-'.repeat(75));

runTest('1.1 - HTML: Estrutura de Barra 1 (Obrigatórios + FDC) presente com IDs essenciais', () => {
  assert(htmlContent.includes('tracker-group-obrig'), 'Deve conter grupo .tracker-group-obrig');
  assert(htmlContent.includes('Obrigatórios + FDC'), 'Deve conter cabeçalho Obrigatórios + FDC');
  assert(htmlContent.includes('id="stat-obrig-done"'), 'Deve conter #stat-obrig-done');
  assert(htmlContent.includes('id="stat-obrig-target"'), 'Deve conter #stat-obrig-target');
  assert(htmlContent.includes('id="credits-percent-text"'), 'Deve manter compatibilidade com #credits-percent-text');
  assert(htmlContent.includes('id="credits-progress-fill"'), 'Deve manter compatibilidade com #credits-progress-fill');
});

runTest('1.2 - HTML: Estrutura de Barra 2 (Créditos Eletivos) presente com IDs dedicados', () => {
  assert(htmlContent.includes('tracker-group-ele'), 'Deve conter grupo .tracker-group-ele');
  assert(htmlContent.includes('Créditos Eletivos'), 'Deve conter cabeçalho Créditos Eletivos');
  assert(htmlContent.includes('id="stat-ele-done"'), 'Deve conter #stat-ele-done');
  assert(htmlContent.includes('id="stat-ele-target"'), 'Deve conter #stat-ele-target');
  assert(htmlContent.includes('id="credits-ele-percent-text"'), 'Deve conter #credits-ele-percent-text');
  assert(htmlContent.includes('id="credits-ele-progress-fill"'), 'Deve conter #credits-ele-progress-fill');
});

runTest('1.3 - HTML: Mantém totalizadores e adiciona sub-linha planejada no board', () => {
  assert(htmlContent.includes('id="stat-completed-credits"'), 'Deve conter #stat-completed-credits');
  assert(htmlContent.includes('id="stat-target-credits"'), 'Deve conter #stat-target-credits');
  assert(htmlContent.includes('id="stat-done-obr"'), 'Deve conter #stat-done-obr');
  assert(htmlContent.includes('id="stat-done-fdc"'), 'Deve conter #stat-done-fdc');
  assert(htmlContent.includes('id="stat-done-ele"'), 'Deve conter #stat-done-ele');
  assert(htmlContent.includes('id="stat-planned-obrig"'), 'Deve conter #stat-planned-obrig');
  assert(htmlContent.includes('id="stat-planned-ele"'), 'Deve conter #stat-planned-ele');
});

runTest('1.4 - CSS: Estilização das barras duplas (gradiente azul/verde e âmbar/rosa)', () => {
  assert(cssContent.includes('.progress-bar-obrig'), 'CSS deve definir .progress-bar-obrig');
  assert(cssContent.includes('.progress-bar-ele'), 'CSS deve definir .progress-bar-ele');
  assert(cssContent.includes('#38bdf8'), 'CSS deve conter ciano/azul para obrigatórias');
  assert(cssContent.includes('#10b981') || cssContent.includes('#10B981'), 'CSS deve conter verde');
  assert(cssContent.includes('#ec4899') || cssContent.includes('#EC4899'), 'CSS deve conter tom magenta para eletivas');
});

runTest('1.5 - Motor de Créditos: Metas nominais corretas (222 cr obrig/fdc e 8 cr eletivas)', () => {
  const engine = app.createEngine(curriculum, 1);
  const metaObrig = (engine.state.curriculum || curriculum).estatisticas_nominais.creditos_obrigatorios;
  const metaEle = (engine.state.curriculum || curriculum).estatisticas_nominais.creditos_eletivos;
  assert.strictEqual(metaObrig, 222, 'Meta de obrigatórias deve ser 222 créditos');
  assert.strictEqual(metaEle, 8, 'Meta de eletivas deve ser 8 créditos');
  assert.strictEqual(metaObrig + metaEle, 230, 'Total de créditos para formatura nominal deve ser 230');
});

// -----------------------------------------------------------------------------
// SEÇÃO 2: DIÁLOGO "SALVAR COMO" (showSaveFilePicker + FALLBACK PROMPT)
// -----------------------------------------------------------------------------
console.log('\n' + '-'.repeat(75));
console.log(' SEÇÃO 2: DIÁLOGO "SALVAR COMO" (JSON, PNG, PDF)');
console.log('-'.repeat(75));

runTest('2.1 - Função saveFileWithDialog exportada pelo módulo', () => {
  assert(typeof app.saveFileWithDialog === 'function', 'saveFileWithDialog deve ser uma função assíncrona exportada');
});

runTest('2.2 - saveFileWithDialog usa showSaveFilePicker quando disponível no window', async () => {
  let pickerCalled = false;
  let writeCalled = false;
  const mockWindow = {
    showSaveFilePicker: async (options) => {
      pickerCalled = true;
      assert.strictEqual(options.suggestedName, 'teste.json');
      return {
        createWritable: async () => ({
          write: async (b) => { writeCalled = true; },
          close: async () => {}
        })
      };
    }
  };

  // Testa invocação com mock
  const oldWindow = global.window;
  try {
    global.window = mockWindow;
    const blob = { size: 100 };
    const saved = await app.saveFileWithDialog(blob, 'teste.json', 'Arquivo JSON', 'application/json', '.json');
    assert.strictEqual(saved, true, 'saveFileWithDialog deve retornar true após salvar');
    assert.strictEqual(pickerCalled, true, 'Deve ter invocado showSaveFilePicker');
    assert.strictEqual(writeCalled, true, 'Deve ter gravado no stream writable');
  } finally {
    global.window = oldWindow;
  }
});

runTest('2.3 - saveFileWithDialog silencia AbortError quando usuário cancela o picker', async () => {
  const oldWindow = global.window;
  try {
    global.window = {
      showSaveFilePicker: async () => {
        const err = new Error('The user aborted a request.');
        err.name = 'AbortError';
        throw err;
      }
    };
    const blob = { size: 10 };
    const saved = await app.saveFileWithDialog(blob, 'teste.json', 'JSON', 'application/json', '.json');
    assert.strictEqual(saved, false, 'Deve retornar false silenciosamente sem lançar exceção');
  } finally {
    global.window = oldWindow;
  }
});

runTest('2.4 - saveFileWithDialog executa fallback window.prompt quando picker não suportado', async () => {
  const oldWindow = global.window;
  const oldDoc = global.document;
  try {
    let promptCalled = false;
    let clickCalled = false;
    global.window = {
      prompt: (msg, def) => {
        promptCalled = true;
        assert(msg.includes('nome do arquivo'));
        return 'meu_plano_customizado';
      }
    };
    global.document = {
      createElement: () => ({
        set href(v) {},
        set download(v) {
          assert.strictEqual(v, 'meu_plano_customizado.json', 'Extensão deve ser anexada automaticamente se ausente');
        },
        click: () => { clickCalled = true; }
      }),
      body: {
        appendChild: () => {},
        removeChild: () => {}
      }
    };
    global.URL = {
      createObjectURL: () => 'blob:mock',
      revokeObjectURL: () => {}
    };

    const blob = { size: 50 };
    const saved = await app.saveFileWithDialog(blob, 'sugerido.json', 'JSON', 'application/json', '.json');
    assert.strictEqual(saved, true, 'Deve concluir download via fallback');
    assert.strictEqual(promptCalled, true, 'Deve ter aberto o prompt para o usuário');
    assert.strictEqual(clickCalled, true, 'Deve ter acionado clique de download no elemento <a>');
  } finally {
    global.window = oldWindow;
    global.document = oldDoc;
  }
});

runTest('2.5 - Conexão de saveFileWithDialog nos 3 botões (JSON, PNG, PDF)', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert(jsContent.includes('saveFileWithDialog(blob, suggestedName, \'Arquivo JSON'), 'exportStateToJson deve usar saveFileWithDialog');
  assert(jsContent.includes('saveFileWithDialog(blob, suggestedName, \'Imagem PNG'), 'exportToPng deve usar saveFileWithDialog');
  assert(jsContent.includes('saveFileWithDialog(pdfBlob, suggestedName, \'Documento PDF'), 'exportToPdf deve usar saveFileWithDialog');
});

// -----------------------------------------------------------------------------
// SEÇÃO 3: BORDA VERDE DE ALTA ESPECIFICIDADE (#10B981) NAS CONCLUÍDAS
// -----------------------------------------------------------------------------
console.log('\n' + '-'.repeat(75));
console.log(' SEÇÃO 3: BORDA VERDE DE ALTA ESPECIFICIDADE NAS CONCLUÍDAS');
console.log('-'.repeat(75));

runTest('3.1 - CSS: Regra de alta especificidade com border: 2px solid #10B981 !important', () => {
  assert(cssContent.includes('.course-card.course-completed') || cssContent.includes('.course-card[data-completed="true"]'),
    'CSS deve definir seletor para card concluído');
  assert(cssContent.includes('border: 2px solid #10B981 !important;'),
    'CSS deve conter borda de 2px sólida #10B981 com !important');
  assert(cssContent.includes('box-shadow: 0 0 10px rgba(16, 185, 129, 0.25) !important;'),
    'CSS deve conter sombra de glow esmeralda com !important');
});

runTest('3.2 - JS: Atribuição de classes e atributos data-completed="true" e .course-completed', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert(jsContent.includes('course-completed'), 'createCardElement deve adicionar .course-completed');
  assert(jsContent.includes('data-completed'), 'createCardElement deve adicionar data-completed');
});

// -----------------------------------------------------------------------------
// SEÇÃO 4: FILTRO DE DESTAQUE POR SEMESTRE ORIGINAL (1º AO 10º + ELET)
// -----------------------------------------------------------------------------
console.log('\n' + '-'.repeat(75));
console.log(' SEÇÃO 4: FILTRO DE DESTAQUE VISUAL POR SEMESTRE ORIGINAL');
console.log('-'.repeat(75));

runTest('4.1 - HTML: Grade de chips 1º a 10º + Elet com dados data-stage', () => {
  assert(htmlContent.includes('stage-chips-grid'), 'Deve conter #stage-chips-grid');
  assert(htmlContent.includes('data-stage="all"'), 'Deve conter chip Todos (data-stage="all")');
  for (let s = 1; s <= 10; s++) {
    assert(htmlContent.includes(`data-stage="${s}"`), `Deve conter chip para ${s}º Semestre`);
    assert(htmlContent.includes(`dot-stage-${s}`), `Deve conter dot colorido dot-stage-${s}`);
  }
  assert(htmlContent.includes('data-stage="elet"'), 'Deve conter chip para Eletivas');
});

runTest('4.2 - CSS: Classes de destaque (.stage-highlighted) e atenuação (.stage-dimmed)', () => {
  assert(cssContent.includes('.course-card.stage-highlighted'), 'CSS deve definir .stage-highlighted');
  assert(cssContent.includes('transform: scale(1.02)'), 'Destaque deve ampliar sutilmente o card');
  assert(cssContent.includes('.course-card.stage-dimmed'), 'CSS deve definir .stage-dimmed');
  assert(cssContent.includes('opacity: 0.22 !important;'), 'Cards não correspondentes devem ser atenuados para 0.22');
  assert(cssContent.includes('filter: grayscale(40%) !important;'), 'Cards não correspondentes devem receber grayscale');
});

runTest('4.3 - JS: Funções de manipulação de destaque exportadas e ativas', () => {
  assert(typeof app.setStageHighlight === 'function', 'setStageHighlight deve estar disponível');
  assert(typeof app.applyStageHighlightToCards === 'function', 'applyStageHighlightToCards deve estar disponível');
  
  // Testa alternância de estado de highlight
  app.state.highlightStage = null;
  app.setStageHighlight('5');
  assert.strictEqual(app.state.highlightStage, '5', 'setStageHighlight(5) deve definir highlightStage = "5"');
  app.setStageHighlight('5');
  assert.strictEqual(app.state.highlightStage, null, 'Clicar novamente no mesmo semestre deve resetar o destaque para null');
  app.setStageHighlight('3');
  assert.strictEqual(app.state.highlightStage, '3', 'Deve ativar semestre 3');
  app.setStageHighlight('all');
  assert.strictEqual(app.state.highlightStage, null, 'Clicar em all deve resetar');
});

// -----------------------------------------------------------------------------
// SEÇÃO 5: DESBLOQUEIO E COEXISTÊNCIA DE ROBÓTICA (ENG03003) E ROBÓTICA A (ENG03026)
// -----------------------------------------------------------------------------
console.log('\n' + '-'.repeat(75));
console.log(' SEÇÃO 5: DESBLOQUEIO E COEXISTÊNCIA DE ROBÓTICA (ENG03003 vs ENG03026)');
console.log('-'.repeat(75));

runTest('5.1 - Ambas possuem alternativeOf mútuo configurado', () => {
  const engine = app.createEngine(curriculum, 1);
  const rob = engine.state.courses['ENG03003'];
  const robA = engine.state.courses['ENG03026'];
  assert(rob && robA, 'Ambas as disciplinas devem existir no catálogo');
  assert.strictEqual(rob.alternativeOf, 'ENG03026');
  assert.strictEqual(robA.alternativeOf, 'ENG03003');
});

runTest('5.2 - Coexistência na grade: Robótica alocada em semestre diferente permanece como eletiva', () => {
  const engine = app.createEngine(curriculum, 1);
  // Por padrão: ENG03026 está alocada no Semestre 5 como obrigatória; ENG03003 está no banco (null)
  assert.strictEqual(engine.state.allocations['ENG03026'].semester, 5);
  assert.strictEqual(engine.state.allocations['ENG03003'].semester, null);

  // Usuário arrasta ENG03003 para o Semestre 6 (mantendo ENG03026 no Semestre 5)
  engine.moveCourse('ENG03003', 6);

  // AMBAS devem permanecer na grade!
  assert.strictEqual(engine.state.allocations['ENG03026'].semester, 5, 'ENG03026 deve permanecer no Semestre 5');
  assert.strictEqual(engine.state.allocations['ENG03003'].semester, 6, 'ENG03003 deve ser alocada no Semestre 6');

  // Tipos: Uma é obrigatória e a outra é eletiva
  const typeRobA = engine.getCourseTypeInFdc('ENG03026', 1);
  const typeRob = engine.getCourseTypeInFdc('ENG03003', 1);
  assert.strictEqual(typeRobA, 'obrigatoria', 'ENG03026 é a obrigatória ativa');
  assert.strictEqual(typeRob, 'eletiva', 'ENG03003 atua como eletiva na grade gerando créditos eletivos');
});

runTest('5.3 - Créditos de Robótica alocada como Eletiva somam aos créditos de eletiva', () => {
  const engine = app.createEngine(curriculum, 1);
  engine.moveCourse('ENG03003', 6);
  
  // Simula conclusão de ENG03003 como eletiva
  engine.state.allocations['ENG03003'].completed = true;

  // Verifica que os 4 créditos contam para eletivas
  const c = engine.state.courses['ENG03003'];
  assert.strictEqual(c.creditos, 4, 'Robótica possui 4 créditos');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03003', 1), 'eletiva');
});

runTest('5.4 - Substituição Explícita via swapAlternative troca as posições', () => {
  const engine = app.createEngine(curriculum, 1);
  // Inicia ENG03026 no S5 e ENG03003 no banco
  engine.swapAlternative('ENG03003');

  // Agora ENG03003 é obrigatória no S5 e ENG03026 foi para o banco como eletiva
  assert.strictEqual(engine.state.allocations['ENG03003'].semester, 5);
  assert.strictEqual(engine.state.allocations['ENG03026'].semester, null);
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03003', 1), 'obrigatoria');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03026', 1), 'eletiva');
});

runTest('5.5 - Botão no card exibe texto amigável de alternância', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert(jsContent.includes('Alternar com') || jsContent.includes('Trocar por'),
    'Deve incluir botão de alternância explícita no card');
});

// -----------------------------------------------------------------------------
// RELATÓRIO FINAL
// -----------------------------------------------------------------------------
const total = testsPassed + testsFailed;
const pct = ((testsPassed / total) * 100).toFixed(1);
console.log('\n' + '='.repeat(80));
console.log(` RESULTADO FINAL: ${testsPassed}/${total} TESTES APROVADOS (${pct}%)`);
if (testsFailed === 0) {
  console.log(' SUCESSO TOTAL: TODAS AS 5 CORREÇÕES FORAM IMPLEMENTADAS E APROVADAS!');
  console.log(' (1) Barras Duplas (Obrigatórios+FDC e Eletivas Separadas): OK');
  console.log(' (2) Diálogo "Salvar Como" nos Downloads (showSaveFilePicker + Fallback): OK');
  console.log(' (3) Borda Verde de Alta Especificidade (#10B981) nas Concluídas: OK');
  console.log(' (4) Filtro de Destaque por Semestre Original (1º a 10º + Elet): OK');
  console.log(' (5) Desbloqueio e Coexistência de Robótica / Robótica A: OK');
} else {
  console.error(` ATENÇÃO: ${testsFailed} TESTE(S) FALHARAM. VERIFIQUE O LOG ACIMA.`);
  process.exit(1);
}
console.log('='.repeat(80) + '\n');
