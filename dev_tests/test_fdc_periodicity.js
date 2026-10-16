/**
 * Suíte de Testes Automatizados: Auditoria FDC, Periodicidade, Cabeçalhos e DAG SVG
 * Simulador de Trajetória Acadêmica - Engenharia de Controle e Automação (UFRGS)
 * 
 * Execução: node test_fdc_periodicity.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Carrega a aplicação e os dados curriculares
const appPath = path.join(__dirname, 'app.js');
const dataPath = path.join(__dirname, 'curriculum_data.json');

assert(fs.existsSync(appPath), 'O arquivo app.js deve existir.');
assert(fs.existsSync(dataPath), 'O arquivo curriculum_data.json deve existir.');

const app = require(appPath);
const curriculum = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('================================================================');
console.log(' SUÍTE DE TESTES AUTOMATIZADOS: AUDITORIA CURRICULAR E DAG');
console.log(' Engenharia de Controle e Automação - UFRGS (Catálogo 2026/1)');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(testName, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } catch (err) {
    console.error(`  [FAIL] ${testName}`);
    console.error(`         Erro: ${err.message}`);
    if (err.stack) {
      console.error(`         Stack: ${err.stack.split('\n').slice(1, 4).join('\n')}`);
    }
    process.exitCode = 1;
  }
}

// ============================================================================
// CENÁRIO 1: ALTERNÂNCIA ENTRE FDCS (PROMOÇÃO/DEMOÇÃO E ESTADO DO BANCO)
// ============================================================================
console.log('\n----------------------------------------------------------------');
console.log(' CENÁRIO 1: ALTERNÂNCIA ENTRE FORMAÇÕES DIVERSIFICADAS (FDCS)');
console.log('----------------------------------------------------------------');

// Disciplinas exclusivas/variáveis por FDC:
// FDC 1 (Sistemas Discretos CAD/CAM): ENG03386 (Etapa 8), ENG10021 (Etapa 9)
// FDC 2 (Controle Avançado de Sistemas Mecânicos): ENG03046 (Etapa 8), ENG03047 (Etapa 9)
// FDC 3 (Eletrônica de Potência e Acionamento): ENG10027 (Etapa 8), ENG10050 (Etapa 9), ENG10046 (Etapa 9)

runTest('1.1 - Estado Inicial FDC 1: Obrigatórias específicas no grid, demais no banco', () => {
  const engine = app.createEngine(curriculum, 1);
  const alloc = engine.state.allocations;

  // FDC 1 obrigatórias
  assert.strictEqual(alloc['ENG03386'].semester, 8, 'ENG03386 deve estar alocada na Etapa 8 na FDC 1');
  assert.strictEqual(alloc['ENG10021'].semester, 9, 'ENG10021 deve estar alocada na Etapa 9 na FDC 1');

  // FDC 2 e 3 específicas devem estar no banco (null)
  assert.strictEqual(alloc['ENG03046'].semester, null, 'ENG03046 deve estar no banco na FDC 1');
  assert.strictEqual(alloc['ENG03047'].semester, null, 'ENG03047 deve estar no banco na FDC 1');
  assert.strictEqual(alloc['ENG10027'].semester, null, 'ENG10027 deve estar no banco na FDC 1');
  assert.strictEqual(alloc['ENG10050'].semester, null, 'ENG10050 deve estar no banco na FDC 1');
  assert.strictEqual(alloc['ENG10046'].semester, null, 'ENG10046 deve estar no banco na FDC 1');
});

runTest('1.2 - Transição FDC 1 -> FDC 2: Demove CAD/CAM ao banco e promove Controle Avançado', () => {
  const engine = app.createEngine(curriculum, 1);
  const res = engine.switchFdc(2);

  const alloc = engine.state.allocations;

  // Demovidas para o banco (semester === null)
  assert.strictEqual(alloc['ENG03386'].semester, null, 'ENG03386 deve ter sido demovida para o banco');
  assert.strictEqual(alloc['ENG10021'].semester, null, 'ENG10021 deve ter sido demovida para o banco');
  assert(res.newlyDemoted.includes('ENG03386'), 'Relatório de demovidas deve conter ENG03386');
  assert(res.newlyDemoted.includes('ENG10021'), 'Relatório de demovidas deve conter ENG10021');

  // Promovidas para o grid nas etapas corretas
  assert.strictEqual(alloc['ENG03046'].semester, 8, 'ENG03046 deve entrar no grid na Etapa 8 na FDC 2');
  assert.strictEqual(alloc['ENG03047'].semester, 9, 'ENG03047 deve entrar no grid na Etapa 9 na FDC 2');
  assert(res.newlyPromoted.includes('ENG03046'), 'Relatório de promovidas deve conter ENG03046');
  assert(res.newlyPromoted.includes('ENG03047'), 'Relatório de promovidas deve conter ENG03047');

  // FDC 3 continua no banco
  assert.strictEqual(alloc['ENG10027'].semester, null, 'ENG10027 deve continuar no banco na FDC 2');
  assert.strictEqual(alloc['ENG10050'].semester, null, 'ENG10050 deve continuar no banco na FDC 2');
});

runTest('1.3 - Transição FDC 2 -> FDC 3: Demove Controle Avançado e promove Eletrônica de Potência', () => {
  const engine = app.createEngine(curriculum, 2);
  const res = engine.switchFdc(3);

  const alloc = engine.state.allocations;

  // Demovidas
  assert.strictEqual(alloc['ENG03046'].semester, null, 'ENG03046 deve ter sido demovida para o banco');
  assert.strictEqual(alloc['ENG03047'].semester, null, 'ENG03047 deve ter sido demovida para o banco');

  // Promovidas
  assert.strictEqual(alloc['ENG10027'].semester, 8, 'ENG10027 deve entrar no grid na Etapa 8 na FDC 3');
  assert.strictEqual(alloc['ENG10050'].semester, 9, 'ENG10050 deve entrar no grid na Etapa 9 na FDC 3');
  assert.strictEqual(alloc['ENG10046'].semester, 9, 'ENG10046 deve entrar no grid na Etapa 9 na FDC 3');

  assert(res.newlyPromoted.includes('ENG10027'), 'ENG10027 deve constar nas promovidas');
  assert(res.newlyPromoted.includes('ENG10050'), 'ENG10050 deve constar nas promovidas');
  assert(res.newlyPromoted.includes('ENG10046'), 'ENG10046 deve constar nas promovidas');
});

runTest('1.4 - Transição FDC 3 -> FDC 1: Demove Eletrônica de Potência e repromove CAD/CAM ao grid', () => {
  const engine = app.createEngine(curriculum, 3);
  const res = engine.switchFdc(1);

  const alloc = engine.state.allocations;

  // Demovidas da FDC 3
  assert.strictEqual(alloc['ENG10027'].semester, null, 'ENG10027 deve ter sido demovida para o banco');
  assert.strictEqual(alloc['ENG10050'].semester, null, 'ENG10050 deve ter sido demovida para o banco');
  assert.strictEqual(alloc['ENG10046'].semester, null, 'ENG10046 deve ter sido demovida para o banco');

  // Repromovidas da FDC 1
  assert.strictEqual(alloc['ENG03386'].semester, 8, 'ENG03386 deve ser repromovida para a Etapa 8');
  assert.strictEqual(alloc['ENG10021'].semester, 9, 'ENG10021 deve ser repromovida para a Etapa 9');
  assert(res.newlyPromoted.includes('ENG03386'));
  assert(res.newlyPromoted.includes('ENG10021'));
});

runTest('1.5 - Preservação de Histórico de Disciplinas Concluídas ao Trocar FDC', () => {
  const engine = app.createEngine(curriculum, 1);
  // Aluno concluiu ENG03386 no 8º semestre
  engine.state.allocations['ENG03386'].completed = true;

  // Ao trocar para FDC 2 (onde ela é eletiva), como foi cursada, seu semestre não deve virar null
  engine.switchFdc(2);
  assert.strictEqual(engine.state.allocations['ENG03386'].semester, 8, 'Disciplina concluída deve manter seu semestre registrado');
  assert.strictEqual(engine.state.allocations['ENG03386'].completed, true, 'Disciplina concluída deve manter o status concluída');
});

runTest('1.6 - Auditoria de Contagem de Disciplinas Obrigatórias e Eletivas por FDC', () => {
  const expectedCounts = {
    1: { obrigatorias: 57, eletivas: 26 },
    2: { obrigatorias: 57, eletivas: 26 },
    3: { obrigatorias: 58, eletivas: 25 }
  };

  [1, 2, 3].forEach(fdcId => {
    const engine = app.createEngine(curriculum, fdcId);
    let obrCount = 0;
    let eleCount = 0;
    Object.keys(engine.state.courses).forEach(code => {
      const tipo = engine.getCourseTypeInFdc(code, fdcId);
      if (tipo === 'obrigatoria') obrCount++;
      if (tipo === 'eletiva') eleCount++;
    });
    assert.strictEqual(obrCount, expectedCounts[fdcId].obrigatorias, `FDC ${fdcId} deve ter ${expectedCounts[fdcId].obrigatorias} obrigatórias`);
    assert.strictEqual(eleCount, expectedCounts[fdcId].eletivas, `FDC ${fdcId} deve ter ${expectedCounts[fdcId].eletivas} eletivas`);
  });
});

// ============================================================================
// CENÁRIO 2: RESTRIÇÃO DE PERIODICIDADE (PERÍODO 1 VS 2 E CASCATA)
// ============================================================================
console.log('\n----------------------------------------------------------------');
console.log(' CENÁRIO 2: RESTRIÇÃO DE PERIODICIDADE & PROPAGAÇÃO EM CASCATA');
console.log('----------------------------------------------------------------');

runTest('2.1 - Soltar disciplina exclusiva do 1º Semestre em coluna de 2º Semestre avança para próximo ímpar (+1)', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG07086 (TERMODINÂMICA E TRANSFERÊNCIA DE CALOR): periódica '1', pré-requisito FIS01183 (S3)
  assert.strictEqual(curriculum.disciplinas['ENG07086'].periodicidade, '1');

  // Coluna 4 é par -> Período '2'. Pré-requisito (S3) satisfeito (4 > 3). Tentativa de colocar ENG07086 na Coluna 4 deve forçar avanço para Semestre 5
  const moveRes = engine.moveCourse('ENG07086', 4);
  assert.strictEqual(engine.state.allocations['ENG07086'].semester, 5, 'ENG07086 deve avançar para o Semestre 5 (1º Semestre)');
  assert.strictEqual(moveRes.periodicityAdjusted, true, 'Deve acusar ajuste por periodicidade');
  assert.strictEqual(moveRes.prereqAdjusted, false, 'Não deve acusar ajuste por pré-requisito');
});

runTest('2.2 - Soltar disciplina exclusiva do 1º Semestre na Coluna 6 avança para Semestre 7 (+1)', () => {
  const engine = app.createEngine(curriculum, 2);
  const moveRes = engine.moveCourse('ENG07086', 6);
  assert.strictEqual(engine.state.allocations['ENG07086'].semester, 7, 'ENG07086 deve avançar para o Semestre 7 (1º Semestre)');
  assert.strictEqual(moveRes.periodicityAdjusted, true);
});

runTest('2.3 - Soltar disciplina exclusiva do 2º Semestre em coluna de 1º Semestre avança para próximo par (+1)', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG10043 (LABORATÓRIO DE SISTEMAS DIGITAIS): periódica '2', pré-requisito ENG10042 (S3)
  assert.strictEqual(curriculum.disciplinas['ENG10043'].periodicidade, '2');

  // Coluna 5 é ímpar -> Período '1'. Pré-requisito (S3) satisfeito (5 > 3). Mover para Coluna 5 deve forçar avanço para Semestre 6 (2º Semestre)
  const moveRes = engine.moveCourse('ENG10043', 5);
  assert.strictEqual(engine.state.allocations['ENG10043'].semester, 6, 'ENG10043 deve avançar para o Semestre 6 (2º Semestre)');
  assert.strictEqual(moveRes.periodicityAdjusted, true);
  assert.strictEqual(moveRes.prereqAdjusted, false);
});

runTest('2.4 - Propagação em cascata com alternância estrita de periodicidade', () => {
  const engine = app.createEngine(curriculum, 2);
  // Cadeia: ENG10043 (P2, S4) -> ENG10023 (P2, S6) -> ENG10048 (P1, S7)
  assert.strictEqual(curriculum.disciplinas['ENG10043'].periodicidade, '2');
  assert.strictEqual(curriculum.disciplinas['ENG10023'].periodicidade, '2');
  assert.strictEqual(curriculum.disciplinas['ENG10048'].periodicidade, '1');

  // Força ENG10043 na Coluna 5 (1º Semestre / ímpar):
  // 1. ENG10043 avança para S6 (P2).
  // 2. ENG10023 (P2) que estava em S6: tentativa S6+1=S7 é ímpar (P1), logo não pode ficar em S7! Deve pular para S8 (P2)!
  // 3. ENG10048 (P1) que estava em S7: tentativa S8+1=S9 é ímpar (P1), logo vai para S9!
  const res = engine.moveCourse('ENG10043', 5);

  assert.strictEqual(engine.state.allocations['ENG10043'].semester, 6, 'ENG10043 deve estar em S6');
  assert.strictEqual(engine.state.allocations['ENG10023'].semester, 8, 'ENG10023 deve pular S7 e ir para S8 devido à periodicidade P2');
  assert.strictEqual(engine.state.allocations['ENG10048'].semester, 9, 'ENG10048 deve ir para S9 devido à periodicidade P1');

  assert(res.cascaded.includes('ENG10023'), 'Cascata deve listar ENG10023');
  assert(res.cascaded.includes('ENG10048'), 'Cascata deve listar ENG10048');
});

runTest('2.5 - Cadeia Eletrotécnica Completa: Preservação de ordem e periodicidade em cadeia longa', () => {
  const engine = app.createEngine(curriculum, 3);
  // Cadeia: ENG10044 (P1, S5) -> ENG10045 (P2, S6) -> ENG10049 (P1, S7) -> ENG10050 (P1, S9)
  // Move ENG10044 para Coluna 6 (par):
  // ENG10044 avança para S7 (P1).
  // ENG10045 avança para S8 (P2).
  // ENG10049 avança para S9 (P1).
  // ENG10050 avança para S11 (P1).
  engine.moveCourse('ENG10044', 6);

  assert.strictEqual(engine.state.allocations['ENG10044'].semester, 7);
  assert.strictEqual(engine.state.allocations['ENG10045'].semester, 8);
  assert.strictEqual(engine.state.allocations['ENG10049'].semester, 9);
  assert.strictEqual(engine.state.allocations['ENG10050'].semester, 11);

  const dagCheck = engine.validateTrajectoryDag();
  assert.strictEqual(dagCheck.isValid, true, 'DAG deve permanecer 100% válido após cascata de periodicidade');
});

runTest('2.6 - Ajuste simultâneo de pré-requisito e periodicidade a montante', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG10044 (P1) tem pré-requisito ENG10002 em S4.
  // Se tentar mover ENG10044 para S2:
  // 1. Pré-requisito força mínimo = S4 + 1 = S5.
  // 2. Periodicidade de ENG10044 é '1'. S5 tem período '1'.
  // Resultado: deve ajustar para S5.
  engine.moveCourse('ENG10044', 2);
  assert.strictEqual(engine.state.allocations['ENG10044'].semester, 5, 'ENG10044 deve ser ajustada para S5');
});

// ============================================================================
// CENÁRIO 3: CUSTOMIZAÇÃO DE CABEÇALHOS & PARIDADE ATRIBUÍDA
// ============================================================================
console.log('\n----------------------------------------------------------------');
console.log(' CENÁRIO 3: CUSTOMIZAÇÃO DE CABEÇALHOS & PARIDADE ATRIBUÍDA');
console.log('----------------------------------------------------------------');

runTest('3.1 - Renomeação Automática por Ciclo Padrão (2024/1): Paridade alternada sequencial', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.applyCycleSequence(2024, 1);

  // Semestre 1 = '2024/1' (Período '1')
  // Semestre 2 = '2024/2' (Período '2')
  // Semestre 3 = '2025/1' (Período '1')
  // Semestre 4 = '2025/2' (Período '2')
  assert.strictEqual(engine.getColumnTitle(1), '2024/1');
  assert.strictEqual(engine.getColumnPeriod(1), '1');

  assert.strictEqual(engine.getColumnTitle(2), '2024/2');
  assert.strictEqual(engine.getColumnPeriod(2), '2');

  assert.strictEqual(engine.getColumnTitle(3), '2025/1');
  assert.strictEqual(engine.getColumnPeriod(3), '1');

  assert.strictEqual(engine.getColumnTitle(4), '2025/2');
  assert.strictEqual(engine.getColumnPeriod(4), '2');

  assert.strictEqual(engine.getColumnTitle(20), '2033/2');
  assert.strictEqual(engine.getColumnPeriod(20), '2');
});

runTest('3.2 - Renomeação Automática por Ciclo Invertido (2024/2): Paridade invertida atribuída', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.applyCycleSequence(2024, 2);

  // Semestre 1 = '2024/2' -> Período '2' (inversão da paridade padrão do índice 1!)
  // Semestre 2 = '2025/1' -> Período '1'
  // Semestre 3 = '2025/2' -> Período '2'
  assert.strictEqual(engine.getColumnTitle(1), '2024/2');
  assert.strictEqual(engine.getColumnPeriod(1), '2', 'Coluna 1 deve ter paridade 2 derivada do sufixo /2');

  assert.strictEqual(engine.getColumnTitle(2), '2025/1');
  assert.strictEqual(engine.getColumnPeriod(2), '1', 'Coluna 2 deve ter paridade 1 derivada do sufixo /1');

  assert.strictEqual(engine.getColumnTitle(3), '2025/2');
  assert.strictEqual(engine.getColumnPeriod(3), '2');
});

runTest('3.3 - Edição Individual de Cabeçalho: Alteração de Paridade por Sufixo', () => {
  const engine = app.createEngine(curriculum, 2);

  // Variações de formato para Período 1:
  engine.setColumnName(1, '2025/1');
  assert.strictEqual(engine.getColumnPeriod(1), '1');

  engine.setColumnName(1, '2025.1');
  assert.strictEqual(engine.getColumnPeriod(1), '1');

  engine.setColumnName(1, '2025-1');
  assert.strictEqual(engine.getColumnPeriod(1), '1');

  // Variações de formato para Período 2:
  engine.setColumnName(1, '2025/2');
  assert.strictEqual(engine.getColumnPeriod(1), '2');

  engine.setColumnName(1, '2025.2');
  assert.strictEqual(engine.getColumnPeriod(1), '2');

  engine.setColumnName(1, '2025-2');
  assert.strictEqual(engine.getColumnPeriod(1), '2');

  // Fallback quando não há sufixo explícito: baseia-se na paridade numérica do índice (1 = '1', 2 = '2')
  engine.setColumnName(1, 'Semestre Especial Alpha');
  assert.strictEqual(engine.getColumnPeriod(1), '1', 'Fallback para índice 1 deve ser 1');

  engine.setColumnName(2, 'Semestre Especial Beta');
  assert.strictEqual(engine.getColumnPeriod(2), '2', 'Fallback para índice 2 deve ser 2');
});

runTest('3.4 - Revalidação e Empurrão Automático ao Alterar Paridade de Coluna via Edição Individual', () => {
  const engine = app.createEngine(curriculum, 2);
  // ENG10042 (P1) está inicialmente em Semestre 3 (onde período padrão é '1')
  assert.strictEqual(curriculum.disciplinas['ENG10042'].periodicidade, '1');
  assert.strictEqual(engine.state.allocations['ENG10042'].semester, 3);

  // Renomeia a coluna 3 para '2025/2' (transformando-a em 2º Semestre):
  engine.setColumnName(3, '2025/2');
  assert.strictEqual(engine.getColumnPeriod(3), '2');

  // Como a coluna 3 virou Período 2, ENG10042 (que requer Período 1) não pode ficar nela!
  // Ela deve ser empurrada. Coluna 4 é par ('2'), logo pula para Coluna 5 ('1')!
  assert.strictEqual(engine.state.allocations['ENG10042'].semester, 5, 'ENG10042 deve avançar para Semestre 5');
  assert.strictEqual(engine.getColumnPeriod(engine.state.allocations['ENG10042'].semester), '1');
});

runTest('3.5 - Persistência do Estado de Nomenclatura no Objeto columnNames', () => {
  const engine = app.createEngine(curriculum, 2);
  engine.setColumnName(5, '2026/2 - Intercâmbio');
  assert.strictEqual(engine.state.columnNames[5], '2026/2 - Intercâmbio');
  assert.strictEqual(engine.getColumnPeriod(5), '2');

  // Ao reaplicar ciclo, o estado é atualizado uniformemente
  engine.applyCycleSequence(2025, 1);
  assert.strictEqual(engine.state.columnNames[5], '2027/1');
  assert.strictEqual(engine.getColumnPeriod(5), '1');
});

// ============================================================================
// CENÁRIO 4: CONSISTÊNCIA DO DAG E RENDERIZAÇÃO SVG (BÉZIER)
// ============================================================================
console.log('\n----------------------------------------------------------------');
console.log(' CENÁRIO 4: CONSISTÊNCIA DO DAG E RENDERIZAÇÃO BÉZIER SVG');
console.log('----------------------------------------------------------------');

runTest('4.1 - Acyclicidade Estrita do Grafo Curricular (Detecção de Ciclos DFS)', () => {
  const engine = app.createEngine(curriculum, 2);
  const cycles = engine.findCycles();
  assert.strictEqual(cycles.length, 0, `Não devem existir ciclos no grafo curricular. Ciclos encontrados: ${JSON.stringify(cycles)}`);
});

runTest('4.2 - Monotonia Cronológica Topological: Semestre(B) > Semestre(A) em Todas as FDCs', () => {
  [1, 2, 3, 4].forEach(fdcId => {
    const engine = app.createEngine(curriculum, fdcId);
    const alloc = engine.state.allocations;

    Object.keys(alloc).forEach(destCode => {
      const destAlloc = alloc[destCode];
      if (!destAlloc || destAlloc.semester === null || destAlloc.completed) return;

      const prereqs = engine.state.prereqMap[destCode] || [];
      prereqs.forEach(srcCode => {
        const srcAlloc = alloc[srcCode];
        if (!srcAlloc || srcAlloc.semester === null || srcAlloc.completed) return;

        assert(
          destAlloc.semester > srcAlloc.semester,
          `Violação de precedência na FDC ${fdcId}: ${destCode} (S${destAlloc.semester}) deve ser estritamente posterior a ${srcCode} (S${srcAlloc.semester})`
        );
      });
    });
  });
});

runTest('4.3 - Monotonia Cronológica e Periodicidade Mantidas Após Perturbações Agressivas', () => {
  const engine = app.createEngine(curriculum, 2);

  // Move Cálculo I (MAT01353) para o Semestre 6
  engine.moveCourse('MAT01353', 6);
  // Move Circuitos I (ENG10001) para o Semestre 8
  engine.moveCourse('ENG10001', 8);

  const dagResult = engine.validateTrajectoryDag();
  assert.strictEqual(dagResult.isValid, true, `O DAG deve permanecer 100% válido sem violações. Violações: ${JSON.stringify(dagResult.violations)}`);

  // Verifica explicitamente Semestre(B) > Semestre(A)
  const alloc = engine.state.allocations;
  Object.keys(alloc).forEach(destCode => {
    const destAlloc = alloc[destCode];
    if (destAlloc.semester === null) return;
    (engine.state.prereqMap[destCode] || []).forEach(srcCode => {
      const srcAlloc = alloc[srcCode];
      if (srcAlloc && srcAlloc.semester !== null) {
        assert(
          destAlloc.semester > srcAlloc.semester,
          `Violação pós-perturbação: ${destCode} (S${destAlloc.semester}) <= ${srcCode} (S${srcAlloc.semester})`
        );
      }
    });
  });
});

runTest('4.4 - Estabilidade Numérica das Coordenadas Bézier SVG (Ausência de NaN e Infinito)', () => {
  const engine = app.createEngine(curriculum, 2);
  const testScales = [0.35, 0.5, 0.85, 1.0, 1.25, 1.75, 2.2];
  let connectionCount = 0;

  testScales.forEach(scale => {
    Object.keys(engine.state.allocations).forEach(destCode => {
      const destAlloc = engine.state.allocations[destCode];
      if (!destAlloc || destAlloc.semester === null) return;

      const prereqs = engine.state.prereqMap[destCode] || [];
      prereqs.forEach(srcCode => {
        const srcAlloc = engine.state.allocations[srcCode];
        if (!srcAlloc || srcAlloc.semester === null) return;

        connectionCount++;

        // Simula posições geométricas típicas do DOM Miro Canvas
        const r1 = {
          left: (srcAlloc.semester - 1) * 280 + 20,
          right: (srcAlloc.semester - 1) * 280 + 260,
          top: 120 + (srcAlloc.semester * 15),
          height: 84
        };

        const r2 = {
          left: (destAlloc.semester - 1) * 280 + 20,
          right: (destAlloc.semester - 1) * 280 + 260,
          top: 180 + (destAlloc.semester * 25),
          height: 84
        };

        const boardRect = { left: 40, top: 30 };

        const coords = app.calculateBezierCoordinates(r1, r2, boardRect, scale);

        // Validação de finitude e ausência de NaN
        const valuesToAudit = [
          coords.x1, coords.y1,
          coords.x2, coords.y2,
          coords.dx,
          coords.cp1.x, coords.cp1.y,
          coords.cp2.x, coords.cp2.y
        ];

        valuesToAudit.forEach(val => {
          assert(typeof val === 'number', `Valor deve ser numérico: ${val}`);
          assert(!isNaN(val), `Valor não pode ser NaN: ${val}`);
          assert(Number.isFinite(val), `Valor deve ser finito: ${val}`);
        });

        assert(coords.dx >= 45, `dx deve ser >= 45 para garantir curvatura natural (atual: ${coords.dx})`);

        // Validação do formato SVG Path String
        assert(typeof coords.d === 'string', 'Path deve ser uma string');
        assert(coords.d.startsWith('M '), 'Path deve iniciar com M (MoveTo)');
        assert(coords.d.includes(' C '), 'Path deve conter C (Cubic Bézier)');
        assert(!coords.d.includes('NaN'), 'Path SVG não pode conter substring NaN');
        assert(!coords.d.includes('Infinity'), 'Path SVG não pode conter substring Infinity');

        // Amostragem de pontos ao longo da curva cúbica t in [0..1]
        [0.0, 0.15, 0.35, 0.5, 0.75, 0.9, 1.0].forEach(t => {
          const pt = app.sampleBezierPoint(
            t,
            { x: coords.x1, y: coords.y1 },
            coords.cp1,
            coords.cp2,
            { x: coords.x2, y: coords.y2 }
          );
          assert(Number.isFinite(pt.x) && !isNaN(pt.x), `Ponto Bézier pt.x(t=${t}) deve ser finito e não-NaN`);
          assert(Number.isFinite(pt.y) && !isNaN(pt.y), `Ponto Bézier pt.y(t=${t}) deve ser finito e não-NaN`);
        });
      });
    });
  });

  assert(connectionCount > 0, 'Deve ter auditado conexões ativas');
});

runTest('4.5 - Resiliência Geométrica Extrema: Grandes saltos, alinhamentos verticais idênticos e Pan offsets', () => {
  const edgeCases = [
    { name: 'Colunas Adjacentes (S1 -> S2)', r1: { right: 280, top: 100, height: 80 }, r2: { left: 300, top: 100, height: 80 } },
    { name: 'Grande Distância (S1 -> S10)', r1: { right: 280, top: 100, height: 80 }, r2: { left: 2800, top: 500, height: 80 } },
    { name: 'Alinhamento Vertical Exato (y1 == y2)', r1: { right: 280, top: 200, height: 80 }, r2: { left: 600, top: 200, height: 80 } },
    { name: 'Pan Offset Negativo Extremo', r1: { right: -1500, top: -800, height: 80 }, r2: { left: -1200, top: -700, height: 80 }, board: { left: -5000, top: -5000 } },
    { name: 'Escala Mínima (0.35)', r1: { right: 280, top: 100, height: 80 }, r2: { left: 600, top: 200, height: 80 }, scale: 0.35 },
    { name: 'Escala Máxima (2.2)', r1: { right: 280, top: 100, height: 80 }, r2: { left: 600, top: 200, height: 80 }, scale: 2.2 }
  ];

  edgeCases.forEach(c => {
    const board = c.board || { left: 0, top: 0 };
    const scale = c.scale || 1.0;
    const coords = app.calculateBezierCoordinates(c.r1, c.r2, board, scale);

    [coords.x1, coords.y1, coords.x2, coords.y2, coords.dx, coords.cp1.x, coords.cp1.y, coords.cp2.x, coords.cp2.y].forEach(val => {
      assert(Number.isFinite(val) && !isNaN(val), `Caso [${c.name}] gerou valor inválido: ${val}`);
    });
    assert(!coords.d.includes('NaN') && !coords.d.includes('Infinity'), `Caso [${c.name}] gerou string SVG inválida: ${coords.d}`);
  });
});

// ============================================================================
// RELATÓRIO FINAL
// ============================================================================
console.log('\n================================================================');
console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
if (passedTests === totalTests) {
  console.log(' TODOS OS 4 CENÁRIOS FORAM AUDITADOS COM SUCESSO ABSOLUTO (100%)!');
} else {
  console.error(` FALHA: ${totalTests - passedTests} teste(s) falharam.`);
}
console.log('================================================================\n');
