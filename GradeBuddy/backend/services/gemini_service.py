import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)


def grade_answer_sheet(image_path, subject, answer_key, total_marks):
    """Send answer sheet image to Gemini for OCR + grading."""
    model = genai.GenerativeModel("gemini-2.0-flash")

    uploaded_file = genai.upload_file(image_path)

    prompt = f"""You are an expert teacher grading a student's answer sheet.

Subject: {subject}
Total Marks: {total_marks}

Answer Key / Rubric:
{answer_key}

Instructions:
1. Look at the uploaded answer sheet image carefully.
2. Extract each question and the student's handwritten/typed answer using OCR.
3. Compare each answer against the provided answer key/rubric.
4. Award marks for each question based on correctness and completeness.
5. Identify knowledge gaps and provide improvement suggestions.

Return your response as valid JSON with exactly this structure (no markdown, no code fences):
{{
  "total_score": <number>,
  "total_marks": {total_marks},
  "percentage": <number>,
  "grade": "<letter grade A/B/C/D/F>",
  "questions": [
    {{
      "question_number": <number>,
      "student_answer": "<what the student wrote>",
      "expected_answer": "<correct answer from key>",
      "score": <number>,
      "max_score": <number>,
      "feedback": "<specific feedback>"
    }}
  ],
  "gaps": [
    "<identified weakness or knowledge gap>"
  ],
  "suggestions": [
    "<actionable improvement suggestion>"
  ]
}}

Grade fairly but thoroughly. Provide specific, helpful feedback for each question.
Return ONLY the JSON object, no other text."""

    response = model.generate_content([prompt, uploaded_file])

    text = response.text.strip()
    # Strip markdown code fences if present
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
    if text.endswith("```"):
        text = text.rsplit("```", 1)[0]
    if text.startswith("json"):
        text = text[4:]
    text = text.strip()

    result = json.loads(text)
    return result
