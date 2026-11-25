# Organograma Interativo: Matemática (UFRGS) 📐💻

Simulador curricular interativo *standalone* para estudantes de **Matemática** da **Universidade Federal do Rio Grande do Sul (UFRGS)** (Instituto de Matemática e Estatística — IME), com suporte nativo integrado às **4 habilitações/turnos** oficiais e às **3 Formações Diversificadas Complementares (FDCs)** da Matemática Aplicada e Computacional.

---

## 🎯 Visão Geral do Curso

### Habilitações e Turnos Disponíveis (`#shift-select`)
| Chave | Habilitação / Turno | Código | Etapas Nominais | Obrigatórias | Eletivas | Total Grade (`Obrig + Elet`) | Total Diplomação |
|---|---|---|---|---:|---:|---:|---:|
| `lic_diurno` | Licenciatura em Matemática (Diurno) | `335/110/306` | 8 semestres | 204 cr | 8 cr | 212 cr | 222 cr |
| `lic_noturno` | Licenciatura em Matemática (Noturno) | `335/111/307` | 10 semestres | 204 cr | 8 cr | 212 cr | 222 cr |
| `bach_pura` | Bacharelado — Matemática Pura | `335/48/146` | 8 semestres | 136 cr | 8 cr | 144 cr | 150 cr |
| `bach_aplicada` | Bacharelado — Matemática Aplicada e Computacional | `335/48/147` | 8 semestres + 3 FDCs | 132 cr | 8 cr | 140 cr | 148 cr |

- **Namespaces de Armazenamento Local (`localStorage`):**
  - Licenciatura Diurno: `trajetoria_matematica_lic_diurno_ufrgs_v1`
  - Licenciatura Noturno: `trajetoria_matematica_lic_noturno_ufrgs_v1`
  - Bacharelado Pura: `trajetoria_matematica_bach_pura_ufrgs_v1`
  - Bacharelado Aplicada e Computacional: `trajetoria_matematica_bach_aplicada_ufrgs_v1`
  - Habilitação ativa persistida: `trajetoria_matematica_active_shift`
- **Prefixo de Exportação:** `grade_matematica` (ex.: `grade_matematica_lic_diurno_ufrgs_YYYY-MM-DD.{json,png,pdf}`)

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no navegador:
```powershell
Start-Process "dist\matematica\organograma.html"
```
A base unificada de dados é carregada automaticamente a partir de [`curriculum_data.js`](curriculum_data.js) (com suporte também a `curriculum_data.json` quando servido via HTTP).

---

## 🎮 Guia de Navegação e Controles

### 1. Seletor de Habilitação e Turno (4 Matrizes)
No cabeçalho superior esquerdo, utilize o seletor para alternar entre as 4 matrizes curriculares da Matemática:
- **Licenciatura • Diurno (8 etapas)** e **Licenciatura • Noturno (10 etapas):** exibem dinamicamente os chips de destaque de semestre `1º`–`8º` ou `1º`–`10º`.
- **Bacharelado • Matemática Pura (8 etapas):** foco em análise, álgebra, geometria e topologia.
- **Bacharelado • Aplicada e Computacional (8 etapas + FDC):** ativa automaticamente o seletor de **Ênfase / FDC** e o contador dedicado de créditos FDC.
- Cada habilitação mantém seu plano salvo de forma isolada no `localStorage`, permitindo simular trocas sem perda de histórico.

### 2. Seletor Dinâmico de Ênfases / FDC (`bach_aplicada`)
Ao selecionar **Bacharelado — Matemática Aplicada e Computacional**, o painel lateral exibe as 3 trilhas oficiais:
- **FDC 1 — Acadêmica Aplicada**
- **FDC 2 — Acadêmica Computacional**
- **FDC 3 — Profissional**

Ao trocar de FDC, o motor consulta `status_fdc` para promover e demover automaticamente tanto as disciplinas exclusivas de 1 FDC quanto as **7 disciplinas compartilhadas em 2 de 3 FDCs** (`MAT01058`, `MAT01126`, `MAT01326`, `FIS01182`, `MAT01099`, `MAT01028`, `MAT01027`) e recalcula as etapas sugeridas das disciplinas com deslocamento de etapa (`MAT01156`, `MAT01078`, `MAT02022`), preservando disciplinas já concluídas.

### 3. Barreiras de Créditos Mínimos, Alternativas e Pré-requisitos
- **Resolução Automática (BFS):** Ao arrastar qualquer disciplina, o motor DAG propaga dependentes em cascata e respeita barreiras de créditos mínimos acumulados (`min_credits`).
- **Alternativas Exclusivas:** Pares mutuamente exclusivos (ex.: `MAT01355` ↔ `MAT01214`, `MAT02219` ↔ `MAT02050`) podem ser comutados diretamente no card (`⇄ Alternar disciplina`).

### 4. Recursos de Produtividade e Exportação
- <kbd>Espaço</kbd> + Arrastar: Pan fluido no canvas Miro.
- <kbd>Scroll do Mouse</kbd>: Zoom focalizado.
- **Duplo Clique no Card:** Marca a matéria como cursada/concluída, atualizando as barras de progresso.
- **Exportação PNG / PDF:** Relatórios visuais em alta resolução via Canvas 2D nativo.
- **Salvar / Restaurar JSON:** Exporta e restaura o snapshot completo identificando automaticamente a habilitação (`shift`) e a FDC ativa (`currentFdc`).
