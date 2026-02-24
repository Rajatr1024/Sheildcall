from fastapi import APIRouter, Request, Response
from twilio.twiml.voice_response import VoiceResponse
import requests
import os

router = APIRouter()

RECORDINGS_DIR = "recordings"

os.makedirs(RECORDINGS_DIR, exist_ok=True)


@router.post("/voice")
async def voice_call():

    twiml = VoiceResponse()

    dial = twiml.dial(
        record="record-from-answer-dual",
        recording_status_callback="https://trafficable-braelyn-pericentral.ngrok-free.dev/recording",
        recording_status_callback_method="POST"
    )

    # Call your verified phone number
    dial.number("+91XXXXXXXXXX")

    return Response(
        content=str(twiml),
        media_type="text/xml"
    )


@router.post("/recording")
async def save_recording(request: Request):

    print("Recording webhook hit")

    form = await request.form()

    recording_url = form.get("RecordingUrl") + ".wav"
    call_sid = form.get("CallSid")

    file_path = f"recordings/{call_sid}.wav"

    import requests
    audio_data = requests.get(recording_url).content

    with open(file_path, "wb") as f:
        f.write(audio_data)
    return {"status": "Recording saved", "file": file_path}