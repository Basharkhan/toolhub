import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AgeCalculatorPage from './pages/AgeCalculatorPage'
import HomePage from './pages/HomePage'
import WordCounterPage from './pages/WordCounterPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age-calculator" element={<AgeCalculatorPage />} />
        <Route path="/word-counter" element={<WordCounterPage />} />
      </Routes>
    </Layout>
  )
}

export default App
