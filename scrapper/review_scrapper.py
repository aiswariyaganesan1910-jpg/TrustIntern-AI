# review_scrapper.py

from ddgs import DDGS

# Official warning pages or awareness content (do NOT count as scam reports)
IGNORE_PHRASES = [
    "fraud alert",
    "recruitment fraud alert",
    "watch for fake job offers",
    "does not charge",
    "warning users",
    "be aware of scams",
    "stay alert",
    "how to spot",
    "how to avoid",
    "protect yourself",
    "awareness"
]

# Real negative accusation phrases
NEGATIVE_PHRASES = [
    "is a scam",
    "fake internship",
    "fraud complaint",
    "scam report",
    "scammed me",
    "cheated",
    "fraud by",
    "complaint against",
    "fake company",
    "job scam",
    "fraudulent internship",
    "fake job offer"
]


def search_company_reviews(company_name):
    """
    Search for scam reports and reviews related to a company.
    Counts only company-specific negative mentions.
    """

    query = f"{company_name} scam OR fake internship OR fraud OR review"

    results_list = []
    scam_mentions = 0

    company_lower = company_name.lower()

    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=5))

            for result in results:

                title = result.get("title", "")
                url = result.get("href", "")
                snippet = result.get("body", "")

                text = f"{title} {snippet}".lower()

                # Ignore official warning or awareness pages
                if any(phrase in text for phrase in IGNORE_PHRASES):
                    pass

                # Count only if company name AND negative phrase are present
                elif (company_lower in text and
                      any(phrase in text for phrase in NEGATIVE_PHRASES)):
                    scam_mentions += 1

                results_list.append({
                    "title": title,
                    "url": url,
                    "snippet": snippet
                })

        # Risk decision
        if scam_mentions == 0:
            risk = "Low"
        elif scam_mentions <= 2:
            risk = "Medium"
        else:
            risk = "High"

        return {
            "company": company_name,
            "scam_mentions": scam_mentions,
            "results_found": len(results_list),
            "results": results_list,
            "risk": risk
        }

    except Exception as e:
        return {
            "company": company_name,
            "error": str(e),
            "risk": "Unknown"
        }


if __name__ == "__main__":

    company = input("Enter Company Name: ")

    result = search_company_reviews(company)

    print("\nReview Search Report")
    print("-------------------------")

    print(f"Company: {result.get('company')}")
    print(f"Scam Mentions: {result.get('scam_mentions')}")
    print(f"Results Found: {result.get('results_found')}")
    print(f"Risk: {result.get('risk')}\n")

    for i, item in enumerate(result.get("results", []), start=1):
        print(f"[{i}] {item['title']}")
        print(f"URL: {item['url']}")
        print(f"Snippet: {item['snippet']}\n")