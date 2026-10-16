# Organograma Interativo: Engenharia de Controle e Automação (UFRGS) ⚙️🤖

Simulador curricular interativo *standalone* para estudantes de **Engenharia de Controle e Automação (ECA)** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, com base no catálogo oficial 2026/1 e integração com o CEECA.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 83 disciplinas (núcleo comum obrigatório + eletivas/FDCs)
- **Carga Horária Obrigatória:** 222 créditos (3330 horas)
- **Namespace de Armazenamento Local:** `trajetoria_eca_ufrgs`
- **Prefixo de Exportação:** `grade_eca_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`index.html`](index.html) com duplo clique no Windows Explorer ou execute no terminal:
```powershell
Start-Process "dist\engenharia-controle-automacao\index.html"
```
O arquivo [`curriculum_data.js`](curriculum_data.js) carrega automaticamente o catálogo de disciplinas mesmo com as políticas restritivas de CORS locais do navegador.

---

## 🎮 Guia de Navegação e Controles

### 1. Navegação no Canvas (Estilo Miro)
- **Pan (Arrastar):** Segure a tecla <kbd>Espaço</kbd> e clique/arraste com o botão esquerdo, ou use o clique do botão do meio (scroll click).
- **Zoom Fluído:** Use a roda do mouse (*scroll wheel*) apontando para onde deseja ampliar/reduzir, ou utilize os botões `+`, `-`, `100%` e `Fit` no header.
- **Buffer Dinâmico $S_{\max} + 1$:** O quadro exibe apenas os semestres com disciplinas alocadas mais uma coluna vazia tracejada pronta para receber novos cards.

### 2. Formações Diversificadas Complementares (FDCs)
No seletor de trilha do cabeçalho, comute dinamicamente entre as 4 opções oficiais de formação:
- **FDC 1:** Formação Essencial Obrigatória (núcleo comum)
- **FDC 2:** Sistemas Discretos CAD/CAM
- **FDC 3:** Controle Avançado de Sistemas Mecânicos
- **FDC 4:** Eletrônica de Potência e Acionamento

> *Ao alternar a FDC, disciplinas exclusivas da trilha anterior são transferidas com segurança para a gaveta de eletivas à direita sem perda de progresso.*

### 3. Conexões SVG e Motor de Pré-requisitos (DAG Solver)
- **Hover/Seleção:** Ao passar o mouse sobre uma disciplina:
  - Os pré-requisitos necessários acendem em **azul elétrico** (`#38bdf8`).
  - As disciplinas liberadas a jusante acendem em **verde esmeralda** (`#34d399`).
- **Resolução Automática (BFS):** Arrastar uma matéria para um semestre anterior aos seus pré-requisitos empurra a matéria e todas as suas dependentes automaticamente para semestres posteriores válidos.
- **Barreiras de Créditos Mínimos:**
  - `CCA99004` (Estágio Supervisionado): requer 150 créditos acumulados.
  - `CCA99008` (Projeto Integrado I): requer 120 créditos acumulados.
  - `CCA99009` (Projeto Integrado II): requer 150 créditos acumulados.
  - `CCA99002` / `CCA99003` (TCC I e II): requerem 160 e 180 créditos.

### 4. Salvar, Carregar e Exportar
- **Concluir Disciplinas:** Clique duas vezes no card para marcá-la como concluída (borda verde `#10B981` e computação imediata na barra de progresso).
- **Exportar PNG / PDF:** Gere um relatório de alta fidelidade visual (escala 2x ou PDF A3 paisagem) para anexar em orientações acadêmicas e matrículas.
- **Salvar / Carregar JSON:** Salve o planejamento em arquivo local `.json` para restaurar seu progresso em qualquer outro computador.
