# Organograma Interativo: Engenharia Ambiental (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Ambiental** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (526/135/1).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 148 disciplinas (65 obrigatórias e 83 eletivas)
- **Carga Horária para Diplomação:** 279 créditos (236 obrigatórios, 22 eletivos, 6 complementares e 15 convertidos; 300h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_ambiental_ufrgs_v1`
- **Prefixo de Exportação:** `grade_ambiental_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-ambiental\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos Ambientais, Hídricos e de Saneamento
A grade de Engenharia Ambiental da UFRGS integra recursos hídricos (`IPH`), biociências (`BIO`/`CBS`) e engenharia sanitária:
- **Núcleo Básico, Química e Biociências:** Cálculos, Físicas, Química Ambiental, Ecologia, Microbiologia e Ecotoxicologia (`BIO11434`).
- **Recursos Hídricos e Saneamento (`IPH`):** Hidrologia, Mecânica dos Fluidos, Tratamento de Água e Efluentes, Resíduos Sólidos e Drenagem.
- **Gestão, Licenciamento e Projetos (`AMB`/`EAM`):** Avaliação de Impactos Ambientais (`IPH02220`), Direito Ambiental (`DIR01014`) e Projetos Integrados (`AMB99001`/`AMB99002`).

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`ADM01135` (5ª etapa) e `ADM01134` / `BIO11020` / `ENG03055` (6ª etapa):** requerem **70** e **80 créditos** acumulados.
- **`AMB99001` (Projeto Integrado I — 7ª etapa):** requer **165 créditos** acumulados; **`DIR01014` (9ª etapa):** requer **160 créditos**.
- **`EAM99001` (Estágio I — 8ª etapa) e `EAM99003` (Projeto Ambiental de Conclusão I — 10ª etapa):** requerem **185 créditos** acumulados.

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Alternativas Exclusivas:** 2 pares de equivalência (`EAM99001`↔`EAM99002` na 8ª etapa e `EAM99003`↔`EAM99004` na 10ª etapa).
- **Extensão Universitária:** 300 horas totais exigidas para diplomação.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_ambiental_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_ambiental_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
