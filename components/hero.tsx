"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import styles from "./hero.module.css"

// Animated Soundwave Bars Component
function SoundwaveBars() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-5">
      <div className={`${styles.soundwaveBar} ${styles.bar1}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar2}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar3}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar4}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar5}`} />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image with Ken Burns Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 ${styles.kenBurnsBackground}`}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iStock-1470973831-hrm3ARDpThRJMcpKPkyK9JYNJ1mb9V.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              opacity: 0.72,
              filter: 'contrast(1.15) saturate(1.1)',
            }}
            priority
          />
        </div>
        {/* Gradient Overlay - light top → transparent middle → white bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-0 sm:px-4">
          {/* Eyebrow - #CF9D3E (gold), font-sans, text-base, font-medium, tracking-widest, uppercase */}
          <div className="flex items-center gap-3 mb-6">
            <SoundwaveBars />
            <span 
              className="font-sans text-base font-medium tracking-widest uppercase"
              style={{ color: '#CF9D3E' }}
            >
              Spoken Scripture ✝
            </span>
          </div>

          {/* Headline - #001C5F (navy), font-serif (Marcellus) */}
          <h1 
            className="font-serif text-3xl sm:text-4xl md:text-[44px] leading-tight mb-4 text-balance"
            style={{ color: '#001C5F' }}
          >
            Wake up to a voice that hears you
          </h1>

          {/* Subtitle - #5E8DBF (blue), font-serif, italic */}
          <p 
            className="font-serif italic text-lg sm:text-xl md:text-[22px] mb-6 text-balance"
            style={{ color: '#5E8DBF', fontWeight: 550 }}
          >
            and guides you with scripture and affirmations.
          </p>

          {/* Divider - #C5B49A (warm grey), h-px decorative */}
          <div className="w-16 h-px mb-8" style={{ backgroundColor: '#C5B49A' }} />

          {/* Body Text - #2A4B7C (dark blue), font-sans, text-[15px], leading-[1.7] */}
          <p 
            className="font-sans text-[15px] max-w-2xl mb-10 text-pretty"
            style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
          >
            Share how you&apos;re feeling, and your <span style={{ fontWeight: 550 }}>Shepherd Verses</span> companion delivers calming, spoken scripture and affirmations—helping you find clarity and reassurance throughout your day.
          </p>

          {/* CTA Button - #001C5F (navy), font-sans, font-medium */}
          <Button 
            asChild
            size="lg"
            className="font-sans font-medium text-[15px] px-8 sm:px-10 py-6 rounded-full hover:opacity-90 transition-opacity mb-4"
            style={{
              background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
              color: '#001C5F',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
            }}
          >
            <Link href="#plans">Start Your Morning with Peace</Link>
          </Button>

          {/* Trust Line - #4A5568 (grey), font-sans, text-xs, opacity-70 */}
          <p 
            className="font-sans text-xs mb-14"
            style={{ color: '#4A5568', opacity: 0.7 }}
          >
            Free 7-day trial · Cancel anytime
          </p>

          {/* Scripture Quote - #001C5F (navy), font-serif, italic, text-[15px] */}
          <blockquote className="font-serif italic text-[15px] sm:max-w-xl" style={{ color: '#001C5F', fontWeight: 650 }}>
            <p className="mb-2">
              <span className="hidden sm:inline">&quot;Come to me, all you who are weary and burdened, and I will give you rest.&quot;</span>
              <span className="sm:hidden">&quot;Come to me, all you who are weary and<br />burdened, and I will give you rest.&quot;</span>
            </p>
            {/* Scripture Reference - #001C5F (navy), font-serif, text-sm */}
            <footer className="font-serif text-sm not-italic" style={{ color: '#001C5F', fontWeight: 550 }}>
              — Matthew 11:28
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
