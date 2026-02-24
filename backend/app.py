from fastapi import FastAPI
# from routes import twilio_routes
from routes import upload_routes

app = FastAPI(title="AI Call Intelligence API")

app.include_router(upload_routes.router)
# app.include_router(twilio_routes.router)

@app.get("/")
def root():
    return {"status": "Server running"}