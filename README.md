# ShieldCall — AI Call Intelligence Platform

ShieldCall is an end-to-end AI system that analyzes customer calls and extracts actionable intelligence including speaker insights, fraud risk detection, sentiment, summaries, and behavioral analytics.

Built for FinTech security, compliance monitoring, customer support intelligence, and fraud prevention.

---

## 🚀 Core Capabilities

### 🎙 Speech Intelligence

* Multi-speaker diarization
* Timestamped transcripts
* Speaker-text alignment
* Multilingual transcription

### 🧠 NLP Intelligence

* Per-speaker sentiment detection
* Abstractive call summarization
* Contextual scam / fraud classification

### ⚠️ Risk & Trust Modeling

* Fraud probability scoring
* Keyword + AI hybrid detection
* Confidence reliability index

### 📊 Conversation Analytics

* Talk ratio analysis
* Silence gap detection
* Interruption tracking
* Average turn duration

### 🧭 Insight Structuring

* Call type classification
* Risk severity mapping
* Customer sentiment extraction
* Agent dominance detection
* Escalation triggers

---

## 🏗 Architecture Pipeline

Upload Audio
→ Google Drive Input Folder
→ Colab Watcher Automation
→ Speaker Diarization (PyAnnote GPU)
→ Whisper Transcription
→ Speaker Merge
→ Sentiment Analysis
→ Summarization
→ Fraud Risk Classification
→ Confidence Scoring
→ Conversation Analytics
→ Insight Structuring
→ JSON Output → Backend API

---

## 🧪 Output JSON Structure

```json
{
  "transcript": [...],
  "summary": "...",
  "sentiment": {...},
  "risk_flags": [...],
  "confidence": {...},
  "conversation_analytics": {...},
  "insights": {...}
}
```

---

## 🛠 Tech Stack

### AI / ML

* PyAnnote (Speaker diarization)
* OpenAI Whisper (Transcription)
* Hugging Face Transformers
* RoBERTa (Sentiment)
* BART (Summarization)
* BERT Spam Classifier (Risk)

### Backend

* FastAPI
* Python
* Google Drive API

### Infra / Processing

* Google Colab GPU
* Drive Watcher Automation

### Frontend (Planned)

* React / Next.js
* Tailwind CSS
* Analytics dashboards

---

## 📂 Project Structure

```
shieldcall/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   └── services/
│
├── colab_pipeline/
│   ├── watcher.py
│   ├── process_audio.py
│
├── models/              # ignored
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone https://github.com/<username>/shieldcall.git
cd shieldcall
```

---

### 2️⃣ Backend Setup

```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
```

---

### 3️⃣ Configure Environment

Create `.env`:

```
GOOGLE_DRIVE_FOLDER_ID=...
BACKEND_URL=...
```

---

### 4️⃣ Run Backend

```bash
uvicorn main:app --reload
```

---

### 5️⃣ Run Colab Pipeline

Upload notebook → Mount Drive → Start watcher loop.

---

## 🔐 Security Notes

Secrets are excluded via `.gitignore`:

* OAuth tokens
* Drive credentials
* API keys
* Model caches

Never commit:

```
token.pickle
credentials.json
.env
```

---

## 📈 Use Cases

* Banking fraud detection
* Call center QA
* Compliance monitoring
* Customer sentiment tracking
* Sales performance analytics
* Scam call identification

---

## 🗺 Roadmap

* Real-time call streaming
* Agent coaching insights
* CRM integrations
* Voice biometrics
* Risk alert dashboards
* Auto call blocking APIs

---

## 👤 Author

**Rajat Rajput**
AI Systems & Full-Stack Developer

---

## 📜 License

MIT License — free for research and commercial adaptation.
