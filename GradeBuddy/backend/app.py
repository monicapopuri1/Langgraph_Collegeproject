from flask import Flask
from flask_cors import CORS
from config import MAX_CONTENT_LENGTH
from routes.grading import grading_bp

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH
CORS(app)

app.register_blueprint(grading_bp)


@app.route("/api/health", methods=["GET"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True, port=5001)
