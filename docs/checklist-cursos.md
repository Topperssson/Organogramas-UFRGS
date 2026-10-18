# Checklist de Organogramas Curriculares — UFRGS 🎓🗺️

> **Acompanhamento de Implementação dos Simuladores Curriculares Interativos da UFRGS**  
> Repositório alvo: [`organogramas-ufrgs`](https://github.com/Topperssson/Organogramas-UFRGS)  
> Diretório local: `C:\dev\organogramas-ufrgs\dist\<curso>\`  
> Fonte oficial: [Portal de Ensino de Graduação da UFRGS](https://www.ufrgs.br/site/ensino/graduacao/)

---

## 📈 Progresso Geral

- **Total de Graduações Oficiais Mapeadas**: 87
- **Concluídos**: 6
- **Pendentes**: 81
- **Taxa de Conclusão**: ~6.9%

```
[██░░░░░░░░░░░░░░░░░░░░░░░░] 6 / 87 Concluídos
```

---

## 1. 🏛️ Engenharias e Tecnologia

- [x] **Engenharia de Controle e Automação** — [`dist/engenharia-controle-automacao/`](file:///C:/dev/organogramas-ufrgs/dist/engenharia-controle-automacao/) (83 disc., 222 cr, 4 FDCs dinâmicas)
- [x] **Engenharia Mecânica** — [`dist/engenharia-mecanica/`](file:///C:/dev/organogramas-ufrgs/dist/engenharia-mecanica/) (80 disc., 223 cr)
- [x] **Engenharia de Produção** — [`dist/engenharia-producao/`](file:///C:/dev/organogramas-ufrgs/dist/engenharia-producao/) (65 disc., 210 cr)
- [x] **Engenharia Elétrica** — [`dist/engenharia-eletrica/`](file:///C:/dev/organogramas-ufrgs/dist/engenharia-eletrica/) (128 disc., 246 cr)
- [x] **Engenharia de Computação** — [`dist/engenharia-computacao/`](file:///C:/dev/organogramas-ufrgs/dist/engenharia-computacao/) (122 disc., 148 cr)
- [ ] Engenharia Ambiental
- [ ] Engenharia Cartográfica e de Agrimensura
- [ ] Engenharia Civil
- [ ] Engenharia de Alimentos
- [ ] Engenharia de Energia
- [ ] Engenharia de Gestão de Energia – Litoral Norte
- [ ] Engenharia de Materiais
- [ ] Engenharia de Minas
- [ ] Engenharia de Serviços – Litoral Norte
- [ ] Engenharia Física
- [ ] Engenharia Hídrica
- [ ] Engenharia Metalúrgica
- [ ] Engenharia Química
- [ ] Interdisciplinar em Ciência e Tecnologia – Litoral Norte

---

## 2. 💻 Ciências Exatas e da Natureza

- [ ] Ciência da Computação
- [ ] Estatística
- [ ] Física – Bacharelado
- [ ] Física – Licenciatura
- [ ] Geologia
- [ ] Matemática – Bacharelado / Licenciatura
- [ ] Química – Bacharelado / Licenciatura / Tecnológica
- [ ] Computação e Robótica Educativa – EaD

---

## 3. 📊 Economia, Gestão e Negócios

- [x] **Ciências Econômicas** — [`dist/ciencias-economicas/`](file:///C:/dev/organogramas-ufrgs/dist/ciencias-economicas/) (166 disc., 172 cr, Diurno e Noturno)
- [ ] Administração
- [ ] Administração Pública e Social
- [ ] Ciências Atuariais
- [ ] Ciências Contábeis
- [ ] Cooperativismo
- [ ] Gestão Pública e Desenvolvimento Regional – Litoral Norte
- [ ] Políticas Públicas
- [ ] Relações Internacionais

---

## 4. 🩺 Ciências da Saúde, Biológicas e Agrárias

- [ ] Biomedicina
- [ ] Biotecnologia
- [ ] Ciências Biológicas – Bacharelado
- [ ] Ciências Biológicas – Biologia Marinha
- [ ] Ciências Biológicas – Licenciatura
- [ ] Ciências Biológicas – Licenciatura – EaD
- [ ] Educação Física
- [ ] Enfermagem
- [ ] Farmácia
- [ ] Fisioterapia
- [ ] Fonoaudiologia
- [ ] Medicina
- [ ] Medicina Veterinária
- [ ] Nutrição
- [ ] Odontologia
- [ ] Saúde Coletiva
- [ ] Agronomia
- [ ] Bacharelado em Desenvolvimento Rural
- [ ] Zootecnia

---

## 5. 📚 Ciências Humanas, Educação e Comunicação

- [ ] Arquivologia
- [ ] Biblioteconomia
- [ ] Biblioteconomia – EaD
- [ ] Ciências Jurídicas e Sociais (Direito)
- [ ] Ciências Sociais – Bacharelado / Licenciatura
- [ ] Ciências Sociais – EaD
- [ ] Comunicação Social – Jornalismo
- [ ] Comunicação Social – Publicidade e Propaganda
- [ ] Comunicação Social – Relações Públicas
- [ ] Educação do Campo – Ciências da Natureza – CLN
- [ ] Educação do Campo – Ciências da Natureza – Porto Alegre
- [ ] Filosofia
- [ ] Geografia – Bacharelado / Licenciatura
- [ ] Geografia – EaD
- [ ] Geografia – Litoral Norte
- [ ] História – Bacharelado / Licenciatura
- [ ] História da Arte
- [ ] Letras (Português e Línguas Estrangeiras Modernas / Clássicas)
- [ ] Letras – Língua Inglesa – EaD
- [ ] Museologia
- [ ] Pedagogia
- [ ] Pedagogia – EaD
- [ ] Pedagogia – Litoral Norte
- [ ] Psicologia
- [ ] Serviço Social

---

## 6. 🎨 Artes, Arquitetura e Design

- [ ] Arquitetura e Urbanismo
- [ ] Artes Visuais – Bacharelado / Licenciatura
- [ ] Dança – Licenciatura
- [ ] Design de Produto
- [ ] Design Visual
- [ ] Música – Bacharelado / Licenciatura
- [ ] Teatro – Licenciatura / Direção Teatral

---

## 🛠️ Padrão Arquitetural por Curso (`dist/<curso>/`)

Conforme especificado no [`academic-curriculum-planner`](file:///C:/Users/LAMECC%20Gabriel%20Rossa/.gemini/config/skills/academic-curriculum-planner/SKILL.md), cada novo curso deve conter rigorosamente **5 arquivos de produção**:
1. `index.html` — Layout semântico Miro-style.
2. `styles.css` — Tema dark e badges pastéis de semestre original.
3. `app.js` — Motor reativo DAG, BFS topological cascade, exportador Canvas 2D PNG/PDF.
4. `curriculum_data.js` — Fallback de execução zero-server (`file://`).
5. `curriculum_data.json` — Master schema JSON para importações e testes de regressão.

*Validação obrigatória pré-conclusão*: `node dev_tests/validate_all_projects.js`.
