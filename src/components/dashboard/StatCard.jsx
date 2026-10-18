export default function StatCard({ icon: Icon, label, value, trend, trendPositive }) {
  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-3"
      style={{ background: '#0b1124', borderColor: '#1a2540' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: '#64748b' }}>
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <Icon size={15} style={{ color: '#8b5cf6' }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: '#f1f5f9' }}>
          {value}
        </p>
        {trend && (
          <p
            className="text-xs mt-0.5 font-medium"
            style={{ color: trendPositive ? '#34d399' : '#f87171' }}
          >
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}
