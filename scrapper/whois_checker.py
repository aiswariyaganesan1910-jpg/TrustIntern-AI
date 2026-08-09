"""
whois_checker.py

Checks domain information using WHOIS and returns
domain age, registrar details, and risk level.
"""

import whois
from datetime import datetime
from config import MIN_SAFE_DOMAIN_AGE


def check_domain(domain):
    """
    Check domain information using WHOIS.

    Args:
        domain (str): Website domain (example: google.com)

    Returns:
        dict: Domain information
    """

    try:
        # Fetch WHOIS information
        domain_info = whois.whois(domain)

        # Get creation date
        creation_date = domain_info.creation_date

        # Some WHOIS servers return a list of dates
        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        # Calculate domain age
        if creation_date:
            today = datetime.now(creation_date.tzinfo)
            domain_age_days = (today - creation_date).days
        else:
            domain_age_days = None

        # Risk calculation
        if domain_age_days is None:
            risk = "Unknown"
        elif domain_age_days < MIN_SAFE_DOMAIN_AGE:
            risk = "High"
        else:
            risk = "Low"
        # Get expiry date
        expiry_date = domain_info.expiration_date

# Some WHOIS servers return a list of dates
        if isinstance(expiry_date, list):
            expiry_date = expiry_date[0]

        # Return structured JSON
        return {
            "domain": domain,
            "registrar": domain_info.registrar,
            "creation_date": str(creation_date),
            "expiry_date": str(expiry_date),
            "domain_age_days": domain_age_days,
            "risk": risk
        }

    except Exception as e:
        return {
            "domain": domain,
            "error": str(e),
            "risk": "Unknown"
        }


# For testing
if __name__ == "__main__":
    website = input("Enter domain (example: google.com): ")
    result = check_domain(website)

    print("\nWHOIS Report")
    print("-------------------------")
    for key, value in result.items():
        print(f"{key}: {value}")