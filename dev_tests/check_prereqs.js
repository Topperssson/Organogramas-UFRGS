const fs = require('fs');

function checkPrereqs(rawFile, label) {
  const data = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
  const allCodes = new Set();
  for (const item of Object.values(data)) {
    allCodes.add(item.sigla);
  }

  console.log(`\n=== Checking Prereqs for ${label} (${allCodes.size} courses in catalog) ===`);
  const missing = [];

  for (const item of Object.values(data)) {
    const reqHtml = (item.details && item.details.requisitos) || '';
    const codeMatches = reqHtml.match(/\(([A-Z]{3}[0-9]{5}|TRABALHO)\)/g) || [];
    codeMatches.forEach(m => {
      const code = m.replace(/[()]/g, '');
      if (!allCodes.has(code)) {
        missing.push({ course: item.sigla, missingReq: code });
      }
    });
  }

  if (missing.length === 0) {
    console.log(`100% of prerequisites exist in the ${label} catalog!`);
  } else {
    console.log(`Found missing prereqs in ${label}:`, missing);
  }
}

checkPrereqs('dev_tests/diurno_raw.json', 'DIURNO');
checkPrereqs('dev_tests/noturno_raw.json', 'NOTURNO');
