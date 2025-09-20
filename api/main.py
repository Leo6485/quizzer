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

@app.get("/api/gen_quiz")
@limiter.limit("10/hour")
def get_quiz(request: Request, msg: str):
    quiz = gen_quiz(msg)
    return quiz

@app.post("/api/gen_quiz_file")
@limiter.limit("10/hour")
def get_quiz_file(request: Request, file: UploadFile = File(...), msg: str = ""):
    content = file.file.read()
    quiz = gen_quiz_file(file, msg, content)
    return quiz

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
