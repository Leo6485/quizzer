import json, requests, base64
from random import shuffle
from os import getenv
from dotenv import load_dotenv
from fastapi import UploadFile

URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
load_dotenv("../.env")
API_KEY = getenv("GEMINI_API")

def send_with_history(prompt, history):
    history.append({"role": "user", "parts": [{"text": prompt}]})
    data = {"contents": history}
    response = requests.post(URL, params={"key": API_KEY}, json=data)
    resp_json = response.json()

    try:
        text = resp_json["candidates"][0]["content"]["parts"][0]["text"]

        history.append({
            "role": "model",
            "parts": [{"text": text}]
        })

        return text

    except Exception as e:
        return f"Erro na resposta: {json.dumps(resp_json, indent=2, ensure_ascii=False)}"

def gen_quiz(msg):
    global prompt
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {"role": "user", "parts": [{"text": prompt + msg}]}
        ],
        "generationConfig": {
            "response_mime_type": "application/json",
            "response_schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "question": {"type": "string"},
                        "id": {"type": "integer"},
                        "difficult": {"type": "string"},
                        "time": {"type": "integer"},
                        "options": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {"type": "integer"},
                                    "text": {"type": "string"}
                                },
                                "required": ["id", "text"]
                            }
                        },
                        "solution": {"type": "integer"},
                        "explanation": {"type": "string"}
                    },
                    "required": ["question", "id", "options", "solution", "explanation"]
                }
            }
        }
    }

    response = requests.post(URL, params={"key": API_KEY}, headers=headers, json=data)
    resp_json = response.json()

    try:
        text = resp_json["candidates"][0]["content"]["parts"][0]["text"]
        json_ = json.loads(text)
        for q in json_:
            shuffle(q["options"])
        
        return json_

    except Exception as e:
        return {"error": str(e), "raw": resp_json}

def gen_quiz_file(file: UploadFile, msg="", content=None):
    global prompt

    file_b64 = base64.b64encode(content).decode("utf-8")

    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {"role": "user", "parts": [{"text": prompt + msg}]},
            {
                "role": "user",
                "parts": [{
                    "inline_data": {
                        "mime_type": file.content_type,
                        "data": file_b64
                    }
                }]
            }
        ],
        "generationConfig": {
            "response_mime_type": "application/json",
            "response_schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "question": {"type": "string"},
                        "id": {"type": "integer"},
                        "difficult": {"type": "string"},
                        "time": {"type": "integer"},
                        "options": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {"type": "integer"},
                                    "text": {"type": "string"}
                                },
                                "required": ["id", "text"]
                            }
                        },
                        "solution": {"type": "integer"},
                        "explanation": {"type": "string"}
                    },
                    "required": ["question", "id", "options", "solution", "explanation"]
                }
            }
        }
    }

    response = requests.post(URL, params={"key": API_KEY}, headers=headers, json=data)
    resp_json = response.json()

    try:
        text = resp_json["candidates"][0]["content"]["parts"][0]["text"]
        json_ = json.loads(text)
        for q in json_:
            shuffle(q["options"])
        return json_
    except Exception as e:
        return {"error": str(e), "raw": resp_json}

with open("prompts/basic.txt", "r", encoding="utf-8") as f:
    prompt = f.read()
