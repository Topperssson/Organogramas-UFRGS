# Organograma Interativo: Engenharia Metalúrgica (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Metalúrgica** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (325/78/218).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 104 disciplinas (53 obrigatórias e 51 eletivas)
- **Carga Horária para Diplomação:** 260 créditos (216 obrigatórios, 25 eletivos, 6 complementares e 13 convertidos; 435h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_metalurgica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_metalurgica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-metalurgica\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Metalurgia Extrativa, Física e Transformação
A grade de Engenharia Metalúrgica da UFRGS combina termodinâmica metalúrgica, processos industriais e engenharia de superfícies:
- **Núcleo Básico e Termodinâmica:** Cálculos, Físicas, Química, Termodinâmica Metalúrgica e Fenômenos de Transporte.
- **Metalurgia Extrativa e Siderurgia:** Tratamento de Minérios, Redução, Aciaria, Hidrometalurgia e Eletroquímica/Corrosão (`ENG06021`).
- **Metalurgia Física e Conformação:** Metalografia, Tratamentos Térmicos, Fundição (`ENG06619`), Conformação Mecânica (`ENG06648`) e Soldagem.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`ENG03301` (Mecânica Aplicada — 6ª etapa):** requer **70 créditos** acumulados.
- **`MET99001` (Estágio Supervisionado Obrigatório — 8ª etapa):** requer **170 créditos** acumulados.
- **`ENG06637` (Poluição pela Indústria Metalúrgica — 9ª etapa) e `ENG06017` (Trabalho de Diplomação — 10ª etapa):** requerem **180 créditos** acumulados.

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Alternativas Exclusivas:** 3 pares de equivalência (`INF01040`↔`INF01073` na 2ª etapa, `ENG06003`↔`ENG06032` e `IPH01009`↔`ENG06036` na 4ª etapa).
- **Extensão Universitária:** 435 horas totais exigidas para diplomação.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_metalurgica_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_metalurgica_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
