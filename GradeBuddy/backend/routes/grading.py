import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from services.gemini_service import grade_answer_sheet

grading_bp = Blueprint("grading", __name__)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@grading_bp.route("/api/grade", methods=["POST"])
def grade():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Use PNG, JPG, JPEG, GIF, BMP, or WEBP."}), 400

    subject = request.form.get("subject", "General")
    answer_key = request.form.get("answer_key", "")
    total_marks = request.form.get("total_marks", "100")

    if not answer_key.strip():
        return jsonify({"error": "Answer key / rubric is required"}), 400

    try:
        total_marks = int(total_marks)
    except ValueError:
        return jsonify({"error": "Total marks must be a number"}), 400

    # Save the uploaded file
    filename = f"{uuid.uuid4()}_{secure_filename(file.filename)}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(filepath)

    try:
        result = grade_answer_sheet(filepath, subject, answer_key, total_marks)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"Grading failed: {str(e)}"}), 500
    finally:
        # Clean up uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)
