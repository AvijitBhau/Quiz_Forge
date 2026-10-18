import { useParams, useNavigate } from 'react-router-dom'
import { Home, RotateCcw, PlusCircle, CheckCircle, XCircle } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import { getScoreFeedback, formatTime, getScoreStrokeColor } from '../lib/quizUtils.js'
import { DifficultyBadge, SubjectBadge } from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAttemptById, getQuizById } = useQuiz()

  const attempt = getAttemptById(id)
  const quiz = attempt ? getQuizById(attempt.quizId) : null

  if (!attempt) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>
          Results not found.
        </p>
        <p className="text-sm mb-6" style={{ color: '#64748b' }}>
          This attempt may no longer exist in local storage.
        </p>
        <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    )
  }

  const { label, message, color } = getScoreFeedback(attempt.score)
  const questions = attempt.questions ?? quiz?.questions ?? []

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score card */}
      <div
        className="rounded-xl border p-6 text-center"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
          <SubjectBadge subject={attempt.subject} />
          <DifficultyBadge difficulty={attempt.difficulty} />
        </div>
        <h1 className="text-xl font-bold mb-6" style={{ color: '#f1f5f9' }}>
          {attempt.quizTitle}
        </h1>

        {/* SVG circular score */}
        <div className="flex items-center justify-center mb-6">
          <ScoreCircle score={attempt.score} />
        </div>

        <p className={`text-2xl font-bold mb-1 ${color}`}>{label}</p>
        <p className="text-sm" style={{ color: '#64748b' }}>
          {message}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <StatItem
            label="Correct"
            value={`${attempt.correctCount}/${attempt.totalCount}`}
            color="#34d399"
          />
          <StatItem
            label="Incorrect"
            value={`${attempt.totalCount - attempt.correctCount}/${attempt.totalCount}`}
            color="#f87171"
          />
          <StatItem
            label="Time Taken"
            value={formatTime(attempt.timeTaken)}
            color="#8b5cf6"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="secondary" onClick={() => navigate('/')}>
          <Home size={15} />
          Dashboard
        </Button>
        {quiz && (
          <Button variant="secondary" onClick={() => navigate(`/quiz/${quiz.id}`)}>
            <RotateCcw size={15} />
            Retry Quiz
          </Button>
        )}
        <Button onClick={() => navigate('/create')}>
          <PlusCircle size={15} />
          New Quiz
        </Button>
      </div>

      {/* Question review */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: '#e2e8f0' }}>
          Question Review
        </h2>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = attempt.answers?.[q.id]
            const isCorrect = userAnswer === q.correctIndex
            return (
              <div
                key={q.id}
                className="rounded-xl border p-5"
                style={{
                  background: '#0b1124',
                  borderColor: isCorrect
                    ? 'rgba(52,211,153,0.2)'
                    : 'rgba(248,113,113,0.2)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle size={18} className="text-emerald-400" />
                    ) : (
                      <XCircle size={18} className="text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-relaxed mb-3"
                      style={{ color: '#e2e8f0' }}
                    >
                      <span
                        className="text-xs font-normal mr-2"
                        style={{ color: '#475569' }}
                      >
                        Q{idx + 1}.
                      </span>
                      {q.text}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, i) => {
                        const isUserChoice = userAnswer === i
                        const isCorrectOpt = q.correctIndex === i

                        let optStyle = { color: '#64748b', background: 'transparent' }
                        if (isCorrectOpt) {
                          optStyle = {
                            color: '#34d399',
                            background: 'rgba(52,211,153,0.08)',
                          }
                        }
                        if (isUserChoice && !isCorrect) {
                          optStyle = {
                            color: '#f87171',
                            background: 'rgba(248,113,113,0.08)',
                          }
                        }

                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                            style={optStyle}
                          >
                            <span className="font-semibold shrink-0">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isCorrectOpt && (
                              <span
                                className="ml-auto font-semibold shrink-0"
                                style={{ color: '#34d399' }}
                              >
                                Correct
                              </span>
                            )}
                            {isUserChoice && !isCorrect && (
                              <span
                                className="ml-auto font-semibold shrink-0"
                                style={{ color: '#f87171' }}
                              >
                                Your answer
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {q.explanation && (
                      <div
                        className="mt-3 px-3 py-2.5 rounded-lg text-xs leading-relaxed"
                        style={{
                          background: 'rgba(124,58,237,0.08)',
                          color: '#a78bfa',
                          borderLeft: '2px solid #7c3aed',
                        }}
                      >
                        <span className="font-semibold">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ScoreCircle({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const strokeColor = getScoreStrokeColor(score)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#1a2540"
          strokeWidth="8"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold" style={{ color: strokeColor }}>
          {score}%
        </p>
        <p className="text-xs" style={{ color: '#475569' }}>
          Score
        </p>
      </div>
    </div>
  )
}

function StatItem({ label, value, color }) {
  return (
    <div
      className="rounded-lg p-3 border text-center"
      style={{ background: '#111827', borderColor: '#1a2540' }}
    >
      <p className="text-lg font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
        {label}
      </p>
    </div>
  )
}
