import { getDifficultyColor } from '../../lib/quizUtils.js'

export function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border capitalize ${getDifficultyColor(difficulty)}`}
    >
      {difficulty}
    </span>
  )
}

export function SubjectBadge({ subject }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border"
      style={{
        color: '#22d3ee',
        background: 'rgba(34,211,238,0.08)',
        borderColor: 'rgba(34,211,238,0.2)',
      }}
    >
      {subject}
    </span>
  )
}

export function StatusBadge({ attempted, score }) {
  if (!attempted) {
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border"
        style={{
          color: '#64748b',
          background: 'rgba(100,116,139,0.1)',
          borderColor: 'rgba(100,116,139,0.2)',
        }}
      >
        Not attempted
      </span>
    )
  }
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#a78bfa' : '#fb923c'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border"
      style={{
        color,
        background: `${color}18`,
        borderColor: `${color}35`,
      }}
    >
      {score}%
    </span>
  )
}
