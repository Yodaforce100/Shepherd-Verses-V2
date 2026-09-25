"use client"

import { Instagram, Youtube } from "lucide-react"
import styles from "./socials.module.css"

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
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
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
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shepherd Verses on ${social.name} (opens in a new tab)`}
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
