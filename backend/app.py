from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes import upload_routes
from routes import call_routes

app = FastAPI(title="AI Call Intelligence API")

# Routers
app.include_router(upload_routes.router)
app.include_router(call_routes.router)

# Static audio serving
app.mount(
    "/audio",
    StaticFiles(directory="storage/audio"),
    name="audio"
)

# Latest fallback endpoint (keep for dashboard default)
@app.get("/latest")
def get_latest_call():
    return {
        "summary": "Test summary",
        "sentiment": {"overall": "neutral", "confidence": 0.8},
        "risk_flags": [],
        "confidence": {"overall_score": 0.75},
        "conversation_analytics": {
            "talk_ratio": {
                "SPEAKER_00": 0.6,
                "SPEAKER_01": 0.4
            },
            "total_silence_seconds": 5,
            "interruptions": 1,
        },
        "insights": {
            "call_type": "general",
            "risk_level": "low",
            "customer_sentiment": "neutral",
            "agent_dominance": False,
            "escalation_required": False,
        },
        "transcript": [
            {"speaker": "SPEAKER_00", "text": "Hello"},
            {"speaker": "SPEAKER_01", "text": "Hi there"},
        ],
    }

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)