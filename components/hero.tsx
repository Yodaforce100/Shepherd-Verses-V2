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
    <section id="hero" className="relative overflow-hidden" style={{ backgroundColor: '#F7F6F4' }}>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Image at top with fade to bottom */}
        <div className="relative h-64 sm:h-80">
          <Image
            src="/images/companion-moment.jpg"
            alt="A peaceful moment of reflection"
            fill
            className="object-cover object-[center_25%]"
          />
          {/* Gradient fade to bottom */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(247,246,244,0) 0%, rgba(247,246,244,0.3) 50%, rgba(247,246,244,1) 100%)',
            }}
          />
        </div>
        
        {/* Text content below image */}
        <div className="text-center px-4 -mt-4 pb-10">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SoundwaveBars />
            <span 
              className="font-sans text-xs font-medium tracking-widest uppercase"
              style={{ color: '#CF9D3E' }}
            >
              Spoken Scripture ✝
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-serif text-3xl leading-tight mb-2 text-balance font-bold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            style={{ color: '#001C5F' }}
          >
            Wake up to a voice that hears you
          </h1>

          {/* Subtitle */}
          <p 
            className="font-serif italic text-lg mb-4 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
            style={{ color: '#5E8DBF', fontWeight: 550 }}
          >
            and guides you with scripture and affirmations.
          </p>

          {/* Body Text */}
          <p 
            className="font-sans text-sm max-w-[320px] mx-auto mb-3 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
            style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
          >
            Share how you&apos;re feeling, and your <span style={{ fontWeight: 550 }}>Shepherd Verses</span> companion delivers calming, spoken scripture and affirmations—helping you find clarity and reassurance.
          </p>

          {/* Scripture Quote */}
          <p 
            className="font-sans italic text-[13px] max-w-[300px] mx-auto mb-6 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350"
            style={{ color: '#2A4B7C', lineHeight: '1.5', fontWeight: 450 }}
          >
            &quot;Come to me, all you who are weary and burdened, and I will give you rest.&quot; — Matthew 11:28
          </p>

          {/* CTA Button */}
          <Button 
            asChild
            className="font-sans font-bold text-base px-10 py-7 rounded-full hover:scale-105 transition-transform duration-300 mb-3 shadow-lg hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
            style={{
              background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
              color: '#001C5F',
              border: '2px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 24px rgba(212,185,106,0.5)',
            }}
          >
            <Link href="#plans">Start Your Morning with Peace</Link>
          </Button>

          {/* Trust Line */}
          <p 
            className="font-sans text-xs animate-in fade-in duration-700 delay-500"
            style={{ color: '#4A5568', opacity: 0.7 }}
          >
            Free 7-day trial · Cancel anytime
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative py-16">
        {/* Left Image with Fade to Right */}
        <div className="absolute inset-y-0 left-0 w-3/5 z-0">
          <Image
            src="/images/companion-moment.jpg"
            alt="A peaceful moment of reflection"
            fill
            className="object-cover object-center"
          />
          {/* Gradient fade to the right */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(247,246,244,0) 0%, rgba(247,246,244,0.3) 40%, rgba(247,246,244,0.8) 70%, rgba(247,246,244,1) 100%)',
            }}
          />
          {/* Additional top/bottom fade */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(247,246,244,0.3) 0%, rgba(247,246,244,0) 20%, rgba(247,246,244,0) 80%, rgba(247,246,244,0.3) 100%)',
            }}
          />
        </div>

        {/* Text Content - Right side */}
        <div className="relative z-10 container mx-auto px-8">
          <div className="flex justify-end py-8">
            <div className="max-w-md text-left mr-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <SoundwaveBars />
                <span 
                  className="font-sans text-base font-medium tracking-widest uppercase"
                  style={{ color: '#CF9D3E' }}
                >
                  Spoken Scripture ✝
                </span>
              </div>

              {/* Headline */}
              <h1 
                className="font-serif text-4xl lg:text-5xl leading-tight mb-4 text-balance font-bold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                style={{ color: '#001C5F' }}
              >
                Wake up to a voice that hears you
              </h1>

              {/* Subtitle */}
              <p 
                className="font-serif italic text-xl lg:text-2xl mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
                style={{ color: '#5E8DBF', fontWeight: 550 }}
              >
                and guides you with scripture and affirmations.
              </p>

              {/* Body Text */}
              <p 
                className="font-sans text-[15px] mb-4 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
              >
                Share how you&apos;re feeling, and your <span style={{ fontWeight: 550 }}>Shepherd Verses</span> companion delivers calming, spoken scripture and affirmations—helping you find clarity and reassurance.
              </p>

              {/* Scripture Quote */}
              <p 
                className="font-sans italic text-[14px] mb-8 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350"
                style={{ color: '#2A4B7C', lineHeight: '1.5', fontWeight: 450 }}
              >
                &quot;Come to me, all you who are weary and burdened, and I will give you rest.&quot; — Matthew 11:28
              </p>

              {/* CTA Button */}
              <Button 
                asChild
                className="font-sans font-bold text-lg px-14 py-8 rounded-full hover:scale-105 transition-transform duration-300 mb-4 shadow-lg hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
                style={{
                  background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                  color: '#001C5F',
                  border: '2px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 8px 24px rgba(212,185,106,0.5)',
                }}
              >
                <Link href="#plans">Start Your Morning with Peace</Link>
              </Button>

              {/* Trust Line */}
              <p 
                className="font-sans text-sm animate-in fade-in duration-700 delay-500"
                style={{ color: '#4A5568', opacity: 0.7 }}
              >
                Free 7-day trial · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
