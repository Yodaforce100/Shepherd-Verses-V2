"use client"

import Image from "next/image"
import styles from "./connection.module.css"

// Animated Soundwave Bars Component (blue version for card)
function SoundwaveBars() {
  return (
    <div className="flex items-center justify-center gap-[2px] h-4">
      <div className={`${styles.soundwaveBar} ${styles.bar1}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar2}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar3}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar4}`} />
      <div className={`${styles.soundwaveBar} ${styles.bar5}`} />
    </div>
  )
}

// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
      <span style={{ color: '#D9B86A', fontSize: '24px' }}>✝</span>
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
    </div>
  )
}

const moods = [
  { emoji: "😔", label: "Heavy" },
  { emoji: "😟", label: "Anxious" },
  { emoji: "😌", label: "Peaceful" },
  { emoji: "🥱", label: "Tired" },
  { emoji: "🙏", label: "Grateful" },
  { emoji: "😊", label: "Hopeful" },
]

export function Connection() {
  return (
    <section id="connection" className="relative py-12 lg:pt-10 lg:pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iStock-2235714260-pNwLID32nyWS4sxboLyvcUVB1ZYjT4.jpg"
          alt=""
          fill
          className="object-cover"
          style={{
            opacity: 0.35,
            filter: 'saturate(0.2) hue-rotate(180deg) brightness(1.2) grayscale(0.4)',
          }}
        />
        {/* White gradient fade from top */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,0.95) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-20 px-4">
          
          {/* Mobile: Heading above card */}
          <div className="lg:hidden w-full text-center mb-6 order-first">
            <CrossDivider />
            <h2 
              className="font-serif text-2xl sm:text-3xl leading-tight mb-2"
              style={{ color: '#001C5F' }}
            >
              A companion for every
            </h2>
            <p 
              className="font-serif text-xl sm:text-2xl"
              style={{ color: '#5E8DBF', fontWeight: 550 }}
            >
              moment of your day
            </p>
          </div>

          {/* Left: Mood Selector Card */}
          <div className="w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]">
            <div 
              className="bg-white rounded-2xl shadow-lg p-3 sm:p-4"
              style={{ border: '0.5px solid #D5CDB8', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
            >
              {/* Card Header */}
              <h3 
                className="font-sans text-xs font-semibold tracking-wider uppercase text-center mb-3 sm:mb-4"
                style={{ color: '#2A4B7C' }}
              >
                How are you feeling this morning?
              </h3>

              {/* Mood Grid */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    className="flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-xl hover:bg-stone/50 transition-colors"
                  >
                    <span className="text-3xl sm:text-2xl">{mood.emoji}</span>
                    <span 
                      className="font-sans text-[9px] sm:text-[10px] font-medium"
                      style={{ color: '#2A4B7C' }}
                    >
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-warm-divider mb-3 sm:mb-4" />

              {/* Response Section */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <SoundwaveBars />
                <span 
                  className="font-sans text-[11px] sm:text-xs"
                  style={{ color: '#5E8DBF' }}
                >
                  Your companion responds...
                </span>
              </div>

              {/* Scripture Quote */}
              <blockquote 
                className="font-serif italic text-xs sm:text-sm"
                style={{ color: '#001C5F', fontWeight: 500 }}
              >
                <p className="mb-1 leading-snug">
                  &quot;Cast all your anxiety on him because he cares for you.&quot;
                </p>
                <footer 
                  className="font-serif text-[10px] sm:text-xs not-italic"
                  style={{ color: '#001C5F', fontWeight: 450 }}
                >
                  — 1 Peter 5:7
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Right: Text Content (hidden on mobile, shown on desktop) */}
          <div className="hidden lg:block max-w-sm text-center">
            {/* Cross Divider */}
            <CrossDivider />

            {/* Heading */}
            <h2 
              className="font-serif text-2xl lg:text-3xl leading-tight mb-1"
              style={{ color: '#001C5F' }}
            >
              A companion for every
            </h2>

            {/* Subtitle - not italic */}
            <p 
              className="font-serif text-xl lg:text-2xl mb-6"
              style={{ color: '#5E8DBF', fontWeight: 550 }}
            >
              moment of your day
            </p>

            {/* Body Text */}
            <p 
              className="font-sans text-[15px] mx-auto"
              style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
            >
              Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
            </p>
          </div>

          {/* Mobile: Body Text below card */}
          <div className="lg:hidden w-full max-w-sm text-center order-last">
            <p 
              className="font-sans text-[15px] mx-auto"
              style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
            >
              Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
