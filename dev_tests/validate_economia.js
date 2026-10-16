const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('🧪 SUITE DE VALIDAÇÃO: CIÊNCIAS ECONÔMICAS UFRGS');
console.log('====================================================\n');

let failedTests = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

const distDir = path.resolve(__dirname, '../dist/ciencias-economicas');

// ----------------------------------------------------
// TESTE 1: Arquivos estritamente standalone na pasta dist/
// ----------------------------------------------------
console.log('1. Verificação de Isolamento e Conteúdo de dist/ciencias-economicas/:');
const allowedFiles = new Set(['app.js', 'curriculum_data.js', 'curriculum_data.json', 'index.html', 'styles.css']);
const currentFiles = fs.readdirSync(distDir);
assert(currentFiles.length === 5, `Exatamente 5 arquivos esperados (encontrados: ${currentFiles.length})`);
currentFiles.forEach(f => {
  assert(allowedFiles.has(f), `Arquivo permitido standalone: ${f}`);
});

// ----------------------------------------------------
// TESTE 2: Verificação de Sintaxe JS (node --check)
// ----------------------------------------------------
console.log('\n2. Verificação de Sintaxe JavaScript (node --check):');
['app.js', 'curriculum_data.js'].forEach(file => {
  const filePath = path.join(distDir, file);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    assert(true, `Sintaxe JS válida sem erros: ${file}`);
  } catch (err) {
    assert(false, `Erro de sintaxe em ${file}: ${err.message}`);
  }
});

// ----------------------------------------------------
// TESTE 3: Presença das Duas Matrizes e Metas Oficiais
// ----------------------------------------------------
console.log('\n3. Presença das Duas Matrizes (Diurno e Noturno) em curriculum_data.js & .json:');
const currModule = require(path.join(distDir, 'curriculum_data.js'));
const curricula = currModule.ECONOMIA_CURRICULA;

assert(Boolean(curricula), 'Objeto unificado ECONOMIA_CURRICULA exportado');
assert(Boolean(curricula && curricula.diurno), 'Matriz Diurno presente');
assert(Boolean(curricula && curricula.noturno), 'Matriz Noturno presente');

const diurno = curricula.diurno;
const noturno = curricula.noturno;

assert(diurno.label === 'Ciências Econômicas (Diurno)', 'Label Diurno correto');
assert(noturno.label === 'Ciências Econômicas (Noturno)', 'Label Noturno correto');
assert(diurno.totalMandatoryCredits === 128, `Metas Diurno: 128 cr obrigatórios (obtido: ${diurno.totalMandatoryCredits})`);
assert(noturno.totalMandatoryCredits === 128, `Metas Noturno: 128 cr obrigatórios (obtido: ${noturno.totalMandatoryCredits})`);
assert(diurno.totalElectiveCredits === 44, `Metas Diurno: 44 cr eletivos (obtido: ${diurno.totalElectiveCredits})`);
assert(noturno.totalElectiveCredits === 44, `Metas Noturno: 44 cr eletivos (obtido: ${noturno.totalElectiveCredits})`);
assert(diurno.totalTargetCredits === 172, `Total de Formação Diurno: 172 cr`);
assert(noturno.totalTargetCredits === 172, `Total de Formação Noturno: 172 cr`);

// ----------------------------------------------------
// TESTE 4: Integridade Referencial de 100% dos Pré-Requisitos
// ----------------------------------------------------
console.log('\n4. Integridade Referencial de Pré-Requisitos:');
function verifyPrereqs(shiftCurric, shiftName) {
  const courses = shiftCurric.disciplinas;
  const courseKeys = new Set(Object.keys(courses));
  let brokenPrereqs = 0;

  for (const [code, c] of Object.entries(courses)) {
    const prereqs = c.prerequisitos || [];
    prereqs.forEach(p => {
      if (!courseKeys.has(p)) {
        console.error(`    Pré-requisito ausente no turno ${shiftName}: ${code} depende de ${p}`);
        brokenPrereqs++;
      }
    });
  }

  assert(brokenPrereqs === 0, `100% dos pré-requisitos válidos no catálogo de ${shiftName} (${courseKeys.size} disciplinas)`);
}

verifyPrereqs(diurno, 'Diurno');
verifyPrereqs(noturno, 'Noturno');

// ----------------------------------------------------
// TESTE 5: Validação do Grafo DAG (Semestres A < B)
// ----------------------------------------------------
console.log('\n5. Validação de Dependência Topológica do Grafo DAG:');
function verifyDagTopology(shiftCurric, shiftName) {
  const courses = shiftCurric.disciplinas;
  let topologicalViolations = 0;

  for (const [code, c] of Object.entries(courses)) {
    if (c.tipo === 'obrigatoria' && typeof c.etapa_sugerida === 'number' && c.etapa_sugerida > 0) {
      const semB = c.etapa_sugerida;
      (c.prerequisitos || []).forEach(pCode => {
        const p = courses[pCode];
        if (p && p.tipo === 'obrigatoria' && typeof p.etapa_sugerida === 'number' && p.etapa_sugerida > 0) {
          const semA = p.etapa_sugerida;
          if (semB <= semA) {
            console.error(`    Violação DAG em ${shiftName}: ${code} (Sem ${semB}) <= pré-requisito ${pCode} (Sem ${semA})`);
            topologicalViolations++;
          }
        }
      });
    }
  }

  assert(topologicalViolations === 0, `Zero violações topológicas de precedência no turno ${shiftName}`);
}

verifyDagTopology(diurno, 'Diurno');
verifyDagTopology(noturno, 'Noturno');

// ----------------------------------------------------
// TESTE 6: Alternância de Turno e Isolamento de LocalStorage
// ----------------------------------------------------
console.log('\n6. Teste de Alternância de Turno e Chaves de LocalStorage:');
// Mock browser environment for app.js headless test
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => (k in mockLocalStorage ? mockLocalStorage[k] : null),
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; },
  clear: () => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }
};
global.ECONOMIA_CURRICULA = curricula;
global.CURRICULUM_DATA = diurno;
global.window = {
  ECONOMIA_CURRICULA: curricula,
  CURRICULUM_DATA: diurno,
  addEventListener: () => {}
};
global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => []
};
global.requestAnimationFrame = (cb) => cb();

const appModule = require(path.join(distDir, 'app.js'));

assert(typeof appModule.getShiftStorageKey === 'function', 'Função getShiftStorageKey exportada');
assert(typeof appModule.switchShift === 'function', 'Função switchShift exportada');
assert(typeof appModule.applyCurriculumShift === 'function', 'Função applyCurriculumShift exportada');

assert(appModule.getShiftStorageKey('diurno') === 'trajetoria_economia_diurno_ufrgs_v1', 'Chave Diurno correta: trajetoria_economia_diurno_ufrgs_v1');
assert(appModule.getShiftStorageKey('noturno') === 'trajetoria_economia_noturno_ufrgs_v1', 'Chave Noturno correta: trajetoria_economia_noturno_ufrgs_v1');

// Test switching
appModule.switchShift('diurno');
assert(appModule.state.activeShift === 'diurno', 'Estado ativo inicial: diurno');
assert(appModule.state.curriculum.shift === 'diurno', 'Curriculum ativo é diurno');

appModule.switchShift('noturno');
assert(appModule.state.activeShift === 'noturno', 'Estado comutado para noturno');
assert(appModule.state.curriculum.shift === 'noturno', 'Curriculum comutado para noturno');
assert(mockLocalStorage['trajetoria_economia_active_shift'] === 'noturno', 'Último turno ativo salvo no localStorage');

// ----------------------------------------------------
// TESTE 7: Verificação do Menu no Cabeçalho HTML
// ----------------------------------------------------
console.log('\n7. Verificação dos Elementos Visuais no index.html:');
const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

assert(htmlContent.includes('id="shift-select"'), 'Seletor #shift-select presente no DOM');
assert(htmlContent.includes('☀️ Ciências Econômicas • Diurno'), 'Opção Diurno no cabeçalho');
assert(htmlContent.includes('🌙 Ciências Econômicas • Noturno'), 'Opção Noturno no cabeçalho');
assert(htmlContent.includes('<h1>Trajetória Economia <span class="badge-ufrgs">UFRGS</span></h1>'), 'Título Trajetória Economia com badge UFRGS preservado');
assert(htmlContent.includes('id="stat-obrig-target">128</span>'), 'Meta obrigatória de 128 créditos no HTML');
assert(htmlContent.includes('id="stat-ele-target">44</span>'), 'Meta eletiva de 44 créditos no HTML');
assert(htmlContent.includes('id="stat-target-credits">172</span>'), 'Meta total de 172 créditos no HTML');

// ----------------------------------------------------
// TESTE 8: Verificação dos Estilos no styles.css
// ----------------------------------------------------
console.log('\n8. Verificação dos Estilos no styles.css:');
const cssContent = fs.readFileSync(path.join(distDir, 'styles.css'), 'utf8');
assert(cssContent.includes('.shift-selector-wrapper'), 'Classe .shift-selector-wrapper definida no CSS');
assert(cssContent.includes('.shift-select'), 'Classe .shift-select definida no CSS');
assert(cssContent.includes('#161F30'), 'Cor de fundo dark #161F30 aplicada');

// ----------------------------------------------------
// TESTE 9: Exportação e Importação Contextualizada por Turno
// ----------------------------------------------------
console.log('\n9. Teste de Exportação e Importação JSON Contextualizada:');
appModule.switchShift('diurno');
const exportedDiurno = JSON.parse(appModule.exportStateToJson());
assert(exportedDiurno.shift === 'diurno', 'JSON exportado contém campo shift: "diurno"');

appModule.switchShift('noturno');
const exportedNoturno = JSON.parse(appModule.exportStateToJson());
assert(exportedNoturno.shift === 'noturno', 'JSON exportado contém campo shift: "noturno"');

// Import JSON of Diurno while active is Noturno -> should switch back to Diurno
appModule.importStateFromJson(JSON.stringify(exportedDiurno));
assert(appModule.state.activeShift === 'diurno', 'Importação de JSON do Diurno comutou turno ativo para diurno automaticamente');

console.log('\n----------------------------------------------------');
if (failedTests === 0) {
  console.log('🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
} else {
  console.error(`🚨 ${failedTests} TESTE(S) FALHARAM!`);
  process.exit(1);
}
console.log('----------------------------------------------------');
