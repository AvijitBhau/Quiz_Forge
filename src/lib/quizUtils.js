import { MOCK_QUIZ_TEMPLATES } from '../data/mockQuizzes.js'

export function generateQuizId() {
  return `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function generateAttemptId() {
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function scoreAttempt(questions, answers) {
  let correctCount = 0;

  questions.forEach((question, index) => {
    // Support answers stored by question ID or array index
    const selectedAnswer =
      answers[question.id] !== undefined
        ? answers[question.id]
        : answers[index];

    const correctAnswer = Number(question.correctAnswer);

    if (
      selectedAnswer !== undefined &&
      Number(selectedAnswer) === correctAnswer
    ) {
      correctCount++;
    }
  });

  const totalCount = questions.length;

  return {
    score: totalCount
      ? Math.round((correctCount / totalCount) * 100)
      : 0,
    correctCount,
    totalCount,
  };
}

export function generateMockQuiz({ topic, subject, difficulty, questionCount, timerEnabled }) {
  // Try to find a matching template by topic name (case-insensitive)
  const template =
    MOCK_QUIZ_TEMPLATES.find(
      (t) => t.topic.toLowerCase() === topic.toLowerCase()
    ) || MOCK_QUIZ_TEMPLATES[0]

  const pool = template.questions
  const count = Math.min(questionCount, pool.length)
  // Re-index question ids so they are always q1, q2, …
  const questions = pool.slice(0, count).map((q, i) => ({ ...q, id: `q${i + 1}` }))

  const timeLimits = { 5: 180, 10: 360, 15: 540, 20: 720 }

  return {
    id: generateQuizId(),
    title: `${topic} Quiz`,
    topic,
    subject: subject || template.subject || 'General',
    difficulty,
    questionCount: questions.length,
    timerEnabled,
    timeLimit: timerEnabled ? timeLimits[questionCount] ?? 360 : null,
    createdAt: new Date().toISOString(),
    questions,
    attempted: false,
    lastScore: null,
  }
}

export function formatTime(seconds) {
  if (seconds == null || seconds < 0) return '--'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    case 'medium':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    case 'hard':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  }
}

export function getScoreFeedback(score) {
  if (score >= 90)
    return {
      label: 'Outstanding!',
      message: 'You have an exceptional grasp of this topic.',
      color: 'text-emerald-400',
    }
  if (score >= 75)
    return {
      label: 'Great Work!',
      message: 'You clearly understand the material well.',
      color: 'text-violet-400',
    }
  if (score >= 60)
    return {
      label: 'Good Effort!',
      message: 'A solid attempt. Review the missed questions to improve.',
      color: 'text-amber-400',
    }
  if (score >= 40)
    return {
      label: 'Keep Practicing',
      message: 'You are building your foundation. Keep going!',
      color: 'text-orange-400',
    }
  return {
    label: 'Keep at It',
    message: 'Every expert was once a beginner. Review and retry.',
    color: 'text-red-400',
  }
}

export function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return '—'
  }
}

export function timeAgo(iso) {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function getScoreStrokeColor(score) {
  if (score >= 90) return '#34d399'
  if (score >= 75) return '#8b5cf6'
  if (score >= 60) return '#fbbf24'
  if (score >= 40) return '#fb923c'
  return '#f87171'
}
