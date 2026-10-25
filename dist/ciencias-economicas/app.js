/**
 * Simulador de Trajetória Acadêmica - Ciências Econômicas (UFRGS)
 * Aplicação Standalone estilo Miro (Infinite Canvas + Reativo DAG Solver)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AcademicTrajectoryApp = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  // =========================================================================
  // ESTADO GLOBAL DA APLICAÇÃO
  // =========================================================================
  const state = {
    activeShift: 'diurno',     // 'diurno' | 'noturno'
    curriculum: null,          // Dados brutos do curriculum_data.json
    courses: {},               // Mapa: codigo -> { ...dadosDisciplina }
    allocations: {},           // Mapa: codigo -> { semester: number|null, completed: boolean, hasOverflow: boolean }
    altChoice: {},            // Alternativas mutuamente exclusivas: chave 'A|B' -> codigo obrigatorio escolhido
    currentFdc: 1,             // FDC ativa padrão (2 = Sistemas Discretos CAD/CAM)
    columnNames: {},           // Mapa: semestre (1..20) -> string customizada (ex: '2024/1')
    searchQuery: '',
    filter: 'all',
    highlightStage: null,      // Destaque por Semestre Original ('1'..'10', 'elet', ou null = todos)
    selectedCourse: null,
    hoveredCourse: null,
    drawerOpen: false,
    
    // Pan & Zoom (Miro Canvas)
    panX: 40,
    panY: 30,
    scale: 0.9,
    isPanning: false,
    startMouseX: 0,
    startMouseY: 0,
    startPanX: 0,
    startPanY: 0,
    isSpacePressed: false,

    // DAG Lookups
    prereqMap: {},             // codigo -> [codigosPrerequisitos]
    dependentMap: {},          // codigo -> [codigosQueElaLibera]
    
    // Animação & Render
    draggedCourseCode: null,
    rafPending: false,
    sidebarCollapsed: false
  };

  // =========================================================================
  // ELEMENTOS DO DOM
  // =========================================================================
  const dom = isBrowser ? {
    viewport: document.getElementById('board-viewport'),
    canvas: document.getElementById('board-canvas'),
    grid: document.getElementById('semesters-grid'),
    svgLayer: document.getElementById('connectors-layer'),
    pathsGroup: document.getElementById('paths-group'),
    
    // Sidebar & Navigation
    shiftSelect: document.getElementById('shift-select'),
    leftSidebar: document.getElementById('left-sidebar'),
    btnToggleSidebar: document.getElementById('btn-toggle-sidebar'),
    sidebarToggleIcon: document.getElementById('sidebar-toggle-icon'),

    // Credits Tracker & Stats (Barras Duplas & Totais)
    creditsTrackerCard: document.getElementById('credits-tracker-card'),
    statObrigDone: document.getElementById('stat-obrig-done'),
    statObrigTarget: document.getElementById('stat-obrig-target'),
    creditsPercentText: document.getElementById('credits-percent-text'),
    creditsProgressFill: document.getElementById('credits-progress-fill'),
    statEleDone: document.getElementById('stat-ele-done'),
    statEleTarget: document.getElementById('stat-ele-target'),
    creditsElePercentText: document.getElementById('credits-ele-percent-text'),
    creditsEleProgressFill: document.getElementById('credits-ele-progress-fill'),
    statCompletedCredits: document.getElementById('stat-completed-credits'),
    statTargetCredits: document.getElementById('stat-target-credits'),
    statDoneObr: document.getElementById('stat-done-obr'),
    statDoneFdc: document.getElementById('stat-done-fdc'),
    statDoneEle: document.getElementById('stat-done-ele'),
    statPlannedObrig: document.getElementById('stat-planned-obrig'),
    statPlannedObrigTarget: document.getElementById('stat-planned-obrig-target'),
    statPlannedEle: document.getElementById('stat-planned-ele'),
    statPlannedEleTarget: document.getElementById('stat-planned-ele-target'),

    // Controls
    courseSearch: document.getElementById('course-search'),
    searchClear: document.getElementById('search-clear'),
    fdcSelect: null,
    fdcChipsGroup: null,
    filterSelect: document.getElementById('filter-select'),
    stageChipsGrid: document.getElementById('stage-chips-grid'),
    baseYearInput: document.getElementById('base-year-input'),
    basePeriodSelect: document.getElementById('base-period-select'),
    btnApplyCycle: document.getElementById('btn-apply-cycle'),
    
    // Dashboard stats (planned)
    statCredits: document.getElementById('stat-credits'),
    statCourses: document.getElementById('stat-courses'),
    statMaxSem: document.getElementById('stat-max-sem'),
    statDag: document.getElementById('stat-dag'),
    
    // Zoom buttons
    btnZoomOut: document.getElementById('btn-zoom-out'),
    btnZoomReset: document.getElementById('btn-zoom-reset'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomFit: document.getElementById('btn-zoom-fit'),
    
    // Action buttons
    btnResetDefault: document.getElementById('btn-reset-default'),
    btnSave: document.getElementById('btn-save'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnImportJson: document.getElementById('btn-import-json'),
    inputImportJson: document.getElementById('input-import-json'),
    btnExportPng: document.getElementById('btn-export-png'),
    btnExportPdf: document.getElementById('btn-export-pdf'),
    btnToggleDrawer: document.getElementById('btn-toggle-drawer'),
    drawerCount: document.getElementById('drawer-count'),
    
    // Drawer
    drawer: document.getElementById('electives-drawer'),
    drawerCardsList: document.getElementById('drawer-cards-list'),
    btnCloseDrawer: document.getElementById('btn-close-drawer'),
    drawerSearchInput: document.getElementById('drawer-search-input'),
    
    // Modal
    modalOverlay: document.getElementById('course-modal-overlay'),
    modalClose: document.getElementById('modal-close'),
    modalCode: document.getElementById('modal-code'),
    modalName: document.getElementById('modal-name'),
    modalBadges: document.getElementById('modal-badges'),
    modalCredits: document.getElementById('modal-credits'),
    modalCh: document.getElementById('modal-ch'),
    modalChe: document.getElementById('modal-che'),
    modalEtapa: document.getElementById('modal-etapa'),
    modalCurrentSem: document.getElementById('modal-current-sem'),
    modalPeriodicity: document.getElementById('modal-periodicity'),
    modalStatus: document.getElementById('modal-status'),
    modalPrereqs: document.getElementById('modal-prereqs'),
    modalDependents: document.getElementById('modal-dependents'),
    modalBtnToggleCompleted: document.getElementById('modal-btn-toggle-completed'),
    modalBtnUnallocate: document.getElementById('modal-btn-unallocate'),
    modalBtnLocate: document.getElementById('modal-btn-locate'),
    
    // Toast
    toastContainer: document.getElementById('toast-container')
  } : {};

  // =========================================================================
  // INICIALIZAÇÃO
  // =========================================================================
  async function init() {
    setupEventListeners();
    try {
      renderBoardSkeleton();
      await loadCurriculumData();
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
      showToast('Simulador carregado com sucesso!', 'info');
    } catch (err) {
      console.error('Erro na inicialização da aplicação:', err);
      showToast('Erro ao carregar dados curriculares. Consulte o console.', 'error');
    }
  }

  // =========================================================================
  // CARREGAMENTO DOS DADOS CURRICULARES
  // =========================================================================
  
  // =========================================================================
  // GESTÃO DE MODALIDADES (DIURNO / NOTURNO)
  // =========================================================================
  function getShiftStorageKey(shift = state.activeShift) {
    return shift === 'noturno'
      ? 'trajetoria_economia_noturno_ufrgs_v1'
      : 'trajetoria_economia_diurno_ufrgs_v1';
  }

  function updateStageChipsForShift(shift) {
    if (!isBrowser) return;
    const isNoturno = shift === 'noturno';
    const chip9 = document.querySelector('.stage-chip[data-stage="9"]');
    const chip10 = document.querySelector('.stage-chip[data-stage="10"]');
    if (chip9) chip9.style.display = isNoturno ? 'inline-flex' : 'none';
    if (chip10) chip10.style.display = isNoturno ? 'inline-flex' : 'none';
    if (!isNoturno && (state.highlightStage === '9' || state.highlightStage === '10')) {
      state.highlightStage = null;
      updateStageHighlightChips();
      applyStageHighlightToCards();
    }
  }

  function applyCurriculumShift(newShift, savePrevious = true) {
    if (savePrevious) {
      saveToLocalStorage(false);
    }

    state.activeShift = (newShift === 'noturno') ? 'noturno' : 'diurno';
    if (isBrowser && typeof localStorage !== 'undefined') {
      localStorage.setItem('trajetoria_economia_active_shift', state.activeShift);
    }

    const curricula = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                      (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                      (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));

    if (curricula && curricula[state.activeShift]) {
      state.curriculum = curricula[state.activeShift];
    } else if (curricula && curricula.disciplinas) {
      state.curriculum = curricula;
    }

    state.courses = state.curriculum?.disciplinas || {};

    if (dom.shiftSelect) {
      dom.shiftSelect.value = state.activeShift;
    }

    updateStageChipsForShift(state.activeShift);
    buildDagMaps();
    loadOrInitializeAllocations();

    if (isBrowser) {
      updateDynamicColumnVisibility();
      revalidateAllCascades();
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
    }
  }

  function switchShift(newShift) {
    if (newShift === state.activeShift && state.curriculum) return;
    applyCurriculumShift(newShift, true);
    const shiftLabel = state.activeShift === 'noturno' ? 'Noturno' : 'Diurno';
    if (isBrowser && typeof showToast === 'function') {
      showToast(`Modalidade alterada para Ciências Econômicas (${shiftLabel}).`, 'info');
    }
  }

  async function loadCurriculumData() {
    if (isBrowser && typeof localStorage !== 'undefined') {
      const savedShift = localStorage.getItem('trajetoria_economia_active_shift');
      if (savedShift === 'noturno' || savedShift === 'diurno') {
        state.activeShift = savedShift;
      }
    }

    const localFallback = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                          (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                          (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));

    let loadedCurricula = null;
    const isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
    if (isFileProtocol && localFallback) {
      loadedCurricula = localFallback;
    } else {
      try {
        const resp = await fetch('curriculum_data.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        loadedCurricula = await resp.json();
      } catch (e) {
        console.warn('Fetch de curriculum_data.json falhou, utilizando fallback local em memória:', e);
        if (localFallback) {
          loadedCurricula = localFallback;
        } else {
          showToast('Não foi possível carregar curriculum_data.json. Verifique o servidor estático.', 'error');
          throw new Error('Falha ao carregar dados curriculares.');
        }
      }
    }

    if (loadedCurricula && loadedCurricula.diurno && loadedCurricula.noturno) {
      if (typeof window !== 'undefined') window.ECONOMIA_CURRICULA = loadedCurricula;
    }

    applyCurriculumShift(state.activeShift, false);
  }

  // =========================================================================
  // CONSTRUÇÃO DO GRAFO DIRIGIDO (DAG LOOKUPS)
  // =========================================================================
  function buildDagMaps() {
    state.prereqMap = {};
    state.dependentMap = {};

    Object.keys(state.courses).forEach(code => {
      state.prereqMap[code] = [...(state.courses[code].prerequisitos || [])];
      state.dependentMap[code] = [];
    });

    // Constrói mapa inverso de dependentes (quem A desbloqueia)
    Object.keys(state.courses).forEach(code => {
      const prereqs = state.courses[code].prerequisitos || [];
      prereqs.forEach(pCode => {
        if (state.dependentMap[pCode]) {
          if (!state.dependentMap[pCode].includes(code)) {
            state.dependentMap[pCode].push(code);
          }
        }
      });
    });
  }

  // =========================================================================
  // GERENCIAMENTO DE NOMENCLATURA E PERIODICIDADE DE COLUNAS
  // =========================================================================

  /**
   * Obtém o título exibido da coluna de semestre (ex: '2024/1' ou 'Semestre 1')
   */
  function getColumnTitle(semIndex) {
    if (state.columnNames && state.columnNames[semIndex]) {
      return state.columnNames[semIndex];
    }
    if (state.columnNames && state.columnNames[1]) {
      const m = String(state.columnNames[1]).match(/^(\d{4})\/([12])$/);
      if (m) {
        const baseYear = parseInt(m[1], 10);
        const basePeriod = parseInt(m[2], 10);
        const offset = semIndex - 1;
        const totalHalfYears = (basePeriod - 1) + offset;
        const y = baseYear + Math.floor(totalHalfYears / 2);
        const p = (totalHalfYears % 2) + 1;
        return `${y}/${p}`;
      }
    }
    return `Semestre ${semIndex}`;
  }

  /**
   * Determina se uma coluna representa o 1º período letivo ('1') ou 2º período letivo ('2') do ano civil.
   * Derivado do sufixo do nome customizado (ex: '/1', '/2') ou da paridade sequencial (Ímpar = 1, Par = 2).
   */
  function getColumnPeriod(semIndex) {
    const title = getColumnTitle(semIndex);
    if (title.includes('/1') || title.endsWith('.1') || title.endsWith('-1')) return '1';
    if (title.includes('/2') || title.endsWith('.2') || title.endsWith('-2')) return '2';
    return (semIndex % 2 === 1) ? '1' : '2';
  }

  /**
   * Dado um semestre inicial e a restrição de período da disciplina ('1', '2' ou 'ambos'),
   * retorna o próximo semestre válido que satisfaz a periodicidade.
   */
  function getNextValidPeriodSemester(semIndex, reqPeriod) {
    if (!reqPeriod || reqPeriod === 'ambos') return semIndex;
    let s = semIndex;
    while (getColumnPeriod(s) !== reqPeriod && s <= 60) {
      s++;
    }
    return s;
  }

  /**
   * Computa a soma de créditos de todas as disciplinas alocadas em semestres anteriores a semIndex (< semIndex).
   */
  function calculateAccumulatedCredits(semIndex, allocs = state.allocations) {
    if (!semIndex || semIndex <= 1) return 0;
    let total = 0;
    Object.keys(allocs).forEach(code => {
      const item = allocs[code];
      if (item && item.semester !== null && item.semester < semIndex) {
        const c = state.courses[code];
        if (c && typeof c.creditos === 'number') {
          total += c.creditos;
        }
      }
    });
    return total;
  }

  // =========================================================================
  // ALOCAÇÃO INICIAL / PERSISTÊNCIA LOCAL
  // =========================================================================
  function loadOrInitializeAllocations() {
    if (isBrowser && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(getShiftStorageKey());
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.allocations && parsed.fdcSchema === 3) {
                    if (parsed.shift && (parsed.shift === 'diurno' || parsed.shift === 'noturno') && parsed.shift !== state.activeShift) {
          applyCurriculumShift(parsed.shift, false);
        }
        state.allocations = parsed.allocations;
 state.altChoice = (parsed.altChoice && typeof parsed.altChoice === 'object') ? parsed.altChoice : {};
            state.currentFdc = normalizeFdc(parsed.currentFdc, parsed.fdcSchema);
            state.columnNames = parsed.columnNames || {};
            if (dom.fdcSelect) dom.fdcSelect.value = state.currentFdc;
            if (dom.fdcChipsGroup) {
              dom.fdcChipsGroup.querySelectorAll('.fdc-chip').forEach(chip => {
                chip.classList.toggle('active', chip.dataset.fdc === String(state.currentFdc));
              });
            }
            if (parsed.baseYear && dom.baseYearInput) dom.baseYearInput.value = parsed.baseYear;
            if (parsed.basePeriod && dom.basePeriodSelect) dom.basePeriodSelect.value = parsed.basePeriod;
            return;
          }
        } catch (err) {
          console.error('Falha ao restaurar dados salvos:', err);
        }
      }
    }

    resetToDefaultCurriculum();
  }

  function resetToDefaultCurriculum() {
    pushHistoryState();
    state.allocations = {};
    state.altChoice = {};
    Object.keys(state.courses).forEach(code => {
      const c = state.courses[code];
      const tipo = getCourseTypeInFdc(code, state.currentFdc);
      const etapa = getCourseStageInFdc(code, state.currentFdc);

      if (tipo === 'obrigatoria' && etapa && etapa >= 1 && etapa <= 10) {
        state.allocations[code] = {
          semester: etapa,
          completed: false,
          hasOverflow: false
        };
      } else {
        // Eletivas gerais e sem etapa vão para o Drawer (não alocadas)
        state.allocations[code] = {
          semester: null,
          completed: false,
          hasOverflow: false
        };
      }
    });

    if (dom.fdcSelect) dom.fdcSelect.value = state.currentFdc;
    if (dom.fdcChipsGroup) {
      dom.fdcChipsGroup.querySelectorAll('.fdc-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.fdc === String(state.currentFdc));
      });
    }

    // Reset default column names
    state.columnNames = {};
    for (let sem = 1; sem <= 20; sem++) {
      state.columnNames[sem] = `Semestre ${sem}`;
    }

    revalidateAllCascades();
  }

  function saveToLocalStorage(showFeedback = true) {
    if (!isBrowser || typeof localStorage === 'undefined') return;
    const payload = {
      course: 'Ciências Econômicas',
      shift: state.activeShift,
      allocations: state.allocations,
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      columnNames: state.columnNames,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(getShiftStorageKey(), JSON.stringify(payload));
    localStorage.setItem('trajetoria_economia_active_shift', state.activeShift);
    if (showFeedback) {
      showToast('Planejamento salvo com sucesso no navegador!', 'success');
    }
  }

  // =========================================================================
  // CLASSIFICAÇÃO DE CURSOS CONFORME A FDC
  // =========================================================================
  /** Normaliza o id de FDC para 1..3 (esquema legado v2: 1=Essencial, 2=CAD/CAM, 3=Mecanica, 4=Potencia). */
  function normalizeFdc(value, schema) {
    let id = parseInt(value, 10);
    if (isNaN(id)) return 1;
    if (schema !== 3) id = Math.max(1, id - 1);
    return Math.min(3, Math.max(1, id));
  }

  /** Resolve a escolha ativa de um par de alternativas exclusivas (retorna 'obrigatoria'/'eletiva' ou null). */
  function resolveAlternativeType(code, course, altChoice) {
    if (!course || !course.alternativeOf) return null;
    const chosen = altChoice[[code, course.alternativeOf].sort().join('|')];
    if (!chosen) return null;
    return chosen === code ? 'obrigatoria' : 'eletiva';
  }

  function getCourseTypeInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return 'inexistente';
    return c.tipo || c.tipo_padrao || (c.etapa_sugerida ? 'obrigatoria' : 'eletiva');
  }

  function getCourseStageInFdc(courseCode, fdcId) {
    const c = state.courses[courseCode];
    if (!c) return null;
    return c.etapa_sugerida || null;
  }

  function getCourseTypeInCurrentFdc(courseCode) {
    return getCourseTypeInFdc(courseCode, state.currentFdc);
  }

  /**
   * Promove 'code' a Obrigatoria e rebaixa sua alternativa exclusiva a Eletiva (Banco de Eletivas).
   * Se a alternativa ja foi cursada, permanece na grade contabilizada como Eletiva.
   */
  function swapAlternative(code, targetSemester = null, triggerNotify = true) {
    pushHistoryState();
    const course = state.courses[code];
    const otherCode = course && course.alternativeOf;
    if (!otherCode || !state.courses[otherCode]) return false;
    const other = state.allocations[otherCode];
    const target = targetSemester || (other && other.semester) || getCourseStageInFdc(code, state.currentFdc) || course.etapa_sugerida || 5;
    state.altChoice[[code, otherCode].sort().join('|')] = code;
    if (other && other.semester !== null && !other.completed) {
      other.previousSemester = other.semester;
      moveCourse(otherCode, null, false);
    }
    moveCourse(code, target, false);
    if (triggerNotify) showToast(`${code} agora é Obrigatória; ${otherCode} passou a Eletiva.`, 'info');
    return true;
  }

  // =========================================================================
  // RECONCILIAÇÃO E TRANSIÇÃO REATIVA DE FDCS
  // =========================================================================
  function switchFdc(newFdcId) {
    const oldFdc = state.currentFdc;
    if (oldFdc === newFdcId) return;

    const newlyPromoted = [];
    const newlyDemoted = [];

    Object.keys(state.courses).forEach(code => {
      const course = state.courses[code];
      const oldType = getCourseTypeInFdc(code, oldFdc);
      const newType = getCourseTypeInFdc(code, newFdcId);
      const alloc = state.allocations[code];
      if (!alloc) return;

      if (newType === 'inexistente') {
        alloc.semester = null;
        alloc.hasOverflow = false;
      } else if (oldType === 'obrigatoria' && newType === 'eletiva') {
        // Disciplina que se tornou Eletiva na nova FDC
        // Se estiver alocada no grid e não for concluída, move automaticamente para o Banco de Eletivas
        if (!alloc.completed && alloc.semester !== null) {
          alloc.previousSemester = alloc.semester; // preserva histórico
          alloc.semester = null;
          alloc.hasOverflow = false;
          newlyDemoted.push(code);
        }
      } else if (newType === 'obrigatoria' && alloc.semester === null) {
        // Disciplina que estava no banco e se tornou Obrigatória na nova FDC
        // Promove para o grid na etapa padrão curricular
        const defaultStage = getCourseStageInFdc(code, newFdcId) || course.etapa_sugerida || 8;
        alloc.semester = defaultStage;
        newlyPromoted.push({ code, targetStage: defaultStage });
      }
    });

    state.currentFdc = newFdcId;
    if (dom.fdcSelect) dom.fdcSelect.value = newFdcId;
    if (dom.fdcChipsGroup) {
      dom.fdcChipsGroup.querySelectorAll('.fdc-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.fdc === String(newFdcId));
      });
    }

    // Resolve pré-requisitos e restrições de periodicidade para disciplinas promovidas
    newlyPromoted.forEach(item => {
      moveCourse(item.code, item.targetStage, false);
    });

    // Revalidação em cascata completa do grafo
    revalidateAllCascades();
    renderAllCards();
    updateDashboardMetrics();
    scheduleConnectionRedraw();
    saveToLocalStorage(false);

    let msg = `Trilha comutada para FDC ${newFdcId}.`;
    if (newlyPromoted.length > 0 || newlyDemoted.length > 0) {
      msg += ` (+${newlyPromoted.length} obrigatória(s) no grid, ${newlyDemoted.length} movida(s) ao banco)`;
    }
    showToast(msg, 'info');
  }

  // =========================================================================
  // MOTOR DE RESTRIÇÕES E PROPAGAÇÃO EM CASCATA (DAG SOLVER)
  // =========================================================================

  /**
   * Move uma disciplina para um semestre alvo com propagação estrita em cascata e restrição de periodicidade.
   */

  // =========================================================================
  // SISTEMA DE HISTÓRICO REATIVO (UNDO / REDO)
  // =========================================================================
  const MAX_HISTORY = 30;
  const undoStack = [];
  const redoStack = [];

  function captureStateSnapshot() {
    const allocationsCopy = {};
    if (state && state.allocations) {
      for (const [code, alloc] of Object.entries(state.allocations)) {
        allocationsCopy[code] = {
          semester: alloc.semester,
          completed: Boolean(alloc.completed),
          hasOverflow: Boolean(alloc.hasOverflow)
        };
      }
    }
    const altChoiceCopy = state && state.altChoice ? { ...state.altChoice } : {};
    return {
      allocations: allocationsCopy,
      altChoice: altChoiceCopy,
      currentFdc: state ? state.currentFdc : null
    };
  }

  function pushHistoryState() {
    if (undoStack.length >= MAX_HISTORY) undoStack.shift();
    undoStack.push(captureStateSnapshot());
    redoStack.length = 0;
    updateHistoryButtons();
  }

  function updateHistoryButtons() {
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    if (btnUndo) btnUndo.disabled = undoStack.length === 0;
    if (btnRedo) btnRedo.disabled = redoStack.length === 0;
  }

  function applyStateSnapshot(snapshot) {
    if (!snapshot || !snapshot.allocations) return;
    if (snapshot.altChoice) {
      state.altChoice = { ...snapshot.altChoice };
    }
    if (snapshot.currentFdc !== undefined) {
      state.currentFdc = snapshot.currentFdc;
    }
    for (const [code, saved] of Object.entries(snapshot.allocations)) {
      if (state.allocations[code]) {
        state.allocations[code].semester = saved.semester;
        state.allocations[code].completed = saved.completed;
        state.allocations[code].hasOverflow = saved.hasOverflow;
      } else {
        state.allocations[code] = { ...saved };
      }
    }
    renderAllCards();
    updateDashboardMetrics();
    scheduleConnectionRedraw();
    saveToLocalStorage(false);
  }

  window.undoAction = function() {
    if (undoStack.length === 0) return;
    redoStack.push(captureStateSnapshot());
    const previousState = undoStack.pop();
    applyStateSnapshot(previousState);
    updateHistoryButtons();
    showToast('Ação desfeita (Ctrl+Z)', 'info');
  };

  window.redoAction = function() {
    if (redoStack.length === 0) return;
    undoStack.push(captureStateSnapshot());
    const nextState = redoStack.pop();
    applyStateSnapshot(nextState);
    updateHistoryButtons();
    showToast('Ação refeita (Ctrl+Y)', 'info');
  };

  function moveCourse(courseCode, targetSemester, triggerNotify = true) {
    pushHistoryState();
    if (!state.courses[courseCode]) return;

    // Se alvo for nulo, move para o drawer (desaloca)
    if (targetSemester === null || targetSemester === undefined) {
      state.allocations[courseCode].semester = null;
      state.allocations[courseCode].hasOverflow = false;
      updateDynamicColumnVisibility();
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
      saveToLocalStorage(false);
      if (triggerNotify) showToast(`${courseCode} movida para o Banco de Eletivas.`, 'info');
      return;
    }

    targetSemester = parseInt(targetSemester, 10);
    if (isNaN(targetSemester) || targetSemester < 1) targetSemester = 1;

    // 1. Validação a montante: Alvo não pode ser <= semestre de nenhum pré-requisito alocado
    const prereqs = state.prereqMap[courseCode] || [];
    let maxPrereqSem = 0;
    let limitingPrereq = null;

    prereqs.forEach(pCode => {
      const pAlloc = state.allocations[pCode];
      if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
        if (pAlloc.semester > maxPrereqSem) {
          maxPrereqSem = pAlloc.semester;
          limitingPrereq = pCode;
        }
      }
    });

    let adjustedSemester = targetSemester;
    let prereqAdjusted = false;
    if (maxPrereqSem > 0 && targetSemester <= maxPrereqSem) {
      adjustedSemester = maxPrereqSem + 1;
      prereqAdjusted = true;
    }

    // 2. Validação de barreira de créditos mínimos acumulados
    const minCreds = state.courses[courseCode]?.min_credits || 0;
    let creditAdjusted = false;
    if (minCreds > 0) {
      if (calculateAccumulatedCredits(adjustedSemester) < minCreds) {
        while (adjustedSemester <= 50 && calculateAccumulatedCredits(adjustedSemester) < minCreds) {
          adjustedSemester++;
        }
        creditAdjusted = true;
      }
    }

    // 3. Validação de periodicidade da própria disciplina
    const reqPeriod = state.courses[courseCode].periodicidade;
    const periodAdjustedSem = getNextValidPeriodSemester(adjustedSemester, reqPeriod);
    let periodicityAdjusted = false;
    if (periodAdjustedSem !== adjustedSemester) {
      adjustedSemester = periodAdjustedSem;
      periodicityAdjusted = true;
    }

    // Re-checa barreira de créditos caso o avanço de periodicidade tenha ocorrido
    if (minCreds > 0 && calculateAccumulatedCredits(adjustedSemester) < minCreds) {
      while (adjustedSemester <= 50 && calculateAccumulatedCredits(adjustedSemester) < minCreds) {
        adjustedSemester = getNextValidPeriodSemester(adjustedSemester + 1, reqPeriod);
      }
      creditAdjusted = true;
    }

    state.allocations[courseCode].semester = adjustedSemester;
    state.allocations[courseCode].hasOverflow = adjustedSemester > 20;

    // 4. Propagação em cascata a jusante (BFS topológica com ajuste de periodicidade e créditos)
    const queue = [courseCode];
    const cascadedList = [];

    while (queue.length > 0) {
      const currCode = queue.shift();
      const currSem = state.allocations[currCode].semester;
      if (currSem === null) continue;

      const directDependents = state.dependentMap[currCode] || [];
      directDependents.forEach(depCode => {
        const depAlloc = state.allocations[depCode];
        if (depAlloc && depAlloc.semester !== null) {
          // Se a dependente estiver no mesmo semestre ou anterior ao pai
          if (depAlloc.semester <= currSem) {
            let tentativeSem = currSem + 1;

            // Restrição de créditos na dependente
            const depMinCreds = state.courses[depCode]?.min_credits || 0;
            if (depMinCreds > 0) {
              while (tentativeSem <= 50 && calculateAccumulatedCredits(tentativeSem) < depMinCreds) {
                tentativeSem++;
              }
            }

            // Restrição de periodicidade na dependente
            const depReqPeriod = state.courses[depCode].periodicidade;
            let finalDepSem = getNextValidPeriodSemester(tentativeSem, depReqPeriod);

            if (depMinCreds > 0 && calculateAccumulatedCredits(finalDepSem) < depMinCreds) {
              while (finalDepSem <= 50 && calculateAccumulatedCredits(finalDepSem) < depMinCreds) {
                finalDepSem = getNextValidPeriodSemester(finalDepSem + 1, depReqPeriod);
              }
            }

            depAlloc.semester = finalDepSem;
            depAlloc.hasOverflow = finalDepSem > 20;

            if (!cascadedList.includes(depCode)) {
              cascadedList.push(depCode);
            }
            queue.push(depCode);
          }
        }
      });
    }

    // 5. Atualiza UI e emite aviso caso disciplinas tenham sido empurradas
    updateDynamicColumnVisibility();
    renderAllCards();
    updateDashboardMetrics();
    scheduleConnectionRedraw();
    saveToLocalStorage(false);

    if (triggerNotify) {
      if (creditAdjusted) {
        showToast(`${courseCode} ajustada para ${getColumnTitle(adjustedSemester)} (requer ${minCreds} cr acumulados; anteriores somam ${calculateAccumulatedCredits(adjustedSemester)} cr).`, 'warning');
      } else if (periodicityAdjusted && prereqAdjusted) {
        showToast(`${courseCode} avançada para ${getColumnTitle(adjustedSemester)} (pré-requisito ${limitingPrereq} e oferta no ${reqPeriod}º Sem).`, 'warning');
      } else if (periodicityAdjusted) {
        showToast(`${courseCode} ajustada para ${getColumnTitle(adjustedSemester)} (oferta restrita ao ${reqPeriod}º Semestre).`, 'warning');
      } else if (prereqAdjusted) {
        showToast(`${courseCode} ajustada para ${getColumnTitle(adjustedSemester)} para respeitar o pré-requisito ${limitingPrereq}.`, 'warning');
      } else if (cascadedList.length > 0) {
        showToast(`Propagação em cascata: ${cascadedList.length} disciplina(s) dependente(s) empurrada(s).`, 'warning');
      } else {
        showToast(`${courseCode} alocada em ${getColumnTitle(adjustedSemester)}.`, 'success');
      }
    }

    if (cascadedList.length > 0) {
      triggerCascadeFlash(cascadedList);
    }

    validateTrajectoryDag();
  }

  /**
   * Revalidação global de restrições (DAG e periodicidade) até convergência estrita
   */
  function revalidateAllCascades() {
    let changed = true;
    let iterations = 0;

    while (changed && iterations < 35) {
      changed = false;
      iterations++;

      Object.keys(state.courses).forEach(code => {
        const alloc = state.allocations[code];
        if (!alloc || alloc.semester === null) return;

        // 1. Pré-requisitos
        const prereqs = state.prereqMap[code] || [];
        let minSem = 1;
        prereqs.forEach(p => {
          const pAlloc = state.allocations[p];
          if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
            if (pAlloc.semester + 1 > minSem) {
              minSem = pAlloc.semester + 1;
            }
          }
        });

        let targetSem = Math.max(alloc.semester, minSem);

        // 2. Barreira de Créditos Mínimos
        const minCreds = state.courses[code]?.min_credits || 0;
        if (minCreds > 0) {
          while (targetSem <= 50 && calculateAccumulatedCredits(targetSem) < minCreds) {
            targetSem++;
          }
        }

        // 3. Periodicidade
        const reqPeriod = state.courses[code].periodicidade;
        let validSem = getNextValidPeriodSemester(targetSem, reqPeriod);

        if (minCreds > 0 && calculateAccumulatedCredits(validSem) < minCreds) {
          while (validSem <= 50 && calculateAccumulatedCredits(validSem) < minCreds) {
            validSem = getNextValidPeriodSemester(validSem + 1, reqPeriod);
          }
        }

        if (validSem !== alloc.semester) {
          alloc.semester = validSem;
          alloc.hasOverflow = validSem > 20;
          changed = true;
        }
      });
    }
  }

  function revalidatePeriodicityForSemester(semIndex) {
    const colPeriod = getColumnPeriod(semIndex);
    const affected = [];

    Object.keys(state.allocations).forEach(code => {
      const alloc = state.allocations[code];
      if (alloc && alloc.semester === semIndex) {
        const req = state.courses[code].periodicidade;
        if (req && req !== 'ambos' && req !== colPeriod) {
          affected.push(code);
        }
      }
    });

    if (affected.length > 0) {
      affected.forEach(code => {
        moveCourse(code, semIndex + 1, false);
      });
      revalidateAllCascades();
      updateDynamicColumnVisibility();
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
      showToast(`${affected.length} disciplina(s) avançada(s) devido à alteração de período da coluna.`, 'warning');
    }
  }

  function triggerCascadeFlash(codes) {
    if (!isBrowser) return;
    codes.forEach(code => {
      const cardEl = document.querySelector(`.course-card[data-code="${code}"]`);
      if (cardEl) {
        cardEl.classList.remove('card-cascaded');
        void cardEl.offsetWidth; // trigger reflow
        cardEl.classList.add('card-cascaded');
      }
    });
  }

  /**
   * Valida deterministicamente se há qualquer violação cronológica ou de periodicidade no DAG
   */
  function validateTrajectoryDag() {
    let hasViolations = false;
    let hasOverflow = false;

    Object.keys(state.allocations).forEach(code => {
      const alloc = state.allocations[code];
      if (!alloc) return;
      if (alloc.hasOverflow) hasOverflow = true;

      if (alloc.semester !== null && !alloc.completed) {
        // Pré-requisitos
        const prereqs = state.prereqMap[code] || [];
        prereqs.forEach(pCode => {
          const pAlloc = state.allocations[pCode];
          if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
            if (alloc.semester <= pAlloc.semester) {
              hasViolations = true;
            }
          }
        });

        // Periodicidade
        const req = state.courses[code]?.periodicidade;
        if (req && req !== 'ambos') {
          if (getColumnPeriod(alloc.semester) !== req) {
            hasViolations = true;
          }
        }

        // Barreira de Créditos Mínimos
        const minCreds = state.courses[code]?.min_credits || 0;
        if (minCreds > 0) {
          if (calculateAccumulatedCredits(alloc.semester) < minCreds) {
            hasViolations = true;
          }
        }
      }
    });

    if (isBrowser && dom.statDag) {
      if (hasViolations) {
        dom.statDag.className = 'stat-pill stat-dag-status has-violation';
        dom.statDag.querySelector('.stat-val').textContent = 'Violação no DAG';
        dom.statDag.title = 'Atenção: Existem disciplinas alocadas antes de pré-requisitos ou em período de oferta incompatível.';
      } else if (hasOverflow) {
        dom.statDag.className = 'stat-pill stat-dag-status has-violation';
        dom.statDag.querySelector('.stat-val').textContent = 'Overflow 20+';
        dom.statDag.title = 'Atenção: A cadeia de pré-requisitos excedeu o 20º semestre.';
      } else {
        dom.statDag.className = 'stat-pill stat-dag-status';
        dom.statDag.querySelector('.stat-val').textContent = 'DAG Válido';
        dom.statDag.title = 'Todas as restrições cronológicas, dependências e periodicidades estão satisfeitas.';
      }
    }

    return !hasViolations;
  }

  // =========================================================================
  // GERENCIADOR DE VISIBILIDADE DINÂMICA DE COLUNAS (BUFFER ÚNICO & EXPANSÃO ILIMITADA)
  // =========================================================================
  function updateDynamicColumnVisibility() {
    let maxAllocatedSem = 0;
    Object.keys(state.allocations).forEach(code => {
      const alloc = state.allocations[code];
      if (alloc && alloc.semester !== null && alloc.semester > maxAllocatedSem) {
        maxAllocatedSem = alloc.semester;
      }
    });

    // Se o grid estiver vazio, S_max = 0.
    // Número de colunas visíveis = max(1, S_max + 1)
    const visibleCount = Math.max(1, maxAllocatedSem + 1);
    state.visibleColumnsCount = visibleCount;

    if (typeof document === 'undefined' || !dom.grid) return;

    ensureColumnsUpTo(visibleCount);

    dom.grid.querySelectorAll('.semester-column').forEach(col => {
      const sem = parseInt(col.dataset.semester, 10);
      if (isNaN(sem)) return;

      if (sem > 20) {
        col.classList.add('column-overflow');
      } else {
        col.classList.remove('column-overflow');
      }

      if (sem <= visibleCount) {
        col.style.display = 'flex';
        if (sem === maxAllocatedSem + 1) {
          col.classList.add('is-buffer-column');
        } else {
          col.classList.remove('is-buffer-column');
        }
      } else {
        col.style.display = 'none';
        col.classList.remove('is-buffer-column');
      }
    });
  }

  // =========================================================================
  // GERADOR SEQUENCIAL DE CICLO NÃO-DESTRUTIVO (2024/1, 2024/2, 2025/1, ...)
  // =========================================================================
  function applyCycleSequence(customYear, customPeriod) {
    let startYear = 2024;
    let period = 1;

    if (typeof customYear === 'number') {
      startYear = customYear;
    } else if (typeof customYear === 'string' && !isNaN(parseInt(customYear, 10))) {
      startYear = parseInt(customYear, 10);
    } else if (dom.baseYearInput && !isNaN(parseInt(dom.baseYearInput.value, 10))) {
      startYear = parseInt(dom.baseYearInput.value, 10);
    }

    if (typeof customPeriod === 'number' || typeof customPeriod === 'string') {
      const p = parseInt(customPeriod, 10);
      if (p === 1 || p === 2) period = p;
    } else if (dom.basePeriodSelect) {
      const p = parseInt(dom.basePeriodSelect.value, 10);
      if (p === 1 || p === 2) period = p;
    }

    let year = startYear;
    const maxCols = Math.max(50, (state.visibleColumnsCount || 20) + 10);
    for (let sem = 1; sem <= maxCols; sem++) {
      state.columnNames[sem] = `${year}/${period}`;
      if (period === 1) {
        period = 2;
      } else {
        period = 1;
        year++;
      }
    }

    if (isBrowser && dom.grid) {
      // Atualiza in-place os títulos, badges e datasets das colunas sem destruir o grid
      dom.grid.querySelectorAll('.semester-column').forEach(col => {
        const sem = parseInt(col.dataset.semester, 10);
        if (isNaN(sem)) return;
        const nameEl = col.querySelector('.semester-name');
        if (nameEl) nameEl.textContent = getColumnTitle(sem);
        const colPeriod = getColumnPeriod(sem);
        const pill = col.querySelector('.period-pill');
        if (pill) {
          pill.className = `period-pill period-${colPeriod}`;
          pill.textContent = colPeriod === '1' ? '1º Sem' : '2º Sem';
        }
        col.dataset.period = colPeriod;
      });

      revalidateAllCascades();
      updateDynamicColumnVisibility();
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
      saveToLocalStorage(false);
      showToast(`Ciclo letivo aplicado a partir de ${state.columnNames[1]}.`, 'success');
    } else {
      revalidateAllCascades();
    }
  }

  // =========================================================================
  // RENDERIZAÇÃO DA ESTRUTURA DO BOARD E COLUNAS DINÂMICAS
  // =========================================================================
  function createColumnElement(sem) {
    const col = document.createElement('div');
    col.className = 'semester-column' + (sem > 20 ? ' column-overflow' : '');
    col.dataset.semester = sem;

    const colTitle = getColumnTitle(sem);
    const colPeriod = getColumnPeriod(sem);
    const periodLabel = colPeriod === '1' ? '1º Sem' : '2º Sem';

    col.innerHTML = `
      <div class="semester-header">
        <div class="semester-header-left">
          <label class="col-complete-label" title="Marcar/desmarcar todas as disciplinas deste semestre como concluídas">
            <input type="checkbox" class="col-complete-check" data-semester="${sem}" />
          </label>
          <div class="semester-title">
            <span class="semester-name" contenteditable="true" spellcheck="false" data-semester="${sem}" title="Clique para editar o título">${colTitle}</span>
            <span class="period-pill period-${colPeriod}">${periodLabel}</span>
          </div>
        </div>
        <div class="semester-badges">
          <span class="badge-sem-cr" id="sem-cr-${sem}">0 cr</span>
          <span class="badge-sem-cnt" id="sem-cnt-${sem}">0 d</span>
        </div>
      </div>
      <div class="cards-container" data-semester="${sem}">
        <div class="cards-placeholder">Solte disciplinas aqui</div>
      </div>
    `;

    // Setup completion checkbox do semestre
    const colCheck = col.querySelector('.col-complete-check');
    if (colCheck) {
      colCheck.addEventListener('change', (e) => {
        toggleSemesterColumnCompletion(sem, e.target.checked);
      });
    }

    // Setup editable name
    const nameEl = col.querySelector('.semester-name');
    if (nameEl) {
      nameEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          nameEl.blur();
        }
      });

      nameEl.addEventListener('blur', () => {
        const newName = nameEl.textContent.trim() || `Semestre ${sem}`;
        nameEl.textContent = newName;
        state.columnNames[sem] = newName;
        
        // Update period pill
        const newPeriod = getColumnPeriod(sem);
        const pill = col.querySelector('.period-pill');
        if (pill) {
          pill.className = `period-pill period-${newPeriod}`;
          pill.textContent = newPeriod === '1' ? '1º Sem' : '2º Sem';
        }

        // Revalidação de periodicidade das disciplinas ao renomear coluna
        revalidatePeriodicityForSemester(sem);
        saveToLocalStorage(false);
      });
    }

    // Setup drop zone
    const container = col.querySelector('.cards-container');
    if (container) {
      setupDropZone(container, sem);
    }

    return col;
  }

  function ensureColumnsUpTo(targetCount) {
    if (typeof document === 'undefined' || !dom.grid) return;
    const count = Math.max(20, targetCount);
    let currentMax = 0;
    dom.grid.querySelectorAll('.semester-column').forEach(col => {
      const s = parseInt(col.dataset.semester, 10);
      if (!isNaN(s) && s > currentMax) currentMax = s;
    });

    for (let sem = currentMax + 1; sem <= count; sem++) {
      const col = createColumnElement(sem);
      dom.grid.appendChild(col);
    }
  }

  function renderBoardSkeleton() {
    if (typeof document === 'undefined' || !dom.grid) return;
    dom.grid.innerHTML = '';
    const initialCols = Math.max(20, state.visibleColumnsCount || 20);
    for (let sem = 1; sem <= initialCols; sem++) {
      const col = createColumnElement(sem);
      dom.grid.appendChild(col);
    }

    setupDropZone(dom.drawerCardsList, null);
  }

  /**
   * Marca ou desmarca todas as disciplinas de uma determinada coluna de semestre como concluídas
   */
  function toggleSemesterColumnCompletion(sem, isChecked) {
    pushHistoryState();
    let affected = 0;
    Object.keys(state.allocations).forEach(code => {
      const alloc = state.allocations[code];
      if (alloc && alloc.semester === sem) {
        alloc.completed = isChecked;
        affected++;
      }
    });

    if (affected > 0) {
      renderAllCards();
      updateDashboardMetrics();
      scheduleConnectionRedraw();
      saveToLocalStorage(false);
      const colTitle = getColumnTitle(sem);
      showToast(`${colTitle}: ${affected} matéria(s) ${isChecked ? 'concluída(s)' : 'reaberta(s)'}.`, 'info');
    }
  }

  // =========================================================================
  // RENDERIZAÇÃO DE TODOS OS CARDS
  // =========================================================================
  function renderAllCards() {
    if (typeof document === 'undefined' || !dom.grid) return;
    updateDynamicColumnVisibility();

    // Limpa todas as colunas existentes no DOM e o drawer
    dom.grid.querySelectorAll('.cards-container').forEach(container => {
      container.innerHTML = '<div class="cards-placeholder">Solte disciplinas aqui</div>';
    });
    if (dom.drawerCardsList) dom.drawerCardsList.innerHTML = '';

    let drawerCount = 0;
    const maxSem = Math.max(20, state.visibleColumnsCount || 20);
    const semCredits = Array(maxSem + 1).fill(0);
    const semCounts = Array(maxSem + 1).fill(0);

    // Itera e posiciona cada disciplina
    Object.keys(state.courses).forEach(code => {
      const course = state.courses[code];
      const alloc = state.allocations[code] || { semester: null, completed: false, hasOverflow: false };
      const currentSem = alloc.semester;

      // Cria elemento do card
      const cardEl = createCardElement(code, course, alloc);

      if (currentSem && currentSem >= 1) {
        const container = dom.grid.querySelector(`.cards-container[data-semester="${currentSem}"]`);
        if (container) {
          container.appendChild(cardEl);
          if (semCredits[currentSem] !== undefined) {
            semCredits[currentSem] += (course.creditos || 0);
            semCounts[currentSem]++;
          }
        }
      } else {
        // No drawer (não alocada ou eletiva livre)
        if (dom.drawerCardsList) dom.drawerCardsList.appendChild(cardEl);
        drawerCount++;
      }
    });

    // Atualiza cabeçalhos das colunas
    dom.grid.querySelectorAll('.semester-column').forEach(col => {
      const sem = parseInt(col.dataset.semester, 10);
      if (isNaN(sem)) return;
      const crBadge = document.getElementById(`sem-cr-${sem}`);
      const cntBadge = document.getElementById(`sem-cnt-${sem}`);
      const cr = semCredits[sem] || 0;
      const cnt = semCounts[sem] || 0;
      if (crBadge) crBadge.textContent = `${cr} cr`;
      if (cntBadge) cntBadge.textContent = `${cnt} d`;
    });

    if (dom.drawerCount) dom.drawerCount.textContent = drawerCount;
    applySearchAndFilter();
    applyStageHighlightToCards();
  }

  // =========================================================================
  // CRIAÇÃO DO ELEMENTO DO CARD
  // =========================================================================
  function createCardElement(code, course, alloc) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.code = code;
    card.draggable = true;

    const tipoAtual = getCourseTypeInCurrentFdc(code);
    const isCompleted = alloc.completed;
    const isOverflow = alloc.hasOverflow || (alloc.semester && alloc.semester > 20);

    if (isCompleted) {
      card.classList.add('card-completed', 'course-completed');
      if (card.setAttribute) card.setAttribute('data-completed', 'true');
    } else {
      if (card.removeAttribute) card.removeAttribute('data-completed');
    }
    if (isOverflow) card.classList.add('card-overflow');

    // Diferenciação de categorias (Obrigatória vs FDC vs Eletiva)
    let badgeClass = 'badge-obr';
    let badgeText = 'Obrigatória';
    if (tipoAtual === 'eletiva') {
      card.classList.add('card-type-eletiva');
      badgeClass = 'badge-ele';
      badgeText = 'Eletiva';
    } else if (course.fdc_especifica) {
      card.classList.add('card-type-fdc', `fdc-${course.fdc_especifica}`);
      badgeClass = `badge-fdc badge-fdc-${course.fdc_especifica}`;
      badgeText = `FDC ${course.fdc_especifica}`;
    } else {
      card.classList.add('card-type-obrigatoria');
    }

    // Badge do Semestre Original (Etapa 1 a 10) com as 10 Cores Pastel
    let origStageBadgeHtml = '';
    const origStage = course.etapa_sugerida;
    if (typeof origStage === 'number' && origStage >= 1 && origStage <= 10) {
      card.dataset.origStage = String(origStage);
      origStageBadgeHtml = `<span class="badge-orig-stage stage-${origStage}" title="Semestre original da grade oficial: ${origStage}º Semestre">${origStage}º Sem</span>`;
    } else {
      card.dataset.origStage = 'elet';
      origStageBadgeHtml = `<span class="badge-orig-stage stage-elet" title="Disciplina Eletiva / Sem etapa fixa">Eletiva</span>`;
    }

    // Badge de periodicidade estilo CEECA (1º Sem / 2º Sem)
    let periodBadgeHtml = '';
    const periodicidade = course.periodicidade;
    if (periodicidade === '1') {
      periodBadgeHtml = `<span class="badge badge-period badge-p1" title="Oferta anual no 1º Semestre (ímpar)">1º Sem</span>`;
    } else if (periodicidade === '2') {
      periodBadgeHtml = `<span class="badge badge-period badge-p2" title="Oferta anual no 2º Semestre (par)">2º Sem</span>`;
    }

    // Validação e Badge de Créditos Mínimos
    let creditBadgeHtml = '';
    const minCreds = course.min_credits || 0;
    if (minCreds > 0) {
      const accum = alloc.semester ? calculateAccumulatedCredits(alloc.semester) : 0;
      if (alloc.semester && accum < minCreds) {
        card.classList.add('card-credit-warning');
        creditBadgeHtml = `<span class="badge badge-credit-req badge-credit-warning" title="Requer ${minCreds} créditos acumulados em semestres anteriores (Atual: ${accum} cr)">🔒 Requer ${minCreds} cr; Atual: ${accum}</span>`;
      } else {
        creditBadgeHtml = `<span class="badge badge-credit-req" title="Requisito de créditos acumulados: mínimo de ${minCreds} cr">🔒 Mín. ${minCreds} cr</span>`;
      }
    }

    const prereqCount = (course.prerequisitos || []).length;
    const prereqLabel = prereqCount > 0 ? `${prereqCount} pré-req${prereqCount > 1 ? 's' : ''}` : 'Sem pré-req';

    const isAlternative = Boolean(course.is_alternative || course.alternativeOf);
    const altCourse = course.alternativeOf ? state.courses[course.alternativeOf] : null;
    const altBadgeHtml = isAlternative ? `<span class="badge badge-alternative" title="Disciplina com opção alternativa no currículo">ALTERNATIVA</span>` : '';
    const altSwapHtml = altCourse
      ? `<button type="button" class="card-swap-alt" title="Alternar com ${altCourse.nome} (exclusão mútua)">⇄ Alternar disciplina</button>`
      : '';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-code">${code}</span>
          ${origStageBadgeHtml}
        </div>
        <button class="card-toggle-complete" title="${isCompleted ? 'Desmarcar aprovação' : 'Marcar como Cursada/Aprovada'}">
          ${isCompleted ? '✓' : ''}
        </button>
      </div>
      <div class="card-title" title="${course.nome}">${course.nome}</div>
      <div class="card-meta-row">
        <div class="card-badges">
          <span class="badge ${badgeClass}">${badgeText}</span>
          ${altBadgeHtml}
          ${periodBadgeHtml}
          ${creditBadgeHtml}
          ${isOverflow ? `<span class="badge badge-overflow">${getColumnTitle(alloc.semester)} (20+)</span>` : ''}
        </div>
        <div class="card-metrics">
          <span class="card-credits">${course.creditos} cr</span>
          <span class="card-prereq-count">${prereqLabel}</span>
        </div>
      </div>
      ${altSwapHtml}
    `;

    const btnSwapAlt = card.querySelector('.card-swap-alt');
    if (btnSwapAlt) {
      btnSwapAlt.addEventListener('click', (e) => {
        e.stopPropagation();
        swapAlternative(course.alternativeOf);
      });
      btnSwapAlt.addEventListener('mousedown', (e) => e.stopPropagation());
    }

    // Eventos de Drag & Drop
    card.addEventListener('dragstart', (e) => {
      state.draggedCourseCode = code;
      card.classList.add('is-dragging');
      e.dataTransfer.setData('text/plain', code);
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      state.draggedCourseCode = null;
      document.querySelectorAll('.semester-column, .drawer-cards-list').forEach(el => {
        el.classList.remove('drag-over');
      });
      scheduleConnectionRedraw();
    });

    // Evento de Toggle de conclusão
    const btnToggle = card.querySelector('.card-toggle-complete');
    if (btnToggle) {
      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCourseCompletion(code);
      });
    }

    // Hover para destacar pré-requisitos e desbloqueios
    card.addEventListener('mouseenter', () => {
      state.hoveredCourse = code;
      highlightConnectedNodes(code);
    });

    card.addEventListener('mouseleave', () => {
      state.hoveredCourse = null;
      if (!state.selectedCourse) {
        clearHighlights();
      } else {
        highlightConnectedNodes(state.selectedCourse);
      }
    });

    // Clique no Card -> Abre Modal
    card.addEventListener('click', () => {
      state.selectedCourse = code;
      highlightConnectedNodes(code);
      openCourseModal(code);
    });

    return card;
  }

  function toggleCourseCompletion(code) {
    if (!state.allocations[code]) return;
    pushHistoryState();
    const isNowCompleted = !state.allocations[code].completed;
    state.allocations[code].completed = isNowCompleted;
    renderAllCards();
    updateDashboardMetrics();
    scheduleConnectionRedraw();
    saveToLocalStorage(false);
    showToast(`${code} marcada como ${isNowCompleted ? 'Cursada / Concluída' : 'Pendente'}.`, 'info');
  }

  // =========================================================================
  // SETUP DE DRAG AND DROP NAS COLUNAS E DRAWER
  // =========================================================================
  function setupDropZone(dropZoneEl, semester) {
    dropZoneEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const colEl = dropZoneEl.closest('.semester-column') || dropZoneEl;
      colEl.classList.add('drag-over');
    });

    dropZoneEl.addEventListener('dragleave', () => {
      const colEl = dropZoneEl.closest('.semester-column') || dropZoneEl;
      colEl.classList.remove('drag-over');
    });

    dropZoneEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const colEl = dropZoneEl.closest('.semester-column') || dropZoneEl;
      colEl.classList.remove('drag-over');

      const code = e.dataTransfer.getData('text/plain') || state.draggedCourseCode;
      if (code) {
        const dropped = state.courses[code];
        const inBank = state.allocations[code] && state.allocations[code].semester === null;
        if (dropped && dropped.alternativeOf && semester !== null && inBank) {
          const altCode = dropped.alternativeOf;
          const altAlloc = state.allocations[altCode];
          // Se soltou exatamente no mesmo semestre da alternativa não concluída, substitui
          if (altAlloc && altAlloc.semester === semester && !altAlloc.completed) {
            swapAlternative(code, semester, true);
          } else {
            // Caso contrário, aloca no semestre selecionado mantendo ambas no board (uma obrigatória e outra eletiva)
            moveCourse(code, semester, true);
          }
        } else {
          moveCourse(code, semester, true);
        }
      }
    });
  }

  // =========================================================================
  // TRAÇADO REATIVO DE CONEXÕES BÉZIER (CAMADA SVG)
  // =========================================================================
  function calculateBezierCoordinates(r1, r2, boardRect = { left: 0, top: 0 }, currentScale = 1.0) {
    const scale = (!currentScale || currentScale <= 0) ? 1.0 : currentScale;
    const bLeft = boardRect?.left || 0;
    const bTop = boardRect?.top || 0;

    const x1 = (r1.right - bLeft) / scale;
    const y1 = (r1.top + r1.height / 2 - bTop) / scale;

    const x2 = (r2.left - bLeft) / scale;
    const y2 = (r2.top + r2.height / 2 - bTop) / scale;

    const dx = Math.max(45, Math.abs(x2 - x1) * 0.45);
    const cp1x = x1 + dx;
    const cp1y = y1;
    const cp2x = x2 - dx;
    const cp2y = y2;
    const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;

    return {
      x1, y1, x2, y2, dx,
      cp1: { x: cp1x, y: cp1y },
      cp2: { x: cp2x, y: cp2y },
      d
    };
  }

  function sampleBezierPoint(t, p0, p1, p2, p3) {
    const mt = 1 - t;
    const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
    const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
    return { x, y };
  }

  function scheduleConnectionRedraw() {
    if (!isBrowser || typeof requestAnimationFrame === 'undefined') return;
    if (state.rafPending) return;
    state.rafPending = true;
    requestAnimationFrame(() => {
      drawAllConnections();
      state.rafPending = false;
    });
  }

  function drawAllConnections() {
    if (!isBrowser || !dom.pathsGroup || !dom.canvas) return;
    dom.pathsGroup.innerHTML = '';
    const boardRect = dom.canvas.getBoundingClientRect();
    const currentScale = state.scale;

    const activeNode = state.hoveredCourse || state.selectedCourse;
    const upstreamSet = activeNode ? getUpstreamAncestors(activeNode) : new Set();
    const downstreamSet = activeNode ? getDownstreamDescendants(activeNode) : new Set();

    // Itera sobre todas as disciplinas alocadas no board
    Object.keys(state.allocations).forEach(destCode => {
      const destAlloc = state.allocations[destCode];
      if (!destAlloc || destAlloc.semester === null) return;

      const destCard = dom.canvas.querySelector(`.course-card[data-code="${destCode}"]`);
      if (!destCard) return;

      const prereqs = state.prereqMap[destCode] || [];
      prereqs.forEach(srcCode => {
        const srcAlloc = state.allocations[srcCode];
        if (!srcAlloc || srcAlloc.semester === null) return;

        const srcCard = dom.canvas.querySelector(`.course-card[data-code="${srcCode}"]`);
        if (!srcCard) return;

        const r1 = srcCard.getBoundingClientRect();
        const r2 = destCard.getBoundingClientRect();

        const coords = calculateBezierCoordinates(r1, r2, boardRect, currentScale);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', coords.d);
        path.setAttribute('class', 'connector-path');
        path.dataset.source = srcCode;
        path.dataset.target = destCode;

        // Destaque de montante/jusante
        if (activeNode) {
          if (activeNode === destCode && upstreamSet.has(srcCode)) {
            path.classList.add('highlight-upstream');
          } else if (activeNode === srcCode && downstreamSet.has(destCode)) {
            path.classList.add('highlight-downstream');
          } else if (upstreamSet.has(srcCode) && upstreamSet.has(destCode)) {
            path.classList.add('highlight-upstream');
          } else if (downstreamSet.has(srcCode) && downstreamSet.has(destCode)) {
            path.classList.add('highlight-downstream');
          } else {
            path.classList.add('dimmed');
          }
        }

        dom.pathsGroup.appendChild(path);
      });
    });
  }

  // =========================================================================
  // DESTAQUE CROMÁTICO BIDIRECIONAL & ATENUAÇÃO
  // =========================================================================
  function getUpstreamAncestors(startCode) {
    const ancestors = new Set();
    const queue = [startCode];
    while (queue.length > 0) {
      const code = queue.shift();
      const prereqs = state.prereqMap[code] || [];
      prereqs.forEach(p => {
        if (!ancestors.has(p)) {
          ancestors.add(p);
          queue.push(p);
        }
      });
    }
    return ancestors;
  }

  function getDownstreamDescendants(startCode) {
    const descendants = new Set();
    const queue = [startCode];
    while (queue.length > 0) {
      const code = queue.shift();
      const direct = state.dependentMap[code] || [];
      direct.forEach(d => {
        if (!descendants.has(d)) {
          descendants.add(d);
          queue.push(d);
        }
      });
    }
    return descendants;
  }

  function highlightConnectedNodes(targetCode) {
    const upstream = getUpstreamAncestors(targetCode);
    const downstream = getDownstreamDescendants(targetCode);

    document.querySelectorAll('.course-card').forEach(card => {
      const code = card.dataset.code;
      card.classList.remove('highlight-upstream', 'highlight-downstream', 'dimmed', 'selected-card');

      if (code === targetCode) {
        card.classList.add('selected-card');
      } else if (upstream.has(code)) {
        card.classList.add('highlight-upstream');
      } else if (downstream.has(code)) {
        card.classList.add('highlight-downstream');
      } else {
        card.classList.add('dimmed');
      }
    });

    scheduleConnectionRedraw();
  }

  function clearHighlights() {
    state.selectedCourse = null;
    document.querySelectorAll('.course-card').forEach(card => {
      card.classList.remove('highlight-upstream', 'highlight-downstream', 'dimmed', 'selected-card');
    });
    scheduleConnectionRedraw();
  }

  // =========================================================================
  // PAN E ZOOM INFINITO (MIRO ENGINE)
  // =========================================================================
  function applyCanvasTransform() {
    dom.canvas.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.scale})`;
    scheduleConnectionRedraw();
  }

  function setZoom(newScale, clientX, clientY) {
    const clampedScale = Math.min(Math.max(newScale, 0.35), 2.2);
    if (clampedScale === state.scale) return;

    const viewportRect = dom.viewport.getBoundingClientRect();
    const cx = clientX !== undefined ? clientX - viewportRect.left : viewportRect.width / 2;
    const cy = clientY !== undefined ? clientY - viewportRect.top : viewportRect.height / 2;

    // Zoom focalizado no ponteiro do mouse
    const boardX = (cx - state.panX) / state.scale;
    const boardY = (cy - state.panY) / state.scale;

    state.scale = clampedScale;
    state.panX = cx - boardX * state.scale;
    state.panY = cy - boardY * state.scale;

    dom.btnZoomReset.textContent = `${Math.round(state.scale * 100)}%`;
    applyCanvasTransform();
  }

  function fitBoardToView() {
    state.panX = 30;
    state.panY = 20;
    state.scale = 0.85;
    dom.btnZoomReset.textContent = `${Math.round(state.scale * 100)}%`;
    applyCanvasTransform();
  }

  // =========================================================================
  // MÉTRICAS E DASHBOARD
  // =========================================================================
  function updateDashboardMetrics() {
    if (!isBrowser) return;
    let totalCredits = 0;
    let allocatedCount = 0;
    let maxSem = 0;
    let doneTotal = 0;
    let doneObr = 0;
    let doneFdc = 0;
    let doneEle = 0;
    let plannedObrig = 0;
    let plannedEle = 0;

    Object.keys(state.allocations).forEach(code => {
      const alloc = state.allocations[code];
      const course = state.courses[code];
      if (!alloc || !course) return;

      const tipo = getCourseTypeInCurrentFdc(code);
      const cr = (course.creditos || 0);

      // Disciplina planejada no board
      if (alloc.semester !== null) {
        totalCredits += cr;
        allocatedCount++;
        if (alloc.semester > maxSem) {
          maxSem = alloc.semester;
        }
        if (tipo === 'eletiva') {
          plannedEle += cr;
        } else {
          plannedObrig += cr;
        }
      }

      // Disciplina marcada como Feita / Concluída
      if (alloc.completed) {
        doneTotal += cr;
        if (tipo === 'eletiva') {
          doneEle += cr;
        } else {
          doneObr += cr;
        }
      }
    });

    const metaObrig = state.curriculum?.estatisticas_nominais?.creditos_obrigatorios || 128;
    const metaEle = state.curriculum?.estatisticas_nominais?.creditos_eletivos || 44;
    const totalTarget = metaObrig + metaEle;

    // Barra 1: Obrigatórios + FDC
    const doneObrigCombined = doneObr;
    const pctObrig = metaObrig > 0 ? Math.min(100, Math.round((doneObrigCombined / metaObrig) * 100)) : 0;

    // Barra 2: Créditos Eletivos
    const pctEle = metaEle > 0 ? Math.round((doneEle / metaEle) * 100) : 0;
    const pctEleBar = Math.min(100, pctEle);

    // Barra 1 (Obrigatórios + FDC)
    if (dom.statObrigDone) dom.statObrigDone.textContent = doneObrigCombined;
    if (dom.statObrigTarget) dom.statObrigTarget.textContent = metaObrig;
    if (dom.creditsPercentText) dom.creditsPercentText.textContent = `${pctObrig}%`;
    if (dom.creditsProgressFill) dom.creditsProgressFill.style.width = `${pctObrig}%`;

    // Barra 2 (Créditos Eletivos)
    if (dom.statEleDone) dom.statEleDone.textContent = doneEle;
    if (dom.statEleTarget) dom.statEleTarget.textContent = metaEle;
    if (dom.creditsElePercentText) dom.creditsElePercentText.textContent = `${pctEle}%`;
    if (dom.creditsEleProgressFill) dom.creditsEleProgressFill.style.width = `${pctEleBar}%`;

    // Resumo Total e Mini-Cards
    if (dom.statCompletedCredits) dom.statCompletedCredits.textContent = doneTotal;
    if (dom.statTargetCredits) dom.statTargetCredits.textContent = totalTarget;
    if (dom.statDoneObr) dom.statDoneObr.textContent = `${doneObr} cr`;
    // statDoneFdc removed for Mecanica
    if (dom.statDoneEle) dom.statDoneEle.textContent = `${doneEle} cr`;

    // Métricas da grade planejada
    if (dom.statCredits) dom.statCredits.textContent = `${totalCredits} / ${totalTarget}`;
    if (dom.statCourses) dom.statCourses.textContent = `${allocatedCount} / ${Object.keys(state.courses).length}`;
    if (dom.statMaxSem) dom.statMaxSem.textContent = `${maxSem} sem`;
    if (dom.statPlannedObrig) dom.statPlannedObrig.textContent = plannedObrig;
    if (dom.statPlannedObrigTarget) dom.statPlannedObrigTarget.textContent = metaObrig;
    if (dom.statPlannedEle) dom.statPlannedEle.textContent = plannedEle;
    if (dom.statPlannedEleTarget) dom.statPlannedEleTarget.textContent = metaEle;

    // Sincroniza estado visual dos checkboxes de conclusão de coluna
    for (let s = 1; s <= 20; s++) {
      const colCheck = dom.grid ? dom.grid.querySelector(`.col-complete-check[data-semester="${s}"]`) : null;
      if (colCheck) {
        const inCol = Object.keys(state.allocations).filter(c => state.allocations[c]?.semester === s);
        if (inCol.length === 0) {
          colCheck.checked = false;
          colCheck.indeterminate = false;
          colCheck.disabled = true;
          colCheck.title = 'Nenhuma disciplina alocada neste semestre';
        } else {
          colCheck.disabled = false;
          const completedInCol = inCol.filter(c => state.allocations[c]?.completed).length;
          if (completedInCol === inCol.length) {
            colCheck.checked = true;
            colCheck.indeterminate = false;
            colCheck.title = 'Todas as disciplinas deste semestre estão concluídas';
          } else if (completedInCol > 0) {
            colCheck.checked = false;
            colCheck.indeterminate = true;
            colCheck.title = `${completedInCol} de ${inCol.length} disciplinas concluídas (parcial)`;
          } else {
            colCheck.checked = false;
            colCheck.indeterminate = false;
            colCheck.title = 'Marcar todas as disciplinas deste semestre como concluídas';
          }
        }
      }
    }

    validateTrajectoryDag();
  }

  // =========================================================================
  // BUSCA E FILTRAGEM
  // =========================================================================
  function applySearchAndFilter() {
    const q = state.searchQuery.trim().toLowerCase();
    const filter = state.filter;

    document.querySelectorAll('.course-card').forEach(card => {
      const code = card.dataset.code;
      const course = state.courses[code];
      const alloc = state.allocations[code];
      const tipo = getCourseTypeInCurrentFdc(code);

      let matchesSearch = true;
      if (q) {
        matchesSearch = code.toLowerCase().includes(q) || (course && course.nome.toLowerCase().includes(q));
      }

      let matchesFilter = true;
      if (filter === 'mandatory') {
        matchesFilter = (tipo === 'obrigatoria');
      } else if (filter === 'elective') {
        matchesFilter = (tipo === 'eletiva');
      } else if (filter === 'completed') {
        matchesFilter = !!alloc?.completed;
      } else if (filter === 'pending') {
        matchesFilter = !alloc?.completed;
      } else if (filter === 'overflow') {
        matchesFilter = !!alloc?.hasOverflow;
      }

      if (matchesSearch && matchesFilter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    scheduleConnectionRedraw();
  }

  // =========================================================================
  // DESTAQUE VISUAL POR SEMESTRE ORIGINAL (ETAPAS 1 A 10 + ELETIVAS)
  // =========================================================================
  function setStageHighlight(stageKey) {
    if (!stageKey || stageKey === 'all' || stageKey === state.highlightStage) {
      state.highlightStage = null;
    } else {
      state.highlightStage = String(stageKey);
    }
    updateStageHighlightChips();
    applyStageHighlightToCards();
    scheduleConnectionRedraw();
  }

  function updateStageHighlightChips() {
    if (!isBrowser) return;
    const activeKey = state.highlightStage || 'all';
    document.querySelectorAll('.stage-chip').forEach(chip => {
      if (chip.dataset.stage === activeKey) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function applyStageHighlightToCards() {
    if (!isBrowser) return;
    const activeKey = state.highlightStage;
    const cards = document.querySelectorAll('.course-card');
    if (!activeKey) {
      cards.forEach(card => {
        card.classList.remove('stage-highlighted', 'stage-dimmed');
      });
      return;
    }

    cards.forEach(card => {
      const code = card.dataset.code;
      const course = state.courses[code];
      let cardStage = 'elet';
      if (course && typeof course.etapa_sugerida === 'number' && course.etapa_sugerida >= 1 && course.etapa_sugerida <= 10) {
        cardStage = String(course.etapa_sugerida);
      }
      if (cardStage === activeKey) {
        card.classList.add('stage-highlighted');
        card.classList.remove('stage-dimmed');
      } else {
        card.classList.add('stage-dimmed');
        card.classList.remove('stage-highlighted');
      }
    });
  }

  // =========================================================================
  // MODAL DE DETALHES
  // =========================================================================
  function openCourseModal(code) {
    const course = state.courses[code];
    const alloc = state.allocations[code];
    if (!course) return;

    dom.modalCode.textContent = code;
    dom.modalName.textContent = course.nome;
    dom.modalCredits.textContent = `${course.creditos} cr`;
    dom.modalCh.textContent = `${course.carga_horaria}h`;
    dom.modalChe.textContent = `${course.carga_horaria_extensao || 0}h`;
    dom.modalEtapa.textContent = course.etapa_sugerida ? `${course.etapa_sugerida}ª Etapa` : 'Sem Etapa Sugerida';
    dom.modalCurrentSem.textContent = alloc?.semester ? getColumnTitle(alloc.semester) : 'No Banco de Eletivas';
    
    const pText = course.periodicidade === '1' ? '1º Semestre' : (course.periodicidade === '2' ? '2º Semestre' : 'Ambos os Semestres (1º e 2º)');
    dom.modalPeriodicity.textContent = pText;
    dom.modalStatus.textContent = alloc?.completed ? 'Concluída / Aprovada' : 'Pendente';

    // Badges
    const tipo = getCourseTypeInCurrentFdc(code);
    dom.modalBadges.innerHTML = `
      <span class="badge ${tipo === 'obrigatoria' ? 'badge-obr' : 'badge-ele'}">
        ${tipo === 'obrigatoria' ? 'Obrigatória' : 'Eletiva'}
      </span>
      ${course.fdc_especifica && tipo === 'obrigatoria' ? `<span class="badge badge-fdc badge-fdc-${course.fdc_especifica}">FDC ${course.fdc_especifica}</span>` : ''}
      ${course.periodicidade && course.periodicidade !== 'ambos' ? `<span class="badge badge-period badge-p${course.periodicidade}">Oferta: ${course.periodicidade}º Sem</span>` : ''}
      ${course.min_credits > 0 ? `<span class="badge badge-warning" style="background:#f59e0b;color:#0f172a;font-weight:600;">Mín. ${course.min_credits} cr acumulados</span>` : ''}
      ${alloc?.completed ? `<span class="badge badge-compl">Cursada</span>` : ''}
    `;

    // Pré-requisitos chips
    dom.modalPrereqs.innerHTML = '';
    const prereqs = state.prereqMap[code] || [];
    if (prereqs.length === 0) {
      dom.modalPrereqs.innerHTML = '<span class="text-muted" style="font-size:11px">Nenhum pré-requisito necessário.</span>';
    } else {
      prereqs.forEach(pCode => {
        const pCourse = state.courses[pCode];
        const chip = document.createElement('div');
        chip.className = 'chip-item';
        chip.innerHTML = `<span class="chip-code">${pCode}</span> <span>${pCourse ? pCourse.nome : ''}</span>`;
        chip.addEventListener('click', () => {
          dom.modalOverlay.classList.add('hidden');
          locateAndFocusCard(pCode);
        });
        dom.modalPrereqs.appendChild(chip);
      });
    }

    // Disciplinas Liberadas (A Jusante)
    dom.modalDependents.innerHTML = '';
    const dependents = state.dependentMap[code] || [];
    if (dependents.length === 0) {
      dom.modalDependents.innerHTML = '<span class="text-muted" style="font-size:11px">Não é pré-requisito direto de outras disciplinas.</span>';
    } else {
      dependents.forEach(dCode => {
        const dCourse = state.courses[dCode];
        const chip = document.createElement('div');
        chip.className = 'chip-item';
        chip.innerHTML = `<span class="chip-code">${dCode}</span> <span>${dCourse ? dCourse.nome : ''}</span>`;
        chip.addEventListener('click', () => {
          dom.modalOverlay.classList.add('hidden');
          locateAndFocusCard(dCode);
        });
        dom.modalDependents.appendChild(chip);
      });
    }

    // Botões de ação do modal
    dom.modalBtnToggleCompleted.textContent = alloc?.completed ? 'Desmarcar Aprovação' : 'Marcar como Cursada';
    dom.modalBtnToggleCompleted.onclick = () => {
      toggleCourseCompletion(code);
      openCourseModal(code);
    };

    dom.modalBtnUnallocate.onclick = () => {
      moveCourse(code, null, true);
      dom.modalOverlay.classList.add('hidden');
    };

    dom.modalBtnLocate.onclick = () => {
      dom.modalOverlay.classList.add('hidden');
      locateAndFocusCard(code);
    };

    dom.modalOverlay.classList.remove('hidden');
  }

  function locateAndFocusCard(code) {
    const cardEl = dom.canvas.querySelector(`.course-card[data-code="${code}"]`);
    if (!cardEl) {
      if (!state.drawerOpen) {
        state.drawerOpen = true;
        dom.drawer.classList.add('open');
      }
      const drawerCard = dom.drawerCardsList.querySelector(`.course-card[data-code="${code}"]`);
      if (drawerCard) {
        drawerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        drawerCard.classList.add('card-cascaded');
      }
      return;
    }

    // Pan canvas até o card
    const cardRect = cardEl.getBoundingClientRect();
    const viewportRect = dom.viewport.getBoundingClientRect();

    state.panX = viewportRect.width / 2 - (cardEl.offsetLeft + cardEl.offsetWidth / 2) * state.scale;
    state.panY = viewportRect.height / 2 - (cardEl.offsetTop + cardEl.offsetHeight / 2) * state.scale;

    applyCanvasTransform();
    highlightConnectedNodes(code);
    cardEl.classList.add('card-cascaded');
  }

  // =========================================================================
  // PERSISTÊNCIA EM ARQUIVO JSON E UTILITÁRIO "SALVAR COMO"
  // =========================================================================

  /**
   * Abre imediatamente o seletor nativo de arquivos para preservar a ativação transitória
   * do clique do usuário (user activation) antes de processos pesados de renderização.
   */
  async function pickSaveTarget(suggestedName, description, mimeType, extension) {
    if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{
            description: description || 'Arquivo',
            accept: { [mimeType]: [extension] }
          }]
        });
        return { handle, fileName: suggestedName };
      } catch (err) {
        if (err.name === 'AbortError') {
          return null; // Usuário cancelou a escolha do arquivo
        }
        console.warn('showSaveFilePicker prévio falhou, usando prompt/fallback:', err);
      }
    }

    // Fallback compatível via prompt
    let fileName = suggestedName;
    if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
      const userInput = window.prompt('Digite o nome do arquivo para salvar:', suggestedName);
      if (userInput === null) {
        return null;
      }
      const trimmed = userInput.trim();
      if (trimmed) {
        fileName = trimmed.toLowerCase().endsWith(extension.toLowerCase()) ? trimmed : `${trimmed}${extension}`;
      }
    }

    return { handle: null, fileName };
  }

  /**
   * Salva um arquivo permitindo ao usuário escolher a pasta e o nome via File System Access API
   * com fallback transparente para window.prompt e download via âncora DOM.
   * Se prePickedTarget for fornecido, grava diretamente no handle/arquivo já selecionado.
   */
  async function saveFileWithDialog(blob, suggestedName, description, mimeType, extension, prePickedTarget = null) {
    // 1. Se recebemos um destino pré-selecionado (para evitar bloqueio de user activation)
    if (prePickedTarget) {
      if (prePickedTarget.handle) {
        try {
          const writable = await prePickedTarget.handle.createWritable();
          await writable.write(blob);
          await writable.close();
          return true;
        } catch (err) {
          console.warn('Falha ao escrever no handle pré-selecionado, tentando download DOM:', err);
        }
      }
      if (prePickedTarget.fileName && typeof document !== 'undefined') {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = prePickedTarget.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        return true;
      }
    }

    // 2. Fluxo direto tradicional (ex.: exportStateToJson ou chamadas diretas)
    if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{
            description: description || 'Arquivo',
            accept: { [mimeType]: [extension] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return true;
      } catch (err) {
        if (err.name === 'AbortError') {
          // Usuário cancelou a janela de escolha de pasta/arquivo
          return false;
        }
        console.warn('showSaveFilePicker falhou, tentando fallback:', err);
      }
    }

    // Fallback compatível via prompt
    let fileName = suggestedName;
    if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
      const userInput = window.prompt('Digite o nome do arquivo para salvar:', suggestedName);
      if (userInput === null) {
        // Usuário cancelou o prompt
        return false;
      }
      const trimmed = userInput.trim();
      if (trimmed) {
        fileName = trimmed.toLowerCase().endsWith(extension.toLowerCase()) ? trimmed : `${trimmed}${extension}`;
      }
    }

    if (typeof document !== 'undefined' && typeof document.createElement === 'function' && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    }

    return false;
  }

  function exportStateToJson() {
    const payload = {
      app: 'trajetoria_economia_ufrgs_v1',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      course: 'Ciências Econômicas',
      shift: state.activeShift,
      currentFdc: state.currentFdc,
      fdcSchema: 3,
      altChoice: state.altChoice,
      baseYear: dom.baseYearInput?.value || '2024',
      basePeriod: dom.basePeriodSelect?.value || '1',
      columnNames: state.columnNames,
      allocations: state.allocations
    };

    const jsonStr = JSON.stringify(payload, null, 2);
    if (!isBrowser) {
      return jsonStr;
    }

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const dateStr = new Date().toISOString().slice(0, 10);
    const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';
    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.json`;
    saveFileWithDialog(blob, suggestedName, 'Arquivo JSON de Planejamento Curricular', 'application/json', '.json')
      .then(saved => {
        if (saved) {
          showToast('Plano curricular exportado em arquivo JSON com sucesso!', 'success');
        }
      })
      .catch(err => {
        console.error('Erro ao salvar JSON:', err);
        showToast(`Erro ao exportar JSON: ${err.message}`, 'error');
      });

    return jsonStr;
  }

  function importStateFromJson(fileOrJson) {
    if (!fileOrJson) return;

    if (typeof fileOrJson === 'string' || (typeof fileOrJson === 'object' && !fileOrJson.name && fileOrJson.allocations)) {
      const parsed = typeof fileOrJson === 'string' ? JSON.parse(fileOrJson) : fileOrJson;
      if (!parsed || !parsed.allocations || typeof parsed.allocations !== 'object') {
        throw new Error('Arquivo JSON inválido: campo "allocations" não encontrado.');
      }

              if (parsed.shift && (parsed.shift === 'diurno' || parsed.shift === 'noturno') && parsed.shift !== state.activeShift) {
          applyCurriculumShift(parsed.shift, false);
        }
        state.allocations = parsed.allocations;
 state.altChoice = (parsed.altChoice && typeof parsed.altChoice === 'object') ? parsed.altChoice : {};
      if (parsed.currentFdc) {
        state.currentFdc = normalizeFdc(parsed.currentFdc, parsed.fdcSchema);
        if (dom.fdcSelect) dom.fdcSelect.value = state.currentFdc;
        if (dom.fdcChipsGroup) {
          dom.fdcChipsGroup.querySelectorAll('.fdc-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.fdc === String(state.currentFdc));
          });
        }
      }
      if (parsed.columnNames && typeof parsed.columnNames === 'object') {
        state.columnNames = parsed.columnNames;
      }
      if (parsed.baseYear && dom.baseYearInput) dom.baseYearInput.value = parsed.baseYear;
      if (parsed.basePeriod && dom.basePeriodSelect) dom.basePeriodSelect.value = parsed.basePeriod;

      if (isBrowser) {
        renderBoardSkeleton();
        updateDynamicColumnVisibility();
        revalidateAllCascades();
        renderAllCards();
        updateDashboardMetrics();
        scheduleConnectionRedraw();
        saveToLocalStorage(false);
        showToast('Plano curricular restaurado com sucesso a partir do arquivo JSON!', 'success');
      } else {
        revalidateAllCascades();
      }
      return true;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed || !parsed.allocations || typeof parsed.allocations !== 'object') {
          throw new Error('Arquivo JSON inválido: campo "allocations" não encontrado.');
        }

                if (parsed.shift && (parsed.shift === 'diurno' || parsed.shift === 'noturno') && parsed.shift !== state.activeShift) {
          applyCurriculumShift(parsed.shift, false);
        }
        state.allocations = parsed.allocations;
 state.altChoice = (parsed.altChoice && typeof parsed.altChoice === 'object') ? parsed.altChoice : {};
        if (parsed.currentFdc) {
          state.currentFdc = normalizeFdc(parsed.currentFdc, parsed.fdcSchema);
          if (dom.fdcSelect) dom.fdcSelect.value = state.currentFdc;
          if (dom.fdcChipsGroup) {
            dom.fdcChipsGroup.querySelectorAll('.fdc-chip').forEach(chip => {
              chip.classList.toggle('active', chip.dataset.fdc === String(state.currentFdc));
            });
          }
        }
        if (parsed.columnNames && typeof parsed.columnNames === 'object') {
          state.columnNames = parsed.columnNames;
        }
        if (parsed.baseYear && dom.baseYearInput) dom.baseYearInput.value = parsed.baseYear;
        if (parsed.basePeriod && dom.basePeriodSelect) dom.basePeriodSelect.value = parsed.basePeriod;

        renderBoardSkeleton();
        updateDynamicColumnVisibility();
        revalidateAllCascades();
        renderAllCards();
        updateDashboardMetrics();
        scheduleConnectionRedraw();
        saveToLocalStorage(false);

        showToast('Plano curricular restaurado com sucesso a partir do arquivo JSON!', 'success');
      } catch (err) {
        showToast(`Falha na importação: ${err.message}`, 'error');
      }
    };
    reader.readAsText(fileOrJson);
  }

  // =========================================================================
  // EXPORTAÇÃO VISUAL EM ALTA RESOLUÇÃO (PNG E PDF)
  // =========================================================================

  /**
   * Garante que as bibliotecas de exportação visual estejam carregadas via CDN caso não presentes
   */
  /**
   * Garante que a biblioteca jsPDF esteja carregada via CDN caso não presente
   */
  async function ensureExportLibsLoaded() {
    if (!isBrowser) return true;
    const hasJsPdf = (typeof window !== 'undefined' && ((window.jspdf && window.jspdf.jsPDF) || window.jsPDF));
    if (hasJsPdf) return true;

    const loadScript = (src) => new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve();
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error(`Falha ao carregar script ${src}`)));
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = () => reject(new Error(`Falha ao carregar script ${src}`));
      document.head.appendChild(script);
    });

    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      return true;
    } catch (e) {
      console.warn('Carregamento dinâmico de jsPDF falhou; o motor usará gerador PDF nativo embutido:', e);
      return true;
    }
  }

  /**
   * Gerador PDF 1.4 nativo embutido (zero dependências)
   * Encapsula uma imagem JPEG em um documento PDF padrão com /Filter /DCTDecode.
   */
  function generateMinimalPdfFromJpeg(jpegDataUrl, width, height) {
    const base64 = jpegDataUrl.split(',')[1];
    const binaryStr = typeof atob === 'function' ? atob(base64) : Buffer.from(base64, 'base64').toString('binary');
    const jpegBytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      jpegBytes[i] = binaryStr.charCodeAt(i);
    }

    const contentStream = `q\n${width.toFixed(2)} 0 0 ${height.toFixed(2)} 0 0 cm\n/Img Do\nQ\n`;
    const contentLen = contentStream.length;
    const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';

    const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
    const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
    const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width.toFixed(2)} ${height.toFixed(2)}] /Contents 4 0 R /Resources << /XObject << /Img 5 0 R >> >> >>\nendobj\n`;
    const obj4 = `4 0 obj\n<< /Length ${contentLen} >>\nstream\n${contentStream}endstream\nendobj\n`;
    const obj5Prefix = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${Math.round(width)} /Height ${Math.round(height)} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
    const obj5Suffix = '\nendstream\nendobj\n';

    const enc = new TextEncoder();
    const bHeader = enc.encode(header);
    const bObj1 = enc.encode(obj1);
    const bObj2 = enc.encode(obj2);
    const bObj3 = enc.encode(obj3);
    const bObj4 = enc.encode(obj4);
    const bObj5Prefix = enc.encode(obj5Prefix);
    const bObj5Suffix = enc.encode(obj5Suffix);

    const offset1 = bHeader.length;
    const offset2 = offset1 + bObj1.length;
    const offset3 = offset2 + bObj2.length;
    const offset4 = offset3 + bObj3.length;
    const offset5 = offset4 + bObj4.length;
    const offsetEnd = offset5 + bObj5Prefix.length + jpegBytes.length + bObj5Suffix.length;

    const pad = (n) => String(n).padStart(10, '0');
    const xref = `xref\n0 6\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n`;
    const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${offsetEnd}\n%%EOF\n`;
    const bXref = enc.encode(xref);
    const bTrailer = enc.encode(trailer);

    return new Blob([
      bHeader,
      bObj1,
      bObj2,
      bObj3,
      bObj4,
      bObj5Prefix,
      jpegBytes,
      bObj5Suffix,
      bXref,
      bTrailer
    ], { type: 'application/pdf' });
  }

  /**
   * Helper para quebra de linha de títulos longos no Canvas 2D
   */
  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        if (lineCount >= maxLines - 1) {
          line = line.trim() + '...';
          ctx.fillText(line, x, curY);
          return curY;
        }
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
        lineCount++;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY;
  }

  /**
   * MOTOR DE RENDERIZAÇÃO NATIVO CANVAS 2D (ZERO DEPENDÊNCIAS DE PARSER CSS)
   * Desenha diretamente as 4 camadas do board (Fundo Miro, Curvas SVG Path2D, Colunas e Cards)
   * em alta resolução independente do nível atual de zoom e pan da viewport.
   */
  async function renderBoardToCanvasNative(scale = 2) {
    if (typeof document === 'undefined') {
      throw new Error('renderBoardToCanvasNative suportada apenas em ambiente de navegador.');
    }

    const exportBtns = [dom.btnExportPng, dom.btnExportPdf].filter(Boolean);
    exportBtns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });

    // Salva transformações ativas da viewport
    const prevScale = state.scale;
    const prevPanX = state.panX;
    const prevPanY = state.panY;
    const prevTransform = dom.canvas.style.transform;

    // Reseta escala para 1.0 e pan para (0,0) para alinhamento geométrico impecável
    state.scale = 1.0;
    state.panX = 0;
    state.panY = 0;
    dom.canvas.style.transform = 'none';

    // Redesenha conexões com escala 1:1
    drawAllConnections();

    try {
      const boardRect = dom.canvas.getBoundingClientRect();
      const visibleCols = Array.from(dom.grid.querySelectorAll('.semester-column')).filter(c => !c.classList.contains('hidden') && (!c.style || c.style.display !== 'none'));

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      if (visibleCols.length > 0) {
        visibleCols.forEach(col => {
          const r = col.getBoundingClientRect();
          const x = r.left - boardRect.left;
          const y = r.top - boardRect.top;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x + r.width);
          maxY = Math.max(maxY, y + r.height);
        });
      } else {
        minX = 0; minY = 0; maxX = 3000; maxY = 1200;
      }

      const padding = 36;
      const originX = minX - padding;
      const originY = minY - padding;
      const totalWidth = Math.ceil((maxX - minX) + padding * 2);
      const totalHeight = Math.ceil((maxY - minY) + padding * 2);

      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(totalWidth * scale);
      canvas.height = Math.ceil(totalHeight * scale);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.scale(scale, scale);
      ctx.translate(-originX, -originY);

      // -----------------------------------------------------------------------
      // CAMADA 1 — FUNDO ESTILO MIRO (Cor escura + grade pontilhada sutil)
      // -----------------------------------------------------------------------
      ctx.fillStyle = '#0B0F19';
      ctx.fillRect(originX, originY, totalWidth, totalHeight);

      ctx.fillStyle = '#1E293B';
      const dotSpacing = 24;
      const startX = Math.floor(originX / dotSpacing) * dotSpacing;
      const startY = Math.floor(originY / dotSpacing) * dotSpacing;
      const endX = originX + totalWidth;
      const endY = originY + totalHeight;
      for (let gx = startX; gx <= endX; gx += dotSpacing) {
        for (let gy = startY; gy <= endY; gy += dotSpacing) {
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
      }

      // -----------------------------------------------------------------------
      // CAMADA 2 — LINHAS CONECTORAS DE PRÉ-REQUISITOS (Path2D Nativo)
      // -----------------------------------------------------------------------
      const paths = dom.pathsGroup ? Array.from(dom.pathsGroup.querySelectorAll('.connector-path')) : [];
      paths.forEach(p => {
        const d = p.getAttribute('d');
        if (!d) return;

        try {
          const p2d = new Path2D(d);
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          if (p.classList.contains('highlight-upstream')) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.8;
            ctx.globalAlpha = 1.0;
          } else if (p.classList.contains('highlight-downstream')) {
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 2.8;
            ctx.globalAlpha = 1.0;
          } else if (p.classList.contains('dimmed')) {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
            ctx.lineWidth = 1.4;
            ctx.globalAlpha = 0.2;
            ctx.setLineDash([4, 3]);
          } else {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
            ctx.lineWidth = 1.8;
            ctx.globalAlpha = 0.6;
            ctx.setLineDash([4, 3]);
          }

          ctx.stroke(p2d);
          ctx.restore();
        } catch (e) {
          console.warn('Aviso: falha ao desenhar Path2D no canvas:', e);
        }
      });

      // -----------------------------------------------------------------------
      // CAMADA 3 — COLUNAS DE SEMESTRES E CABEÇALHOS
      // -----------------------------------------------------------------------
      visibleCols.forEach(col => {
        const colRect = col.getBoundingClientRect();
        const cx = colRect.left - boardRect.left;
        const cy = colRect.top - boardRect.top;
        const cw = colRect.width;
        const ch = colRect.height;

        ctx.save();
        // Fundo e contorno da coluna
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(cx, cy, cw, ch, 10);
        else ctx.rect(cx, cy, cw, ch);
        ctx.fillStyle = '#0F172A';
        ctx.fill();
        if (col.classList.contains('column-overflow')) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.55)';
          ctx.setLineDash([4, 4]);
        } else {
          ctx.strokeStyle = '#1E293B';
          ctx.setLineDash([]);
        }
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Linha divisória do cabeçalho
        const headerH = 42;
        ctx.beginPath();
        ctx.moveTo(cx, cy + headerH);
        ctx.lineTo(cx + cw, cy + headerH);
        if (col.classList.contains('column-overflow')) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.setLineDash([4, 4]);
        } else {
          ctx.strokeStyle = '#1E293B';
          ctx.setLineDash([]);
        }
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Checkbox de conclusão do semestre
        const isColComplete = col.querySelector('.col-complete-check')?.checked;
        const checkX = cx + 10;
        const checkY = cy + 13;
        const checkSize = 16;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(checkX, checkY, checkSize, checkSize, 4);
        else ctx.rect(checkX, checkY, checkSize, checkSize);
        ctx.fillStyle = isColComplete ? '#10B981' : '#1E293B';
        ctx.fill();
        ctx.strokeStyle = isColComplete ? '#10B981' : '#475569';
        ctx.lineWidth = 1;
        ctx.stroke();
        if (isColComplete) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px Inter, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', checkX + checkSize / 2, checkY + checkSize / 2 + 1);
        }

        // Título do semestre (ex: 2023/1)
        const nameEl = col.querySelector('.semester-name');
        const semTitle = nameEl ? nameEl.textContent.trim() : `Semestre ${col.dataset.semester}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 12.5px Inter, -apple-system, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(semTitle, checkX + checkSize + 8, cy + 21);

        // Pílula de paridade (1º Sem / 2º Sem)
        const periodPill = col.querySelector('.period-pill');
        if (periodPill) {
          const pText = periodPill.textContent.trim();
          const isP1 = periodPill.classList.contains('period-1');
          const pillBg = isP1 ? 'rgba(56, 189, 248, 0.16)' : 'rgba(192, 132, 252, 0.16)';
          const pillFg = isP1 ? '#38bdf8' : '#c084fc';

          ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
          const pillW = ctx.measureText(pText).width + 10;
          const pillH = 17;
          const pillX = checkX + checkSize + 8 + ctx.measureText(semTitle).width + 6;
          const pillY = cy + 12;

          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(pillX, pillY, pillW, pillH, 4);
          else ctx.rect(pillX, pillY, pillW, pillH);
          ctx.fillStyle = pillBg;
          ctx.fill();
          ctx.fillStyle = pillFg;
          ctx.textAlign = 'center';
          ctx.fillText(pText, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
        }

        // Badges de totais do semestre (créditos)
        const crBadge = col.querySelector('.badge-sem-cr');
        if (crBadge) {
          const crText = crBadge.textContent.trim();
          ctx.font = '600 10.5px "JetBrains Mono", monospace';
          const bw = ctx.measureText(crText).width + 10;
          const bx = cx + cw - bw - 10;
          const by = cy + 12;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(bx, by, bw, 18, 4);
          else ctx.rect(bx, by, bw, 18);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
          ctx.fill();
          ctx.fillStyle = '#38bdf8';
          ctx.textAlign = 'center';
          ctx.fillText(crText, bx + bw / 2, by + 10);
        }
        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // CAMADA 4 — CARDS DE DISCIPLINAS (Cores FDC, Borda Verde #10B981, Badges Pastel)
      // -----------------------------------------------------------------------
      visibleCols.forEach(col => {
        const cards = Array.from(col.querySelectorAll('.course-card'));
        cards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const kx = cardRect.left - boardRect.left;
          const ky = cardRect.top - boardRect.top;
          const kw = cardRect.width;
          const kh = cardRect.height;

          const isCompleted = card.classList.contains('card-completed') || card.dataset.completed === 'true';
          const code = card.dataset.code || '';
          const course = state.courses[code] || {};
          const origStage = card.dataset.origStage;

          ctx.save();
          // Fundo e borda do card
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(kx, ky, kw, kh, 8);
          else ctx.rect(kx, ky, kw, kh);
          ctx.fillStyle = isCompleted ? '#0f2425' : '#1e293b';
          ctx.fill();
          ctx.strokeStyle = isCompleted ? '#10B981' : '#334155';
          ctx.lineWidth = isCompleted ? 2 : 1;
          ctx.stroke();

          // 1. Código da disciplina
          ctx.font = 'bold 11px "JetBrains Mono", monospace';
          ctx.fillStyle = '#38bdf8';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(code, kx + 10, ky + 10);
          const codeW = ctx.measureText(code).width;

          // 2. Badge do semestre original (paleta de 10 cores pastel)
          const origStageColors = {
            '1': '#FFB3BA', '2': '#FFCF96', '3': '#FFF192', '4': '#C8F79B', '5': '#9BF6D0',
            '6': '#9CE8FF', '7': '#B2C9FF', '8': '#D7B8FF', '9': '#FFB5E8', '10': '#E2E8F0',
            'elet': '#CBD5E1'
          };
          const stageColor = origStageColors[origStage] || '#CBD5E1';
          const stageText = origStage === 'elet' ? 'Elet' : `${origStage}º Sem`;
          ctx.font = 'bold 9px Inter, -apple-system, sans-serif';
          const stgW = ctx.measureText(stageText).width + 8;
          const stgH = 15;
          const stgX = kx + 10 + codeW + 6;
          const stgY = ky + 8;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(stgX, stgY, stgW, stgH, 3);
          else ctx.rect(stgX, stgY, stgW, stgH);
          ctx.fillStyle = stageColor;
          ctx.fill();
          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(stageText, stgX + stgW / 2, stgY + stgH / 2 + 0.5);

          // 3. Checkbox de conclusão no card
          const chkBoxSize = 16;
          const chkBoxX = kx + kw - chkBoxSize - 10;
          const chkBoxY = ky + 8;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(chkBoxX, chkBoxY, chkBoxSize, chkBoxSize, 4);
          else ctx.rect(chkBoxX, chkBoxY, chkBoxSize, chkBoxSize);
          ctx.fillStyle = isCompleted ? '#10B981' : 'rgba(255, 255, 255, 0.05)';
          ctx.fill();
          ctx.strokeStyle = isCompleted ? '#10B981' : '#475569';
          ctx.lineWidth = 1;
          ctx.stroke();
          if (isCompleted) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 11px Inter, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✓', chkBoxX + chkBoxSize / 2, chkBoxY + chkBoxSize / 2 + 1);
          }

          // 4. Nome da disciplina com quebra de linha automática
          const name = course.nome || code;
          ctx.font = '600 11.5px Inter, -apple-system, sans-serif';
          ctx.fillStyle = isCompleted ? '#E2E8F0' : '#F8FAFC';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          const titleY = ky + 30;
          const maxTitleW = kw - 20;
          drawWrappedText(ctx, name, kx + 10, titleY, maxTitleW, 14, 3);

          // 5. Badges inferiores (tipo, periodicidade, créditos)
          const tipo = getCourseTypeInCurrentFdc(code);
          let tipoLabel = 'Obrigatória';
          let tipoBg = 'rgba(56, 189, 248, 0.15)';
          let tipoFg = '#38bdf8';
          if (tipo === 'eletiva') {
            tipoLabel = 'Eletiva';
            tipoBg = 'rgba(148, 163, 184, 0.15)';
            tipoFg = '#94a3b8';
          } else if (course.fdc_especifica) {
            tipoLabel = `FDC ${course.fdc_especifica}`;
            if (course.fdc_especifica === 1) { tipoBg = 'rgba(56, 189, 248, 0.15)'; tipoFg = '#38bdf8'; }
            else if (course.fdc_especifica === 2) { tipoBg = 'rgba(52, 211, 153, 0.15)'; tipoFg = '#34d399'; }
            else { tipoBg = 'rgba(245, 158, 11, 0.15)'; tipoFg = '#f59e0b'; }
          }

          const botY = ky + kh - 22;
          ctx.font = 'bold 9px Inter, -apple-system, sans-serif';
          const tW = ctx.measureText(tipoLabel).width + 8;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(kx + 10, botY, tW, 15, 3);
          else ctx.rect(kx + 10, botY, tW, 15);
          ctx.fillStyle = tipoBg;
          ctx.fill();
          ctx.fillStyle = tipoFg;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(tipoLabel, kx + 10 + tW / 2, botY + 8);

          let curBadgeX = kx + 10 + tW + 4;
          if (course.periodicidade === '1' || course.periodicidade === '2') {
            const pLabel = course.periodicidade === '1' ? '1º Sem' : '2º Sem';
            const pColor = course.periodicidade === '1' ? '#38bdf8' : '#c084fc';
            const pBg = course.periodicidade === '1' ? 'rgba(56, 189, 248, 0.14)' : 'rgba(192, 132, 252, 0.14)';
            const pw = ctx.measureText(pLabel).width + 6;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') ctx.roundRect(curBadgeX, botY, pw, 15, 3);
            else ctx.rect(curBadgeX, botY, pw, 15);
            ctx.fillStyle = pBg;
            ctx.fill();
            ctx.fillStyle = pColor;
            ctx.fillText(pLabel, curBadgeX + pw / 2, botY + 8);
            curBadgeX += pw + 4;
          }

          const crStr = `${course.creditos || 0} cr`;
          ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
          ctx.fillStyle = '#94A3B8';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(crStr, kx + kw - 10, botY + 8);

          ctx.restore();
        });
      });

      return canvas;
    } finally {
      // Restaura transformações da viewport
      state.scale = prevScale;
      state.panX = prevPanX;
      state.panY = prevPanY;
      dom.canvas.style.transform = prevTransform || '';
      applyCanvasTransform();
      drawAllConnections();

      // Reabilita botões de exportação
      exportBtns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
    }
  }

  /**
   * Mantido para compatibilidade e testes existentes
   */
  async function captureBoardCanvas() {
    if (typeof document === 'undefined') {
      throw new Error('Exportação de canvas suportada apenas em ambiente de navegador.');
    }
    return await renderBoardToCanvasNative(2);
  }

  /**
   * Exportação PNG em Alta Resolução (2x) via Canvas 2D Nativo
   */
  async function exportToPng() {
    const dateStr = new Date().toISOString().slice(0, 10);
    const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';
    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.png`;

    // 1. Abre seletor de arquivo no momento exato do clique para manter user activation válido
    const target = await pickSaveTarget(suggestedName, 'Imagem PNG da Grade Curricular', 'image/png', '.png');
    if (!target) return; // Usuário cancelou diálogo

    try {
      showToast('Preparando renderização nativa de alta fidelidade do board...', 'info');
      const canvas = await renderBoardToCanvasNative(2);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Falha ao gerar blob de imagem PNG do canvas.');

      const saved = await saveFileWithDialog(blob, suggestedName, 'Imagem PNG da Grade Curricular', 'image/png', '.png', target);
      if (saved) {
        showToast('Imagem PNG (2x) exportada com sucesso!', 'success');
      }
    } catch (err) {
      console.error('Erro na exportação PNG:', err);
      showToast(`Erro ao exportar PNG: ${err.message}`, 'error');
    }
  }

  /**
   * Exportação PDF em Formato Paisagem via jsPDF com Fallback Nativo Embutido
   */
  async function exportToPdf() {
    const dateStr = new Date().toISOString().slice(0, 10);
    const shiftSuffix = state.activeShift === 'noturno' ? 'noturno' : 'diurno';
    const suggestedName = `grade_economia_${shiftSuffix}_ufrgs_${dateStr}.pdf`;

    // 1. Abre seletor de arquivo no momento exato do clique para manter user activation válido
    const target = await pickSaveTarget(suggestedName, 'Documento PDF da Grade Curricular', 'application/pdf', '.pdf');
    if (!target) return; // Usuário cancelou diálogo

    try {
      showToast('Preparando renderização nativa do documento PDF...', 'info');
      const canvas = await renderBoardToCanvasNative(2);

      let pdfBlob = null;
      const jsPdfClass = (typeof window !== 'undefined' && ((window.jspdf && window.jspdf.jsPDF) || window.jsPDF));

      if (jsPdfClass) {
        const logicalW = canvas.width / 2;
        const logicalH = canvas.height / 2;
        const orientation = logicalW > logicalH ? 'landscape' : 'portrait';
        const doc = new jsPdfClass({
          orientation,
          unit: 'px',
          format: [logicalW, logicalH]
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        doc.addImage(imgData, 'JPEG', 0, 0, logicalW, logicalH);
        pdfBlob = doc.output('blob');
      } else {
        // Fallback PDF Nativo Embutido (zero dependências externas)
        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        pdfBlob = generateMinimalPdfFromJpeg(jpegDataUrl, canvas.width / 2, canvas.height / 2);
      }

      const saved = await saveFileWithDialog(pdfBlob, suggestedName, 'Documento PDF da Grade Curricular', 'application/pdf', '.pdf', target);
      if (saved) {
        showToast('Documento PDF gerado com sucesso!', 'success');
      }
    } catch (err) {
      console.error('Erro na exportação PDF:', err);
      showToast(`Erro ao exportar PDF: ${err.message}`, 'error');
    }
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!isBrowser || typeof document === 'undefined' || typeof document.createElement !== 'function' || !dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // SETUP DOS EVENT LISTENERS
  // =========================================================================
  function setupEventListeners() {
    // Event Listeners para Desfazer / Refazer (Undo / Redo)
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    if (btnUndo) btnUndo.addEventListener('click', window.undoAction);
    if (btnRedo) btnRedo.addEventListener('click', window.redoAction);

    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
      const isCtrl = e.ctrlKey || e.metaKey;
      if (isCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) window.redoAction();
        else window.undoAction();
      } else if (isCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        window.redoAction();
      }
    });

        // 0. Toggle Left Sidebar (Recolher / Expandir Menu Lateral)
    if (dom.shiftSelect) {
      dom.shiftSelect.addEventListener('change', (e) => {
        switchShift(e.target.value);
      });
    }
    if (dom.btnToggleSidebar) {
      dom.btnToggleSidebar.addEventListener('click', () => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        if (dom.leftSidebar) dom.leftSidebar.classList.toggle('collapsed', state.sidebarCollapsed);
        if (dom.sidebarToggleIcon) dom.sidebarToggleIcon.textContent = state.sidebarCollapsed ? '▶' : '◀';
        dom.btnToggleSidebar.title = state.sidebarCollapsed ? 'Expandir Menu Lateral' : 'Recolher Menu Lateral';
        scheduleConnectionRedraw();
      });
    }

    const floatingBtn = document.getElementById('btn-floating-sidebar');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', () => {
        state.sidebarCollapsed = false;
        if (dom.leftSidebar) dom.leftSidebar.classList.remove('collapsed');
        if (dom.sidebarToggleIcon) dom.sidebarToggleIcon.textContent = '◀';
        if (dom.btnToggleSidebar) dom.btnToggleSidebar.title = 'Recolher Menu Lateral';
        scheduleConnectionRedraw();
      });
    }

    // 1. Busca
    dom.courseSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.searchClear.classList.toggle('hidden', !state.searchQuery);
      applySearchAndFilter();
    });

    dom.searchClear.addEventListener('click', () => {
      dom.courseSearch.value = '';
      state.searchQuery = '';
      dom.searchClear.classList.add('hidden');
      applySearchAndFilter();
      clearHighlights();
    });

    // 2. Filtro, FDC & Destaque por Semestre Original
    dom.filterSelect.addEventListener('change', (e) => {
      state.filter = e.target.value;
      applySearchAndFilter();
    });

    if (dom.stageChipsGrid) {
      dom.stageChipsGrid.addEventListener('click', (e) => {
        const chip = e.target.closest('.stage-chip');
        if (chip && chip.dataset.stage) {
          setStageHighlight(chip.dataset.stage);
        }
      });
    }

    if (dom.fdcChipsGroup) {
      dom.fdcChipsGroup.addEventListener('click', (e) => {
        const chip = e.target.closest('.fdc-chip');
        if (chip && chip.dataset.fdc) {
          const newFdc = parseInt(chip.dataset.fdc, 10);
          switchFdc(newFdc);
        }
      });
    }

    if (dom.fdcSelect) {
      dom.fdcSelect.addEventListener('change', (e) => {
        const newFdc = parseInt(e.target.value, 10);
        switchFdc(newFdc);
      });
    }

    // 3. Ciclo Letivo Sequencial (Não-destrutivo)
    dom.btnApplyCycle.addEventListener('click', () => applyCycleSequence());

    // 4. Zoom
    dom.btnZoomIn.addEventListener('click', () => setZoom(state.scale + 0.15));
    dom.btnZoomOut.addEventListener('click', () => setZoom(state.scale - 0.15));
    dom.btnZoomReset.addEventListener('click', () => setZoom(1.0));
    dom.btnZoomFit.addEventListener('click', fitBoardToView);

    // 5. Reset & Save Local
    dom.btnResetDefault.addEventListener('click', () => {
      if (confirm('Deseja realmente restaurar a grade sugerida padrão da UFRGS?')) {
        resetToDefaultCurriculum();
        renderBoardSkeleton();
        updateDynamicColumnVisibility();
        renderAllCards();
        updateDashboardMetrics();
        scheduleConnectionRedraw();
        saveToLocalStorage(false);
        showToast('Grade restaurada para o padrão oficial.', 'info');
      }
    });

    dom.btnSave.addEventListener('click', () => {
      saveToLocalStorage(true);
    });

    // 5.1 Exportação & Importação JSON
    if (dom.btnExportJson) dom.btnExportJson.addEventListener('click', exportStateToJson);
    if (dom.btnImportJson) dom.btnImportJson.addEventListener('click', () => dom.inputImportJson && dom.inputImportJson.click());
    if (dom.inputImportJson) {
      dom.inputImportJson.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          importStateFromJson(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    // 5.2 Exportação Visual (PNG e PDF)
    if (dom.btnExportPng) dom.btnExportPng.addEventListener('click', exportToPng);
    if (dom.btnExportPdf) dom.btnExportPdf.addEventListener('click', exportToPdf);

    // 6. Drawer
    dom.btnToggleDrawer.addEventListener('click', () => {
      state.drawerOpen = !state.drawerOpen;
      dom.drawer.classList.toggle('open', state.drawerOpen);
    });

    dom.btnCloseDrawer.addEventListener('click', () => {
      state.drawerOpen = false;
      dom.drawer.classList.remove('open');
    });

    dom.drawerSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      dom.drawerCardsList.querySelectorAll('.course-card').forEach(card => {
        const code = card.dataset.code;
        const c = state.courses[code];
        const match = code.toLowerCase().includes(q) || (c && c.nome.toLowerCase().includes(q));
        card.style.display = match ? '' : 'none';
      });
    });

    // 7. Modal close
    dom.modalClose.addEventListener('click', () => dom.modalOverlay.classList.add('hidden'));
    dom.modalOverlay.addEventListener('click', (e) => {
      if (e.target === dom.modalOverlay) dom.modalOverlay.classList.add('hidden');
    });

    // 8. Pan do Canvas
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        state.isSpacePressed = true;
        dom.viewport.classList.add('is-panning');
      }
      if (e.key === 'Escape') {
        clearHighlights();
        dom.modalOverlay.classList.add('hidden');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        state.isSpacePressed = false;
        if (!state.isPanning) {
          dom.viewport.classList.remove('is-panning');
        }
      }
    });

    dom.viewport.addEventListener('mousedown', (e) => {
      if (e.button === 1 || (state.isSpacePressed && e.button === 0)) {
        e.preventDefault();
        state.isPanning = true;
        state.startMouseX = e.clientX;
        state.startMouseY = e.clientY;
        state.startPanX = state.panX;
        state.startPanY = state.panY;
        dom.viewport.classList.add('is-panning-active');
      } else if (e.target === dom.viewport || e.target === dom.canvas || e.target.classList.contains('semesters-grid')) {
        clearHighlights();
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isPanning) return;
      const dx = e.clientX - state.startMouseX;
      const dy = e.clientY - state.startMouseY;
      state.panX = state.startPanX + dx;
      state.panY = state.startPanY + dy;
      applyCanvasTransform();
    });

    window.addEventListener('mouseup', () => {
      if (state.isPanning) {
        state.isPanning = false;
        dom.viewport.classList.remove('is-panning-active');
        if (!state.isSpacePressed) {
          dom.viewport.classList.remove('is-panning');
        }
      }
    });

    // Zoom via roda do mouse
    dom.viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom(state.scale * zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Redimensionamento de janela redesenha conexões
    window.addEventListener('resize', () => {
      scheduleConnectionRedraw();
    });
  }

  // =========================================================================
  // FACTORY ISOLADA PARA MOTORES DAG & TESTES HEADLESS
  // =========================================================================
  function createEngine(curriculumData, initialFdc = 1) {
    let activeCurriculum = curriculumData || state.curriculum;
    if (!activeCurriculum) {
      const allC = (typeof window !== 'undefined' && (window.ECONOMIA_CURRICULA || window.CURRICULUM_DATA)) ||
                   (typeof ECONOMIA_CURRICULA !== 'undefined' ? ECONOMIA_CURRICULA : null) ||
                   (typeof globalThis !== 'undefined' && (globalThis.ECONOMIA_CURRICULA || globalThis.CURRICULUM_DATA));
      activeCurriculum = (allC && allC.diurno) ? allC.diurno : allC;
    }

    const engState = {
      curriculum: activeCurriculum,
      courses: activeCurriculum?.disciplinas || {},
      allocations: {},
      currentFdc: initialFdc,
      altChoice: {},
      columnNames: {},
      prereqMap: {},
      dependentMap: {}
    };

    // DAG maps
    engState.prereqMap = {};
    engState.dependentMap = {};
    Object.keys(engState.courses).forEach(code => {
      engState.prereqMap[code] = [...(engState.courses[code].prerequisitos || [])];
      engState.dependentMap[code] = [];
    });
    Object.keys(engState.courses).forEach(code => {
      (engState.courses[code].prerequisitos || []).forEach(pCode => {
        if (engState.dependentMap[pCode] && !engState.dependentMap[pCode].includes(code)) {
          engState.dependentMap[pCode].push(code);
        }
      });
    });

    function getColTitle(sem) {
      if (engState.columnNames && engState.columnNames[sem]) return engState.columnNames[sem];
      if (engState.columnNames && engState.columnNames[1]) {
        const m = String(engState.columnNames[1]).match(/^(\d{4})\/([12])$/);
        if (m) {
          const baseYear = parseInt(m[1], 10);
          const basePeriod = parseInt(m[2], 10);
          const offset = sem - 1;
          const totalHalfYears = (basePeriod - 1) + offset;
          const y = baseYear + Math.floor(totalHalfYears / 2);
          const p = (totalHalfYears % 2) + 1;
          return `${y}/${p}`;
        }
      }
      return `Semestre ${sem}`;
    }

    function getColPeriod(sem) {
      const title = getColTitle(sem);
      if (title.includes('/1') || title.endsWith('.1') || title.endsWith('-1')) return '1';
      if (title.includes('/2') || title.endsWith('.2') || title.endsWith('-2')) return '2';
      return (sem % 2 === 1) ? '1' : '2';
    }

    function getNextValid(sem, reqPeriod) {
      if (!reqPeriod || reqPeriod === 'ambos') return sem;
      let s = sem;
      while (getColPeriod(s) !== reqPeriod && s <= 60) {
        s++;
      }
      return s;
    }

    function getCourseType(code, fdcId) {
      const c = engState.courses[code];
      if (!c) return 'inexistente';
      const altType = resolveAlternativeType(code, c, engState.altChoice);
      if (altType) return altType;
      const fdcStr = String(fdcId || engState.currentFdc);
      if (c.status_fdc && c.status_fdc[fdcStr]) return c.status_fdc[fdcStr].tipo;
      return c.tipo_padrao || 'obrigatoria';
    }

    function getCourseStage(code, fdcId) {
      const c = engState.courses[code];
      if (!c) return null;
      const fdcStr = String(fdcId || engState.currentFdc);
      if (c.status_fdc && c.status_fdc[fdcStr] && c.status_fdc[fdcStr].etapa) return c.status_fdc[fdcStr].etapa;
      return c.etapa_sugerida || null;
    }

    function resetCurriculum(fdcId = engState.currentFdc) {
      engState.currentFdc = fdcId;
      engState.altChoice = {};
      engState.allocations = {};
      Object.keys(engState.courses).forEach(code => {
        const c = engState.courses[code];
        const tipo = getCourseType(code, engState.currentFdc);
        const etapa = getCourseStage(code, engState.currentFdc);
        if (tipo === 'obrigatoria' && etapa && etapa >= 1 && etapa <= 10) {
          engState.allocations[code] = { semester: etapa, completed: false, hasOverflow: false };
        } else {
          engState.allocations[code] = { semester: null, completed: false, hasOverflow: false };
        }
      });
      engState.columnNames = {};
      for (let sem = 1; sem <= 20; sem++) {
        engState.columnNames[sem] = `Semestre ${sem}`;
      }
      revalidateCascades();
    }

    function calculateAccumCredits(semIndex, allocs = engState.allocations) {
      if (!semIndex || semIndex <= 1) return 0;
      let total = 0;
      Object.keys(allocs).forEach(code => {
        const item = allocs[code];
        if (item && item.semester !== null && item.semester < semIndex) {
          const c = engState.courses[code];
          if (c && typeof c.creditos === 'number') {
            total += c.creditos;
          }
        }
      });
      return total;
    }

    function move(courseCode, targetSemester) {
      if (!engState.courses[courseCode]) return { cascaded: [], adjusted: null };
      if (targetSemester === null || targetSemester === undefined) {
        engState.allocations[courseCode].semester = null;
        engState.allocations[courseCode].hasOverflow = false;
        return { cascaded: [], adjusted: null };
      }
      targetSemester = parseInt(targetSemester, 10);
      if (isNaN(targetSemester) || targetSemester < 1) targetSemester = 1;

      const prereqs = engState.prereqMap[courseCode] || [];
      let maxPrereqSem = 0;
      prereqs.forEach(pCode => {
        const pAlloc = engState.allocations[pCode];
        if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
          if (pAlloc.semester > maxPrereqSem) maxPrereqSem = pAlloc.semester;
        }
      });

      let adjusted = targetSemester;
      let prereqAdjusted = false;
      if (maxPrereqSem > 0 && targetSemester <= maxPrereqSem) {
        adjusted = maxPrereqSem + 1;
        prereqAdjusted = true;
      }

      // Barreira de créditos mínimos
      const minCreds = engState.courses[courseCode]?.min_credits || 0;
      let creditAdjusted = false;
      if (minCreds > 0) {
        while (adjusted <= 50 && calculateAccumCredits(adjusted) < minCreds) {
          adjusted++;
          creditAdjusted = true;
        }
      }

      const reqPeriod = engState.courses[courseCode].periodicidade;
      const validPeriodSem = getNextValid(adjusted, reqPeriod);
      let periodicityAdjusted = (validPeriodSem !== adjusted);
      adjusted = validPeriodSem;

      if (minCreds > 0 && calculateAccumCredits(adjusted) < minCreds) {
        while (adjusted <= 50 && calculateAccumCredits(adjusted) < minCreds) {
          adjusted = getNextValid(adjusted + 1, reqPeriod);
          creditAdjusted = true;
        }
      }

      engState.allocations[courseCode].semester = adjusted;
      engState.allocations[courseCode].hasOverflow = adjusted > 20;

      const queue = [courseCode];
      const cascaded = [];
      while (queue.length > 0) {
        const curr = queue.shift();
        const currSem = engState.allocations[curr].semester;
        if (currSem === null) continue;
        const deps = engState.dependentMap[curr] || [];
        deps.forEach(depCode => {
          const depAlloc = engState.allocations[depCode];
          if (depAlloc && depAlloc.semester !== null) {
            if (depAlloc.semester <= currSem) {
              let tentative = currSem + 1;
              const depMinCreds = engState.courses[depCode]?.min_credits || 0;
              if (depMinCreds > 0) {
                while (tentative <= 50 && calculateAccumCredits(tentative) < depMinCreds) {
                  tentative++;
                }
              }
              const depReq = engState.courses[depCode].periodicidade;
              let finalDepSem = getNextValid(tentative, depReq);
              if (depMinCreds > 0 && calculateAccumCredits(finalDepSem) < depMinCreds) {
                while (finalDepSem <= 50 && calculateAccumCredits(finalDepSem) < depMinCreds) {
                  finalDepSem = getNextValid(finalDepSem + 1, depReq);
                }
              }
              depAlloc.semester = finalDepSem;
              depAlloc.hasOverflow = finalDepSem > 20;
              if (!cascaded.includes(depCode)) cascaded.push(depCode);
              queue.push(depCode);
            }
          }
        });
      }
      return { cascaded, adjusted, periodicityAdjusted, prereqAdjusted, creditAdjusted };
    }

    function revalidateCascades() {
      let changed = true;
      let it = 0;
      while (changed && it < 35) {
        changed = false;
        it++;
        Object.keys(engState.courses).forEach(code => {
          const alloc = engState.allocations[code];
          if (!alloc || alloc.semester === null) return;
          const prereqs = engState.prereqMap[code] || [];
          let minSem = 1;
          prereqs.forEach(p => {
            const pAlloc = engState.allocations[p];
            if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
              if (pAlloc.semester + 1 > minSem) minSem = pAlloc.semester + 1;
            }
          });

          let target = Math.max(alloc.semester, minSem);
          const minCreds = engState.courses[code]?.min_credits || 0;
          if (minCreds > 0) {
            while (target <= 50 && calculateAccumCredits(target) < minCreds) {
              target++;
            }
          }

          const req = engState.courses[code].periodicidade;
          let valid = getNextValid(target, req);
          if (minCreds > 0 && calculateAccumCredits(valid) < minCreds) {
            while (valid <= 50 && calculateAccumCredits(valid) < minCreds) {
              valid = getNextValid(valid + 1, req);
            }
          }

          if (valid !== alloc.semester) {
            alloc.semester = valid;
            alloc.hasOverflow = valid > 20;
            changed = true;
          }
        });
      }
    }

    function swapAlt(code, targetSemester = null) {
      const course = engState.courses[code];
      const otherCode = course && course.alternativeOf;
      if (!otherCode || !engState.courses[otherCode]) return false;
      const other = engState.allocations[otherCode];
      const target = targetSemester || (other && other.semester) || getCourseStage(code) || course.etapa_sugerida || 5;
      engState.altChoice[[code, otherCode].sort().join('|')] = code;
      if (other && other.semester !== null && !other.completed) {
        other.previousSemester = other.semester;
        move(otherCode, null);
      }
      move(code, target);
      revalidateCascades();
      return true;
    }

    function switchFdc(newFdcId) {
      const oldFdc = engState.currentFdc;
      if (oldFdc === newFdcId) return { newlyPromoted: [], newlyDemoted: [] };
      const newlyPromoted = [];
      const newlyDemoted = [];

      Object.keys(engState.courses).forEach(code => {
        const course = engState.courses[code];
        const oldType = getCourseType(code, oldFdc);
        const newType = getCourseType(code, newFdcId);
        const alloc = engState.allocations[code];
        if (!alloc) return;

        if (newType === 'inexistente') {
          alloc.semester = null;
          alloc.hasOverflow = false;
        } else if (oldType === 'obrigatoria' && newType === 'eletiva') {
          if (!alloc.completed && alloc.semester !== null) {
            alloc.previousSemester = alloc.semester;
            alloc.semester = null;
            alloc.hasOverflow = false;
            newlyDemoted.push(code);
          }
        } else if (newType === 'obrigatoria' && alloc.semester === null) {
          const defStage = getCourseStage(code, newFdcId) || course.etapa_sugerida || 8;
          alloc.semester = defStage;
          newlyPromoted.push({ code, targetStage: defStage });
        }
      });

      engState.currentFdc = newFdcId;
      newlyPromoted.forEach(item => {
        move(item.code, item.targetStage);
      });
      revalidateCascades();
      return {
        newlyPromoted: newlyPromoted.map(p => p.code),
        newlyDemoted
      };
    }

    function revalidateColPeriodicity(semIndex) {
      const colPeriod = getColPeriod(semIndex);
      const affected = [];
      Object.keys(engState.allocations).forEach(code => {
        const alloc = engState.allocations[code];
        if (alloc && alloc.semester === semIndex) {
          const req = engState.courses[code].periodicidade;
          if (req && req !== 'ambos' && req !== colPeriod) {
            affected.push(code);
          }
        }
      });
      affected.forEach(code => {
        move(code, semIndex + 1);
      });
      revalidateCascades();
      return affected;
    }

    function applyCycle(startYear = 2024, startPeriod = 1) {
      let year = parseInt(startYear, 10) || 2024;
      let period = parseInt(startPeriod, 10) || 1;
      for (let s = 1; s <= 50; s++) {
        engState.columnNames[s] = `${year}/${period}`;
        if (period === 1) period = 2;
        else { period = 1; year++; }
      }
      revalidateCascades();
    }

    function validateDag() {
      const violations = [];
      let hasOverflow = false;
      Object.keys(engState.allocations).forEach(code => {
        const alloc = engState.allocations[code];
        if (!alloc) return;
        if (alloc.hasOverflow) hasOverflow = true;
        if (alloc.semester !== null && !alloc.completed) {
          (engState.prereqMap[code] || []).forEach(pCode => {
            const pAlloc = engState.allocations[pCode];
            if (pAlloc && pAlloc.semester !== null && !pAlloc.completed) {
              if (alloc.semester <= pAlloc.semester) {
                violations.push({ type: 'PREREQUISITE', course: code, prereq: pCode, semCourse: alloc.semester, semPrereq: pAlloc.semester });
              }
            }
          });
          const req = engState.courses[code]?.periodicidade;
          if (req && req !== 'ambos') {
            if (getColPeriod(alloc.semester) !== req) {
              violations.push({ type: 'PERIODICITY', course: code, semCourse: alloc.semester, reqPeriod: req, colPeriod: getColPeriod(alloc.semester) });
            }
          }
          // Barreira de créditos mínimos
          const minCreds = engState.courses[code]?.min_credits || 0;
          if (minCreds > 0) {
            const accum = calculateAccumCredits(alloc.semester);
            if (accum < minCreds) {
              violations.push({ type: 'MIN_CREDITS', course: code, semCourse: alloc.semester, minCredits: minCreds, accumCredits: accum });
            }
          }
        }
      });
      return { isValid: violations.length === 0, violations, hasOverflow };
    }

    function getVisibleColumnsCount() {
      let maxAllocatedSem = 0;
      Object.keys(engState.allocations).forEach(code => {
        const alloc = engState.allocations[code];
        if (alloc && alloc.semester !== null && alloc.semester > maxAllocatedSem) {
          maxAllocatedSem = alloc.semester;
        }
      });
      return Math.max(1, maxAllocatedSem + 1);
    }

    function findCycles() {
      const white = 0, gray = 1, black = 2;
      const color = {};
      const cycles = [];
      Object.keys(engState.courses).forEach(c => color[c] = white);

      function dfs(u, path) {
        color[u] = gray;
        path.push(u);
        const prereqs = engState.prereqMap[u] || [];
        for (const v of prereqs) {
          if (color[v] === gray) {
            const cyclePath = path.slice(path.indexOf(v));
            cyclePath.push(v);
            cycles.push(cyclePath);
          } else if (color[v] === white) {
            dfs(v, path);
          }
        }
        path.pop();
        color[u] = black;
      }

      Object.keys(engState.courses).forEach(c => {
        if (color[c] === white) dfs(c, []);
      });
      return cycles;
    }

    function exportEngineStateToJson() {
      const payload = {
        app: 'trajetoria_economia_ufrgs_v1',
        version: '2.0.0',
        exportedAt: new Date().toISOString(),
        currentFdc: engState.currentFdc,
        fdcSchema: 3,
        altChoice: JSON.parse(JSON.stringify(engState.altChoice)),
        columnNames: JSON.parse(JSON.stringify(engState.columnNames)),
        allocations: JSON.parse(JSON.stringify(engState.allocations))
      };
      return JSON.stringify(payload, null, 2);
    }

    function importEngineStateFromJson(fileOrJson) {
      const parsed = typeof fileOrJson === 'string' ? JSON.parse(fileOrJson) : fileOrJson;
      if (!parsed || !parsed.allocations || typeof parsed.allocations !== 'object') {
        throw new Error('Arquivo JSON inválido: campo "allocations" não encontrado.');
      }
      engState.allocations = JSON.parse(JSON.stringify(parsed.allocations));
      engState.altChoice = (parsed.altChoice && typeof parsed.altChoice === 'object') ? JSON.parse(JSON.stringify(parsed.altChoice)) : {};
      if (parsed.currentFdc) {
        engState.currentFdc = normalizeFdc(parsed.currentFdc, parsed.fdcSchema);
      }
      if (parsed.columnNames && typeof parsed.columnNames === 'object') {
        engState.columnNames = JSON.parse(JSON.stringify(parsed.columnNames));
      }
      revalidateCascades();
      return true;
    }

    resetCurriculum(initialFdc);

    return {
      state: engState,
      getColumnTitle: getColTitle,
      getColumnPeriod: getColPeriod,
      getNextValidPeriodSemester: getNextValid,
      getCourseTypeInFdc: getCourseType,
      getCourseStageInFdc: getCourseStage,
      resetToDefaultCurriculum: resetCurriculum,
      moveCourse: move,
      revalidateAllCascades: revalidateCascades,
      switchFdc,
      swapAlternative: swapAlt,
      revalidatePeriodicityForSemester: revalidateColPeriodicity,
      applyCycleSequence: applyCycle,
      applyCycle,
      setColumnName: (sem, name) => {
        engState.columnNames[sem] = name;
        return revalidateColPeriodicity(sem);
      },
      validateTrajectoryDag: validateDag,
      calculateAccumulatedCredits: calculateAccumCredits,
      getVisibleColumnsCount,
      findCycles,
      calculateBezierCoordinates,
      sampleBezierPoint,
      exportStateToJson: exportEngineStateToJson,
      importStateFromJson: importEngineStateFromJson,
      toggleSemesterColumnCompletion: (sem, isChecked) => {
        let count = 0;
        Object.keys(engState.allocations).forEach(code => {
          const alloc = engState.allocations[code];
          if (alloc && alloc.semester === sem) {
            alloc.completed = isChecked;
            count++;
          }
        });
        return count;
      },
      getCreditsSummary: () => {
        let doneTotal = 0, doneObr = 0, doneFdc = 0, doneEle = 0;
        let plannedTotal = 0, plannedObr = 0, plannedFdc = 0, plannedEle = 0;
        let allocatedCount = 0;

        Object.keys(engState.allocations).forEach(code => {
          const alloc = engState.allocations[code];
          const course = engState.courses[code];
          if (!alloc || !course) return;
          const tipo = getCourseType(code, engState.currentFdc);
          const cr = course.creditos || 0;

          if (alloc.semester !== null) {
            plannedTotal += cr;
            allocatedCount++;
            if (tipo === 'eletiva') plannedEle += cr;
            else if (course.fdc_especifica) plannedFdc += cr;
            else plannedObr += cr;
          }

          if (alloc.completed) {
            doneTotal += cr;
            if (tipo === 'eletiva') doneEle += cr;
            else if (course.fdc_especifica) doneFdc += cr;
            else doneObr += cr;
          }
        });

        const totalTarget = activeCurriculum?.estatisticas_nominais?.creditos_obrigatorios
          ? activeCurriculum.estatisticas_nominais.creditos_obrigatorios + (activeCurriculum.estatisticas_nominais.creditos_eletivos || 44)
          : 230;

        return {
          done: { total: doneTotal, obr: doneObr, fdc: doneFdc, ele: doneEle },
          planned: { total: plannedTotal, obr: plannedObr, fdc: plannedFdc, ele: plannedEle },
          totalTarget,
          percentage: totalTarget > 0 ? Math.min(100, Math.round((doneTotal / totalTarget) * 100)) : 0,
          allocatedCount
        };
      }
    };
  }

  // Inicia a aplicação após carregar o DOM (apenas no navegador)
  if (isBrowser) {
    if (typeof window !== 'undefined') {
      window.AcademicTrajectoryEngine = createEngine;
      if (typeof window.addEventListener === 'function') {
        window.addEventListener('DOMContentLoaded', init);
      }
    }
  }

  return {
    isBrowser,
    state,
    dom,
    init,
    createEngine,
    buildDagMaps,
    getColumnTitle,
    getColumnPeriod,
    getNextValidPeriodSemester,
    resetToDefaultCurriculum,
    switchShift,
    applyCurriculumShift,
    getShiftStorageKey,
    updateStageChipsForShift,
    getCourseTypeInFdc,
    getCourseStageInFdc,
    getCourseTypeInCurrentFdc,
    switchFdc,
    moveCourse,
    revalidateAllCascades,
    revalidatePeriodicityForSemester,
    validateTrajectoryDag,
    applyCycleSequence,
    calculateAccumulatedCredits,
    updateDynamicColumnVisibility,
    exportStateToJson,
    importStateFromJson,
    ensureExportLibsLoaded,
    renderBoardToCanvasNative,
    generateMinimalPdfFromJpeg,
    captureBoardCanvas,
    exportToPng,
    exportToPdf,
    pickSaveTarget,
    saveFileWithDialog,
    setStageHighlight,
    applyStageHighlightToCards,
    swapAlternative,
    calculateBezierCoordinates,
    sampleBezierPoint,
    getUpstreamAncestors,
    getDownstreamDescendants,
    createCardElement,
    renderAllCards,
    createColumnElement,
    ensureColumnsUpTo
  };
});
