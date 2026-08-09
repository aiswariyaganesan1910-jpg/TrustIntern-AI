from whois_checker import check_domain
from ssl_checker import check_ssl
from email_verifier import check_email
from review_scrapper import search_company_reviews
from output_formatter import format_scraper_output


from utils import normalize_url

# Dynamic input
website = normalize_url(input("Enter website: ").strip())
domain = input("Enter domain: ").strip()
email = input("Enter recruiter email: ").strip()
company = input("Enter company name: ").strip()

# Run all checks
whois_result = check_domain(domain)
ssl_result = check_ssl(website)
email_result = check_email(email, website)
review_result = search_company_reviews(company)

# Combine results
final_result = format_scraper_output(
    whois_result,
    ssl_result,
    email_result,
    review_result
)

from pprint import pprint
pprint(final_result)