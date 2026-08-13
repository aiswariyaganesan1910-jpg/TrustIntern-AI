from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base


class CompanyVerification(Base):
    __tablename__ = "company_verifications"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String(200), nullable=False)
    website = Column(String(500), nullable=False)
    email = Column(String(200), nullable=False)
    contact_number = Column(String(20), nullable=False)

    description = Column(Text, nullable=True)

    trust_score = Column(Integer, nullable=True)
    risk_level = Column(String(50), nullable=True)
    recommendation = Column(Text, nullable=True)
    reviews = Column(Text, nullable=True)
achievements = Column(Text, nullable=True)
projects = Column(Text, nullable=True)
team_members = Column(Text, nullable=True)
duplicate_content = Column(Text, nullable=True)