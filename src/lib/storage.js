const STORAGE_KEYS = {
  QUIZZES: 'quizforge_quizzes',
  ATTEMPTS: 'quizforge_attempts',
  SETTINGS: 'quizforge_settings',
}

export function getQuizzes() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveQuizzes(quizzes) {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes))
  } catch (e) {
    console.error('Failed to save quizzes:', e)
  }
}

export function getAttempts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveAttempts(attempts) {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts))
  } catch (e) {
    console.error('Failed to save attempts:', e)
  }
}

export function getSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  } catch (e) {
    console.error('Failed to save settings:', e)
  }
}
