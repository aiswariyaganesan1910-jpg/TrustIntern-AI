def calculate_safety_score(
    website_verified: bool,
    linkedin_verified: bool,
    registration_verified: bool
):
    score = 0

    if website_verified:
        score += 30

    if linkedin_verified:
        score += 30

    if registration_verified:
        score += 40

    return score