import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import { useQuiz } from '../../context/QuizContext.jsx'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/create': 'Create Quiz',
  '/quizzes': 'My Quizzes',
  '/history': 'Quiz History',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export default function TopBar({ onMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { settings } = useQuiz()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const dropRef = useRef(null)
  const notifRef = useRef(null)

  const title =
    PAGE_TITLES[location.pathname] ??
    (location.pathname.startsWith('/quiz/')
      ? 'Take Quiz'
      : location.pathname.startsWith('/results/')
      ? 'Results'
      : 'QuizForge AI')

  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = settings.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 py-3 shrink-0"
      style={{ background: '#0b1124', borderBottom: '1px solid #1a2540' }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} style={{ color: '#94a3b8' }} />
        </button>
        <h1 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="relative p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Notifications"
          >
            <Bell size={18} style={{ color: '#94a3b8' }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: '#7c3aed' }}
            />
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 mt-1 w-72 rounded-xl shadow-2xl z-50 border"
              style={{ background: '#111827', borderColor: '#1a2540' }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1a2540' }}>
                <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
                  Notifications
                </p>
              </div>
              <div className="p-2 space-y-1">
                <NotifItem
                  title="Study streak: 3 days!"
                  desc="Keep it up — you're on a roll."
                  time="2h ago"
                />
                <NotifItem
                  title="New quiz template available"
                  desc="Linear Algebra — 15 questions, hard difficulty."
                  time="1d ago"
                />
              </div>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div ref={dropRef} className="relative">
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
                color: '#fff',
              }}
            >
              {initials}
            </div>
            <span
              className="hidden sm:block text-sm font-medium"
              style={{ color: '#cbd5e1' }}
            >
              {settings.displayName.split(' ')[0]}
            </span>
            <ChevronDown size={14} style={{ color: '#64748b' }} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-1 w-48 rounded-xl shadow-2xl z-50 border"
              style={{ background: '#111827', borderColor: '#1a2540' }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1a2540' }}>
                <p className="text-sm font-medium truncate" style={{ color: '#e2e8f0' }}>
                  {settings.displayName}
                </p>
                <p className="text-xs truncate" style={{ color: '#64748b' }}>
                  {settings.email}
                </p>
              </div>
              <div className="p-1.5 space-y-0.5">
                <DropItem
                  icon={User}
                  label="Profile"
                  onClick={() => {
                    navigate('/settings')
                    setDropdownOpen(false)
                  }}
                />
                <DropItem
                  icon={Settings}
                  label="Settings"
                  onClick={() => {
                    navigate('/settings')
                    setDropdownOpen(false)
                  }}
                />
                <div
                  style={{ height: '1px', background: '#1a2540', margin: '4px 0' }}
                />
                <DropItem
                  icon={LogOut}
                  label="Sign Out"
                  onClick={() => setDropdownOpen(false)}
                  danger
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function NotifItem({ title, desc, time }) {
  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
      <div
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{ background: '#7c3aed' }}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>
          {title}
        </p>
        <p className="text-xs" style={{ color: '#64748b' }}>
          {desc}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
          {time}
        </p>
      </div>
    </div>
  )
}

function DropItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      style={{ color: danger ? '#f87171' : '#94a3b8' }}
    >
      <Icon size={15} />
      {label}
    </button>
  )
}
