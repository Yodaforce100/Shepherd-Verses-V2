"use client"

import { Facebook, Instagram, Youtube } from "lucide-react"
import styles from "./socials.module.css"

// Custom TikTok icon since lucide doesn't have one
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

// Soundwave divider component with animation - matching hero section
function SoundwaveDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="w-10 h-px" style={{ backgroundColor: '#D9B86A' }} />
      <div className="flex items-center justify-center gap-[3px] h-5">
        <div className={`${styles.soundwaveBar} ${styles.bar1}`} />
        <div className={`${styles.soundwaveBar} ${styles.bar2}`} />
        <div className={`${styles.soundwaveBar} ${styles.bar3}`} />
        <div className={`${styles.soundwaveBar} ${styles.bar4}`} />
        <div className={`${styles.soundwaveBar} ${styles.bar5}`} />
      </div>
      <div className="w-10 h-px" style={{ backgroundColor: '#D9B86A' }} />
    </div>
  )
}

const socials = [
  { name: "TikTok", icon: TikTokIcon, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
]

export function Socials() {
  return (
    <section id="socials" className="relative py-10 lg:py-9" style={{ backgroundColor: '#001C5F' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 lg:mb-7">
          <SoundwaveDivider />
          <h2 
            className="font-serif text-xl lg:text-2xl leading-tight mb-3"
            style={{ color: '#FFFFFF' }}
          >
            Follow Our Journey
          </h2>
          <p 
            className="font-sans text-base max-w-md lg:max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', fontWeight: 450 }}
          >
            Be part of something bigger. Follow along for daily scripture, gentle encouragement, and a community that cares.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 lg:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8D48B',
                }}
              >
                <social.icon 
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: '#C9A227' }}
                />
              </div>
              <span 
                className="font-sans text-xs font-medium"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
