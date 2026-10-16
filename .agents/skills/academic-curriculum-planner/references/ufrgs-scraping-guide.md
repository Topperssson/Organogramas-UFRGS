# UFRGS Academic Catalogs: Scraping & Ingestion Guide

This reference documents how to retrieve and extract official curriculum data from UFRGS systems.

---

## 1. Web Endpoints

### Endpoint A: Public Undergraduate Degree Pages
- URL Pattern: `https://www.ufrgs.br/site/ensino/graduacao/<slug-curso>/`
- Useful for: Curriculum code (`currículo`), habilitation code (`habilitação`), total required credits, and pedagogical project overview.

### Endpoint B: UFRGS Academic Activity Catalog (AJAX / Plone)
- URL Pattern:
  `https://www1.ufrgs.br/graduacao/informacoescadastrais/consultaDadosAtividade_Plone.php?cod=<CURRICULO>&hab=<HABILITACAO>`
- Method: `GET`
- Response: HTML fragments containing tables for:
  - Etapas Obrigatórias (Disciplinas obrigatórias por etapa)
  - Disciplinas Eletivas (Catálogo do banco de eletivas)
  - Grupos de Equivalência e Alternativas (e.g. presencial vs. EAD)
  - Pré-requisitos e requisitos de créditos mínimos

---

## 2. Extraction Recipe (Node.js)

```javascript
const https = require('https');

function fetchCurriculumHtml(curriculoId, habilitacaoId) {
  const url = `https://www1.ufrgs.br/graduacao/informacoescadastrais/consultaDadosAtividade_Plone.php?cod=${curriculoId}&hab=${habilitacaoId}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}
```

### Parsing Mandatory Stages (`Etapas`):
- Table rows matching stage headers (`Etapa 1`, `Etapa 2`, ...) determine `originalSemester`.
- Cells contain code (e.g., `MAT01109`), name, credits (`créditos`), and prerequisites.

### Parsing Prerequisites:
- Multiple prerequisites are usually delimited by commas or semicolons.
- Extract only official subject codes (matches regex `/[A-Z]{3}\d{5}/g`).
- Note credit barriers (matches regex `/Requer\s+(\d+)\s+cr[eé]d/i`).
