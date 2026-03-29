import uuid
import json
import shutil
import threading
from datetime import datetime
from fastapi import APIRouter, UploadFile, File
import os

from services.drive_service import upload_to_drive, wait_for_transcript

router = APIRouter()

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs("storage/processed_calls", exist_ok=True)
os.makedirs("storage/audio", exist_ok=True)


def save_processed_call(transcript_data, temp_audio_path):
    call_id = str(uuid.uuid4())

    json_path = f"storage/processed_calls/{call_id}.json"
    audio_path = f"storage/audio/{call_id}.wav"

    # Add metadata
    transcript_data["call_id"] = call_id
    transcript_data["created_at"] = datetime.utcnow().isoformat()
    transcript_data["audio_file"] = f"{call_id}.wav"

    # Save JSON
    with open(json_path, "w") as f:
        json.dump(transcript_data, f, indent=2)

    # Move audio file
    shutil.copy (temp_audio_path, audio_path)

    return call_id


def real_processing_pipeline(json_path, filename):
    try:
        # 1. Upload to Drive
        upload_to_drive(f"{TEMP_DIR}/{filename}", filename)

        # 2. Wait for Colab result
        transcript_data = wait_for_transcript(filename)

        # 3. Load existing JSON
        with open(json_path, "r") as f:
            data = json.load(f)

        # 4. Replace with REAL AI output
        data.update(transcript_data)
        data["status"] = "completed"

        # 5. Save updated JSON
        with open(json_path, "w") as f:
            json.dump(data, f, indent=2)

    except Exception as e:
        print("Processing failed:", e)

        with open(json_path, "r") as f:
            data = json.load(f)

        data["status"] = "failed"

        with open(json_path, "w") as f:
            json.dump(data, f, indent=2)
    

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    temp_path = f"{TEMP_DIR}/{file.filename}"

    # Save uploaded file
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # Initial "processing" state
    initial_data = {
        "summary": "Processing...",
        "status": "processing",
        "sentiment": {"overall": "neutral", "confidence": 0},
        "risk_flags": [],
        "confidence": {"overall_score": 0},
        "conversation_analytics": {
            "talk_ratio": {},
            "total_silence_seconds": 0,
            "interruptions": 0,
        },
        "insights": {
            "call_type": "",
            "risk_level": "",
            "customer_sentiment": "",
            "agent_dominance": False,
            "escalation_required": False,
        },
        "transcript": [],
    }

    # Save initial state
    call_id = save_processed_call(initial_data, temp_path)

    json_path = f"storage/processed_calls/{call_id}.json"

    # Start background processing
    threading.Thread(
        target=real_processing_pipeline,
        args=(json_path, file.filename)
    ).start()

    return {
        "status": "processing",
        "call_id": call_id
    }