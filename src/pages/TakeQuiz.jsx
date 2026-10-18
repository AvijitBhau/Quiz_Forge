import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Clock, CheckSquare } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import { scoreAttempt, generateAttemptId, formatTime } from '../lib/quizUtils.js'
import { DifficultyBadge, SubjectBadge } from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'

export default function TakeQuiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getQuizById, addAttempt } = useQuiz()
  const quiz = getQuizById(id)

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ?? null)
  const [showConfirm, setShowConfirm] = useState(false)
  const startTimeRef = useRef(Date.now())
  const submittedRef = useRef(false)

  const handleSubmit = useCallback(() => {
    if (!quiz || submittedRef.current) return
    submittedRef.current = true
    const { correctCount, totalCount, score } = scoreAttempt(quiz.questions, answers)
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const attempt = {
      id: generateAttemptId(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      subject: quiz.subject,
      difficulty: quiz.difficulty,
      score,
      correctCount,
      totalCount,
      timeTaken,
      attemptedAt: new Date().toISOString(),
      answers,
      questions: quiz.questions,
    }
    addAttempt(attempt)
    navigate(`/results/${attempt.id}`)
  }, [quiz, answers, addAttempt, navigate])

  // Timer countdown
  useEffect(() => {
    if (!quiz?.timerEnabled || timeLeft === null) return
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timerId)
  }, [timeLeft, quiz?.timerEnabled, handleSubmit])

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>
          Quiz not found.
        </p>
        <p className="text-sm mb-6" style={{ color: '#64748b' }}>
          This quiz may have been deleted or the link is invalid.
        </p>
        <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    )
  }

  const q = quiz.questions[current]
  const total = quiz.questions.length
  const answered = Object.keys(answers).length
  const progress = ((current + 1) / total) * 100

  function selectAnswer(questionId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function goTo(idx) {
    setCurrent(Math.max(0, Math.min(total - 1, idx)))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz header */}
      <div
        className="rounded-xl border p-5"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#f1f5f9' }}>
              {quiz.title}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <SubjectBadge subject={quiz.subject} />
              <DifficultyBadge difficulty={quiz.difficulty} />
            </div>
          </div>
          {quiz.timerEnabled && timeLeft !== null && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-mono font-semibold shrink-0 ${
                timeLeft < 60
                  ? 'text-red-400 border-red-500/30 bg-red-500/10'
                  : 'text-violet-300 border-violet-500/30 bg-violet-500/10'
              }`}
            >
              <Clock size={14} />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Progress */}
        <div
          className="flex items-center justify-between text-xs mb-2"
          style={{ color: '#64748b' }}
        >
          <span>
            Question {current + 1} of {total}
          </span>
          <span>{answered} answered</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: '#1a2540' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className="rounded-xl border p-6 space-y-5"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        <p className="text-base font-semibold leading-relaxed" style={{ color: '#f1f5f9' }}>
          <span className="text-sm font-normal mr-2" style={{ color: '#475569' }}>
            Q{current + 1}.
          </span>
          {q.text}
        </p>

        <div className="space-y-3" role="radiogroup" aria-label="Answer options">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i
            return (
              <button
                key={i}
                onClick={() => selectAnswer(q.id, i)}
                role="radio"
                aria-checked={selected}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  selected
                    ? 'border-violet-500/60 bg-violet-500/10'
                    : 'border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-violet-500/5'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    selected ? 'border-violet-500 bg-violet-500' : 'border-slate-600'
                  }`}
                  style={{ color: selected ? '#fff' : '#64748b' }}
                >
                  {selected ? '✓' : String.fromCharCode(65 + i)}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: selected ? '#e2e8f0' : '#94a3b8' }}
                >
                  {opt}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        {/* Question navigator (desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-center">
          {quiz.questions.map((qItem, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to question ${i + 1}`}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                i === current
                  ? 'bg-violet-600 text-white'
                  : answers[qItem.id] !== undefined
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-white/5 text-slate-500 border border-white/10 hover:border-violet-500/30'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < total - 1 ? (
          <Button onClick={() => goTo(current + 1)}>
            Next <ChevronRight size={16} />
          </Button>
        ) : (
          <Button onClick={() => setShowConfirm(true)}>
            <CheckSquare size={16} />
            Submit Quiz
          </Button>
        )}
      </div>

      {/* Submit confirmation */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Submit Quiz?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Continue reviewing
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm" style={{ color: '#94a3b8' }}>
            You have answered{' '}
            <span className="font-semibold" style={{ color: '#e2e8f0' }}>
              {answered} of {total}
            </span>{' '}
            questions.
          </p>
          {answered < total && (
            <div
              className="px-3 py-2.5 rounded-lg border"
              style={{
                background: 'rgba(251,191,36,0.08)',
                borderColor: 'rgba(251,191,36,0.2)',
              }}
            >
              <p className="text-xs text-amber-400">
                {total - answered} question{total - answered > 1 ? 's' : ''} unanswered —
                they will be marked incorrect.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
