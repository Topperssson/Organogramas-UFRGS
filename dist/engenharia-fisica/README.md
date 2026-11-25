# Organograma Interativo: Engenharia Física (UFRGS)

Simulador curricular interativo *standalone* para estudantes de **Engenharia Física** da **Universidade Federal do Rio Grande do Sul (UFRGS)**, estruturado com base no catálogo curricular oficial 2026/1 (911/161/1).

---

## 🎯 Visão Geral do Curso
- **Total de Disciplinas Mapeadas:** 81 disciplinas (42 obrigatórias e 39 eletivas)
- **Carga Horária para Diplomação:** 238 créditos (189 obrigatórios, 24 eletivos, 6 complementares e 19 convertidos; 375h de extensão)
- **Duração Sugerida:** 10 semestres
- **Namespace de Armazenamento Local:** `trajetoria_eng_fisica_ufrgs_v1`
- **Prefixo de Exportação:** `grade_fisica_ufrgs`

---

## 🚀 Como Executar

### Execução Imediata (`file://` — Sem Servidor)
Abra diretamente o arquivo [`organograma.html`](organograma.html) no seu navegador:
```powershell
Start-Process "dist\engenharia-fisica\organograma.html"
```
Funciona 100% offline e sem necessidade de conexão com a internet ou servidor local.

---

## 🎮 Guia de Navegação e Controles

### 1. Núcleos de Física Aplicada, Instrumentação e Fotônica
A grade de Engenharia Física da UFRGS une física moderna de fronteira com eletrônica, materiais e sistemas embarcados:
- **Física Fundamental e Matemática (`FIS`/`MAT`):** Mecânica Clássica, Eletromagnetismo, Termodinâmica Estatística e Mecânica Quântica (`FIS01065`).
- **Instrumentação, Fotônica e Computação:** Física Computacional (`FIS01216`), Sistemas Embarcados (`FIS01237`), Fotônica (`FIS01239`) e Interação Radiação-Matéria (`FIS01231`).
- **Projetos Extensionistas e Inovação (`CEF`/`EFI`):** Projetos integradores `CEF99001`/`CEF99002` (150h de extensão cada), PFC I/II (`EFI99001`/`EFI99003`) e Estágio (`EFI99002`).

### 2. Barreiras de Créditos Mínimos e Culminação de Curso
- **`INT00003` (Empreendedorismo e Inovação — 6ª etapa):** requer **100 créditos** acumulados.
- **`ADM01134` e `ECO02254` (7ª etapa):** requerem **110 créditos** acumulados.
- **Eletivas com Piso:** `QUI03324` (60 cr), `ECO02120`/`FIS01082` (110 cr) e `MED05011` (120 cr).

### 3. Recursos do Canvas Interativo e Solver DAG
- **Pan e Zoom Infinito:** Segure <kbd>Espaço</kbd> e arraste para explorar o organograma; use a roda do mouse para aproximar ou afastar.
- **Realce Bézier SVG:** Passe o mouse ou clique sobre qualquer disciplina para visualizar instantaneamente seus pré-requisitos a montante e dependências a jusante.
- **Resolução Topológica de Grade:** Ao mover uma disciplina, o solver DAG recalcula dependências em cascata, garantindo o cumprimento de pré-requisitos, pisos de créditos mínimos e paridade semestral (`/1` e `/2`).
- **Periodicidade `/2`:** A eletiva `FIS01269` (Computação Quântica) é ofertada exclusivamente no **2º semestre** (`/2`).
- **Alternativas Exclusivas:** 5 pares de equivalência (`MAT01353`↔`MAT01213`, `MAT01355`↔`MAT01214`, `MAT01354`↔`MAT01216`, `FIS01282`↔`FIS01182`, `ECO02254`↔`ECO02120`).
- **Extensão Universitária:** 375 horas totais exigidas para diplomação.

### 4. Acompanhamento de Metas de Graduação
- **Painel de Progresso na Lateral Esquerda:** Acompanhe em tempo real os créditos obrigatórios, eletivos e totais já integralizados versus os planejados no board.
- **Persistência Segura:** O simulador salva automaticamente suas alterações no navegador (`localStorage`, chave `trajetoria_eng_fisica_ufrgs_v1`).
- **Exportação Institucional:** Exporte e restaure snapshots JSON (`grade_fisica_ufrgs_YYYY-MM-DD.json`) ou gere imagens PNG (2x) e PDF em formato paisagem via Canvas 2D nativo.
