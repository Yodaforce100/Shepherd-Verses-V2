'use client'

import { useState, useEffect } from 'react'

// Country-to-Timezones mapping
const COUNTRY_TIMEZONES: Record<string, { name: string; zones: string[] }> = {
  AU: {
    name: 'Australia',
    zones: ['Sydney / Melbourne', 'Adelaide', 'Brisbane', 'Perth', 'Darwin']
  },
  US: {
    name: 'United States',
    zones: ['EST (East)', 'CST (Central)', 'MST (Mountain)', 'PST (Pacific)', 'AKT (Alaska)', 'HST (Hawaii)']
  },
  CA: {
    name: 'Canada',
    zones: ['EST (East)', 'CST (Central)', 'MST (Mountain)', 'PST (Pacific)']
  },
  GB: {
    name: 'United Kingdom',
    zones: ['GMT (UTC+0)', 'BST (UTC+1)']
  },
  NZ: {
    name: 'New Zealand',
    zones: ['NZDT (Summer)', 'NZST (Winter)']
  },
  IE: {
    name: 'Ireland',
    zones: ['GMT (UTC+0)', 'IST (UTC+1)']
  },
  DE: {
    name: 'Germany',
    zones: ['CET (UTC+1)', 'CEST (UTC+2)']
  },
  FR: {
    name: 'France',
    zones: ['CET (UTC+1)', 'CEST (UTC+2)']
  },
  JP: {
    name: 'Japan',
    zones: ['JST (Japan Standard)']
  },
  SG: {
    name: 'Singapore',
    zones: ['SGT (Singapore)']
  },
  IN: {
    name: 'India',
    zones: ['IST (India Standard)']
  },
  BR: {
    name: 'Brazil',
    zones: ['BRT (Brasília)', 'BRST (Summer)']
  },
  MX: {
    name: 'Mexico',
    zones: ['CST (Central)', 'MST (Mountain)', 'PST (Pacific)']
  },
  ZA: {
    name: 'South Africa',
    zones: ['SAST (South African)']
  },
  OTHER: {
    name: 'Other',
    zones: []
  }
}

const COUNTRIES = Object.entries(COUNTRY_TIMEZONES).map(([code, data]) => ({
  code,
  name: data.name
})).sort((a, b) => a.name.localeCompare(b.name))

interface SignupFormProps {
  tier?: string
  onSuccess?: () => void
}

export default function SignupForm({ tier = 'companion', onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [timezone, setTimezone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [availableTimezones, setAvailableTimezones] = useState<string[]>([])

  // Geolocation on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const countryCode = data.country_code || ''
        
        if (COUNTRY_TIMEZONES[countryCode]) {
          setCountry(countryCode)
        } else {
          setCountry('AU')
        }
      } catch (err) {
        setCountry('AU')
      }
    }

    detectCountry()
  }, [])

  // Update timezone options when country changes
  useEffect(() => {
    if (country) {
      const zones = COUNTRY_TIMEZONES[country]?.zones || []
      setAvailableTimezones(zones)
      setTimezone('')
    }
  }, [country])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (!country) {
      setError('Please select a country')
      return
    }

    if (!timezone) {
      setError('Please select a timezone')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_1TS82YCBvG3oASGPZMgxEpk4',
          tier,
          customerEmail: email,
          country,
          timezone,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `Error: ${response.status}`)
      }

      const data = await response.json()
      if (data.url) {
        // Store email in localStorage for welcome page fallback
        if (typeof window !== 'undefined') {
          localStorage.setItem('signup_email', email)
        }
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label 
          className="block font-sans text-sm font-semibold tracking-[0.15em] uppercase mb-2"
          style={{ color: '#001C5F' }}
        >
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 transition"
          style={{
            borderColor: '#D5CDB8',
            border: '1px solid #D5CDB8',
            color: '#001C5F',
            fontSize: '15px'
          }}
        />
      </div>

      {/* Country */}
      <div>
        <label 
          className="block font-sans text-sm font-semibold tracking-[0.15em] uppercase mb-2"
          style={{ color: '#001C5F' }}
        >
          Country
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 transition"
          style={{
            borderColor: '#D5CDB8',
            border: '1px solid #D5CDB8',
            color: country ? '#001C5F' : '#999',
            fontSize: '15px'
          }}
        >
          <option value="">Select your country...</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Timezone */}
      {country && availableTimezones.length > 0 && (
        <div>
          <label 
            className="block font-sans text-sm font-semibold tracking-[0.15em] uppercase mb-2"
            style={{ color: '#001C5F' }}
          >
            Timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 transition"
            style={{
              borderColor: '#D5CDB8',
              border: '1px solid #D5CDB8',
              color: timezone ? '#001C5F' : '#999',
              fontSize: '15px'
            }}
          >
            <option value="">Select your timezone...</option>
            {availableTimezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div 
          className="rounded-lg p-3"
          style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5'
          }}
        >
          <p style={{ color: '#DC2626' }} className="text-sm font-sans">
            {error}
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-sans font-medium text-sm sm:text-[15px] py-5 sm:py-6 rounded-full hover:opacity-90 transition-opacity mt-6"
        style={{
          background: loading 
            ? '#999' 
            : 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
          color: '#001C5F',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing...' : 'Begin Your Free Trial'}
      </button>

      {/* Helper text */}
      <p className="text-xs text-center font-sans" style={{ color: '#6B7280' }}>
        Takes 30 seconds. Stripe handles payment securely.
      </p>
    </form>
  )
}
