import uvicorn, os
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from gemini import gen_quiz, gen_quiz_file

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="../build/static"), name="static")


limiter = Limiter(key_func=get_remote_address)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceded(request: Request, exc: RateLimitExceeded):
    return JSONResponse( status_code=429, content={"error": "Too many requests"})

@app.get("/")
async def serve_react():
    return FileResponse(os.path.join("../build", "index.html"))

@app.get("/api/quiz")
@limiter.limit("10/hour")
def get_quiz(request: Request, msg: str):
    quiz = gen_quiz(msg)
    return quiz

@app.post("/api/quiz_file")
@limiter.limit("10/hour")
def get_quiz_file(request: Request, file: UploadFile = File(...), msg: str = ""):
    content = file.file.read()
    quiz = gen_quiz_file(file, msg, content)
    return quiz

@app.get("/api/quiz_")
def get_quiz_(msg: str):
    return [{"question":"Qual o comando utilizado para imprimir algo na tela em Python?","id":1, "time": 30, "options":[{"id":3,"text":"display()"},{"id":4,"text":"show()"},{"id":2,"text":"echo()"},{"id":1,"text":"print()"}],"solution":1,"explanation":"O comando print() exibe o valor passado como argumento no console.","difficult":"easy"},{"question":"Qual o tipo de dado de '10'?","id":2, "time": 30, "options":[{"id":1,"text":"int"},{"id":4,"text":"bool"},{"id":3,"text":"float"},{"id":2,"text":"str"}],"solution":2,"explanation":"Como a string está entre aspas, ela é do tipo string (str).","difficult":"easy"},{"question":"Qual o tipo de dado de 10?","id":3, "time": 30, "options":[{"id":3,"text":"float"},{"id":2,"text":"str"},{"id":1,"text":"int"},{"id":4,"text":"bool"}],"solution":1,"explanation":"10 é um número inteiro, logo, é do tipo int.","difficult":"easy"},{"question":"Qual o tipo de dado de 10.5?","id":4, "time": 30, "options":[{"id":4,"text":"bool"},{"id":1,"text":"int"},{"id":2,"text":"str"},{"id":3,"text":"float"}],"solution":3,"explanation":"10.5 é um número com casas decimais, logo, é do tipo float.","difficult":"easy"},{"question":"Qual o operador de atribuição em Python?","id":5, "time": 30, "options":[{"id":4,"text":"="},{"id":2,"text":"+"},{"id":3,"text":"*"},{"id":1,"text":"-"}],"solution":4,"explanation":"O operador de atribuição em Python é o sinal de igual (=).","difficult":"easy"}]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)