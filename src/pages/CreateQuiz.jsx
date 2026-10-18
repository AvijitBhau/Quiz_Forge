import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Type,
  FileText,
  ChevronDown,
  AlertCircle,
  Info,
} from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import { generateQuiz as generateAIQuiz } from '../lib/generateQuiz.js'
import { SUBJECTS, TOPIC_SUGGESTIONS } from '../data/mockQuizzes.js'
import Button from '../components/ui/Button.jsx'

const DIFFICULTIES = [
  { value: 'easy', label: 'Easy', desc: 'Foundational concepts' },
  { value: 'medium', label: 'Medium', desc: 'Moderate challenge' },
  { value: 'hard', label: 'Hard', desc: 'Advanced mastery' },
]

const QUESTION_COUNTS = [5, 10, 15, 20]

export default function CreateQuiz() {
  const navigate = useNavigate()
  const { addQuiz, settings } = useQuiz()

  const [mode, setMode] = useState('topic') // 'topic' | 'material'
  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('')
  const [material, setMaterial] = useState('')
  const [difficulty, setDifficulty] = useState(settings.defaultDifficulty || 'medium')
  const [questionCount, setQuestionCount] = useState(settings.defaultQuestionCount || 10)
  const [timerEnabled, setTimerEnabled] = useState(settings.defaultTimer || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const suggestions = subject
    ? TOPIC_SUGGESTIONS[subject] ?? TOPIC_SUGGESTIONS.default
    : TOPIC_SUGGESTIONS.default

  function switchMode(m) {
    setMode(m)
    setError('')
  }

  function handleChip(chip) {
    setTopic(chip)
    setError('')
  }

  function validate() {
    if (mode === 'topic' && !topic.trim()) {
      setError('Please enter a topic to generate a quiz.')
      return false
    }
    if (mode === 'material' && material.trim().length < 50) {
      setError('Please paste at least 50 characters of study material.')
      return false
    }
    return true
  }

  async function handleGenerate() {
  if (!validate()) return;

  setLoading(true);
  setError('');

  try {
    const generated = await generateAIQuiz({
      topic: topic.trim(),
      difficulty,
      questionCount,
      material: mode === 'material' ? material : '',
    });

    const quiz = {
      id: crypto.randomUUID(),
      title: generated.title,
      topic: generated.topic,
      subject: subject || 'General',
      difficulty,
      questionCount: generated.questions.length,
      timerEnabled,
      timeLimit: timerEnabled ? questionCount * 60 : null,

      questions: generated.questions.map((q, index) => ({
        id: `q-${index + 1}`,
        text: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      })),

      createdAt: new Date().toISOString(),
    };

    addQuiz(quiz);
    navigate(`/quiz/${quiz.id}`);
  } catch (err) {
    console.error('Quiz generation failed:', err);
    setError(
      err.message || 'Unable to generate your quiz. Please try again.'
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
          Create your next quiz.
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
          Choose a topic or paste your notes — AI does the rest.
        </p>
      </div>

      {/* Source section */}
      <div
        className="rounded-xl border p-5 space-y-5"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: '#111827' }}>
          <ModeTab
            active={mode === 'topic'}
            onClick={() => switchMode('topic')}
            icon={<Type size={14} />}
          >
            Topic
          </ModeTab>
          <ModeTab
            active={mode === 'material'}
            onClick={() => switchMode('material')}
            icon={<FileText size={14} />}
          >
            Study Material
          </ModeTab>
        </div>

        {mode === 'topic' ? (
          <div className="space-y-4">
            {/* Topic input */}
            <div>
              <label
                className="text-sm font-medium mb-1.5 block"
                style={{ color: '#94a3b8' }}
              >
                Topic
              </label>
              <input
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value)
                  setError('')
                }}
                placeholder="e.g. React Hooks, The French Revolution, Calculus Derivatives"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
                style={{
                  background: '#111827',
                  borderColor: error ? 'rgba(239,68,68,0.5)' : '#243059',
                  color: '#e2e8f0',
                }}
              />
            </div>

            {/* Subject select */}
            <div>
              <label
                className="text-sm font-medium mb-1.5 block"
                style={{ color: '#94a3b8' }}
              >
                Subject{' '}
                <span style={{ color: '#475569' }}>(optional)</span>
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm border appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
                  style={{
                    background: '#111827',
                    borderColor: '#243059',
                    color: subject ? '#e2e8f0' : '#475569',
                  }}
                >
                  <option value="">Select a subject…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#475569' }}
                />
              </div>
            </div>

            {/* Topic chips */}
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>
                Suggested topics:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChip(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      topic === s
                        ? 'text-violet-200 bg-violet-500/20 border-violet-500/40'
                        : 'text-slate-400 bg-white/5 border-white/10 hover:border-violet-500/30 hover:text-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label
              className="text-sm font-medium block"
              style={{ color: '#94a3b8' }}
            >
              Paste your study notes or textbook excerpt
            </label>
            <div className="relative">
              <textarea
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value)
                  setError('')
                }}
                placeholder="Paste your lecture notes, textbook sections, or any study material here. The AI will extract key concepts and generate targeted questions…"
                rows={10}
                className="w-full px-3.5 py-3 rounded-lg text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 resize-none"
                style={{
                  background: '#111827',
                  borderColor: error ? 'rgba(239,68,68,0.5)' : '#243059',
                  color: '#e2e8f0',
                }}
              />
              <span
                className="absolute bottom-3 right-3 text-xs"
                style={{
                  color: material.length > 5000 ? '#f87171' : '#475569',
                }}
              >
                {material.length.toLocaleString()} / 5,000
              </span>
            </div>
            <p className="text-xs flex items-center gap-1.5" style={{ color: '#475569' }}>
              <Info size={12} />
              Aim for 200–2,000 characters for best results.
            </p>
          </div>
        )}
      </div>

      {/* Configuration */}
      <div
        className="rounded-xl border p-5 space-y-6"
        style={{ background: '#0b1124', borderColor: '#1a2540' }}
      >
        <h2 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
          Quiz Configuration
        </h2>

        {/* Difficulty */}
        <div>
          <label
            className="text-sm font-medium mb-3 block"
            style={{ color: '#94a3b8' }}
          >
            Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`p-3 rounded-lg border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  difficulty === d.value
                    ? 'border-violet-500/50 bg-violet-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    difficulty === d.value ? 'text-violet-300' : 'text-slate-300'
                  }`}
                >
                  {d.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                  {d.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div>
          <label
            className="text-sm font-medium mb-3 block"
            style={{ color: '#94a3b8' }}
          >
            Number of Questions
          </label>
          <div className="flex gap-2">
            {QUESTION_COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setQuestionCount(c)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  questionCount === c
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Question type (static) */}
        <div>
          <label
            className="text-sm font-medium mb-2 block"
            style={{ color: '#94a3b8' }}
          >
            Question Type
          </label>
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border"
            style={{ background: '#111827', borderColor: '#243059' }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: '#7c3aed' }}
            />
            <span className="text-sm" style={{ color: '#e2e8f0' }}>
              Multiple Choice
            </span>
          </div>
        </div>

        {/* Timer toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
              Enable Timer
            </p>
            <p className="text-xs" style={{ color: '#475569' }}>
              Add a countdown to challenge yourself
            </p>
          </div>
          <button
            onClick={() => setTimerEnabled((p) => !p)}
            className={`relative w-11 h-6 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
              timerEnabled
                ? 'bg-violet-600 border-violet-500'
                : 'bg-white/10 border-white/10'
            }`}
            role="switch"
            aria-checked={timerEnabled}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform ${
                timerEnabled ? 'translate-x-5 bg-white' : 'bg-slate-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg border"
          style={{
            background: 'rgba(239,68,68,0.08)',
            borderColor: 'rgba(239,68,68,0.2)',
          }}
        >
          <AlertCircle size={15} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Generate button */}
      <div className="space-y-3">
        <Button
          onClick={handleGenerate}
          size="xl"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="w-4 h-4 border-2 rounded-full animate-spin"
                style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
              />
              Generating quiz…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Quiz
            </>
          )}
        </Button>
        <p className="text-xs text-center" style={{ color: '#475569' }}>
          AI-generated questions may occasionally contain inaccuracies. Review before sharing.
        </p>
      </div>
    </div>
  )
}

function ModeTab({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
        active ? 'text-violet-200' : 'text-slate-500 hover:text-slate-300'
      }`}
      style={active ? { background: '#1a2540' } : {}}
    >
      {icon}
      {children}
    </button>
  )
}
