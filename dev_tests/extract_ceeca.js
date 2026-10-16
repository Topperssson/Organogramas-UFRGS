const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const urls = {
    cadcam: 'https://raw.githubusercontent.com/ufrgsceeca/Organograma-CEECA/main/cronograma_fdc_cadcam.html',
    mecanica: 'https://raw.githubusercontent.com/ufrgsceeca/Organograma-CEECA/main/cronograma_fdc_mecanica.html',
    potencia: 'https://raw.githubusercontent.com/ufrgsceeca/Organograma-CEECA/main/cronograma_fdc_potencia.html'
  };

  const results = {};
  for (const [key, url] of Object.entries(urls)) {
    const html = await fetch(url);
    const match = html.match(/const data = (\[[\s\S]*?\]);/);
    if (match) {
      results[key] = JSON.parse(match[1]);
      console.log(key, 'loaded', results[key].length, 'disciplines');
    } else {
      console.error('Failed to match data in', key);
    }
  }

  // Analyze parities across files
  const disciplineMap = {};
  for (const [key, list] of Object.entries(results)) {
    for (const d of list) {
      const code = d.c === 'ESTAGIO' ? 'CCA99004' : (d.c === 'TCC1' ? 'CCA99002' : (d.c === 'TCC2' ? 'CCA99003' : d.c));
      if (!disciplineMap[code]) {
        disciplineMap[code] = {
          code,
          name: d.n,
          etapa: d.e,
          par: d.par,
          t: {},
          cr: d.cr,
          ch: d.ch
        };
      }
      disciplineMap[code].t[key] = d.t;
      if (d.par !== disciplineMap[code].par) {
        console.log('Parity discrepancy for', code, disciplineMap[code].par, 'vs', d.par, 'in', key);
      }
    }
  }

  console.log('\n=== FDC DISCIPLINAS (t === "f") ===');
  for (const [code, info] of Object.entries(disciplineMap)) {
    const fdcKeys = Object.keys(info.t).filter(k => info.t[k] === 'f');
    if (fdcKeys.length > 0) {
      console.log(code, info.name, '-> FDC in:', fdcKeys.join(', '), 'etapa:', info.etapa, 'par:', info.par);
    }
  }

  console.log('\n=== PERIODICIDADE ===');
  const par1 = Object.values(disciplineMap).filter(d => d.par === '1');
  const par2 = Object.values(disciplineMap).filter(d => d.par === '2');
  const parBoth = Object.values(disciplineMap).filter(d => d.par === null);
  console.log('Par 1 (anual ímpar / 1º Sem):', par1.length);
  par1.forEach(d => console.log('  1:', d.code, d.name, '(Etapa ' + d.etapa + ')'));
  console.log('Par 2 (anual par / 2º Sem):', par2.length);
  par2.forEach(d => console.log('  2:', d.code, d.name, '(Etapa ' + d.etapa + ')'));
  console.log('Par null (ambos os semestres):', parBoth.length);

  // Save extracted JSON for precise inspection
  fs.writeFileSync('ceeca_extracted.json', JSON.stringify({ results, disciplineMap }, null, 2));
  console.log('Saved ceeca_extracted.json');
}

run().catch(console.error);
