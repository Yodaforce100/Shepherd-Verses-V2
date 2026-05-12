'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Subscriber {
  id: string
  email: string
  first_name: string
  subscription_status: string
  tier: string
  preferred_time: string
  timezone: string
  trial_ends_at?: string
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
      <div style={{ minHeight: '100vh', backgroundColor: '#F2F1EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#4A5B6B', fontFamily: 'Inter, sans-serif' }}>Loading your account...</p>
      </div>
    )
  }

  if (!subscriber) return null

  const isCanceled = subscriber.subscription_status === 'canceled'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F1EE', padding: '32px 16px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🙏</div>
          <h1 style={{ fontFamily: 'Lora, serif', fontSize: '26px', color: '#3A4A5A', margin: 0 }}>
            Your Account
          </h1>
          <p style={{ color: '#4A5B6B', fontSize: '14px', marginTop: '4px' }}>{subscriber.email}</p>
        </div>

        {/* Subscription Status */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#A9C3D6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', marginTop: 0 }}>
            Subscription
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#3A4A5A', fontWeight: 500, margin: '0 0 4px' }}>
                {subscriber.tier === 'annual' ? 'Annual Companion' : 'Monthly Companion'}
              </p>
              <p style={{ color: '#4A5B6B', fontSize: '14px', margin: 0 }}>
                {isCanceled ? 'Cancelled' : 'Active'}
              </p>
            </div>
            <span style={{
              backgroundColor: isCanceled ? '#F9E8E4' : '#E8F4ED',
              color: isCanceled ? '#D88C7A' : '#4A8C6A',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500
            }}>
              {isCanceled ? 'Cancelled' : 'Active'}
            </span>
          </div>
        </div>

        {/* Preferred Time */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#A9C3D6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', marginTop: 0 }}>
            Daily Message Time
          </h2>
          <p style={{ color: '#4A5B6B', fontSize: '14px', marginBottom: '16px', marginTop: 0 }}>
            Your message arrives at <strong>{formatTime(subscriber.preferred_time)}</strong> ({subscriber.timezone})
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #E7DED2',
                fontSize: '14px',
                color: '#3A4A5A',
                backgroundColor: '#FAFAF9',
                outline: 'none'
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
                padding: '10px 20px',
                backgroundColor: '#3A4A5A',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                opacity: saving || newTime === subscriber.preferred_time ? 0.6 : 1,
                whiteSpace: 'nowrap'
              }}
            >
              {saving ? 'Saving...' : timeSaved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Billing Actions */}
        {!isCanceled && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#A9C3D6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', marginTop: 0 }}>
              Billing
            </h2>
            <button
              onClick={handleUpdatePayment}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'white',
                color: '#3A4A5A',
                border: '1.5px solid #E7DED2',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              Update payment method
            </button>

            {!cancelConfirm ? (
              <button
                onClick={() => setCancelConfirm(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'white',
                  color: '#D88C7A',
                  border: '1.5px solid #F0D8D2',
                  borderRadius: '10px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel subscription
              </button>
            ) : (
              <div style={{ backgroundColor: '#FDF4F2', borderRadius: '10px', padding: '16px' }}>
                <p style={{ color: '#3A4A5A', fontSize: '14px', marginBottom: '12px', marginTop: 0 }}>
                  Are you sure? You'll keep access until the end of your billing period.
                </p>
                {cancelError && (
                  <p style={{ color: '#D88C7A', fontSize: '13px', marginBottom: '10px' }}>{cancelError}</p>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    style={{
                      flex: 1, padding: '10px', backgroundColor: '#D88C7A', color: 'white',
                      border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
                      opacity: cancelling ? 0.7 : 1
                    }}
                  >
                    {cancelling ? 'Cancelling...' : 'Yes, cancel'}
                  </button>
                  <button
                    onClick={() => { setCancelConfirm(false); setCancelError('') }}
                    style={{
                      flex: 1, padding: '10px', backgroundColor: 'white', color: '#3A4A5A',
                      border: '1.5px solid #E7DED2', borderRadius: '8px', fontSize: '14px', cursor: 'pointer'
                    }}
                  >
                    Keep my account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#A9C3D6', fontSize: '13px' }}>
          Need help? Email <a href="mailto:hello@shepherdverses.com" style={{ color: '#4A5B6B' }}>hello@shepherdverses.com</a>
        </p>

      </div>
    </div>
  )
}
