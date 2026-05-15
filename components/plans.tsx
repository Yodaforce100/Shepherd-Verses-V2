"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

// Gold Divider with text
function GoldDivider({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="w-12 h-px" style={{ backgroundColor: '#D9B86A' }} />
      <span 
        className="font-sans text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: '#D9B86A' }}
      >
        {text}
      </span>
      <div className="w-12 h-px" style={{ backgroundColor: '#D9B86A' }} />
    </div>
  )
}

const monthlyFeatures = [
  "Your daily Scripture delivered at your chosen time",
  "Received in Telegram as a voice and written message",
  "Cancel anytime",
]

const annualFeatures = [
  "Your daily Scripture delivered at your chosen time",
  "Received in Telegram as a voice and written message",
  { text: "2 months free", bold: true, suffix: " compared to monthly!" },
]

const trustBadges = [
  { icon: "🔒", text: "Secure Payment" },
  { icon: "✝", text: "Cancel Anytime" },
  { icon: "🎁", text: "3-Day Free Trial" },
]

interface PlansProps {
  onMonthlyClick?: () => void
  onAnnualClick?: () => void
}

export function Plans({ onMonthlyClick, onAnnualClick }: PlansProps) {
  return (
    <section id="plans" className="relative py-10 lg:py-14" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <GoldDivider text="Begin Today" />
          
          {/* Heading */}
          <h2 
            className="font-serif text-2xl lg:text-3xl leading-tight mb-3"
            style={{ color: '#001C5F' }}
          >
            Choose Your Subscription
          </h2>

          {/* Subtitle */}
          <p 
            className="font-sans text-lg lg:text-xl"
            style={{ color: '#5E8DBF', fontWeight: 500 }}
          >
            Wake up supported. Start your day guided.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-5 lg:gap-7 max-w-5xl mx-auto mb-12 px-4">
          
          {/* Monthly Plan Card */}
          <div 
            className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] bg-white rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col"
            style={{ border: '0.5px solid #D5CDB8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
          >
            {/* Plan Name */}
            <h3 
              className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 sm:mb-4"
              style={{ color: '#D4B96A' }}
            >
              Monthly Companion
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-5 sm:mb-6">
              <span 
                className="font-serif text-4xl sm:text-5xl"
                style={{ color: '#001C5F' }}
              >
                $5.95
              </span>
              <span 
                className="font-sans text-sm sm:text-base"
                style={{ color: '#6B7280' }}
              >
                / month
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              {monthlyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <div 
                    className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'rgba(94, 141, 191, 0.15)' }}
                  >
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: '#5E8DBF' }} />
                  </div>
                  <span 
                    className="font-sans text-sm sm:text-[15px]"
                    style={{ color: '#2A4B7C', lineHeight: '1.5', fontWeight: 450 }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={onMonthlyClick}
              className="w-full font-sans font-medium text-sm sm:text-[15px] py-5 sm:py-6 rounded-full transition-all mt-auto"
              style={{ 
                borderColor: '#D4B96A',
                color: '#001C5F',
                border: '1px solid #D4B96A',
                backgroundColor: 'transparent'
              }}
            >
              Start Monthly Plan
            </button>
          </div>

          {/* Annual Plan Card (Featured) */}
          <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] relative">
            {/* Best Value Badge */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-6 sm:px-8 py-1 sm:py-1.5 rounded-full font-sans text-[11px] sm:text-xs font-semibold whitespace-nowrap"
              style={{ 
                background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                color: '#001C5F',
                boxShadow: '0 2px 8px rgba(212,185,106,0.3)',
              }}
            >
              - Best Value -
            </div>

            <div 
              className="rounded-2xl p-4 sm:p-5 lg:p-6 h-full flex flex-col"
              style={{ 
                backgroundColor: '#001C5F',
                boxShadow: '0 8px 30px rgba(0,28,95,0.25)',
              }}
            >
              {/* Plan Name */}
              <h3 
                className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 sm:mb-4 mt-1 sm:mt-2"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Annual Journey
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-5 sm:mb-6">
                <span 
                  className="font-serif text-4xl sm:text-5xl"
                  style={{ color: '#D4B96A' }}
                >
                  $59.50
                </span>
                <span 
                  className="font-sans text-sm sm:text-base"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  / year
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                {annualFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <div 
                      className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: 'rgba(212,185,106,0.2)' }}
                    >
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: '#D4B96A' }} />
                    </div>
                    <span 
                      className="font-sans text-sm sm:text-[15px]"
                      style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.5', fontWeight: 450 }}
                    >
                      {typeof feature === 'string' ? feature : (
                        <><span style={{ fontWeight: 700 }}>{feature.text}</span>{feature.suffix}</>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={onAnnualClick}
                className="w-full font-sans font-medium text-sm sm:text-[15px] py-5 sm:py-6 rounded-full hover:opacity-90 transition-opacity mt-auto"
                style={{ 
                  background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                  color: '#001C5F',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
                }}
              >
                Start Annual Journey
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-base">{badge.icon}</span>
              <span 
                className="font-sans text-sm"
                style={{ color: '#2A4B7C', fontWeight: 450 }}
              >
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
