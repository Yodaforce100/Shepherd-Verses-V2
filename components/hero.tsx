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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-16 flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-0 sm:px-4 w-full">
          {/* Eyebrow - #CF9D3E (gold), font-sans, text-base, font-medium, tracking-widest, uppercase */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SoundwaveBars />
            <span 
              className="font-sans text-sm sm:text-base font-medium tracking-widest uppercase"
              style={{ color: '#CF9D3E' }}
            >
              Spoken Scripture ✝
            </span>
          </div>

          {/* Headline - #001C5F (navy), font-serif (Marcellus) - LARGER & BOLDER */}
          <h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 sm:mb-8 text-balance font-bold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            style={{ color: '#001C5F' }}
          >
            Wake up to a voice that hears you
          </h1>

          {/* Subtitle - #5E8DBF (blue), font-serif, italic */}
          <p 
            className="font-serif italic text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
            style={{ color: '#5E8DBF', fontWeight: 550 }}
          >
            and guides you with scripture and affirmations.
          </p>

          {/* Divider - #C5B49A (warm grey), h-px decorative - LARGER */}
          <div className="w-20 h-px mb-10 sm:mb-12 animate-in fade-in duration-700 delay-300" style={{ backgroundColor: '#C5B49A' }} />

          {/* Body Text - #2A4B7C (dark blue), font-sans, text-[15px], leading-[1.7] */}
          <p 
            className="font-sans text-base sm:text-[16px] max-w-2xl mb-12 sm:mb-16 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
            style={{ color: '#2A4B7C', lineHeight: '1.8', fontWeight: 450 }}
          >
            Share how you&apos;re feeling, and your <span style={{ fontWeight: 550 }}>Shepherd Verses</span> companion delivers calming, spoken scripture and affirmations—helping you find clarity and reassurance.
          </p>

          {/* CTA Button - MUCH LARGER, STRONGER PRESENCE */}
          <Button 
            asChild
            className="font-sans font-bold text-base sm:text-lg px-10 sm:px-14 py-7 sm:py-8 rounded-full hover:scale-105 transition-transform duration-300 mb-6 sm:mb-8 shadow-lg hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
            style={{
              background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
              color: '#001C5F',
              border: '2px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 24px rgba(212,185,106,0.5)',
            }}
          >
            <Link href="#plans">Start Your Morning with Peace</Link>
          </Button>

          {/* Trust Line - #4A5568 (grey), font-sans, text-xs, opacity-70 */}
          <p 
            className="font-sans text-xs sm:text-sm mb-16 sm:mb-20 animate-in fade-in duration-700 delay-600"
            style={{ color: '#4A5568', opacity: 0.7 }}
          >
            Free 7-day trial · Cancel anytime
          </p>

          {/* Scripture Quote - #001C5F (navy), font-serif, italic, text-[15px] */}
          <blockquote className="font-serif italic text-base sm:text-[16px] sm:max-w-xl animate-in fade-in duration-700 delay-700" style={{ color: '#001C5F', fontWeight: 650 }}>
            <p className="mb-3 leading-relaxed">
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
