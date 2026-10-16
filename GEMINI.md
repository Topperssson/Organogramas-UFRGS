# Organogramas UFRGS Contract: `organogramas-ufrgs`

> **Inheritance**: Inherits all universal behavioral, security, token economy, and Git standards from [`~/.gemini/GEMINI.md`](file:///C:/Users/LAMECC%20Gabriel%20Rossa/.gemini/GEMINI.md). This contract defines the domain rules, mathematical invariants, and zero-server standalone architecture of the Organogramas UFRGS Curriculum Simulators.

---

## 1. Domain Scopes & Repository Structure
- **`dist/<curso>/`**: Standalone production simulator bundles. Each supported course lives in its dedicated distribution folder containing **strictly 6 production files**:
  - `index.html`: Clean semantic DOM, header controls, credit sidebar, and interactive canvas board.
  - `styles.css`: Dark-themed design system (`#0B0F19`, `#161F30`), Miro canvas, pastel badges, and responsive controls.
  - `app.js`: State management, DAG solver, pan/zoom engine, drag-and-drop, `localStorage` persistence, and native Canvas 2D export.
  - `curriculum_data.js`: Vanilla JS fallback enabling zero-server `file://` execution.
  - `curriculum_data.json`: Master JSON curriculum schema for programmatic validation and imports.
  - `README.md`: Guia de utilização e especificidades curriculares do curso.
- **`dev_tests/`**: Automated validation suites (`validate_all_projects.js`, `validate_eletrica.js`, etc.), scraping converters, and official curriculum generators.
- **`planos-curriculares-salvos/`**: User-saved curricular snapshots and test state fixtures.
- **`.agents/skills/academic-curriculum-planner/`**: Dedicated domain skill providing architectural guidelines, scraping specs, and DAG solver references.

---

## 2. Stack-Specific Invariants & Architectural Rules

### 1. Zero-Server `file://` Execution Protocol
- Every simulator in `dist/<curso>/` must execute seamlessly when opened directly from disk via double-click or `file://` without requiring Node.js, Python HTTP servers, or build tools.
- Dual-mode data loader in `app.js`: Attempt asynchronous `fetch('curriculum_data.json')` and immediately fall back to `window.CURRICULUM_DATA` provided by `curriculum_data.js` if CORS or local filesystem restrictions occur.

### 2. Strict Isolation between `dist/` and `dev_tests/`
- Production distribution folders (`dist/<curso>/`) must remain strictly pristine: **exactly 6 production files**, 0 test files, 0 build artifacts, and 0 temporary files.
- Automated validation suites and generators reside exclusively in `dev_tests/`.

### 3. Isolation of `localStorage` Keys & Export Prefixes
- Each course simulator MUST declare a distinct and collision-free `localStorage` storage key to guarantee zero cross-contamination:
  - **Engenharia de Controle e Automação**: `trajetoria_eca_ufrgs` (prefix: `grade_eca_ufrgs`)
  - **Engenharia Mecânica**: `trajetoria_eng_mecanica_ufrgs_v1` (prefix: `grade_mecanica_ufrgs`)
  - **Engenharia de Produção**: `trajetoria_eng_producao_ufrgs_v1` (prefix: `grade_producao_ufrgs`)
  - **Ciências Econômicas**: `trajetoria_economia_diurno_ufrgs_v1` / `trajetoria_economia_noturno_ufrgs_v1` (prefix: `grade_economia`)
  - **Engenharia Elétrica**: `trajetoria_eng_eletrica_ufrgs_v1` (prefix: `grade_eletrica_ufrgs`)
  - **Engenharia de Computação**: `trajetoria_eng_computacao_ufrgs_v1` (prefix: `grade_computacao_ufrgs`)

### 4. Mathematical DAG Constraint Solver Invariants
- **Strict Temporal Dependency**: $\forall A \in \text{Prereqs}(B), \; \text{Semestre}(B) > \text{Semestre}(A)$.
- **Topological BFS Cascade**: Moving discipline $A$ to semester $S$ propagates in cascade:
  - If $S \le \text{Semestre}(P)$ for any allocated prerequisite $P$, $A$ is pushed to $\max(\text{Semestre}(P)) + 1$.
  - All direct and indirect dependents of $A$ violating the temporal rule are pushed to subsequent valid semesters.
- **Semester Parity**: Disciplines marked with `periodicity: "/1"` can only reside in odd semesters; `periodicity: "/2"` only in even semesters.
- **Minimum Credit Barriers (`min_credits`)**: Real-time evaluation of accumulated credits prior to the target semester. Disciplines with unsatisfied credit thresholds automatically advance to the first compliant semester.
- **FDC Track Commutation**: When switching FDCs (in ECA), non-shared mandatory courses are safely demoted to the Elective Bank (`semester: null`), while new track courses are allocated without breaking completed history.
- **Dynamic $S_{\max} + 1$ Buffer**: Display strictly $N_{\text{visíveis}} = \min(20, \max(1, S_{\max} + 1))$ columns. Column $S_{\max} + 1$ acts as the dashed drop target.
- **Overflow Protection**: Dependencies cascading past the 20th semester receive the non-blocking badge `⚠️ Semestre 20+` without crashing or corrupting the graph state.

### 5. Native Zero-Dependency Canvas 2D Export & Persistence
- High-fidelity visual exports (PNG 2x and landscape PDF) must rely on native Canvas 2D / `html2canvas` without external heavy server dependencies.
- Plan persistence supports direct JSON snapshot downloads and browser-native `showSaveFilePicker` with `FileReader` restore.

---

## 3. Validation Gates & Pre-Commit Quality
Before committing any changes to this repository, run and pass the full validation suite:
```powershell
node dev_tests/validate_all_projects.js
```
All 6 curriculum simulators must achieve 100% PASS across syntax, DAG acyclicity, `localStorage` uniqueness, HTML interface cleanliness, and 5/5 distribution file hygiene.
