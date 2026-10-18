import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext.jsx'
import AppShell from './components/layout/AppShell.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateQuiz from './pages/CreateQuiz.jsx'
import TakeQuiz from './pages/TakeQuiz.jsx'
import Results from './pages/Results.jsx'
import MyQuizzes from './pages/MyQuizzes.jsx'
import QuizHistory from './pages/QuizHistory.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateQuiz />} />
            <Route path="/quiz/:id" element={<TakeQuiz />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/quizzes" element={<MyQuizzes />} />
            <Route path="/history" element={<QuizHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  )
}
