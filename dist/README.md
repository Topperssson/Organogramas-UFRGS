# Simuladores de Organogramas Curriculares — UFRGS (`dist/`) 🎓🗺️

Esta pasta reúne os pacotes de distribuição **100% standalone** e prontos para uso em navegador dos simuladores interativos de trajetória acadêmica para os cursos de graduação da **Universidade Federal do Rio Grande do Sul (UFRGS)**.

---

## 🏛️ Cursos Disponíveis

Cada subdiretório em `dist/<curso>/` é um pacote completo e autônomo, executável diretamente via protocolo `file://`:

| Curso | Diretório | Disciplinas | Créditos | Manual do Curso | Execução Direta (`file://`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Engenharia de Controle e Automação** | [`engenharia-controle-automacao/`](engenharia-controle-automacao/) | 83 | 222 cr | [`README.md`](engenharia-controle-automacao/README.md) | `Start-Process "dist/engenharia-controle-automacao/organograma.html"` |
| **Engenharia Mecânica** | [`engenharia-mecanica/`](engenharia-mecanica/) | 80 | 223 cr | [`README.md`](engenharia-mecanica/README.md) | `Start-Process "dist/engenharia-mecanica/organograma.html"` |
| **Engenharia de Produção** | [`engenharia-producao/`](engenharia-producao/) | 65 | 210 cr | [`README.md`](engenharia-producao/README.md) | `Start-Process "dist/engenharia-producao/organograma.html"` |
| **Ciências Econômicas** | [`ciencias-economicas/`](ciencias-economicas/) | 166 | 172 cr | [`README.md`](ciencias-economicas/README.md) | `Start-Process "dist/ciencias-economicas/organograma.html"` |
| **Engenharia Elétrica** | [`engenharia-eletrica/`](engenharia-eletrica/) | 128 | 246 cr | [`README.md`](engenharia-eletrica/README.md) | `Start-Process "dist/engenharia-eletrica/organograma.html"` |
| **Engenharia de Computação** | [`engenharia-computacao/`](engenharia-computacao/) | 122 | 148 cr | [`README.md`](engenharia-computacao/README.md) | `Start-Process "dist/engenharia-computacao/organograma.html"` |
| **Ciência da Computação** | [`ciencia-computacao/`](ciencia-computacao/) | 144 | 204 cr (166 ob) | [`README.md`](ciencia-computacao/README.md) | `Start-Process "dist/ciencia-computacao/organograma.html"` |
| **Engenharia Civil** | [`engenharia-civil/`](engenharia-civil/) | 161 | 291 cr (234 ob) | [`README.md`](engenharia-civil/README.md) | `Start-Process "dist/engenharia-civil/organograma.html"` |
| **Engenharia Química** | [`engenharia-quimica/`](engenharia-quimica/) | 171 | 239 cr (208 ob) | [`README.md`](engenharia-quimica/README.md) | `Start-Process "dist/engenharia-quimica/organograma.html"` |
| **Engenharia de Materiais** | [`engenharia-materiais/`](engenharia-materiais/) | 126 | 262 cr (178 ob) | [`README.md`](engenharia-materiais/README.md) | `Start-Process "dist/engenharia-materiais/organograma.html"` |
| **Engenharia Ambiental** | [`engenharia-ambiental/`](engenharia-ambiental/) | 148 | 279 cr (236 ob) | [`README.md`](engenharia-ambiental/README.md) | `Start-Process "dist/engenharia-ambiental/organograma.html"` |
| **Engenharia Metalúrgica** | [`engenharia-metalurgica/`](engenharia-metalurgica/) | 104 | 260 cr (216 ob) | [`README.md`](engenharia-metalurgica/README.md) | `Start-Process "dist/engenharia-metalurgica/organograma.html"` |
| **Engenharia de Minas** | [`engenharia-minas/`](engenharia-minas/) | 96 | 281 cr (254 ob) | [`README.md`](engenharia-minas/README.md) | `Start-Process "dist/engenharia-minas/organograma.html"` |
| **Engenharia Física** | [`engenharia-fisica/`](engenharia-fisica/) | 81 | 238 cr (189 ob) | [`README.md`](engenharia-fisica/README.md) | `Start-Process "dist/engenharia-fisica/organograma.html"` |
| **Engenharia Cartográfica e de Agrimensura** | [`engenharia-cartografica-agrimensura/`](engenharia-cartografica-agrimensura/) | 105 | 240 cr (206 ob) | [`README.md`](engenharia-cartografica-agrimensura/README.md) | `Start-Process "dist/engenharia-cartografica-agrimensura/organograma.html"` |
| **Matemática** | [`matematica/`](matematica/) | 191 únicas (4 trilhas) | 148–222 cr | [`README.md`](matematica/README.md) | `Start-Process "dist/matematica/organograma.html"` |

---

## 🚀 Como Executar

### 1. Abertura Direta (`file://` — Zero Configuração)
Não é necessário compilar, instalar dependências (`npm`) ou rodar servidores locais. Dê duplo clique no arquivo `organograma.html` de qualquer curso ou execute via terminal:

```powershell
Start-Process "dist\engenharia-controle-automacao\organograma.html"
```

### 2. Execução via Servidor Local (Opcional)
Se preferir servir os arquivos via HTTP:

```powershell
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000/dist/<curso>/` (ex.: `http://localhost:8000/dist/engenharia-mecanica/`).

---

## 📦 Anatomia Padrão de Cada Pacote

Cada pasta de curso contém estritamente **6 arquivos de produção**:
- `organograma.html`: Estrutura semântica DOM com header de controles, drawer retrátil de eletivas, painel de métricas e canvas Miro.
- `styles.css`: Estilização dark theme (#0B0F19, #161F30), badges de créditos e conexões reativas SVG.
- `app.js`: Motor reativo do grafo DAG, BFS em cascata, pan/zoom fluído e exportador Canvas 2D.
- `curriculum_data.js`: Fallback nativo em JavaScript para execução irrestrita via `file://`.
- `curriculum_data.json`: Especificação completa das disciplinas, cargas horárias e pré-requisitos oficiais.
- `README.md`: Guia de utilização, particularidades curriculares, atalhos e persistência do curso.
