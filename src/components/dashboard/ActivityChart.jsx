import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { WEEKLY_ACTIVITY } from '../../data/mockQuizzes.js'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border px-3 py-2 text-sm shadow-xl"
        style={{ background: '#111827', borderColor: '#243059' }}
      >
        <p className="font-semibold mb-1" style={{ color: '#e2e8f0' }}>
          {label}
        </p>
        <p style={{ color: '#8b5cf6' }}>Quizzes: {payload[0]?.value}</p>
      </div>
    )
  }
  return null
}

export default function ActivityChart() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
          Weekly Activity
        </h3>
        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
          Quizzes taken this week
        </p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={WEEKLY_ACTIVITY} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1a2540"
            vertical={false}
          />
          <XAxis
            dataKey="day"
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
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(124,58,237,0.06)' }}
          />
          <Bar
            dataKey="quizzes"
            fill="#7c3aed"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
