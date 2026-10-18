export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div
        className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
        style={{
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <Icon size={24} style={{ color: '#7c3aed' }} />
      </div>
      <h3 className="text-base font-semibold mb-1.5" style={{ color: '#e2e8f0' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: '#64748b' }}>
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
