'use client'

import { useState } from 'react'
import Script from 'next/script'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Connection } from "@/components/connection"
import { HowItWorks } from "@/components/how-it-works"
import { Plans } from "@/components/plans"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Socials } from "@/components/socials"
import { Footer } from "@/components/footer"
import { BetaNoticeModal } from "@/components/beta-notice-modal"

// Paddle is loaded via the external script below; declare it for TypeScript.
declare global {
  interface Window {
    Paddle?: any
  }
}

const PADDLE_PRICE_IDS = {
  monthly: 'pri_01m252qz49m58t771bsbgb63pk',
  annual: 'pri_01m252r02n5epx3qa51h6zsdrt',
} as const

// Beta mode is on unless NEXT_PUBLIC_BETA_MODE is explicitly set to "false".
const IS_BETA_MODE = process.env.NEXT_PUBLIC_BETA_MODE !== 'false'

export default function Home() {
  const [paddleReady, setPaddleReady] = useState(false)

  // Sandbox/test-mode initialization once paddle.js has loaded.
  const initPaddle = () => {
    if (!window.Paddle) return
    window.Paddle.Environment.set('sandbox')
    window.Paddle.Initialize({ token: 'test_4bb8f015e77b1f5770360f672ba' })
    setPaddleReady(true)
  }

  const [betaNoticeOpen, setBetaNoticeOpen] = useState(false)

  const handlePlanClick = (tier: 'monthly' | 'annual') => {
    if (IS_BETA_MODE) {
      setBetaNoticeOpen(true)
      return
    }
    openCheckout(tier)
  }

  const openCheckout = (tier: 'monthly' | 'annual') => {
    if (!window.Paddle) return
    window.Paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_IDS[tier], quantity: 1 }],
      settings: {
        // After a successful payment, send the customer to the connect page.
        successUrl: `${window.location.origin}/connect`,
      },
    })
  }

  return (
    <div className="min-h-screen">
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
        onLoad={initPaddle}
      />
      <Navbar onSignupClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} />
      <main>
        <Hero onSignupClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} />
        <Connection />
        <HowItWorks />
        <Plans 
          onMonthlyClick={() => handlePlanClick('monthly')}
          onAnnualClick={() => handlePlanClick('annual')}
        />
        <Reviews />
        <FAQ />
        <Socials />
      </main>
      <Footer />
      <BetaNoticeModal open={betaNoticeOpen} onOpenChange={setBetaNoticeOpen} />
    </div>
  )
}
