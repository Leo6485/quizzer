## Requisitos

- Node.js (>= 18)
- npm
- Python (>= 3.8)
- pip

## Instalação

### Frontend (React)

1. Clone o repositório:
    ```sh
    git clone https://github.com/Leo6485/quizzer.git
    cd quizzer
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Gere o build:
    ```sh
    npm run build
    ```

### Backend (API Gemini)

1. Acesse a pasta da API:
    ```sh
    cd api
    ```

2. Instale as dependências Python:
    ```sh
    pip install -r requirements.txt
    ```

3. Configurar a chave API do Gemini:
    ```sh
    export GEMINI_API="SUA_API_TOKEN"
    ```
- Para Windows, use: `set GEMINI_API=SUA_API_TOKEN`

4. Inicie o servidor:
    ```sh
    python main.py
    ```

## Uso

- Acesse `http://localhost:8000`

## Estrutura do Projeto

```
quizzer/
├── api/
│   ├── main.py
│   └── requirements.txt
│   └── ...
├── public/
├── src/
│   ├── App.js
│   └── ...
├── package.json
└── README.md
```