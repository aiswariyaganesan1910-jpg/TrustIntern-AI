from fastapi import FastAPI
from pydantic import BaseModel

from whois_checker import check_domain
from ssl_checker import check_ssl
from email_verifier import check_email
from review_scrapper import search_company_reviews
from output_formatter import format_scraper_output
from utils import normalize_url

app = FastAPI()


class ScrapeRequest(BaseModel):
    website: str
    domain: str
    email: str
    company: str


@app.post("/api/verify")
def verify(req: ScrapeRequest):
    
    website = normalize_url(req.website)

    whois_result = check_domain(req.domain)
    ssl_result = check_ssl(website)
    email_result = check_email(req.email, website)
    review_result = search_company_reviews(req.company)

    return format_scraper_output(
        whois_result,
        ssl_result,
        email_result,
        review_result
    )