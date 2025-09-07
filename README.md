# Quizzer

Quizzer é um projeto React para quizzes interativos, com backend Python para integração com a API Gemini.

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

3. Configure sua chave da API Gemini:
    ```sh
    export GEMINI_API="SUA_API_TOKEN"
    ```
- Para Windows, use: `set GEMINI_API=SUA_API_TOKEN`

4. Inicie o servidor backend:
    ```sh
    python main.py
    ```

## Uso

- Acesse `http://localhost:8000`

## Estrutura do Projeto

```
quizzer/
├── api/                # Backend Python (Gemini API)
│   ├── main.py
│   └── requirements.txt
├── public/
├── src/                # Frontend React
│   ├── App.js
│   └── ...
├── package.json
└── README.md
```