import os
import sys
import joblib

# Auto-resolve search paths for flexible execution
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))  # AI_model/src
AI_MODEL_DIR = os.path.dirname(CURRENT_DIR)               # AI_model
PROJECT_ROOT = os.path.dirname(AI_MODEL_DIR)             # TrustIntern-AI

for path in [CURRENT_DIR, AI_MODEL_DIR, PROJECT_ROOT]:
    if path not in sys.path:
        sys.path.insert(0, path)

# Import preprocessing helpers
try:
    from src.preprocess import clean_text, extract_red_flags
except ModuleNotFoundError:
    from preprocess import clean_text, extract_red_flags

# Path to saved model artifact
MODEL_PATH = os.path.join(AI_MODEL_DIR, "models", "scam_detector.pkl")

# Load model and vectorizer
try:
    artifact = joblib.load(MODEL_PATH)
    vectorizer = artifact["vectorizer"]
    model = artifact["model"]
except Exception as e:
    vectorizer = None
    model = None


def predict_scam(raw_text: str) -> dict:
    """
    Analyzes raw text using hybrid NLP (XGBoost ML model + Regex Rule engine).
    Returns score and red flag indicators formatted for Member 2.
    """
    if vectorizer is None or model is None:
        raise RuntimeError("Model artifact not loaded. Check model file path.")

    cleaned = clean_text(raw_text)
    vectorized_text = vectorizer.transform([cleaned])

    # 1. Base ML Probability (0.0 to 1.0)
    ml_scam_prob = float(model.predict_proba(vectorized_text)[0][1])
    
    # 2. Extract Text Red Flags
    red_flags = extract_red_flags(raw_text)
    num_flags = len(red_flags)

    # 3. Hybrid Score Boosting
    if num_flags >= 2:
        final_score = max(ml_scam_prob * 100, 85.0)  # High risk for multiple flags
    elif num_flags == 1:
        final_score = max(ml_scam_prob * 100, 65.0)  # Medium-high risk for single flag
    else:
        final_score = ml_scam_prob * 100             # Pure ML probability

    final_score = round(min(final_score, 99.9), 2)

    # 4. Determine Text Risk Level
    if final_score >= 70.0:
        risk_level = "High"
    elif final_score >= 40.0:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "is_scam": final_score >= 50.0,
        "nlp_score": final_score,
        "scam_score": final_score,  # Retained for compatibility
        "risk_level": risk_level,
        "text_red_flags": red_flags,
        "red_flags": red_flags      # Retained for compatibility
    }


if __name__ == "__main__":
    test_text = "Selected candidates must pay a refundable training fee of 1500 via UPI."
    print("\n--- Test Prediction Output ---")
    print(predict_scam(test_text))