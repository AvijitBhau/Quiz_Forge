import { useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button.jsx'

export default function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl border shadow-2xl"
        style={{ background: '#111827', borderColor: '#1a2540' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: '#1a2540' }}
        >
          <h2 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Close modal"
          >
            <X size={18} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="px-6 py-4 border-t flex items-center justify-end gap-3"
            style={{ borderColor: '#1a2540' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
