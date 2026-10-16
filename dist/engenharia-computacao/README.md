# Organograma Interativo: Engenharia de Computação (UFRGS) 💻🧠

Simulador curricular interativo *standalone* para estudantes de **Engenharia de Computação** da **Universidade Federal do Rio Grande do Sul (UFRGS)** (curso conjunto entre o Instituto de Informática - INF e a Escola de Engenharia - DELET), catálogo oficial 2026/1.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 122 disciplinas
- **Carga Horária Obrigatória:** 148 créditos (grade base de núcleo comum)
- **Namespace de Armazenamento Local:** `trajetoria_eng_computacao_ufrgs_v1`
- **Prefixo de Exportação:** `grade_computacao_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Dê duplo clique no arquivo [`index.html`](index.html) ou execute via terminal:
```powershell
Start-Process "dist\engenharia-computacao\index.html"
```
Funciona instantaneamente no seu navegador sem Node.js, compilação ou internet.

---

## 🎮 Guia de Navegação e Controles

### 1. Interseção Hardware & Software
A matriz de Engenharia de Computação da UFRGS integra profundamente computação teórica, engenharia de software e projeto de hardware:
- **Eixo de Software:** Algoritmos e Programação, Estruturas de Dados, Paradigmas de Programação, Engenharia de Software e Banco de Dados.
- **Eixo de Hardware & Sistemas Digitais:** Circuitos Digitais, Arquitetura e Organização de Computadores, Microprocessadores, Sistemas Embarcados e VLSI.
- **Eixo de Redes e Sistemas Distribuídos:** Sistemas Operacionais, Redes de Computadores e Sistemas Distribuídos.
- **Eixo de Fundamentos Matemáticos e Físicos:** Cálculo, Álgebra Linear, Matemática Discreta, Física e Sinais & Sistemas.

### 2. Recursos do Canvas Interativo
- **Grafo Acíclico Dirigido (DAG):** Explore o mapa completo de pré-requisitos com curvas de Bézier dinâmicas que acendem os pré-requisitos necessários (azul) e as matérias destravadas (verde).
- **Ajuste em Cascata (BFS):** Ao alterar a alocação de semestres, o motor algorítmico reorganiza em tempo real as matérias dependentes para garantir que nenhuma restrição de precedência seja violada.
- **Gaveta Lateral de Eletivas:** Painel retrátil à direita com matérias eletivas do INF e da Engenharia Elétrica prontas para inclusão na grade.

### 3. Acompanhamento e Exportação
- **Marcação de Conclusão:** Dê duplo clique no card da matéria para marcá-la como concluída (borda verde destacada).
- **Métricas em Tempo Real:** Acompanhe a soma de créditos concluídos e créditos planejados na barra lateral.
- **Exportação PNG / PDF:** Gere relatórios visuais nítidos para planejamento de matrícula e controle de estágio/TCC.
- **Persistência Local e Backup:** Alterações salvas continuamente no `localStorage` e opção de exportar/importar arquivo `.json`.
