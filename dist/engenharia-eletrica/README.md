# Organograma Interativo: Engenharia Elétrica (UFRGS) ⚡🔌

Simulador curricular interativo *standalone* para estudantes de **Engenharia Elétrica** da **Universidade Federal do Rio Grande do Sul (UFRGS)** (Departamento de Engenharia Elétrica - DELET / Escola de Engenharia), catálogo oficial 2026/1.

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 128 disciplinas
- **Carga Horária Obrigatória:** 246 créditos (3690 horas)
- **Namespace de Armazenamento Local:** `trajetoria_eng_eletrica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_eletrica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`index.html`](index.html) no navegador:
```powershell
Start-Process "dist\engenharia-eletrica\index.html"
```
Compatibilidade nativa total sem servidor, bundlers ou dependências externas.

---

## 🎮 Guia de Navegação e Controles

### 1. Grandes Áreas da Engenharia Elétrica
A matriz curricular abrange os principais ramos da eletrotécnica e eletrônica moderna:
- **Eletromagnetismo & Teoria dos Circuitos:** Circuitos Elétricos I e II, Eletromagnetismo I e II, Materiais Elétricos e Medidas Elétricas.
- **Sistemas de Energia Elétrica:** Conversão Eletromecânica, Máquinas Elétricas, Geração, Transmissão e Distribuição de Energia, Subestações e Proteção.
- **Eletrônica e Sinais:** Eletrônica Analógica, Eletrônica de Potência, Sinais e Sistemas e Processamento Digital de Sinais (DSP).
- **Controle e Automação:** Sistemas de Controle Linear, Acionamentos Elétricos e Instrumentação.

### 2. Navegação Interativa e Resolução de Dependências
- **Inspeção de Pré-requisitos:** Passe o mouse sobre disciplinas-chave (como *Sistemas de Potência* ou *Eletrônica de Potência*) para identificar a cadeia upstream de circuitos, cálculo e eletromagnetismo.
- **Arrastar e Soltar Reativo:** Mover matérias básicas propaga restrições temporais automaticamente, empurrando as matérias profissionais para semestres compatíveis.
- **Marcar Conclusão:** Duplo clique no card para marcar a disciplina como concluída e atualizar o velocímetro de créditos.

### 3. Persistência e Exportação
- **Armazenamento Automático:** Estado salvo no `localStorage` sob a chave exclusiva `trajetoria_eng_eletrica_ufrgs_v1`.
- **Exportação PNG / PDF:** Relatórios em alta resolução com conexões vetoriais preservadas para orientação acadêmica e pedidos de quebra de pré-requisito na COMGRAD.
- **Backup JSON:** Exporte seu planejamento acadêmico via download direto de arquivo `.json`.
