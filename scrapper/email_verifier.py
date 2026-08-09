"""
email_verifier.py

Checks whether the recruiter email is valid,
uses a public email provider, and matches
the company website.
"""

from urllib.parse import urlparse


# List of public email providers
PUBLIC_EMAIL_PROVIDERS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "proton.me",
    "protonmail.com"
]


def extract_domain_from_url(url):
    """
    Extract company domain from website URL.

    Example:
    https://www.infosys.com -> infosys.com
    """

    parsed = urlparse(url)
    hostname = parsed.hostname

    # Prevent NoneType error
    if hostname is None:
        return ""

    if hostname.startswith("www."):
        hostname = hostname[4:]

    return hostname.lower()


def check_email(email, website):
    """
    Verify recruiter email.

    Returns:
        dict
    """

    try:

        # Extract email domain
        email_domain = email.split("@")[1].lower()

        # Extract website domain
        website_domain = extract_domain_from_url(website).lower()

        # Check if public email
        is_public_email = email_domain in PUBLIC_EMAIL_PROVIDERS

        # Check domain match
        email_match = email_domain == website_domain

        # Decide risk
        if is_public_email:
            risk = "High"

        elif email_match:
            risk = "Low"

        else:
            risk = "Medium"

        return {
            "email": email,
            "email_domain": email_domain,
            "website_domain": website_domain,
            "email_match": email_match,
            "is_public_email": is_public_email,
            "risk": risk
        }

    except Exception as e:

        return {
            "email": email,
            "error": str(e),
            "risk": "Unknown"
        }


if __name__ == "__main__":

    website = input("Enter Website : ")

    email = input("Enter Recruiter Email : ")

    result = check_email(email, website)

    print("\nEmail Verification Report")
    print("----------------------------")

    for key, value in result.items():
        print(f"{key}: {value}")