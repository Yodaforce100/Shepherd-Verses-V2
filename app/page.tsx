'use client'

import { useState } from 'react'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Connection } from "@/components/connection"
import { HowItWorks } from "@/components/how-it-works"
import { Plans } from "@/components/plans"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Socials } from "@/components/socials"
import { Footer } from "@/components/footer"
import SignupModal from "@/components/signup-modal"

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<'monthly' | 'annual'>('monthly')

  const handleSignupClick = (tier: 'monthly' | 'annual' = 'monthly') => {
    setSelectedTier(tier)
    setIsSignupModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navbar onSignupClick={() => handleSignupClick('monthly')} />
      <main>
        <Hero onSignupClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} />
        <Connection />
        <HowItWorks />
        <Plans 
          onMonthlyClick={() => handleSignupClick('monthly')}
          onAnnualClick={() => handleSignupClick('annual')}
        />
        <Reviews />
        <FAQ />
        <Socials />
      </main>
      <Footer />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        tier={selectedTier}
      />
    </div>
  )
}
