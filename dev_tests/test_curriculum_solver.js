/**
 * Test Suite: Validação do Motor DAG e Integridade Curricular
 * Engenharia de Controle e Automação - UFRGS
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log(' SUÍTE DE TESTES: DAG CONSTRAINT SOLVER & INTEGRIDADE CURRICULAR');
console.log('================================================================\n');

// 1. Carregamento dos dados
const dataPath = path.join(__dirname, 'curriculum_data.json');
assert(fs.existsSync(dataPath), 'Arquivo curriculum_data.json deve existir.');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const curriculum = JSON.parse(rawData);
const courses = curriculum.disciplinas;

console.log(`[PASS] curriculum_data.json carregado com sucesso (${Object.keys(courses).length} disciplinas catalogadas).`);

// 2. Teste 1: Integridade Referencial (Ausência de referências a disciplinas inexistentes)
console.log('\n--- Teste 1: Integridade Referencial de Pré-Requisitos ---');
const allCodes = new Set(Object.keys(courses));
let missingPrereqsCount = 0;

Object.keys(courses).forEach(code => {
  const prereqs = courses[code].prerequisitos || [];
  prereqs.forEach(pCode => {
    if (!allCodes.has(pCode)) {
      console.error(`[ERRO] Disciplina ${code} aponta para pré-requisito inexistente: ${pCode}`);
      missingPrereqsCount++;
    }
  });
});

assert.strictEqual(missingPrereqsCount, 0, 'Não deve haver referências a códigos inexistentes.');
console.log('[PASS] 100% dos pré-requisitos possuem integridade referencial estrita no catálogo.');

// 3. Montagem do Solver
const prereqMap = {};
const dependentMap = {};

allCodes.forEach(code => {
  prereqMap[code] = [...(courses[code].prerequisitos || [])];
  dependentMap[code] = [];
});

allCodes.forEach(code => {
  prereqMap[code].forEach(p => {
    if (!dependentMap[p].includes(code)) {
      dependentMap[p].push(code);
    }
  });
});

function createDefaultAllocations() {
  const alloc = {};
  allCodes.forEach(code => {
    const etapa = courses[code].etapa_sugerida;
    alloc[code] = {
      semester: (etapa && etapa >= 1 && etapa <= 10) ? etapa : null,
      completed: false,
      hasOverflow: false
    };
  });
  return alloc;
}

function solveMove(allocations, courseCode, targetSemester) {
  if (targetSemester === null) {
    allocations[courseCode].semester = null;
    allocations[courseCode].hasOverflow = false;
    return { cascaded: [] };
  }

  // Ajuste a montante
  const prereqs = prereqMap[courseCode] || [];
  let maxPrereqSem = 0;
  prereqs.forEach(p => {
    const pAlloc = allocations[p];
    if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
      if (pAlloc.semester > maxPrereqSem) maxPrereqSem = pAlloc.semester;
    }
  });

  let adjusted = targetSemester;
  if (maxPrereqSem > 0 && targetSemester <= maxPrereqSem) {
    adjusted = maxPrereqSem + 1;
  }

  allocations[courseCode].semester = adjusted;
  allocations[courseCode].hasOverflow = adjusted > 20;

  // Propagação a jusante (BFS)
  const queue = [courseCode];
  const cascaded = [];
  const visited = new Set([courseCode]);

  while (queue.length > 0) {
    const curr = queue.shift();
    const currSem = allocations[curr].semester;
    if (currSem === null) continue;

    const deps = dependentMap[curr] || [];
    deps.forEach(dep => {
      const depAlloc = allocations[dep];
      if (depAlloc && depAlloc.semester !== null) {
        if (depAlloc.semester <= currSem) {
          const newSem = currSem + 1;
          depAlloc.semester = newSem;
          depAlloc.hasOverflow = newSem > 20;
          if (!cascaded.includes(dep)) cascaded.push(dep);
          queue.push(dep);
        }
      }
    });
  }

  return { cascaded, adjusted };
}

function checkViolations(allocations) {
  let violations = [];
  allCodes.forEach(code => {
    const alloc = allocations[code];
    if (alloc.semester !== null && !alloc.completed) {
      prereqMap[code].forEach(p => {
        const pAlloc = allocations[p];
        if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
          if (alloc.semester <= pAlloc.semester) {
            violations.push({ course: code, prereq: p, semCourse: alloc.semester, semPrereq: pAlloc.semester });
          }
        }
      });
    }
  });
  return violations;
}

// 4. Teste 2: Grade padrão sem violações
console.log('\n--- Teste 2: Validação da Grade Padrão Inicial ---');
const initAlloc = createDefaultAllocations();
const initViolations = checkViolations(initAlloc);
assert.strictEqual(initViolations.length, 0, `Grade inicial não deve ter violações: ${JSON.stringify(initViolations)}`);
console.log('[PASS] Grade padrão inicial sugerida pela UFRGS é 100% acíclica e válida temporalmente.');

// 5. Teste 3: Propagação em Cascata Multi-Nível
console.log('\n--- Teste 3: Propagação em Cascata Multi-Nível ---');
// Cadeia clássica: MAT01353 (Cálculo I) -> MAT01354 (Cálculo II) -> MAT01167 (EDO II) -> ENG10004 (Controle I)
const allocMulti = createDefaultAllocations();
console.log(`Estado Inicial: MAT01353 em S${allocMulti['MAT01353'].semester}, MAT01354 em S${allocMulti['MAT01354'].semester}, MAT01167 em S${allocMulti['MAT01167'].semester}`);

// Move MAT01353 para o Semestre 4
const resMove = solveMove(allocMulti, 'MAT01353', 4);
console.log(`MAT01353 movido para Semestre 4. Total empurrados em cascata: ${resMove.cascaded.length}`);

assert(allocMulti['MAT01354'].semester > 4, `Cálculo II deve estar em semestre > 4 (atual: S${allocMulti['MAT01354'].semester})`);
assert(allocMulti['MAT01167'].semester > allocMulti['MAT01354'].semester, `EDO II deve estar estritamente após Cálculo II`);

const multiViolations = checkViolations(allocMulti);
assert.strictEqual(multiViolations.length, 0, 'Nenhuma dependência deve ser violada após a cascata');
console.log('[PASS] Propagação em cascata multi-nível determinística garantiu consistência cronológica completa.');

// 6. Teste 4: Tentativa de Mover Disciplina para Semestre Anterior ao Pré-Requisito
console.log('\n--- Teste 4: Tentativa de Movimentação Ilegal a Montante ---');
const allocIllegal = createDefaultAllocations();
// MAT01354 (Cálculo II) tem pré-requisito MAT01353 em Semestre 1.
// Tentar soltar MAT01354 no Semestre 1 deve ajustar automaticamente para Semestre 2.
const resIllegal = solveMove(allocIllegal, 'MAT01354', 1);
assert.strictEqual(resIllegal.adjusted, 2, 'MAT01354 deve ter sido ajustado para Semestre 2.');
assert(allocIllegal['MAT01354'].semester > allocIllegal['MAT01353'].semester, 'Cálculo II deve permanecer estritamente após Cálculo I');
console.log('[PASS] Movimento ilegal a montante foi corrigido deterministicamente pelo solver.');

// 7. Teste 5: Barreira do 20º Semestre (Overflow)
console.log('\n--- Teste 5: Tratamento da Barreira do 20º Semestre (Overflow) ---');
const allocOverflow = createDefaultAllocations();
// Move MAT01353 para Semestre 18
solveMove(allocOverflow, 'MAT01353', 18);
let hasOverflowItem = false;
let maxSemFound = 0;

Object.keys(allocOverflow).forEach(code => {
  const a = allocOverflow[code];
  if (a.hasOverflow) hasOverflowItem = true;
  if (a.semester && a.semester > maxSemFound) maxSemFound = a.semester;
});

assert(hasOverflowItem, 'Disciplinas empurradas além de 20 devem ter flag hasOverflow: true.');
assert(maxSemFound > 20, 'O semestre virtual deve refletir o valor real da cadeia sem travar.');
const overflowViolations = checkViolations(allocOverflow);
assert.strictEqual(overflowViolations.length, 0, 'Mesmo com overflow, a ordem cronológica do DAG deve ser mantida.');
console.log(`[PASS] Barreira do 20º semestre tratada com sucesso (semestre máximo: S${maxSemFound}, overflow detectado sem travamento).`);

console.log('\n================================================================');
console.log(' TODOS OS TESTES FORAM APROVADOS COM 100% DE SUCESSO!           ');
console.log('================================================================');
