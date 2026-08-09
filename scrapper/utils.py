# utils.py

from urllib.parse import urlparse


def clean_company_name(name):
    """Remove extra spaces from company name."""
    return " ".join(name.strip().split())


def extract_domain(url):
    """Extract domain from URL."""

    parsed = urlparse(url)
    hostname = parsed.hostname or ""

    if hostname.startswith("www."):
        hostname = hostname[4:]

    return hostname.lower()


def normalize_url(url):
    """Ensure URL has http/https."""

    if not url.startswith(("http://", "https://")):
        return "https://" + url

    return url