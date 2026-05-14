'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F1EE', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Navbar */}
      <div style={{ padding: '20px 32px' }}>
        <Link href="/">
          <Image src="/images/shepherd-verses-logo-new.png" alt="Shepherd Verses" width={180} height={56} style={{ height: '40px', width: 'auto' }} />
        </Link>
      </div>

      {/* Card */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px 36px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        }}>

          {!sent ? (
            <>
              {/* Eyebrow */}
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#CF9D3E',
                marginBottom: '8px',
                marginTop: 0,
              }}>
                My Account
              </p>

              {/* Heading */}
              <h1 style={{
                fontFamily: 'Marcellus, Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#001C5F',
                marginBottom: '8px',
                marginTop: 0,
              }}>
                Welcome Back
              </h1>

              <p style={{ color: '#2A4B7C', fontSize: '14px', marginBottom: '28px', marginTop: 0, lineHeight: 1.5 }}>
                Enter your email and we'll send you a link to access your account.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Label */}
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#001C5F',
                  marginBottom: '8px',
                }}>
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #E5E0D8',
                    fontSize: '15px',
                    color: '#001C5F',
                    backgroundColor: 'white',
                    outline: 'none',
                    marginBottom: '8px',
                    boxSizing: 'border-box',
                  }}
                />

                {error && (
                  <p style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '50px',
                    background: loading || !email
                      ? '#E5E0D8'
                      : 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                    color: '#001C5F',
                    fontSize: '15px',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: loading || !email ? 'none' : '0 4px 14px rgba(212,185,106,0.4)',
                    cursor: loading || !email ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                  }}
                >
                  {loading ? 'Sending...' : 'Send me a link'}
                </button>
              </form>

              <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '12px', marginTop: '20px' }}>
                Takes 30 seconds · Secure login, no password needed
              </p>
            </>
          ) : (
            <>
              {/* Success state */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#EDF2F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '28px',
                }}>
                  ✉️
                </div>

                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#CF9D3E',
                  marginBottom: '8px',
                }}>
                  Check Your Inbox
                </p>

                <h2 style={{
                  fontFamily: 'Marcellus, Georgia, serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#001C5F',
                  marginBottom: '12px',
                  marginTop: 0,
                }}>
                  Link sent!
                </h2>

                <p style={{ color: '#2A4B7C', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  We sent a login link to <strong>{email}</strong>. Click the link in the email to access your account.
                </p>

                <p style={{ color: '#9CA3AF', fontSize: '13px' }}>
                  Didn't get it? Check your spam folder or{' '}
                  <button
                    onClick={() => setSent(false)}
                    style={{ color: '#001C5F', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '13px', padding: 0 }}
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
