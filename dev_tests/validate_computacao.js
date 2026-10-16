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

console.log('=== VALIDAÇÃO DO SIMULADOR DE ENGENHARIA DE COMPUTAÇÃO (UFRGS) ===\n');

let baseDir = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(baseDir, 'dist', 'engenharia-computacao'))) {
  baseDir = process.cwd();
  if (fs.existsSync(path.join(baseDir, 'trajetoria-academica', 'dist', 'engenharia-computacao'))) {
    baseDir = path.join(baseDir, 'trajetoria-academica');
  }
}

const distDir = path.join(baseDir, 'dist', 'engenharia-computacao');
const expectedKey = 'trajetoria_eng_computacao_ufrgs_v1';
const exportPrefix = 'grade_computacao_ufrgs';

// TEST 1: Sintaxe JS (node --check)
console.log('--- Teste 1: Validação de Sintaxe JS (node --check) ---');
['app.js', 'curriculum_data.js'].forEach(file => {
  const filePath = path.join(distDir, file);
  assert(fs.existsSync(filePath), `Arquivo ${file} existe em dist/engenharia-computacao/`);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    assert(true, `Sintaxe de ${file} válida (node --check passou sem erros)`);
  } catch (err) {
    assert(false, `Erro de sintaxe em ${file}: ${err.message}`);
  }
});

// TEST 2: Integridade Referencial e Acyclicidade do Grafo DAG
console.log('\n--- Teste 2: Integridade Referencial e Grafo DAG ---');
const currJsonPath = path.join(distDir, 'curriculum_data.json');
assert(fs.existsSync(currJsonPath), 'curriculum_data.json existe');
const currData = JSON.parse(fs.readFileSync(currJsonPath, 'utf-8'));
const discMap = currData.disciplinas || {};
const discCodes = Object.keys(discMap);

assert(discCodes.length >= 80, `Catálogo de disciplinas possui ${discCodes.length} disciplinas (>= 80)`);

let missingPrereqs = [];
discCodes.forEach(code => {
  const prereqs = discMap[code].prerequisitos || [];
  prereqs.forEach(p => {
    if (!discMap[p]) {
      missingPrereqs.push(`${code} -> pré-requisito inexistente: ${p}`);
    }
  });
});
assert(missingPrereqs.length === 0, `Nenhum pré-requisito órfão encontrado (${missingPrereqs.length} falhas)`);

// Acyclicidade (Kahn)
const inDegree = {};
const adj = {};
discCodes.forEach(c => { inDegree[c] = 0; adj[c] = []; });
discCodes.forEach(c => {
  (discMap[c].prerequisitos || []).forEach(p => {
    if (adj[p]) adj[p].push(c);
    inDegree[c]++;
  });
});
const queue = discCodes.filter(c => inDegree[c] === 0);
let visited = 0;
while (queue.length > 0) {
  const curr = queue.shift();
  visited++;
  (adj[curr] || []).forEach(nxt => {
    inDegree[nxt]--;
    if (inDegree[nxt] === 0) queue.push(nxt);
  });
}
assert(visited === discCodes.length, `DAG estritamente acíclico (${visited}/${discCodes.length} nós ordenados)`);

// TEST 3: Isolamento de localStorage
console.log('\n--- Teste 3: Isolamento de localStorage e Prefixos de Exportação ---');
const appJsContent = fs.readFileSync(path.join(distDir, 'app.js'), 'utf-8');
assert(appJsContent.includes(`'${expectedKey}'`), `Chave correta configurada: '${expectedKey}'`);
assert(appJsContent.includes(`${exportPrefix}_`), `Prefixo de exportação configurado: '${exportPrefix}'`);
assert(!appJsContent.includes("'trajetoria_eng_producao_ufrgs_v1'"), "Sem contaminação da chave de Produção");
assert(!appJsContent.includes("'trajetoria_eng_mecanica_ufrgs_v1'"), "Sem contaminação da chave de Mecânica");
assert(!appJsContent.includes("'trajetoria_eng_eletrica_ufrgs_v1'"), "Sem contaminação da chave de Elétrica");

// TEST 4: Higiene da pasta de distribuição
console.log('\n--- Teste 4: Higiene de Distribuição Standalone ---');
const allowedFiles = new Set(['index.html', 'styles.css', 'app.js', 'curriculum_data.js', 'curriculum_data.json', 'README.md']);
const files = fs.readdirSync(distDir);
const extraneous = files.filter(f => !allowedFiles.has(f));
assert(extraneous.length === 0, `Pasta limpa sem resíduos (Extras: ${extraneous.join(', ') || 'Nenhum'})`);
assert(files.length === allowedFiles.size, `Exatamente ${allowedFiles.size}/${allowedFiles.size} arquivos de produção presentes`);

console.log('\n========================================================================');
if (failures === 0) {
  console.log('✅ ENGENHARIA DE COMPUTAÇÃO: 100% VALIDADA E PRONTA PARA PRODUÇÃO!');
  process.exit(0);
} else {
  console.error(`❌ VALIDAÇÃO FALHOU COM ${failures} ERRO(S)!`);
  process.exit(1);
}
