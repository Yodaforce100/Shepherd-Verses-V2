'use client'

import { useState } from 'react'
import SignupForm from './signup-form'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  tier?: 'monthly' | 'annual'
}

export default function SignupModal({ isOpen, onClose, tier = 'monthly' }: SignupModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="rounded-2xl shadow-lg max-w-md w-full p-6 sm:p-8 relative flex flex-col"
          style={{
            backgroundColor: '#FFFFFF',
            border: '0.5px solid #D5CDB8',
            boxShadow: '0 8px 30px rgba(0,28,95,0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-lg font-light transition hover:opacity-50"
            style={{ color: '#001C5F' }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2
              className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-1"
              style={{ color: '#D4B96A' }}
            >
              {tier === 'monthly' ? 'Monthly Companion' : 'Annual Journey'}
            </h2>
            <p
              className="font-serif text-xl leading-tight"
              style={{ color: '#001C5F', fontWeight: 550 }}
            >
              Begin Your Journey
            </p>
            <p
              className="font-sans text-sm mt-2"
              style={{ color: '#5E8DBF', fontWeight: 450 }}
            >
              3-day free trial. Cancel anytime.
            </p>
          </div>

          {/* Form */}
          <SignupForm tier={tier} onSuccess={onClose} />
        </div>
      </div>
    </>
  )
}
