# Organograma Interativo: Ciência da Computação (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Ciência da Computação** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (305/36/95).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 144 disciplinas (39 obrigatórias e 105 eletivas)
- **Carga Horária para Diplomação:** 204 créditos (166 obrigatórios, 16 eletivos, 6 complementares e 16 convertidos; 340h de extensão)
- **Duração Sugerida:** 9 semestres
- **Namespace de Armazenamento Local:** `trajetoria_ciencia_computacao_ufrgs_v1`
- **Prefixo de Exportação:** `grade_ciencia_computacao_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\ciencia-computacao\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos Tecnológicos e Científicos
A grade de Ciência da Computação da UFRGS (9 etapas) integra três eixos fundamentais:
- **Fundamentos Matemáticos e Teóricos:** Cálculo, Álgebra Linear, Probabilidade, Lógica, Teoria da Computação e Grafos.
- **Sistemas, Arquitetura e Programação:** Algoritmos e Programação, Estruturas de Dados, Arquitetura de Computadores, Sistemas Operacionais, Redes e Compiladores.
- **Engenharia de Software, Dados e Inteligência:** Banco de Dados, Engenharia de Software, Computação Gráfica, Inteligência Artificial e Aprendizado de Máquina.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`INF99004` (Projeto Integrador em Computação — 8ª etapa):** requer **130 créditos** acumulados (300h de extensão).
- **`CIC99001` (Trabalho de Conclusão de Curso - Ciência da Computação — 9ª etapa):** requer **166 créditos** acumulados.
- **Eletivas Avançadas:** `INF01049` (80 cr), `INF01039` e Tópicos Especiais em Computação (94 cr) e `ECO02254` (120 cr).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Periodicidade:** Todas as disciplinas da grade possuem oferta semestral contínua (`ambos`).
- **Extensão Universitária:** 340 horas totais exigidas para diplomação.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_ciencia_computacao_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_ciencia_computacao_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
