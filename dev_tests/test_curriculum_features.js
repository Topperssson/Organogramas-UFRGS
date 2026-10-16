/**
 * Test Suite: Validação de Funcionalidades Curriculares e Solver DAG
 * Engenharia de Controle e Automação - UFRGS
 * 
 * Cobertura:
 * (1) Barreira de Créditos Mínimos (bloqueio/avanço de disciplinas com min_credits)
 * (2) Ciclo de Semestres Não-Destrutivo (applyCycleSequence preserva contagem e posicionamento)
 * (3) Serialização e Deserialização JSON com Paridade Estrita de Estado
 * (4) Flexibilidade de Oferta em Ambos os Semestres ('ambos' sem violação em par/ímpar)
 * (5) Buffer Único de Coluna Visível além do Último Semestre Populado (S_max + 1)
 * 
 * Execução: node test_curriculum_features.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Carregamento de módulos e dados
const appPath = path.join(__dirname, 'app.js');
const dataPath = path.join(__dirname, 'curriculum_data.json');

assert(fs.existsSync(appPath), 'O arquivo app.js deve existir.');
assert(fs.existsSync(dataPath), 'O arquivo curriculum_data.json deve existir.');

const app = require(appPath);
const curriculum = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('================================================================================');
console.log(' SUÍTE DE TESTES AUTOMATIZADOS: RECURSOS CURRICULARES E MOTOR DAG');
console.log(' Engenharia de Controle e Automação - UFRGS');
console.log('================================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(sectionNumber, testName, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] ${sectionNumber} - ${testName}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${sectionNumber} - ${testName}`);
    console.error(`         Detalhe do Erro: ${err.message}`);
    if (err.stack) {
      console.error(`         Stack: ${err.stack.split('\n').slice(1, 4).join('\n')}`);
    }
    process.exitCode = 1;
  }
}

// ============================================================================
// SEÇÃO 1: BARREIRA DE CRÉDITOS MÍNIMOS (MIN_CREDITS)
// ============================================================================
console.log('--------------------------------------------------------------------------------');
console.log(' SEÇÃO 1: VALIDAÇÃO DA BARREIRA DE CRÉDITOS MÍNIMOS (MIN_CREDITS)');
console.log('--------------------------------------------------------------------------------');

runTest('1.1', 'Metadados Curriculares: Disciplinas de barreira possuem min_credits configurados', () => {
  const d = curriculum.disciplinas;
  assert(d['CCA99004'], 'CCA99004 deve existir no catálogo');
  assert.strictEqual(d['CCA99004'].min_credits, 150, 'CCA99004 deve requerer 150 créditos mínimos');

  assert(d['CCA99008'], 'CCA99008 deve existir no catálogo');
  assert.strictEqual(d['CCA99008'].min_credits, 120, 'CCA99008 deve requerer 120 créditos mínimos');

  assert(d['CCA99009'], 'CCA99009 deve existir no catálogo');
  assert.strictEqual(d['CCA99009'].min_credits, 150, 'CCA99009 deve requerer 150 créditos mínimos');

  assert(d['CCA99002'], 'CCA99002 deve existir no catálogo');
  assert.strictEqual(d['CCA99002'].min_credits, 160, 'CCA99002 deve requerer 160 créditos mínimos');

  assert(d['CCA99003'], 'CCA99003 deve existir no catálogo');
  assert.strictEqual(d['CCA99003'].min_credits, 180, 'CCA99003 deve requerer 180 créditos mínimos');
});

runTest('1.2', 'Grade Padrão FDC 2: CCA99004 no Semestre 9 satisfaz barreira de 150 créditos', () => {
  const engine = app.createEngine(curriculum, 2);
  const accumBeforeS9 = engine.calculateAccumulatedCredits(9);
  
  // Na grade padrão sugerida, semestres 1 a 8 somam 212 créditos acumulados (> 150)
  assert(accumBeforeS9 >= 150, `Créditos antes do Semestre 9 (${accumBeforeS9}) devem ser >= 150`);
  assert.strictEqual(engine.state.allocations['CCA99004'].semester, 9);

  const dag = engine.validateTrajectoryDag();
  const minCreditViolations = dag.violations.filter(v => v.type === 'MIN_CREDITS' && v.course === 'CCA99004');
  assert.strictEqual(minCreditViolations.length, 0, 'Não deve haver violação de créditos mínimos para CCA99004 na grade padrão');
});

runTest('1.3', 'Detecção Estrita: Alocação artificial em semestre com créditos insuficientes gera violação MIN_CREDITS', () => {
  const engine = app.createEngine(curriculum, 2);
  // Aloca CCA99004 forçadamente no Semestre 5
  engine.state.allocations['CCA99004'].semester = 5;

  const accumBeforeS5 = engine.calculateAccumulatedCredits(5);
  assert(accumBeforeS5 < 150, `Créditos antes do Semestre 5 (${accumBeforeS5}) devem ser inferiores a 150`);

  const dag = engine.validateTrajectoryDag();
  const violation = dag.violations.find(v => v.type === 'MIN_CREDITS' && v.course === 'CCA99004');
  assert(violation, 'DAG deve detectar explicitamente violação do tipo MIN_CREDITS para CCA99004');
  assert.strictEqual(violation.minCredits, 150);
  assert.strictEqual(violation.accumCredits, accumBeforeS5);
  assert.strictEqual(violation.semCourse, 5);
});

runTest('1.4', 'Avanço Automático do Solver: moveCourse empurra CCA99004 para semestre com >= 150 créditos', () => {
  const engine = app.createEngine(curriculum, 2);
  // Pré-requisitos cumpridos para isolar a barreira de créditos
  engine.state.allocations['ENG03027'].completed = true;
  engine.state.allocations['ENG10018'].completed = true;

  // Tentativa de mover CCA99004 para Semestre 5
  // Antes de S5: 116 cr (< 150) -> Bloqueado
  // Antes de S6: 145 cr (< 150) -> Bloqueado
  // Antes de S7: 165 cr (>= 150) -> Aprovado!
  const moveRes = engine.moveCourse('CCA99004', 5);

  assert.strictEqual(moveRes.creditAdjusted, true, 'Flag creditAdjusted deve ser true');
  assert.strictEqual(engine.state.allocations['CCA99004'].semester, 7, 'CCA99004 deve avançar automaticamente até o Semestre 7');
  assert(engine.calculateAccumulatedCredits(7) >= 150, 'Créditos antes do Semestre 7 devem ser >= 150');
});

runTest('1.5', 'Propagação em Déficit de Créditos: Remoção de matérias prévias empurra CCA99004 ainda mais', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.state.allocations['ENG03027'].completed = true;
  engine.state.allocations['ENG10018'].completed = true;

  // Remove disciplinas do 1º Semestre para o banco (gerando déficit acumulado)
  Object.keys(engine.state.allocations).forEach(code => {
    if (engine.state.allocations[code].semester === 1) {
      engine.state.allocations[code].semester = null;
    }
  });

  const accumBeforeS7 = engine.calculateAccumulatedCredits(7);
  assert(accumBeforeS7 < 150, `Sem o 1º semestre, créditos antes de S7 (${accumBeforeS7}) devem ser < 150`);

  // Move CCA99004 para S5: como S7 tem apenas 139 cr (< 150), deve avançar até S8 (onde atinge 166 cr)
  engine.moveCourse('CCA99004', 5);
  assert.strictEqual(engine.state.allocations['CCA99004'].semester, 8, 'CCA99004 deve ser empurrada até Semestre 8 para atingir 150 créditos');
  assert(engine.calculateAccumulatedCredits(8) >= 150);
});

runTest('1.6', 'Revalidação Global em Cascata (revalidateAllCascades): Corrige posição por déficit de créditos', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.state.allocations['ENG03027'].completed = true;
  engine.state.allocations['ENG10018'].completed = true;

  // Força semestre 5 manualmente
  engine.state.allocations['CCA99004'].semester = 5;

  // Executa revalidação global
  engine.revalidateAllCascades();

  assert.strictEqual(engine.state.allocations['CCA99004'].semester, 7, 'revalidateAllCascades deve empurrar CCA99004 para S7');
  const dag = engine.validateTrajectoryDag();
  const v = dag.violations.filter(x => x.course === 'CCA99004');
  assert.strictEqual(v.length, 0, 'Após revalidação global, não devem existir violações para CCA99004');
});

runTest('1.7', 'Universalidade da Barreira: TCC I (CCA99002 - 160 cr) e TCC II (CCA99003 - 180 cr) respeitam limites', () => {
  const engine = app.createEngine(curriculum, 2);
  // Marca pré-requisitos de TCC I como concluídos
  ['ENG03027', 'ENG10005', 'ENG10048', 'ENG10049'].forEach(c => {
    if (engine.state.allocations[c]) engine.state.allocations[c].completed = true;
  });

  // Tenta alocar TCC I em S6 (145 cr < 160 cr)
  engine.moveCourse('CCA99002', 6);
  // S6 tem 145 cr (< 160). S7 tem 165 cr (>= 160). Logo deve avançar para S7!
  assert.strictEqual(engine.state.allocations['CCA99002'].semester, 7, 'TCC I (160 cr) deve avançar para Semestre 7');

  // Marca pré-requisitos de TCC II como concluídos
  ['ENG03045', 'ENG07042', 'ENG10019', 'CCA99002'].forEach(c => {
    if (engine.state.allocations[c]) engine.state.allocations[c].completed = true;
  });

  // Tenta alocar TCC II em S7 (165 cr < 180 cr)
  engine.moveCourse('CCA99003', 7);
  // S7 tem 165 cr (< 180). S8 tem 192 cr (>= 180). Logo deve avançar para S8!
  assert.strictEqual(engine.state.allocations['CCA99003'].semester, 8, 'TCC II (180 cr) deve avançar para Semestre 8');
});

// ============================================================================
// SEÇÃO 2: CICLO LETIVO NÃO-DESTRUTIVO (APPLY CYCLE SEQUENCE)
// ============================================================================
console.log('\n--------------------------------------------------------------------------------');
console.log(' SEÇÃO 2: CICLO LETIVO NÃO-DESTRUTIVO (APPLY CYCLE SEQUENCE)');
console.log('--------------------------------------------------------------------------------');

runTest('2.1', 'Preservação de Quantidade: Alteração de ano-base não altera total de disciplinas alocadas', () => {
  const engine = app.createEngine(curriculum, 2);
  const initialAllocatedCount = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;
  assert.strictEqual(initialAllocatedCount, 57, 'FDC 2 inicial deve ter exatamente 57 disciplinas alocadas');

  // Aplica novo ano base 2025/1
  engine.applyCycleSequence(2025, 1);
  const count2025 = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;
  assert.strictEqual(count2025, initialAllocatedCount, 'Contagem após ciclo 2025/1 deve permanecer estritamente 57');

  // Aplica novo ano base 2026/1
  engine.applyCycleSequence(2026, 1);
  const count2026 = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;
  assert.strictEqual(count2026, initialAllocatedCount, 'Contagem após ciclo 2026/1 deve permanecer estritamente 57');

  // Aplica novo ano base 2030/1
  engine.applyCycleSequence(2030, 1);
  const count2030 = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;
  assert.strictEqual(count2030, initialAllocatedCount, 'Contagem após ciclo 2030/1 deve permanecer estritamente 57');
});

runTest('2.2', 'Preservação de Posicionamento: Semestres de 100% dos cards permanecem inalterados ao trocar ano-base', () => {
  const engine = app.createEngine(curriculum, 2);
  const snapshotBefore = JSON.parse(JSON.stringify(engine.state.allocations));

  // Altera ciclo sequencial para múltiplos anos
  [2025, 2026, 2028, 2032].forEach(year => {
    engine.applyCycleSequence(year, 1);
    
    // Asserção estrita curso a curso
    Object.keys(snapshotBefore).forEach(code => {
      assert.strictEqual(
        engine.state.allocations[code].semester,
        snapshotBefore[code].semester,
        `Disciplina ${code} deve manter exatamente o mesmo semestre (${snapshotBefore[code].semester}) no ciclo ${year}/1`
      );
      assert.strictEqual(
        engine.state.allocations[code].completed,
        snapshotBefore[code].completed,
        `Disciplina ${code} deve manter status de concluída idêntico`
      );
    });
  });
});

runTest('2.3', 'Distribuição por Semestre Invariante: Histograma de disciplinas por coluna permanece idêntico', () => {
  const engine = app.createEngine(curriculum, 2);
  const getHistogram = (allocs) => {
    const hist = {};
    for (let s = 1; s <= 20; s++) hist[s] = 0;
    Object.values(allocs).forEach(a => {
      if (a.semester !== null) hist[a.semester]++;
    });
    return hist;
  };

  const initialHist = getHistogram(engine.state.allocations);

  engine.applyCycleSequence(2025, 1);
  const newHist = getHistogram(engine.state.allocations);

  assert.deepStrictEqual(newHist, initialHist, 'Histograma de ocupação dos semestres 1 a 20 deve ser idêntico');
});

runTest('2.4', 'Não-Destrutividade com Ciclo Invertido: Nenhuma disciplina é deletada ou enviada ao banco', () => {
  const engine = app.createEngine(curriculum, 2);
  const countBefore = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;

  // Inverte paridade inicial (começando em 2024/2)
  engine.applyCycleSequence(2024, 2);
  const countAfter = Object.values(engine.state.allocations).filter(a => a.semester !== null).length;

  assert.strictEqual(countAfter, countBefore, 'Ciclo invertido não pode perder nenhuma disciplina alocada (deve manter 58)');
});

runTest('2.5', 'Reversibilidade Completa: Reaplicar ciclo 2024/1 restaura o estado inicial 100%', () => {
  const engine = app.createEngine(curriculum, 2);
  const initialSnapshot = JSON.parse(JSON.stringify(engine.state.allocations));

  engine.applyCycleSequence(2025, 1);
  engine.applyCycleSequence(2024, 1);

  assert.deepStrictEqual(engine.state.allocations, initialSnapshot, 'Reaplicação do ciclo padrão restaura estado original com deep equality');
  assert.strictEqual(engine.getColumnTitle(1), '2024/1');
  assert.strictEqual(engine.getColumnTitle(20), '2033/2');
});

// ============================================================================
// SEÇÃO 3: SERIALIZAÇÃO E DESERIALIZAÇÃO JSON COM ASSERÇÃO DE PARIDADE DE ESTADO
// ============================================================================
console.log('\n--------------------------------------------------------------------------------');
console.log(' SEÇÃO 3: SERIALIZAÇÃO E DESERIALIZAÇÃO JSON COM PARIDADE DE ESTADO');
console.log('--------------------------------------------------------------------------------');

runTest('3.1', 'Formato e Schema do Arquivo JSON de Exportação', () => {
  const engine = app.createEngine(curriculum, 2);
  const jsonString = engine.exportStateToJson();

  assert(typeof jsonString === 'string', 'exportStateToJson deve retornar uma string');
  const parsed = JSON.parse(jsonString);

  assert.strictEqual(parsed.app, 'trajetoria_eca_ufrgs', 'Schema deve conter identificador app');
  assert.strictEqual(parsed.version, '2.0.0', 'Schema deve conter version 2.0.0');
  assert(parsed.exportedAt, 'Schema deve conter timestamp exportedAt');
  assert.strictEqual(parsed.currentFdc, 2, 'Schema deve conter currentFdc');
  assert(typeof parsed.columnNames === 'object', 'Schema deve conter columnNames');
  assert(typeof parsed.allocations === 'object', 'Schema deve conter allocations');
  assert.strictEqual(Object.keys(parsed.allocations).length, Object.keys(curriculum.disciplinas).length);
});

runTest('3.2', 'Paridade Estrita de Estado Inicial (Deep Strict Equality Antes e Depois da Carga)', () => {
  const engine1 = app.createEngine(curriculum, 2);
  const jsonString = engine1.exportStateToJson();

  // Cria um engine vazio/diferente (FDC 1)
  const engine2 = app.createEngine(curriculum, 1);
  assert.notStrictEqual(engine2.state.currentFdc, engine1.state.currentFdc);

  // Carrega o JSON exportado
  engine2.importStateFromJson(jsonString);

  // Asserções estritas de paridade
  assert.strictEqual(engine2.state.currentFdc, engine1.state.currentFdc, 'currentFdc deve coincidir perfeitamente');
  assert.deepStrictEqual(engine2.state.columnNames, engine1.state.columnNames, 'columnNames deve possuir paridade 100%');
  assert.deepStrictEqual(engine2.state.allocations, engine1.state.allocations, 'allocations deve possuir deep strict equality antes e após load');
});

runTest('3.3', 'Paridade Estrita sob Modificações Complexas (Movimentações, Conclusões e Nomes)', () => {
  const engine = app.createEngine(curriculum, 3);
  
  // Realiza modificações customizadas pelo usuário:
  engine.moveCourse('MAT01353', 3);
  engine.state.allocations['INF01202'].completed = true;
  engine.state.allocations['QUI01009'].completed = true;
  engine.state.allocations['ENG03046'].semester = null; // enviada para o banco
  engine.setColumnName(1, '2025/1 - Turma Especial');
  engine.setColumnName(5, '2027/1 - Mobilidade Acadêmica');

  const snapshotBefore = {
    currentFdc: engine.state.currentFdc,
    columnNames: JSON.parse(JSON.stringify(engine.state.columnNames)),
    allocations: JSON.parse(JSON.stringify(engine.state.allocations))
  };

  const exportedJson = engine.exportStateToJson();

  // Instancia nova engine zerada em outra FDC
  const restoredEngine = app.createEngine(curriculum, 4);
  restoredEngine.importStateFromJson(exportedJson);

  // Validação de paridade estrita em todas as dimensões
  assert.strictEqual(restoredEngine.state.currentFdc, snapshotBefore.currentFdc);
  assert.deepStrictEqual(restoredEngine.state.columnNames, snapshotBefore.columnNames);
  assert.deepStrictEqual(restoredEngine.state.allocations, snapshotBefore.allocations);
  
  // Validação específica das propriedades alteradas
  assert.strictEqual(restoredEngine.state.allocations['MAT01353'].semester, 3);
  assert.strictEqual(restoredEngine.state.allocations['INF01202'].completed, true);
  assert.strictEqual(restoredEngine.state.allocations['QUI01009'].completed, true);
  assert.strictEqual(restoredEngine.state.allocations['ENG03046'].semester, null);
  assert.strictEqual(restoredEngine.getColumnTitle(1), '2025/1 - Turma Especial');
  assert.strictEqual(restoredEngine.getColumnTitle(5), '2027/1 - Mobilidade Acadêmica');
});

runTest('3.4', 'Robustez de Carga: Rejeição adequada de payloads corrompidos ou incompletos', () => {
  const engine = app.createEngine(curriculum, 2);

  // JSON sem allocations
  assert.throws(() => {
    engine.importStateFromJson(JSON.stringify({ app: 'trajetoria_eca_ufrgs', version: '2.0.0' }));
  }, /campo "allocations" não encontrado/);

  // String JSON inválida / malformada
  assert.throws(() => {
    engine.importStateFromJson('{ invalid json syntax ');
  }, SyntaxError);
});

// ============================================================================
// SEÇÃO 4: PERIODICIDADE FLEXÍVEL DE DISCIPLINAS 'AMBOS' (ENG03041, ENG10001, ETC.)
// ============================================================================
console.log('\n--------------------------------------------------------------------------------');
console.log(' SEÇÃO 4: PERIODICIDADE FLEXÍVEL DE DISCIPLINAS COM OFERTA \'AMBOS\'');
console.log('--------------------------------------------------------------------------------');

runTest('4.1', 'Metadados Curriculares: Catálogo registra ENG03041, ENG10001 e mais 40+ disciplinas com periodicidade \'ambos\'', () => {
  const d = curriculum.disciplinas;
  assert.strictEqual(d['ENG03041'].periodicidade, 'ambos', 'ENG03041 deve ter periodicidade \'ambos\'');
  assert.strictEqual(d['ENG03041'].oferta, 'ambos', 'ENG03041 deve ter oferta \'ambos\'');

  assert.strictEqual(d['ENG10001'].periodicidade, 'ambos', 'ENG10001 deve ter periodicidade \'ambos\'');
  assert.strictEqual(d['ENG10001'].oferta, 'ambos', 'ENG10001 deve ter oferta \'ambos\'');

  const ambosCourses = Object.keys(d).filter(code => d[code].periodicidade === 'ambos');
  assert(ambosCourses.length >= 40, `Devem existir 40+ disciplinas com periodicidade \'ambos\' (encontradas: ${ambosCourses.length})`);
});

runTest('4.2', 'ENG03041 (Mecânica Aplicada I, padrão Etapa 2 - par) é válida em semestres pares e ímpares', () => {
  const engine = app.createEngine(curriculum, 2);
  // Conclui pré-requisitos: CCA99001, FIS01181, MAT01353
  ['CCA99001', 'FIS01181', 'MAT01353'].forEach(c => {
    if (engine.state.allocations[c]) engine.state.allocations[c].completed = true;
  });

  // Alocação em semestre PAR (Semestre 2)
  engine.moveCourse('ENG03041', 2);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 2);
  let dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG03041' && v.type === 'PERIODICITY').length, 0);

  // Alocação em semestre ÍMPAR (Semestre 3) - Não deve avançar para 4 nem acusar violação!
  const moveOddRes = engine.moveCourse('ENG03041', 3);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 3, 'ENG03041 deve ser aceita diretamente no Semestre 3 (ímpar)');
  assert.strictEqual(moveOddRes.periodicityAdjusted, false, 'Não deve ocorrer ajuste de periodicidade');
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG03041' && v.type === 'PERIODICITY').length, 0);

  // Alocação em Semestre 4 (par)
  engine.moveCourse('ENG03041', 4);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 4);
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG03041' && v.type === 'PERIODICITY').length, 0);

  // Alocação em Semestre 5 (ímpar)
  engine.moveCourse('ENG03041', 5);
  assert.strictEqual(engine.state.allocations['ENG03041'].semester, 5);
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG03041' && v.type === 'PERIODICITY').length, 0);
});

runTest('4.3', 'ENG10001 (Circuitos Elétricos I - C, padrão Etapa 3 - ímpar) é válida em semestres ímpares e pares', () => {
  const engine = app.createEngine(curriculum, 2);
  // Conclui pré-requisitos: FIS01182, MAT01354
  ['FIS01182', 'MAT01354'].forEach(c => {
    if (engine.state.allocations[c]) engine.state.allocations[c].completed = true;
  });

  // Alocação em semestre ÍMPAR (Semestre 3)
  engine.moveCourse('ENG10001', 3);
  assert.strictEqual(engine.state.allocations['ENG10001'].semester, 3);
  let dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG10001' && v.type === 'PERIODICITY').length, 0);

  // Alocação em semestre PAR (Semestre 4) - Não deve avançar para 5 nem acusar violação!
  const moveEvenRes = engine.moveCourse('ENG10001', 4);
  assert.strictEqual(engine.state.allocations['ENG10001'].semester, 4, 'ENG10001 deve ser aceita diretamente no Semestre 4 (par)');
  assert.strictEqual(moveEvenRes.periodicityAdjusted, false, 'Não deve ocorrer ajuste de periodicidade');
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG10001' && v.type === 'PERIODICITY').length, 0);

  // Alocação em Semestre 5 (ímpar)
  engine.moveCourse('ENG10001', 5);
  assert.strictEqual(engine.state.allocations['ENG10001'].semester, 5);
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG10001' && v.type === 'PERIODICITY').length, 0);

  // Alocação em Semestre 6 (par)
  engine.moveCourse('ENG10001', 6);
  assert.strictEqual(engine.state.allocations['ENG10001'].semester, 6);
  dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.violations.filter(v => v.course === 'ENG10001' && v.type === 'PERIODICITY').length, 0);
});

runTest('4.4', 'Validação Exaustiva: ENG03041 e ENG10001 sem violação em todos os semestres de 1 a 10', () => {
  const engine = app.createEngine(curriculum, 2);
  // Conclui todos os pré-requisitos de ambas
  ['CCA99001', 'FIS01181', 'MAT01353', 'FIS01182', 'MAT01354'].forEach(c => {
    if (engine.state.allocations[c]) engine.state.allocations[c].completed = true;
  });

  for (let targetSem = 1; targetSem <= 10; targetSem++) {
    engine.state.allocations['ENG03041'].semester = targetSem;
    engine.state.allocations['ENG10001'].semester = targetSem;

    const dag = engine.validateTrajectoryDag();
    const periodViolations = dag.violations.filter(
      v => v.type === 'PERIODICITY' && (v.course === 'ENG03041' || v.course === 'ENG10001')
    );

    assert.strictEqual(
      periodViolations.length,
      0,
      `Não deve haver violação de periodicidade no semestre ${targetSem} (paridade ${engine.getColumnPeriod(targetSem)})`
    );
  }
});

runTest('4.5', 'Validação de Periodicidade CEECA: P1 acusa erro em par e P2 acusa erro em ímpar', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG10049 é P1 (1º Semestre / anual ímpar no CEECA)
  engine.state.allocations['ENG10049'].semester = 4; // Coluna 4 é par (P2)
  // ENG10043 é P2 (2º Semestre / anual par no CEECA)
  engine.state.allocations['ENG10043'].semester = 1; // Coluna 1 é ímpar (P1)

  const dag = engine.validateTrajectoryDag();
  const vP1 = dag.violations.find(v => v.course === 'ENG10049' && v.type === 'PERIODICITY');
  const vP2 = dag.violations.find(v => v.course === 'ENG10043' && v.type === 'PERIODICITY');

  assert(vP1, 'ENG10049 (P1 CEECA) na coluna par deve acusar violação de periodicidade');
  assert(vP2, 'ENG10043 (P2 CEECA) na coluna ímpar deve acusar violação de periodicidade');
});

// ============================================================================
// SEÇÃO 5: BUFFER ÚNICO DE COLUNA VISÍVEL ALÉM DO ÚLTIMO SEMESTRE POPULADO
// ============================================================================
console.log('\n--------------------------------------------------------------------------------');
console.log(' SEÇÃO 5: BUFFER ÚNICO DE COLUNA VISÍVEL (S_MAX + 1)');
console.log('--------------------------------------------------------------------------------');

runTest('5.1', 'Grade Padrão Inicial: S_max = 10 -> getVisibleColumnsCount() === 11 (exatamente 1 coluna buffer)', () => {
  const engine = app.createEngine(curriculum, 2);
  
  // Encontra o maior semestre populado
  let sMax = 0;
  Object.values(engine.state.allocations).forEach(a => {
    if (a.semester !== null && a.semester > sMax) sMax = a.semester;
  });

  assert.strictEqual(sMax, 10, 'Último semestre populado na grade padrão deve ser o Semestre 10');
  assert.strictEqual(engine.getVisibleColumnsCount(), 11, 'getVisibleColumnsCount() deve ser exatamente 11 (S_max + 1)');

  // Verifica que a coluna 11 é estritamente vazia
  const col11Courses = Object.values(engine.state.allocations).filter(a => a.semester === 11);
  assert.strictEqual(col11Courses.length, 0, 'Coluna 11 (buffer) não deve ter nenhuma disciplina alocada');

  // Verifica que os semestres 1 a 10 contêm disciplinas
  for (let s = 1; s <= 10; s++) {
    const sCourses = Object.values(engine.state.allocations).filter(a => a.semester === s);
    assert(sCourses.length > 0, `Semestre ${s} deve conter ao menos 1 disciplina alocada`);
  }
});

runTest('5.2', 'Expansão Dinâmica: Mover disciplina para semestres avançados expande visibilidade para S_max + 1', () => {
  const engine = app.createEngine(curriculum, 2);

  // Move CCA99003 para Semestre 12 (S_max = 12)
  engine.moveCourse('CCA99003', 12);
  assert.strictEqual(engine.state.allocations['CCA99003'].semester, 12);
  assert.strictEqual(engine.getVisibleColumnsCount(), 13, 'getVisibleColumnsCount() deve expandir para 13 (12 + 1)');
  
  const col13Courses = Object.values(engine.state.allocations).filter(a => a.semester === 13);
  assert.strictEqual(col13Courses.length, 0, 'Coluna 13 deve ser o buffer vazio');

  // Move CCA99003 para Semestre 16 (S_max = 16)
  engine.moveCourse('CCA99003', 16);
  assert.strictEqual(engine.state.allocations['CCA99003'].semester, 16);
  assert.strictEqual(engine.getVisibleColumnsCount(), 17, 'getVisibleColumnsCount() deve expandir para 17 (16 + 1)');

  const col17Courses = Object.values(engine.state.allocations).filter(a => a.semester === 17);
  assert.strictEqual(col17Courses.length, 0, 'Coluna 17 deve ser o buffer vazio');
});

runTest('5.3', 'Contração Dinâmica: Remoção de disciplinas de semestres finais contrai colunas visíveis', () => {
  const engine = app.createEngine(curriculum, 2);

  // Remove para o banco todas as disciplinas alocadas dos semestres 7 a 10
  Object.keys(engine.state.allocations).forEach(code => {
    const alloc = engine.state.allocations[code];
    if (alloc.semester && alloc.semester >= 7) {
      alloc.semester = null;
    }
  });

  // Agora o maior semestre populado é 6 (S_max = 6)
  let sMax = 0;
  Object.values(engine.state.allocations).forEach(a => {
    if (a.semester !== null && a.semester > sMax) sMax = a.semester;
  });
  assert.strictEqual(sMax, 6, 'Maior semestre populado agora deve ser 6');
  assert.strictEqual(engine.getVisibleColumnsCount(), 7, 'getVisibleColumnsCount() deve contrair para 7 (6 + 1)');

  const col7Courses = Object.values(engine.state.allocations).filter(a => a.semester === 7);
  assert.strictEqual(col7Courses.length, 0, 'Coluna 7 deve ser o novo buffer vazio');
});

runTest('5.4', 'Limites de Borda: Grid totalmente desocupado (S_max = 0) e Expansão Dinâmica Além do 20º Semestre (S_max >= 20)', () => {
  const engine = app.createEngine(curriculum, 2);

  // Caso 1: Todas as disciplinas no banco (S_max = 0)
  Object.keys(engine.state.allocations).forEach(code => {
    engine.state.allocations[code].semester = null;
  });
  assert.strictEqual(engine.getVisibleColumnsCount(), 1, 'Grid vazio deve exibir no mínimo 1 coluna para permitir alocação inicial');

  // Caso 2: Disciplina no 20º semestre (S_max = 20 -> 21 colunas para buffer livre)
  engine.state.allocations['ENG10001'].semester = 20;
  assert.strictEqual(engine.getVisibleColumnsCount(), 21, 'getVisibleColumnsCount() deve expandir para 21 (20 + 1 buffer vazio)');

  // Caso 3: Disciplinas em semestres de overflow (S_max = 22 -> 23 colunas)
  engine.state.allocations['ENG10001'].semester = 22;
  assert.strictEqual(engine.getVisibleColumnsCount(), 23, 'getVisibleColumnsCount() deve expandir dinamicamente para 23 (22 + 1 buffer)');
});

runTest('5.5', 'Invariante Estrita de Coluna Buffer: Coluna S_max + 1 é sempre visível e rigorosamente vazia', () => {
  const engine = app.createEngine(curriculum, 2);

  // Itera por diferentes configurações de S_max simuladas de 1 a 18
  for (let targetMax = 1; targetMax <= 18; targetMax++) {
    // Limpa matérias acima de targetMax
    Object.keys(engine.state.allocations).forEach(code => {
      const alloc = engine.state.allocations[code];
      if (alloc.semester && alloc.semester > targetMax) {
        alloc.semester = null;
      }
    });

    // Garante que targetMax tem pelo menos uma matéria
    engine.state.allocations['MAT01353'].semester = targetMax;

    const visibleCount = engine.getVisibleColumnsCount();
    const expectedBufferCol = targetMax + 1;

    assert.strictEqual(visibleCount, expectedBufferCol, `Para S_max = ${targetMax}, visíveis devem ser ${expectedBufferCol}`);

    // Garante que a coluna buffer (targetMax + 1) tem 0 matérias
    const bufferOccupants = Object.values(engine.state.allocations).filter(a => a.semester === expectedBufferCol);
    assert.strictEqual(bufferOccupants.length, 0, `Coluna buffer ${expectedBufferCol} deve estar rigorosamente desocupada`);
  }
});

// ============================================================================
// RELATÓRIO FINAL
// ============================================================================
console.log('\n================================================================================');
console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
if (passedTests === totalTests) {
  console.log(' SUCESSO TOTAL: 100% DOS TESTES CURRICULARES E DO MOTOR DAG FORAM APROVADOS!');
  console.log(' (1) Barreira de Créditos Mínimos: 100% VALIDADA');
  console.log(' (2) Ciclo Letivo Não-Destrutivo: 100% VALIDADO');
  console.log(' (3) Paridade de Serialização JSON: 100% VALIDADA');
  console.log(' (4) Oferta \'Ambos\' nos Semestres: 100% VALIDADA');
  console.log(' (5) Buffer Único de Coluna (S_max+1): 100% VALIDADO');
} else {
  console.error(` FALHA: ${failedTests} teste(s) falharam.`);
}
console.log('================================================================================\n');

process.exit(failedTests === 0 ? 0 : 1);
