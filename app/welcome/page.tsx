'use client'

import { Suspense, useState } from 'react'
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
    <div className="min-h-screen flex flex-col px-4 py-8" style={{ backgroundColor: '#F7F6F4' }}>
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full">
          {/* Success Icon & Heading */}
          <div className="text-center mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(94, 200, 150, 0.15)' }}
            >
              <Check className="w-8 h-8" style={{ color: '#5EC896' }} strokeWidth={3} />
            </div>

            <p 
              className="font-sans text-sm font-semibold mb-2"
              style={{ color: '#5EC896' }}
            >
              ✓ PAYMENT SUCCESSFUL
            </p>

            <h1 
              className="font-serif text-2xl mb-3"
              style={{ color: '#001C5F' }}
            >
              Welcome to Shepherd Verses!
            </h1>

            <p 
              className="font-sans text-sm"
              style={{ color: '#5E8DBF', lineHeight: '1.6' }}
            >
              Your subscription is confirmed. Now let's connect you to Telegram so you can start receiving your daily messages.
            </p>
          </div>

          {/* Subscription Details - Minimal */}
          <div 
            className="rounded-lg p-4 mb-6 text-xs"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5CDB8',
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p style={{ color: '#5E8DBF', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Plan</p>
                <p style={{ color: '#001C5F', fontWeight: 'bold' }}>
                  {plan === 'annual' ? 'Annual Journey' : 'Monthly Companion'}
                </p>
              </div>
              <div className="text-right">
                <p style={{ color: '#5E8DBF', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Trial Ends</p>
                <p style={{ color: '#001C5F', fontWeight: 'bold' }}>
                  {formattedEndDate}
                </p>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: '#D5CDB8', paddingTop: '8px', marginTop: '8px' }}>
              <p style={{ color: '#5E8DBF', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Email</p>
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
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Telegram Connection Box */}
          <div 
            className="rounded-lg p-5 mb-6"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5CDB8',
            }}
          >
            <h2 
              className="font-serif text-base mb-4"
              style={{ color: '#001C5F' }}
            >
              Connect to Telegram
            </h2>

            {/* Steps */}
            <div className="space-y-3 mb-5">
              {/* Step 1 */}
              <div className="flex gap-3 text-sm">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
                >
                  1
                </div>
                <p style={{ color: '#001C5F', margin: 'auto 0' }}>Click button below to open Telegram</p>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 text-sm">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
                >
                  2
                </div>
                <p style={{ color: '#001C5F', margin: 'auto 0' }}>Click /start and confirm your email</p>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 text-sm">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
                >
                  3
                </div>
                <p style={{ color: '#001C5F', margin: 'auto 0' }}>Set your preferred message time</p>
              </div>
            </div>

            {/* CTA Buttons */}
            {!emailSent ? (
              <>
                {/* Primary Button */}
                <a 
                  href="https://t.me/ShepherdVersesBot?start=connect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-sans font-medium text-sm py-3 rounded-full transition-all mb-3"
                  style={{
                    background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                    color: '#001C5F',
                    textDecoration: 'none',
                  }}
                >
                  Open Telegram Bot →
                </a>

                {/* Secondary Button */}
                <button
                  onClick={handleSendEmail}
                  disabled={loading}
                  className="w-full block text-center font-sans font-medium text-sm py-3 rounded-full transition-all"
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
                className="p-3 rounded text-center text-sm"
                style={{ backgroundColor: 'rgba(94, 200, 150, 0.1)' }}
              >
                <p style={{ color: '#5EC896' }}>
                  ✓ Check your email! We'll remind you in 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Help Text */}
          <p 
            className="text-center font-sans text-xs"
            style={{ color: '#5E8DBF' }}
          >
            Questions? Email support@shepherdverses.com
          </p>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="text-center mt-6">
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
