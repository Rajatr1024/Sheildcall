from fastapi import FastAPI
# from routes import twilio_routes
from routes import upload_routes

app = FastAPI(title="AI Call Intelligence API")

app.include_router(upload_routes.router)
# app.include_router(twilio_routes.router)

@app.get("/calls")
def list_calls():

    return [
        {
            "id": "call_001",
            "filename": "test1.mp3",
            "risk_level": "high",
            "sentiment": "negative",
            "date": "2026-02-24",
        },
        {
            "id": "call_002",
            "filename": "support_call.mp3",
            "risk_level": "low",
            "sentiment": "neutral",
            "date": "2026-02-23",
        },
    ]

@app.get("/latest")
def get_latest_call():
    return {
        "summary": "Test summary",
        "sentiment": {"overall": "neutral", "confidence": 0.8},
        "risk_flags": [],
        "confidence": {"overall_score": 0.75},
        "conversation_analytics": {
            "talk_ratio": {"SPEAKER_00": 0.6, "SPEAKER_01": 0.4},
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
    
    

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)