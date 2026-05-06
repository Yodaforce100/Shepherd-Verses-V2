'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Fetch session data to get email and plan
      const fetchAndRedirect = async () => {
        try {
          const response = await fetch(`/api/get-session-data?session_id=${sessionId}`)
          const data = await response.json()
          
          if (data.email && data.plan) {
            // Redirect with email and plan included
            window.location.href = `/welcome?session_id=${sessionId}&email=${encodeURIComponent(data.email)}&plan=${encodeURIComponent(data.plan)}`
          } else {
            // Fallback redirect with just session_id
            window.location.href = `/welcome?session_id=${sessionId}`
          }
        } catch (error) {
          console.error('Error fetching session data:', error)
          // Fallback redirect
          window.location.href = `/welcome?session_id=${sessionId}`
        }
      }
      
      fetchAndRedirect()
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
