import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
dist_dir = ROOT / "dist" / "engenharia-producao"
html_path = dist_dir / "index.html"
app_path = dist_dir / "app.js"

# 1. Adapt index.html
html = html_path.read_text(encoding="utf-8")

html = html.replace(
    "<title>Simulador de Trajetória Acadêmica | Engenharia Mecânica UFRGS</title>",
    "<title>Simulador de Trajetória Acadêmica | Engenharia de Produção UFRGS</title>"
)

html = html.replace(
    "<h1>Trajetória Mecânica <span class=\"badge-ufrgs\">UFRGS</span></h1>",
    "<h1>Trajetória Produção <span class=\"badge-ufrgs\">UFRGS</span></h1>"
)

html = html.replace(
    "<p class=\"subtitle\">Engenharia Mecânica • Catálogo 2026/1</p>",
    "<p class=\"subtitle\">Engenharia de Produção • Catálogo 2026/1</p>"
)

# Metas de creditos
html = html.replace('<span id="stat-obrig-target">224</span>', '<span id="stat-obrig-target">210</span>')
html = html.replace('<span id="stat-planned-obrig-target">224</span>', '<span id="stat-planned-obrig-target">210</span>')
html = html.replace('<span id="stat-target-credits">250</span>', '<span id="stat-target-credits">236</span>')
html = html.replace('<strong id="stat-credits">0 / 250</strong>', '<strong id="stat-credits">0 / 236</strong>')

html_path.write_text(html, encoding="utf-8")
print("index.html adapted for Produção")

# 2. Adapt app.js
app = app_path.read_text(encoding="utf-8")

app = re.sub(
    r"Simulador de Trajetória Acadêmica - Engenharia Mecânica \(UFRGS\)",
    "Simulador de Trajetória Acadêmica - Engenharia de Produção (UFRGS)",
    app
)

# localStorage key
app = app.replace("'trajetoria_eng_mecanica_ufrgs_v1'", "'trajetoria_eng_producao_ufrgs_v1'")

# Export filenames
app = app.replace("grade_mecanica_ufrgs_", "grade_producao_ufrgs_")

# Metas default
app = app.replace("creditos_obrigatorios || 224", "creditos_obrigatorios || 210")
app = app.replace("creditos_eletivos || 8", "creditos_eletivos || 20")

app_path.write_text(app, encoding="utf-8")
print("app.js adapted for Produção")
