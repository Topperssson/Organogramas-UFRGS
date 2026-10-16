const fs = require('fs');

function testDagOrder(rawFile, label) {
  const data = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
  console.log(`\n=== Testing DAG Order for ${label} ===`);

  // Build course stage map for default allocation
  // Default allocation: for alternative pairs, pick presencial by default
  const defaultAlloc = {};
  for (const item of Object.values(data)) {
    const d = item.details;
    if (!d || !d.dados) continue;
    const etapaM = d.dados.match(/<label class="labelMenuLateral">Etapa:\s*<\/label>([^<]+)/i);
    const caraterM = d.dados.match(/<label class="labelMenuLateral">Carater:\s*<\/label>([^<]+)/i);
    const etapaStr = etapaM ? etapaM[1].trim() : '0';
    const carater = caraterM ? caraterM[1].trim() : '';
    const etapa = parseInt(etapaStr, 10) || 0;

    // If EAD alternative, starts in bank (null) by default
    if (item.sigla.includes('EAD') || ['MAT01218', 'MAT02052', 'MAT02051', 'MAT01214', 'ECO02125'].includes(item.sigla)) {
      defaultAlloc[item.sigla] = null;
    } else if (carater.toLowerCase().includes('obrigat') || carater.toLowerCase().includes('alternativa')) {
      if (etapa > 0) defaultAlloc[item.sigla] = etapa;
      else defaultAlloc[item.sigla] = null;
    } else {
      defaultAlloc[item.sigla] = null;
    }
  }

  // Check violations
  let violations = 0;
  for (const item of Object.values(data)) {
    const semB = defaultAlloc[item.sigla];
    if (semB === null || semB === undefined) continue;

    const reqHtml = (item.details && item.details.requisitos) || '';
    const codeMatches = reqHtml.match(/\(([A-Z]{3}[0-9]{5}|TRABALHO)\)/g) || [];
    codeMatches.forEach(m => {
      const pCode = m.replace(/[()]/g, '');
      const semA = defaultAlloc[pCode];
      if (semA !== null && semA !== undefined) {
        if (semB <= semA) {
          console.error(`VIOLATION in ${label}: ${item.sigla} (Sem ${semB}) requires ${pCode} (Sem ${semA})!`);
          violations++;
        }
      }
    });
  }

  if (violations === 0) {
    console.log(`DAG Order valid! Zero violations in ${label}.`);
  }
}

function testEad(rawFile, label) {
  const data = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
  const defaultAlloc = {};
  const eadMap = {
    'MAT01109': 'MAT01218',
    'MAT02214': 'MAT02052',
    'MAT02215': 'MAT02051',
    'MAT01355': 'MAT01214',
    'ECO02013': 'ECO02125'
  };

  for (const item of Object.values(data)) {
    const d = item.details;
    if (!d || !d.dados) continue;
    const etapaM = d.dados.match(/<label class="labelMenuLateral">Etapa:\s*<\/label>([^<]+)/i);
    const caraterM = d.dados.match(/<label class="labelMenuLateral">Carater:\s*<\/label>([^<]+)/i);
    const etapa = etapaM ? parseInt(etapaM[1].trim(), 10) : 0;
    const carater = caraterM ? caraterM[1].trim() : '';

    if (Object.keys(eadMap).includes(item.sigla)) {
      defaultAlloc[item.sigla] = null; // presencial in bank
    } else if (Object.values(eadMap).includes(item.sigla)) {
      defaultAlloc[item.sigla] = etapa; // EAD in grid
    } else if (carater.toLowerCase().includes('obrigat')) {
      defaultAlloc[item.sigla] = etapa > 0 ? etapa : null;
    } else {
      defaultAlloc[item.sigla] = null;
    }
  }

  let violations = 0;
  for (const item of Object.values(data)) {
    const semB = defaultAlloc[item.sigla];
    if (semB === null || semB === undefined) continue;

    const reqHtml = (item.details && item.details.requisitos) || '';
    const codeMatches = reqHtml.match(/\(([A-Z]{3}[0-9]{5}|TRABALHO)\)/g) || [];
    codeMatches.forEach(m => {
      const pCode = m.replace(/[()]/g, '');
      const semA = defaultAlloc[pCode];
      if (semA !== null && semA !== undefined) {
        if (semB <= semA) {
          console.error(`VIOLATION with EAD in ${label}: ${item.sigla} (Sem ${semB}) requires ${pCode} (Sem ${semA})!`);
          violations++;
        }
      }
    });
  }

  if (violations === 0) console.log(`Zero violations with EAD in ${label}.`);
}

testDagOrder('dev_tests/diurno_raw.json', 'DIURNO');
testDagOrder('dev_tests/noturno_raw.json', 'NOTURNO');
testEad('dev_tests/diurno_raw.json', 'DIURNO');
testEad('dev_tests/noturno_raw.json', 'NOTURNO');

