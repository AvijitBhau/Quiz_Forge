import { useNavigate } from 'react-router-dom'
import { Clock, ExternalLink } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import { DifficultyBadge, SubjectBadge } from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import { formatDate, formatTime } from '../lib/quizUtils.js'

function getScoreColor(score) {
  if (score >= 80) return '#34d399'
  if (score >= 60) return '#a78bfa'
  return '#fb923c'
}

export default function QuizHistory() {
  const navigate = useNavigate()
  const { attempts } = useQuiz()

  const sorted = [...attempts].sort(
    (a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
          Quiz History
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
          {sorted.length} attempt{sorted.length !== 1 ? 's' : ''} on record
        </p>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No attempts yet"
          description="Complete a quiz to see your history here."
          action={
            <Button onClick={() => navigate('/create')}>Create a Quiz</Button>
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div
            className="hidden md:block rounded-xl border overflow-hidden"
            style={{ background: '#0b1124', borderColor: '#1a2540' }}
          >
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid #1a2540',
                    background: '#111827',
                  }}
                >
                  {['Quiz', 'Subject', 'Difficulty', 'Score', 'Correct', 'Time', 'Date', ''].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: '#475569' }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {sorted.map((attempt, i) => (
                  <tr
                    key={attempt.id}
                    style={{
                      borderBottom:
                        i < sorted.length - 1 ? '1px solid #1a2540' : 'none',
                    }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-medium"
                        style={{ color: '#e2e8f0' }}
                      >
                        {attempt.quizTitle}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <SubjectBadge subject={attempt.subject} />
                    </td>
                    <td className="px-4 py-3">
                      <DifficultyBadge difficulty={attempt.difficulty} />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-bold"
                        style={{ color: getScoreColor(attempt.score) }}
                      >
                        {attempt.score}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#94a3b8' }}>
                        {attempt.correctCount}/{attempt.totalCount}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#94a3b8' }}>
                        {formatTime(attempt.timeTaken)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: '#64748b' }}>
                        {formatDate(attempt.attemptedAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/results/${attempt.id}`)}
                        className="flex items-center gap-1 text-xs font-medium hover:text-violet-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                        style={{ color: '#8b5cf6' }}
                      >
                        <ExternalLink size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {sorted.map((attempt) => (
              <div
                key={attempt.id}
                className="rounded-xl border p-4 space-y-3"
                style={{ background: '#0b1124', borderColor: '#1a2540' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: '#e2e8f0' }}
                  >
                    {attempt.quizTitle}
                  </p>
                  <span
                    className="text-xl font-bold shrink-0"
                    style={{ color: getScoreColor(attempt.score) }}
                  >
                    {attempt.score}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <SubjectBadge subject={attempt.subject} />
                  <DifficultyBadge difficulty={attempt.difficulty} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs" style={{ color: '#64748b' }}>
                    <span>{attempt.correctCount}/{attempt.totalCount} correct</span>
                    <span>{formatTime(attempt.timeTaken)}</span>
                    <span>{formatDate(attempt.attemptedAt)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/results/${attempt.id}`)}
                  >
                    <ExternalLink size={12} />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
