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
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(94, 141, 191, 0.15)' }}
          >
            <Check className="w-10 h-10" style={{ color: '#5E8DBF' }} strokeWidth={3} />
          </div>

          {/* Heading */}
          <h1 
            className="font-serif text-3xl sm:text-4xl mb-3"
            style={{ color: '#001C5F' }}
          >
            Welcome to Shepherd Verses!
          </h1>

          {/* Subheading */}
          <p 
            className="font-sans text-lg mb-2"
            style={{ color: '#5E8DBF' }}
          >
            Your subscription is active.
          </p>
        </div>

        {/* Subscription Details Card */}
        <div 
          className="rounded-2xl p-6 sm:p-8 mb-8"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #D5CDB8',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}
        >
          <div className="mb-6">
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Plan</p>
            <p 
              className="font-serif text-xl"
              style={{ color: '#001C5F' }}
            >
              {plan === 'annual' ? 'Annual Journey' : 'Monthly Companion'}
            </p>
          </div>

          <div className="mb-6">
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Free Trial Ends</p>
            <p 
              className="font-serif text-xl"
              style={{ color: '#001C5F' }}
            >
              {formattedEndDate}
            </p>
          </div>

          <div>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>Email</p>
            <p 
              className="font-sans text-base"
              style={{ color: '#666' }}
            >
              {email || 'your email'}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 
            className="font-serif text-xl mb-6"
            style={{ color: '#001C5F' }}
          >
            Next: Connect to Telegram
          </h2>

          {/* Step 1 */}
          <div className="flex gap-4 mb-6">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
            >
              1
            </div>
            <div>
              <p 
                className="font-sans font-semibold mb-1"
                style={{ color: '#001C5F' }}
              >
                Click the button below
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Open Telegram and join our bot
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 mb-6">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
            >
              2
            </div>
            <div>
              <p 
                className="font-sans font-semibold mb-1"
                style={{ color: '#001C5F' }}
              >
                Click /start
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Confirm your email to link your account
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 mb-8">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#D9B86A', color: '#FFFFFF' }}
            >
              3
            </div>
            <div>
              <p 
                className="font-sans font-semibold mb-1"
                style={{ color: '#001C5F' }}
              >
                Set your time
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Choose when you want to receive your daily message
              </p>
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
              className="w-full block text-center font-sans font-medium text-base py-4 rounded-full transition-all mb-4"
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
              className="w-full font-sans font-medium text-sm py-3 rounded-full transition-all text-center"
              style={{
                color: '#5E8DBF',
                backgroundColor: 'transparent',
                border: '1px solid #D5CDB8',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Sending...' : 'Send me the link via email instead'}
            </button>
          </>
        ) : (
          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: 'rgba(94, 141, 191, 0.1)' }}
          >
            <p 
              className="font-sans"
              style={{ color: '#5E8DBF' }}
            >
              ✓ Check your email! We've sent you the Telegram link. 
              <br />
              <span style={{ fontSize: '14px' }}>We'll also remind you in 24 hours.</span>
            </p>
          </div>
        )}

        {/* Helper Text */}
        <p 
          className="text-center font-sans text-sm mt-6"
          style={{ color: '#999' }}
        >
          Need help? Email us at support@shepherdverses.com
        </p>
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
