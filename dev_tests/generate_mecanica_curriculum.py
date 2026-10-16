import json
import sys
from pathlib import Path

# Engenharia Mecanica UFRGS Curriculum Dataset
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
    "ARQ03317": {
        "codigo": "ARQ03317",
        "nome": "GEOMETRIA DESCRITIVA II - A",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 1,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03363": {
        "codigo": "ENG03363",
        "nome": "INTRODUÇÃO À ENGENHARIA MECÂNICA",
        "creditos": 2,
        "carga_horaria": 30,
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
    "ARQ03323": {
        "codigo": "ARQ03323",
        "nome": "DESENHO TÉCNICO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["ARQ03318", "ARQ03317"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ARQ03320": {
        "codigo": "ARQ03320",
        "nome": "GEOMETRIA DESCRITIVA III",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 2,
        "tipo": "obrigatoria",
        "prerequisitos": ["ARQ03317"],
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
        "prerequisitos": ["MAT01353", "FIS01181", "ENG03363"],
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
    "ENG04453": {
        "codigo": "ENG04453",
        "nome": "FÍSICA GERAL - ELETROMAGNETISMO",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01354", "FIS01182"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03042": {
        "codigo": "ENG03042",
        "nome": "MECÂNICA APLICADA II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03041"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "QUI01009": {
        "codigo": "QUI01009",
        "nome": "QUÍMICA FUNDAMENTAL A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 3,
        "tipo": "obrigatoria",
        "prerequisitos": [],
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
    "MAT01168": {
        "codigo": "MAT01168",
        "nome": "MATEMÁTICA APLICADA II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01167"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG02001": {
        "codigo": "ENG02001",
        "nome": "CIÊNCIA DOS MATERIAIS - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
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
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03041", "MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03367": {
        "codigo": "ENG03367",
        "nome": "TERMODINÂMICA A",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 4,
        "tipo": "obrigatoria",
        "prerequisitos": ["FIS01044", "MAT01167"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 5
    "ENG03352": {
        "codigo": "ENG03352",
        "nome": "MECÂNICA DOS FLUIDOS A",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03367", "MAT01168"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03004": {
        "codigo": "ENG03004",
        "nome": "MECÂNICA DOS SÓLIDOS II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03003", "MAT01169"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG02002": {
        "codigo": "ENG02002",
        "nome": "MATERIAIS DE CONSTRUÇÃO MECÂNICA I - B",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02001"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03316": {
        "codigo": "ENG03316",
        "nome": "MECANISMOS I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03042"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "MAT02219": {
        "codigo": "MAT02219",
        "nome": "PROBABILIDADE E ESTATÍSTICA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 5,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT01354"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 6
    "ENG03006": {
        "codigo": "ENG03006",
        "nome": "TRANSFERÊNCIA DE CALOR E MASSA",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03352", "MAT01168"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03332": {
        "codigo": "ENG03332",
        "nome": "MÁQUINAS DE FLUXO I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03352"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG02003": {
        "codigo": "ENG02003",
        "nome": "MATERIAIS DE CONSTRUÇÃO MECÂNICA II - B",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03353": {
        "codigo": "ENG03353",
        "nome": "MEDIÇÕES MECÂNICAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT02219", "ENG03042"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03374": {
        "codigo": "ENG03374",
        "nome": "VIBRAÇÕES I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03042", "MAT01167"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03350": {
        "codigo": "ENG03350",
        "nome": "PRÁTICA DE OFICINA A",
        "creditos": 3,
        "carga_horaria": 45,
        "horas_extensao": 0,
        "etapa_sugerida": 6,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02001", "ARQ03323"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 7
    "ENG03331": {
        "codigo": "ENG03331",
        "nome": "CONTROLES FLUIDO-MECÂNICOS",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03332", "ENG03352"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03343": {
        "codigo": "ENG03343",
        "nome": "PROCESSOS DE FABRICAÇÃO POR USINAGEM",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02002", "ENG03350"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG06101": {
        "codigo": "ENG06101",
        "nome": "PROCESSOS DE FABRICAÇÃO POR FUNDIÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG02002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG06648": {
        "codigo": "ENG06648",
        "nome": "CONFORMAÇÃO MECÂNICA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03004", "ENG02002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03324": {
        "codigo": "ENG03324",
        "nome": "COMPONENTES MECÂNICOS I",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 7,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03004", "ENG03316"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 8
    "ENG03325": {
        "codigo": "ENG03325",
        "nome": "COMPONENTES MECÂNICOS II",
        "creditos": 6,
        "carga_horaria": 90,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03324"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03108": {
        "codigo": "ENG03108",
        "nome": "MEDIÇÕES TÉRMICAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03006", "ENG03353"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03112": {
        "codigo": "ENG03112",
        "nome": "CLIMATIZAÇÃO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03006"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ADM01134": {
        "codigo": "ADM01134",
        "nome": "ADMINISTRAÇÃO E FINANÇAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["MAT02219"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03044": {
        "codigo": "ENG03044",
        "nome": "DINÂMICA DE SISTEMAS E CONTROLE",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 8,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03374"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 9
    "ECO02254": {
        "codigo": "ECO02254",
        "nome": "ECONOMIA A",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ADM01135": {
        "codigo": "ADM01135",
        "nome": "ENGENHARIA ECONÔMICA E AVALIAÇÕES",
        "creditos": 2,
        "carga_horaria": 30,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ADM01134"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03010": {
        "codigo": "ENG03010",
        "nome": "CIÊNCIA, TECNOLOGIA E AMBIENTE",
        "creditos": 3,
        "carga_horaria": 45,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": [],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03046": {
        "codigo": "ENG03046",
        "nome": "PROJETO MECÂNICO INTEGRADO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 9,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03325"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },

    # ETAPA 10
    "ENG03381": {
        "codigo": "ENG03381",
        "nome": "TRABALHO DE DIPLOMAÇÃO - MEC",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": 10,
        "tipo": "obrigatoria",
        "prerequisitos": ["ENG03325"],
        "min_credits": 180,
        "periodicidade": "ambos"
    },
    "ENG03399": {
        "codigo": "ENG03399",
        "nome": "ESTÁGIO SUPERVISIONADO II",
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

    # CATÁLOGO DE ELETIVAS / COMPLEMENTARES
    "ENG03111": {
        "codigo": "ENG03111",
        "nome": "CLIMATIZAÇÃO I",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03006"],
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
        "prerequisitos": ["ENG03044"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03027": {
        "codigo": "ENG03027",
        "nome": "INTRODUÇÃO À ROBÓTICA INDUSTRIAL",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03316"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03348": {
        "codigo": "ENG03348",
        "nome": "MOTORES DE COMBUSTÃO INTERNA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03367", "ENG03352"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03349": {
        "codigo": "ENG03349",
        "nome": "GERAÇÃO E UTILIZAÇÃO DO VAPOR",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03006"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03358": {
        "codigo": "ENG03358",
        "nome": "DINÂMICA DE VEÍCULOS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03374"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03362": {
        "codigo": "ENG03362",
        "nome": "ENERGIAS ALTERNATIVAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03352"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03364": {
        "codigo": "ENG03364",
        "nome": "MECATRÔNICA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03044", "ENG04453"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03365": {
        "codigo": "ENG03365",
        "nome": "INTRODUÇÃO À MECÂNICA DA FRATURA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03004"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03366": {
        "codigo": "ENG03366",
        "nome": "CONFIABILIDADE NA ENGENHARIA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["MAT02219"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03370": {
        "codigo": "ENG03370",
        "nome": "MÉTODOS GERENCIAIS EM MANUTENÇÃO",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ADM01134"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03372": {
        "codigo": "ENG03372",
        "nome": "TRIBOLOGIA",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG02002", "ENG03352"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03376": {
        "codigo": "ENG03376",
        "nome": "VIBRAÇÕES II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03374"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03378": {
        "codigo": "ENG03378",
        "nome": "MÁQUINAS DE FLUXO II",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03332"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG06103": {
        "codigo": "ENG06103",
        "nome": "METALURGIA DA SOLDAGEM",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG02002"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG06104": {
        "codigo": "ENG06104",
        "nome": "ENSAIOS NÃO DESTRUTIVOS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG02002"],
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
        "prerequisitos": ["ENG03343"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03045": {
        "codigo": "ENG03045",
        "nome": "MÁQUINAS AGRÍCOLAS",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03324"],
        "min_credits": 0,
        "periodicidade": "ambos"
    },
    "ENG03092": {
        "codigo": "ENG03092",
        "nome": "MECÂNICA DOS SÓLIDOS III",
        "creditos": 4,
        "carga_horaria": 60,
        "horas_extensao": 0,
        "etapa_sugerida": None,
        "tipo": "eletiva",
        "prerequisitos": ["ENG03004"],
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
        "prerequisitos": ["MAT02219", "INF01040"],
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
    }
}

# 1. Check referential integrity
missing = set()
for code, d in disciplinas.items():
    for p in d["prerequisitos"]:
        if p not in disciplinas:
            missing.add((code, p))

if missing:
    print(f"ERROR: Missing prerequisites: {missing}", file=sys.stderr)
    sys.exit(1)

# 2. Check acyclicity (topological sort)
adj = {code: [] for code in disciplinas}
in_degree = {code: 0 for code in disciplinas}
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
    print(f"ERROR: Cycle detected in graph! Visited {visited}/{len(disciplinas)}", file=sys.stderr)
    sys.exit(1)

# Calculate nominal stats
total_obrig = sum(d["creditos"] for d in disciplinas.values() if d["tipo"] == "obrigatoria")
ch_obrig = sum(d["carga_horaria"] for d in disciplinas.values() if d["tipo"] == "obrigatoria")
print(f"DAG OK! {len(disciplinas)} disciplinas ({total_obrig} cr obrigatórios, {ch_obrig}h)")

curriculum_payload = {
    "curso": "Engenharia Mecânica",
    "codigo": 316,
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

# Write to dist/engenharia-mecanica
ROOT = Path(__file__).resolve().parent.parent
out_dir = ROOT / "dist" / "engenharia-mecanica"
json_path = out_dir / "curriculum_data.json"
js_path = out_dir / "curriculum_data.js"

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(curriculum_payload, f, indent=2, ensure_ascii=False)

js_content = f"/**\n * Base Curricular Oficial - Engenharia Mecânica (UFRGS)\n * Catálogo 2026/1\n */\nvar CURRICULUM_DATA = {json.dumps(curriculum_payload, indent=2, ensure_ascii=False)};\n"
with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated successfully in {out_dir}")
