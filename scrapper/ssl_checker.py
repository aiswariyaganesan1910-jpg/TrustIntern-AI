"""
ssl_checker.py

Checks whether a website has a valid SSL certificate.
"""

import ssl
import socket
from urllib.parse import urlparse


def check_ssl(url):
    try:
        parsed_url = urlparse(url)

        hostname = parsed_url.hostname

        context = ssl.create_default_context()

        with socket.create_connection((hostname, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname):
                return {
                    "website": url,
                    "https": True,
                    "ssl_valid": True,
                    "risk": "Low"
                }

    except Exception as e:
        return {
            "website": url,
            "https": False,
            "ssl_valid": False,
            "risk": "High",
            "error": str(e)
        }


if __name__ == "__main__":
    website = input("Enter Website: ")

    result = check_ssl(website)

    print("\nSSL Report")
    print("---------------------")

    for key, value in result.items():
        print(f"{key}: {value}")