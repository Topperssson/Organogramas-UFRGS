# Simuladores de Organogramas Curriculares — UFRGS (`dist/`) 🎓🗺️

Esta pasta reúne os pacotes de distribuição **100% standalone** e prontos para uso em navegador dos simuladores interativos de trajetória acadêmica para os cursos de graduação da **Universidade Federal do Rio Grande do Sul (UFRGS)**.

---

## 🏛️ Cursos Disponíveis

Cada subdiretório em `dist/<curso>/` é um pacote completo e autônomo, executável diretamente via protocolo `file://`:

| Curso | Diretório | Disciplinas | Créditos | Manual do Curso | Execução Direta (`file://`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Engenharia de Controle e Automação** | [`engenharia-controle-automacao/`](engenharia-controle-automacao/) | 83 | 222 cr | [`README.md`](engenharia-controle-automacao/README.md) | `Start-Process "dist/engenharia-controle-automacao/index.html"` |
| **Engenharia Mecânica** | [`engenharia-mecanica/`](engenharia-mecanica/) | 80 | 223 cr | [`README.md`](engenharia-mecanica/README.md) | `Start-Process "dist/engenharia-mecanica/index.html"` |
| **Engenharia de Produção** | [`engenharia-producao/`](engenharia-producao/) | 65 | 210 cr | [`README.md`](engenharia-producao/README.md) | `Start-Process "dist/engenharia-producao/index.html"` |
| **Ciências Econômicas** | [`ciencias-economicas/`](ciencias-economicas/) | 166 | 172 cr | [`README.md`](ciencias-economicas/README.md) | `Start-Process "dist/ciencias-economicas/index.html"` |
| **Engenharia Elétrica** | [`engenharia-eletrica/`](engenharia-eletrica/) | 128 | 246 cr | [`README.md`](engenharia-eletrica/README.md) | `Start-Process "dist/engenharia-eletrica/index.html"` |
| **Engenharia de Computação** | [`engenharia-computacao/`](engenharia-computacao/) | 122 | 148 cr | [`README.md`](engenharia-computacao/README.md) | `Start-Process "dist/engenharia-computacao/index.html"` |

---

## 🚀 Como Executar

### 1. Abertura Direta (`file://` — Zero Configuração)
Não é necessário compilar, instalar dependências (`npm`) ou rodar servidores locais. Dê duplo clique no arquivo `index.html` de qualquer curso ou execute via terminal:

```powershell
Start-Process "dist\engenharia-controle-automacao\index.html"
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
- `index.html`: Estrutura semântica DOM com header de controles, drawer retrátil de eletivas, painel de métricas e canvas Miro.
- `styles.css`: Estilização dark theme (#0B0F19, #161F30), badges de créditos e conexões reativas SVG.
- `app.js`: Motor reativo do grafo DAG, BFS em cascata, pan/zoom fluído e exportador Canvas 2D.
- `curriculum_data.js`: Fallback nativo em JavaScript para execução irrestrita via `file://`.
- `curriculum_data.json`: Especificação completa das disciplinas, cargas horárias e pré-requisitos oficiais.
- `README.md`: Guia de utilização, particularidades curriculares, atalhos e persistência do curso.
