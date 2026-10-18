import { createContext, useContext, useState, useCallback } from 'react'
import {
  getQuizzes,
  saveQuizzes,
  getAttempts,
  saveAttempts,
  getSettings,
  saveSettings,
} from '../lib/storage.js'
import { INITIAL_MOCK_QUIZZES, INITIAL_MOCK_ATTEMPTS } from '../data/mockQuizzes.js'

const QuizContext = createContext(null)

const DEFAULT_SETTINGS = {
  displayName: 'Alex Johnson',
  email: 'alex@quizforgeai.dev',
  theme: 'dark',
  defaultDifficulty: 'medium',
  defaultQuestionCount: 10,
  defaultTimer: false,
  notifyOnStreak: true,
  notifyOnScore: true,
}

export function QuizProvider({ children }) {
  const [quizzes, setQuizzesRaw] = useState(() => {
    const stored = getQuizzes()
    return stored ?? INITIAL_MOCK_QUIZZES
  })

  const [attempts, setAttemptsRaw] = useState(() => {
    const stored = getAttempts()
    return stored ?? INITIAL_MOCK_ATTEMPTS
  })

  const [settings, setSettingsRaw] = useState(() => {
    const stored = getSettings()
    return stored ?? DEFAULT_SETTINGS
  })

  // Persist helpers
  const setQuizzes = useCallback(
    (updater) => {
      setQuizzesRaw((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        saveQuizzes(next)
        return next
      })
    },
    []
  )

  const setAttempts = useCallback(
    (updater) => {
      setAttemptsRaw((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        saveAttempts(next)
        return next
      })
    },
    []
  )

  const setSettings = useCallback(
    (updater) => {
      setSettingsRaw((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        saveSettings(next)
        return next
      })
    },
    []
  )

  // Actions
  const addQuiz = useCallback(
    (quiz) => setQuizzes((prev) => [quiz, ...prev]),
    [setQuizzes]
  )

  const deleteQuiz = useCallback(
    (quizId) => setQuizzes((prev) => prev.filter((q) => q.id !== quizId)),
    [setQuizzes]
  )

  const addAttempt = useCallback(
    (attempt) => {
      setAttempts((prev) => [attempt, ...prev])
      // Mark quiz as attempted and store last score
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === attempt.quizId
            ? { ...q, attempted: true, lastScore: attempt.score }
            : q
        )
      )
    },
    [setAttempts, setQuizzes]
  )

  // Selectors
  const getQuizById = useCallback(
    (id) => quizzes.find((q) => q.id === id) ?? null,
    [quizzes]
  )

  const getAttemptById = useCallback(
    (id) => attempts.find((a) => a.id === id) ?? null,
    [attempts]
  )

  const getAttemptsForQuiz = useCallback(
    (quizId) => attempts.filter((a) => a.quizId === quizId),
    [attempts]
  )

  const getLatestAttempt = useCallback(
    (quizId) => {
      const filtered = attempts
        .filter((a) => a.quizId === quizId)
        .sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt))
      return filtered[0] ?? null
    },
    [attempts]
  )

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        attempts,
        settings,
        addQuiz,
        deleteQuiz,
        addAttempt,
        getQuizById,
        getAttemptById,
        getAttemptsForQuiz,
        getLatestAttempt,
        setSettings,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
