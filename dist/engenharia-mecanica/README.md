# Organograma Interativo: Engenharia Mecânica (UFRGS) ⚙️🔥

Simulador curricular interativo *standalone* para estudantes de **Engenharia Mecânica** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, com base no catálogo curricular oficial 2026/1.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 80 disciplinas (obrigatórias e eletivas)
- **Carga Horária Obrigatória:** 223 créditos
- **Meta de Eletivas:** 20 créditos recomendados
- **Namespace de Armazenamento Local:** `trajetoria_eng_mecanica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_mecanica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra o arquivo [`index.html`](index.html) diretamente no seu navegador padrão:
```powershell
Start-Process "dist\engenharia-mecanica\index.html"
```
Zero configurações adicionais, sem Python ou servidores web necessários.

---

## 🎮 Guia de Navegação e Controles

### 1. Board Dinâmico e Cadeias Mecânicas
- **Encadeamento Estrutural e Térmico:** A Engenharia Mecânica possui cadeias longas de pré-requisitos (Cálculos, Físicas, Mecânica dos Sólidos, Dinâmica, Termodinâmica, Fenômenos de Transporte e Elementos de Máquinas).
- **Inspeção de Pré-requisitos:** Posicione o cursor sobre qualquer disciplina para iluminar sua árvore de precedência (azul) e as matérias que ela destrava (verde).
- **Cascata DAG Automatizada:** Mover disciplinas fundamentais empurra automaticamente toda a cadeia tecnológica subsequente para semestres posteriores, preservando a coerência pedagógica.

### 2. Painel de Créditos Duplo (Sidebar Esquerda)
- **Barra 1 (Obrigatórias):** Contabiliza os créditos obrigatórios concluídos vs. planejados em relação à meta de 223 cr.
- **Barra 2 (Eletivas):** Acompanha as disciplinas eletivas e complementares alocadas na grade.

### 3. Gaveta Lateral de Eletivas (Drawer)
- Clique no ícone de gaveta no canto superior direito para acessar matérias eletivas do departamento de Mecânica e puxá-las diretamente para o semestre desejado no canvas.

### 4. Atalhos e Exportação
- <kbd>Espaço</kbd> + Arrastar: Movimentação livre no canvas.
- <kbd>Scroll do Mouse</kbd>: Zoom in/out focalizado.
- **Botão "Salvar Como":** Gera snapshot estruturado `.json` via API nativa `showSaveFilePicker`.
- **Exportar Imagem / PDF:** Emite prancha visual do planejamento completo em alta resolução.
