import { useNavigate } from 'react-router-dom'
import { PlusCircle, BookOpen, CheckCircle, TrendingUp, Flame } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import ActivityChart from '../components/dashboard/ActivityChart.jsx'
import RecentQuizCard from '../components/dashboard/RecentQuizCard.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { quizzes, attempts } = useQuiz()

  const completed = attempts.length
  const avgScore =
    completed > 0
      ? Math.round(attempts.reduce((a, b) => a + b.score, 0) / completed)
      : 0

  const recent = [...quizzes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const streak = 3 // mock streak

  return (
    <div className="space-y-8">
      {/* Hero heading */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
            Turn what you learn into what you know.
          </h1>
          <p className="mt-1.5 text-sm max-w-xl" style={{ color: '#64748b' }}>
            Generate AI-powered quizzes from any topic or study material. Track your
            progress, identify weak spots, and master subjects faster.
          </p>
        </div>
        <Button onClick={() => navigate('/create')} size="lg" className="shrink-0">
          <PlusCircle size={16} />
          Create a Quiz
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Quizzes Created"
          value={quizzes.length}
          trend="+2 this week"
          trendPositive
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={completed}
          trend={completed > 0 ? `${completed} total` : 'None yet'}
          trendPositive={completed > 0}
        />
        <StatCard
          icon={TrendingUp}
          label="Average Score"
          value={avgScore > 0 ? `${avgScore}%` : '—'}
          trend={avgScore >= 75 ? 'Above average' : avgScore > 0 ? 'Keep improving' : 'No attempts yet'}
          trendPositive={avgScore >= 75}
        />
        <StatCard
          icon={Flame}
          label="Study Streak"
          value={`${streak} days`}
          trend="Personal best!"
          trendPositive
        />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div
          className="rounded-xl border p-5 flex flex-col gap-4"
          style={{ background: '#0b1124', borderColor: '#1a2540' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
            Quick Actions
          </h3>
          <div className="space-y-2">
            <QuickAction
              label="Generate a new quiz"
              desc="From a topic or notes"
              onClick={() => navigate('/create')}
              accent="violet"
            />
            <QuickAction
              label="Review past attempts"
              desc="See where you went wrong"
              onClick={() => navigate('/history')}
              accent="cyan"
            />
            <QuickAction
              label="View your analytics"
              desc="Track long-term progress"
              onClick={() => navigate('/analytics')}
              accent="violet"
            />
          </div>
        </div>
      </div>

      {/* Recent Quizzes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>
            Recent Quizzes
          </h2>
          <button
            onClick={() => navigate('/quizzes')}
            className="text-xs font-medium transition-colors hover:text-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            style={{ color: '#8b5cf6' }}
          >
            View all
          </button>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No quizzes yet"
            description="Create your first AI-powered quiz to get started."
            action={
              <Button onClick={() => navigate('/create')}>
                <PlusCircle size={15} /> Create a Quiz
              </Button>
            }
          />
        ) : (
          <div className="space-y-2">
            {recent.map((quiz) => (
              <RecentQuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuickAction({ label, desc, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all hover:border-violet-500/30 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      style={{ background: '#111827', borderColor: '#1a2540' }}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>
          {label}
        </p>
        <p className="text-xs" style={{ color: '#64748b' }}>
          {desc}
        </p>
      </div>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-md"
        style={{
          color: accent === 'cyan' ? '#22d3ee' : '#8b5cf6',
          background: accent === 'cyan' ? 'rgba(34,211,238,0.1)' : 'rgba(124,58,237,0.1)',
        }}
      >
        Go →
      </span>
    </button>
  )
}
