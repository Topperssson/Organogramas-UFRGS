# Organograma Interativo: Engenharia de Materiais (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia de Materiais** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (320/73/208).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 126 disciplinas (44 obrigatórias e 82 eletivas)
- **Carga Horária para Diplomação:** 262 créditos (178 obrigatórios, 42 eletivos, 6 complementares e 36 convertidos; 393h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_materiais_ufrgs_v1`
- **Prefixo de Exportação:** `grade_materiais_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-materiais\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Ciência e Engenharia de Materiais
A grade de Engenharia de Materiais da UFRGS equilibra a tríade Metais, Cerâmicas e Polímeros com caracterização avançada:
- **Núcleo Básico e Estrutura da Matéria:** Cálculos, Físicas, Físico-Química, Ciência dos Materiais e Cristalografia.
- **Tríade de Materiais (`ENG`):** Metalurgia Física, Materiais Cerâmicos (`ENG02219`/`ENG02220`), Materiais Poliméricos (`ENG02044`/`ENG02050`) e Compósitos.
- **Caracterização, Ensaios e Seleção:** Difração de Raios X (`ENG02218`), Ensaios Mecânicos (`ENG03376`), Corrosão e Processos de Fabricação.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`ADM01135` (7ª etapa):** requer **117 créditos** acumulados.
- **`ENG03055` (9ª etapa):** requer **120 créditos** acumulados.
- **`EMT99003` (Estágio Supervisionado - Engenharia de Materiais — 10ª etapa):** requer **120 créditos** acumulados (além de `EMT99004` — Trabalho de Diplomação).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Periodicidade `/2`:** A obrigatória `ENG02056` (Projetos em Engenharia de Materiais, 9ª etapa) e 5 eletivas possuem oferta exclusiva no **2º semestre** (`/2`); o solver ajusta a paridade automaticamente.
- **Alternativas Presencial/EAD:** 2 pares exclusivos (`INF01040`↔`INF01073` na 4ª etapa e `ENG03055`↔`ENG09044` na 9ª etapa).
- **Extensão Universitária:** 393 horas para diplomação (incluindo `EMT99001` e `EMT99002` com 90h cada) e ampla flexibilidade de **42 créditos eletivos**.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_materiais_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_materiais_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
