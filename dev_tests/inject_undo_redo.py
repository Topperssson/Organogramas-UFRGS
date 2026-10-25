import glob
import os
import re

UNDO_REDO_HTML = """        <div class="undo-redo-controls" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 6px;">
          <button type="button" id="btn-undo" class="btn btn-secondary control-btn" title="Desfazer (Ctrl+Z)" disabled style="padding: 6px 8px; font-size: 12px; font-weight: 600;">↶ Desfazer</button>
          <button type="button" id="btn-redo" class="btn btn-secondary control-btn" title="Refazer (Ctrl+Y)" disabled style="padding: 6px 8px; font-size: 12px; font-weight: 600;">↷ Refazer</button>
        </div>"""

UNDO_REDO_CSS = """
/* Controles Undo / Redo */
.control-btn:disabled,
#btn-undo:disabled,
#btn-redo:disabled {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}
"""

JS_HISTORY_LOGIC = """
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
"""

def update_html():
    for p in sorted(glob.glob("dist/*/index.html")):
        with open(p, "r", encoding="utf-8") as f:
            html = f.read()

        if 'id="btn-undo"' in html:
            print(f"HTML already has undo in {p}")
            continue

        target = '</div>\n        <button id="btn-reset-default"'
        if target in html:
            html = html.replace(target, f'</div>\n{UNDO_REDO_HTML}\n        <button id="btn-reset-default"')
        else:
            target_alt = '<button id="btn-reset-default"'
            html = html.replace(target_alt, f'{UNDO_REDO_HTML}\n        <button id="btn-reset-default"')

        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print(f"Updated HTML: {p}")

def update_css():
    for p in sorted(glob.glob("dist/*/styles.css")):
        with open(p, "r", encoding="utf-8") as f:
            css = f.read()

        if "#btn-undo:disabled" not in css:
            css += UNDO_REDO_CSS
            with open(p, "w", encoding="utf-8", newline="\n") as f:
                f.write(css)
            print(f"Updated CSS: {p}")

def update_app_js():
    for p in sorted(glob.glob("dist/*/app.js")):
        with open(p, "r", encoding="utf-8") as f:
            js = f.read()

        if "window.undoAction" in js:
            print(f"JS already has undoAction in {p}")
            continue

        # 1. Inject the history logic right above function moveCourse
        js = js.replace("  function moveCourse(", JS_HISTORY_LOGIC + "\n  function moveCourse(")

        # 2. Add pushHistoryState() before moveCourse operations
        js = js.replace(
            "  function moveCourse(courseCode, targetSemester, triggerNotify = true) {",
            "  function moveCourse(courseCode, targetSemester, triggerNotify = true) {\n    pushHistoryState();"
        )

        # 3. Add pushHistoryState() before swapAlternative operations
        js = js.replace(
            "  function swapAlternative(code, targetSemester = null, triggerNotify = true) {",
            "  function swapAlternative(code, targetSemester = null, triggerNotify = true) {\n    pushHistoryState();"
        )

        # 4. Add pushHistoryState() before resetToDefaultCurriculum
        js = js.replace(
            "  function resetToDefaultCurriculum() {",
            "  function resetToDefaultCurriculum() {\n    pushHistoryState();"
        )

        # 5. Add pushHistoryState() before toggleSemesterColumnCompletion
        js = js.replace(
            "  function toggleSemesterColumnCompletion(sem, isChecked) {",
            "  function toggleSemesterColumnCompletion(sem, isChecked) {\n    pushHistoryState();"
        )

        # 6. Add pushHistoryState() before card completed toggle
        old_toggle = "const isNowCompleted = !state.allocations[code].completed;\n    state.allocations[code].completed = isNowCompleted;"
        if old_toggle in js:
            js = js.replace(old_toggle, "pushHistoryState();\n    " + old_toggle)
        else:
            old_toggle_alt = "state.allocations[code].completed = isNowCompleted;"
            if old_toggle_alt in js:
                js = js.replace(old_toggle_alt, "pushHistoryState();\n    state.allocations[code].completed = isNowCompleted;")

        # 7. Add event listeners inside setupEventListeners or bottom of init
        listeners_snippet = """
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
"""
        # Inject listeners right inside setupEventListeners
        target_event = "function setupEventListeners() {"
        if target_event in js:
            js = js.replace(target_event, target_event + listeners_snippet)
        else:
            # Fallback to init()
            js = js.replace("function init() {", "function init() {" + listeners_snippet)

        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(js)
        print(f"Updated JS: {p}")

if __name__ == "__main__":
    update_html()
    update_css()
    update_app_js()
    print("All simulator files successfully updated with Undo/Redo.")
