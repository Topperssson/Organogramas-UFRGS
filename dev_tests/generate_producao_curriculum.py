import json
import sys
from pathlib import Path

# Engenharia de Producao UFRGS Curriculum Dataset
disciplinas = {
    # ETAPA 1
    "MAT01353": {
        "codigo": "MAT01353",
        "nome": "CÁLCULO E GEOMETRIA ANALÍTICA I - A",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "FIS01181": {
        "codigo": "FIS01181",
        "nome": "FÍSICA I - C",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "INF01040": {
        "codigo": "INF01040",
        "nome": "INTRODUÇÃO À PROGRAMAÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ARQ03318": {
        "codigo": "ARQ03318",
        "nome": "DESENHO TÉCNICO I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09001": {
        "codigo": "ENG09001",
        "nome": "INTRODUÇÃO À ENGENHARIA DE PRODUÇÃO",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "QUI01009": {
        "codigo": "QUI01009",
        "nome": "QUÍMICA FUNDAMENTAL A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 2
    "MAT01354": {
        "codigo": "MAT01354",
        "nome": "CÁLCULO E GEOMETRIA ANALÍTICA II - A",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01353"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "MAT01355": {
        "codigo": "MAT01355",
        "nome": "ÁLGEBRA LINEAR I - A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01353"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "FIS01182": {
        "codigo": "FIS01182",
        "nome": "FÍSICA II - C",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01181", "MAT01353"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03041": {
        "codigo": "ENG03041",
        "nome": "MECÂNICA APLICADA I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01181", "MAT01353"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ECO02254": {
        "codigo": "ECO02254",
        "nome": "ECONOMIA A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 3
    "MAT01167": {
        "codigo": "MAT01167",
        "nome": "EQUAÇÕES DIFERENCIAIS II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01354", "MAT01355"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "FIS01044": {
        "codigo": "FIS01044",
        "nome": "FÍSICA III - D",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01182", "MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "MAT02219": {
        "codigo": "MAT02219",
        "nome": "PROBABILIDADE E ESTATÍSTICA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG02001": {
        "codigo": "ENG02001",
        "nome": "CIÊNCIA DOS MATERIAIS - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["QUI01009", "FIS01182"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03003": {
        "codigo": "ENG03003",
        "nome": "MECÂNICA DOS SÓLIDOS I",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03041", "MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 4
    "MAT01169": {
        "codigo": "MAT01169",
        "nome": "CÁLCULO NUMÉRICO",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01167", "INF01040"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09004": {
        "codigo": "ENG09004",
        "nome": "ESTATÍSTICA PARA ENGENHARIA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT02219"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09051": {
        "codigo": "ENG09051",
        "nome": "PROGRAMAÇÃO COMPUTACIONAL APLICADA À PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["INF01040"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG04453": {
        "codigo": "ENG04453",
        "nome": "FÍSICA GERAL - ELETROMAGNETISMO",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01182", "MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ADM01134": {
        "codigo": "ADM01134",
        "nome": "ADMINISTRAÇÃO E FINANÇAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT02219"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 5
    "ENG09002": {
        "codigo": "ENG09002",
        "nome": "PESQUISA OPERACIONAL PARA ENGENHARIA I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01355", "MAT02219"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09003": {
        "codigo": "ENG09003",
        "nome": "SISTEMAS PRODUTIVOS I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09001"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09005": {
        "codigo": "ENG09005",
        "nome": "ERGONOMIA I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09001"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09007": {
        "codigo": "ENG09007",
        "nome": "METROLOGIA E ENSAIOS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01182"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG02002": {
        "codigo": "ENG02002",
        "nome": "PROCESSOS E MATERIAIS DE FABRICAÇÃO",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02001"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 6
    "ENG09011": {
        "codigo": "ENG09011",
        "nome": "PESQUISA OPERACIONAL PARA ENGENHARIA II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09014": {
        "codigo": "ENG09014",
        "nome": "SISTEMAS PRODUTIVOS II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09003"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09006": {
        "codigo": "ENG09006",
        "nome": "GERÊNCIA DA QUALIDADE",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09004"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09010": {
        "codigo": "ENG09010",
        "nome": "PROGRAMAÇÃO DA PRODUÇÃO I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09002", "ENG09003"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09015": {
        "codigo": "ENG09015",
        "nome": "ERGONOMIA II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09005"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 7
    "ENG09019": {
        "codigo": "ENG09019",
        "nome": "PROGRAMAÇÃO DA PRODUÇÃO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09010"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09008": {
        "codigo": "ENG09008",
        "nome": "ENGENHARIA DA QUALIDADE A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09006"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09009": {
        "codigo": "ENG09009",
        "nome": "ENGENHARIA DO PRODUTO I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09014"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09013": {
        "codigo": "ENG09013",
        "nome": "PROJETO DE FÁBRICA E LAYOUT",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09014", "ENG09015"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09020": {
        "codigo": "ENG09020",
        "nome": "CUSTOS DA PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ADM01134", "ENG09003"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 8
    "ENG09024": {
        "codigo": "ENG09024",
        "nome": "LOGÍSTICA E DISTRIBUIÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09011", "ENG09019"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09018": {
        "codigo": "ENG09018",
        "nome": "ENGENHARIA DO PRODUTO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09009"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09023": {
        "codigo": "ENG09023",
        "nome": "PLANEJAMENTO ESTRATÉGICO DA PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09019", "ENG09020"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09017": {
        "codigo": "ENG09017",
        "nome": "MANUTENÇÃO E CONFIABILIDADE",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09004", "ENG09014"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09025": {
        "codigo": "ENG09025",
        "nome": "SISTEMAS DE INFORMAÇÃO NA PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09051", "ENG09014"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 9
    "ENG09021": {
        "codigo": "ENG09021",
        "nome": "GESTÃO TECNOLÓGICA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09023"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09026": {
        "codigo": "ENG09026",
        "nome": "SISTEMAS DE GARANTIA DA QUALIDADE",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09008"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09028": {
        "codigo": "ENG09028",
        "nome": "GESTÃO AMBIENTAL NA PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09023"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09012": {
        "codigo": "ENG09012",
        "nome": "PRÁTICA EM ENGENHARIA DE PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09013", "ENG09019"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09091": {
        "codigo": "ENG09091",
        "nome": "TRABALHO DE CONCLUSÃO DE CURSO I",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09019", "ENG09023"],
        "min_credits": 160,
        "periodicidade": "ambos"
    },

    # ETAPA 10
    "ENG09092": {
        "codigo": "ENG09092",
        "nome": "TRABALHO DE CONCLUSÃO DE CURSO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG09091"],
        "min_credits": 180,
        "periodicidade": "ambos"
    },
    "ENG09022": {
        "codigo": "ENG09022",
        "nome": "ESTÁGIO SUPERVISIONADO EM ENGENHARIA DE PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 200,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 150,
        "periodicidade": "ambos"
    },
    "MED05011": {
        "codigo": "MED05011",
        "nome": "HIGIENE E SEGURANÇA DO TRABALHO - A",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ELETIVAS DE ENGENHARIA DE PRODUÇÃO E TRANSPORTES
    "ENG09016": {
        "codigo": "ENG09016",
        "nome": "ORGANIZAÇÃO INDUSTRIAL A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09023"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09029": {
        "codigo": "ENG09029",
        "nome": "RODOVIAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03041"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09030": {
        "codigo": "ENG09030",
        "nome": "INFRAESTRUTURA DE TRANSPORTES",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09029"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09031": {
        "codigo": "ENG09031",
        "nome": "OPERAÇÃO DE TRANSPORTES",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09011"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09032": {
        "codigo": "ENG09032",
        "nome": "ECONOMIA DOS TRANSPORTES",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ECO02254"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09034": {
        "codigo": "ENG09034",
        "nome": "GERENCIAMENTO DE SERVIÇOS EM PRODUÇÃO E TRANSPORTES",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09024"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09035": {
        "codigo": "ENG09035",
        "nome": "PLANEJAMENTO DE TRANSPORTES",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09031"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09036": {
        "codigo": "ENG09036",
        "nome": "ENGENHARIA DE TRÁFEGO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09031"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09038": {
        "codigo": "ENG09038",
        "nome": "TRANSPORTE PÚBLICO URBANO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09031"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG09052": {
        "codigo": "ENG09052",
        "nome": "EMPREENDEDORISMO E INOVAÇÃO PARA ENGENHARIA DE PRODUÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09023"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ADM01135": {
        "codigo": "ADM01135",
        "nome": "ENGENHARIA ECONÔMICA E AVALIAÇÕES",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ADM01134"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "INF01017": {
        "codigo": "INF01017",
        "nome": "APRENDIZADO DE MÁQUINA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09004", "INF01040"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "INF01036": {
        "codigo": "INF01036",
        "nome": "REDES NEURAIS ARTIFICIAIS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["MAT01355", "INF01040"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03021": {
        "codigo": "ENG03021",
        "nome": "AUTOMAÇÃO DA MANUFATURA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG09014"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG06105": {
        "codigo": "ENG06105",
        "nome": "PROCESSOS AUXILIADOS POR COMPUTADOR - CAM",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG02002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03044": {
        "codigo": "ENG03044",
        "nome": "DINÂMICA DE SISTEMAS E CONTROLE",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["MAT01167"],
        "min_credits": 0,
        "periodicidade": "ambos"
    }
}

# 1. Referential integrity
missing = set()
for code, d in disciplinas.items():
    for p in d["prerequisitos"]:
        if p not in disciplinas:
            missing.add((code, p))

if missing:
    print(f"ERROR: Missing prerequisites in Producao: {missing}", file=sys.stderr)
    sys.exit(1)

# 2. Acyclicity (Topological Sort)
in_degree = {code: 0 for code in disciplinas}
adj = {code: [] for code in disciplinas}
for code, d in disciplinas.items():
    for p in d["prerequisitos"]:
        adj[p].append(code)
        in_degree[code] += 1

queue = [code for code, deg in in_degree.items() if deg == 0]
visited = 0
while queue:
    curr = queue.pop(0)
    visited += 1
    for nxt in adj[curr]:
        in_degree[nxt] -= 1
        if in_degree[nxt] == 0:
            queue.append(nxt)

if visited != len(disciplinas):
    print(f"ERROR: Cycle detected in Producao DAG! Visited {visited}/{len(disciplinas)}", file=sys.stderr)
    sys.exit(1)

total_obrig = sum(d["creditos"] for d in disciplinas.values() if d["tipo"] == "obrigatoria")
ch_obrig = sum(d["carga_horaria"] for d in disciplinas.values() if d["tipo"] == "obrigatoria")
print(f"Produção DAG OK! {len(disciplinas)} disciplinas ({total_obrig} cr obrigatórios, {ch_obrig}h)")

curriculum_payload = {
    "curso": "Engenharia de Produção",
    "codigo": 320,
    "habilitacao": 144,
    "instituicao": "UFRGS",
    "versao_catalogo": "2026/1",
    "estatisticas_nominais": {
        "creditos_obrigatorios": total_obrig,
        "creditos_eletivos": 20,
        "creditos_complementares": 6,
        "creditos_convertidos": 15,
        "creditos_totais_diplomacao": total_obrig + 20 + 6,
        "carga_horaria_obrigatoria": ch_obrig,
        "carga_horaria_eletiva": 300,
        "carga_horaria_total": ch_obrig + 300 + 300,
        "horas_extensao_diplomacao": 420
    },
    "disciplinas": disciplinas
}

# Write files to dist/engenharia-producao
ROOT = Path(__file__).resolve().parent.parent
out_dir = ROOT / "dist" / "engenharia-producao"
json_path = out_dir / "curriculum_data.json"
js_path = out_dir / "curriculum_data.js"

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(curriculum_payload, f, indent=2, ensure_ascii=False)

js_content = f"/**\n * Base Curricular Oficial - Engenharia de Produção (UFRGS)\n * Catálogo 2026/1\n */\nvar CURRICULUM_DATA = {json.dumps(curriculum_payload, indent=2, ensure_ascii=False)};\n"
with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Produção curriculum generated successfully in {out_dir}")
