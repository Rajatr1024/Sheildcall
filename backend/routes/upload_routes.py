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



from fastapi import APIRouter, UploadFile, File
import os

from services.drive_service import (
    upload_to_drive,
    wait_for_transcript
)

router = APIRouter()

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    temp_path = f"{TEMP_DIR}/{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # Upload to Drive
    upload_to_drive(temp_path, file.filename)

    # Wait for transcript
    transcript = wait_for_transcript(file.filename)

    return {
        "status": "processed",
        "transcript": transcript
    }