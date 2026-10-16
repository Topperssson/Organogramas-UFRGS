const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failures++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

console.log('========================================================================');
console.log('AUDITORIA GERAL DE TODOS OS SIMULADORES STANDALONE DA UFRGS');
console.log('(ECA • Mecânica • Produção • Economia • Elétrica • Computação)');
console.log('========================================================================\n');

// 1. Resolve base directory dynamically (CWD-independent via __dirname)
let baseDir = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(baseDir, 'dist', 'engenharia-producao'))) {
  baseDir = process.cwd();
  if (fs.existsSync(path.join(baseDir, 'trajetoria-academica', 'dist', 'engenharia-producao'))) {
    baseDir = path.join(baseDir, 'trajetoria-academica');
  }
}

const projects = [
  {
    name: 'Engenharia de Controle e Automação',
    folder: 'engenharia-controle-automacao',
    expectedKey: 'trajetoria_eca_ufrgs',
    exportPrefix: 'grade_eca_ufrgs',
    minCourses: 80,
    hasFdc: true
  },
  {
    name: 'Engenharia Mecânica',
    folder: 'engenharia-mecanica',
    expectedKey: 'trajetoria_eng_mecanica_ufrgs_v1',
    exportPrefix: 'grade_mecanica_ufrgs',
    minCourses: 60,
    hasFdc: false
  },
  {
    name: 'Engenharia de Produção',
    folder: 'engenharia-producao',
    expectedKey: 'trajetoria_eng_producao_ufrgs_v1',
    exportPrefix: 'grade_producao_ufrgs',
    minCourses: 60,
    hasFdc: false
  },
  {
    name: 'Ciências Econômicas',
    folder: 'ciencias-economicas',
    expectedKey: 'trajetoria_economia_diurno_ufrgs_v1',
    exportPrefix: 'grade_economia',
    minCourses: 160,
    hasFdc: false
  },
  {
    name: 'Engenharia Elétrica',
    folder: 'engenharia-eletrica',
    expectedKey: 'trajetoria_eng_eletrica_ufrgs_v1',
    exportPrefix: 'grade_eletrica_ufrgs',
    minCourses: 80,
    hasFdc: false
  },
  {
    name: 'Engenharia de Computação',
    folder: 'engenharia-computacao',
    expectedKey: 'trajetoria_eng_computacao_ufrgs_v1',
    exportPrefix: 'grade_computacao_ufrgs',
    minCourses: 80,
    hasFdc: false
  }
];

const allowedFiles = new Set(['index.html', 'styles.css', 'app.js', 'curriculum_data.js', 'curriculum_data.json']);
const foundKeys = new Set();

// -----------------------------------------------------------------------------
// TESTE 1: SINTAXE JS (node --check) EM TODOS OS 3 PROJETOS
// -----------------------------------------------------------------------------
console.log('--- Teste 1: Validação de Sintaxe JS (node --check) em Todos os Projetos ---');
projects.forEach(p => {
  const pDir = path.join(baseDir, 'dist', p.folder);
  ['app.js', 'curriculum_data.js'].forEach(file => {
    const fPath = path.join(pDir, file);
    assert(fs.existsSync(fPath), `[${p.name}] ${file} presente em dist/${p.folder}/`);
    try {
      execSync(`node --check "${fPath}"`, { stdio: 'pipe' });
      assert(true, `[${p.name}] ${file} - Sintaxe JS 100% válida`);
    } catch (e) {
      assert(false, `[${p.name}] ${file} - Erro de sintaxe: ${e.message}`);
    }
  });
});

// -----------------------------------------------------------------------------
// TESTE 2: INTEGRIDADE DO GRAFO DAG DA ENGENHARIA DE PRODUÇÃO
// -----------------------------------------------------------------------------
console.log('\n--- Teste 2: Integridade Referencial e Acyclicidade do DAG de Produção ---');
const prodDir = path.join(baseDir, 'dist', 'engenharia-producao');
const prodJson = JSON.parse(fs.readFileSync(path.join(prodDir, 'curriculum_data.json'), 'utf-8'));
const prodMap = prodJson.disciplinas || {};
const prodCodes = Object.keys(prodMap);

assert(prodCodes.length >= 60, `Catálogo de Produção possui ${prodCodes.length} disciplinas (>= 60)`);

// 2.1 Dependências órfãs
let missingPrereqs = [];
prodCodes.forEach(code => {
  const prereqs = prodMap[code].prerequisitos || [];
  prereqs.forEach(p => {
    if (!prodMap[p]) {
      missingPrereqs.push(`${code} -> pré-requisito ausente: ${p}`);
    }
  });
});
assert(missingPrereqs.length === 0, `Nenhum pré-requisito órfão no DAG de Produção (${missingPrereqs.length} falhas)`);

// 2.2 Ausência de ciclos
const inDegree = {};
const adj = {};
prodCodes.forEach(c => { inDegree[c] = 0; adj[c] = []; });
prodCodes.forEach(c => {
  (prodMap[c].prerequisitos || []).forEach(p => {
    if (adj[p]) adj[p].push(c);
    inDegree[c]++;
  });
});

const queue = prodCodes.filter(c => inDegree[c] === 0);
let visited = 0;
while (queue.length > 0) {
  const curr = queue.shift();
  visited++;
  (adj[curr] || []).forEach(nxt => {
    inDegree[nxt]--;
    if (inDegree[nxt] === 0) queue.push(nxt);
  });
}
assert(visited === prodCodes.length, `DAG de Produção estritamente acíclico (${visited}/${prodCodes.length} nós ordenados)`);
assert(prodJson.estatisticas_nominais.creditos_obrigatorios >= 200, `Metas de créditos obrigatórios nominais de Produção: ${prodJson.estatisticas_nominais.creditos_obrigatorios} cr`);

// -----------------------------------------------------------------------------
// TESTE 3: ISOLAMENTO RIGOROSO DE LOCALSTORAGE ENTRE OS 3 CURSOS
// -----------------------------------------------------------------------------
console.log('\n--- Teste 3: Isolamento de localStorage e Prefixos de Exportação ---');
projects.forEach(p => {
  const pApp = fs.readFileSync(path.join(baseDir, 'dist', p.folder, 'app.js'), 'utf-8');
  assert(pApp.includes(`'${p.expectedKey}'`), `[${p.name}] Chave correta configurada: '${p.expectedKey}'`);
  assert(pApp.includes(`${p.exportPrefix}_`), `[${p.name}] Prefixo de exportação configurado: '${p.exportPrefix}'`);
  
  // Garantir unicidade da chave
  assert(!foundKeys.has(p.expectedKey), `[${p.name}] Chave '${p.expectedKey}' é única entre os cursos`);
  foundKeys.add(p.expectedKey);

  // Garantir que não há contaminação cruzada
  projects.forEach(other => {
    if (other.expectedKey !== p.expectedKey) {
      assert(!pApp.includes(`'${other.expectedKey}'`), `[${p.name}] Livre de contaminação cruzada da chave '${other.expectedKey}'`);
    }
  });
});

// -----------------------------------------------------------------------------
// TESTE 4: INTERFACE HTML (AUSÊNCIA DE FDC EM MECÂNICA E PRODUÇÃO)
// -----------------------------------------------------------------------------
console.log('\n--- Teste 4: Auditoria de Interface HTML & FDCs ---');
projects.forEach(p => {
  const pHtml = fs.readFileSync(path.join(baseDir, 'dist', p.folder, 'index.html'), 'utf-8');
  if (p.hasFdc) {
    assert(pHtml.includes('id="fdc-chips-group"'), `[${p.name}] Contém seletor de FDC (específico de ECA)`);
  } else {
    assert(!pHtml.includes('id="fdc-chips-group"'), `[${p.name}] Livre de seletor de FDC`);
    assert(!pHtml.includes('pill-fdc'), `[${p.name}] Livre de mini-card de FDC`);
  }
});

// -----------------------------------------------------------------------------
// TESTE 5: LIMPEZA DAS PASTAS DE DISTRIBUIÇÃO DIST/
// -----------------------------------------------------------------------------
console.log('\n--- Teste 5: Higiene de Distribuição Standalone ---');
projects.forEach(p => {
  const pDir = path.join(baseDir, 'dist', p.folder);
  const files = fs.readdirSync(pDir);
  const extraneous = files.filter(f => !allowedFiles.has(f));
  assert(extraneous.length === 0, `[${p.name}] Pasta limpa sem arquivos residuais de teste (Extras: ${extraneous.join(', ') || 'Nenhum'})`);
  assert(files.length === allowedFiles.size, `[${p.name}] Exatamente ${allowedFiles.size}/5 arquivos de produção presentes`);
});

// RESUMO FINAL
console.log('\n========================================================================');
if (failures === 0) {
  console.log('✅ AUDITORIA COMPLETA: TODOS OS 6 SIMULADORES ESTÃO 100% VALIDADOS!');
  console.log('   - Engenharia de Controle e Automação: PRONTO');
  console.log('   - Engenharia Mecânica: PRONTO');
  console.log('   - Engenharia de Produção: PRONTO');
  console.log('   - Ciências Econômicas: PRONTO');
  console.log('   - Engenharia Elétrica: PRONTO');
  console.log('   - Engenharia de Computação: PRONTO');
  console.log('========================================================================');
  process.exit(0);
} else {
  console.error(`❌ AUDITORIA FALHOU COM ${failures} ERRO(S)!`);
  console.log('========================================================================');
  process.exit(1);
}
