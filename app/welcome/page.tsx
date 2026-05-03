'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'

function WelcomeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const email = searchParams.get('email')
  const plan = searchParams.get('plan') || 'companion'
  const trialDays = 3
  
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  // Calculate trial end date (3 days from now)
  const trialEndDate = new Date()
  trialEndDate.setDate(trialEndDate.getDate() + trialDays)
  const formattedEndDate = trialEndDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const handleSendEmail = async () => {
    if (!email) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/send-telegram-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6" style={{ backgroundColor: '#F7F6F4' }}>
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full">
          {/* Success Icon */}
          <div className="text-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'rgba(94, 200, 150, 0.15)' }}
            >
              <Check className="w-8 h-8" style={{ color: '#5EC896' }} strokeWidth={3} />
            </div>

            {/* Success Text */}
            <p 
              className="font-sans text-sm font-semibold mb-2"
              style={{ color: '#5EC896' }}
            >
              ✓ PAYMENT SUCCESSFUL
            </p>

            {/* Heading */}
            <h1 
              className="font-serif text-2xl sm:text-3xl mb-2"
              style={{ color: '#001C5F' }}
            >
              Welcome to Shepherd Verses!
            </h1>

            {/* Subheading */}
            <p 
              className="font-sans text-base"
              style={{ color: '#5E8DBF' }}
            >
              Your subscription is active.
            </p>
          </div>

          {/* Subscription Details - Compact */}
          <div 
            className="rounded-xl p-3 sm:p-4 mb-4 text-sm"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5CDB8',
            }}
          >
            <div className="space-y-2">
              <div>
                <p style={{ color: '#5E8DBF', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Plan</p>
                <p style={{ color: '#001C5F', fontWeight: 'bold', fontSize: '14px' }}>
                  {plan === 'annual' ? 'Annual Journey' : 'Monthly Companion'}
                </p>
              </div>
              <div>
                <p style={{ color: '#5E8DBF', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Trial Ends</p>
                <p style={{ color: '#001C5F', fontWeight: 'bold', fontSize: '14px' }}>
                  {formattedEndDate}
                </p>
              </div>
              <div>
                <p style={{ color: '#5E8DBF', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Email</p>
                <input 
                  type="email"
                  value={email || ''}
                  disabled
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #D5CDB8',
                    fontSize: '13px',
                    color: '#001C5F',
                    backgroundColor: '#F9F8F6',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Next Steps - Compact */}
          <h2 
            className="font-serif text-lg mb-3"
            style={{ color: '#001C5F' }}
          >
            Connect to Telegram
          </h2>

          {/* Steps - Condensed */}
          <div className="space-y-2 mb-4">
            {/* Step 1 */}
            <div className="flex gap-2 text-sm">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
              >
                1
              </div>
              <div>
                <p style={{ color: '#001C5F', fontWeight: 'bold', fontSize: '13px' }}>Click button below</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-2 text-sm">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
              >
                2
              </div>
              <div>
                <p style={{ color: '#001C5F', fontWeight: 'bold', fontSize: '13px' }}>Click /start in bot</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-2 text-sm">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
              >
                3
              </div>
              <div>
                <p style={{ color: '#001C5F', fontWeight: 'bold', fontSize: '13px' }}>Set your message time</p>
              </div>
            </div>
          </div>

          {!emailSent ? (
            <>
              {/* Primary CTA: Open Telegram */}
              <a 
                href="https://t.me/ShepherdVersesBot?start=connect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center font-sans font-medium text-sm py-3 px-8 rounded-full transition-all mb-2 mx-auto block"
                style={{
                  background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                  color: '#001C5F',
                  textDecoration: 'none',
                }}
              >
                Open Telegram Bot →
              </a>

              {/* Secondary Option: Email */}
              <button
                onClick={handleSendEmail}
                disabled={loading}
                className="block mx-auto font-sans font-medium text-xs py-2 px-6 rounded-full transition-all text-center"
                style={{
                  color: '#5E8DBF',
                  backgroundColor: 'transparent',
                  border: '1px solid #D5CDB8',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Sending...' : 'Email link instead'}
              </button>
            </>
          ) : (
            <div 
              className="p-2 rounded text-center text-xs"
              style={{ backgroundColor: 'rgba(94, 200, 150, 0.1)' }}
            >
              <p style={{ color: '#5EC896' }}>
                ✓ Check your email! We'll remind you in 24 hours.
              </p>
            </div>
          )}

          {/* Helper Text */}
          <p 
            className="text-center font-sans text-xs mt-3"
            style={{ color: '#5E8DBF' }}
          >
            Questions? Email support@shepherdverses.com
          </p>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="text-center mt-4">
        <a 
          href="/"
          className="font-serif text-lg inline-block"
          style={{ color: '#001C5F', textDecoration: 'none' }}
        >
          🙏 Shepherd Verses
        </a>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#F7F6F4', minHeight: '100vh' }} />}>
      <WelcomeContent />
    </Suspense>
  )
}
