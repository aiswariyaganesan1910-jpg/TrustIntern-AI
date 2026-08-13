import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from fastapi import FastAPI

# 1. First, create the FastAPI instance:
app = FastAPI()

# 2. Then, define your routes below it:
@app.get("/")
def home():
    return {"status": "API is running", "docs": "/docs"}

# Resolve paths BEFORE importing local modules
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))  # AI_model
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)               # TrustIntern-AI
SRC_DIR = os.path.join(CURRENT_DIR, "src")

for path in [CURRENT_DIR, SRC_DIR, PROJECT_ROOT]:
    if path not in sys.path:
        sys.path.insert(0, path)

from src.predict import predict_scam

# Initialize FastAPI app
app = FastAPI(
    title="TrustIntern AI - NLP Microservice",
    description="NLP Text Analysis Engine for Detecting Fake Internship & Job Postings.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Flexible input schema supporting either single text string or individual job fields
class JobTextRequest(BaseModel):
    text: Optional[str] = None
    title: Optional[str] = ""
    company_profile: Optional[str] = ""
    description: Optional[str] = ""
    requirements: Optional[str] = ""
    benefits: Optional[str] = ""


@app.get("/")
def health_check():
    return {"status": "online", "service": "TrustIntern AI NLP Microservice"}


@app.post("/api/analyze")
def analyze_job_text(request: JobTextRequest):
    # Combine available text fields into single string
    if request.text and request.text.strip():
        full_text = request.text.strip()
    else:
        full_text = f"{request.title} {request.company_profile} {request.description} {request.requirements} {request.benefits}".strip()

    if not full_text:
        raise HTTPException(status_code=400, detail="No text provided for analysis.")

    try:
        return predict_scam(full_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    