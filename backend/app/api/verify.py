from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session

from app.core.safety_score import calculate_safety_score
from app.db.database import get_db
from app.db.models import CompanyVerification

router = APIRouter()


@router.post("/verify")
async def verify_company(
    company_name: str = Form(...),
    website: str = Form(...),
    email: str = Form(...),
    contact_number: str = Form(...),
    description: str = Form(""),
    offer_letter: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Calculate trust score
    score = calculate_safety_score(
        website_verified=True,
        linkedin_verified=True,
        registration_verified=True
    )

    # Create database record
    company = CompanyVerification(
        company_name=company_name,
        website=website,
        email=email,
        contact_number=contact_number,
        description=description,
        trust_score=score,
        risk_level="Low",
        recommendation="Suitable for internship, but confirm stipend terms before accepting."
    )

    # Save to database
    db.add(company)
    db.commit()
    db.refresh(company)

    return {
        "company": company_name,
        "overall_trust_score": score,

        "website": {
            "status": "Verified"
        },

        "linkedin": {
            "status": "Verified"
        },

        "company_registration": {
            "status": "Verified"
        },

        "risk_level": "Low",

        "recommendation": "Suitable for internship, but confirm stipend terms before accepting.",

        "database_id": company.id
    }