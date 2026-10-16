const fs = require('fs');

function dumpObrig(file, label) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`\n=================== ${label} OBRIGATÓRIAS ===================`);
  const list = [];
  for (const [k, v] of Object.entries(data)) {
    if (v.details && v.details.dados && v.details.dados.includes('Obrigat')) {
      const siglaM = v.details.dados.match(/Sigla:\s*<\/label>([^<]+)/);
      const crM = v.details.dados.match(/Cr[eé]ditos:\s*<\/label>([^<]+)/);
      const etM = v.details.dados.match(/Etapa:\s*<\/label>([^<]+)/);
      const chM = v.details.dados.match(/Carga Hor[aá]ria:\s*<\/label>([^<]+)/);
      const nomeM = v.details.dados.match(/<label class="fontLateral">([^<]+)<\/label>/);

      const reqHtml = v.details.requisitos || '';
      // extract prereqs codes: (CODE) or Créditos: X
      const reqCodes = [];
      const codeMatches = reqHtml.match(/\(([A-Z]{3}[0-9]{5}|TRABALHO)\)/g);
      if (codeMatches) {
        codeMatches.forEach(c => {
          const clean = c.replace(/[()]/g, '');
          if (!reqCodes.includes(clean)) reqCodes.push(clean);
        });
      }
      const minCrMatch = reqHtml.match(/(\d+)\s*cr[eé]ditos/i);
      const min_credits = minCrMatch ? parseInt(minCrMatch[1], 10) : 0;

      list.push({
        sigla: siglaM ? siglaM[1].trim() : v.sigla,
        nome: nomeM ? nomeM[1].trim() : v.nome,
        etapa: etM ? parseInt(etM[1].trim(), 10) : 0,
        creditos: crM ? parseInt(crM[1].trim(), 10) : 0,
        carga_horaria: chM ? parseInt(chM[1].trim(), 10) : 0,
        prereqs: reqCodes,
        min_credits
      });
    }
  }

  list.sort((a, b) => a.etapa - b.etapa || a.sigla.localeCompare(b.sigla));
  list.forEach(item => {
    console.log(`Etapa ${item.etapa} | ${item.sigla.padEnd(8)} | ${item.creditos} cr | CH ${item.carga_horaria} | Pre: [${item.prereqs.join(', ')}]${item.min_credits ? ` (Min ${item.min_credits} cr)` : ''} | ${item.nome}`);
  });

  return list;
}

function dumpAlternativas(file, label) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`\n=================== ${label} ALTERNATIVAS ===================`);
  for (const [k, v] of Object.entries(data)) {
    if (v.details && v.details.dados && v.details.dados.includes('Alternativa')) {
      const siglaM = v.details.dados.match(/Sigla:\s*<\/label>([^<]+)/);
      const etM = v.details.dados.match(/Etapa:\s*<\/label>([^<]+)/);
      const crM = v.details.dados.match(/Cr[eé]ditos:\s*<\/label>([^<]+)/);
      const nomeM = v.details.dados.match(/<label class="fontLateral">([^<]+)<\/label>/);
      const altHtml = v.details.alternativas || '';
      console.log(`Etapa ${etM ? etM[1] : '?'} | ${siglaM ? siglaM[1] : '?'} | ${crM ? crM[1] : '?'} cr | ${nomeM ? nomeM[1] : '?'}`);
      console.log(`  Alt info: ${altHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150)}`);
    }
  }
}

const diurnoList = dumpObrig('dev_tests/diurno_raw.json', 'DIURNO');
const noturnoList = dumpObrig('dev_tests/noturno_raw.json', 'NOTURNO');
dumpAlternativas('dev_tests/diurno_raw.json', 'DIURNO');
dumpAlternativas('dev_tests/noturno_raw.json', 'NOTURNO');

