import { useState } from 'react'
import axios from 'axios'
import { saveResult } from '../utils/storage'
import UploadForm from '../components/UploadForm'
import AnswerKeyForm from '../components/AnswerKeyForm'
import GradingResult from '../components/GradingResult'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Grade() {
  const [file, setFile] = useState(null)
  const [subject, setSubject] = useState('')
  const [answerKey, setAnswerKey] = useState('')
  const [totalMarks, setTotalMarks] = useState('100')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!file) {
      setError('Please upload an answer sheet image.')
      return
    }
    if (!answerKey.trim()) {
      setError('Please provide the answer key / rubric.')
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('subject', subject || 'General')
    formData.append('answer_key', answerKey)
    formData.append('total_marks', totalMarks)

    setLoading(true)
    try {
      const res = await axios.post('/api/grade', formData)
      setResult(res.data)
      saveResult(subject || 'General', res.data)
    } catch (err) {
      const msg =
        err.response?.data?.error || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Grade an Answer Sheet
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <UploadForm file={file} setFile={setFile} />
        <AnswerKeyForm
          subject={subject}
          setSubject={setSubject}
          answerKey={answerKey}
          setAnswerKey={setAnswerKey}
          totalMarks={totalMarks}
          setTotalMarks={setTotalMarks}
        />

        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Grading...' : 'Grade Answer Sheet'}
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {result && (
        <div className="mt-8">
          <GradingResult result={result} />
        </div>
      )}
    </main>
  )
}
