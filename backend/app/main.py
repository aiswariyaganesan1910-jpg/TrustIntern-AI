from fastapi import FastAPI
from app.api.verify import router as verify_router
from app.db.database import engine, Base
from app.db import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(verify_router)


@app.get("/")
def home():
    return {"message": "Backend is running"}