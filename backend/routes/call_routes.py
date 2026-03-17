from fastapi import APIRouter
import os
import json

router = APIRouter()

CALLS_DIR = "storage/processed_calls"


# GET /calls → list all calls
def get_calls():
    if not os.path.exists(CALLS_DIR):
        return []

    files = os.listdir(CALLS_DIR)

    calls = []

    for file in files:
        path = os.path.join(CALLS_DIR, file)

        with open(path) as f:
            data = json.load(f)

        calls.append({
            "id": data.get("call_id"),
            "summary": data.get("summary"),
            "risk_level": data.get("insights", {}).get("risk_level"),
            "date": data.get("created_at"),
        })

    # latest first
    calls.sort(key=lambda x: x["date"], reverse=True)

    return calls


# GET /call/{id} → single call
@router.get("/call/{call_id}")
def get_call(call_id: str):
    path = f"storage/processed_calls/{call_id}.json"

    if not os.path.exists(path):
        return {"error": "Call not found"}

    with open(path) as f:
        return json.load(f)
    
@router.get("/escalations")
def get_escalations():

    calls = []

    for file in os.listdir(CALLS_DIR):

        if file.endswith(".json"):

            path = os.path.join(CALLS_DIR, file)

            with open(path) as f:
                data = json.load(f)

                if data["insights"]["risk_level"] == "High":

                    calls.append({
                        "id": data["call_id"],
                        "summary": data["summary"],
                        "sentiment": data["insights"]["customer_sentiment"],
                        "risk": data["insights"]["risk_level"],
                        "created_at": data["created_at"]
                    })

    return calls