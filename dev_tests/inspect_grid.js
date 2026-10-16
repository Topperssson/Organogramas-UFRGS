const fs = require('fs');

function inspectGrid(htmlFile, rawJsonFile, label) {
  const content = fs.readFileSync(htmlFile, 'latin1');
  const raw = JSON.parse(fs.readFileSync(rawJsonFile, 'utf8'));
  console.log(`\n=================== ${label} GRID POSITIONS ===================`);

  const divRegex = /<div\s+id="(ATIV_(\d+)_(\d+))"[^>]*style="([^"]*)"[^>]*>/gi;
  let match;
  const items = [];
  while ((match = divRegex.exec(content)) !== null) {
    const fullId = match[1];
    const style = match[4];
    const leftM = style.match(/left:\s*(\d+)px/);
    const topM = style.match(/top:\s*(\d+)px/);
    const left = leftM ? parseInt(leftM[1], 10) : 0;
    const top = topM ? parseInt(topM[1], 10) : 0;

    const info = raw[fullId];
    if (info) {
      items.push({
        fullId,
        sigla: info.sigla,
        nome: info.nome,
        left,
        top,
        details: info.details
      });
    }
  }

  // Sort by left then top
  items.sort((a, b) => a.left - b.left || a.top - b.top);

  // Group by left
  const cols = {};
  items.forEach(it => {
    cols[it.left] = cols[it.left] || [];
    cols[it.left].push(it);
  });

  for (const [left, list] of Object.entries(cols)) {
    if (parseInt(left, 10) > 350) continue;
    console.log(`\nColumn left=${left}px (${list.length} items):`);
    list.forEach(it => {
      let carater = 'Eletiva';
      let cr = 4;
      if (it.details && it.details.dados) {
        if (it.details.dados.includes('Obrigat')) carater = 'Obrigatória';
        else if (it.details.dados.includes('Alternativa')) carater = 'Alternativa';
        const crM = it.details.dados.match(/Cr[eé]ditos:\s*<\/label>([^<]+)/);
        if (crM) cr = parseInt(crM[1].trim(), 10);
      }
      console.log(`  ${it.sigla.padEnd(8)} | ${cr} cr | ${carater.padEnd(11)} | top: ${it.top}px | ${it.nome}`);
    });
  }


}

inspectGrid('dev_tests/diurno_grade.html', 'dev_tests/diurno_raw.json', 'DIURNO');
inspectGrid('dev_tests/noturno_grade.html', 'dev_tests/noturno_raw.json', 'NOTURNO');
