# Organograma Interativo: Engenharia Civil (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Civil** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (317/70/204).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 161 disciplinas (57 obrigatórias e 104 eletivas)
- **Carga Horária para Diplomação:** 291 créditos (234 obrigatórios, 24 eletivos, 6 complementares e 27 convertidos; 450h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_civil_ufrgs_v1`
- **Prefixo de Exportação:** `grade_civil_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-civil\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos Tecnológicos e de Infraestrutura
A grade de Engenharia Civil da UFRGS integra quatro grandes áreas de formação:
- **Núcleo Básico e Representação:** Cálculos, Físicas, Química, Geometria Descritiva e Desenho Técnico.
- **Estruturas, Materiais e Construção:** Mecânica Estrutural, Materiais de Construção Civil, Concreto, Aço e Gestão de Obras.
- **Geotecnia, Transportes e Hidráulica (`IPH`):** Geologia de Engenharia, Mecânica dos Solos, Hidrologia, Saneamento e Infraestrutura Viária.
- **Projetos Integrados Extensionistas:** Sequência integradora `ENG01061`, `ENG01063` e `ENG01066` (90h de extensão cada).

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`ENG05101` (4ª etapa) e `ENG04464` (5ª etapa):** requerem **36** e **90 créditos** acumulados, respectivamente.
- **`ENG01063` (Projetos Integrados II — 6ª etapa):** requer **105 créditos** acumulados.
- **`ENG01059` (8ª etapa), `CIV99001` (Estágio Obrigatório — 9ª etapa) e `DIR04423`:** requerem **156 créditos** acumulados.
- **`CIV99002` (Trabalho de Conclusão de Curso - Civil — 9ª etapa):** requer **199 créditos** acumulados.

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Periodicidade:** Todas as disciplinas da matriz contam com oferta semestral contínua (`ambos`).
- **Extensão Universitária:** 450 horas exigidas para diplomação, distribuídas em 13 disciplinas.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_civil_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_civil_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
