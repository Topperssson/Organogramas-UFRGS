# Organogramas UFRGS 🎓🗺️

> **Simuladores e Organogramas Curriculares Interativos para Cursos de Graduação da UFRGS**  
> Aplicações web *standalone* com canvas infinito estilo Miro, resolução determinística de pré-requisitos em grafo acíclico dirigido (DAG), cálculo reativo de barreiras de créditos, planejamento de semestres e exportação visual em alta fidelidade.

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![UFRGS](https://img.shields.io/badge/UFRGS-Catálogo%202026%2F1-blue.svg)](https://www.ufrgs.br/)
[![Validation](https://img.shields.io/badge/tests-100%25%20passed%20(16%20cursos)-brightgreen.svg)](#-suíte-de-testes-automatizados)
[![Zero-Server](https://img.shields.io/badge/zero--server-file%3A%2F%2F%20ready-purple.svg)](#-como-executar)

---

## 🏛️ Cursos Contemplados (`dist/`)

Cada curso possui um pacote de distribuição 100% independente e *standalone* em `dist/<curso>/`, contendo **estritamente 6 arquivos de produção**:

| Curso | Diretório | Disciplinas | Créditos | Particularidades | Execução Direta (`file://`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Engenharia de Controle e Automação** | [`dist/engenharia-controle-automacao/`](dist/engenharia-controle-automacao/) | 83 | 222 cr | 4 FDCs dinâmicas, estágio (150 cr), TCCs e projetos integrados | `Start-Process "dist/engenharia-controle-automacao/organograma.html"` |
| **Engenharia Mecânica** | [`dist/engenharia-mecanica/`](dist/engenharia-mecanica/) | 80 | 223 cr | Grade com forte encadeamento térmico e mecânico, estágio e TCC | `Start-Process "dist/engenharia-mecanica/organograma.html"` |
| **Engenharia de Produção** | [`dist/engenharia-producao/`](dist/engenharia-producao/) | 65 | 210 cr | Núcleo de engenharia, gestão da produção, pesquisa operacional e economia | `Start-Process "dist/engenharia-producao/organograma.html"` |
| **Ciências Econômicas** | [`dist/ciencias-economicas/`](dist/ciencias-economicas/) | 166 | 172 cr | Suporte unificado aos turnos **Diurno** e **Noturno** no mesmo simulador | `Start-Process "dist/ciencias-economicas/organograma.html"` |
| **Engenharia Elétrica** | [`dist/engenharia-eletrica/`](dist/engenharia-eletrica/) | 128 | 246 cr | Grade abrangente de eletrônica, potência, sistemas e telecomunicações | `Start-Process "dist/engenharia-eletrica/organograma.html"` |
| **Engenharia de Computação** | [`dist/engenharia-computacao/`](dist/engenharia-computacao/) | 122 | 148 cr | Integração hardware/software, sistemas embarcados, redes e computação | `Start-Process "dist/engenharia-computacao/organograma.html"` |
| **Ciência da Computação** | [`dist/ciencia-computacao/`](dist/ciencia-computacao/) | 144 | 204 cr (166 ob) | 9 etapas, núcleo de computação, sistemas, teoria e TCC | `Start-Process "dist/ciencia-computacao/organograma.html"` |
| **Engenharia Civil** | [`dist/engenharia-civil/`](dist/engenharia-civil/) | 161 | 291 cr (234 ob) | Estruturas, geotecnia, hidráulica, transportes, estágio e TCC | `Start-Process "dist/engenharia-civil/organograma.html"` |
| **Engenharia Química** | [`dist/engenharia-quimica/`](dist/engenharia-quimica/) | 171 | 239 cr (208 ob) | Termodinâmica, fenômenos de transporte, processos químicos, estágio e TCC | `Start-Process "dist/engenharia-quimica/organograma.html"` |
| **Engenharia de Materiais** | [`dist/engenharia-materiais/`](dist/engenharia-materiais/) | 126 | 262 cr (178 ob) | Metais, polímeros, cerâmicas, caracterização, estágio e TCC | `Start-Process "dist/engenharia-materiais/organograma.html"` |
| **Engenharia Ambiental** | [`dist/engenharia-ambiental/`](dist/engenharia-ambiental/) | 148 | 279 cr (236 ob) | Recursos hídricos, saneamento, gestão ambiental, estágio e TCC | `Start-Process "dist/engenharia-ambiental/organograma.html"` |
| **Engenharia Metalúrgica** | [`dist/engenharia-metalurgica/`](dist/engenharia-metalurgica/) | 104 | 260 cr (216 ob) | Metalurgia extrativa e física, siderurgia, conformação, estágio e TCC | `Start-Process "dist/engenharia-metalurgica/organograma.html"` |
| **Engenharia de Minas** | [`dist/engenharia-minas/`](dist/engenharia-minas/) | 96 | 281 cr (254 ob) | Lavra, tratamento de minérios, geomecânica, estágio e TCC | `Start-Process "dist/engenharia-minas/organograma.html"` |
| **Engenharia Física** | [`dist/engenharia-fisica/`](dist/engenharia-fisica/) | 81 | 238 cr (189 ob) | Física aplicada, instrumentação, fotônica, materiais, estágio e TCC | `Start-Process "dist/engenharia-fisica/organograma.html"` |
| **Engenharia Cartográfica e de Agrimensura** | [`dist/engenharia-cartografica-agrimensura/`](dist/engenharia-cartografica-agrimensura/) | 105 | 240 cr (206 ob) | 11 etapas, geodésia, fotogrametria, sensoriamento remoto, estágio e TCC | `Start-Process "dist/engenharia-cartografica-agrimensura/organograma.html"` |
| **Matemática** | [`dist/matematica/`](dist/matematica/) | 191 únicas (4 trilhas) | 148–222 cr | Seletor unificado (Lic. Diurno/Noturno, Bach. Pura e Aplicada + 3 FDCs) | `Start-Process "dist/matematica/organograma.html"` |

> 📋 Para o roadmap completo com o status de todas as graduações da UFRGS, consulte o [**Checklist Completo de Cursos**](docs/checklist-cursos.md).

---

## 🚀 Como Executar

A arquitetura foi concebida em **Vanilla HTML5 / CSS3 / JavaScript ES2022 puro**, sem necessidade de compilação, *bundlers* (`vite`, `webpack`) ou servidores de backend.

### Opção 1: Abertura Direta (`file://` — Zero Config)
Basta abrir diretamente o arquivo `organograma.html` de qualquer curso com um duplo clique no Windows Explorer ou pelo terminal PowerShell:
```powershell
# Exemplo: Abrir Simulador de Controle e Automação
Start-Process ".\dist\engenharia-controle-automacao\organograma.html"

# Exemplo: Abrir Simulador de Engenharia Mecânica
Start-Process ".\dist\engenharia-mecanica\organograma.html"

# Exemplo: Abrir Simulador de Ciências Econômicas
Start-Process ".\dist\ciencias-economicas\organograma.html"
```
*(O script `curriculum_data.js` provê fallback automático de carregamento de dados na ausência de permissão para `fetch()` local).*

### Opção 2: Servidor HTTP Local (Opcional)
Caso prefira executar através de um servidor local:
```powershell
python -m http.server 8000
```
Em seguida, acesse no navegador:
- [http://localhost:8000/dist/engenharia-controle-automacao/](http://localhost:8000/dist/engenharia-controle-automacao/)
- [http://localhost:8000/dist/engenharia-mecanica/](http://localhost:8000/dist/engenharia-mecanica/)
- [http://localhost:8000/dist/engenharia-producao/](http://localhost:8000/dist/engenharia-producao/)
- [http://localhost:8000/dist/ciencias-economicas/](http://localhost:8000/dist/ciencias-economicas/)
- [http://localhost:8000/dist/engenharia-eletrica/](http://localhost:8000/dist/engenharia-eletrica/)
- [http://localhost:8000/dist/engenharia-computacao/](http://localhost:8000/dist/engenharia-computacao/)
- [http://localhost:8000/dist/ciencia-computacao/](http://localhost:8000/dist/ciencia-computacao/)
- [http://localhost:8000/dist/engenharia-civil/](http://localhost:8000/dist/engenharia-civil/)
- [http://localhost:8000/dist/engenharia-quimica/](http://localhost:8000/dist/engenharia-quimica/)
- [http://localhost:8000/dist/engenharia-materiais/](http://localhost:8000/dist/engenharia-materiais/)
- [http://localhost:8000/dist/engenharia-ambiental/](http://localhost:8000/dist/engenharia-ambiental/)
- [http://localhost:8000/dist/engenharia-metalurgica/](http://localhost:8000/dist/engenharia-metalurgica/)
- [http://localhost:8000/dist/engenharia-minas/](http://localhost:8000/dist/engenharia-minas/)
- [http://localhost:8000/dist/engenharia-fisica/](http://localhost:8000/dist/engenharia-fisica/)
- [http://localhost:8000/dist/engenharia-cartografica-agrimensura/](http://localhost:8000/dist/engenharia-cartografica-agrimensura/)
- [http://localhost:8000/dist/matematica/](http://localhost:8000/dist/matematica/)

---

## 🎯 Arquitetura do Motor de Simulação

### 1. Board Interativo Estilo Miro (Canvas Infinito)
- **Navegação Pan & Zoom Fluído:** Arraste com <kbd>Espaço</kbd> + botão esquerdo ou botão do meio do mouse; zoom focalizado na posição do ponteiro via *scroll wheel*.
- **20 Semestres Demarcados:** Colunas verticais estruturadas com métricas dinâmicas em tempo real (soma de créditos e total de disciplinas).
- **Buffer Dinâmico $S_{\max} + 1$:** O grid expande de forma inteligente exibindo apenas as colunas em uso mais uma coluna buffer com borda tracejada para novos drops.
- **Gaveta Lateral de Eletivas:** Drawer retrátil para abrigar disciplinas pendentes e matérias complementares não alocadas.

### 2. Camada SVG de Conexões Reativas (Curvas de Bézier Cúbicas)
- Curvas interativas conectam a borda direita de cada pré-requisito à borda esquerda de suas dependentes.
- **Realce Cromático Bidirecional:**
  - Pré-requisitos necessários a montante acendem em **azul elétrico** (`#38bdf8`).
  - Disciplinas destravadas a jusante acendem em **verde esmeralda** (`#34d399`).
  - Elementos não correlacionados são suavizados (*dimmed*).

### 3. Motor Determinístico de Resolução de Dependências (DAG Constraint Solver)
- **Regra Temporal Estrita:** $\forall A \in \text{Prereqs}(B), \; \text{Semestre}(B) > \text{Semestre}(A)$.
- **Propagação em Cascata (BFS Topológica):** Movimentações propagam restrições automaticamente, empurrando disciplinas conflitantes em cascata para semestres posteriores.
- **Paridade Semestral:** Disciplinas com periodicidade `/1` (ímpares) ou `/2` (pares) são validadas de forma não-bloqueante.
- **Barreira de Créditos Mínimos:** Monitoramento reativo de requisitos acumulados (como estágios e TCCs).
- **Proteção de Overflow 20+:** Cadeias longas recebem alerta visual `⚠️ Semestre 20+` sem travamento ou corrupção do grafo.

### 4. Isolamento Estrito de Persistência (`localStorage`)
Cada curso opera em um namespace isolado no `localStorage` do navegador para evitar que o planejamento de um curso interfira no outro:
- `trajetoria_eca_ufrgs` *(Engenharia de Controle e Automação)*
- `trajetoria_eng_mecanica_ufrgs_v1` *(Engenharia Mecânica)*
- `trajetoria_eng_producao_ufrgs_v1` *(Engenharia de Produção)*
- `trajetoria_economia_diurno_ufrgs_v1`, `trajetoria_economia_noturno_ufrgs_v1`, `trajetoria_economia_active_shift` *(Ciências Econômicas)*
- `trajetoria_eng_eletrica_ufrgs_v1` *(Engenharia Elétrica)*
- `trajetoria_eng_computacao_ufrgs_v1` *(Engenharia de Computação)*
- `trajetoria_ciencia_computacao_ufrgs_v1` *(Ciência da Computação)*
- `trajetoria_eng_civil_ufrgs_v1` *(Engenharia Civil)*
- `trajetoria_eng_quimica_ufrgs_v1` *(Engenharia Química)*
- `trajetoria_eng_materiais_ufrgs_v1` *(Engenharia de Materiais)*
- `trajetoria_eng_ambiental_ufrgs_v1` *(Engenharia Ambiental)*
- `trajetoria_eng_metalurgica_ufrgs_v1` *(Engenharia Metalúrgica)*
- `trajetoria_eng_minas_ufrgs_v1` *(Engenharia de Minas)*
- `trajetoria_eng_fisica_ufrgs_v1` *(Engenharia Física)*
- `trajetoria_eng_cartografica_ufrgs_v1` *(Engenharia Cartográfica e de Agrimensura)*
- `trajetoria_matematica_lic_diurno_ufrgs_v1`, `trajetoria_matematica_lic_noturno_ufrgs_v1`, `trajetoria_matematica_bach_pura_ufrgs_v1`, `trajetoria_matematica_bach_aplicada_ufrgs_v1`, `trajetoria_matematica_active_shift` *(Matemática)*

### 5. Exportação e Portabilidade
- **Exportação PNG em Alta Definição (Escala 2x):** Captura integral do canvas e conexões SVG.
- **Exportação PDF A3 Paisagem:** Documento vetorial/raster para impressão ou protocolo institucional.
- **Salvar / Carregar Plano (.json):** Compatível com a API nativa `showSaveFilePicker` do navegador e leitura via `FileReader`.

---

## 🧪 Suíte de Testes Automatizados

O repositório conta com suítes de validação automatizadas em Node.js e Python para garantir a integridade dos dados, ausência de ciclos nos DAGs e conformidade arquitetural:

### 1. Auditoria Geral de Todos os Simuladores (Recomendado)
```powershell
node dev_tests/validate_all_projects.js
```
*Executa validação sintática JS (`node --check`), integridade referencial dos DAGs, aciclicidade topológica, unicidade de chaves `localStorage`, ausência de contaminação cruzada e presença exata de 6/6 arquivos de produção em cada pacote `dist/`.*

### 2. Validações Específicas por Curso
```powershell
# Engenharia Mecânica
node dev_tests/validate_mecanica.js

# Engenharia Elétrica
node dev_tests/validate_eletrica.js

# Engenharia de Computação
node dev_tests/validate_computacao.js

# Ciências Econômicas
node dev_tests/validate_economia.js

# Ciência da Computação
node dev_tests/validate_ciencia_computacao.js

# Engenharia Civil
node dev_tests/validate_civil.js

# Engenharia Química
node dev_tests/validate_quimica.js

# Engenharia de Materiais
node dev_tests/validate_materiais.js

# Engenharia Ambiental
node dev_tests/validate_ambiental.js

# Engenharia Metalúrgica
node dev_tests/validate_metalurgica.js

# Engenharia de Minas
node dev_tests/validate_minas.js

# Engenharia Física
node dev_tests/validate_fisica.js

# Engenharia Cartográfica e de Agrimensura
node dev_tests/validate_cartografica.js

# Matemática
node dev_tests/validate_matematica.js
```

### 3. Validação de Componentes de UI e Recursos
```powershell
# Integração CEECA (ECA)
node dev_tests/test_ceeca_integration.js

# Barra Lateral e Exportação
node dev_tests/validate_step4_sidebar_export.js

# Barras Duplas de Crédito e Refinamentos
node dev_tests/validate_step5_refinements.js
```

---

## 📁 Estrutura do Repositório

```text
organogramas-ufrgs/
├── .agents/                                   # Skills e guias agênticos especializados
│   └── skills/
│       └── academic-curriculum-planner/      # Skill com especificações de scraping e DAG solver
├── dist/                                      # Pacotes Standalone de Produção (file:// — 6 arquivos cada)
│   ├── ciencia-computacao/                   # 144 disciplinas (204 cr, 9 etapas)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── ciencias-economicas/                  # 166 disciplinas (Diurno e Noturno)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-ambiental/                 # 148 disciplinas (279 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-cartografica-agrimensura/  # 105 disciplinas (240 cr, 11 etapas)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-civil/                     # 161 disciplinas (291 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-computacao/                # 122 disciplinas (148 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-controle-automacao/        # 83 disciplinas (222 cr, 4 FDCs)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-eletrica/                  # 128 disciplinas (246 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-fisica/                    # 81 disciplinas (238 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-materiais/                 # 126 disciplinas (262 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-mecanica/                  # 80 disciplinas (223 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-metalurgica/               # 104 disciplinas (260 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-minas/                     # 96 disciplinas (281 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   ├── engenharia-producao/                  # 65 disciplinas (210 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── organograma.html
│   │   ├── README.md
│   │   └── styles.css
│   ├── engenharia-quimica/                   # 171 disciplinas (239 cr)
│   │   └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
│   └── matematica/                           # 191 únicas (4 habilitações/turnos + 3 FDCs)
│       └── (app.js, curriculum_data.{js,json}, organograma.html, README.md, styles.css)
├── dev_tests/                                 # Suítes de validação, geradores e parsers curriculares
│   ├── validate_all_projects.js              # Auditoria completa dos 16 simuladores
│   ├── validate_ambiental.js
│   ├── validate_cartografica.js
│   ├── validate_ciencia_computacao.js
│   ├── validate_civil.js
│   ├── validate_computacao.js
│   ├── validate_economia.js
│   ├── validate_eletrica.js
│   ├── validate_fisica.js
│   ├── validate_matematica.js
│   ├── validate_materiais.js
│   ├── validate_mecanica.js
│   ├── validate_metalurgica.js
│   ├── validate_minas.js
│   ├── validate_quimica.js
│   ├── test_ceeca_integration.js
│   ├── generate_all_new_simulators.py
│   ├── generate_batch2_curricula.py
│   ├── generate_mecanica_curriculum.py
├── docs/                                      # Governança de backup e documentação de cursos
│   ├── backup_gdrive.ps1                      # Script de backup aditivo para Google Drive
│   ├── rclone_filters.txt                     # Filtros de inclusão/exclusão de arquivos
│   └── checklist-cursos.md                    # Roadmap de homologação dos cursos UFRGS
├── planos-curriculares-salvos/                # Exemplos e backups de planos salvos (.json)
├── .gitignore                                 # Exclusões padronizadas
├── GEMINI.md                                  # Contrato de governança agêntica e regras de domínio
└── README.md                                  # Documentação principal do repositório
```

---

## 📄 Licença
Distribuído sob licença MIT. Consulte `LICENSE` para mais detalhes.
