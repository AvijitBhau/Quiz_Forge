import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import { DifficultyBadge, StatusBadge } from '../ui/Badge.jsx'
import { formatDate } from '../../lib/quizUtils.js'

export default function RecentQuizCard({ quiz }) {
  const navigate = useNavigate()

  function handleClick() {
    if (quiz.attempted) {
      // Find the latest attempt — navigate to quiz for a fresh attempt or go to quiz page
      navigate(`/quiz/${quiz.id}`)
    } else {
      navigate(`/quiz/${quiz.id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:border-violet-500/30 transition-all duration-150 group"
      style={{ background: '#111827', borderColor: '#1a2540' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <BookOpen size={15} style={{ color: '#8b5cf6' }} />
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-medium truncate group-hover:text-violet-300 transition-colors"
            style={{ color: '#e2e8f0' }}
          >
            {quiz.title}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs" style={{ color: '#475569' }}>
              {quiz.questionCount}Q
            </span>
            <span style={{ color: '#243059' }}>·</span>
            <DifficultyBadge difficulty={quiz.difficulty} />
            <span style={{ color: '#243059' }}>·</span>
            <span className="text-xs" style={{ color: '#475569' }}>
              {formatDate(quiz.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <StatusBadge attempted={quiz.attempted} score={quiz.lastScore} />
        <ChevronRight size={16} style={{ color: '#334155' }} />
      </div>
    </div>
  )
}
