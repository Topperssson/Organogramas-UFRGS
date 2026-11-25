# Organograma Interativo: Engenharia de Minas (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia de Minas** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (321/74/209).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 96 disciplinas (63 obrigatórias e 33 eletivas)
- **Carga Horária para Diplomação:** 281 créditos (254 obrigatórios, 6 eletivos, 6 complementares e 15 convertidos; 422h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_minas_ufrgs_v1`
- **Prefixo de Exportação:** `grade_minas_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-minas\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Lavra, Geologia e Tratamento de Minérios
A grade de Engenharia de Minas da UFRGS concentra sólida carga obrigatória (254 créditos) em geociências, lavra e beneficiamento:
- **Geociências e Topografia (`GEO`):** Mineralogia, Petrografia, Geologia Estrutural, Pesquisa Mineral e Depósitos Minerais (`ENG05002`/`ENG05012`).
- **Lavra e Mecânica de Rochas (`ENG05`):** Mecânica das Rochas (`ENG05045`/`ENG05046`), Desmonte de Rochas, Ventilação e Métodos de Lavra (`ENG05528`).
- **Tratamento de Minérios e Gestão:** Cominuição, Concentração e Processamento Mineral (`ENG05005`, `ENG05018`, `ENG05036`) e Economia Mineral.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`INF01040` (Introdução à Programação — 3ª etapa):** requer **50 créditos** acumulados.
- **`ENG03301` (6ª etapa) e `ADM01135` (6ª etapa):** requerem **70** e **123 créditos** acumulados.
- **`MIN99001` (Estágio Supervisionado em Engenharia de Minas — 10ª etapa):** requer **190 créditos** acumulados (além de `MIN99002` — Projeto de Diplomação).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Alternativas Exclusivas:** 1 par presencial/EAD (`INF01040`↔`INF01073` na 3ª etapa).
- **Extensão Universitária:** 422 horas exigidas para diplomação distribuídas ao longo de 21 disciplinas com carga extensionista.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_minas_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_minas_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
