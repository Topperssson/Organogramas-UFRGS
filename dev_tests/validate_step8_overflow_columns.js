/**
 * validate_step8_overflow_columns.js
 * 
 * Suíte de Testes Automatizada para Validação da Criação Dinâmica de Mais de 20 Semestres
 * e Preservação dos Alertas Vermelhos (20+).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================================');
console.log(' SUÍTE DE TESTES: CRIAÇÃO DINÂMICA DE SEMESTRES 20+ & BUFFER EXPANSÍVEL (STEP 8)');
console.log('================================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

(async () => {
  const curriculumPath = path.join(__dirname, 'curriculum_data.json');
  const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));
  const app = require('./app.js');

  console.log('---------------------------------------------------------------------------');
  console.log(' SEÇÃO 1: ESTILIZAÇÃO CSS DE COLUNAS COM OVERFLOW (> 20)');
  console.log('---------------------------------------------------------------------------');

  runTest('1.1 - CSS define classe .semester-column.column-overflow com borda vermelha', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('.semester-column.column-overflow'), 'styles.css deve conter .semester-column.column-overflow');
    assert(css.includes('239, 68, 68'), 'styles.css deve utilizar cor vermelha (rgba(239, 68, 68...)) para overflow');
    assert(css.includes('dashed'), 'Borda de overflow deve ter estilo dashed');
  });

  runTest('1.2 - CSS preserva .course-card.card-overflow e .badge-overflow', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('.course-card.card-overflow'), 'styles.css deve preservar .course-card.card-overflow');
    assert(css.includes('.badge-overflow'), 'styles.css deve preservar .badge-overflow');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 2: MOTOR DE REGRAS E EXPANSÃO DINÂMICA DE COLUNAS (createEngine)');
  console.log('---------------------------------------------------------------------------');

  runTest('2.1 - Invariante S_max + 1 para semestres além de 20 (S_max = 21 -> 22 colunas)', () => {
    const engine = app.createEngine(curriculum, 2);
    engine.state.allocations['ENG10001'].semester = 21;
    const visCols = engine.getVisibleColumnsCount();
    assert.strictEqual(visCols, 22, `getVisibleColumnsCount() deve retornar 22 quando S_max = 21 (retornou ${visCols})`);
  });

  runTest('2.2 - Expansão para múltiplos semestres de overflow (S_max = 25 -> 26 colunas)', () => {
    const engine = app.createEngine(curriculum, 2);
    engine.state.allocations['ENG10001'].semester = 25;
    const visCols = engine.getVisibleColumnsCount();
    assert.strictEqual(visCols, 26, `getVisibleColumnsCount() deve retornar 26 quando S_max = 25 (retornou ${visCols})`);
  });

  runTest('2.3 - Contração dinâmica: retorno de matérias abaixo de 20 contrai o grid', () => {
    const engine = app.createEngine(curriculum, 2);
    engine.state.allocations['ENG10001'].semester = 25;
    assert.strictEqual(engine.getVisibleColumnsCount(), 26);
    engine.state.allocations['ENG10001'].semester = 10;
    // Sem nenhuma disciplina acima de 10, o teto passa a ser 11
    assert.strictEqual(engine.getVisibleColumnsCount(), 11, 'Deve contrair para 11 (10 + 1)');
  });

  runTest('2.4 - Nomenclatura contínua do ciclo letivo além de 20 (applyCycle)', () => {
    const engine = app.createEngine(curriculum, 2);
    engine.applyCycle(2024, 1);
    // 2024/1 = S1, 2024/2 = S2, 2025/1 = S3, ...
    // S21 = 2024 + Math.floor((21-1)/2) = 2024 + 10 = 2034/1
    // S22 = 2034/2
    assert.strictEqual(engine.state.columnNames[21], '2034/1', `Semestre 21 deve ser 2034/1 (obteve ${engine.state.columnNames[21]})`);
    assert.strictEqual(engine.state.columnNames[22], '2034/2', `Semestre 22 deve ser 2034/2 (obteve ${engine.state.columnNames[22]})`);
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 3: RENDERIZAÇÃO DOM E ALOCAÇÃO ISOLADA POR SEMESTRE (Simulação DOM)');
  console.log('---------------------------------------------------------------------------');

  runTest('3.1 - Cards em semestres 21 e 22 alocados em seus próprios containers data-semester', () => {
    // Configura mock de DOM para o simulador
    const createdElements = [];
    const appendedChildren = {};

    global.document = {
      createElement: (tag) => {
        const el = {
          tagName: tag,
          className: '',
          classList: {
            classes: new Set(),
            add(c) { this.classes.add(c); el.className = Array.from(this.classes).join(' '); },
            remove(c) { this.classes.delete(c); el.className = Array.from(this.classes).join(' '); },
            contains(c) { return this.classes.has(c); },
            toggle(c, v) { if (v) this.add(c); else this.remove(c); }
          },
          dataset: {},
          style: {},
          innerHTML: '',
          children: [],
          appendChild(ch) {
            this.children.push(ch);
            return ch;
          },
          setAttribute: (k, v) => { el[k] = v; },
          removeAttribute: (k) => { delete el[k]; },
          querySelector(sel) {
            if (sel.includes('.cards-container')) {
              const m = sel.match(/data-semester="(\d+)"/);
              if (m) {
                const s = m[1];
                if (!appendedChildren[s]) {
                  appendedChildren[s] = {
                    dataset: { semester: s },
                    className: 'cards-container',
                    children: [],
                    appendChild(c) { this.children.push(c); return c; }
                  };
                }
                return appendedChildren[s];
              }
            }
            return { addEventListener: () => {}, querySelector: () => null };
          },
          querySelectorAll(sel) {
            return [];
          },
          addEventListener: () => {}
        };
        createdElements.push(el);
        return el;
      },
      getElementById: (id) => ({ textContent: '' }),
      querySelectorAll: (sel) => []
    };

    app.state.courses = curriculum.disciplinas;
    // Aloca CCA99004 em sem 21 e CCA99002 em sem 22
    app.state.allocations['CCA99004'] = { semester: 21, completed: false, hasOverflow: true };
    app.state.allocations['CCA99002'] = { semester: 22, completed: false, hasOverflow: true };

    const gridChildren = [];
    app.dom.grid = {
      children: gridChildren,
      appendChild(c) { gridChildren.push(c); return c; },
      querySelectorAll(sel) {
        if (sel === '.cards-container') return Object.values(appendedChildren);
        if (sel === '.semester-column') return gridChildren;
        return [];
      },
      querySelector(sel) {
        if (sel.includes('.cards-container')) {
          const m = sel.match(/data-semester="(\d+)"/);
          if (m) {
            const s = m[1];
            if (!appendedChildren[s]) {
              appendedChildren[s] = {
                dataset: { semester: s },
                className: 'cards-container',
                children: [],
                appendChild(c) { this.children.push(c); return c; }
              };
            }
            return appendedChildren[s];
          }
        }
        return null;
      }
    };

    app.dom.drawerCardsList = { innerHTML: '', appendChild: () => {} };
    app.dom.drawerCount = { textContent: '' };

    app.renderAllCards();

    // Valida que CCA99004 foi para o container 21 (NÃO 20)
    assert(appendedChildren['21'], 'Deve existir container para semestre 21');
    const c21Codes = appendedChildren['21'].children.map(c => c.dataset?.code);
    assert(c21Codes.includes('CCA99004'), `CCA99004 deve estar no container 21 (está em ${JSON.stringify(c21Codes)})`);

    // Valida que CCA99002 foi para o container 22 (NÃO 20)
    assert(appendedChildren['22'], 'Deve existir container para semestre 22');
    const c22Codes = appendedChildren['22'].children.map(c => c.dataset?.code);
    assert(c22Codes.includes('CCA99002'), `CCA99002 deve estar no container 22 (está em ${JSON.stringify(c22Codes)})`);

    delete global.document;
  });

  runTest('3.2 - Cards com semestre > 20 mantêm classe .card-overflow e badge 20+', () => {
    global.document = {
      createElement: () => {
        const classes = [];
        return {
          className: '',
          classList: {
            add(c) { classes.push(c); },
            contains(c) { return classes.includes(c); }
          },
          dataset: {},
          innerHTML: '',
          addEventListener: () => {},
          setAttribute: () => {},
          removeAttribute: () => {},
          querySelector: () => null,
          querySelectorAll: () => []
        };
      }
    };
    const cardEl = app.createCardElement('CCA99004', curriculum.disciplinas['CCA99004'] || { nome: 'TCC 1', creditos: 6 }, { semester: 21, completed: false, hasOverflow: true });
    assert(cardEl.classList.contains('card-overflow'), 'Card no semestre 21 deve possuir classe card-overflow');
    assert(cardEl.innerHTML.includes('badge-overflow'), 'Card no semestre 21 deve conter badge-overflow');
    assert(cardEl.innerHTML.includes('(20+)'), 'Badge deve conter o texto indicador (20+)');
    delete global.document;
  });

  console.log('\n================================================================================');
  console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  if (passedTests === totalTests) {
    console.log(' SUCESSO TOTAL: SEMESTRES 20+ DESBLOQUEADOS E ALOCAÇÃO DINÂMICA 100% OPERACIONAL!');
    console.log(' (1) Colunas geradas dinamicamente além do limite de 20 (S_max + 1)');
    console.log(' (2) Disciplinas alocadas em suas colunas exatas (data-semester="21", "22", ...)');
    console.log(' (3) Buffer vazio dinâmico garantido para permitir drag & drop subsequente');
    console.log(' (4) Alerta e realce vermelho (20+) preservado nos cards e cabeçalhos');
    console.log(' (5) Contração automática ao retornar disciplinas para semestres padrão');
  } else {
    console.log(' ATENÇÃO: ALGUNS TESTES FALHARAM');
    process.exit(1);
  }
  console.log('================================================================================\n');
})();
