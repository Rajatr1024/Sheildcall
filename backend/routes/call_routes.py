from fastapi import APIRouter
import os
import json

router = APIRouter()

CALLS_DIR = "storage/processed_calls"


# GET /calls → list all calls
@router.get("/calls")
def list_calls():

    calls = []

    if not os.path.exists(CALLS_DIR):
        return []

    for file in os.listdir(CALLS_DIR):

        if file.endswith(".json"):

            path = os.path.join(CALLS_DIR, file)

            with open(path) as f:
                data = json.load(f)

                calls.append({
                    "id": data.get("call_id"),
                    "summary": data.get("summary"),
                    "risk_level": data.get("insights", {}).get("risk_level"),
                    "sentiment": data.get("insights", {}).get("customer_sentiment"),
                    "created_at": data.get("created_at"),
                    "audio_file": data.get("audio_file")
                })

    # newest first
    calls.sort(
        key=lambda x: x["created_at"] or "",
        reverse=True
    )

    return calls


# GET /call/{id} → single call
@router.get("/call/{call_id}")
def get_call(call_id: str):

    path = f"{CALLS_DIR}/{call_id}.json"

    if not os.path.exists(path):
        return {"error": "Call not found"}

    with open(path) as f:
        return json.load(f)