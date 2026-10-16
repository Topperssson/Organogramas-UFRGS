const fs = require('fs');

function analyze(file, label) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log('=== ' + label + ' ===');
  let totalObrigCr = 0;
  let countObrig = 0;
  let countEletiva = 0;
  const stages = {};
  const obrigList = [];

  for (const [id, item] of Object.entries(data)) {
    const d = item.details;
    if (!d || !d.dados) continue;
    const etapaM = d.dados.match(/<label class="labelMenuLateral">Etapa:\s*<\/label>([^<]+)/i);
    const caraterM = d.dados.match(/<label class="labelMenuLateral">Carater:\s*<\/label>([^<]+)/i);
    const creditosM = d.dados.match(/<label class="labelMenuLateral">Cr[eé]ditos:\s*<\/label>([^<]+)/i);
    const nomeM = d.dados.match(/<label class="fontLateral">([^<]+)<\/label>/i);

    const etapa = etapaM ? etapaM[1].trim() : '?';
    const carater = caraterM ? caraterM[1].trim() : '?';
    const creditos = creditosM ? parseInt(creditosM[1].trim(), 10) : 0;
    const nome = nomeM ? nomeM[1].trim() : item.nome;

    if (carater.toLowerCase().includes('obrigat')) {
      totalObrigCr += creditos;
      countObrig++;
      stages[etapa] = (stages[etapa] || 0) + 1;
      obrigList.push({
        sigla: item.sigla,
        nome,
        etapa: parseInt(etapa, 10),
        creditos,
        requisitos: d.requisitos
      });
    } else {
      countEletiva++;
    }
  }

  console.log('Obrigatórias count:', countObrig, 'Total Créditos Obrigatórios:', totalObrigCr);
  console.log('Eletivas count:', countEletiva);
  console.log('Etapas das obrigatórias:', stages);
  return obrigList;
}

const diurnoObrig = analyze('dev_tests/diurno_raw.json', 'DIURNO');
const noturnoObrig = analyze('dev_tests/noturno_raw.json', 'NOTURNO');
