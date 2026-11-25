const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failures++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

console.log('========================================================================');
console.log('AUDITORIA GERAL DE TODOS OS 16 SIMULADORES STANDALONE DA UFRGS');
console.log('(6 Existentes + 10 Novos: Engenharias, Ciência da Computação e Matemática)');
console.log('========================================================================\n');

// 1. Resolve base directory dynamically (CWD-independent via __dirname)
let baseDir = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(baseDir, 'dist', 'engenharia-producao'))) {
  baseDir = process.cwd();
  if (fs.existsSync(path.join(baseDir, 'trajetoria-academica', 'dist', 'engenharia-producao'))) {
    baseDir = path.join(baseDir, 'trajetoria-academica');
  }
}

const projects = [
  {
    name: 'Engenharia de Controle e Automação',
    folder: 'engenharia-controle-automacao',
    expectedKeys: ['trajetoria_eca_ufrgs'],
    exportPrefix: 'grade_eca_ufrgs',
    minCourses: 80,
    hasFdc: true
  },
  {
    name: 'Engenharia Mecânica',
    folder: 'engenharia-mecanica',
    expectedKeys: ['trajetoria_eng_mecanica_ufrgs_v1'],
    exportPrefix: 'grade_mecanica_ufrgs',
    minCourses: 60,
    hasFdc: false
  },
  {
    name: 'Engenharia de Produção',
    folder: 'engenharia-producao',
    expectedKeys: ['trajetoria_eng_producao_ufrgs_v1'],
    exportPrefix: 'grade_producao_ufrgs',
    minCourses: 60,
    hasFdc: false
  },
  {
    name: 'Ciências Econômicas',
    folder: 'ciencias-economicas',
    expectedKeys: [
      'trajetoria_economia_diurno_ufrgs_v1',
      'trajetoria_economia_noturno_ufrgs_v1',
      'trajetoria_economia_active_shift'
    ],
    exportPrefix: 'grade_economia',
    minCourses: 160,
    hasFdc: false
  },
  {
    name: 'Engenharia Elétrica',
    folder: 'engenharia-eletrica',
    expectedKeys: ['trajetoria_eng_eletrica_ufrgs_v1'],
    exportPrefix: 'grade_eletrica_ufrgs',
    minCourses: 80,
    hasFdc: false
  },
  {
    name: 'Engenharia de Computação',
    folder: 'engenharia-computacao',
    expectedKeys: ['trajetoria_eng_computacao_ufrgs_v1'],
    exportPrefix: 'grade_computacao_ufrgs',
    minCourses: 80,
    hasFdc: false
  },
  {
    name: 'Ciência da Computação',
    folder: 'ciencia-computacao',
    expectedKeys: ['trajetoria_ciencia_computacao_ufrgs_v1'],
    exportPrefix: 'grade_ciencia_computacao_ufrgs',
    minCourses: 140,
    hasFdc: false
  },
  {
    name: 'Engenharia Civil',
    folder: 'engenharia-civil',
    expectedKeys: ['trajetoria_eng_civil_ufrgs_v1'],
    exportPrefix: 'grade_civil_ufrgs',
    minCourses: 160,
    hasFdc: false
  },
  {
    name: 'Engenharia Química',
    folder: 'engenharia-quimica',
    expectedKeys: ['trajetoria_eng_quimica_ufrgs_v1'],
    exportPrefix: 'grade_quimica_ufrgs',
    minCourses: 160,
    hasFdc: false
  },
  {
    name: 'Engenharia de Materiais',
    folder: 'engenharia-materiais',
    expectedKeys: ['trajetoria_eng_materiais_ufrgs_v1'],
    exportPrefix: 'grade_materiais_ufrgs',
    minCourses: 120,
    hasFdc: false
  },
  {
    name: 'Engenharia Ambiental',
    folder: 'engenharia-ambiental',
    expectedKeys: ['trajetoria_eng_ambiental_ufrgs_v1'],
    exportPrefix: 'grade_ambiental_ufrgs',
    minCourses: 140,
    hasFdc: false
  },
  {
    name: 'Engenharia Metalúrgica',
    folder: 'engenharia-metalurgica',
    expectedKeys: ['trajetoria_eng_metalurgica_ufrgs_v1'],
    exportPrefix: 'grade_metalurgica_ufrgs',
    minCourses: 100,
    hasFdc: false
  },
  {
    name: 'Engenharia de Minas',
    folder: 'engenharia-minas',
    expectedKeys: ['trajetoria_eng_minas_ufrgs_v1'],
    exportPrefix: 'grade_minas_ufrgs',
    minCourses: 80,
    hasFdc: false
  },
  {
    name: 'Engenharia Física',
    folder: 'engenharia-fisica',
    expectedKeys: ['trajetoria_eng_fisica_ufrgs_v1'],
    exportPrefix: 'grade_fisica_ufrgs',
    minCourses: 80,
    hasFdc: false
  },
  {
    name: 'Engenharia Cartográfica e de Agrimensura',
    folder: 'engenharia-cartografica-agrimensura',
    expectedKeys: ['trajetoria_eng_cartografica_ufrgs_v1'],
    exportPrefix: 'grade_cartografica_ufrgs',
    minCourses: 100,
    hasFdc: false
  },
  {
    name: 'Matemática',
    folder: 'matematica',
    expectedKeys: [
      'trajetoria_matematica_lic_diurno_ufrgs_v1',
      'trajetoria_matematica_lic_noturno_ufrgs_v1',
      'trajetoria_matematica_bach_pura_ufrgs_v1',
      'trajetoria_matematica_bach_aplicada_ufrgs_v1',
      'trajetoria_matematica_active_shift'
    ],
    exportPrefix: 'grade_matematica',
    minCourses: 80,
    hasFdc: true
  }
];

const allowedFiles = new Set(['organograma.html', 'styles.css', 'app.js', 'curriculum_data.js', 'curriculum_data.json', 'README.md']);
const foundKeys = new Set();
const foundPrefixes = new Set();

function extractTracks(json) {
  if (json && json.disciplinas) {
    return [{ track: 'único', data: json }];
  }
  return Object.entries(json || {})
    .filter(([, v]) => v && typeof v === 'object' && v.disciplinas)
    .map(([track, data]) => ({ track, data }));
}

// -----------------------------------------------------------------------------
// TESTE 1: SINTAXE JS (node --check) EM TODOS OS 16 PROJETOS
// -----------------------------------------------------------------------------
console.log('--- Teste 1: Validação de Sintaxe JS (node --check) em Todos os Projetos ---');
projects.forEach(p => {
  const pDir = path.join(baseDir, 'dist', p.folder);
  ['app.js', 'curriculum_data.js'].forEach(file => {
    const fPath = path.join(pDir, file);
    assert(fs.existsSync(fPath), `[${p.name}] ${file} presente em dist/${p.folder}/`);
    try {
      execSync(`node --check "${fPath}"`, { stdio: 'pipe' });
      assert(true, `[${p.name}] ${file} - Sintaxe JS 100% válida`);
    } catch (e) {
      assert(false, `[${p.name}] ${file} - Erro de sintaxe: ${e.message}`);
    }
  });
});

// -----------------------------------------------------------------------------
// TESTE 2: INTEGRIDADE REFERENCIAL, ACYCLICIDADE DO DAG E CRÉDITOS (16 CURSOS)
// -----------------------------------------------------------------------------
console.log('\n--- Teste 2: Integridade Referencial e Acyclicidade dos DAGs (Todos os Simuladores) ---');
projects.forEach(p => {
  const jsonPath = path.join(baseDir, 'dist', p.folder, 'curriculum_data.json');
  assert(fs.existsSync(jsonPath), `[${p.name}] curriculum_data.json presente em dist/${p.folder}/`);
  const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const tracks = extractTracks(rawJson);
  assert(tracks.length >= 1, `[${p.name}] Pelo menos 1 trilha curricular extraída (${tracks.length})`);

  tracks.forEach(({ track, data }) => {
    const label = tracks.length > 1 ? `${p.name} - ${track}` : p.name;
    const discMap = data.disciplinas || {};
    const codes = Object.keys(discMap);

    assert(codes.length >= p.minCourses, `[${label}] Catálogo possui ${codes.length} disciplinas (>= ${p.minCourses})`);

    // 2.1 Dependências órfãs
    const missingPrereqs = [];
    codes.forEach(code => {
      const prereqs = discMap[code].prerequisitos || [];
      prereqs.forEach(pr => {
        if (!discMap[pr]) {
          missingPrereqs.push(`${code} -> pré-requisito ausente: ${pr}`);
        }
      });
    });
    assert(missingPrereqs.length === 0, `[${label}] Nenhum pré-requisito órfão no DAG (${missingPrereqs.length} falhas)`);

    // 2.2 Ausência de ciclos (Kahn topological sort)
    const inDegree = {};
    const adj = {};
    codes.forEach(c => { inDegree[c] = 0; adj[c] = []; });
    codes.forEach(c => {
      (discMap[c].prerequisitos || []).forEach(pr => {
        if (adj[pr]) adj[pr].push(c);
        inDegree[c]++;
      });
    });

    const queue = codes.filter(c => inDegree[c] === 0);
    let visited = 0;
    while (queue.length > 0) {
      const curr = queue.shift();
      visited++;
      (adj[curr] || []).forEach(nxt => {
        inDegree[nxt]--;
        if (inDegree[nxt] === 0) queue.push(nxt);
      });
    }
    assert(visited === codes.length, `[${label}] DAG estritamente acíclico (${visited}/${codes.length} nós ordenados)`);

    const stats = data.estatisticas_nominais;
    assert(
      stats &&
        Number.isFinite(stats.creditos_obrigatorios) &&
        stats.creditos_obrigatorios >= 120 &&
        stats.creditos_totais_diplomacao >= stats.creditos_obrigatorios,
      `[${label}] Metas de créditos nominais válidas (${stats ? `${stats.creditos_obrigatorios} ob / ${stats.creditos_totais_diplomacao} tot` : 'ausente'})`
    );
  });
});

// -----------------------------------------------------------------------------
// TESTE 3: ISOLAMENTO RIGOROSO DE LOCALSTORAGE E PREFIXOS DE EXPORTAÇÃO
// -----------------------------------------------------------------------------
console.log('\n--- Teste 3: Isolamento de localStorage e Prefixos de Exportação ---');
projects.forEach(p => {
  const pApp = fs.readFileSync(path.join(baseDir, 'dist', p.folder, 'app.js'), 'utf-8');

  p.expectedKeys.forEach(key => {
    assert(pApp.includes(`'${key}'`), `[${p.name}] Chave correta configurada: '${key}'`);
    assert(!foundKeys.has(key), `[${p.name}] Chave '${key}' é única entre os cursos`);
    foundKeys.add(key);
  });

  assert(pApp.includes(`${p.exportPrefix}_`), `[${p.name}] Prefixo de exportação configurado: '${p.exportPrefix}'`);
  assert(!foundPrefixes.has(p.exportPrefix), `[${p.name}] Prefixo '${p.exportPrefix}' é único entre os cursos`);
  foundPrefixes.add(p.exportPrefix);

  // Garantir que não há contaminação cruzada
  projects.forEach(other => {
    if (other.folder !== p.folder) {
      other.expectedKeys.forEach(otherKey => {
        assert(!pApp.includes(`'${otherKey}'`), `[${p.name}] Livre de contaminação cruzada da chave '${otherKey}'`);
      });
      assert(!pApp.includes(`${other.exportPrefix}_`), `[${p.name}] Livre de contaminação cruzada do prefixo '${other.exportPrefix}'`);
    }
  });
});

// -----------------------------------------------------------------------------
// TESTE 4: INTERFACE HTML (CONTROLE DE FDCs)
// -----------------------------------------------------------------------------
console.log('\n--- Teste 4: Auditoria de Interface HTML & FDCs ---');
projects.forEach(p => {
  const pHtml = fs.readFileSync(path.join(baseDir, 'dist', p.folder, 'organograma.html'), 'utf-8');
  if (p.hasFdc) {
    assert(pHtml.includes('id="fdc-chips-group"'), `[${p.name}] Contém seletor de FDC (seletor FDC presente)`);
  } else {
    assert(!pHtml.includes('id="fdc-chips-group"'), `[${p.name}] Livre de seletor de FDC`);
    assert(!pHtml.includes('pill-fdc'), `[${p.name}] Livre de mini-card de FDC`);
  }
});

// -----------------------------------------------------------------------------
// TESTE 5: LIMPEZA DAS PASTAS DE DISTRIBUIÇÃO DIST/
// -----------------------------------------------------------------------------
console.log('\n--- Teste 5: Higiene de Distribuição Standalone ---');
projects.forEach(p => {
  const pDir = path.join(baseDir, 'dist', p.folder);
  const files = fs.readdirSync(pDir);
  const extraneous = files.filter(f => !allowedFiles.has(f));
  assert(extraneous.length === 0, `[${p.name}] Pasta limpa sem arquivos residuais de teste (Extras: ${extraneous.join(', ') || 'Nenhum'})`);
  assert(files.length === allowedFiles.size, `[${p.name}] Exatamente ${allowedFiles.size}/${allowedFiles.size} arquivos de produção presentes (incluindo README.md)`);
});

// RESUMO FINAL
console.log('\n========================================================================');
if (failures === 0) {
  console.log(`✅ AUDITORIA COMPLETA: TODOS OS ${projects.length} SIMULADORES ESTÃO 100% VALIDADOS! (${projects.length}/${projects.length} PASS)`);
  projects.forEach(p => {
    console.log(`   - ${p.name}: PRONTO`);
  });
  console.log('========================================================================');
  process.exit(0);
} else {
  console.error(`❌ AUDITORIA FALHOU COM ${failures} ERRO(S)!`);
  console.log('========================================================================');
  process.exit(1);
}
