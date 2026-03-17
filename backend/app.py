import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes import upload_routes
from routes import call_routes
from dotenv import load_dotenv
import os

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI(title="AI Call Intelligence API")

# Routers
app.include_router(upload_routes.router)
app.include_router(call_routes.router)

# Static audio serving
app.mount(
    "/audio",
    StaticFiles(directory="storage/audio", html=False),
    name="audio"
)

# Latest fallback endpoint (keep for dashboard default)
@app.get("/latest")
def get_latest_call():
    folder = "storage/processed_calls"

    if not os.path.exists(folder):
        return {"error": "No processed calls"}

    files = os.listdir(folder)
    latest_file = max(
    files,
    key=lambda x: os.path.getmtime(os.path.join(folder, x))
)
    
    if not files:
        return {"error": "No calls found"}

    # ✅ pick latest by time (NOT name)
    latest_file = max(
        files,
        key=lambda x: os.path.getmtime(os.path.join(folder, x))
    )

    with open(os.path.join(folder, latest_file)) as f:
        data = json.load(f)
        
    if data.get("status") == "processing":
        return {"status": "processing"}
    
    if data.get("status") == "failed":
        return {"status": "failed"}

    return data

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",  # 🔥 ADD THIS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)