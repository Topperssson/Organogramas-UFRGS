# Organograma Interativo: Engenharia de Produção (UFRGS) 📈🏭

Simulador curricular interativo *standalone* para estudantes de **Engenharia de Produção** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 65 disciplinas
- **Carga Horária Obrigatória:** 210 créditos
- **Namespace de Armazenamento Local:** `trajetoria_eng_producao_ufrgs_v1`
- **Prefixo de Exportação:** `grade_producao_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`index.html`](index.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-producao\index.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos Tecnológicos e de Gestão
A grade de Engenharia de Produção da UFRGS integra três eixos fundamentais:
- **Núcleo de Engenharia Básica:** Cálculos, Físicas, Química e Mecânica.
- **Pesquisa Operacional & Métodos Quantitativos:** Estatística, Simulação, Programação Matemática e Modelagem Estocástica.
- **Gestão da Produção & Economia:** Engenharia Econômica, Custos, Gestão da Qualidade, Logística e Estratégia de Operações.

### 2. Recursos do Canvas Interativo
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse sobre matérias como *Pesquisa Operacional* ou *Engenharia Econômica* para visualizar instantaneamente seus pré-requisitos necessários e dependências destravadas.
- **Resolução Topológica de Grade:** Ao reagendar uma matéria, o solver DAG ajusta todas as disciplinas que dependem dela em cascata.

### 3. Acompanhamento de Metas de Graduação
- **Barra de Progresso na Lateral Esquerda:** Visualize em tempo real o total de créditos já integralizados (disciplinas verdes) versus créditos alocados para semestres futuros.
- **Persistência Segura:** O simulador salva todas as alterações automaticamente no navegador (`localStorage`), garantindo que o seu plano seja restaurado quando a página for reaberta.
- **Exportação Institucional:** Gere arquivos PNG (2x) ou PDF (A3 Paisagem) para anexar em planejamentos semestrais.
