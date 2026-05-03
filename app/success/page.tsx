'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const redirectToWelcome = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        // Fetch session data from our API to get email and plan
        const response = await fetch(`/api/get-session-data?session_id=${sessionId}`)
        
        if (response.ok) {
          const data = await response.json()
          // Redirect to welcome with session data
          const params = new URLSearchParams({
            session_id: sessionId,
            email: data.email || '',
            plan: data.plan || 'companion',
          })
          router.push(`/welcome?${params.toString()}`)
        } else {
          // Fallback: redirect without data
          router.push(`/welcome?session_id=${sessionId}`)
        }
      } catch (error) {
        console.error('Error fetching session data:', error)
        // Fallback: redirect without data
        router.push(`/welcome?session_id=${sessionId}`)
      }
    }

    redirectToWelcome()
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
