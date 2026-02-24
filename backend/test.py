# import fastapi
# import uvicorn
# import twilio
# import requests
# import pydantic

# print("All installed successfully")


from services.google_auth import get_drive_service

service = get_drive_service()

print("Drive connected successfully")