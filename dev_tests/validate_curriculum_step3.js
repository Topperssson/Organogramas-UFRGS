/**
 * Script de Validação e Testes Automatizados - Etapa 3
 * 1. Existência de exatamente 3 FDCs selecionáveis (sem a 4ª opção "Geral").
 * 2. Que ENG03003 (ROBÓTICA) e ENG03026 (ROBÓTICA A) nunca aparecem simultaneamente como OBRIGATÓRIA por padrão, e que a alternância move a outra para ELETIVA.
 * 3. Que todas as 10 classes CSS de semestre original possuem códigos hexadecimais únicos e distintos.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================================');
console.log(' VALIDAÇÃO DA ETAPA 3: REGRAS DE 3 FDCS, ALTERNÂNCIA E PALETA DE CORES');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// ITEM 1: Existência de exatamente 3 FDCs selecionáveis (sem a 4ª opção "Geral")
// -----------------------------------------------------------------------------
console.log('--- Teste 1: Validação de Exatamente 3 FDCs Selecionáveis (Sem "Geral") ---');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const curriculumJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'curriculum_data.json'), 'utf8'));
const curriculumJs = fs.readFileSync(path.join(__dirname, 'curriculum_data.js'), 'utf8');

// 1.1 No JSON do catálogo
assert.strictEqual(curriculumJson.fdcs.length, 3, `O catálogo JSON deve ter exatamente 3 FDCs, encontrado: ${curriculumJson.fdcs.length}`);
const fdcNames = curriculumJson.fdcs.map(f => f.nome);
assert(!fdcNames.some(n => /Geral|Essencial/i.test(n)), 'Nenhuma FDC deve se chamar "Geral" ou "Essencial" avulsa');
console.log('[PASS] curriculum_data.json possui exatamente 3 FDCs oficiais:', fdcNames.join(' | '));

// 1.2 No HTML: chips e select
const chipMatches = htmlContent.match(/<button[^>]*class=[^>]*fdc-chip[^>]*>/g) || [];
assert.strictEqual(chipMatches.length, 3, `HTML deve conter exatamente 3 chips de FDC, encontrado: ${chipMatches.length}`);

const fdcSelectHtml = (htmlContent.match(/<select id="fdc-select"[\s\S]*?<\/select>/) || [''])[0];
const selectOptionMatches = fdcSelectHtml.match(/<option[^>]*>([^<]+)<\/option>/g) || [];
assert.strictEqual(selectOptionMatches.length, 3, `Select deve conter exatamente 3 options de FDC, encontrado: ${selectOptionMatches.length}`);

assert(!htmlContent.includes('data-fdc="4"'), 'HTML não deve conter data-fdc="4"');
assert(!htmlContent.includes('value="4"'), 'HTML não deve conter option value="4"');
assert(!/Formação Essencial Obrigatória/i.test(htmlContent), 'HTML não deve conter opção "Formação Essencial Obrigatória"');
console.log('[PASS] index.html contém estritamente 3 botões chips e 3 options no seletor, sem a 4ª opção "Geral".');

// -----------------------------------------------------------------------------
// ITEM 2: Alternância Exclusiva Robótica (ENG03003) vs Robótica A (ENG03026)
// -----------------------------------------------------------------------------
console.log('\n--- Teste 2: Alternância Exclusiva ENG03003 (ROBÓTICA) vs ENG03026 (ROBÓTICA A) ---');

const app = require('./app.js');
const engine = app.createEngine(curriculumJson, 1);

// 2.1 Metadados no modelo de dados
const rob = curriculumJson.disciplinas['ENG03003'];
const robA = curriculumJson.disciplinas['ENG03026'];
assert(rob, 'Disciplina ENG03003 (ROBÓTICA) deve existir no catálogo');
assert(robA, 'Disciplina ENG03026 (ROBÓTICA A) deve existir no catálogo');
assert.strictEqual(rob.alternativeOf, 'ENG03026', 'ENG03003 deve ter alternativeOf apontando para ENG03026');
assert.strictEqual(robA.alternativeOf, 'ENG03003', 'ENG03026 deve ter alternativeOf apontando para ENG03003');
console.log('[PASS] Vínculo de alternativeOf bidirecional configurado entre ENG03003 e ENG03026.');

// 2.2 Estado Padrão Inicial: nunca ambas simultaneamente obrigatórias
const typeRobInit = engine.getCourseTypeInFdc('ENG03003', 1);
const typeRobAInit = engine.getCourseTypeInFdc('ENG03026', 1);
const allocRobInit = engine.state.allocations['ENG03003'];
const allocRobAInit = engine.state.allocations['ENG03026'];

assert(!(typeRobInit === 'obrigatoria' && typeRobAInit === 'obrigatoria'),
  'ENG03003 e ENG03026 NUNCA devem ser simultaneamente obrigatórias por padrão');
assert.strictEqual(typeRobInit, 'eletiva', 'Por padrão, ENG03003 deve ser Eletiva');
assert.strictEqual(typeRobAInit, 'obrigatoria', 'Por padrão, ENG03026 deve ser Obrigatória');
assert.strictEqual(allocRobInit.semester, null, 'ENG03003 deve iniciar no Banco de Eletivas (semester: null)');
assert.strictEqual(allocRobAInit.semester, 5, 'ENG03026 deve iniciar alocada no 5º semestre');
console.log('[PASS] Estado Padrão: ENG03026 é Obrigatória (S5) e ENG03003 é Eletiva no Banco (null).');

// 2.3 Troca Dinâmica / Alternância: Promove Robótica para Obrigatória e converte Robótica A em Eletiva
console.log('Executando troca dinâmica: swapAlternative("ENG03003")...');
engine.swapAlternative('ENG03003');

const typeRobAfterSwap = engine.getCourseTypeInFdc('ENG03003', 1);
const typeRobAAfterSwap = engine.getCourseTypeInFdc('ENG03026', 1);
const allocRobAfterSwap = engine.state.allocations['ENG03003'];
const allocRobAAfterSwap = engine.state.allocations['ENG03026'];

assert.strictEqual(typeRobAfterSwap, 'obrigatoria', 'ENG03003 deve se tornar Obrigatória após alternância');
assert.strictEqual(typeRobAAfterSwap, 'eletiva', 'ENG03026 deve se tornar Eletiva após alternância');
assert.strictEqual(allocRobAfterSwap.semester, 5, 'ENG03003 deve ser alocada no 5º semestre');
assert.strictEqual(allocRobAAfterSwap.semester, null, 'ENG03026 deve ter sido movida para o Banco de Eletivas');
console.log('[PASS] Alternância bem-sucedida: ENG03003 virou Obrigatória (S5) e ENG03026 foi para o Banco como Eletiva.');

// 2.4 Troca Reversa: Alterna de volta para ENG03026
console.log('Executando troca reversa: swapAlternative("ENG03026")...');
engine.swapAlternative('ENG03026');

assert.strictEqual(engine.getCourseTypeInFdc('ENG03026', 1), 'obrigatoria');
assert.strictEqual(engine.getCourseTypeInFdc('ENG03003', 1), 'eletiva');
assert.strictEqual(engine.state.allocations['ENG03026'].semester, 5);
assert.strictEqual(engine.state.allocations['ENG03003'].semester, null);
console.log('[PASS] Reversão bem-sucedida: ENG03026 restaurada para Obrigatória e ENG03003 para Eletiva.');

// -----------------------------------------------------------------------------
// ITEM 3: Paleta de 10 Cores de Alto Contraste para Badges de Semestre
// -----------------------------------------------------------------------------
console.log('\n--- Teste 3: Paleta de 10 Cores de Alto Contraste para Badges de Semestre ---');

const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

// Extrai as variáveis ou regras das classes .stage-1 a .stage-10
const stageColors = {};
const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

for (let s = 1; s <= 10; s++) {
  // Procura pela variável --pastel-sem-s: #HEX;
  const varMatch = cssContent.match(new RegExp(`--pastel-sem-${s}:\\s*(#[0-9a-fA-F]{6})`, 'i'));
  assert(varMatch, `Variável CSS --pastel-sem-${s} deve existir`);
  stageColors[s] = varMatch[1].toUpperCase();

  // Verifica que a classe .stage-s existe no CSS
  assert(cssContent.includes(`.badge-orig-stage.stage-${s}`), `Classe .badge-orig-stage.stage-${s} deve existir no CSS`);
}

console.log('Cores extraídas para as 10 badges de semestre:');
for (let s = 1; s <= 10; s++) {
  console.log(`  ${s}º Sem: ${stageColors[s]}`);
}

const colorSet = new Set(Object.values(stageColors));
assert.strictEqual(colorSet.size, 10, `Todas as 10 classes CSS devem possuir códigos hexadecimais únicos e distintos! Encontradas ${colorSet.size} únicas.`);
console.log('[PASS] 100% das 10 classes CSS de semestre possuem códigos hexadecimais únicos e distintos.');

console.log('\n================================================================================');
console.log(' TODOS OS TESTES DA ETAPA 3 FORAM APROVADOS COM SUCESSO! (100% PASS)');
console.log('================================================================================');
