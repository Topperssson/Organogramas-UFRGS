# Organogramas UFRGS 🎓🗺️

> **Simuladores e Organogramas Curriculares Interativos para Cursos de Graduação da UFRGS**  
> Aplicações web *standalone* com canvas infinito estilo Miro, resolução determinística de pré-requisitos em grafo acíclico dirigido (DAG), cálculo reativo de barreiras de créditos, planejamento de semestres e exportação visual em alta fidelidade.

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![UFRGS](https://img.shields.io/badge/UFRGS-Catálogo%202026%2F1-blue.svg)](https://www.ufrgs.br/)
[![Validation](https://img.shields.io/badge/tests-100%25%20passed%20(6%20cursos)-brightgreen.svg)](#-suíte-de-testes-automatizados)
[![Zero-Server](https://img.shields.io/badge/zero--server-file%3A%2F%2F%20ready-purple.svg)](#-como-executar)

---

## 🏛️ Cursos Contemplados (`dist/`)

Cada curso possui um pacote de distribuição 100% independente e *standalone* em `dist/<curso>/`, contendo **estritamente 5 arquivos de produção**:

| Curso | Diretório | Disciplinas | Créditos | Particularidades | Execução Direta (`file://`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Engenharia de Controle e Automação** | [`dist/engenharia-controle-automacao/`](dist/engenharia-controle-automacao/) | 83 | 222 cr | 4 FDCs dinâmicas, estágio (150 cr), TCCs e projetos integrados | `Start-Process "dist/engenharia-controle-automacao/index.html"` |
| **Engenharia Mecânica** | [`dist/engenharia-mecanica/`](dist/engenharia-mecanica/) | 80 | 223 cr | Grade com forte encadeamento térmico e mecânico, estágio e TCC | `Start-Process "dist/engenharia-mecanica/index.html"` |
| **Engenharia de Produção** | [`dist/engenharia-producao/`](dist/engenharia-producao/) | 65 | 210 cr | Núcleo de engenharia, gestão da produção, pesquisa operacional e economia | `Start-Process "dist/engenharia-producao/index.html"` |
| **Ciências Econômicas** | [`dist/ciencias-economicas/`](dist/ciencias-economicas/) | 166 | 172 cr | Suporte unificado aos turnos **Diurno** e **Noturno** no mesmo simulador | `Start-Process "dist/ciencias-economicas/index.html"` |
| **Engenharia Elétrica** | [`dist/engenharia-eletrica/`](dist/engenharia-eletrica/) | 128 | 246 cr | Grade abrangente de eletrônica, potência, sistemas e telecomunicações | `Start-Process "dist/engenharia-eletrica/index.html"` |
| **Engenharia de Computação** | [`dist/engenharia-computacao/`](dist/engenharia-computacao/) | 122 | 148 cr | Integração hardware/software, sistemas embarcados, redes e computação | `Start-Process "dist/engenharia-computacao/index.html"` |

---

## 🚀 Como Executar

A arquitetura foi concebida em **Vanilla HTML5 / CSS3 / JavaScript ES2022 puro**, sem necessidade de compilação, *bundlers* (`vite`, `webpack`) ou servidores de backend.

### Opção 1: Abertura Direta (`file://` — Zero Config)
Basta abrir diretamente o arquivo `index.html` de qualquer curso com um duplo clique no Windows Explorer ou pelo terminal PowerShell:
```powershell
# Exemplo: Abrir Simulador de Controle e Automação
Start-Process ".\dist\engenharia-controle-automacao\index.html"

# Exemplo: Abrir Simulador de Engenharia Mecânica
Start-Process ".\dist\engenharia-mecanica\index.html"

# Exemplo: Abrir Simulador de Ciências Econômicas
Start-Process ".\dist\ciencias-economicas\index.html"
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
- `trajetoria_eca_ufrgs`
- `trajetoria_eng_mecanica_ufrgs_v1`
- `trajetoria_eng_producao_ufrgs_v1`
- `trajetoria_economia_diurno_ufrgs_v1`
- `trajetoria_eng_eletrica_ufrgs_v1`
- `trajetoria_eng_computacao_ufrgs_v1`

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
*Executa validação sintática JS (`node --check`), integridade referencial dos DAGs, aciclicidade topológica, unicidade de chaves `localStorage`, ausência de contaminação cruzada e presença exata de 5/5 arquivos de produção em cada pacote `dist/`.*

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
├── dist/                                      # Pacotes Standalone de Produção (file://)
│   ├── ciencias-economicas/                  # 166 disciplinas (Diurno e Noturno)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── index.html
│   │   └── styles.css
│   ├── engenharia-computacao/                # 122 disciplinas (148 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── index.html
│   │   └── styles.css
│   ├── engenharia-controle-automacao/        # 83 disciplinas (222 cr, 4 FDCs)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── index.html
│   │   └── styles.css
│   ├── engenharia-eletrica/                  # 128 disciplinas (246 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── index.html
│   │   └── styles.css
│   ├── engenharia-mecanica/                  # 80 disciplinas (223 cr)
│   │   ├── app.js
│   │   ├── curriculum_data.js
│   │   ├── curriculum_data.json
│   │   ├── index.html
│   │   └── styles.css
│   └── engenharia-producao/                  # 65 disciplinas (210 cr)
│       ├── app.js
│       ├── curriculum_data.js
│       ├── curriculum_data.json
│       ├── index.html
│       └── styles.css
├── dev_tests/                                 # Suítes de validação, geradores e parsers curriculares
│   ├── validate_all_projects.js              # Auditoria completa multi-curso
│   ├── validate_computacao.js
│   ├── validate_eletrica.js
│   ├── validate_mecanica.js
│   ├── validate_economia.js
│   ├── test_ceeca_integration.js
│   ├── generate_all_new_simulators.py
│   ├── generate_mecanica_curriculum.py
│   └── generate_producao_curriculum.py
├── planos-curriculares-salvos/                # Exemplos e backups de planos salvos (.json)
├── .gitignore                                 # Exclusões padronizadas
├── GEMINI.md                                  # Contrato de governança agêntica e regras de domínio
└── README.md                                  # Documentação principal do repositório
```

---

## 📄 Licença
Distribuído sob licença MIT. Consulte `LICENSE` para mais detalhes.
