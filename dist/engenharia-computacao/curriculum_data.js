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
      "nome": "ALGORï¿½TMOS E PROGRAMAï¿½ï¿½O - CIC",
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
      "nome": "Cï¿½LCULO E GEOMETRIA ANALï¿½TICA I - A",
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
      "nome": "Fï¿½SICA I-C",
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
      "nome": "INTRODUï¿½ï¿½O ï¿½ ENGENHARIA DE COMPUTAï¿½ï¿½O",
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
      "nome": "Lï¿½GICA PARA COMPUTAï¿½ï¿½O",
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
      "nome": "ï¿½LGEBRA LINEAR I - A",
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
      "nome": "ARQUITETURA DE COMPUTADORES",
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
      "nome": "Cï¿½LCULO E GEOMETRIA ANALï¿½TICA II - A",
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
      "nome": "ESTRUTURAS DE DADOS",
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
      "nome": "Fï¿½SICA GERAL - ELETROMAGNETISMO",
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
      "nome": "MATEMï¿½TICA DISCRETA B",
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
      "nome": "DESENVOLVIMENTO DE SOFTWARE",
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
      "nome": "EQUAï¿½ï¿½ES DIFERENCIAIS II",
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
      "nome": "Fï¿½SICA III-C",
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
      "nome": "PROJETO DE CIRCUITOS DIGITAIS",
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
      "nome": "PROJETO E ANï¿½LISE DE ALGORITMOS I",
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
      "nome": "CIRCUITOS ELï¿½TRICOS I - C",
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
      "nome": "MATEMï¿½TICA APLICADA II",
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
      "nome": "ORGANIZAï¿½ï¿½O DE COMPUTADORES",
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
      "nome": "TEORIA DA COMPUTAï¿½ï¿½O",
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
      "nome": "PROBABILIDADE E ESTATï¿½STICA",
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
      "nome": "PROBABILIDADE E ESTATï¿½STICA - EAD",
      "creditos": 4,
      "carga_horaria": 60,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "alternativa",
      "prerequisitos": [
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "MAT02219"
    },
    "INF01146": {
      "codigo": "INF01146",
      "nome": "AVALIAï¿½ï¿½O DE DESEMPENHO",
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
      "nome": "CIRCUITOS ELï¿½TRICOS II - C",
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
      "nome": "ENGENHARIA DE SOFTWARE N",
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
      "nome": "INTRODUï¿½ï¿½O ï¿½ PESQUISA EM INFORMï¿½TICA",
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
      "nome": "SISTEMAS DIGITAIS PARA COMPUTADORES A",
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
      "nome": "SISTEMAS OPERACIONAIS I N",
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
      "nome": "TEORIA ELETROMAGNï¿½TICA E ONDAS",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS I",
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
      "nome": "CONCEPï¿½ï¿½O DE CIRCUITOS INTEGRADOS I",
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
      "nome": "INTELIGï¿½NCIA ARTIFICIAL",
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
      "nome": "LABORATï¿½RIO DE CIRCUITOS ELï¿½TRICOS",
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
      "nome": "LABORATï¿½RIO DE REDES DE COMPUTADORES",
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
      "nome": "REDES DE COMPUTADORES E INTERNET",
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
      "nome": "SISTEMAS E SINAIS",
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
      "nome": "ARQUITETURAS AVANï¿½ADAS DE COMPUTADORES",
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
      "nome": "Cï¿½LCULO NUMï¿½RICO",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS II",
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
      "nome": "COMPUTAï¿½ï¿½O GRï¿½FICA E VISUALIZAï¿½ï¿½O I",
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
      "nome": "CONCEPï¿½ï¿½O DE CIRCUITOS INTEGRADOS II",
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
      "nome": "ESPECIFICAï¿½ï¿½O FORMAL N",
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
      "nome": "FUNDAMENTOS DE TOLERï¿½NCIA A FALHAS",
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
      "nome": "LINGUAGENS DE PROGRAMAï¿½ï¿½O I",
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
      "nome": "MICROCONTROLADORES",
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
      "nome": "SISTEMAS DE CONTROLE I - B",
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
      "nome": "SISTEMAS DISTRIBUï¿½DOS E TOLERANTES A FALHAS",
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
      "nome": "APRENDIZADO DE Mï¿½QUINA",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS INTEGRADOS",
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
      "nome": "CIRCUITOS INTEGRADOS ANALï¿½GICOS",
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
      "nome": "ECONOMIA A",
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
      "nome": "LABORATï¿½RIO DE CONTROLE",
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
      "nome": "LINGUAGENS DE PROGRAMAï¿½ï¿½O II",
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
      "nome": "PROCESSAMENTO DE IMAGENS E VISï¿½O COMPUTACIONAL I",
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
      "nome": "PROGRAMAï¿½ï¿½O PARALELA",
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
      "nome": "ROBï¿½TICA A",
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
      "nome": "SERVIï¿½OS AVANï¿½ADOS EM REDES DE COMPUTADORES",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O III",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O V",
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
      "nome": "ADMINISTRAï¿½ï¿½O E FINANï¿½AS",
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
      "nome": "CAD PARA SISTEMAS DIGITAIS",
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
      "nome": "CIBERSEGURANï¿½A",
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
      "nome": "COMUNICAï¿½ï¿½O DE DADOS E TECNOLOGIAS DE REDES EMERGENTES",
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
      "nome": "DINï¿½MICA E CONTROLE DE ROBï¿½S",
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
      "nome": "INSTRUMENTAï¿½ï¿½O A",
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
      "nome": "LABORATï¿½RIO DE ROBï¿½TICA",
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
      "nome": "MICROPROCESSADORES II",
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
      "nome": "PROJETO DE FINAL DE CURSO DE ENGENHARIA DE COMPUTAï¿½ï¿½O",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01034": {
      "codigo": "INF01034",
      "nome": "ROBï¿½TICA Mï¿½VEL INTELIGENTE",
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
      "nome": "SISTEMAS DE CONTROLE DIGITAIS",
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
      "nome": "SISTEMAS DE CONTROLE II",
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
      "nome": "SOCIEDADE DA INFORMAï¿½ï¿½O",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O IV",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O VI",
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
      "nome": "BANCOS DE DADOS",
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
      "nome": "DISPOSITIVOS SEMICONDUTORES",
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
      "nome": "EMPREENDIMENTO EM INFORMï¿½TICA",
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
      "nome": "FOTOGRAFIA COMPUTACIONAL",
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
      "nome": "Lï¿½NGUA BRASILEIRA DE SINAIS (LIBRAS)",
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
      "nome": "PRINCï¿½PIOS DE COMUNICAï¿½ï¿½O",
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
      "nome": "PROCESSAMENTO DIGITAL DE SINAIS",
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
      "nome": "SISTEMAS EMBARCADOS: FUNDAMENTOS E ARQUITETURAS",
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
      "nome": "TESTE DE SISTEMAS ELETRï¿½NICOS",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O VII",
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
      "nome": "APRENDIZADO PROFUNDO PARA COMPUTAï¿½ï¿½O VISUAL",
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
      "nome": "ARQUITETURA E ORGANIZAï¿½ï¿½O DE COMPUTADORES II",
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
      "nome": "COMPLEXIDADE DE ALGORITMOS - B",
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
      "nome": "ELETRï¿½NICA III",
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
      "nome": "GERï¿½NCIA E APLICAï¿½ï¿½ES EM REDES",
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
      "nome": "INTRODUï¿½ï¿½O ï¿½ ARQUITETURA DE COMPUTADORES",
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
      "nome": "MODELAGEM E GERENCIAMENTO DE PROCESSOS DE NEGï¿½CIO",
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
      "nome": "MODELOS DE LINGUAGEM DE PROGRAMAï¿½ï¿½O",
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
      "nome": "PROJETO DE SISTEMAS ANALï¿½GICOS E MISTOS INTEGRADOS",
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
      "nome": "PROJETO DE SISTEMAS DE RF INTEGRADOS",
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
      "nome": "PROJETO E ANï¿½LISE DE ALGORITMOS II",
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
      "nome": "ROBï¿½TICA Mï¿½VEL",
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
      "nome": "SISTEMAS DE TEMPO REAL - I",
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
      "nome": "SISTEMAS OPERACIONAIS DISTRIBUï¿½DOS E DE REDES",
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
      "nome": "TEORIA DOS GRAFOS E ANï¿½LISE COMBINATï¿½RIA",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O IX",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O VII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O VIII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XL",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLI",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLIII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLIV",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLV",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XLVI",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XV",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XXXIX",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XXXVII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM COMPUTAï¿½ï¿½O XXXVIII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O IX",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O VIII",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA DE COMPUTAï¿½ï¿½O X",
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
      "nome": "VISï¿½O COMPUTACIONAL II",
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
      "nome": "TRABALHO DE GRADUAÇÃO I - ECP",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 150,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ECP99004": {
      "codigo": "ECP99004",
      "nome": "TRABALHO DE GRADUAÇÃO II - ECP",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ECP99001",
        "ECP99003"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM_DATA };
}
