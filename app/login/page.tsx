'use client'

import { useState } from 'react'

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F1EE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>🙏</div>
        <h1 style={{
          fontFamily: 'Lora, serif',
          fontSize: '26px',
          color: '#3A4A5A',
          marginBottom: '8px',
          fontWeight: 600
        }}>
          Welcome back
        </h1>

        {!sent ? (
          <>
            <p style={{ color: '#4A5B6B', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
              Enter the email you signed up with and we'll send you a link to access your account.
            </p>

            <form onSubmit={handleSubmit}>
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
                  border: '1.5px solid #E7DED2',
                  fontSize: '15px',
                  color: '#3A4A5A',
                  backgroundColor: '#FAFAF9',
                  outline: 'none',
                  marginBottom: '16px',
                  boxSizing: 'border-box'
                }}
              />

              {error && (
                <p style={{ color: '#D88C7A', fontSize: '14px', marginBottom: '12px' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: '#3A4A5A',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading || !email ? 0.7 : 1
                }}
              >
                {loading ? 'Sending...' : 'Send me a link'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
            <h2 style={{
              fontFamily: 'Lora, serif',
              fontSize: '22px',
              color: '#3A4A5A',
              marginBottom: '12px'
            }}>
              Check your inbox
            </h2>
            <p style={{ color: '#4A5B6B', fontSize: '15px', lineHeight: 1.6 }}>
              We sent a login link to <strong>{email}</strong>. Click the link in the email to access your account.
            </p>
            <p style={{ color: '#A9C3D6', fontSize: '13px', marginTop: '16px' }}>
              Didn't get it? Check your spam folder or{' '}
              <button
                onClick={() => setSent(false)}
                style={{ color: '#3A4A5A', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '13px' }}
              >
                try again
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
