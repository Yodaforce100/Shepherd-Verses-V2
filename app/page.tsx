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

export default function Home() {
  const [paddleReady, setPaddleReady] = useState(false)

  // Sandbox/test-mode initialization once paddle.js has loaded.
  const initPaddle = () => {
    if (!window.Paddle) return
    window.Paddle.Environment.set('sandbox')
    window.Paddle.Initialize({ token: 'test_4bb8f015e77b1f5770360f672ba' })
    setPaddleReady(true)
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
        <HowItWorks />
        <Connection />
        <Plans 
          onMonthlyClick={() => openCheckout('monthly')}
          onAnnualClick={() => openCheckout('annual')}
        />
        <Reviews />
        <FAQ />
        <Socials />
      </main>
      <Footer />
    </div>
  )
}
