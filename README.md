# Detector de expressões faciais

### Instruções de execução

Instalação das dependências:
```bash
bun install
```

Execução:
```bash
bun run index.ts
```

## Script em python
O projeto é desenvolvido usando Python (versão posterior à 3.10.4). A linguagem pode ser baixada através do [site oficial] (https://www.python.org/downloads/) ou através da instalação de um package manager e environment manager tal qual o [Conda](<https://www.anaconda.com/download>).

### Instruções de execução

Crie um ambiente virtual
```sh
python -m venv <caminho-do-ambiente-virtual>
```

Ative o ambiente virtual
O ambiente virtual deve sempre ser ativado antes de começar a executar scripts. Ele é ativado por instância do console, então deve sempre ser reativado.

##### Em plataformas Linux (incluindo WSL)

```sh
source ./.venv/bin/activate
```

##### No PowerShell

```powershell
.venv\Scripts\activate.ps1
```

Certifique-se de permitir a execução de scripts: com um PowerShell em modo administrador, execute

```powershell
Set-ExecutionPolicy Unrestricted
```

**Se a ativação for bem-sucedida, o nome do diretório do ambiente virtual aparecerá antes do prompt do seu shell.** Por exemplo, no bash,

```sh
(.venv) meu-user@meu-pc:~/caminho/até/codigo$ 
```

Instalação das dependências:
Após ativar o virtualenv, execute

```sh
pip install -r requirements.txt
```

#### Execução de notebooks Jupyter

Os arquivos com extensão `.ipynb` são notebooks Jupyter. O VS Code possui suporte a eles instalando a extensão [Jupyter](<https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter>).
