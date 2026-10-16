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

console.log('=== VALIDAÇÃO DO SIMULADOR DE ENGENHARIA MECÂNICA (UFRGS) ===\n');

// 1. Resolve root path dynamically (CWD-independent via __dirname)
let baseDir = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(baseDir, 'dist', 'engenharia-mecanica'))) {
  baseDir = process.cwd();
  if (fs.existsSync(path.join(baseDir, 'trajetoria-academica', 'dist', 'engenharia-mecanica'))) {
    baseDir = path.join(baseDir, 'trajetoria-academica');
  }
}

const distMecDir = path.join(baseDir, 'dist', 'engenharia-mecanica');
const distEcaDir = path.join(baseDir, 'dist', 'engenharia-controle-automacao');
const distProdDir = path.join(baseDir, 'dist', 'engenharia-producao');

console.log(`Diretório base: ${baseDir}`);
console.log(`Diretório Mecânica: ${distMecDir}`);
console.log(`Diretório ECA: ${distEcaDir}\n`);

// TEST 1: Sintaxe JS (node --check)
console.log('--- Teste 1: Validação de Sintaxe JS (node --check) ---');
const jsFiles = ['app.js', 'curriculum_data.js'];
jsFiles.forEach(file => {
  const filePath = path.join(distMecDir, file);
  assert(fs.existsSync(filePath), `Arquivo ${file} existe em dist/engenharia-mecanica/`);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    assert(true, `Sintaxe de ${file} válida (node --check passou sem erros)`);
  } catch (err) {
    assert(false, `Erro de sintaxe em ${file}: ${err.message}`);
  }
});

// TEST 2: Integridade Referencial e Acyclicidade do Grafo DAG
console.log('\n--- Teste 2: Integridade Referencial do Grafo DAG ---');
const currJsonPath = path.join(distMecDir, 'curriculum_data.json');
assert(fs.existsSync(currJsonPath), 'curriculum_data.json existe');
const currData = JSON.parse(fs.readFileSync(currJsonPath, 'utf-8'));
const discMap = currData.disciplinas || {};
const discCodes = Object.keys(discMap);

assert(discCodes.length >= 60, `Catálogo de disciplinas possui ${discCodes.length} disciplinas (>= 60)`);

// 2.1 Todas as dependências devem existir
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
if (missingPrereqs.length > 0) {
  missingPrereqs.slice(0, 5).forEach(m => console.error(`  - ${m}`));
}

// 2.2 Ausência de ciclos (Ordenação Topológica Kahn)
const inDegree = {};
const adj = {};
discCodes.forEach(c => {
  inDegree[c] = 0;
  adj[c] = [];
});
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
assert(visited === discCodes.length, `Grafo DAG acíclico confirmado (todas as ${visited}/${discCodes.length} disciplinas visitadas sem loops)`);

// 2.3 Metas de créditos
assert(currData.estatisticas_nominais.creditos_obrigatorios >= 220, `Créditos obrigatórios nominais adequados (${currData.estatisticas_nominais.creditos_obrigatorios} cr)`);
assert(currData.estatisticas_nominais.creditos_eletivos >= 16, `Créditos eletivos nominais adequados (${currData.estatisticas_nominais.creditos_eletivos} cr)`);

// TEST 3: Ausência de FDC na UI e Identidade Visual Exclusiva
console.log('\n--- Teste 3: Interface HTML & Ausência de FDC ---');
const htmlContent = fs.readFileSync(path.join(distMecDir, 'index.html'), 'utf-8');
assert(!htmlContent.includes('id="fdc-chips-group"'), 'Seletor de FDC chips removido da UI');
assert(!htmlContent.includes('id="fdc-select"'), 'Select de FDC removido da UI');
assert(!htmlContent.includes('pill-fdc'), 'Mini-card pill-fdc removido do painel de créditos');
assert(htmlContent.includes('Trajetória Mecânica'), 'Título "Trajetória Mecânica" presente no cabeçalho');
assert(htmlContent.includes('Engenharia Mecânica • Catálogo 2026/1'), 'Subtítulo institucional da Engenharia Mecânica presente');
assert(htmlContent.includes('Créditos Obrigatórios'), 'Título "Créditos Obrigatórios" presente na Barra 1');
assert(htmlContent.includes('Créditos Eletivos'), 'Título "Créditos Eletivos" presente na Barra 2');

// TEST 4: Isolamento de localStorage e Nomes de Exportação
console.log('\n--- Teste 4: Isolamento de localStorage & Exportação ---');
const appContent = fs.readFileSync(path.join(distMecDir, 'app.js'), 'utf-8');
assert(appContent.includes("'trajetoria_eng_mecanica_ufrgs_v1'"), "Chave 'trajetoria_eng_mecanica_ufrgs_v1' de localStorage configurada");
assert(!appContent.includes("'trajetoria_eca_ufrgs'"), "Chave antiga de ECA ('trajetoria_eca_ufrgs') completamente eliminada do app de Mecânica");
assert(appContent.includes('grade_mecanica_ufrgs_'), "Nome sugerido para exportação 'grade_mecanica_ufrgs' configurado");

// TEST 5: Limpeza das Pastas de Distribuição
console.log('\n--- Teste 5: Higiene & Limpeza dos Diretórios dist/ ---');
const allowedFiles = new Set(['index.html', 'styles.css', 'app.js', 'curriculum_data.js', 'curriculum_data.json', 'README.md']);

function checkCleanDir(dirPath, label) {
  assert(fs.existsSync(dirPath), `Diretório ${label} existe`);
  const files = fs.readdirSync(dirPath);
  const extraneous = files.filter(f => !allowedFiles.has(f));
  assert(extraneous.length === 0, `Diretório ${label} limpo contendo apenas os ${allowedFiles.size} arquivos de produção (Arquivos extras: ${extraneous.join(', ') || 'Nenhum'})`);
  assert(allowedFiles.size === files.length, `Todos os ${allowedFiles.size} arquivos esperados estão presentes em ${label} (${files.length}/${allowedFiles.size})`);
}

checkCleanDir(distEcaDir, 'dist/engenharia-controle-automacao');
checkCleanDir(distMecDir, 'dist/engenharia-mecanica');
checkCleanDir(distProdDir, 'dist/engenharia-producao');

// FINAL SUMMARY
console.log('\n======================================================');
if (failures === 0) {
  console.log('✅ TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
  console.log('======================================================');
  process.exit(0);
} else {
  console.error(`❌ VALIDAÇÃO FALHOU COM ${failures} ERRO(S)!`);
  console.log('======================================================');
  process.exit(1);
}
