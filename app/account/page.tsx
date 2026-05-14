'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Subscriber {
  id: string
  email: string
  first_name: string
  subscription_status: string
  tier: string
  preferred_time: string
  timezone: string
  stripe_customer_id: string
}

const TIME_OPTIONS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30', '21:00'
]

function formatTime(time: string) {
  if (!time) return '—'
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

const GOLD_BUTTON = {
  background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
  color: '#001C5F',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
}

const LABEL_STYLE = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#CF9D3E',
  marginBottom: '12px',
  marginTop: 0,
}

export default function AccountPage() {
  const router = useRouter()
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newTime, setNewTime] = useState('')
  const [timeSaved, setTimeSaved] = useState(false)
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  useEffect(() => {
    fetch('/api/account/me')
      .then(r => {
        if (r.status === 401) { router.push('/login'); return null }
        return r.json()
      })
      .then(data => {
        if (data?.subscriber) {
          setSubscriber(data.subscriber)
          setNewTime(data.subscriber.preferred_time || '07:00')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  async function saveTime() {
    setSaving(true)
    const res = await fetch('/api/account/update-time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferred_time: newTime })
    })
    setSaving(false)
    if (res.ok) {
      setSubscriber(prev => prev ? { ...prev, preferred_time: newTime } : prev)
      setTimeSaved(true)
      setTimeout(() => setTimeSaved(false), 3000)
    }
  }

  async function handleUpdatePayment() {
    const res = await fetch('/api/create-portal-session', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  async function handleCancel() {
    setCancelling(true)
    setCancelError('')
    const res = await fetch('/api/cancel-subscription', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setSubscriber(prev => prev ? { ...prev, subscription_status: 'canceled' } : prev)
      setCancelConfirm(false)
    } else {
      setCancelError(data.error || 'Something went wrong. Please try again.')
    }
    setCancelling(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F2F1EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <p style={{ color: '#2A4B7C' }}>Loading your account...</p>
      </div>
    )
  }

  if (!subscriber) return null

  const isCanceled = subscriber.subscription_status === 'canceled'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F1EE', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Navbar */}
      <div style={{ padding: '20px 32px' }}>
        <Link href="/">
          <Image src="/images/shepherd-verses-logo.svg" alt="Shepherd Verses" width={180} height={56} style={{ height: '40px', width: 'auto' }} />
        </Link>
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 16px 60px' }}>

        {/* Page heading */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ ...LABEL_STYLE, marginBottom: '4px' }}>My Account</p>
          <h1 style={{
            fontFamily: 'Marcellus, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#001C5F',
            margin: 0,
          }}>
            {subscriber.first_name ? `Welcome back, ${subscriber.first_name}` : 'Your Account'}
          </h1>
          <p style={{ color: '#2A4B7C', fontSize: '13px', marginTop: '4px' }}>{subscriber.email}</p>
        </div>

        {/* Subscription card */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <p style={LABEL_STYLE}>Subscription</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#001C5F', fontWeight: 600, margin: '0 0 2px', fontSize: '16px' }}>
                {subscriber.tier === 'annual' ? 'Annual Companion' : 'Monthly Companion'}
              </p>
              <p style={{ color: '#2A4B7C', fontSize: '13px', margin: 0 }}>
                {isCanceled ? 'Cancelled' : 'Active'}
              </p>
            </div>
            <span style={{
              backgroundColor: isCanceled ? '#FEE2E2' : '#D1FAE5',
              color: isCanceled ? '#DC2626' : '#065F46',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              {isCanceled ? 'Cancelled' : 'Active'}
            </span>
          </div>
        </div>

        {/* Daily message time card */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <p style={LABEL_STYLE}>Daily Message Time</p>
          <p style={{ color: '#2A4B7C', fontSize: '14px', marginBottom: '16px', marginTop: 0 }}>
            {subscriber.preferred_time
              ? <>Your message arrives at <strong style={{ color: '#001C5F' }}>{formatTime(subscriber.preferred_time)}</strong> ({subscriber.timezone})</>
              : 'No preferred time set yet.'
            }
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #E5E0D8',
                fontSize: '14px',
                color: '#001C5F',
                backgroundColor: 'white',
                outline: 'none',
              }}
            >
              {TIME_OPTIONS.map(t => (
                <option key={t} value={t}>{formatTime(t)}</option>
              ))}
            </select>
            <button
              onClick={saveTime}
              disabled={saving || newTime === subscriber.preferred_time}
              style={{
                padding: '12px 22px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: saving || newTime === subscriber.preferred_time ? 'not-allowed' : 'pointer',
                opacity: saving || newTime === subscriber.preferred_time ? 0.5 : 1,
                ...(saving || newTime === subscriber.preferred_time ? { background: '#E5E0D8', color: '#9CA3AF', border: 'none' } : GOLD_BUTTON),
              }}
            >
              {saving ? 'Saving...' : timeSaved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Billing card */}
        {!isCanceled && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <p style={LABEL_STYLE}>Billing</p>

            <button
              onClick={handleUpdatePayment}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '10px',
                ...GOLD_BUTTON,
              }}
            >
              Update payment method
            </button>

            {!cancelConfirm ? (
              <button
                onClick={() => setCancelConfirm(true)}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'white',
                  color: '#DC2626',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: '50px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel subscription
              </button>
            ) : (
              <div style={{ backgroundColor: '#FFF5F5', borderRadius: '12px', padding: '16px' }}>
                <p style={{ color: '#001C5F', fontSize: '14px', marginBottom: '12px', marginTop: 0 }}>
                  Are you sure? You'll keep access until the end of your billing period.
                </p>
                {cancelError && <p style={{ color: '#DC2626', fontSize: '13px', marginBottom: '10px' }}>{cancelError}</p>}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    style={{ flex: 1, padding: '11px', backgroundColor: '#DC2626', color: 'white', border: 'none', borderRadius: '50px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', opacity: cancelling ? 0.7 : 1 }}
                  >
                    {cancelling ? 'Cancelling...' : 'Yes, cancel'}
                  </button>
                  <button
                    onClick={() => { setCancelConfirm(false); setCancelError('') }}
                    style={{ flex: 1, padding: '11px', backgroundColor: 'white', color: '#001C5F', border: '1.5px solid #E5E0D8', borderRadius: '50px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Keep my account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', marginTop: '8px' }}>
          Questions? Email <a href="mailto:hello@shepherdverses.com" style={{ color: '#4A6FA5', textDecoration: 'none' }}>hello@shepherdverses.com</a>
        </p>

      </div>
    </div>
  )
}
