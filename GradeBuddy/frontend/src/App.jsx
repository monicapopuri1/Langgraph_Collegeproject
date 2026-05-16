import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Grade from './pages/Grade'
import Dashboard from './pages/Dashboard'
import DashboardDetail from './pages/DashboardDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grade" element={<Grade />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<DashboardDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
