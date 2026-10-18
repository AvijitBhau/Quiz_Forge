import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Clock,
  BarChart2,
  Settings,
  Zap,
  // Github,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/create', icon: PlusCircle, label: 'Create Quiz' },
  { to: '/quizzes', icon: BookOpen, label: 'My Quizzes' },
  { to: '/history', icon: Clock, label: 'Quiz History' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
]

const BOTTOM_NAV = [{ to: '/settings', icon: Settings, label: 'Settings' }]

function NavItem({ to, icon: Icon, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border ${
          isActive
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={16} style={{ color: isActive ? '#a78bfa' : undefined }} />
          {label}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ onClose }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#0b1124', borderRight: '1px solid #1a2540' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={onClose}>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #22d3ee)' }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: '#e2e8f0' }}>
            QuizForge<span style={{ color: '#8b5cf6' }}> AI</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-white/5 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} style={{ color: '#64748b' }} />
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#1a2540', margin: '0 16px 12px' }} />

      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p
          className="px-3 pt-1 pb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: '#334155' }}
        >
          Menu
        </p>
        {NAV_ITEMS.map(({ to, icon, label, end }) => (
          <NavItem key={to} to={to} icon={icon} label={label} end={end} onClick={onClose} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-3 space-y-0.5">
        <div style={{ height: '1px', background: '#1a2540', margin: '0 4px 12px' }} />
        {BOTTOM_NAV.map(({ to, icon, label }) => (
          <NavItem key={to} to={to} icon={icon} label={label} onClick={onClose} />
        ))}

        {/* GitHub / Open Source callout */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-white/5 border border-transparent"
          style={{ color: '#475569' }}
        >
          {/* <Github size={16} /> */}
          Open Source
        </a>
      </div>
    </div>
  )
}
