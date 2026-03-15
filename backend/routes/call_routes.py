from fastapi import APIRouter
import os
import json

router = APIRouter()

CALLS_DIR = "storage/processed_calls"


# GET /calls → list all calls
@router.get("/calls")
def list_calls():

    calls = []

    for file in os.listdir(CALLS_DIR):

        if not file.endswith(".json"):
            continue

        path = os.path.join(CALLS_DIR, file)

        try:
            with open(path) as f:
                data = json.load(f)

            calls.append({
                "id": data.get("call_id"),
                "summary": data.get("summary"),
                "risk_level": data.get("insights", {}).get("risk_level"),
                "sentiment": data.get("insights", {}).get("customer_sentiment"),
                "created_at": data.get("created_at")
            })

        except Exception as e:
            print("Error reading file:", path, e)

    return calls


# GET /call/{id} → single call
@router.get("/call/{call_id}")
def get_call(call_id: str):

    path = f"{CALLS_DIR}/{call_id}.json"

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