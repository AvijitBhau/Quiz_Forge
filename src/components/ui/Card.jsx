export default function Card({ children, className = '', onClick, hoverable = false }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border ${
        hoverable
          ? 'cursor-pointer hover:border-violet-500/30 hover:shadow-lg transition-all duration-200'
          : ''
      } ${className}`}
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      {children}
    </div>
  )
}
