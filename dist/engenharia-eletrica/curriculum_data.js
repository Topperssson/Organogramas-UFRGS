/**
 * Base Curricular Oficial - Engenharia Elétrica (UFRGS)
 * Catálogo 2026/1
 */
var CURRICULUM_DATA = {
  "curso": "Engenharia Elétrica",
  "codigo": 323,
  "habilitacao": 76,
  "instituicao": "UFRGS",
  "versao_catalogo": "2026/1",
  "estatisticas_nominais": {
    "creditos_obrigatorios": 246,
    "creditos_eletivos": 20,
    "creditos_complementares": 6,
    "creditos_convertidos": 12,
    "creditos_totais_diplomacao": 284,
    "carga_horaria_obrigatoria": 3880,
    "carga_horaria_eletiva": 300,
    "carga_horaria_total": 4345,
    "horas_extensao_diplomacao": 435
  },
  "disciplinas": {
    "ENG04079": {
      "codigo": "ENG04079",
      "nome": "Aprendizagem Autï¿½noma I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01353": {
      "codigo": "MAT01353",
      "nome": "Cï¿½lculo E Geometria Analï¿½tica I - A",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ARQ03318": {
      "codigo": "ARQ03318",
      "nome": "Desenho Tï¿½cnico I-A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ARQ03317": {
      "codigo": "ARQ03317",
      "nome": "Geometria Descritiva II-A",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04080": {
      "codigo": "ENG04080",
      "nome": "Introduï¿½ï¿½o Ï¿½ Engenharia Elï¿½trica - B",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "FIS01080": {
      "codigo": "FIS01080",
      "nome": "Fï¿½sica I - E",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "Alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "FIS01181"
    },
    "FIS01181": {
      "codigo": "FIS01181",
      "nome": "Fï¿½sica I-C",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 1,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "FIS01080"
    },
    "MAT01355": {
      "codigo": "MAT01355",
      "nome": "Ï¿½lgebra Linear I - A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04079",
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01202": {
      "codigo": "INF01202",
      "nome": "Algorï¿½tmos E Programaï¿½ï¿½o - CIC",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01354": {
      "codigo": "MAT01354",
      "nome": "Cï¿½lculo E Geometria Analï¿½tica II - A",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04079",
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ARQ03319": {
      "codigo": "ARQ03319",
      "nome": "Desenho Tï¿½cnico II-A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "eletiva",
      "prerequisitos": [
        "ARQ03317",
        "ARQ03318"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "FIS01183": {
      "codigo": "FIS01183",
      "nome": "Fï¿½sica III-C",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04079",
        "FIS01181",
        "MAT01353",
        "FIS01080"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "QUI01121": {
      "codigo": "QUI01121",
      "nome": "Quï¿½mica Fundamental",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04075": {
      "codigo": "ENG04075",
      "nome": "Eletrï¿½nica Digital I",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04079",
        "ENG04080",
        "INF01202"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01167": {
      "codigo": "MAT01167",
      "nome": "Equaï¿½ï¿½es Diferenciais II",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01354",
        "MAT01355"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "FIS01184": {
      "codigo": "FIS01184",
      "nome": "Fï¿½sica IV-C",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01183"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG01156": {
      "codigo": "ENG01156",
      "nome": "Mecï¿½nica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01181",
        "MAT01354",
        "FIS01080"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04074": {
      "codigo": "ENG04074",
      "nome": "Teoria de Circuitos I",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04080",
        "MAT01355"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01169": {
      "codigo": "MAT01169",
      "nome": "Cï¿½lculo Numï¿½rico",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01202",
        "MAT01167"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04077": {
      "codigo": "ENG04077",
      "nome": "Circuitos Eletrï¿½nicos I",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04074"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "FIS01182": {
      "codigo": "FIS01182",
      "nome": "Fï¿½sica Geral - Eletromagnetismo",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04074",
        "FIS01184",
        "MAT01167"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01168": {
      "codigo": "MAT01168",
      "nome": "Matemï¿½tica Aplicada II",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01167"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01212": {
      "codigo": "INF01212",
      "nome": "Metodologia de Programaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01202"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04076": {
      "codigo": "ENG04076",
      "nome": "Teoria de Circuitos II",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04074",
        "MAT01167"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04032": {
      "codigo": "ENG04032",
      "nome": "Anï¿½lise de Circuitos III",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04076",
        "MAT01168"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04078": {
      "codigo": "ENG04078",
      "nome": "Circuitos Eletrï¿½nicos II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04076",
        "ENG04077"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "IPH01111": {
      "codigo": "IPH01111",
      "nome": "Hidrï¿½ulica E Hidrologia Aplicada II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG01156"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG02213": {
      "codigo": "ENG02213",
      "nome": "Materiais Elï¿½tricos E Magnï¿½ticos",
      "creditos": 5,
      "carga_horaria": 75,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01184"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10017": {
      "codigo": "ENG10017",
      "nome": "Sistemas E Sinais",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01168"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04454": {
      "codigo": "ENG04454",
      "nome": "Teoria Eletromagnï¿½tica Aplicada A",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04076",
        "FIS01182",
        "MAT01168"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "IPH02009": {
      "codigo": "IPH02009",
      "nome": "Aproveitamentos Hidroelï¿½tricos",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "IPH01111"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04061": {
      "codigo": "ENG04061",
      "nome": "Circuitos Eletrï¿½nicos Integrados",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG04454"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01185": {
      "codigo": "INF01185",
      "nome": "Concepï¿½ï¿½o de Circuitos Integrados I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04407": {
      "codigo": "ENG04407",
      "nome": "Conversï¿½o Eletromecï¿½nica de Energia I",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04032"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04038": {
      "codigo": "ENG04038",
      "nome": "Eletrï¿½nica III",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04475": {
      "codigo": "ENG04475",
      "nome": "Microprocessadores I",
      "creditos": 5,
      "carga_horaria": 75,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04075",
        "ENG04078"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04404": {
      "codigo": "ENG04404",
      "nome": "Ondas Eletromagnï¿½ticas",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04454"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT02219": {
      "codigo": "MAT02219",
      "nome": "Probabilidade E Estatï¿½stica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04073": {
      "codigo": "ENG04073",
      "nome": "Sistemas de Controle Eletroeletrï¿½nicos",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04461": {
      "codigo": "ENG04461",
      "nome": "Sistemas Digitais",
      "creditos": 5,
      "carga_horaria": 75,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03055": {
      "codigo": "ENG03055",
      "nome": "Fundamentos de Engenharia de Seguranï¿½a do Trabalho - ELE",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "ENG09044"
    },
    "ENG09044": {
      "codigo": "ENG09044",
      "nome": "Gestï¿½o da Seguranï¿½a E Saï¿½de no Trabalho",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "Alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "ENG03055"
    },
    "MED05011": {
      "codigo": "MED05011",
      "nome": "Higiene E Seguranï¿½a do Trabalho - A",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "Alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04436": {
      "codigo": "ENG04436",
      "nome": "Antenas E Propagaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04404"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04460": {
      "codigo": "ENG04460",
      "nome": "Aplicaï¿½ï¿½es Industriais da Eletrï¿½nica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04077",
        "ENG04407"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04053": {
      "codigo": "ENG04053",
      "nome": "Automaï¿½ï¿½o E Controle",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01194": {
      "codigo": "INF01194",
      "nome": "Concepï¿½ï¿½o de Circuitos Integrados II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04461",
        "INF01185"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04408": {
      "codigo": "ENG04408",
      "nome": "Conversï¿½o Eletromecï¿½nica de Energia II",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04407"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04063": {
      "codigo": "ENG04063",
      "nome": "Dispositivos Semicondutores",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG04454"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ADM01135": {
      "codigo": "ADM01135",
      "nome": "Engenharia Econï¿½mica E Avaliaï¿½ï¿½es",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04457": {
      "codigo": "ENG04457",
      "nome": "Instrumentaï¿½ï¿½o A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04078",
        "MAT02219"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10023": {
      "codigo": "ENG10023",
      "nome": "Sistemas de Automaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10018": {
      "codigo": "ENG10018",
      "nome": "Sistemas de Controle II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04081": {
      "codigo": "ENG04081",
      "nome": "Tï¿½picos Especiais em Eletromagnetismo Aplicado",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04404"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03010": {
      "codigo": "ENG03010",
      "nome": "Ciï¿½ncia, Tecnologia E Ambiente",
      "creditos": 3,
      "carga_horaria": 45,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "BIO11010"
    },
    "BIO11010": {
      "codigo": "BIO11010",
      "nome": "Fundamento de Ecologia Aplicada - A",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "Alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "ENG03010"
    },
    "ENG09028": {
      "codigo": "ENG09028",
      "nome": "Gestï¿½o Ambiental",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "Alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04444": {
      "codigo": "ENG04444",
      "nome": "Anï¿½lise de Sistemas de Potï¿½ncia",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04408",
        "MAT01169"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01205": {
      "codigo": "INF01205",
      "nome": "Cad para Sistemas Digitais",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04461"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04422": {
      "codigo": "ENG04422",
      "nome": "Centrais Termoelï¿½tricas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04055": {
      "codigo": "ENG04055",
      "nome": "Circuitos Integrados Analï¿½gicos",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04040": {
      "codigo": "ENG04040",
      "nome": "Dinï¿½mica de Dispositivos Eletromagnï¿½ticos",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ECO02254": {
      "codigo": "ECO02254",
      "nome": "Economia A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04003": {
      "codigo": "ENG04003",
      "nome": "Eletrï¿½nica das Comunicaï¿½ï¿½es - A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04466": {
      "codigo": "ENG04466",
      "nome": "Instalaï¿½ï¿½es Elï¿½tricas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04476": {
      "codigo": "ENG04476",
      "nome": "Microprocessadores II",
      "creditos": 5,
      "carga_horaria": 75,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04475"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04434": {
      "codigo": "ENG04434",
      "nome": "Princï¿½pios de Comunicaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG04077",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04477": {
      "codigo": "ENG04477",
      "nome": "Processamento Digital de Sinais",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04475",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG01140": {
      "codigo": "ENG01140",
      "nome": "Resistï¿½ncia dos Materiais A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG01156"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10019": {
      "codigo": "ENG10019",
      "nome": "Sistemas de Controle Digitais",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04458": {
      "codigo": "ENG04458",
      "nome": "Telefonia A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04032",
        "MAT02219"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04014": {
      "codigo": "ENG04014",
      "nome": "Teoria da Informaï¿½ï¿½o - A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "MAT02219"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "DIR04423": {
      "codigo": "DIR04423",
      "nome": "Tï¿½picos Jurï¿½dicos E Sociais",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ADM01134": {
      "codigo": "ADM01134",
      "nome": "Administraï¿½ï¿½o E Finanï¿½as",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT02219"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04421": {
      "codigo": "ENG04421",
      "nome": "Centrais Hidroelï¿½tricas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04001": {
      "codigo": "ENG04001",
      "nome": "Comunicaï¿½ï¿½es Ï¿½ticas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04404",
        "ENG04434"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04438": {
      "codigo": "ENG04438",
      "nome": "Microondas I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04404"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04039": {
      "codigo": "ENG04039",
      "nome": "Projeto de Dispositivos Eletromagnï¿½ticos",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10026": {
      "codigo": "ENG10026",
      "nome": "Robï¿½tica A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04475",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ELE99003": {
      "codigo": "ELE99003",
      "nome": "Projeto de Diplomação I - ELE (pd1)",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 180,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ELE99001": {
      "codigo": "ELE99001",
      "nome": "Seminï¿½rio de Acompanhamento E Prï¿½tica Extensionista de Projeto de Diplomaï¿½ï¿½o I",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 120,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 180,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10039": {
      "codigo": "ENG10039",
      "nome": "Sistemas de Distribuiï¿½ï¿½o de Energia Elï¿½trica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG01140",
        "ENG04407"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04478": {
      "codigo": "ENG04478",
      "nome": "Sistemas de Televisï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10040": {
      "codigo": "ENG10040",
      "nome": "Sistemas de Transmissï¿½o de Energia Elï¿½trica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG01140",
        "ENG04454"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04070": {
      "codigo": "ENG04070",
      "nome": "Subestaï¿½ï¿½es de Alta Tensï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04057": {
      "codigo": "ENG04057",
      "nome": "Teste de Sistemas Eletrï¿½nicos",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG04461"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04471": {
      "codigo": "ENG04471",
      "nome": "Tï¿½picos Especiais de Engenharia Elï¿½trica I",
      "creditos": 3,
      "carga_horaria": 45,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10016": {
      "codigo": "ENG10016",
      "nome": "Transitï¿½rios em Sistemas de Potï¿½ncia",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04462": {
      "codigo": "ENG04462",
      "nome": "Acionamento de Mï¿½quinas Elï¿½tricas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408",
        "ENG04460"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04439": {
      "codigo": "ENG04439",
      "nome": "Microondas II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04438"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04065": {
      "codigo": "ENG04065",
      "nome": "Projeto de Sistemas Analï¿½gicos E Mistos Integrados",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04055"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04064": {
      "codigo": "ENG04064",
      "nome": "Projeto de Sistemas de RF Integrados",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG04454",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10041": {
      "codigo": "ENG10041",
      "nome": "Proteï¿½ï¿½o E Estabilidade dos Sistemas Elï¿½tricos de Potï¿½ncia",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10014": {
      "codigo": "ENG10014",
      "nome": "Qualidade de Energia Elï¿½trica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ELE99002": {
      "codigo": "ELE99002",
      "nome": "Seminï¿½rio de Acompanhamento E Prï¿½tica Extensionista de Projeto de Diplomaï¿½ï¿½o II",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 120,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ELE99001"
      ],
      "min_credits": 180,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04463": {
      "codigo": "ENG04463",
      "nome": "Tï¿½picos Especiais em Engenharia Elï¿½trica",
      "creditos": 3,
      "carga_horaria": 45,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03052": {
      "codigo": "ENG03052",
      "nome": "Anï¿½lise de Riscos Industriais",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "FIS01182",
        "MAT01354"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04067": {
      "codigo": "ENG04067",
      "nome": "Comunicaï¿½ï¿½o Digital",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04434"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04068": {
      "codigo": "ENG04068",
      "nome": "Comunicaï¿½ï¿½o Sem Fio",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04434"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03065": {
      "codigo": "ENG03065",
      "nome": "Engenharia de Reatores Nucleares",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG03062"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01126": {
      "codigo": "INF01126",
      "nome": "Estruturas de Dados I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01202"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "FIS02009": {
      "codigo": "FIS02009",
      "nome": "Explorando o Universo: dos Quarks aos Quasares",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03062": {
      "codigo": "ENG03062",
      "nome": "Fundamentos de Engenharia Nuclear",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "FIS01182",
        "MAT01354"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03050": {
      "codigo": "ENG03050",
      "nome": "Fundamentos de Proteï¿½ï¿½o Radiolï¿½gica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03063": {
      "codigo": "ENG03063",
      "nome": "Introduï¿½ï¿½o Ï¿½ Engenharia Nuclear II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG03062"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "EDU03071": {
      "codigo": "EDU03071",
      "nome": "Lï¿½ngua Brasileira de Sinais (libras)",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03049": {
      "codigo": "ENG03049",
      "nome": "Linguagem C para Engenharia",
      "creditos": 3,
      "carga_horaria": 45,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01202"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04071": {
      "codigo": "ENG04071",
      "nome": "Planejamento de Sistemas de Energia Elï¿½trica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01057": {
      "codigo": "INF01057",
      "nome": "Programaï¿½ï¿½o Orientada A Objeto",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01202"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03066": {
      "codigo": "ENG03066",
      "nome": "Tï¿½cnicas E Medidas Nucleares",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG03062"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG03064": {
      "codigo": "ENG03064",
      "nome": "Teoria dos Reatores Nucleares",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG03062"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04020": {
      "codigo": "ENG04020",
      "nome": "Tï¿½picos Especiais em Automaï¿½ï¿½o E Controle I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04027": {
      "codigo": "ENG04027",
      "nome": "Tï¿½picos Especiais em Automaï¿½ï¿½o E Controle II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04073"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04021": {
      "codigo": "ENG04021",
      "nome": "Tï¿½picos Especiais em Eletrï¿½nica de Potï¿½ncia I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04460"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04028": {
      "codigo": "ENG04028",
      "nome": "Tï¿½picos Especiais em Eletrï¿½nica de Potï¿½ncia II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04460"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04062": {
      "codigo": "ENG04062",
      "nome": "Tï¿½picos Especiais em Eletrï¿½nica I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04077"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04066": {
      "codigo": "ENG04066",
      "nome": "Tï¿½picos Especiais em Eletrï¿½nica II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04019": {
      "codigo": "ENG04019",
      "nome": "Tï¿½picos Especiais em Instrumentaï¿½ï¿½o I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04457"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04026": {
      "codigo": "ENG04026",
      "nome": "Tï¿½picos Especiais em Instrumentaï¿½ï¿½o II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04457"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04016": {
      "codigo": "ENG04016",
      "nome": "Tï¿½picos Especiais em Mï¿½quinas Elï¿½tricas I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04023": {
      "codigo": "ENG04023",
      "nome": "Tï¿½picos Especiais em Mï¿½quinas Elï¿½tricas II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04408"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04015": {
      "codigo": "ENG04015",
      "nome": "Tï¿½picos Especiais em Sistemas de Potï¿½ncia I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04022": {
      "codigo": "ENG04022",
      "nome": "Tï¿½picos Especiais em Sistemas de Potï¿½ncia II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04444"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04025": {
      "codigo": "ENG04025",
      "nome": "Tï¿½picos Especiais em Sistemas Digitais",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04461",
        "ENG04476"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04018": {
      "codigo": "ENG04018",
      "nome": "Tï¿½picos Especiais em Sistemas Digitais I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04461",
        "ENG04476"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04017": {
      "codigo": "ENG04017",
      "nome": "Tï¿½picos Especiais em Telecomunicaï¿½ï¿½es I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04434"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04024": {
      "codigo": "ENG04024",
      "nome": "Tï¿½picos Especiais em Telecomunicaï¿½ï¿½es II",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04434"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ELE99004": {
      "codigo": "ELE99004",
      "nome": "Projeto de Diplomação II - ELE (pd2)",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ELE99001",
        "ELE99003"
      ],
      "min_credits": 180,
      "periodicidade": "ambos",
      "alternativeOf": null
    }
  }
};
if (typeof globalThis !== 'undefined') {
  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM_DATA };
}
