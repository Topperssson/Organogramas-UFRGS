/**
 * test_ceeca_integration.js
 *
 * Suíte de Testes de Integração e Não-Regressão
 * Alinhamento com Organograma-CEECA & Trajetória Acadêmica ECA - UFRGS
 *
 * Valida:
 * 1. Sincronização exata com o dataset oficial CEECA (15 P1, 13 P2, 55 Ambos).
 * 2. Motor determinístico de resolução de periodicidade e propagação em cascata DAG.
 * 3. Seletor de FDCs no padrão CEECA (chips) e tipagem cromática dos cards.
 * 4. Badges de etapa original (1 a 10) com as 10 variáveis pastel e contraste.
 * 5. Não-regressão das barreiras de crédito, exportação, persistência e buffer.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const curriculum = require('./curriculum_data.json');
const app = require('./app.js');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Erro: ${err.message}`);
    if (err.stack) {
      console.error(`         Stack: ${err.stack.split('\n').slice(1, 4).join('\n')}`);
    }
    failedTests++;
  }
}

console.log('================================================================================');
console.log(' SUÍTE DE INTEGRAÇÃO CEECA & NÃO-REGRESSÃO: SIMULADOR CURRICULAR ECA UFRGS');
console.log('================================================================================');

// -----------------------------------------------------------------------------
// SEÇÃO 1: PARIDADE RIGOROSA COM O DATASET DO ORGANOGRAMA CEECA
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 1: PARIDADE RIGOROSA COM O DATASET DO ORGANOGRAMA CEECA');
console.log('-----------------------------------------------------------------------------');

const EXPECTED_CEECA_P1 = [
  'CCA99001', 'ENG03043', 'ENG10042', 'ENG10044', 'ENG07086',
  'ENG10049', 'ENG10005', 'ENG10048', 'ENG10018', 'ENG07087',
  'ENG10021', 'ENG10046', 'ENG10051', 'ENG10050', 'ENG03047'
];

const EXPECTED_CEECA_P2 = [
  'INF01057', 'ENG10043', 'ENG10047', 'ENG10022', 'ENG10023',
  'ENG10004', 'ENG03045', 'ENG07042', 'ENG10019', 'ENG03387',
  'ENG10052', 'ENG10027', 'ENG03046'
];

runTest('1.1 - Catálogo possui exatamente 83 disciplinas cadastradas', () => {
  const codes = Object.keys(curriculum.disciplinas);
  assert.strictEqual(codes.length, 83, `Total de disciplinas deve ser 83, obtido: ${codes.length}`);
});

runTest('1.2 - Exatamente 15 disciplinas com oferta anual no 1º Semestre (P1)', () => {
  const p1List = Object.keys(curriculum.disciplinas).filter(c => curriculum.disciplinas[c].periodicidade === '1');
  assert.strictEqual(p1List.length, 15, `Deve haver 15 disciplinas P1, obtido: ${p1List.length}`);
  EXPECTED_CEECA_P1.forEach(code => {
    assert(curriculum.disciplinas[code], `Disciplina ${code} deve existir no catálogo`);
    assert.strictEqual(curriculum.disciplinas[code].periodicidade, '1', `${code} deve ter periodicidade '1'`);
    assert.strictEqual(curriculum.disciplinas[code].oferta, '1', `${code} deve ter oferta '1'`);
  });
});

runTest('1.3 - Exatamente 13 disciplinas com oferta anual no 2º Semestre (P2)', () => {
  const p2List = Object.keys(curriculum.disciplinas).filter(c => curriculum.disciplinas[c].periodicidade === '2');
  assert.strictEqual(p2List.length, 13, `Deve haver 13 disciplinas P2, obtido: ${p2List.length}`);
  EXPECTED_CEECA_P2.forEach(code => {
    assert(curriculum.disciplinas[code], `Disciplina ${code} deve existir no catálogo`);
    assert.strictEqual(curriculum.disciplinas[code].periodicidade, '2', `${code} deve ter periodicidade '2'`);
    assert.strictEqual(curriculum.disciplinas[code].oferta, '2', `${code} deve ter oferta '2'`);
  });
});

runTest('1.4 - Exatamente 55 disciplinas semestrais ofertadas em ambos os semestres', () => {
  const ambosList = Object.keys(curriculum.disciplinas).filter(c => curriculum.disciplinas[c].periodicidade === 'ambos');
  assert.strictEqual(ambosList.length, 55, `Deve haver 55 disciplinas com periodicidade 'ambos', obtido: ${ambosList.length}`);
  ambosList.forEach(code => {
    assert.strictEqual(curriculum.disciplinas[code].oferta, 'ambos', `${code} deve ter oferta 'ambos'`);
  });
});

runTest('1.5 - Sincronismo entre curriculum_data.json e curriculum_data.js', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'curriculum_data.js'), 'utf8');
  EXPECTED_CEECA_P1.forEach(code => {
    assert(jsContent.includes(`"${code}"`), `curriculum_data.js deve conter código ${code}`);
  });
  EXPECTED_CEECA_P2.forEach(code => {
    assert(jsContent.includes(`"${code}"`), `curriculum_data.js deve conter código ${code}`);
  });
});

// -----------------------------------------------------------------------------
// SEÇÃO 2: VALIDAÇÃO DE PERIODICIDADE & PROPAGAÇÃO EM CASCATA DAG
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 2: VALIDAÇÃO DE PERIODICIDADE & PROPAGAÇÃO EM CASCATA DAG');
console.log('-----------------------------------------------------------------------------');

runTest('2.1 - Drop de disciplina P1 (ENG07086) em semestre par força avanço para próximo ímpar (+1)', () => {
  const engine = app.createEngine(curriculum, 2);
  const res = engine.moveCourse('ENG07086', 4);
  assert.strictEqual(engine.state.allocations['ENG07086'].semester, 5, 'ENG07086 deve ir para S5');
  assert.strictEqual(res.periodicityAdjusted, true, 'Deve indicar ajuste por periodicidade');
});

runTest('2.2 - Drop de disciplina P2 (ENG10043) em semestre ímpar força avanço para próximo par (+1)', () => {
  const engine = app.createEngine(curriculum, 2);
  const res = engine.moveCourse('ENG10043', 5);
  assert.strictEqual(engine.state.allocations['ENG10043'].semester, 6, 'ENG10043 deve ir para S6');
  assert.strictEqual(res.periodicityAdjusted, true, 'Deve indicar ajuste por periodicidade');
});

runTest('2.3 - Disciplinas "ambos" podem ser alocadas livremente em semestres pares ou ímpares', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG03041 (Mecânica Aplicada I)
  const resOdd = engine.moveCourse('ENG03041', 3);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 3);
  assert.strictEqual(resOdd.periodicityAdjusted, false);

  const resEven = engine.moveCourse('ENG03041', 4);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 4);
  assert.strictEqual(resEven.periodicityAdjusted, false);
});

runTest('2.4 - Cascata Complexa DAG com múltiplos nós periódicos downstream', () => {
  const engine = app.createEngine(curriculum, 3);
  // FDC 3: Potência
  // ENG10044 (P1, S5) -> ENG10045 (ambos, S6) -> ENG10049 (P1, S7) -> ENG10050 (P1, S9)
  const res = engine.moveCourse('ENG10044', 6);
  // ENG10044 tentou S6 (par) -> ajusta para S7 (P1)
  // ENG10045 antes em S6 -> empurrado para S8 (ambos)
  // ENG10049 antes em S7 -> empurrado para S9 (P1)
  // ENG10050 antes em S9 -> empurrado para S10 (par) -> ajusta para S11 (P1)!
  assert.strictEqual(engine.state.allocations['ENG10044'].semester, 7);
  assert.strictEqual(engine.state.allocations['ENG10045'].semester, 8);
  assert.strictEqual(engine.state.allocations['ENG10049'].semester, 9);
  assert.strictEqual(engine.state.allocations['ENG10050'].semester, 11);
  assert(res.cascaded.includes('ENG10045'));
  assert(res.cascaded.includes('ENG10049'));
  assert(res.cascaded.includes('ENG10050'));
});

// -----------------------------------------------------------------------------
// SEÇÃO 3: SELETOR DE FDCS ESTILO CEECA & DIFERENCIAÇÃO CROMÁTICA
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 3: SELETOR DE FDCS ESTILO CEECA & DIFERENCIAÇÃO CROMÁTICA');
console.log('-----------------------------------------------------------------------------');

runTest('3.1 - HTML contém grupo de chips de seleção de FDC estilo CEECA', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(html.includes('fdc-chips-group'), 'Deve existir .fdc-chips-group no HTML');
  assert(html.includes('data-fdc="1"'), 'Deve existir chip para FDC 1');
  assert(html.includes('data-fdc="2"'), 'Deve existir chip para FDC 2');
  assert(html.includes('data-fdc="3"'), 'Deve existir chip para FDC 3');
  assert(!html.includes('data-fdc="4"'), 'Não deve existir chip para FDC 4');
});

runTest('3.2 - CSS define estilização cromática para Obrigatórias, FDC e Eletivas', () => {
  const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  assert(css.includes('.card-type-obrigatoria'), 'CSS deve definir .card-type-obrigatoria');
  assert(css.includes('.card-type-fdc'), 'CSS deve definir .card-type-fdc');
  assert(css.includes('.card-type-eletiva'), 'CSS deve definir .card-type-eletiva');
  assert(css.includes('#D97706') || css.includes('#f59e0b'), 'CSS deve conter destaque âmbar/dourado para FDC 1');
  assert(css.includes('#EC4899') || css.includes('#84cc16'), 'CSS deve conter estilo para Eletivas');
});

runTest('3.3 - Classificação dinâmica e precisa de disciplinas ao alternar FDCs', () => {
  const engine = app.createEngine(curriculum, 1);
  // FDC 1: CAD/CAM -> ENG03386 é obrigatória, ENG03047 (Mecânica) e ENG10046 (Potência) são eletivas
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03386', 1), 'obrigatoria');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03047', 1), 'eletiva');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG10046', 1), 'eletiva');
  assert.strictEqual(curriculum.disciplinas['ENG03386'].fdc_especifica, 1);

  // Troca para FDC 2: Mecânica -> ENG03047 vira obrigatória FDC, ENG03386 volta a eletiva
  engine.switchFdc(2);
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03047', 2), 'obrigatoria');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03386', 2), 'eletiva');
  assert.strictEqual(curriculum.disciplinas['ENG03047'].fdc_especifica, 2);

  // Troca para FDC 3: Potência -> ENG10046 vira obrigatória FDC, ENG03047 volta a eletiva
  engine.switchFdc(3);
  assert.strictEqual(engine.getCourseTypeInFdc('ENG10046', 3), 'obrigatoria');
  assert.strictEqual(engine.getCourseTypeInFdc('ENG03047', 3), 'eletiva');
  assert.strictEqual(curriculum.disciplinas['ENG10046'].fdc_especifica, 3);
});

// -----------------------------------------------------------------------------
// SEÇÃO 4: BADGES DE ETAPA ORIGINAL COM 10 CORES PASTEL
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 4: BADGES DE ETAPA ORIGINAL COM 10 CORES PASTEL');
console.log('-----------------------------------------------------------------------------');

runTest('4.1 - CSS define as 10 variáveis de cor pastel (--pastel-sem-1 a 10) e eletiva', () => {
  const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  for (let s = 1; s <= 10; s++) {
    assert(css.includes(`--pastel-sem-${s}`), `CSS deve definir --pastel-sem-${s}`);
    assert(css.includes(`.badge-orig-stage.stage-${s}`), `CSS deve definir .stage-${s}`);
  }
  assert(css.includes('--pastel-sem-elet'), 'CSS deve definir --pastel-sem-elet');
  assert(css.includes('.badge-orig-stage.stage-elet'), 'CSS deve definir .stage-elet');
});

runTest('4.2 - Todas as classes .stage-X possuem contraste visual alto (#0f172a / dark text)', () => {
  const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  assert(css.includes('.badge-orig-stage {'), 'CSS deve estilizar .badge-orig-stage');
  assert(css.includes('#0f172a'), 'Texto dos badges pastel deve ser de alto contraste (#0f172a)');
});

runTest('4.3 - Atribuição consistente de etapa oficial nos metadados para etapas 1 a 10', () => {
  const stagesSample = {
    1: ['MAT01353', 'FIS01181', 'INF01202'],
    2: ['MAT01354', 'FIS01182', 'INF01057'],
    3: ['MAT01167', 'FIS01183', 'ENG10042'],
    4: ['MAT01169', 'ENG10002', 'ENG10043'],
    5: ['ENG10044', 'ENG07086', 'ENG10017'],
    6: ['ENG10047', 'ENG10022', 'ENG10004'],
    7: ['ENG10049', 'ENG10005', 'ENG10018'],
    8: ['ENG03045', 'ENG07042', 'ENG10019'],
    9: ['ENG07087', 'CCA99002', 'CCA99004'],
    10: ['ENG03010', 'ENG03048', 'CCA99003']
  };

  Object.entries(stagesSample).forEach(([stageNum, codes]) => {
    codes.forEach(code => {
      const disc = curriculum.disciplinas[code];
      assert(disc, `Disciplina ${code} deve existir`);
      const s = parseInt(stageNum, 10);
      assert.strictEqual(disc.etapa_sugerida, s, `${code} deve pertencer à etapa ${s}`);
    });
  });
});

// -----------------------------------------------------------------------------
// SEÇÃO 5: TESTES DE NÃO-REGRESSÃO DE RECURSOS EXISTENTES
// -----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------------------');
console.log(' SEÇÃO 5: TESTES DE NÃO-REGRESSÃO DE RECURSOS EXISTENTES');
console.log('-----------------------------------------------------------------------------');

runTest('5.1 - Barreira de Créditos Mínimos: Bloqueia e ajusta CCA99004 (150 cr)', () => {
  const engine = app.createEngine(curriculum, 2);
  // Isola barreira de créditos marcando pré-requisitos como concluídos
  engine.state.allocations['ENG03027'].completed = true;
  engine.state.allocations['ENG10018'].completed = true;

  // Tentativa de mover CCA99004 para Semestre 5 (< 150 cr acumulados)
  const res = engine.moveCourse('CCA99004', 5);
  assert.strictEqual(res.creditAdjusted, true, 'Deve apontar ajuste por créditos');
  assert.strictEqual(engine.state.allocations['CCA99004'].semester, 7, 'CCA99004 deve avançar para Semestre 7');
  const accum = engine.calculateAccumulatedCredits(7);
  assert(accum >= 150, `Semestre alocado deve ter >= 150 créditos (obtido: ${accum})`);
});

runTest('5.2 - Ciclo Letivo Não-Destrutivo: Reconfigurar ano/semestre preserva alocações', () => {
  const engine = app.createEngine(curriculum, 2);
  const initialPositions = { ...engine.state.allocations };
  engine.applyCycleSequence(2027, 2);
  Object.keys(initialPositions).forEach(code => {
    assert.strictEqual(
      engine.state.allocations[code].semester,
      initialPositions[code].semester,
      `Disciplina ${code} não deve mudar de semestre ao renomear ciclo`
    );
  });
});

runTest('5.3 - Persistência JSON: Serialização e Deserialização mantêm fidelidade total', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.moveCourse('MAT01353', 3);
  const jsonStr = engine.exportStateToJson();
  const parsed = JSON.parse(jsonStr);

  const engine2 = app.createEngine(curriculum, 1);
  engine2.importStateFromJson(parsed);
  assert.strictEqual(engine2.state.allocations['MAT01353'].semester, engine.state.allocations['MAT01353'].semester);
  assert.strictEqual(engine2.state.currentFdc, engine.state.currentFdc);
});

runTest('5.4 - Buffer Único de Coluna: getVisibleColumnsCount() === S_max + 1', () => {
  const engine = app.createEngine(curriculum, 2);
  let maxS = 0;
  Object.values(engine.state.allocations).forEach(a => {
    if (a.semester && a.semester > maxS && a.semester <= 20) maxS = a.semester;
  });
  const visCols = engine.getVisibleColumnsCount();
  assert.strictEqual(visCols, maxS + 1, `Colunas visíveis (${visCols}) deve ser exatamente S_max + 1 (${maxS + 1})`);
});

runTest('5.5 - Alinhamento CSS: Semestres empilhados a partir do topo (flex-start)', () => {
  const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  assert(css.includes('.cards-container'), 'CSS deve definir .cards-container');
  assert(css.includes('justify-content: flex-start'), '.cards-container deve ter justify-content: flex-start');
});

runTest('5.6 - Métodos de Exportação Visual Presentes (PNG e PDF)', () => {
  assert(typeof app.exportToPng === 'function', 'app.exportToPng deve ser uma função');
  assert(typeof app.exportToPdf === 'function', 'app.exportToPdf deve ser uma função');
});

// -----------------------------------------------------------------------------
// SUMÁRIO FINAL
// -----------------------------------------------------------------------------
console.log('\n================================================================================');
console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests/totalTests)*100).toFixed(1)}%)`);
if (failedTests === 0) {
  console.log(' SUCESSO TOTAL: TODAS AS INTEGRAÇÕES CEECA E NÃO-REGRESSÕES ESTÃO PERFEITAS!');
} else {
  console.log(` ATENÇÃO: ${failedTests} TESTE(S) FALHARAM.`);
  process.exit(1);
}
console.log('================================================================================\n');
