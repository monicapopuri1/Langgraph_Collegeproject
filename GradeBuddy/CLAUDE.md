# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GradeBuddy is an AI-powered answer sheet grading tool for teachers. Teachers upload student answer sheet images, provide an answer key/rubric, and receive structured grades with per-question feedback and gap analysis. The AI backbone is Google Gemini (vision model for OCR + grading).

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
