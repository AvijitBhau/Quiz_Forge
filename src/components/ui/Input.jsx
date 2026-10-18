export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium" style={{ color: '#94a3b8' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
        style={{
          background: '#111827',
          borderColor: error ? 'rgba(239,68,68,0.5)' : '#243059',
          color: '#e2e8f0',
        }}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
