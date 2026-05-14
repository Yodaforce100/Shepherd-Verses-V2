"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-4">
          {/* Left - Tagline */}
          <div className="text-center lg:text-left lg:max-w-xs lg:flex-1">
            <p 
              className="font-sans text-sm text-left"
              style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
            >
              Daily scripture and affirmations, spoken just for you. Every morning, without fail.
            </p>
          </div>

          {/* Center - Logo (same as navbar) */}
          <div className="flex justify-center lg:flex-1">
            <Link href="/">
              <Image
                src="/images/shepherd-verses-logo-new.png"
                alt="Shepherd Verses"
                width={220}
                height={70}
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Right - Legal Links */}
          <div className="text-center lg:text-right lg:flex-1">
            <p 
              className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-2"
              style={{ color: '#001C5F' }}
            >
              Legal
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/privacy" 
                className="font-sans text-sm transition-colors hover:opacity-80"
                style={{ color: '#2A4B7C', fontWeight: 450 }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="font-sans text-sm transition-colors hover:opacity-80"
                style={{ color: '#2A4B7C', fontWeight: 450 }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px" style={{ backgroundColor: '#E5E2DC' }} />
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p 
          className="font-sans text-sm text-center"
          style={{ color: '#001C5F', fontWeight: 450 }}
        >
          © 2026 Shepherd Verses. Made with care for your peace of mind.
        </p>
      </div>
    </footer>
  )
}
