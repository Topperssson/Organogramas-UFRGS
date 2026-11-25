# Organograma Interativo: Engenharia Cartográfica e de Agrimensura (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Cartográfica e de Agrimensura** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (316/202/1).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 105 disciplinas (51 obrigatórias e 54 eletivas)
- **Carga Horária para Diplomação:** 240 créditos (206 obrigatórios, 12 eletivos, 6 complementares e 16 convertidos; 394h de extensão)
- **Duração Sugerida:** 11 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_cartografica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_cartografica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-cartografica-agrimensura\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Geodésia, Sensoriamento Remoto e Agrimensura
A grade de Engenharia Cartográfica e de Agrimensura da UFRGS possui **11 etapas** estruturadas em geotecnologias e levantamento territorial:
- **Núcleo Básico e Computacional (`MAT`/`FIS`/`INF`):** Cálculos, Geometria Analítica, Físicas, Estatística e Programação.
- **Geodésia, Topografia e Ajustamento (`GEO`):** Topografia, Geodésia Geométrica e Física, Ajustamento de Observações, Posicionamento por Satélites (GNSS) e Cadastro Territorial.
- **Cartografia, Fotogrametria e Sensoriamento Remoto:** Projeções Cartográficas, Fotogrametria Digital, Processamento de Imagens, Bancos de Dados Geográficos e Integração de Levantamentos.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`GEO01001` (7ª etapa):** requer **110 créditos** acumulados.
- **`CAR99003` (Estágio I — 8ª etapa), `CAR99004` (Estágio II — 9ª etapa) e `DIR04423` (10ª etapa):** requerem **120 créditos** acumulados.
- **`ADM01135`, `ECO02254` e `ENG09035` (11ª etapa):** requerem **120 créditos** acumulados (culminando com `CAR99005` — TCC na 11ª etapa).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Estrutura de 11 Etapas:** Inclui chip de filtro e badge pastel exclusivo para o **11º Semestre** (`ADM01135`, `GEO05021`, `CAR99005`, `ECO02254`, `ENG09035`).
- **Periodicidade `/2`:** A obrigatória `GEO05090` (Integração de Levantamentos Aéreos e Terrestres, 10ª etapa) e a eletiva `INF01145` possuem oferta exclusiva no **2º semestre** (`/2`).
- **Alternativas Exclusivas:** 14 pares de equivalência presencial/EAD (incluindo Cálculos, Física, Programação, Estatística e disciplinas de `GEO`).
- **Extensão Universitária:** 394 horas exigidas para diplomação em 11 disciplinas (incluindo 5 eletivas de Prática Extensionista de 75h).

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_cartografica_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_cartografica_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
