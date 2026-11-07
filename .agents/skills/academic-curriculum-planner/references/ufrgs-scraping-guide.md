# UFRGS Academic Catalogs: Scraping & Ingestion Guide

This reference documents how to reliably retrieve, parse, and harmonize official curriculum data from the UFRGS academic portal.

---

## 1. Official Web Endpoints

### Endpoint A: Public Undergraduate Degree Pages
- **URL Pattern**: `https://www.ufrgs.br/site/ensino/graduacao/<slug-curso>/`
- **Purpose**:
  - Discover the institutional `curso` ID, `habilitacao` ID, and `curriculo` version.
  - Review total nominal credits (e.g., 222 cr for ECA, 224 cr for Mecânica, 210 cr for Produção).
  - Inspect embedded iframes pointing to `plone.php`.

### Endpoint B: Public Curricular Report Endpoint (`r=relatorio`)
- **URL Pattern**:
  `https://www1.ufrgs.br/PortalEnsino/GraduacaoCurriculos/plone.php?r=relatorio&curso=<CURSO>&habilitacao=<HABILITACAO>&curriculo=<CURRICULO>`
- **Method**: `GET`
- **Output**: Full official HTML report containing:
  - **Disciplinas Obrigatórias por Etapa**: Sequential table of mandatory subjects per nominal semester.
  - **Disciplinas Eletivas**: Complete elective catalog with credit weights and prerequisites.
  - **Trilhas / FDCs**: Formações Diversificadas Complementares (e.g. ECA tracks).
  - **Barreiras de Créditos Mínimos**: Requirements like `Requer 180 créditos` or `Exige 44 cr`.
  - **Pré-requisitos e Co-requisitos**: Clear separation between explicit course prerequisites and credit barriers.

> [!IMPORTANT]
> - In UFRGS terminology, `curriculo` is the curriculum edition (commonly `1`), whereas `curso` is the degree identifier (e.g. `curso=714` for ECA, `habilitacao=144`, `curriculo=1`).
> - Requesting `curriculo=714` triggers a 302 redirect to an empty session form (`Portal_Servicos.php`).

### Endpoint C: Visual Grid Matrix Endpoint (`r=grade`)
- **URL Pattern**:
  `https://www1.ufrgs.br/PortalEnsino/GraduacaoCurriculos/plone.php?r=grade&curso=<CURSO>&habilitacao=<HABILITACAO>&curriculo=<CURRICULO>`
- **Method**: `GET`
- **Output**: Visual 2D table of disciplines arranged by semester stages with direct release codes (`Libera: ...`).

---

## 2. Extraction Recipe (Node.js & Cheerio / Regex)

```javascript
const https = require('https');

function fetchUfrgsReport(curso, habilitacao, curriculo = 1) {
  const url = `https://www1.ufrgs.br/PortalEnsino/GraduacaoCurriculos/plone.php?r=relatorio&curso=${curso}&habilitacao=${habilitacao}&curriculo=${curriculo}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}
```

### Parsing Rules:

1. **Course Codes**:
   - Matches official alphanumeric codes: `/[A-Z]{3}\d{5}/g` (e.g., `MAT01353`, `ENG10042`, `CCA99004`).
2. **Nominal Semester (`originalSemester`)**:
   - Extracted from section headings (e.g. `Etapa 1`, `1º Semestre`, `Etapa 10`).
3. **Credit Barriers (`min_credits`)**:
   - Search for text patterns such as `Requer (\d+) cr[eé]ditos`, `Mínimo de (\d+) cr`, or `liberação com (\d+) cr`.
   - Store as an integer (e.g. `44`, `120`, `150`, `180`, `190`). If none is specified, default to `0` or `null`.
4. **Mutually Exclusive Alternatives**:
   - Check equivalence clusters (e.g. presencial vs. EAD). Set `alternativeOf: "<PRINCIPAL_CODE>"` and `is_alternative: true`.
5. **Deduplication**:
   - Ensure direct prerequisites are stripped of duplicate entries (e.g., if a scraper extracts `["ENG03026", "ENG03026"]`, normalize to unique set `["ENG03026"]`).
