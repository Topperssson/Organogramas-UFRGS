const fs = require('fs');
const path = require('path');

const ALT_PAIRS = [
  { presencial: 'MAT01109', ead: 'MAT01218', name: 'Cálculo Diferencial e Integral' },
  { presencial: 'MAT02214', ead: 'MAT02052', name: 'Estatística Geral I' },
  { presencial: 'MAT02215', ead: 'MAT02051', name: 'Estatística Geral II' },
  { presencial: 'MAT01355', ead: 'MAT01214', name: 'Álgebra Linear I - A' },
  { presencial: 'ECO02013', ead: 'ECO02125', name: 'Economia Brasileira Contemporânea I' }
];

const PRESENCIAL_TO_EAD = {};
const EAD_TO_PRESENCIAL = {};
ALT_PAIRS.forEach(p => {
  PRESENCIAL_TO_EAD[p.presencial] = p.ead;
  EAD_TO_PRESENCIAL[p.ead] = p.presencial;
});

function parseCatalog(rawFile, shift) {
  const data = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
  const disciplinas = {};

  for (const [id, item] of Object.entries(data)) {
    const d = item.details;
    if (!d || !d.dados) continue;

    const siglaM = d.dados.match(/<label class="labelMenuLateral">Sigla:\s*<\/label>([^<]+)/i);
    const etapaM = d.dados.match(/<label class="labelMenuLateral">Etapa:\s*<\/label>([^<]+)/i);
    const caraterM = d.dados.match(/<label class="labelMenuLateral">Carater:\s*<\/label>([^<]+)/i);
    const creditosM = d.dados.match(/<label class="labelMenuLateral">Cr[eé]ditos:\s*<\/label>([^<]+)/i);
    const chM = d.dados.match(/<label class="labelMenuLateral">Carga Hor[aá]ria:\s*<\/label>([^<]+)/i);
    const nomeM = d.dados.match(/<label class="fontLateral">([^<]+)<\/label>/i);

    const sigla = siglaM ? siglaM[1].trim() : item.sigla;
    let nome = nomeM ? nomeM[1].trim() : item.nome;
    const etapaRaw = etapaM ? etapaM[1].trim() : '0';
    const parsedEtapa = parseInt(etapaRaw, 10) || 0;
    const carater = caraterM ? caraterM[1].trim() : 'Eletiva';
    let creditos = creditosM ? parseInt(creditosM[1].trim(), 10) : 4;
    const carga_horaria = chM ? parseInt(chM[1].trim(), 10) : creditos * 15;

    // Prereqs
    const reqHtml = d.requisitos || '';
    const prereqCodes = [];
    const codeMatches = reqHtml.match(/\(([A-Z]{3}[0-9]{5}|TRABALHO)\)/g) || [];
    codeMatches.forEach(m => {
      const code = m.replace(/[()]/g, '');
      if (!prereqCodes.includes(code)) prereqCodes.push(code);
    });

    const minCrMatch = reqHtml.match(/(\d+)\s*cr[eé]ditos/i);
    const min_credits = minCrMatch ? parseInt(minCrMatch[1], 10) : 0;

    // Is it an alternative?
    const isPresencialAlt = Boolean(PRESENCIAL_TO_EAD[sigla]);
    const isEadAlt = Boolean(EAD_TO_PRESENCIAL[sigla]);
    const alternativeOf = isPresencialAlt ? PRESENCIAL_TO_EAD[sigla] : (isEadAlt ? EAD_TO_PRESENCIAL[sigla] : null);

    let tipo = 'eletiva';
    let etapa_sugerida = null;

    if (carater.toLowerCase().includes('obrigat')) {
      tipo = 'obrigatoria';
      etapa_sugerida = parsedEtapa > 0 ? parsedEtapa : 1;
    } else if (isPresencialAlt) {
      // Presencial alternative is default mandatory in its stage
      tipo = 'obrigatoria';
      etapa_sugerida = parsedEtapa > 0 ? parsedEtapa : 1;
    } else if (isEadAlt) {
      // EAD alternative starts as elective in bank with null stage
      tipo = 'eletiva';
      etapa_sugerida = null;
    } else {
      tipo = 'eletiva';
      etapa_sugerida = null;
    }

    disciplinas[sigla] = {
      codigo: sigla,
      nome,
      creditos,
      carga_horaria,
      horas_extensao: 0,
      etapa_sugerida,
      tipo,
      prerequisitos: prereqCodes,
      corequisitos: [],
      min_credits,
      periodicidade: 'ambos',
      alternativeOf
    };
  }

  return disciplinas;
}

const diurnoDisciplinas = parseCatalog('dev_tests/diurno_raw.json', 'diurno');
const noturnoDisciplinas = parseCatalog('dev_tests/noturno_raw.json', 'noturno');

console.log('Diurno total disciplinas:', Object.keys(diurnoDisciplinas).length);
console.log('Noturno total disciplinas:', Object.keys(noturnoDisciplinas).length);

const ECONOMIA_CURRICULA = {
  diurno: {
    label: "Ciências Econômicas (Diurno)",
    shift: "diurno",
    curso: "Ciências Econômicas",
    codigo: 309,
    habilitacao: 56,
    curriculo: 180,
    instituicao: "UFRGS",
    versao_catalogo: "2026/1",
    totalMandatoryCredits: 128,
    totalElectiveCredits: 44,
    totalTargetCredits: 172,
    maxStage: 8,
    estatisticas_nominais: {
      creditos_obrigatorios: 128,
      creditos_eletivos: 44,
      creditos_complementares: 0,
      creditos_convertidos: 0,
      creditos_totais_diplomacao: 172,
      carga_horaria_obrigatoria: 2100,
      carga_horaria_eletiva: 660,
      carga_horaria_total: 3000,
      horas_extensao_diplomacao: 300
    },
    disciplinas: diurnoDisciplinas
  },
  noturno: {
    label: "Ciências Econômicas (Noturno)",
    shift: "noturno",
    curso: "Ciências Econômicas",
    codigo: 309,
    habilitacao: 171,
    curriculo: 1,
    instituicao: "UFRGS",
    versao_catalogo: "2026/1",
    totalMandatoryCredits: 128,
    totalElectiveCredits: 44,
    totalTargetCredits: 172,
    maxStage: 10,
    estatisticas_nominais: {
      creditos_obrigatorios: 128,
      creditos_eletivos: 44,
      creditos_complementares: 0,
      creditos_convertidos: 0,
      creditos_totais_diplomacao: 172,
      carga_horaria_obrigatoria: 2100,
      carga_horaria_eletiva: 660,
      carga_horaria_total: 3000,
      horas_extensao_diplomacao: 300
    },
    disciplinas: noturnoDisciplinas
  }
};

const distDir = path.join(__dirname, '../dist/ciencias-economicas');

// 1. Write curriculum_data.json
const jsonContent = JSON.stringify(ECONOMIA_CURRICULA, null, 2);
fs.writeFileSync(path.join(distDir, 'curriculum_data.json'), jsonContent, 'utf8');
console.log('Saved dist/ciencias-economicas/curriculum_data.json');

// 2. Write curriculum_data.js
const jsContent = `/**
 * Base Curricular Oficial Unificada - Ciências Econômicas (UFRGS)
 * Catálogo Oficial COMGRAD Economia 2026/1 - Modalidades Diurno e Noturno
 */
var ECONOMIA_CURRICULA = ${JSON.stringify(ECONOMIA_CURRICULA, null, 2)};

// Fallback padrão para inicialização síncrona
var CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
if (typeof globalThis !== 'undefined') {
  globalThis.ECONOMIA_CURRICULA = ECONOMIA_CURRICULA;
  globalThis.CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ECONOMIA_CURRICULA, CURRICULUM_DATA };
}
`;

fs.writeFileSync(path.join(distDir, 'curriculum_data.js'), jsContent, 'utf8');
console.log('Saved dist/ciencias-economicas/curriculum_data.js');
