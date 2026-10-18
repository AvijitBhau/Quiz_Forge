import { useNavigate } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: '#060918' }}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
        style={{
          background: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(124,58,237,0.25)',
        }}
      >
        <AlertTriangle size={28} style={{ color: '#7c3aed' }} />
      </div>
      <p
        className="text-7xl font-extrabold mb-3 tracking-tight"
        style={{ color: '#f1f5f9' }}
      >
        404
      </p>
      <p className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>
        Page not found
      </p>
      <p className="text-sm mb-8 max-w-xs" style={{ color: '#64748b' }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button onClick={() => navigate('/')} size="lg">
        <Home size={16} />
        Back to Dashboard
      </Button>
    </div>
  )
}
