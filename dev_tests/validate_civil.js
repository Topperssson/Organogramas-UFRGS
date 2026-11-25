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

console.log('=== VALIDAÇÃO DO SIMULADOR DE ENGENHARIA CIVIL (UFRGS) ===\n');

let baseDir = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(baseDir, 'dist', 'engenharia-civil'))) {
  baseDir = process.cwd();
}

const distDir = path.join(baseDir, 'dist', 'engenharia-civil');
const expectedKey = 'trajetoria_eng_civil_ufrgs_v1';
const exportPrefix = 'grade_civil_ufrgs';
const expectedObrigCr = 234;
const expectedEleCr = 24;
const expectedTotDiplCr = 291;
const expectedMaxStage = 10;

// TEST 1: Sintaxe JS (node --check) e fallback global file://
console.log('--- Teste 1: Sintaxe JS e Fallback CURRICULUM_DATA ---');
['app.js', 'curriculum_data.js'].forEach(file => {
  const filePath = path.join(distDir, file);
  assert(fs.existsSync(filePath), `Arquivo ${file} existe em dist/engenharia-civil/`);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    assert(true, `Sintaxe de ${file} válida (node --check passou sem erros)`);
  } catch (err) {
    assert(false, `Erro de sintaxe em ${file}: ${err.message}`);
  }
});

const currJsonPath = path.join(distDir, 'curriculum_data.json');
assert(fs.existsSync(currJsonPath), 'curriculum_data.json existe');
const currData = JSON.parse(fs.readFileSync(currJsonPath, 'utf-8'));
const discMap = currData.disciplinas || {};
const discCodes = Object.keys(discMap);

const currJsMod = require(path.join(distDir, 'curriculum_data.js'));
assert(Boolean(currJsMod && currJsMod.CURRICULUM_DATA), 'curriculum_data.js exporta CURRICULUM_DATA');
assert(Boolean(globalThis.CURRICULUM_DATA), 'curriculum_data.js define globalThis.CURRICULUM_DATA');
assert(
  Object.keys(currJsMod.CURRICULUM_DATA.disciplinas || {}).length === discCodes.length,
  `Parity JSON/JS confirmada (${discCodes.length} disciplinas)`
);

// TEST 2: Integridade Referencial, Acyclicidade DAG e Créditos Nominais
console.log('\n--- Teste 2: Integridade Referencial, DAG e Créditos Nominais ---');
assert(discCodes.length === 161, `Catálogo possui exatamente ${discCodes.length}/161 disciplinas`);

let missingPrereqs = [];
discCodes.forEach(code => {
  (discMap[code].prerequisitos || []).forEach(p => {
    if (!discMap[p]) missingPrereqs.push(`${code} -> ${p}`);
  });
});
assert(missingPrereqs.length === 0, `Nenhum pré-requisito órfão encontrado (${missingPrereqs.length} falhas)`);

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

const nom = currData.estatisticas_nominais || {};
assert(nom.creditos_obrigatorios === expectedObrigCr, `Créditos obrigatórios nominais: ${nom.creditos_obrigatorios} cr (esperado ${expectedObrigCr})`);
assert(nom.creditos_eletivos === expectedEleCr, `Créditos eletivos nominais: ${nom.creditos_eletivos} cr (esperado ${expectedEleCr})`);
assert(nom.creditos_totais_diplomacao === expectedTotDiplCr, `Créditos totais diplomação: ${nom.creditos_totais_diplomacao} cr (esperado ${expectedTotDiplCr})`);

const etapas = discCodes.map(c => discMap[c].etapa_sugerida).filter(x => typeof x === 'number');
const maxEtapa = Math.max(...etapas);
assert(maxEtapa === expectedMaxStage, `Etapa máxima da grade: ${maxEtapa} (esperado ${expectedMaxStage})`);

// TEST 3: Interface HTML, Metas, Chips de Etapa e Ausência de FDC
console.log('\n--- Teste 3: Interface HTML & Ausência de FDC ---');
const htmlContent = fs.readFileSync(path.join(distDir, 'organograma.html'), 'utf-8');
const cssContent = fs.readFileSync(path.join(distDir, 'styles.css'), 'utf-8');
assert(!htmlContent.includes('id="fdc-chips-group"'), 'Seletor de FDC chips ausente');
assert(!htmlContent.includes('id="fdc-select"'), 'Select de FDC ausente');
assert(!htmlContent.includes('pill-fdc'), 'Mini-card pill-fdc ausente');
assert(htmlContent.includes("Engenharia Civil"), 'Nome oficial do curso presente no HTML');
assert(htmlContent.includes(`id="stat-obrig-target">${expectedObrigCr}</span>`), `stat-obrig-target = ${expectedObrigCr}`);
assert(htmlContent.includes(`id="stat-ele-target">${expectedEleCr}</span>`), `stat-ele-target = ${expectedEleCr}`);
assert(htmlContent.includes(`id="stat-target-credits">${expectedTotDiplCr}</span>`), `stat-target-credits = ${expectedTotDiplCr}`);
assert(htmlContent.includes(`id="stat-max-sem">${expectedMaxStage} sem</strong>`), `stat-max-sem = ${expectedMaxStage} sem`);
assert(htmlContent.includes(`id="stat-planned-obrig-target">${expectedObrigCr}</span>`), `stat-planned-obrig-target = ${expectedObrigCr}`);
assert(htmlContent.includes(`id="stat-planned-ele-target">${expectedEleCr}</span>`), `stat-planned-ele-target = ${expectedEleCr}`);

for (let s = 1; s <= expectedMaxStage; s++) {
  assert(htmlContent.includes(`data-stage="${s}"`), `Chip de etapa ${s}º presente`);
}



// TEST 4: Isolamento de localStorage e Prefixos de Exportação
console.log('\n--- Teste 4: Isolamento de localStorage e Prefixos de Exportação ---');
const appJsContent = fs.readFileSync(path.join(distDir, 'app.js'), 'utf-8');
assert(appJsContent.includes(`'${expectedKey}'`), `Chave correta configurada: '${expectedKey}'`);
assert(appJsContent.includes(`${exportPrefix}_`), `Prefixo de exportação configurado: '${exportPrefix}_'`);


const otherKeys = ["trajetoria_eca_ufrgs","trajetoria_eng_mecanica_ufrgs_v1","trajetoria_eng_producao_ufrgs_v1","trajetoria_economia_diurno_ufrgs_v1","trajetoria_economia_noturno_ufrgs_v1","trajetoria_eng_eletrica_ufrgs_v1","trajetoria_eng_computacao_ufrgs_v1","trajetoria_ciencia_computacao_ufrgs_v1","trajetoria_eng_quimica_ufrgs_v1","trajetoria_eng_materiais_ufrgs_v1","trajetoria_eng_ambiental_ufrgs_v1","trajetoria_eng_metalurgica_ufrgs_v1","trajetoria_eng_minas_ufrgs_v1","trajetoria_eng_fisica_ufrgs_v1","trajetoria_eng_cartografica_ufrgs_v1","trajetoria_matematica_lic_diurno_ufrgs_v1","trajetoria_matematica_lic_noturno_ufrgs_v1","trajetoria_matematica_bach_pura_ufrgs_v1","trajetoria_matematica_bach_aplicada_ufrgs_v1"];
otherKeys.forEach(k => {
  assert(!appJsContent.includes(`'${k}'`), `Sem contaminação da chave '${k}'`);
});

// TEST 5: Smoke Test Headless do Engine DAG (createEngine)
console.log('\n--- Teste 5: Smoke Test Headless (createEngine) ---');
const appMod = require(path.join(distDir, 'app.js'));
assert(typeof appMod.createEngine === 'function', 'app.js exporta createEngine');
const eng = appMod.createEngine(currData);
const allocKeys = Object.keys(eng.state.allocations);
assert(allocKeys.length === discCodes.length, `Engine inicializou todas as ${allocKeys.length}/${discCodes.length} alocações`);

let obrigMismatch = [];
let eletivaMismatch = [];
discCodes.forEach(code => {
  const c = discMap[code];
  const alloc = eng.state.allocations[code];
  if (c.tipo === 'obrigatoria' && typeof c.etapa_sugerida === 'number') {
    if (!alloc || alloc.semester !== c.etapa_sugerida) {
      obrigMismatch.push(`${code}(etapa=${c.etapa_sugerida}, alloc=${alloc ? alloc.semester : 'none'})`);
    }
  } else if (c.tipo === 'eletiva') {
    if (!alloc || alloc.semester !== null) {
      eletivaMismatch.push(`${code}(alloc=${alloc ? alloc.semester : 'none'})`);
    }
  }
});
assert(obrigMismatch.length === 0, `Todas as obrigatórias alocadas na etapa sugerida (falhas: ${obrigMismatch.join(', ') || '0'})`);
assert(eletivaMismatch.length === 0, `Todas as eletivas iniciam no Banco de Eletivas (falhas: ${eletivaMismatch.join(', ') || '0'})`);

// TEST 6: Higiene da pasta de distribuição (estritamente 6 arquivos)
console.log('\n--- Teste 6: Higiene de Distribuição Standalone ---');
const allowedFiles = new Set(['organograma.html', 'styles.css', 'app.js', 'curriculum_data.js', 'curriculum_data.json', 'README.md']);
const files = fs.readdirSync(distDir);
const extraneous = files.filter(f => !allowedFiles.has(f));
assert(extraneous.length === 0, `Pasta limpa sem resíduos (Extras: ${extraneous.join(', ') || 'Nenhum'})`);
assert(files.length === allowedFiles.size, `Exatamente ${allowedFiles.size}/${allowedFiles.size} arquivos de produção presentes`);

console.log('\n========================================================================');
if (failures === 0) {
  console.log('✅ ENGENHARIA CIVIL: 100% VALIDADO E PRONTO PARA PRODUÇÃO!');
  process.exit(0);
} else {
  console.error(`❌ VALIDAÇÃO FALHOU COM ${failures} ERRO(S)!`);
  process.exit(1);
}
