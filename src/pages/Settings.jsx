import { useState } from 'react'
import { Check, User, Palette, BookOpen, Bell } from 'lucide-react'
import { useQuiz } from '../context/QuizContext.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

export default function Settings() {
  const { settings, setSettings } = useQuiz()
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    setSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
          Settings
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
          Manage your profile and quiz preferences.
        </p>
      </div>

      {/* Profile */}
      <Section icon={<User size={15} />} title="Profile">
        <Input
          label="Display Name"
          value={form.displayName}
          onChange={(e) => handleChange('displayName', e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="you@example.com"
        />
      </Section>

      {/* Appearance */}
      <Section icon={<Palette size={15} />} title="Appearance">
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: '#94a3b8' }}>
            Theme
          </label>
          <div className="flex gap-2">
            {['dark', 'light'].map((t) => (
              <button
                key={t}
                onClick={() => handleChange('theme', t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  form.theme === t
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {form.theme === 'light' && (
            <p className="text-xs mt-2" style={{ color: '#64748b' }}>
              Light mode is coming soon — dark mode remains active for now.
            </p>
          )}
        </div>
      </Section>

      {/* Quiz Preferences */}
      <Section icon={<BookOpen size={15} />} title="Quiz Preferences">
        {/* Default difficulty */}
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: '#94a3b8' }}>
            Default Difficulty
          </label>
          <div className="flex gap-2">
            {['easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => handleChange('defaultDifficulty', d)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  form.defaultDifficulty === d
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Default question count */}
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: '#94a3b8' }}>
            Default Question Count
          </label>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map((c) => (
              <button
                key={c}
                onClick={() => handleChange('defaultQuestionCount', c)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  form.defaultQuestionCount === c
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Timer toggle */}
        <ToggleSetting
          label="Enable Timer by Default"
          desc="Start new quizzes with a countdown timer pre-enabled"
          checked={form.defaultTimer}
          onChange={(v) => handleChange('defaultTimer', v)}
        />
      </Section>

      {/* Notifications */}
      <Section icon={<Bell size={15} />} title="Notifications">
        <ToggleSetting
          label="Study Streak Reminders"
          desc="Get notified to keep your daily study streak alive"
          checked={form.notifyOnStreak}
          onChange={(v) => handleChange('notifyOnStreak', v)}
        />
        <ToggleSetting
          label="Score Milestones"
          desc="Celebrate when you hit a new personal best score"
          checked={form.notifyOnScore}
          onChange={(v) => handleChange('notifyOnScore', v)}
        />
      </Section>

      {/* Save */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="lg">
          {saved ? (
            <>
              <Check size={15} /> Saved!
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
        <p className="text-xs" style={{ color: '#475569' }}>
          Preferences are saved locally in your browser.
        </p>
      </div>
    </div>
  )
}

function Section({ icon, title, children }) {
  return (
    <div
      className="rounded-xl border p-5 space-y-4"
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      <div
        className="flex items-center gap-2 pb-3 border-b"
        style={{ borderColor: '#1a2540' }}
      >
        <span style={{ color: '#8b5cf6' }}>{icon}</span>
        <h2 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function ToggleSetting({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
          {label}
        </p>
        <p className="text-xs" style={{ color: '#475569' }}>
          {desc}
        </p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 shrink-0 ${
          checked ? 'bg-violet-600 border-violet-500' : 'bg-white/10 border-white/10'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform ${
            checked ? 'translate-x-5 bg-white' : 'bg-slate-400'
          }`}
        />
      </button>
    </div>
  )
}
