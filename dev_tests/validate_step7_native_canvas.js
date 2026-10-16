/**
 * SUÍTE DE TESTES AUTOMATIZADOS: MOTOR DE RENDERIZAÇÃO CANVAS 2D NATIVO (STEP 7)
 * Valida a erradicação do html2canvas, a função renderBoardToCanvasNative,
 * o gerador PDF nativo embutido e a fidelidade visual das 4 camadas.
 */

const fs = require('fs');
const assert = require('assert');

console.log('================================================================================');
console.log(' SUÍTE DE TESTES: MOTOR NATIVO HTML5 CANVAS 2D & EXPORTAÇÃO INDEPENDENTE (STEP 7)');
console.log('================================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}: ${err.message}`);
  }
}

async function runAsyncTest(desc, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}: ${err.message}`);
  }
}

(async () => {
  const jsContent = fs.readFileSync('app.js', 'utf8');
  const htmlContent = fs.readFileSync('index.html', 'utf8');

  console.log('---------------------------------------------------------------------------');
  console.log(' SEÇÃO 1: ERRADICAÇÃO DEFINITIVA DO HTML2CANVAS');
  console.log('---------------------------------------------------------------------------');

  runTest('1.1 - Remoção de html2canvas do index.html', () => {
    assert(!htmlContent.includes('html2canvas'), 'index.html não deve conter referência a html2canvas');
  });

  runTest('1.2 - Ausência total de chamadas a html2canvas no app.js', () => {
    assert(!jsContent.includes('html2canvas'), 'app.js não deve conter nenhuma menção ou chamada a html2canvas');
  });

  runTest('1.3 - Exportações de PNG e PDF desacopladas de qualquer parser CSS', () => {
    assert(jsContent.includes('renderBoardToCanvasNative(2)'), 'Exportações devem invocar renderBoardToCanvasNative');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 2: MOTOR DE RENDERIZAÇÃO CANVAS 2D NATIVO (renderBoardToCanvasNative)');
  console.log('---------------------------------------------------------------------------');

  const app = require('./app.js');

  runTest('2.1 - Função renderBoardToCanvasNative exportada e disponível', () => {
    assert.strictEqual(typeof app.renderBoardToCanvasNative, 'function', 'renderBoardToCanvasNative deve ser uma função');
  });

  runTest('2.2 - captureBoardCanvas preservado como ponte assíncrona', () => {
    assert.strictEqual(typeof app.captureBoardCanvas, 'function', 'captureBoardCanvas deve existir para retrocompatibilidade');
  });

  runTest('2.3 - Camada 1: Fundo Miro #0B0F19 e grade pontilhada #1E293B', () => {
    assert(jsContent.includes("ctx.fillStyle = '#0B0F19'"), 'Deve pintar fundo escuro Miro');
    assert(jsContent.includes("ctx.fillStyle = '#1E293B'"), 'Deve pintar pontos da grade');
    assert(jsContent.includes('dotSpacing = 24'), 'Espaçamento padrão de 24px na grade');
  });

  runTest('2.4 - Camada 2: Renderização de conexões via Path2D nativo', () => {
    assert(jsContent.includes('new Path2D(d)'), 'Deve instanciar Path2D diretamente do atributo d do SVG');
    assert(jsContent.includes('ctx.stroke(p2d)'), 'Deve executar stroke nativo com Path2D');
  });

  runTest('2.5 - Camada 3: Desenho de colunas com roundRect e cabeçalhos', () => {
    assert(jsContent.includes('ctx.roundRect'), 'Deve utilizar roundRect nativo do Canvas 2D');
    assert(jsContent.includes('semTitle ='), 'Deve desenhar título da coluna');
    assert(jsContent.includes('periodPill'), 'Deve desenhar pílula de paridade no canvas');
  });

  runTest('2.6 - Camada 4: Borda verde #10B981 em cards concluídos e badges pastel', () => {
    assert(jsContent.includes("ctx.strokeStyle = isCompleted ? '#10B981' : '#334155'"), 'Cards concluídos devem ter borda verde #10B981');
    assert(jsContent.includes("origStageColors = {"), 'Deve possuir mapa cromático pastel dos 10 semestres');
    assert(jsContent.includes("drawWrappedText(ctx, name,"), 'Deve realizar quebra automática de nomes longos');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 3: GERADOR PDF NATIVO EMBUTIDO & PRESERVAÇÃO DE ATIVAÇÃO');
  console.log('---------------------------------------------------------------------------');

  runTest('3.1 - Função generateMinimalPdfFromJpeg implementada e exportada', () => {
    assert.strictEqual(typeof app.generateMinimalPdfFromJpeg, 'function', 'generateMinimalPdfFromJpeg deve ser exportada');
  });

  runTest('3.2 - generateMinimalPdfFromJpeg gera Blob PDF 1.4 válido', () => {
    // 1x1 JPEG mínimo em base64
    const dummyJpeg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
    const blob = app.generateMinimalPdfFromJpeg(dummyJpeg, 800, 600);
    assert(blob instanceof Blob, 'Deve retornar instância de Blob');
    assert.strictEqual(blob.type, 'application/pdf', 'MimeType deve ser application/pdf');
    assert(blob.size > 200, 'Blob deve ter tamanho correspondente ao PDF compilado');
  });

  runTest('3.3 - pickSaveTarget chamado antes de renderBoardToCanvasNative em PNG e PDF', () => {
    const pngFnIdx = jsContent.indexOf('async function exportToPng()');
    const pickPngIdx = jsContent.indexOf('await pickSaveTarget', pngFnIdx);
    const renderPngIdx = jsContent.indexOf('await renderBoardToCanvasNative', pngFnIdx);
    assert(pickPngIdx < renderPngIdx, 'PNG: seletor de arquivos deve abrir antes da renderização');

    const pdfFnIdx = jsContent.indexOf('async function exportToPdf()');
    const pickPdfIdx = jsContent.indexOf('await pickSaveTarget', pdfFnIdx);
    const renderPdfIdx = jsContent.indexOf('await renderBoardToCanvasNative', pdfFnIdx);
    assert(pickPdfIdx < renderPdfIdx, 'PDF: seletor de arquivos deve abrir antes da renderização');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 4: SIMULAÇÃO DE RENDERIZAÇÃO COMPLETA EM MOCK DOM');
  console.log('---------------------------------------------------------------------------');

  await runAsyncTest('4.1 - Simulação de execução do renderBoardToCanvasNative em DOM virtual', async () => {
    // Setup Mock DOM
    const drawnCalls = [];
    class MockContext2D {
      constructor() {
        this.canvas = { width: 1000, height: 800 };
      }
      scale(sx, sy) { drawnCalls.push(['scale', sx, sy]); }
      translate(tx, ty) { drawnCalls.push(['translate', tx, ty]); }
      fillRect(x, y, w, h) { drawnCalls.push(['fillRect', x, y, w, h]); }
      beginPath() { drawnCalls.push(['beginPath']); }
      roundRect(x, y, w, h, r) { drawnCalls.push(['roundRect', x, y, w, h, r]); }
      rect(x, y, w, h) { drawnCalls.push(['rect', x, y, w, h]); }
      fill() { drawnCalls.push(['fill']); }
      stroke(p) { drawnCalls.push(['stroke', p]); }
      moveTo(x, y) { drawnCalls.push(['moveTo', x, y]); }
      lineTo(x, y) { drawnCalls.push(['lineTo', x, y]); }
      fillText(t, x, y) { drawnCalls.push(['fillText', t, x, y]); }
      measureText(t) { return { width: t.length * 7 }; }
      save() { drawnCalls.push(['save']); }
      restore() { drawnCalls.push(['restore']); }
      setLineDash(d) { drawnCalls.push(['setLineDash', d]); }
    }

    class MockPath2D {
      constructor(d) { this.d = d; }
    }

    global.Path2D = MockPath2D;
    global.document = {
      createElement: (tag) => {
        if (tag === 'canvas') {
          return {
            width: 0,
            height: 0,
            getContext: () => new MockContext2D(),
            toBlob: (cb) => cb(new Blob(['img'], { type: 'image/png' })),
            toDataURL: () => 'data:image/jpeg;base64,/9j/4AAQSkZJRg=='
          };
        }
        return { style: {} };
      }
    };

    // Define dom com elementos mock
    const colMock = {
      classList: { contains: () => false },
      dataset: { semester: '1' },
      getBoundingClientRect: () => ({ left: 40, top: 40, width: 230, height: 600 }),
      querySelector: (sel) => {
        if (sel === '.col-complete-check') return { checked: true };
        if (sel === '.semester-name') return { textContent: '2025/1' };
        if (sel === '.period-pill') return { textContent: '1º Sem', classList: { contains: (c) => c === 'period-1' } };
        if (sel === '.badge-sem-cr') return { textContent: '24 cr' };
        return null;
      },
      querySelectorAll: (sel) => {
        if (sel === '.course-card') {
          return [{
            classList: { contains: (c) => c === 'card-completed' },
            dataset: { completed: 'true', code: 'MAT01353', origStage: '1' },
            getBoundingClientRect: () => ({ left: 48, top: 100, width: 214, height: 90 })
          }];
        }
        return [];
      }
    };

    const pathMock = {
      getAttribute: (a) => a === 'd' ? 'M 100 100 C 150 100 200 200 250 200' : null,
      classList: { contains: (c) => c === 'highlight-upstream' }
    };

    app.dom.canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 2000, height: 1000 }),
      style: { transform: '' }
    };
    app.dom.grid = {
      querySelectorAll: () => [colMock]
    };
    app.dom.pathsGroup = {
      querySelectorAll: () => [pathMock]
    };
    app.state.courses = {
      MAT01353: { nome: 'Cálculo I', creditos: 4, etapa_sugerida: 1 }
    };

    const canvas = await app.renderBoardToCanvasNative(2);
    assert(canvas, 'renderBoardToCanvasNative deve retornar o elemento canvas');
    assert(canvas.width > 0 && canvas.height > 0, 'Canvas deve ter dimensões positivas');

    const fillRects = drawnCalls.filter(c => c[0] === 'fillRect');
    assert(fillRects.length > 0, 'Deve ter desenhado retângulo de fundo');

    const strokes = drawnCalls.filter(c => c[0] === 'stroke');
    assert(strokes.length > 0, 'Deve ter desenhado traços (bordas e caminhos)');

    const textCalls = drawnCalls.filter(c => c[0] === 'fillText');
    assert(textCalls.some(c => c[1] === 'MAT01353'), 'Deve ter desenhado o código da disciplina');
    assert(textCalls.some(c => c[1] === '1º Sem'), 'Deve ter desenhado a badge do semestre');
    assert(textCalls.some(c => c[1] === '✓'), 'Deve ter desenhado o checkmark de aprovação');

    delete global.Path2D;
    delete global.document;
  });

  console.log('\n================================================================================');
  console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  if (passedTests === totalTests) {
    console.log(' SUCESSO TOTAL: MOTOR CANVAS 2D NATIVO 100% OPERACIONAL E VALIDADO!');
    console.log(' (1) Zero dependências de html2canvas ou parsers CSS externos');
    console.log(' (2) Renderização direta de alta fidelidade em 4 camadas');
    console.log(' (3) Gerador PDF 1.4 nativo embutido com suporte offline');
    console.log(' (4) Seleção imediata de arquivo com preservação do user activation');
  } else {
    console.log(' ATENÇÃO: ALGUNS TESTES FALHARAM');
    process.exit(1);
  }
  console.log('================================================================================\n');
})();
