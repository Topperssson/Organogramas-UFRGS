# Organograma Interativo: Ciências Econômicas (UFRGS) 📊🏛️

Simulador curricular interativo *standalone* para estudantes de **Ciências Econômicas** da **Universidade Federal do Rio Grande do Sul (UFRGS)** (Faculdade de Ciências Econômicas - FCE), com suporte nativo integrado aos turnos **Diurno** e **Noturno**.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 166 disciplinas
- **Carga Horária Obrigatória:** 128 créditos (ambos os turnos)
- **Créditos Eletivos Recomendados:** 44 créditos
- **Carga Horária Total:** 172 créditos
- **Turnos Disponíveis:** Diurno (8 etapas nominais) e Noturno (10 etapas nominais)
- **Namespaces de Armazenamento Local:**
  - Diurno: `trajetoria_economia_diurno_ufrgs_v1`
  - Noturno: `trajetoria_economia_noturno_ufrgs_v1`
- **Prefixo de Exportação:** `grade_economia`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`index.html`](index.html) no navegador:
```powershell
Start-Process "dist\ciencias-economicas\index.html"
```
A base unificada de dados é carregada automaticamente a partir de [`curriculum_data.js`](curriculum_data.js).

---

## 🎮 Guia de Navegação e Controles

### 1. Seletor de Turno (Diurno / Noturno)
No cabeçalho superior direito, utilize o seletor **Turno** para alternar entre as matrizes curriculares:
- **Diurno:** Grade com periodização padrão em 8 semestres.
- **Noturno:** Grade estendida com periodização padrão em 10 semestres.
- A alternância preserva as disciplinas concluídas e o plano individual em namespaces independentes no `localStorage`, permitindo simular cenários de transferência de turno sem perda de dados.

### 2. Estrutura do Grafo Teórico e Quantitativo
- **Eixo Teórico:** Microeconomia I a IV, Macroeconomia I a IV, Economia Brasileira, História Econômica Geral e Formação Econômica do Brasil.
- **Eixo Quantitativo:** Matemática I a III, Estatística Econômica I e II, Introdução à Econometria e Econometria.
- **Navegação SVG:** Curvas de Bézier destacam a precedência matemática rigorosa necessária para avançar nas matérias avançadas de teoria e econometria.

### 3. Recursos de Produtividade
- <kbd>Espaço</kbd> + Arrastar: Pan fluido em 60 FPS.
- <kbd>Scroll do Mouse</kbd>: Zoom focalizado.
- **Duplo Clique no Card:** Marca a matéria como cursada/concluída, acendendo o card em verde e somando os créditos no painel esquerdo.
- **Salvar / Restaurar JSON:** Exporte o snapshot completo com o turno ativo gravado para restaurar em qualquer máquina.
