/**
 * Base Curricular Oficial - Engenharia de Computação (UFRGS)
 * Catálogo 2026/1
 */
var CURRICULUM_DATA = {
  "curso": "Engenharia de Computação",
  "codigo": 318,
  "habilitacao": 72,
  "instituicao": "UFRGS",
  "versao_catalogo": "2026/1",
  "estatisticas_nominais": {
    "creditos_obrigatorios": 148,
    "creditos_eletivos": 46,
    "creditos_complementares": 6,
    "creditos_convertidos": 16,
    "creditos_totais_diplomacao": 216,
    "carga_horaria_obrigatoria": 2460,
    "carga_horaria_eletiva": 690,
    "carga_horaria_total": 3600,
    "horas_extensao_diplomacao": 360
  },
  "disciplinas": {
    "INF01202": {
      "codigo": "INF01202",
      "nome": "Algorï¿½tmos E Programaï¿½ï¿½o - CIC",
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
      "alternativeOf": null
    },
    "ECP99002": {
      "codigo": "ECP99002",
      "nome": "Introduï¿½ï¿½o Ï¿½ Engenharia de Computaï¿½ï¿½o",
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
    "INF05508": {
      "codigo": "INF05508",
      "nome": "Lï¿½gica para Computaï¿½ï¿½o",
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
    "MAT01355": {
      "codigo": "MAT01355",
      "nome": "Ï¿½lgebra Linear I - A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01075": {
      "codigo": "INF01075",
      "nome": "Arquitetura de Computadores",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ECP99002",
        "INF01202"
      ],
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
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01203": {
      "codigo": "INF01203",
      "nome": "Estruturas de Dados",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01202"
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
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01181",
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "MAT01375": {
      "codigo": "MAT01375",
      "nome": "Matemï¿½tica Discreta B",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 2,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01120": {
      "codigo": "INF01120",
      "nome": "Desenvolvimento de Software",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01203"
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
    "FIS01183": {
      "codigo": "FIS01183",
      "nome": "Fï¿½sica III-C",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01182"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01086": {
      "codigo": "INF01086",
      "nome": "Projeto de Circuitos Digitais",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05027": {
      "codigo": "INF05027",
      "nome": "Projeto E Anï¿½lise de Algoritmos I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 3,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01203",
        "MAT01353",
        "MAT01375"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10001": {
      "codigo": "ENG10001",
      "nome": "Circuitos Elï¿½tricos I - C",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01182",
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
    "INF01113": {
      "codigo": "INF01113",
      "nome": "Organizaï¿½ï¿½o de Computadores",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01086"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05035": {
      "codigo": "INF05035",
      "nome": "Teoria da Computaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF05508",
        "MAT01375"
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
      "etapa_sugerida": 4,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "MAT02050"
    },
    "MAT02050": {
      "codigo": "MAT02050",
      "nome": "Probabilidade E Estatï¿½stica - EAD",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "Alternativa",
      "prerequisitos": [
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "MAT02219"
    },
    "INF01146": {
      "codigo": "INF01146",
      "nome": "Avaliaï¿½ï¿½o de Desempenho",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "eletiva",
      "prerequisitos": [
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10002": {
      "codigo": "ENG10002",
      "nome": "Circuitos Elï¿½tricos II - C",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG10001",
        "MAT01168"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01127": {
      "codigo": "INF01127",
      "nome": "Engenharia de Software N",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01120"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01049": {
      "codigo": "INF01049",
      "nome": "Introduï¿½ï¿½o Ï¿½ Pesquisa em Informï¿½tica",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01175": {
      "codigo": "INF01175",
      "nome": "Sistemas Digitais para Computadores A",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01086"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01142": {
      "codigo": "INF01142",
      "nome": "Sistemas Operacionais I N",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01075",
        "INF01203"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04010": {
      "codigo": "ENG04010",
      "nome": "Teoria Eletromagnï¿½tica E Ondas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 5,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "FIS01183",
        "MAT01168"
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
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG10002"
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
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG10001",
        "INF01086"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01048": {
      "codigo": "INF01048",
      "nome": "Inteligï¿½ncia Artificial",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF05027",
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10003": {
      "codigo": "ENG10003",
      "nome": "Laboratï¿½rio de Circuitos Elï¿½tricos",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ENG10002"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01082": {
      "codigo": "INF01082",
      "nome": "Laboratï¿½rio de Redes de Computadores",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01084": {
      "codigo": "INF01084",
      "nome": "Redes de Computadores E Internet",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 6,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01075"
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
      "etapa_sugerida": 6,
      "tipo": "eletiva",
      "prerequisitos": [
        "MAT01168"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01191": {
      "codigo": "INF01191",
      "nome": "Arquiteturas Avanï¿½adas de Computadores",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01113"
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
      "etapa_sugerida": 8,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203",
        "MAT01167"
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
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04077",
        "ENG10002"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01047": {
      "codigo": "INF01047",
      "nome": "Computaï¿½ï¿½o Grï¿½fica E Visualizaï¿½ï¿½o I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203",
        "MAT01354",
        "MAT01355"
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
      "etapa_sugerida": 7,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01175",
        "INF01185"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01001": {
      "codigo": "INF01001",
      "nome": "Especificaï¿½ï¿½o Formal N",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF05035"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01209": {
      "codigo": "INF01209",
      "nome": "Fundamentos de Tolerï¿½ncia A Falhas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01142"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05029": {
      "codigo": "INF05029",
      "nome": "Linguagens de Programaï¿½ï¿½o I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203",
        "INF05035"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10032": {
      "codigo": "ENG10032",
      "nome": "Microcontroladores",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04077",
        "INF01075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10004": {
      "codigo": "ENG10004",
      "nome": "Sistemas de Controle I - B",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01085": {
      "codigo": "INF01085",
      "nome": "Sistemas Distribuï¿½dos E Tolerantes A Falhas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "INF01142"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01017": {
      "codigo": "INF01017",
      "nome": "Aprendizado de Mï¿½quina",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203",
        "MAT01354",
        "MAT01355",
        "MAT02219",
        "MAT02050"
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04010",
        "ENG04078"
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01185"
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10005": {
      "codigo": "ENG10005",
      "nome": "Laboratï¿½rio de Controle",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10004"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01083": {
      "codigo": "INF01083",
      "nome": "Linguagens de Programaï¿½ï¿½o II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01075",
        "INF05029"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01046": {
      "codigo": "INF01046",
      "nome": "Processamento de Imagens E Visï¿½o Computacional I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203",
        "MAT01354",
        "MAT01355"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01008": {
      "codigo": "INF01008",
      "nome": "Programaï¿½ï¿½o Paralela",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01142"
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
        "ENG10017",
        "ENG10032"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01002": {
      "codigo": "INF01002",
      "nome": "Serviï¿½os Avanï¿½ados em Redes de Computadores",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01084"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01050": {
      "codigo": "INF01050",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04041": {
      "codigo": "ENG04041",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o III",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05024": {
      "codigo": "INF05024",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o V",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
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
      "tipo": "eletiva",
      "prerequisitos": [],
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01175",
        "INF01203"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01045": {
      "codigo": "INF01045",
      "nome": "Ciberseguranï¿½a",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "MAT01375",
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01005": {
      "codigo": "INF01005",
      "nome": "Comunicaï¿½ï¿½o de Dados E Tecnologias de Redes Emergentes",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01084"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10051": {
      "codigo": "ENG10051",
      "nome": "Dinï¿½mica E Controle de Robï¿½s",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10004",
        "ENG10026"
      ],
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04077",
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10052": {
      "codigo": "ENG10052",
      "nome": "Laboratï¿½rio de Robï¿½tica",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10026"
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10032"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ECP99001": {
      "codigo": "ECP99001",
      "nome": "Projeto de Final de Curso de Engenharia de Computaï¿½ï¿½o",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 150,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01034": {
      "codigo": "INF01034",
      "nome": "Robï¿½tica Mï¿½vel Inteligente",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01120",
        "INF05027",
        "MAT02219",
        "MAT02050"
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
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10004"
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
        "ENG10004"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "HUM04020": {
      "codigo": "HUM04020",
      "nome": "Sociedade da Informaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04034": {
      "codigo": "ENG04034",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01053": {
      "codigo": "INF01053",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o IV",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05025": {
      "codigo": "INF05025",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o VI",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01145": {
      "codigo": "INF01145",
      "nome": "Bancos de Dados",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01203"
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
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04010",
        "INF01185"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01032": {
      "codigo": "INF01032",
      "nome": "Empreendimento em Informï¿½tica",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01213": {
      "codigo": "INF01213",
      "nome": "Fotografia Computacional",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01046"
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
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [],
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
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04010",
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
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10017",
        "ENG10032"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01059": {
      "codigo": "INF01059",
      "nome": "Sistemas Embarcados: Fundamentos E Arquiteturas",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01086",
        "INF01142"
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
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01113",
        "INF01185"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05026": {
      "codigo": "INF05026",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o VII",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01081": {
      "codigo": "INF01081",
      "nome": "Aprendizado Profundo para Computaï¿½ï¿½o Visual",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01202",
        "MAT01354",
        "MAT01355",
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01112": {
      "codigo": "INF01112",
      "nome": "Arquitetura E Organizaï¿½ï¿½o de Computadores II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01075"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05515": {
      "codigo": "INF05515",
      "nome": "Complexidade de Algoritmos - B",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF05027",
        "INF05035"
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
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04078",
        "ENG10017"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01015": {
      "codigo": "INF01015",
      "nome": "Gerï¿½ncia E Aplicaï¿½ï¿½es em Redes",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01084"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01107": {
      "codigo": "INF01107",
      "nome": "Introduï¿½ï¿½o Ï¿½ Arquitetura de Computadores",
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
    "INF01216": {
      "codigo": "INF01216",
      "nome": "Modelagem E Gerenciamento de Processos de Negï¿½cio",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01127"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01121": {
      "codigo": "INF01121",
      "nome": "Modelos de Linguagem de Programaï¿½ï¿½o",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF05027"
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
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04055",
        "ENG04078",
        "INF01185"
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
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG04010",
        "ENG04055",
        "ENG04078",
        "INF01185"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05028": {
      "codigo": "INF05028",
      "nome": "Projeto E Anï¿½lise de Algoritmos II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF05027"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10054": {
      "codigo": "ENG10054",
      "nome": "Robï¿½tica Mï¿½vel",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "ENG10017",
        "INF01120",
        "MAT02219",
        "MAT02050"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10055": {
      "codigo": "ENG10055",
      "nome": "Sistemas de Tempo Real - I",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01113"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01018": {
      "codigo": "INF01018",
      "nome": "Sistemas Operacionais Distribuï¿½dos E de Redes",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01085"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05512": {
      "codigo": "INF05512",
      "nome": "Teoria dos Grafos E Anï¿½lise Combinatï¿½ria",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "MAT01375"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF05009": {
      "codigo": "INF05009",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o IX",
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
    "INF01054": {
      "codigo": "INF01054",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o VII",
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
    "INF01055": {
      "codigo": "INF01055",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o VIII",
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
    "INF01063": {
      "codigo": "INF01063",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xii",
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
    "INF01079": {
      "codigo": "INF01079",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xl",
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
    "INF01080": {
      "codigo": "INF01080",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xli",
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
    "INF05030": {
      "codigo": "INF05030",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xlii",
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
    "INF05031": {
      "codigo": "INF05031",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xliii",
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
    "INF05032": {
      "codigo": "INF05032",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xliv",
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
    "INF05033": {
      "codigo": "INF05033",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xlv",
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
    "INF05034": {
      "codigo": "INF05034",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xlvi",
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
    "INF05013": {
      "codigo": "INF05013",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xv",
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
    "INF01078": {
      "codigo": "INF01078",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xxxix",
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
    "INF01076": {
      "codigo": "INF01076",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xxxvii",
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
    "INF01077": {
      "codigo": "INF01077",
      "nome": "Tï¿½picos Especiais em Computaï¿½ï¿½o Xxxviii",
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
    "ENG10057": {
      "codigo": "ENG10057",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o IX",
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
    "ENG10056": {
      "codigo": "ENG10056",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o VIII",
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
    "ENG10058": {
      "codigo": "ENG10058",
      "nome": "Tï¿½picos Especiais em Engenharia de Computaï¿½ï¿½o X",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01030": {
      "codigo": "INF01030",
      "nome": "Visï¿½o Computacional II",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "eletiva",
      "prerequisitos": [
        "INF01046"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ECP99003": {
      "codigo": "ECP99003",
      "nome": "Trabalho de Graduação I - ECP",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 150,
      "periodicidade": "ambos",
      "alternativeOf": null,
      "originalSemester": 9
    },
    "ECP99004": {
      "codigo": "ECP99004",
      "nome": "Trabalho de Graduação II - ECP",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ECP99001",
        "ECP99003"
      ],
      "min_credits": 180,
      "periodicidade": "ambos",
      "alternativeOf": null,
      "originalSemester": 10
    }
  }
};
if (typeof globalThis !== 'undefined') {
  globalThis.CURRICULUM_DATA = CURRICULUM_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM_DATA };
}
