# output_formatter.py

def calculate_overall_risk(whois_result, ssl_result, email_result, review_result):
    score = 0

    risks = [
        whois_result.get("risk"),
        ssl_result.get("risk"),
        email_result.get("risk"),
        review_result.get("risk")
    ]

    for r in risks:
        if r == "High":
            score += 3
        elif r == "Medium":
            score += 1
        elif r == "Unknown":
            score += 2

    if score <= 2:
        overall = "Low"
    elif score <= 5:
        overall = "Medium"
    else:
        overall = "High"

    return overall


def format_scraper_output(whois_result, ssl_result, email_result, review_result):
    overall_risk = calculate_overall_risk(
        whois_result,
        ssl_result,
        email_result,
        review_result
    )

    return {
        "domain_check": whois_result,
        "ssl_check": ssl_result,
        "email_check": email_result,
        "review_check": review_result,
        "overall_risk": overall_risk
    }