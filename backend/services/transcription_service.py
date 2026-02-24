import certifi
import ssl
ssl._create_default_https_context = ssl.create_default_context(
    cafile=certifi.where()
)
import whisper

model = whisper.load_model("base")

def transcribe_audio(file_path):
    result = model.transcribe(file_path)
    return result["text"]