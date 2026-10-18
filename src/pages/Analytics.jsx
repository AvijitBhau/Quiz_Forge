import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import { BarChart2 } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'

const SCORE_TREND = [
  { week: 'Wk 1', score: 62 },
  { week: 'Wk 2', score: 70 },
  { week: 'Wk 3', score: 75 },
  { week: 'Wk 4', score: 80 },
  { week: 'Wk 5', score: 82 },
  { week: 'Wk 6', score: 88 },
]

const SUBJECT_ACCURACY = [
  { subject: 'CS', accuracy: 72 },
  { subject: 'Math', accuracy: 85 },
  { subject: 'Physics', accuracy: 60 },
  { subject: 'History', accuracy: 90 },
  { subject: 'Biology', accuracy: 78 },
]

const DIFF_COLORS = { easy: '#34d399', medium: '#fbbf24', hard: '#f87171' }
const STUDY_WEEKS = [
  { week: 'Week 1', attempts: 2 },
  { week: 'Week 2', attempts: 4 },
  { week: 'Week 3', attempts: 3 },
  { week: 'Week 4', attempts: 5 },
]

function ChartCard({ title, subtitle, children }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
        {title}
      </h3>
      <p className="text-xs mt-0.5 mb-4" style={{ color: '#64748b' }}>
        {subtitle}
      </p>
      {children}
    </div>
  )
}

function CustomTooltip({ active, payload, label, suffix = '' }) {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-lg border px-3 py-2 text-sm shadow-xl"
        style={{ background: '#111827', borderColor: '#243059' }}
      >
        <p className="font-semibold mb-1" style={{ color: '#e2e8f0' }}>
          {label}
        </p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color || '#8b5cf6' }}>
            {p.name}: {p.value}{suffix}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  const navigate = useNavigate()
  const { quizzes, attempts } = useQuiz()

  if (attempts.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
            Analytics
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
            Your performance insights will appear here.
          </p>
        </div>
        <EmptyState
          icon={BarChart2}
          title="No data yet"
          description="Complete at least one quiz to unlock your analytics dashboard."
          action={
            <Button onClick={() => navigate('/create')}>Create a Quiz</Button>
          }
        />
      </div>
    )
  }

  const avgScore = Math.round(
    attempts.reduce((a, b) => a + b.score, 0) / attempts.length
  )
  const best = Math.max(...attempts.map((a) => a.score))

  // Build difficulty distribution from real attempts
  const diffCounts = attempts.reduce((acc, a) => {
    acc[a.difficulty] = (acc[a.difficulty] || 0) + 1
    return acc
  }, {})
  const diffData = Object.entries(diffCounts).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
          Analytics
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
          Your learning performance at a glance
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Attempts', value: attempts.length, color: '#8b5cf6' },
          { label: 'Avg Score', value: `${avgScore}%`, color: '#22d3ee' },
          { label: 'Best Score', value: `${best}%`, color: '#34d399' },
          { label: 'Quizzes Created', value: quizzes.length, color: '#fbbf24' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border p-4"
            style={{ background: '#0b1124', borderColor: '#1a2540' }}
          >
            <p className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>
              {s.label}
            </p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Score trend */}
        <ChartCard title="Score Trend" subtitle="Average score over 6 weeks (sample data)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={SCORE_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" vertical={false} />
              <XAxis
                dataKey="week"
                tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[50, 100]}
                width={28}
              />
              <Tooltip
                content={<CustomTooltip suffix="%" />}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="Score"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ fill: '#7c3aed', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Accuracy by subject */}
        <ChartCard title="Accuracy by Subject" subtitle="How well you perform per subject">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SUBJECT_ACCURACY} layout="vertical" barSize={12}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1a2540"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
              <YAxis
                dataKey="subject"
                type="category"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip content={<CustomTooltip suffix="%" />} />
              <Bar dataKey="accuracy" name="Accuracy" fill="#22d3ee" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Difficulty distribution */}
        <ChartCard
          title="Difficulty Distribution"
          subtitle="Breakdown of your attempted quiz difficulties"
        >
          {diffData.length === 0 ? (
            <p className="text-sm text-center py-12" style={{ color: '#475569' }}>
              No data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={diffData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1a2540"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Attempts" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {diffData.map((entry, i) => (
                    <Cell key={i} fill={DIFF_COLORS[entry.name] || '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Study activity — bar list */}
        <ChartCard
          title="Study Activity"
          subtitle="Attempts per week over the past 4 weeks"
        >
          <div className="space-y-4 pt-2">
            {STUDY_WEEKS.map(({ week, attempts: count }) => {
              const pct = (count / 6) * 100
              return (
                <div key={week} className="flex items-center gap-3">
                  <span
                    className="text-xs w-14 shrink-0"
                    style={{ color: '#64748b' }}
                  >
                    {week}
                  </span>
                  <div
                    className="flex-1 h-2.5 rounded-full overflow-hidden"
                    style={{ background: '#1a2540' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-4 text-right shrink-0"
                    style={{ color: '#94a3b8' }}
                  >
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
