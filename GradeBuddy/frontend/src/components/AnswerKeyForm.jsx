export default function AnswerKeyForm({
  subject,
  setSubject,
  answerKey,
  setAnswerKey,
  totalMarks,
  setTotalMarks,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Biology, Mathematics, History"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Total Marks
        </label>
        <input
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          min="1"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Answer Key / Rubric
        </label>
        <textarea
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
          rows={8}
          placeholder={`Paste the answer key or rubric here, e.g.:\n\n1. Photosynthesis is the process by which plants convert light energy into chemical energy (2 marks)\n2. Mitochondria is the powerhouse of the cell (2 marks)\n3. ...`}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>
    </div>
  )
}
