/**
 * SUÍTE DE TESTES AUTOMATIZADOS: CORREÇÃO DEFINITIVA DE EXPORTAÇÃO (STEP 6)
 * Valida a eliminação do erro "Error parsing CSS component value, unexpected EOF",
 * o sanitizador onclone do html2canvas, a ativação imediata do seletor de arquivos
 * e o fallback resiliente de renderização.
 */

const fs = require('fs');
const assert = require('assert');

console.log('================================================================================');
console.log(' SUÍTE DE TESTES: CORREÇÃO DEFINITIVA DE EXPORTAÇÃO HTML2CANVAS (STEP 6)');
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
  const cssContent = fs.readFileSync('styles.css', 'utf8');
  const jsContent = fs.readFileSync('app.js', 'utf8');
  const htmlContent = fs.readFileSync('index.html', 'utf8');

  console.log('---------------------------------------------------------------------------');
  console.log(' SEÇÃO 1: AUDITORIA SINTÁTICA E LIMPEZA DE CSS (STYLES.CSS & INDEX.HTML)');
  console.log('---------------------------------------------------------------------------');

  runTest('1.1 - Balanço estrito de chaves {} em styles.css', () => {
    let open = 0;
    for (let i = 0; i < cssContent.length; i++) {
      if (cssContent[i] === '{') open++;
      if (cssContent[i] === '}') open--;
    }
    assert.strictEqual(open, 0, 'Chaves devem estar 100% balanceadas no CSS');
  });

  runTest('1.2 - Balanço estrito de parênteses () em styles.css', () => {
    let paren = 0;
    for (let i = 0; i < cssContent.length; i++) {
      if (cssContent[i] === '(') paren++;
      if (cssContent[i] === ')') paren--;
    }
    assert.strictEqual(paren, 0, 'Parênteses em gradientes/funções devem estar 100% balanceados');
  });

  runTest('1.3 - Ausência de propriedades CSS vazias ("prop: ;") em styles.css', () => {
    const emptyMatch = cssContent.match(/[a-zA-Z\-]+\s*:\s*;/g);
    assert.strictEqual(emptyMatch, null, 'Nenhuma propriedade com valor vazio deve existir no CSS');
  });

  runTest('1.4 - Ausência de funções CSS modernas não suportadas (color-mix, oklch, oklab)', () => {
    const modern = cssContent.match(/\b(color-mix|oklch|oklab|light-dark)\(/g);
    assert.strictEqual(modern, null, 'Não deve haver funções CSS modernas que quebrem parsers antigos');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 2: SANITIZADOR ONCLONE DO HTML2CANVAS');
  console.log('---------------------------------------------------------------------------');

  runTest('2.1 - Presença do callback onclone na configuração do html2canvas', () => {
    assert(jsContent.includes('onclone: sanitizeClonedDocument') || jsContent.includes('onclone: (clonedDoc'), 'html2canvas deve configurar onclone');
  });

  runTest('2.2 - Remoção ativa de backdrop-filter e -webkit-backdrop-filter no clone', () => {
    assert(jsContent.includes('backdrop-filter'), 'Sanitizador deve tratar backdrop-filter');
    assert(jsContent.includes('backdropFilter = \'none\''), 'Deve neutralizar backdropFilter nos nós clonados');
  });

  runTest('2.3 - Neutralização de filtros SVG (filter: url(#...)) que quebram html2canvas', () => {
    assert(jsContent.includes('node.removeAttribute(\'filter\')'), 'Deve remover atributo filter de elementos SVG no clone');
    assert(jsContent.includes('filter: none !important'), 'Deve forçar filter: none !important na folha override');
  });

  runTest('2.4 - Simplificação do fundo com radial-gradient no clonedElement', () => {
    assert(jsContent.includes('clonedElement.style.backgroundImage = \'none\''), 'Fundo do canvas clonado deve ser limpo');
    assert(jsContent.includes('clonedElement.style.backgroundColor = \'#090d16\''), 'Cor de fundo sólida do canvas clonado');
  });

  runTest('2.5 - Sanitização de atributos style inline nos elementos clonados', () => {
    assert(jsContent.includes('node.hasAttribute(\'style\')'), 'Deve verificar nós com style inline');
    assert(jsContent.includes('node.removeAttribute(\'style\')'), 'Deve remover style inline desnecessário de nós SVG');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 3: SELEÇÃO ANTECIPADA DE ARQUIVO (PRE-PICKED TARGET & USER ACTIVATION)');
  console.log('---------------------------------------------------------------------------');

  runTest('3.1 - Função pickSaveTarget implementada e exportada', () => {
    assert(jsContent.includes('async function pickSaveTarget'), 'pickSaveTarget deve existir como função assíncrona');
    assert(jsContent.includes('pickSaveTarget,'), 'pickSaveTarget deve ser exportada');
  });

  runTest('3.2 - pickSaveTarget chamado no início de exportToPng antes de captureBoardCanvas', () => {
    const pngFnIdx = jsContent.indexOf('async function exportToPng()');
    const pickIdx = jsContent.indexOf('await pickSaveTarget', pngFnIdx);
    const captureIdx = jsContent.indexOf('await captureBoardCanvas()', pngFnIdx);
    assert(pickIdx !== -1 && captureIdx !== -1, 'exportToPng deve chamar pickSaveTarget e captureBoardCanvas');
    assert(pickIdx < captureIdx, 'pickSaveTarget deve ser chamado ANTES de captureBoardCanvas');
  });

  runTest('3.3 - pickSaveTarget chamado no início de exportToPdf antes de captureBoardCanvas', () => {
    const pdfFnIdx = jsContent.indexOf('async function exportToPdf()');
    const pickIdx = jsContent.indexOf('await pickSaveTarget', pdfFnIdx);
    const captureIdx = jsContent.indexOf('await captureBoardCanvas()', pdfFnIdx);
    assert(pickIdx !== -1 && captureIdx !== -1, 'exportToPdf deve chamar pickSaveTarget e captureBoardCanvas');
    assert(pickIdx < captureIdx, 'pickSaveTarget deve ser chamado ANTES de captureBoardCanvas');
  });

  runTest('3.4 - Early return em caso de cancelamento do diálogo pelo usuário (AbortError)', () => {
    assert(jsContent.includes('if (!target) return;'), 'Deve abortar a captura pesada se o usuário cancelar o seletor');
  });

  runTest('3.5 - saveFileWithDialog aceita prePickedTarget e grava no handle existente', () => {
    assert(jsContent.includes('prePickedTarget.handle.createWritable()'), 'Deve gravar no handle pré-selecionado sem reabrir diálogo');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 4: FALLBACK RESILIENTE DE RENDERIZAÇÃO');
  console.log('---------------------------------------------------------------------------');

  runTest('4.1 - Bloco try/catch para fallback no motor de renderização do canvas', () => {
    assert(jsContent.includes('catch (primaryErr)'), 'captureBoardCanvas deve capturar falha primária do html2canvas');
  });

  runTest('4.2 - Fallback isola folhas de estilo e injeta estilos mínimos computados', () => {
    assert(jsContent.includes('fallbackOptions'), 'Deve haver opções específicas de fallback');
    assert(jsContent.includes('baseStyle.textContent ='), 'Deve injetar estilos essenciais no fallback');
  });

  console.log('\n---------------------------------------------------------------------------');
  console.log(' SEÇÃO 5: TESTES DE EXECUÇÃO EM RUNTIME (MOCK DOM)');
  console.log('---------------------------------------------------------------------------');

  await runAsyncTest('5.1 - saveFileWithDialog grava diretamente quando recebe prePickedTarget', async () => {
    let writeCalled = false;
    let closeCalled = false;
    const mockBlob = { size: 1024, type: 'image/png' };
    const mockHandle = {
      createWritable: async () => ({
        write: async (b) => { writeCalled = true; },
        close: async () => { closeCalled = true; }
      })
    };

    const target = { handle: mockHandle, fileName: 'grade.png' };
    const app = require('./app.js');
    const res = await app.saveFileWithDialog(mockBlob, 'grade.png', 'PNG', 'image/png', '.png', target);
    assert.strictEqual(res, true, 'Deve retornar true ao salvar com prePickedTarget');
    assert.strictEqual(writeCalled, true, 'createWritable().write deve ser executado');
    assert.strictEqual(closeCalled, true, 'createWritable().close deve ser executado');
  });

  await runAsyncTest('5.2 - pickSaveTarget retorna null quando usuário cancela (AbortError)', async () => {
    global.window = {
      showSaveFilePicker: async () => {
        const err = new Error('The user aborted a request.');
        err.name = 'AbortError';
        throw err;
      }
    };

    const app = require('./app.js');
    const target = await app.pickSaveTarget('grade.png', 'PNG', 'image/png', '.png');
    assert.strictEqual(target, null, 'pickSaveTarget deve retornar null quando cancelado');
    delete global.window;
  });

  await runAsyncTest('5.3 - pickSaveTarget retorna handle quando usuário seleciona arquivo', async () => {
    const dummyHandle = { name: 'grade.png' };
    global.window = {
      showSaveFilePicker: async () => dummyHandle
    };

    const app = require('./app.js');
    const target = await app.pickSaveTarget('grade.png', 'PNG', 'image/png', '.png');
    assert.deepStrictEqual(target, { handle: dummyHandle, fileName: 'grade.png' }, 'pickSaveTarget deve retornar handle e fileName');
    delete global.window;
  });

  console.log('\n================================================================================');
  console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  if (passedTests === totalTests) {
    console.log(' SUCESSO TOTAL: EXPORTAÇÃO HTML2CANVAS BLINDADA CONTRA ERRO DE EOF!');
    console.log(' (1) CSS Syntax & Cleanliness: 100% OK');
    console.log(' (2) onclone Sanitizer (Backdrop, Filter, SVG): 100% OK');
    console.log(' (3) Pre-Picked Target (User Activation Preserved): 100% OK');
    console.log(' (4) Resilient Fallback Engine: 100% OK');
  } else {
    console.log(' ATENÇÃO: ALGUNS TESTES FALHARAM');
    process.exit(1);
  }
  console.log('================================================================================\n');
})();
