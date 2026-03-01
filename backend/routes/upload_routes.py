# # from fastapi import APIRouter, UploadFile, File
# # import os
# # import shutil
# # from services.transcription_service import transcribe_audio

# # router = APIRouter()

# # UPLOAD_DIR = "recordings"
# # os.makedirs(UPLOAD_DIR, exist_ok=True)


# # @router.post("/upload")
# # async def upload_audio(file: UploadFile = File(...)):

# #     file_path = os.path.join(UPLOAD_DIR, file.filename)

# #     with open(file_path, "wb") as buffer:
# #         shutil.copyfileobj(file.file, buffer)
        
# #         transcript = transcribe_audio(file_path)
        
# #     return {
# #         "message": "File uploaded",
# #         "transcript": transcript
# #         }


# from fastapi import APIRouter, UploadFile, File
# import os
# from services.drive_service import wait_for_transcript

# router = APIRouter()

# INPUT_DIR = "/Users/h.satyamverma/Library/CloudStorage/GoogleDrive-rajat.r4096@gmail.com/My Drive/ShieldCall/input"


# @router.post("/upload")
# async def upload_audio(file: UploadFile = File(...)):

#     input_path = os.path.join(INPUT_DIR, file.filename)

#     with open(input_path, "wb") as f:
#         f.write(await file.read())

#     transcript = wait_for_transcript(file.filename)
#     print("Saving file to:", input_path)

#     return {
#         "message": "Processed",
#         "transcript": transcript
#     }


import uuid
import json
import shutil
from datetime import datetime
from fastapi import APIRouter, UploadFile, File
import os

from services.drive_service import (
    upload_to_drive,
    wait_for_transcript
)

router = APIRouter()

TEMP_DIR = "temp"
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

    # Move audio file permanently
    shutil.move(temp_audio_path, audio_path)

    return call_id
os.makedirs(TEMP_DIR, exist_ok=True)


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    temp_path = f"{TEMP_DIR}/{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # Upload to Drive
    upload_to_drive(temp_path, file.filename)

    # Wait for transcript from AI pipeline
    transcript = wait_for_transcript(file.filename)

    # SAVE permanently
    call_id = save_processed_call(
        transcript,
        temp_path
    )

    return {
        "status": "processed",
        "call_id": call_id
    }