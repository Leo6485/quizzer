import requests
import json
from fastapi import FastAPI
from random import shuffle
from fastapi.middleware.cors import CORSMiddleware
from gemini import send_with_history, gen_quiz
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Quiz:
    data: list[dict]

@app.get("/quiz")
def get_quiz(msg: str):
    quiz = gen_quiz(msg)
    return quiz

@app.get("/quiz_")
def get_quiz_(msg: str):
    return [{"question":"Qual o comando utilizado para imprimir algo na tela em Python?","id":1,"options":[{"id":3,"text":"display()"},{"id":4,"text":"show()"},{"id":2,"text":"echo()"},{"id":1,"text":"print()"}],"solution":1,"explanation":"O comando print() exibe o valor passado como argumento no console.","difficult":"easy"},{"question":"Qual o tipo de dado de '10'?","id":2,"options":[{"id":1,"text":"int"},{"id":4,"text":"bool"},{"id":3,"text":"float"},{"id":2,"text":"str"}],"solution":2,"explanation":"Como a string está entre aspas, ela é do tipo string (str).","difficult":"easy"},{"question":"Qual o tipo de dado de 10?","id":3,"options":[{"id":3,"text":"float"},{"id":2,"text":"str"},{"id":1,"text":"int"},{"id":4,"text":"bool"}],"solution":1,"explanation":"10 é um número inteiro, logo, é do tipo int.","difficult":"easy"},{"question":"Qual o tipo de dado de 10.5?","id":4,"options":[{"id":4,"text":"bool"},{"id":1,"text":"int"},{"id":2,"text":"str"},{"id":3,"text":"float"}],"solution":3,"explanation":"10.5 é um número com casas decimais, logo, é do tipo float.","difficult":"easy"},{"question":"Qual o operador de atribuição em Python?","id":5,"options":[{"id":4,"text":"="},{"id":2,"text":"+"},{"id":3,"text":"*"},{"id":1,"text":"-"}],"solution":4,"explanation":"O operador de atribuição em Python é o sinal de igual (=).","difficult":"easy"}]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)