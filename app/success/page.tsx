'use client'

import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(94, 141, 191, 0.15)' }}
          >
            <Check className="w-10 h-10" style={{ color: '#5E8DBF' }} strokeWidth={3} />
          </div>
        </div>

        {/* Heading */}
        <h1 
          className="font-serif text-3xl sm:text-4xl mb-3"
          style={{ color: '#001C5F' }}
        >
          Welcome!
        </h1>

        {/* Message */}
        <p 
          className="font-sans text-lg mb-2"
          style={{ color: '#6B7280' }}
        >
          Your subscription is active.
        </p>

        {/* Details */}
        <p 
          className="font-sans text-base mb-8"
          style={{ color: '#9CA3AF' }}
        >
          Your first message will arrive tomorrow morning at your preferred time. Thank you for joining us on this journey of faith and encouragement.
        </p>

        {/* Session ID (for reference) */}
        {sessionId && (
          <p 
            className="font-mono text-xs mb-8 p-3 rounded"
            style={{ backgroundColor: '#E5E7EB', color: '#4B5563' }}
          >
            Session: {sessionId}
          </p>
        )}

        {/* CTA Button */}
        <Link href="/">
          <button
            className="w-full font-sans font-medium text-base py-4 rounded-full transition-all"
            style={{ 
              background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
              color: '#001C5F',
            }}
          >
            Return Home
          </button>
        </Link>
      </div>
    </div>
  )
}
