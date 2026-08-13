# import re
# from typing import List

# # Mapping flexible regex patterns to clean, human-readable red flag explanations
# RED_FLAG_PATTERNS = [
#     (
#         r"\b(security deposit|refundable.*deposit|laptop.*deposit)\b",
#         "Requests a security, laptop, or refundable deposit"
#     ),
#     (
#         r"\b(training fee|registration fee|processing fee|application fee|pay to secure)\b",
#         "Demands upfront training, registration, or application fees"
#     ),
#     (
#         r"\b(pay via upi|via upi|wire transfer|bank transfer)\b",
#         "Asks for payment via unverified channels (UPI / Wire Transfer)"
#     ),
#     (
#         r"\b(no interview|without interview|direct selection|instant hiring)\b",
#         "Promises direct selection or hiring without a formal interview"
#     ),
#     (
#         r"\b(telegram only|whatsapp only|contact via telegram)\b",
#         "Uses unverified communication platforms (Telegram/WhatsApp only)"
#     ),
#     (
#         r"\b(earn up to|typing from home|form filling)\b",
#         "Uses suspicious high-earning promises for low-skill tasks"
#     )
# ]


# def clean_text(text: str) -> str:
#     """
#     Cleans raw job description text so the machine learning model can process it easily.
#     """
#     if not text or not isinstance(text, str):
#         return ""
    
#     # 1. Convert to lowercase
#     text = text.lower()
    
#     # 2. Remove website links (HTTP/HTTPS/WWW)
#     text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
#     # 3. Remove numbers and special characters, keep only letters and spaces
#     text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
#     # 4. Remove extra spaces
#     text = re.sub(r'\s+', ' ', text).strip()
    
#     return text


# def extract_red_flags(raw_text: str) -> List[str]:
#     """
#     Scans the original offer text for specific scam phrases.
#     Returns a list of human-readable red flag explanations.
#     """
#     if not raw_text or not isinstance(raw_text, str):
#         return []
        
#     found_flags = []
#     text_lower = raw_text.lower()
    
#     for pattern, explanation in RED_FLAG_PATTERNS:
#         if re.search(pattern, text_lower):
#             found_flags.append(explanation)
            
#     return found_flags
import re
from typing import List

# Mapping flexible regex patterns to clean, human-readable red flag explanations
RED_FLAG_PATTERNS = [
    (
        r"\b(security deposit|refundable.*deposit|laptop.*deposit)\b",
        "Requests a security, laptop, or refundable deposit"
    ),
    (
        r"\b(training fee|registration fee|processing fee|application fee|pay to secure)\b",
        "Demands upfront training, registration, or application fees"
    ),
    (
        r"\b(pay via upi|via upi|wire transfer|bank transfer)\b",
        "Asks for payment via unverified channels (UPI / Wire Transfer)"
    ),
    (
        r"\b(no interview|without interview|direct selection|instant hiring)\b",
        "Promises direct selection or hiring without a formal interview"
    ),
    (
        r"\b(telegram only|whatsapp only|contact via telegram)\b",
        "Uses unverified communication platforms (Telegram/WhatsApp only)"
    ),
    (
        r"\b(earn up to|typing from home|form filling)\b",
        "Uses suspicious high-earning promises for low-skill tasks"
    )
]


def clean_text(text: str) -> str:
    """
    Cleans raw job/internship text so the ML model can vectorize it efficiently.
    """
    if not text or not isinstance(text, str):
        return ""
    
    # 1. Convert to lowercase
    text = text.lower()
    
    # 2. Remove website links (HTTP/HTTPS/WWW)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
    # 3. Remove numbers and special characters, keep only letters and spaces
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
    # 4. Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text


def extract_red_flags(raw_text: str) -> List[str]:
    """
    Scans offer text for explicit text-based scam phrases using regex.
    """
    if not raw_text or not isinstance(raw_text, str):
        return []
        
    found_flags = []
    text_lower = raw_text.lower()
    
    for pattern, explanation in RED_FLAG_PATTERNS:
        if re.search(pattern, text_lower):
            found_flags.append(explanation)
            
    return found_flags