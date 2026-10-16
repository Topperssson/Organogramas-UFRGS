const fs = require('fs');
const https = require('https');
const querystring = require('querystring');

function parseDivsFromHtml(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const divRegex = /<div\s+id="(ATIV_(\d+)_(\d+))"[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  const items = [];
  let match;
  while ((match = divRegex.exec(content)) !== null) {
    const fullId = match[1];
    const codAtividade = match[2];
    const nrSeqFormacao = match[3];
    const style = match[4];
    const innerHtml = match[5];

    const siglaMatch = innerHtml.match(/id="SIGLA@@@[^"]*"\s+value="([^"]*)"/i);
    const nomeMatch = innerHtml.match(/id="NOME@@@[^"]*"\s+value="([^"]*)"/i);

    const sigla = siglaMatch ? siglaMatch[1].trim() : '';
    const nome = nomeMatch ? nomeMatch[1].trim() : '';

    items.push({
      divId: fullId,
      codAtividade,
      nrSeqFormacao,
      sigla,
      nome
    });
  }
  return items;
}

function fetchDetails(codAtividade, nrSeqFormacao, codCurriculo, codHabilitacao) {
  return new Promise((resolve) => {
    const postData = querystring.stringify({
      CodAtividade: codAtividade,
      NrSeqFormacao: nrSeqFormacao,
      Relatorio: 'r',
      CodCurriculo: codCurriculo,
      CodHabilitacao: codHabilitacao,
      PeriodoLetivo: 2026022,
      Consulta: 'dados'
    });

    const req = https.request('https://www1.ufrgs.br/PortalEnsino/GraduacaoCurriculos/ajax/grade/consultaDadosAtividade_Plone.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          console.error('Error parsing JSON for', codAtividade, data.slice(0, 100));
          resolve(null);
        }
      });
    });

    req.on('error', err => {
      console.error('Req error for', codAtividade, err.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

async function batchFetch(items, codCurriculo, codHabilitacao) {
  const results = {};
  const queue = [...items];
  const CONCURRENCY = 10;

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      const res = await fetchDetails(item.codAtividade, item.nrSeqFormacao, codCurriculo, codHabilitacao);
      results[item.divId] = {
        ...item,
        details: res
      };
      if (Object.keys(results).length % 30 === 0) {
        console.log(`Fetched ${Object.keys(results).length}/${items.length}...`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return results;
}

async function run() {
  console.log('Fetching Diurno details (curriculo 180, habilitacao 56)...');
  const diurnoItems = parseDivsFromHtml('dev_tests/diurno_grade.html');
  const diurnoData = await batchFetch(diurnoItems, 180, 56);
  fs.writeFileSync('dev_tests/diurno_raw.json', JSON.stringify(diurnoData, null, 2), 'utf8');
  console.log('Saved diurno_raw.json');

  console.log('Fetching Noturno details (curriculo 1, habilitacao 171)...');
  const noturnoItems = parseDivsFromHtml('dev_tests/noturno_grade.html');
  const noturnoData = await batchFetch(noturnoItems, 1, 171);
  fs.writeFileSync('dev_tests/noturno_raw.json', JSON.stringify(noturnoData, null, 2), 'utf8');
  console.log('Saved noturno_raw.json');
}

run().catch(console.error);
