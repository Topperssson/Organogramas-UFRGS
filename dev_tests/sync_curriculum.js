const fs = require('fs');

const curriculumJsonPath = './curriculum_data.json';
const curriculumJsPath = './curriculum_data.js';
const ceecaPath = './ceeca_extracted.json';

const curriculum = JSON.parse(fs.readFileSync(curriculumJsonPath, 'utf8'));
const ceeca = JSON.parse(fs.readFileSync(ceecaPath, 'utf8')).disciplineMap;

let updatedCount = 0;
const p1List = [];
const p2List = [];
const ambosList = [];

for (const code of Object.keys(curriculum.disciplinas)) {
  const course = curriculum.disciplinas[code];
  const ceecaItem = ceeca[code];

  if (ceecaItem) {
    if (ceecaItem.par === '1') {
      course.periodicidade = '1';
      course.oferta = '1';
      p1List.push(code);
    } else if (ceecaItem.par === '2') {
      course.periodicidade = '2';
      course.oferta = '2';
      p2List.push(code);
    } else {
      course.periodicidade = 'ambos';
      course.oferta = 'ambos';
      ambosList.push(code);
    }
  } else {
    // For courses not in CEECA (e.g. ENG03380), default to ambos
    course.periodicidade = 'ambos';
    course.oferta = 'ambos';
    ambosList.push(code);
  }
  updatedCount++;
}

console.log(`Updated ${updatedCount} disciplines.`);
console.log(`P1 (1º Semestre / anual ímpar): ${p1List.length} ->`, p1List);
console.log(`P2 (2º Semestre / anual par): ${p2List.length} ->`, p2List);
console.log(`Ambos (semestral): ${ambosList.length}`);

// Write JSON
fs.writeFileSync(curriculumJsonPath, JSON.stringify(curriculum, null, 2), 'utf8');
console.log('Saved curriculum_data.json');

// Write JS standalone wrapper
const jsContent = `/**
 * Base Curricular Oficial - Engenharia de Controle e Automação (UFRGS)
 * Catálogo 2026/1 com sincronização de periodicidade CEECA e FDCs
 */
var CURRICULUM_DATA = ${JSON.stringify(curriculum, null, 2)};

if (typeof window !== 'undefined') {
  window.CURRICULUM_DATA_FALLBACK = CURRICULUM_DATA;
  window.CURRICULUM_DATA = CURRICULUM_DATA;
}
if (typeof globalThis !== 'undefined') {
  globalThis.CURRICULUM_DATA_FALLBACK = CURRICULUM_DATA;
  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CURRICULUM_DATA;
}
`;
fs.writeFileSync(curriculumJsPath, jsContent, 'utf8');
console.log('Saved curriculum_data.js');
