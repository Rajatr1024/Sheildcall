# import os
# import time
# import json

# # Path to your Google Drive Desktop synced folder
# OUTPUT_DIR = "/Users/h.satyamverma/Library/CloudStorage/GoogleDrive-rajat.r4096@gmail.com/My Drive/ShieldCall/output"


# def wait_for_transcript(filename):

#     output_file = os.path.join(
#         OUTPUT_DIR,
#         filename + ".json"
#     )

#     # Wait up to 5 minutes
#     for _ in range(60):

#         if os.path.exists(output_file):

#             with open(output_file) as f:
#                 return json.load(f)

#         time.sleep(5)

#     return {"error": "Processing timeout"}


import os
import io
import json
import time
import pickle

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request


# ===== CONFIG =====
SCOPES = ["https://www.googleapis.com/auth/drive"]

INPUT_FOLDER_ID = "PASTE_INPUT_FOLDER_ID"
OUTPUT_FOLDER_ID = "PASTE_OUTPUT_FOLDER_ID"


# ===== AUTH =====
def get_drive_service():
    creds = None

    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    return build("drive", "v3", credentials=creds)


# ===== 3. UPLOAD AUDIO =====
def upload_to_drive(file_path, filename):
    service = get_drive_service()

    file_metadata = {
        "name": filename,
        "parents": ["1crxF2qLyR0awpUCcvrNIV_u8Mtjw6Bsp"]
    }

    media = MediaFileUpload(file_path, resumable=True)

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id"
    ).execute()

    return file.get("id")


# ===== 5. DOWNLOAD TRANSCRIPT =====
def download_transcript(service, file_id):
    request = service.files().get_media(fileId=file_id)

    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)

    done = False
    while not done:
        status, done = downloader.next_chunk()

    fh.seek(0)
    return json.load(fh)


# ===== 4. WAIT FOR TRANSCRIPT =====
def wait_for_transcript(filename, timeout=300):
    service = get_drive_service()

    transcript_name = filename.replace(".mp3", ".json").replace(".wav", ".json")

    start_time = time.time()

    while time.time() - start_time < timeout:

        results = service.files().list(
            q=f"name='{transcript_name}' and '{"1o7RR7YdmY83eEGDpFEjV4lkCPiJRfRZC"}' in parents",
            fields="files(id, name)"
        ).execute()

        files = results.get("files", [])

        if files:
            file_id = files[0]["id"]
            return download_transcript(service, file_id)

        time.sleep(5)

    return None