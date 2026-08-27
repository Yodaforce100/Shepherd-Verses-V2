"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-5 lg:gap-4">
          {/* Left - Scripture */}
          <div className="text-center lg:text-left lg:max-w-sm lg:flex-1">
            <blockquote>
              <p
                className="font-sans text-xs italic text-pretty text-center lg:text-left"
                style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
              >
                &ldquo;The Lord is my shepherd; I shall lack nothing. He makes me lie down in green
                pastures. He leads me beside still waters. He restores my soul.&rdquo;
              </p>
              <footer
                className="font-sans text-xs mt-1.5 text-center lg:text-left"
                style={{ color: '#001C5F', fontWeight: 600 }}
              >
                &mdash; Psalm 23:1-3a (WEBBE)
              </footer>
            </blockquote>
          </div>

          {/* Center - Logo (same as navbar) */}
          <div className="flex justify-center lg:flex-1">
            <Link href="/">
              <Image
                src="/images/shepherd-verses-logo-cropped.png"
                alt="Shepherd Verses"
                width={1450}
                height={420}
                className="h-16 w-auto"
                priority={false}
              />
            </Link>
          </div>

          {/* Right - Contact & Legal Links */}
          <div className="text-center lg:text-right lg:flex-1 flex flex-col items-center lg:items-end gap-4">
            <div className="text-center lg:text-right">
              <p
                className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                style={{ color: '#001C5F' }}
              >
                Contact
              </p>
              <a
                href="mailto:hello@shepherdverses.com"
                className="font-sans text-sm transition-colors hover:opacity-80"
                style={{ color: '#2A4B7C', fontWeight: 450 }}
              >
                hello@shepherdverses.com
              </a>
            </div>

            <div className="text-center lg:text-right">
              <p
                className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                style={{ color: '#001C5F' }}
              >
                Legal
              </p>
              <div className="flex items-center justify-center lg:justify-end gap-4">
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
              <Link 
                href="/refund-policy" 
                className="font-sans text-sm transition-colors hover:opacity-80"
                style={{ color: '#2A4B7C', fontWeight: 450 }}
              >
                Refund Policy
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px" style={{ backgroundColor: '#E5E2DC' }} />
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p
          className="font-sans text-xs text-center"
          style={{ color: '#001C5F', fontWeight: 450 }}
        >
          © 2026 Shepherd Verses. Made with care for your peace of mind.
        </p>
      </div>
    </footer>
  )
}
