import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          GradeBuddy
        </Link>
        <nav className="flex gap-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              location.pathname === '/'
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/grade"
            className={`text-sm font-medium ${
              location.pathname === '/grade'
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Grade
          </Link>
        </nav>
      </div>
    </header>
  )
}
