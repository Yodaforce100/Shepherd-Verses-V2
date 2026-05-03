'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Redirect to welcome page with session info
    if (sessionId) {
      // In production, you'd fetch session data from Stripe here
      // For now, we'll redirect with basic params
      router.push(`/welcome?session_id=${sessionId}`)
    }
  }, [sessionId, router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="text-center">
        <p style={{ color: '#999', fontSize: '14px' }}>
          Redirecting to your welcome page...
        </p>
      </div>
    </div>
  )
}
