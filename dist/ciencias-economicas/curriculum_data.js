/**
 * Base Curricular Oficial Unificada - Ciências Econômicas (UFRGS)
 * Catálogo Oficial COMGRAD Economia 2026/1 - Modalidades Diurno e Noturno
 */
var ECONOMIA_CURRICULA = {
  "diurno": {
    "label": "Ciências Econômicas (diurno)",
    "shift": "diurno",
    "curso": "Ciências Econômicas",
    "codigo": 309,
    "habilitacao": 56,
    "curriculo": 180,
    "instituicao": "UFRGS",
    "versao_catalogo": "2026/1",
    "totalMandatoryCredits": 128,
    "totalElectiveCredits": 44,
    "totalTargetCredits": 172,
    "maxStage": 8,
    "estatisticas_nominais": {
      "creditos_obrigatorios": 128,
      "creditos_eletivos": 44,
      "creditos_complementares": 0,
      "creditos_convertidos": 0,
      "creditos_totais_diplomacao": 172,
      "carga_horaria_obrigatoria": 2100,
      "carga_horaria_eletiva": 660,
      "carga_horaria_total": 3000,
      "horas_extensao_diplomacao": 300
    },
    "disciplinas": {
      "ECO02274": {
        "codigo": "ECO02274",
        "nome": "Técnica de Pesquisa E Projeto do Trabalho de Diplomação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "TRABALHO": {
        "codigo": "Trabalho",
        "nome": "Trabalho de Diplomação - ECO",
        "creditos": 0,
        "carga_horaria": 180,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02274"
        ],
        "corequisitos": [],
        "min_credits": 140,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02104": {
        "codigo": "ECO02104",
        "nome": "Trabalho de Pesquisa Científica em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02274"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02011": {
        "codigo": "ECO02011",
        "nome": "Elaboração E Análise de Projetos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01031",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02001": {
        "codigo": "ECO02001",
        "nome": "Economia Matemática A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01355",
          "MAT01025",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02006": {
        "codigo": "ECO02006",
        "nome": "Economia Internacional II - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02004"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02012": {
        "codigo": "ECO02012",
        "nome": "Economia do Setor Público",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02009": {
        "codigo": "ECO02009",
        "nome": "Economia Brasileira Contempornea II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02013",
          "ECO02125"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02013": {
        "codigo": "ECO02013",
        "nome": "Economia Brasileira Contempornea I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02258",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "ECO02125"
      },
      "ECO02125": {
        "codigo": "ECO02125",
        "nome": "Economia Brasileira Contempornea I - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02258",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "ECO02013"
      },
      "ECO02002": {
        "codigo": "ECO02002",
        "nome": "Economia Monetária I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02249": {
        "codigo": "ECO02249",
        "nome": "Desenvolvimento Sócio-Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02208": {
        "codigo": "MAT02208",
        "nome": "Econometria",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT02207"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02278": {
        "codigo": "ECO02278",
        "nome": "Teoria Microeconômica II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02004": {
        "codigo": "ECO02004",
        "nome": "Economia Internacional I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02237": {
        "codigo": "ECO02237",
        "nome": "Teoria Macroeconômica II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02010": {
        "codigo": "ECO02010",
        "nome": "Economia Política - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02245"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02236": {
        "codigo": "ECO02236",
        "nome": "Teoria Macroeconômica I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02215"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02003": {
        "codigo": "ECO02003",
        "nome": "Economia Industrial A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02075": {
        "codigo": "ECO02075",
        "nome": "Economia Rural",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 56,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02215": {
        "codigo": "ECO02215",
        "nome": "Contabilidade Social",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02246": {
        "codigo": "ECO02246",
        "nome": "História do Pensamento Econômico II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02245"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02245": {
        "codigo": "ECO02245",
        "nome": "História do Pensamento Econômico I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02257"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02207": {
        "codigo": "MAT02207",
        "nome": "Estatística Econômica",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01355",
          "MAT02215",
          "MAT02051",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02277": {
        "codigo": "ECO02277",
        "nome": "Teoria Microeconômica I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01025",
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01025": {
        "codigo": "MAT01025",
        "nome": "Cálculo Diferencial E Integral II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02258": {
        "codigo": "ECO02258",
        "nome": "Formação Econômica do Brasil",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02257",
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01355": {
        "codigo": "MAT01355",
        "nome": "Álgebra Linear I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01214"
      },
      "MAT01214": {
        "codigo": "MAT01214",
        "nome": "Álgebra Linear I - A - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01355"
      },
      "MAT02051": {
        "codigo": "MAT02051",
        "nome": "Estatística Geral II - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01218",
          "MAT02214",
          "MAT02052",
          "MAT01109"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02215"
      },
      "ECO02257": {
        "codigo": "ECO02257",
        "nome": "História Econômica Geral",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02215": {
        "codigo": "MAT02215",
        "nome": "Estatística Geral II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT02214",
          "MAT02052",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02051"
      },
      "ECO02276": {
        "codigo": "ECO02276",
        "nome": "Introdução A Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03037": {
        "codigo": "ECO03037",
        "nome": "Contabilidade E Análise das Demonstrações Contábeis",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01218": {
        "codigo": "MAT01218",
        "nome": "Cálculo Diferencial E Integral - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01109"
      },
      "MAT01031": {
        "codigo": "MAT01031",
        "nome": "Matemática Financeira - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02052": {
        "codigo": "MAT02052",
        "nome": "Estatística Geral I - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02214"
      },
      "MAT02214": {
        "codigo": "MAT02214",
        "nome": "Estatística Geral I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02052"
      },
      "ADM01101": {
        "codigo": "ADM01101",
        "nome": "Introdução à Administração",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01115": {
        "codigo": "ADM01115",
        "nome": "Teorias Organizacionais II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01109": {
        "codigo": "MAT01109",
        "nome": "Cálculo Diferencial E Integral",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01218"
      },
      "DIR02204": {
        "codigo": "DIR02204",
        "nome": "Instituições de Direito",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02008": {
        "codigo": "DIR02008",
        "nome": "Direito da Integração",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR04401": {
        "codigo": "DIR04401",
        "nome": "Introdução ao Direito do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01120": {
        "codigo": "ADM01120",
        "nome": "Pesquisa Operacional I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01355",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01131": {
        "codigo": "ADM01131",
        "nome": "Administração de Carteira de Investimentos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01129"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01121": {
        "codigo": "ADM01121",
        "nome": "Pesquisa Operacional II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01120"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01129": {
        "codigo": "ADM01129",
        "nome": "Administração Financeira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "MAT01031"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02260": {
        "codigo": "DIR02260",
        "nome": "Direito Comercial",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "DIR02204"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR04416": {
        "codigo": "DIR04416",
        "nome": "Instituições de Direito Público E Legislação Tributária",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02271": {
        "codigo": "DIR02271",
        "nome": "Direito Societário",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "DIR02204"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01136": {
        "codigo": "ADM01136",
        "nome": "Organização da Produção",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01101"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02005": {
        "codigo": "ECO02005",
        "nome": "Economia Monetária II - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02007": {
        "codigo": "ECO02007",
        "nome": "Econometria Aplicada",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02008": {
        "codigo": "ECO02008",
        "nome": "Economia da Tecnologia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02015": {
        "codigo": "ECO02015",
        "nome": "Estado E Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02014": {
        "codigo": "ECO02014",
        "nome": "Teoria do Capital E Distribuição",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02010"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02017": {
        "codigo": "ECO02017",
        "nome": "Economia de Empresas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02003"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02016": {
        "codigo": "ECO02016",
        "nome": "Tópicos Especiais em Economia do Setor Público",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02012"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02018": {
        "codigo": "ECO02018",
        "nome": "Tópicos Especiais em Econometria",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02019": {
        "codigo": "ECO02019",
        "nome": "História Econômica Contempornea",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02257",
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02020": {
        "codigo": "ECO02020",
        "nome": "Tópicos Especiais em História do Pensamento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02246"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02021": {
        "codigo": "ECO02021",
        "nome": "Tópicos Especiais em Economia Matemática",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02023": {
        "codigo": "ECO02023",
        "nome": "Tópicos Especiais em Microeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02022": {
        "codigo": "ECO02022",
        "nome": "Avaliação E Prática de Projetos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02011"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02025": {
        "codigo": "ECO02025",
        "nome": "Tópicos Especiais em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 48,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02033": {
        "codigo": "ECO02033",
        "nome": "Economia da Pobreza",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02036": {
        "codigo": "ECO02036",
        "nome": "Economia da Informação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02034": {
        "codigo": "ECO02034",
        "nome": "Economia da Regulação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02012"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02035": {
        "codigo": "ECO02035",
        "nome": "História Econômica da América Latina",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02257"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02037": {
        "codigo": "ECO02037",
        "nome": "Economia dos Recursos Humanos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02038": {
        "codigo": "ECO02038",
        "nome": "Teoria dos Jogos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02039": {
        "codigo": "ECO02039",
        "nome": "História das Relações Internacionais I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02042": {
        "codigo": "ECO02042",
        "nome": "História das Relações Internacionais II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02039"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02046": {
        "codigo": "ECO02046",
        "nome": "Integração E Blocos Econômicos Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02056": {
        "codigo": "ECO02056",
        "nome": "Relações Internacionais Contemporneas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02049": {
        "codigo": "ECO02049",
        "nome": "Internacionalização de Empresas: Estratégias E Práticas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02006"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02062": {
        "codigo": "ECO02062",
        "nome": "Economia Solidária",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02061": {
        "codigo": "ECO02061",
        "nome": "Economia Regional - ECO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02058": {
        "codigo": "ECO02058",
        "nome": "Novos Temas das Relações Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02060": {
        "codigo": "ECO02060",
        "nome": "Economia Urbana - ECO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02067": {
        "codigo": "ECO02067",
        "nome": "Teoria das Relações Internacionais - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02082"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02068": {
        "codigo": "ECO02068",
        "nome": "Teoria das Relações Internacionais - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02067"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02070": {
        "codigo": "ECO02070",
        "nome": "Economia do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02071": {
        "codigo": "ECO02071",
        "nome": "Introdução às Relações de Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 70,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02073": {
        "codigo": "ECO02073",
        "nome": "Economia da Saúde E Desenvolvimento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02072": {
        "codigo": "ECO02072",
        "nome": "Economia da Saúde",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02077": {
        "codigo": "ECO02077",
        "nome": "Farmacoeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02079": {
        "codigo": "ECO02079",
        "nome": "Economia do Comportamento Humano",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02078": {
        "codigo": "ECO02078",
        "nome": "Direito E Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02074": {
        "codigo": "ECO02074",
        "nome": "Metodologia da Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 80,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02080": {
        "codigo": "ECO02080",
        "nome": "Economia Política do Estado Desenvolvimentista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02081": {
        "codigo": "ECO02081",
        "nome": "Métodos Quantitativos em Economia da Saúde",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02082": {
        "codigo": "ECO02082",
        "nome": "Introdução às Relações Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02089": {
        "codigo": "ECO02089",
        "nome": "Economia E Projetos Socioambientais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02090": {
        "codigo": "ECO02090",
        "nome": "Derivativos E Riscos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02093": {
        "codigo": "ECO02093",
        "nome": "Crises Financeiras",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02091": {
        "codigo": "ECO02091",
        "nome": "Tópicos Especiais em Finanças",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02083": {
        "codigo": "ECO02083",
        "nome": "Comércio Internacional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02092": {
        "codigo": "ECO02092",
        "nome": "Tópicos Especiais em Macroeconomia Pós-Keynesiana",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02095": {
        "codigo": "ECO02095",
        "nome": "Econometria Financeira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02094": {
        "codigo": "ECO02094",
        "nome": "Desenvolvimento E Políticas Industriais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02112": {
        "codigo": "ECO02112",
        "nome": "Teoria Crítica das Relações Internacionais: A Contribuição Marxista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02096": {
        "codigo": "ECO02096",
        "nome": "Economia Social E do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02105": {
        "codigo": "ECO02105",
        "nome": "Economia, Cultura E Desenvolvimento",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02106": {
        "codigo": "ECO02106",
        "nome": "Desenvolvimento Socioeconômico Aplicado",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02117": {
        "codigo": "ECO02117",
        "nome": "Economia Computacional I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02111": {
        "codigo": "ECO02111",
        "nome": "Economia Matemática B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02114": {
        "codigo": "ECO02114",
        "nome": "Economia Institucional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02245",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02113": {
        "codigo": "ECO02113",
        "nome": "Elementos de Matemática para Economia Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01355",
          "MAT01025",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02115": {
        "codigo": "ECO02115",
        "nome": "História do Pensamento Econômico E Filosofia das Ciências",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02121": {
        "codigo": "ECO02121",
        "nome": "Bioeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02116": {
        "codigo": "ECO02116",
        "nome": "Economia Espacial Computacional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02236",
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02118": {
        "codigo": "ECO02118",
        "nome": "Economia Computacional II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02119": {
        "codigo": "ECO02119",
        "nome": "Ciência de Dados em Economia E Finanças",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02132": {
        "codigo": "ECO02132",
        "nome": "Extensão E Inovação em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02122": {
        "codigo": "ECO02122",
        "nome": "Avaliação de Impacto Regulatório",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02126": {
        "codigo": "ECO02126",
        "nome": "Teoria Microeconômica Avançada",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02127": {
        "codigo": "ECO02127",
        "nome": "Relações de Trabalho E Negociações Coletivas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 50,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02131": {
        "codigo": "ECO02131",
        "nome": "Macrofinanças Computacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117",
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02129": {
        "codigo": "ECO02129",
        "nome": "Orçamento Familiar E Cidadania",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276",
          "MAT01031"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02128": {
        "codigo": "ECO02128",
        "nome": "Sociobiodiversidade, Soberania E Segurança Alimentar E Nutricional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02146": {
        "codigo": "ECO02146",
        "nome": "Turismo, Alimentação E Sociobiodiversidade",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02145": {
        "codigo": "ECO02145",
        "nome": "Economia da Educação - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208",
          "ECO02237",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02267": {
        "codigo": "ECO02267",
        "nome": "Economia do Rio Grande do Sul",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02258"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02262": {
        "codigo": "ECO02262",
        "nome": "Política E Planejamento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 80,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02281": {
        "codigo": "ECO02281",
        "nome": "Tópicos Especiais de Macroeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02284": {
        "codigo": "ECO02284",
        "nome": "Mercado de Capitais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02283": {
        "codigo": "ECO02283",
        "nome": "Análise da Conjuntura",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02004",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02285": {
        "codigo": "ECO02285",
        "nome": "Agricultura E Desenvolvimento",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02291": {
        "codigo": "ECO02291",
        "nome": "Tópicos Avançados em Economia Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02010"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03060": {
        "codigo": "ECO03060",
        "nome": "Planejamento E Gestão de Finanças Pessoais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02289": {
        "codigo": "ECO02289",
        "nome": "Economia E Meio Ambiente",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02293": {
        "codigo": "ECO02293",
        "nome": "Economia Feminista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 44,
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
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03005": {
        "codigo": "ECO03005",
        "nome": "Técnica Comercial - A",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "DIR02260"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03020": {
        "codigo": "ECO03020",
        "nome": "Introdução à Atuária",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM01168": {
        "codigo": "HUM01168",
        "nome": "Lógica",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "GEO01194": {
        "codigo": "GEO01194",
        "nome": "Geografia Humana E Econômica - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM01146": {
        "codigo": "HUM01146",
        "nome": "Filosofia da Ciência I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03033": {
        "codigo": "ECO03033",
        "nome": "Contabilidade E Sustentabilidade",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "ECO03320"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "EDU03071": {
        "codigo": "EDU03071",
        "nome": "Língua Brasileira de Sinais (libras)",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM03347": {
        "codigo": "HUM03347",
        "nome": "Cultura Brasileira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03320": {
        "codigo": "ECO03320",
        "nome": "Metodologia Básica de Custos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM05006": {
        "codigo": "HUM05006",
        "nome": "Antropologia - Introdução",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06830": {
        "codigo": "HUM06830",
        "nome": "Política Iii: Instituições Políticas Brasileiras",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "INT00003": {
        "codigo": "INT00003",
        "nome": "Introdução ao Empreendedorismo E Inovação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM04002": {
        "codigo": "HUM04002",
        "nome": "Introdução à Sociologia - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "INF01210": {
        "codigo": "INF01210",
        "nome": "Introdução à Informática",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06829": {
        "codigo": "HUM06829",
        "nome": "Política II : Teoria Política Contempornea",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET02268": {
        "codigo": "LET02268",
        "nome": "Inglês Instrumental I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET01405": {
        "codigo": "LET01405",
        "nome": "Produção de Textos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06409": {
        "codigo": "HUM06409",
        "nome": "Introdução à Ciência Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06834": {
        "codigo": "HUM06834",
        "nome": "Política Vii: Análise Política do Brasil Contemporneo",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM06830"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06029": {
        "codigo": "HUM06029",
        "nome": "Política I: Fundamentos da Teoria Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM04064": {
        "codigo": "HUM04064",
        "nome": "Sociologia do Desenvolvimento - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE201": {
        "codigo": "Vaere201",
        "nome": "VÍNCULO ACADÊMICO - ERE 2020/1",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE202": {
        "codigo": "Vaere202",
        "nome": "VÍNCULO ACADÊMICO - ERE 2020/2",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET02269": {
        "codigo": "LET02269",
        "nome": "Inglês Instrumental II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "LET02268"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE211": {
        "codigo": "Vaere211",
        "nome": "VÍNCULO ACADÊMICO - ERE 2021/1",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE212": {
        "codigo": "Vaere212",
        "nome": "VÍNCULO ACADÊMICO - ERE 2021/2",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01058": {
        "codigo": "MAT01058",
        "nome": "Análise Matemática B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01057"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01057": {
        "codigo": "MAT01057",
        "nome": "Análise Matemática A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01167": {
        "codigo": "MAT01167",
        "nome": "Equações Diferenciais II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01073": {
        "codigo": "MAT01073",
        "nome": "Aplicações da Matemática - A",
        "creditos": 5,
        "carga_horaria": 75,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01168": {
        "codigo": "MAT01168",
        "nome": "Matemática Aplicada II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01167"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      }
    }
  },
  "noturno": {
    "label": "Ciências Econômicas (noturno)",
    "shift": "noturno",
    "curso": "Ciências Econômicas",
    "codigo": 309,
    "habilitacao": 171,
    "curriculo": 1,
    "instituicao": "UFRGS",
    "versao_catalogo": "2026/1",
    "totalMandatoryCredits": 128,
    "totalElectiveCredits": 44,
    "totalTargetCredits": 172,
    "maxStage": 10,
    "estatisticas_nominais": {
      "creditos_obrigatorios": 128,
      "creditos_eletivos": 44,
      "creditos_complementares": 0,
      "creditos_convertidos": 0,
      "creditos_totais_diplomacao": 172,
      "carga_horaria_obrigatoria": 2100,
      "carga_horaria_eletiva": 660,
      "carga_horaria_total": 3000,
      "horas_extensao_diplomacao": 300
    },
    "disciplinas": {
      "ECO02006": {
        "codigo": "ECO02006",
        "nome": "Economia Internacional II - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02004"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "TRABALHO": {
        "codigo": "Trabalho",
        "nome": "Trabalho de Diplomação - ECO",
        "creditos": 0,
        "carga_horaria": 180,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02274"
        ],
        "corequisitos": [],
        "min_credits": 140,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02104": {
        "codigo": "ECO02104",
        "nome": "Trabalho de Pesquisa Científica em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02274"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02003": {
        "codigo": "ECO02003",
        "nome": "Economia Industrial A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02274": {
        "codigo": "ECO02274",
        "nome": "Técnica de Pesquisa E Projeto do Trabalho de Diplomação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02012": {
        "codigo": "ECO02012",
        "nome": "Economia do Setor Público",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02125": {
        "codigo": "ECO02125",
        "nome": "Economia Brasileira Contempornea I - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02258",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "ECO02013"
      },
      "ECO02011": {
        "codigo": "ECO02011",
        "nome": "Elaboração E Análise de Projetos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01031",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02009": {
        "codigo": "ECO02009",
        "nome": "Economia Brasileira Contempornea II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02013",
          "ECO02125"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02013": {
        "codigo": "ECO02013",
        "nome": "Economia Brasileira Contempornea I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02258",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "ECO02125"
      },
      "ECO02001": {
        "codigo": "ECO02001",
        "nome": "Economia Matemática A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01355",
          "MAT01025",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02004": {
        "codigo": "ECO02004",
        "nome": "Economia Internacional I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02002": {
        "codigo": "ECO02002",
        "nome": "Economia Monetária I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02246": {
        "codigo": "ECO02246",
        "nome": "História do Pensamento Econômico II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02245"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02249": {
        "codigo": "ECO02249",
        "nome": "Desenvolvimento Sócio-Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02207": {
        "codigo": "MAT02207",
        "nome": "Estatística Econômica",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01355",
          "MAT02215",
          "MAT02051",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02208": {
        "codigo": "MAT02208",
        "nome": "Econometria",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT02207"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02237": {
        "codigo": "ECO02237",
        "nome": "Teoria Macroeconômica II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02278": {
        "codigo": "ECO02278",
        "nome": "Teoria Microeconômica II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02075": {
        "codigo": "ECO02075",
        "nome": "Economia Rural",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 56,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02215": {
        "codigo": "ECO02215",
        "nome": "Contabilidade Social",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01031": {
        "codigo": "MAT01031",
        "nome": "Matemática Financeira - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02258": {
        "codigo": "ECO02258",
        "nome": "Formação Econômica do Brasil",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02257",
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02236": {
        "codigo": "ECO02236",
        "nome": "Teoria Macroeconômica I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02215"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02010": {
        "codigo": "ECO02010",
        "nome": "Economia Política - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02245"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02277": {
        "codigo": "ECO02277",
        "nome": "Teoria Microeconômica I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01025",
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02245": {
        "codigo": "ECO02245",
        "nome": "História do Pensamento Econômico I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "ECO02257"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01025": {
        "codigo": "MAT01025",
        "nome": "Cálculo Diferencial E Integral II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01214": {
        "codigo": "MAT01214",
        "nome": "Álgebra Linear I - A - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01355"
      },
      "MAT01355": {
        "codigo": "MAT01355",
        "nome": "Álgebra Linear I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01214"
      },
      "MAT02051": {
        "codigo": "MAT02051",
        "nome": "Estatística Geral II - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01109",
          "MAT02214",
          "MAT02052",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02215"
      },
      "MAT02052": {
        "codigo": "MAT02052",
        "nome": "Estatística Geral I - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02214"
      },
      "MAT01218": {
        "codigo": "MAT01218",
        "nome": "Cálculo Diferencial E Integral - EAD",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01109"
      },
      "ECO02276": {
        "codigo": "ECO02276",
        "nome": "Introdução A Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03037": {
        "codigo": "ECO03037",
        "nome": "Contabilidade E Análise das Demonstrações Contábeis",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02257": {
        "codigo": "ECO02257",
        "nome": "História Econômica Geral",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02214": {
        "codigo": "MAT02214",
        "nome": "Estatística Geral I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02052"
      },
      "ADM01101": {
        "codigo": "ADM01101",
        "nome": "Introdução à Administração",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01109": {
        "codigo": "MAT01109",
        "nome": "Cálculo Diferencial E Integral",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT01218"
      },
      "ADM01115": {
        "codigo": "ADM01115",
        "nome": "Teorias Organizacionais II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02008": {
        "codigo": "DIR02008",
        "nome": "Direito da Integração",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT02215": {
        "codigo": "MAT02215",
        "nome": "Estatística Geral II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [
          "MAT01109",
          "MAT02214",
          "MAT02052",
          "MAT01218"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": "MAT02051"
      },
      "ADM01120": {
        "codigo": "ADM01120",
        "nome": "Pesquisa Operacional I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01355",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR04401": {
        "codigo": "DIR04401",
        "nome": "Introdução ao Direito do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01129": {
        "codigo": "ADM01129",
        "nome": "Administração Financeira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "MAT01031"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01131": {
        "codigo": "ADM01131",
        "nome": "Administração de Carteira de Investimentos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01129"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02204": {
        "codigo": "DIR02204",
        "nome": "Instituições de Direito",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01121": {
        "codigo": "ADM01121",
        "nome": "Pesquisa Operacional II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01120"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02260": {
        "codigo": "DIR02260",
        "nome": "Direito Comercial",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "DIR02204"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR04416": {
        "codigo": "DIR04416",
        "nome": "Instituições de Direito Público E Legislação Tributária",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ADM01136": {
        "codigo": "ADM01136",
        "nome": "Organização da Produção",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ADM01101"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "DIR02271": {
        "codigo": "DIR02271",
        "nome": "Direito Societário",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "DIR02204"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02005": {
        "codigo": "ECO02005",
        "nome": "Economia Monetária II - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02008": {
        "codigo": "ECO02008",
        "nome": "Economia da Tecnologia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02007": {
        "codigo": "ECO02007",
        "nome": "Econometria Aplicada",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02015": {
        "codigo": "ECO02015",
        "nome": "Estado E Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02017": {
        "codigo": "ECO02017",
        "nome": "Economia de Empresas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02003"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02016": {
        "codigo": "ECO02016",
        "nome": "Tópicos Especiais em Economia do Setor Público",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02012"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02014": {
        "codigo": "ECO02014",
        "nome": "Teoria do Capital E Distribuição",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02010"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02018": {
        "codigo": "ECO02018",
        "nome": "Tópicos Especiais em Econometria",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02019": {
        "codigo": "ECO02019",
        "nome": "História Econômica Contempornea",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02257",
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02020": {
        "codigo": "ECO02020",
        "nome": "Tópicos Especiais em História do Pensamento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02246"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02021": {
        "codigo": "ECO02021",
        "nome": "Tópicos Especiais em Economia Matemática",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02025": {
        "codigo": "ECO02025",
        "nome": "Tópicos Especiais em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 48,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02022": {
        "codigo": "ECO02022",
        "nome": "Avaliação E Prática de Projetos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02011"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02023": {
        "codigo": "ECO02023",
        "nome": "Tópicos Especiais em Microeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02033": {
        "codigo": "ECO02033",
        "nome": "Economia da Pobreza",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02035": {
        "codigo": "ECO02035",
        "nome": "História Econômica da América Latina",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02257"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02036": {
        "codigo": "ECO02036",
        "nome": "Economia da Informação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02034": {
        "codigo": "ECO02034",
        "nome": "Economia da Regulação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02012"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02038": {
        "codigo": "ECO02038",
        "nome": "Teoria dos Jogos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02037": {
        "codigo": "ECO02037",
        "nome": "Economia dos Recursos Humanos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02039": {
        "codigo": "ECO02039",
        "nome": "História das Relações Internacionais I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02042": {
        "codigo": "ECO02042",
        "nome": "História das Relações Internacionais II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02039"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02049": {
        "codigo": "ECO02049",
        "nome": "Internacionalização de Empresas: Estratégias E Práticas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02006"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02046": {
        "codigo": "ECO02046",
        "nome": "Integração E Blocos Econômicos Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02056": {
        "codigo": "ECO02056",
        "nome": "Relações Internacionais Contemporneas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02058": {
        "codigo": "ECO02058",
        "nome": "Novos Temas das Relações Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02061": {
        "codigo": "ECO02061",
        "nome": "Economia Regional - ECO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02060": {
        "codigo": "ECO02060",
        "nome": "Economia Urbana - ECO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02062": {
        "codigo": "ECO02062",
        "nome": "Economia Solidária",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02067": {
        "codigo": "ECO02067",
        "nome": "Teoria das Relações Internacionais - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02082"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02068": {
        "codigo": "ECO02068",
        "nome": "Teoria das Relações Internacionais - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02067"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02071": {
        "codigo": "ECO02071",
        "nome": "Introdução às Relações de Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 70,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02072": {
        "codigo": "ECO02072",
        "nome": "Economia da Saúde",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02073": {
        "codigo": "ECO02073",
        "nome": "Economia da Saúde E Desenvolvimento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02070": {
        "codigo": "ECO02070",
        "nome": "Economia do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02077": {
        "codigo": "ECO02077",
        "nome": "Farmacoeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02078": {
        "codigo": "ECO02078",
        "nome": "Direito E Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02079": {
        "codigo": "ECO02079",
        "nome": "Economia do Comportamento Humano",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02074": {
        "codigo": "ECO02074",
        "nome": "Metodologia da Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 80,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02080": {
        "codigo": "ECO02080",
        "nome": "Economia Política do Estado Desenvolvimentista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02082": {
        "codigo": "ECO02082",
        "nome": "Introdução às Relações Internacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02081": {
        "codigo": "ECO02081",
        "nome": "Métodos Quantitativos em Economia da Saúde",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02092": {
        "codigo": "ECO02092",
        "nome": "Tópicos Especiais em Macroeconomia Pós-Keynesiana",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02090": {
        "codigo": "ECO02090",
        "nome": "Derivativos E Riscos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02089": {
        "codigo": "ECO02089",
        "nome": "Economia E Projetos Socioambientais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02083": {
        "codigo": "ECO02083",
        "nome": "Comércio Internacional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02091": {
        "codigo": "ECO02091",
        "nome": "Tópicos Especiais em Finanças",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 88,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02093": {
        "codigo": "ECO02093",
        "nome": "Crises Financeiras",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02094": {
        "codigo": "ECO02094",
        "nome": "Desenvolvimento E Políticas Industriais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02095": {
        "codigo": "ECO02095",
        "nome": "Econometria Financeira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02112": {
        "codigo": "ECO02112",
        "nome": "Teoria Crítica das Relações Internacionais: A Contribuição Marxista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02117": {
        "codigo": "ECO02117",
        "nome": "Economia Computacional I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02106": {
        "codigo": "ECO02106",
        "nome": "Desenvolvimento Socioeconômico Aplicado",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02096": {
        "codigo": "ECO02096",
        "nome": "Economia Social E do Trabalho",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02111": {
        "codigo": "ECO02111",
        "nome": "Economia Matemática B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02113": {
        "codigo": "ECO02113",
        "nome": "Elementos de Matemática para Economia Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01355",
          "MAT01025",
          "MAT01214"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02105": {
        "codigo": "ECO02105",
        "nome": "Economia, Cultura E Desenvolvimento",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02115": {
        "codigo": "ECO02115",
        "nome": "História do Pensamento Econômico E Filosofia das Ciências",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02114": {
        "codigo": "ECO02114",
        "nome": "Economia Institucional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02245",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02116": {
        "codigo": "ECO02116",
        "nome": "Economia Espacial Computacional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02236",
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02121": {
        "codigo": "ECO02121",
        "nome": "Bioeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02118": {
        "codigo": "ECO02118",
        "nome": "Economia Computacional II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02132": {
        "codigo": "ECO02132",
        "nome": "Extensão E Inovação em Economia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02119": {
        "codigo": "ECO02119",
        "nome": "Ciência de Dados em Economia E Finanças",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02146": {
        "codigo": "ECO02146",
        "nome": "Turismo, Alimentação E Sociobiodiversidade",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02127": {
        "codigo": "ECO02127",
        "nome": "Relações de Trabalho E Negociações Coletivas",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 50,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02129": {
        "codigo": "ECO02129",
        "nome": "Orçamento Familiar E Cidadania",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276",
          "MAT01031"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02126": {
        "codigo": "ECO02126",
        "nome": "Teoria Microeconômica Avançada",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02131": {
        "codigo": "ECO02131",
        "nome": "Macrofinanças Computacionais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02117",
          "ECO02236"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02128": {
        "codigo": "ECO02128",
        "nome": "Sociobiodiversidade, Soberania E Segurança Alimentar E Nutricional",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 60,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02122": {
        "codigo": "ECO02122",
        "nome": "Avaliação de Impacto Regulatório",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02277"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02145": {
        "codigo": "ECO02145",
        "nome": "Economia da Educação - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208",
          "ECO02237",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02262": {
        "codigo": "ECO02262",
        "nome": "Política E Planejamento Econômico",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 80,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02267": {
        "codigo": "ECO02267",
        "nome": "Economia do Rio Grande do Sul",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02258"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02281": {
        "codigo": "ECO02281",
        "nome": "Tópicos Especiais de Macroeconomia",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02283": {
        "codigo": "ECO02283",
        "nome": "Análise da Conjuntura",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02004",
          "ECO02237"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02284": {
        "codigo": "ECO02284",
        "nome": "Mercado de Capitais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT02208",
          "ECO02278"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02291": {
        "codigo": "ECO02291",
        "nome": "Tópicos Avançados em Economia Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02010"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02285": {
        "codigo": "ECO02285",
        "nome": "Agricultura E Desenvolvimento",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02249"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02289": {
        "codigo": "ECO02289",
        "nome": "Economia E Meio Ambiente",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 100,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO02293": {
        "codigo": "ECO02293",
        "nome": "Economia Feminista",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 44,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03005": {
        "codigo": "ECO03005",
        "nome": "Técnica Comercial - A",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "DIR02260"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03060": {
        "codigo": "ECO03060",
        "nome": "Planejamento E Gestão de Finanças Pessoais",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "GEO01194": {
        "codigo": "GEO01194",
        "nome": "Geografia Humana E Econômica - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
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
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM01146": {
        "codigo": "HUM01146",
        "nome": "Filosofia da Ciência I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM01168": {
        "codigo": "HUM01168",
        "nome": "Lógica",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03020": {
        "codigo": "ECO03020",
        "nome": "Introdução à Atuária",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 20,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03033": {
        "codigo": "ECO03033",
        "nome": "Contabilidade E Sustentabilidade",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037",
          "ECO03320"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM03347": {
        "codigo": "HUM03347",
        "nome": "Cultura Brasileira",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "EDU03071": {
        "codigo": "EDU03071",
        "nome": "Língua Brasileira de Sinais (libras)",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 24,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "ECO03320": {
        "codigo": "ECO03320",
        "nome": "Metodologia Básica de Custos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO03037"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM05006": {
        "codigo": "HUM05006",
        "nome": "Antropologia - Introdução",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM04002": {
        "codigo": "HUM04002",
        "nome": "Introdução à Sociologia - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06830": {
        "codigo": "HUM06830",
        "nome": "Política Iii: Instituições Políticas Brasileiras",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET01405": {
        "codigo": "LET01405",
        "nome": "Produção de Textos",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "INT00003": {
        "codigo": "INT00003",
        "nome": "Introdução ao Empreendedorismo E Inovação",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06409": {
        "codigo": "HUM06409",
        "nome": "Introdução à Ciência Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "INF01210": {
        "codigo": "INF01210",
        "nome": "Introdução à Informática",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06829": {
        "codigo": "HUM06829",
        "nome": "Política II : Teoria Política Contempornea",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET02268": {
        "codigo": "LET02268",
        "nome": "Inglês Instrumental I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06029": {
        "codigo": "HUM06029",
        "nome": "Política I: Fundamentos da Teoria Política",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM04002"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM04064": {
        "codigo": "HUM04064",
        "nome": "Sociologia do Desenvolvimento - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02276"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "HUM06834": {
        "codigo": "HUM06834",
        "nome": "Política Vii: Análise Política do Brasil Contemporneo",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "HUM06830"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE201": {
        "codigo": "Vaere201",
        "nome": "VÍNCULO ACADÊMICO - ERE 2020/1",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE211": {
        "codigo": "Vaere211",
        "nome": "VÍNCULO ACADÊMICO - ERE 2021/1",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE202": {
        "codigo": "Vaere202",
        "nome": "VÍNCULO ACADÊMICO - ERE 2020/2",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "VAERE212": {
        "codigo": "Vaere212",
        "nome": "VÍNCULO ACADÊMICO - ERE 2021/2",
        "creditos": 0,
        "carga_horaria": 0,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "LET02269": {
        "codigo": "LET02269",
        "nome": "Inglês Instrumental II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "LET02268"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01057": {
        "codigo": "MAT01057",
        "nome": "Análise Matemática A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01167": {
        "codigo": "MAT01167",
        "nome": "Equações Diferenciais II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01058": {
        "codigo": "MAT01058",
        "nome": "Análise Matemática B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01057"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01168": {
        "codigo": "MAT01168",
        "nome": "Matemática Aplicada II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "MAT01167"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      },
      "MAT01073": {
        "codigo": "MAT01073",
        "nome": "Aplicações da Matemática - A",
        "creditos": 5,
        "carga_horaria": 75,
        "horas_extensao": 0,
        "etapa_sugerida": null,
        "tipo": "eletiva",
        "prerequisitos": [
          "ECO02001"
        ],
        "corequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos",
        "alternativeOf": null
      }
    }
  }
};

// Fallback padrão para inicialização síncrona
var CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
if (typeof globalThis !== 'undefined') {
  globalThis.ECONOMIA_CURRICULA = ECONOMIA_CURRICULA;
  globalThis.CURRICULUM_DATA = ECONOMIA_CURRICULA.diurno;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ECONOMIA_CURRICULA, CURRICULUM_DATA };
}
