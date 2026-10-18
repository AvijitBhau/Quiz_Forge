import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Trash2, PlayCircle, BookOpen, RotateCcw } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import { DifficultyBadge, SubjectBadge, StatusBadge } from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Modal from '../components/ui/Modal.jsx'
import { formatDate } from '../lib/quizUtils.js'
import { SUBJECTS } from '../data/mockQuizzes.js'

export default function MyQuizzes() {
  const navigate = useNavigate()
  const { quizzes, deleteQuiz } = useQuiz()

  const [search, setSearch] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = quizzes.filter((q) => {
    const matchSearch =
      !search ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase())
    const matchSubject = !filterSubject || q.subject === filterSubject
    const matchDiff = !filterDifficulty || q.difficulty === filterDifficulty
    return matchSearch && matchSubject && matchDiff
  })

  function confirmDelete() {
    if (deleteTarget) {
      deleteQuiz(deleteTarget)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
            My Quizzes
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
            {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} in your library
          </p>
        </div>
        <Button onClick={() => navigate('/create')}>
          Create Quiz
        </Button>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#475569' }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quizzes…"
            className="w-full pl-9 pr-3.5 py-2 rounded-lg text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            style={{ background: '#111827', borderColor: '#243059', color: '#e2e8f0' }}
          />
        </div>

        {/* Subject filter */}
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-3.5 py-2 rounded-lg text-sm border appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          style={{
            background: '#111827',
            borderColor: '#243059',
            color: filterSubject ? '#e2e8f0' : '#475569',
          }}
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-3.5 py-2 rounded-lg text-sm border appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          style={{
            background: '#111827',
            borderColor: '#243059',
            color: filterDifficulty ? '#e2e8f0' : '#475569',
          }}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Results count */}
      {(search || filterSubject || filterDifficulty) && (
        <p className="text-xs" style={{ color: '#64748b' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
          {(search || filterSubject || filterDifficulty) && (
            <button
              onClick={() => { setSearch(''); setFilterSubject(''); setFilterDifficulty('') }}
              className="ml-2 underline hover:text-slate-400 transition-colors"
              style={{ color: '#8b5cf6' }}
            >
              Clear filters
            </button>
          )}
        </p>
      )}

      {/* Quiz grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={quizzes.length === 0 ? 'No quizzes yet' : 'No results found'}
          description={
            quizzes.length === 0
              ? 'Generate your first AI-powered quiz to get started.'
              : 'Try adjusting your search or clearing your filters.'
          }
          action={
            quizzes.length === 0 ? (
              <Button onClick={() => navigate('/create')}>Create Quiz</Button>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={() => navigate(`/quiz/${quiz.id}`)}
              onDelete={() => setDeleteTarget(quiz.id)}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Quiz?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm" style={{ color: '#94a3b8' }}>
          This will permanently delete the quiz and all associated data. This action
          cannot be undone.
        </p>
      </Modal>
    </div>
  )
}

function QuizCard({ quiz, onStart, onDelete }) {
  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-4 hover:border-violet-500/30 transition-all duration-150"
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      {/* Title + badges */}
      <div>
        <h3
          className="text-sm font-semibold line-clamp-2 mb-2 cursor-pointer hover:text-violet-300 transition-colors"
          style={{ color: '#e2e8f0' }}
          onClick={onStart}
        >
          {quiz.title}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <SubjectBadge subject={quiz.subject} />
          <DifficultyBadge difficulty={quiz.difficulty} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs" style={{ color: '#475569' }}>
        <span>{quiz.questionCount} questions</span>
        <span style={{ color: '#1a2540' }}>·</span>
        <span>{formatDate(quiz.createdAt)}</span>
      </div>

      {/* Status */}
      <div>
        <StatusBadge attempted={quiz.attempted} score={quiz.lastScore} />
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-2 pt-3 border-t"
        style={{ borderColor: '#1a2540' }}
      >
        <Button size="sm" onClick={onStart} className="flex-1">
          <PlayCircle size={13} />
          {quiz.attempted ? 'Retry' : 'Start'}
        </Button>
        <Button size="sm" variant="danger" onClick={onDelete}>
          <Trash2 size={13} />
        </Button>
      </div>
    </div>
  )
}
