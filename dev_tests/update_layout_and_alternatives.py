import glob
import os
import re

css_pattern = re.compile(
    r'\.semester-column\s*\{[^}]*\}',
    re.DOTALL
)

css_cards_pattern = re.compile(
    r'\.cards-container\s*\{[^}]*\}',
    re.DOTALL
)

new_semester_column = """.semester-column {
  width: 270px;
  min-width: 270px;
  flex-shrink: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}"""

new_cards_container = """.cards-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
  flex-grow: 1;
  min-height: 200px;
}"""

alt_badge_css = """
/* Badge e Ação Rápida para Disciplinas Alternativas */
.badge-alternative {
  background: rgba(168, 85, 247, 0.2) !important;
  color: #c084fc !important;
  border: 1px solid rgba(168, 85, 247, 0.4) !important;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.card-swap-alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 6px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  color: #c084fc;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.card-swap-alt:hover {
  background: rgba(168, 85, 247, 0.25);
  border-color: rgba(168, 85, 247, 0.6);
  color: #f3e8ff;
  transform: translateY(-1px);
}
"""

def update_css():
    for p in sorted(glob.glob("dist/*/styles.css")):
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()

        if css_pattern.search(content):
            content = css_pattern.sub(new_semester_column, content)
        if css_cards_pattern.search(content):
            content = css_cards_pattern.sub(new_cards_container, content)
        if ".badge-alternative" not in content:
            content += alt_badge_css

        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"Updated CSS: {p}")

def update_app_js():
    for p in sorted(glob.glob("dist/*/app.js")):
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()

        # Update card-swap-alt and alternative badge template
        old_swap_snippet = """    const altCourse = course.alternativeOf ? state.courses[course.alternativeOf] : null;
    const altSwapHtml = altCourse
      ? `<button type="button" class="card-swap-alt" title="Alternar com ${altCourse.nome} (exclusão mútua)">⇄ Alternar com ${altCourse.nome}</button>`
      : '';"""

        new_swap_snippet = """    const isAlternative = Boolean(course.is_alternative || course.alternativeOf);
    const altCourse = course.alternativeOf ? state.courses[course.alternativeOf] : null;
    const altBadgeHtml = isAlternative ? `<span class="badge badge-alternative" title="Disciplina com opção alternativa no currículo">ALTERNATIVA</span>` : '';
    const altSwapHtml = altCourse
      ? `<button type="button" class="card-swap-alt" title="Alternar com ${altCourse.nome} (exclusão mútua)">⇄ Alternar disciplina</button>`
      : '';"""

        if old_swap_snippet in content:
            content = content.replace(old_swap_snippet, new_swap_snippet)
            # Add altBadgeHtml into card-badges
            content = content.replace(
                '<span class="badge ${badgeClass}">${badgeText}</span>',
                '<span class="badge ${badgeClass}">${badgeText}</span>\n          ${altBadgeHtml}'
            )

        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"Updated JS: {p}")

if __name__ == "__main__":
    update_css()
    update_app_js()
    print("CSS and JS updates complete.")
