# Organograma Interativo: Engenharia Mecânica (UFRGS) ⚙️🔥

Simulador curricular interativo *standalone* para estudantes de **Engenharia Mecânica** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, com base no catálogo curricular oficial 2026/1.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 71 disciplinas (núcleo comum obrigatório + eletivas)
- **Carga Horária Obrigatória:** 224 créditos
- **Meta de Eletivas:** 20 créditos recomendados
- **Namespace de Armazenamento Local:** `trajetoria_eng_mecanica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_mecanica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra o arquivo [`organograma.html`](organograma.html) diretamente no seu navegador padrão:
```powershell
Start-Process "dist\engenharia-mecanica\organograma.html"
```
Zero configurações adicionais, sem Python ou servidores web necessários.

---

## 🎮 Guia de Navegação e Controles

### 1. Board Dinâmico e Cadeias Mecânicas
- **Encadeamento Estrutural e Térmico:** A Engenharia Mecânica possui cadeias longas de pré-requisitos (Cálculos, Físicas, Mecânica dos Sólidos, Dinâmica, Termodinâmica, Fenômenos de Transporte e Elementos de Máquinas).
- **Inspeção de Pré-requisitos:** Posicione o cursor sobre qualquer disciplina para iluminar sua árvore de precedência (azul) e as matérias que ela destrava (verde).
- **Cascata DAG Automatizada:** Mover disciplinas fundamentais empurra automaticamente toda a cadeia tecnológica subsequente para semestres posteriores, preservando a coerência pedagógica.

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`ENG03399` (Estágio Supervisionado II):** requer 150 créditos acumulados.
- **`ENG03381` (Trabalho de Diplomação - MEC):** requer 180 créditos acumulados.

### 3. Painel de Créditos Duplo (Sidebar Esquerda)
- **Barra 1 (Obrigatórias):** Contabiliza os créditos obrigatórios concluídos vs. planejados em relação à meta de 224 cr.
- **Barra 2 (Eletivas):** Acompanha as disciplinas eletivas e complementares alocadas na grade.

### 4. Gaveta Lateral de Eletivas (Drawer)
- Clique no ícone de gaveta no canto superior direito para acessar matérias eletivas do departamento de Mecânica e puxá-las diretamente para o semestre desejado no canvas.

### 5. Atalhos e Exportação
- <kbd>Espaço</kbd> + Arrastar: Movimentação livre no canvas Miro.
- <kbd>Scroll do Mouse</kbd>: Zoom in/out focalizado.
- **Botão "Salvar Como":** Gera snapshot estruturado `.json` via API nativa `showSaveFilePicker`.
- **Exportar Imagem / PDF:** Emite prancha visual do planejamento completo em alta resolução.
