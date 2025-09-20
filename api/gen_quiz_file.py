import time
from gemini import gen_quiz_file

rate_limits = {}

async def handler(request):
    ip = request.headers.get("x-forwarded-for", "unknown")
    now = int(time.time())
    window = 3600
    limit = 10

    rate_limits.setdefault(ip, [])
    rate_limits[ip] = [t for t in rate_limits[ip] if now - t < window]

    if len(rate_limits[ip]) >= limit:
        return {
            "statusCode": 429,
            "headers": {"Content-Type": "application/json"},
            "body": '{"error": "Too many requests"}'
        }

    rate_limits[ip].append(now)

    form = await request.form()
    file = form["file"]
    msg = form.get("msg", "")
    content = await file.read()

    quiz = gen_quiz_file(file, msg, content)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": quiz
    }
