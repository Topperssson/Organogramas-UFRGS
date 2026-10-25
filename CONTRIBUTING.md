# Guia de Contribuição — Organogramas UFRGS

Agradecemos o interesse em contribuir com o **Organogramas UFRGS**! Este projeto visa disponibilizar simuladores interativos e autônomos de trajetórias curriculares para os cursos de graduação da Universidade Federal do Rio Grande do Sul (UFRGS).

---

## 1. Como Contribuir (Fluxo Fork & PR)

1. **Faça um Fork:** Crie uma cópia do repositório em sua conta pessoal no GitHub via botão **Fork**.
2. **Clone e Ramifique:** Clone o seu fork e crie uma branch semântica:
   ```bash
   git checkout -b feat/adicionar-<nome-do-curso>
   ```
3. **Desenvolva e Respeite os Padrões:** Siga as regras arquiteturais e o schema descritos abaixo.
4. **Higiene de Commits:**
   - Utilize [Conventional Commits](https://www.conventionalcommits.org/) (ex.: `feat: add simulador engenharia-quimica`, `fix: corrige prereqs MAT01353`).
   - Nunca commite segredos, arquivos `.env`, pastas de IDE ou temporários de editor.
5. **Abra o Pull Request (PR):** Envie seu PR contra a branch `main` do repositório principal, detalhando o curso adicionado e anexando os links oficiais de consulta da UFRGS utilizados.

---

## 2. Arquitetura Obrigatória de um Curso (`dist/<novo-curso>/`)

Cada graduação deve residir em sua própria pasta sob `dist/<nome-do-curso>/` (em kebab-case) e conter **estritamente 5 arquivos de produção**:

```text
dist/<nome-do-curso>/
├── index.html              # Interface do canvas com sidebar e viewport estilo Miro
├── styles.css              # Design system dark (#0B0F19, #161F30) e estilização de cards
├── app.js                  # Engine DAG, drag-and-drop, conexões SVG, filtros e exportações
├── curriculum_data.json    # Matriz curricular canônica em JSON puro
└── curriculum_data.js      # Fallback offline via script global (window.CURRICULUM_DATA)
```

### Regras de Ouro da Arquitetura

1. **Execução Standalone via `file://` (Zero Servidores):**
   - O simulador deve funcionar perfeitamente com duplo clique no `index.html` em qualquer sistema operacional, sem depender de Node.js em tempo de execução, Python HTTP server ou empacotadores (Webpack, Vite, Rollup).
   - O `app.js` carrega assincronamente o `curriculum_data.json` e, caso ocorra restrição de CORS em `file://`, utiliza imediatamente `window.CURRICULUM_DATA` fornecido por `curriculum_data.js`.
2. **Isolamento Total de Persistência (`localStorage`):**
   - A constante `STORAGE_KEY` no `app.js` deve ser única para evitar colisões entre cursos:
     ```javascript
     const STORAGE_KEY = 'trajetoria_<nome_curso>_ufrgs_v1';
     ```

---

## 3. Contrato de Dados Curriculares e Fontes Oficiais

### Fontes Permitidas
Utilize exclusivamente informações curriculares oficiais e atualizadas:
- Páginas oficiais da Comissão de Graduação (COMGRAD) do curso.
- Catálogos de Graduação da UFRGS (PROGRAD / CONGRAD) disponíveis em `https://www.ufrgs.br/site/ensino/graduacao/`.

### Codificação e Encoding
- Arquivos obrigatoriamente gravados em **UTF-8 puro** (sem BOM), garantindo a integridade dos caracteres acentuados.

### Schema Obrigatório da Disciplina
Cada disciplina no array da matriz curricular deve cumprir a seguinte estrutura:

```json
{
  "code": "ENG03001",
  "name": "Mecânica dos Sólidos I",
  "credits": 4,
  "originalSemester": 3,
  "type": "obrigatoria",
  "prereqs": ["MAT01353", "FIS01181"],
  "min_credits": 0,
  "periodicity": "ambos",
  "is_alternative": false
}
```

- `code` (*string*): Código do catálogo UFRGS (ex.: `"MAT01353"`).
- `name` (*string*): Nome oficial da disciplina conforme súmula.
- `credits` (*number*): Quantidade de créditos da disciplina.
- `originalSemester` (*number*): Semestre ideal previsto no projeto pedagógico.
- `type` (*string*): Natureza da disciplina (`"obrigatoria"`, `"eletiva"` ou `"complementar"`).
- `prereqs` (*string[]*): Lista de códigos das disciplinas obrigatórias anteriores.
- `min_credits` (*number*): Créditos acumulados mínimos exigidos para matrícula (essencial em estágios, TCCs e disciplinas avançadas; use `0` se não houver).
- `periodicity` (*string*): `"ambos"`, `"/1"` (somente primeiro semestre/ímpares) ou `"/2"` (somente segundo semestre/pares).
- `is_alternative` (*boolean*): `true` quando for uma disciplina de escolha alternativa equivalente; nesse caso, referencie a principal em `alternativeOf: ["CODIGO"]`.

---

## 4. Checklist de Validação Pré-PR

Antes de submeter o seu Pull Request, execute as seguintes verificações locais:

1. **Validação de Sintaxe JS:**
   ```bash
   node --check dist/<novo-curso>/app.js
   node --check dist/<novo-curso>/curriculum_data.js
   ```
2. **Consistência do Grafo (DAG):**
   - Garanta que todos os códigos listados em `prereqs` existem na grade curricular.
   - Certifique-se de que não existem ciclos de pré-requisitos circulares.
3. **Validação Geral da Suíte de Testes:**
   ```bash
   node dev_tests/validate_all_projects.js
   ```
4. **Verificação Funcional Manual (`file://`):**
   - Abra `dist/<novo-curso>/index.html` diretamente no navegador.
   - Teste zoom, pan do canvas, arrastar/soltar disciplinas entre semestres e o recálculo automático de pré-requisitos.
   - Verifique se os botões de Desfazer/Refazer, exportação para PNG/PDF e download/carregamento de JSON funcionam normalmente.
