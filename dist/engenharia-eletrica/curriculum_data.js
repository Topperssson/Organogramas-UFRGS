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
      "nome": "APRENDIZAGEM AUTï¿½NOMA I",
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
    "ARQ03318": {
      "codigo": "ARQ03318",
      "nome": "DESENHO Tï¿½CNICO I-A",
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
      "nome": "GEOMETRIA DESCRITIVA II-A",
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
      "nome": "INTRODUï¿½ï¿½O ï¿½ ENGENHARIA ELï¿½TRICA - B",
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
      "nome": "Fï¿½SICA I - E",
      "creditos": 6,
      "carga_horaria": 90,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "FIS01181"
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
      "alternativeOf": "FIS01080"
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
        "ENG04079",
        "MAT01353"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "INF01202": {
      "codigo": "INF01202",
      "nome": "ALGORï¿½TMOS E PROGRAMAï¿½ï¿½O - CIC",
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
      "nome": "Cï¿½LCULO E GEOMETRIA ANALï¿½TICA II - A",
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
      "nome": "DESENHO Tï¿½CNICO II-A",
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
      "nome": "Fï¿½SICA III-C",
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
      "nome": "QUï¿½MICA FUNDAMENTAL",
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
      "nome": "ELETRï¿½NICA DIGITAL I",
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
    "FIS01184": {
      "codigo": "FIS01184",
      "nome": "Fï¿½SICA IV-C",
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
      "nome": "MECï¿½NICA",
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
      "nome": "TEORIA DE CIRCUITOS I",
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
      "nome": "Cï¿½LCULO NUMï¿½RICO",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS I",
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
      "nome": "Fï¿½SICA GERAL - ELETROMAGNETISMO",
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
    "INF01212": {
      "codigo": "INF01212",
      "nome": "METODOLOGIA DE PROGRAMAï¿½ï¿½O",
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
      "nome": "TEORIA DE CIRCUITOS II",
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
      "nome": "ANï¿½LISE DE CIRCUITOS III",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS II",
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
      "nome": "HIDRï¿½ULICA E HIDROLOGIA APLICADA II",
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
      "nome": "MATERIAIS ELï¿½TRICOS E MAGNï¿½TICOS",
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
      "nome": "SISTEMAS E SINAIS",
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
      "nome": "TEORIA ELETROMAGNï¿½TICA APLICADA A",
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
      "nome": "APROVEITAMENTOS HIDROELï¿½TRICOS",
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
      "nome": "CIRCUITOS ELETRï¿½NICOS INTEGRADOS",
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
      "nome": "CONCEPï¿½ï¿½O DE CIRCUITOS INTEGRADOS I",
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
      "nome": "CONVERSï¿½O ELETROMECï¿½NICA DE ENERGIA I",
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
      "nome": "ELETRï¿½NICA III",
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
      "nome": "MICROPROCESSADORES I",
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
      "nome": "ONDAS ELETROMAGNï¿½TICAS",
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
      "nome": "PROBABILIDADE E ESTATï¿½STICA",
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
      "nome": "SISTEMAS DE CONTROLE ELETROELETRï¿½NICOS",
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
      "nome": "SISTEMAS DIGITAIS",
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
      "nome": "FUNDAMENTOS DE ENGENHARIA DE SEGURANï¿½A DO TRABALHO - ELE",
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
      "nome": "GESTï¿½O DA SEGURANï¿½A E SAï¿½DE NO TRABALHO",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "ENG03055"
    },
    "MED05011": {
      "codigo": "MED05011",
      "nome": "HIGIENE E SEGURANï¿½A DO TRABALHO - A",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 7,
      "tipo": "alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04436": {
      "codigo": "ENG04436",
      "nome": "ANTENAS E PROPAGAï¿½ï¿½O",
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
      "nome": "APLICAï¿½ï¿½ES INDUSTRIAIS DA ELETRï¿½NICA",
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
      "nome": "AUTOMAï¿½ï¿½O E CONTROLE",
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
      "nome": "CONCEPï¿½ï¿½O DE CIRCUITOS INTEGRADOS II",
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
      "nome": "CONVERSï¿½O ELETROMECï¿½NICA DE ENERGIA II",
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
      "nome": "DISPOSITIVOS SEMICONDUTORES",
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
      "nome": "ENGENHARIA ECONï¿½MICA E AVALIAï¿½ï¿½ES",
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
      "nome": "INSTRUMENTAï¿½ï¿½O A",
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
      "nome": "SISTEMAS DE AUTOMAï¿½ï¿½O",
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
      "nome": "SISTEMAS DE CONTROLE II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ELETROMAGNETISMO APLICADO",
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
      "nome": "CIï¿½NCIA, TECNOLOGIA E AMBIENTE",
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
      "nome": "FUNDAMENTO DE ECOLOGIA APLICADA - A",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": null,
      "tipo": "alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": "ENG03010"
    },
    "ENG09028": {
      "codigo": "ENG09028",
      "nome": "GESTï¿½O AMBIENTAL",
      "creditos": 2,
      "carga_horaria": 30,
      "horas_extensao": 0,
      "etapa_sugerida": 9,
      "tipo": "alternativa",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04444": {
      "codigo": "ENG04444",
      "nome": "ANï¿½LISE DE SISTEMAS DE POTï¿½NCIA",
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
      "nome": "CAD PARA SISTEMAS DIGITAIS",
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
      "nome": "CENTRAIS TERMOELï¿½TRICAS",
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
      "nome": "CIRCUITOS INTEGRADOS ANALï¿½GICOS",
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
      "nome": "DINï¿½MICA DE DISPOSITIVOS ELETROMAGNï¿½TICOS",
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
      "nome": "ECONOMIA A",
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
      "nome": "ELETRï¿½NICA DAS COMUNICAï¿½ï¿½ES - A",
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
      "nome": "INSTALAï¿½ï¿½ES ELï¿½TRICAS",
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
      "nome": "MICROPROCESSADORES II",
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
      "nome": "PRINCï¿½PIOS DE COMUNICAï¿½ï¿½O",
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
      "nome": "PROCESSAMENTO DIGITAL DE SINAIS",
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
      "nome": "RESISTï¿½NCIA DOS MATERIAIS A",
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
      "nome": "SISTEMAS DE CONTROLE DIGITAIS",
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
      "nome": "TELEFONIA A",
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
      "nome": "TEORIA DA INFORMAï¿½ï¿½O - A",
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
      "nome": "Tï¿½PICOS JURï¿½DICOS E SOCIAIS",
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
      "nome": "ADMINISTRAï¿½ï¿½O E FINANï¿½AS",
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
      "nome": "CENTRAIS HIDROELï¿½TRICAS",
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
      "nome": "COMUNICAï¿½ï¿½ES ï¿½TICAS",
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
      "nome": "MICROONDAS I",
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
      "nome": "PROJETO DE DISPOSITIVOS ELETROMAGNï¿½TICOS",
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
      "nome": "ROBï¿½TICA A",
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
      "nome": "PROJETO DE DIPLOMAÇÃO I - ELE (PD1)",
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
      "nome": "SEMINï¿½RIO DE ACOMPANHAMENTO E PRï¿½TICA EXTENSIONISTA DE PROJETO DE DIPLOMAï¿½ï¿½O I",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 120,
      "etapa_sugerida": 9,
      "tipo": "obrigatoria",
      "prerequisitos": [],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG10039": {
      "codigo": "ENG10039",
      "nome": "SISTEMAS DE DISTRIBUIï¿½ï¿½O DE ENERGIA ELï¿½TRICA",
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
      "nome": "SISTEMAS DE TELEVISï¿½O",
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
      "nome": "SISTEMAS DE TRANSMISSï¿½O DE ENERGIA ELï¿½TRICA",
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
      "nome": "SUBESTAï¿½ï¿½ES DE ALTA TENSï¿½O",
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
      "nome": "TESTE DE SISTEMAS ELETRï¿½NICOS",
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
      "nome": "Tï¿½PICOS ESPECIAIS DE ENGENHARIA ELï¿½TRICA I",
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
      "nome": "TRANSITï¿½RIOS EM SISTEMAS DE POTï¿½NCIA",
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
      "nome": "ACIONAMENTO DE Mï¿½QUINAS ELï¿½TRICAS",
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
      "nome": "MICROONDAS II",
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
      "nome": "PROJETO DE SISTEMAS ANALï¿½GICOS E MISTOS INTEGRADOS",
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
      "nome": "PROJETO DE SISTEMAS DE RF INTEGRADOS",
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
      "nome": "PROTEï¿½ï¿½O E ESTABILIDADE DOS SISTEMAS ELï¿½TRICOS DE POTï¿½NCIA",
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
      "nome": "QUALIDADE DE ENERGIA ELï¿½TRICA",
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
      "nome": "SEMINï¿½RIO DE ACOMPANHAMENTO E PRï¿½TICA EXTENSIONISTA DE PROJETO DE DIPLOMAï¿½ï¿½O II",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 120,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ELE99001"
      ],
      "min_credits": 0,
      "periodicidade": "ambos",
      "alternativeOf": null
    },
    "ENG04463": {
      "codigo": "ENG04463",
      "nome": "Tï¿½PICOS ESPECIAIS EM ENGENHARIA ELï¿½TRICA",
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
      "nome": "ANï¿½LISE DE RISCOS INDUSTRIAIS",
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
      "nome": "COMUNICAï¿½ï¿½O DIGITAL",
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
      "nome": "COMUNICAï¿½ï¿½O SEM FIO",
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
      "nome": "ENGENHARIA DE REATORES NUCLEARES",
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
      "nome": "ESTRUTURAS DE DADOS I",
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
      "nome": "EXPLORANDO O UNIVERSO: DOS QUARKS AOS QUASARES",
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
      "nome": "FUNDAMENTOS DE ENGENHARIA NUCLEAR",
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
      "nome": "FUNDAMENTOS DE PROTEï¿½ï¿½O RADIOLï¿½GICA",
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
      "nome": "INTRODUï¿½ï¿½O ï¿½ ENGENHARIA NUCLEAR II",
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
      "nome": "Lï¿½NGUA BRASILEIRA DE SINAIS (LIBRAS)",
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
      "nome": "LINGUAGEM C PARA ENGENHARIA",
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
      "nome": "PLANEJAMENTO DE SISTEMAS DE ENERGIA ELï¿½TRICA",
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
      "nome": "PROGRAMAï¿½ï¿½O ORIENTADA A OBJETO",
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
      "nome": "Tï¿½CNICAS E MEDIDAS NUCLEARES",
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
      "nome": "TEORIA DOS REATORES NUCLEARES",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM AUTOMAï¿½ï¿½O E CONTROLE I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM AUTOMAï¿½ï¿½O E CONTROLE II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ELETRï¿½NICA DE POTï¿½NCIA I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ELETRï¿½NICA DE POTï¿½NCIA II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ELETRï¿½NICA I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM ELETRï¿½NICA II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM INSTRUMENTAï¿½ï¿½O I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM INSTRUMENTAï¿½ï¿½O II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM Mï¿½QUINAS ELï¿½TRICAS I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM Mï¿½QUINAS ELï¿½TRICAS II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM SISTEMAS DE POTï¿½NCIA I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM SISTEMAS DE POTï¿½NCIA II",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM SISTEMAS DIGITAIS",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM SISTEMAS DIGITAIS I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM TELECOMUNICAï¿½ï¿½ES I",
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
      "nome": "Tï¿½PICOS ESPECIAIS EM TELECOMUNICAï¿½ï¿½ES II",
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
      "nome": "PROJETO DE DIPLOMAÇÃO II - ELE (PD2)",
      "creditos": 10,
      "carga_horaria": 150,
      "horas_extensao": 0,
      "etapa_sugerida": 10,
      "tipo": "obrigatoria",
      "prerequisitos": [
        "ELE99001",
        "ELE99003"
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
