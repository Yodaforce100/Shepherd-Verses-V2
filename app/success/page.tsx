'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Simple redirect using window.location
      window.location.href = `/welcome?session_id=${sessionId}`
    }
  }, [sessionId])

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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#F7F6F4', minHeight: '100vh' }} />}>
      <SuccessContent />
    </Suspense>
  )
}
