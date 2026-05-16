import gradeColor from '../utils/gradeColor'

export default function GradingResult({ result }) {
  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div
        className={`rounded-xl border-2 p-6 text-center ${gradeColor(result.grade)}`}
      >
        <p className="text-4xl font-bold">
          {result.total_score} / {result.total_marks}
        </p>
        <p className="text-lg mt-1">{result.percentage}%</p>
        <span className="inline-block mt-2 text-3xl font-extrabold">
          Grade: {result.grade}
        </span>
      </div>

      {/* Per-Question Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Question-by-Question Breakdown
        </h3>
        <div className="space-y-3">
          {result.questions.map((q) => (
            <div
              key={q.question_number}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">
                  Question {q.question_number}
                </span>
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded ${
                    q.score === q.max_score
                      ? 'bg-green-100 text-green-700'
                      : q.score > 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {q.score} / {q.max_score}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Student Answer
                  </p>
                  <p className="text-gray-700">{q.student_answer}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Expected Answer
                  </p>
                  <p className="text-gray-700">{q.expected_answer}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-indigo-700 bg-indigo-50 rounded px-2 py-1">
                {q.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps */}
      {result.gaps && result.gaps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Knowledge Gaps Identified
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-red-50 rounded-lg p-4 border border-red-200">
            {result.gaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Suggestions for Improvement
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-blue-50 rounded-lg p-4 border border-blue-200">
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
