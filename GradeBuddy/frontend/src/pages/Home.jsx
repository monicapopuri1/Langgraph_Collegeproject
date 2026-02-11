import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
        Grade Smarter with <span className="text-indigo-600">AI</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Upload a student's answer sheet, provide the answer key, and let AI
        handle the grading. Get per-question scores, gap analysis, and
        improvement suggestions in seconds.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/grade"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Grading
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Upload Image</h3>
          <p className="text-sm text-gray-600">
            Simply drag & drop or upload a photo of the student's answer sheet.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">AI Grading</h3>
          <p className="text-sm text-gray-600">
            Gemini AI reads the handwriting, compares against your rubric, and
            scores each question.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Gap Analysis</h3>
          <p className="text-sm text-gray-600">
            Get detailed feedback on knowledge gaps and actionable suggestions
            for improvement.
          </p>
        </div>
      </div>
    </main>
  )
}
