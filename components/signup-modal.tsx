'use client'

import { useState } from 'react'
import SignupForm from './signup-form'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  tier?: string
}

export default function SignupModal({ isOpen, onClose, tier = 'companion' }: SignupModalProps) {
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
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
          style={{
            backgroundColor: '#FAFAF8',
            border: '1px solid #E8E6E0'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-light transition hover:opacity-50"
            style={{ color: '#001C5F' }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2
              className="font-serif text-2xl mb-1"
              style={{ color: '#001C5F' }}
            >
              Companion Tier
            </h2>
            <p
              className="text-sm"
              style={{ color: '#5E8DBF' }}
            >
              7-day free trial. Cancel anytime.
            </p>
          </div>

          {/* Form */}
          <SignupForm tier={tier} onSuccess={onClose} />
        </div>
      </div>
    </>
  )
}
