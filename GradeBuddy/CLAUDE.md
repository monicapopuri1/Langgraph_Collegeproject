# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GradeBuddy is an AI-powered answer sheet grading tool for teachers. Teachers upload student answer sheet images, provide an answer key/rubric, and receive structured grades with per-question feedback and gap analysis. The AI backbone is Google Gemini (vision model for OCR + grading).

QUESTION 1: WHAT IS THIS?
GradeBuddy is an AI-powered answer sheet grading tool for teachers. Teachers upload student answer sheet images, provide an answer key/rubric, and receive structured grades with per-question feedback and gap analysis. The AI backbone is Google Gemini (vision model for OCR + grading).

Task is:
1. Allow teachers to login with gmail account. 
2. Teachers can upload the answer key and rubric. 
3. Teachers can upload multiple answer sheet images.
4. GradeBuddy allows to select the images and perform correction of answers in the sheet.
5. The output should respond with the grades as per instructions provided by teacher. 
6. Teacher should be able to see a dashboard with different classes and sections. 
7. Students are part of class and sections. 
##8. When teacher uplaods a answer sheet of a student, the files go and store in side the class and section folder structure. and also in UI they are visible under class and sections under the class. 
##9. teacher should be able  
QUESTION 2: HOW DO I RUN THIS?
1. Run it like a web application with a UI to take 


QUESTION 3: WHAT PATTERNS DO I FOLLOW?

Important: follow these patterns:
- Do not summarize or shorten any answers. 
- DO not score or verify any answer sheets if the rubric is not uploaded for it by teacher. 
- Support JPEG format of the images


RULE :
2. Ask me if you have any doubts

## Architecture

- **Backend** (`backend/`): Python Flask REST API. Entry point is `app.py` (runs on port 5000). Routes are registered as Flask Blueprints from `routes/`. The Gemini AI integration lives in `services/gemini_service.py` — it uploads the image to Gemini, sends a structured prompt, and parses the JSON response.
- **Frontend** (`frontend/`): React app scaffolded with Vite, styled with Tailwind CSS. Proxies `/api` requests to the Flask backend during development.

## Development Commands

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # then add your GEMINI_API_KEY
python app.py          # starts Flask dev server on :5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # starts Vite dev server (proxies /api to :5000)
```

Both servers must be running simultaneously for the full workflow.

## Key API Endpoint

**POST `/api/grade`** (multipart/form-data) — accepts `image` (file), `subject`, `answer_key`, `total_marks`. Returns JSON with `total_score`, `percentage`, `grade`, per-question breakdown (`questions[]`), `gaps[]`, and `suggestions[]`.

## Environment

The backend requires a `GEMINI_API_KEY` environment variable (set in `backend/.env`). See `backend/.env.example`.

## Important Patterns

- Uploaded images are saved temporarily to `backend/uploads/`, then deleted in a `finally` block after grading completes.
- The Gemini service strips markdown code fences from the model response before JSON parsing — if changing the prompt or model, ensure this cleanup logic still works.
- Backend uses bare module imports (e.g., `from config import ...`), so always run Flask from inside the `backend/` directory.
