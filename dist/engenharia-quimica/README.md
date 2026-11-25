# Organograma Interativo: Engenharia Química (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Química** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (326/79/220).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 171 disciplinas (57 obrigatórias e 114 eletivas)
- **Carga Horária para Diplomação:** 239 créditos (208 obrigatórios, 12 eletivos, 6 complementares e 13 convertidos; 377h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_quimica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_quimica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-quimica\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Processos e Engenharia Química
A grade de Engenharia Química da UFRGS articula química avançada, fenômenos de transporte e projeto de processos:
- **Núcleo Básico e Químico (`QUI`):** Cálculos, Físicas, Química Geral, Analítica, Orgânica, Inorgânica e Físico-Química.
- **Termodinâmica, Transporte e Operações Unitárias (`ENG`):** Balanços de Massa e Energia, Transferência de Calor/Massa, Mecânica dos Fluidos e Separações.
- **Reatores, Controle e Projeto Industrial:** Cinética e Cálculo de Reatores (`ENG07056`), Instrumentação, Controle de Processos e Engenharia Bioquímica.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`MED05011` e `DIR04423` (10ª etapa):** requerem **120 créditos** acumulados.
- **`ADM01135` (10ª etapa):** requer **123 créditos** acumulados.
- **`QUI99001` (Estágio Obrigatório em Engenharia Química — 10ª etapa):** requer **151 créditos** acumulados (acompanhado de `QUI99002` — TCC).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Periodicidade `/2`:** 10 eletivas especializadas (ex.: `ENG07096`–`ENG07099`, `QUI03002`, `QUI03324`) são ofertadas exclusivamente no **2º semestre** (`/2`).
- **Alternativas Presencial/EAD:** 5 pares de equivalência exclusiva (`INF01040`↔`INF01073`, `MAT01169`↔`MAT01215`, `MAT02219`↔`MAT02050`, `ENG07043`↔`ENG07088`, `DIR04423`↔`DIR04016`).
- **Extensão Universitária:** 377 horas totais exigidas para diplomação.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_quimica_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_quimica_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
