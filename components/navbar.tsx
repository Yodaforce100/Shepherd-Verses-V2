"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#plans", label: "Plans" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-warm-divider">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body-blue hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Centered Logo - no border */}
          <Link href="/" className="flex items-center justify-center lg:flex-1 focus:outline-none">
            <div className="flex items-center justify-center" style={{ border: 'none', outline: 'none' }}>
              <Image
                src="/images/shepherd-verses-logo.svg"
                alt="Shepherd Verses"
                width={280}
                height={90}
                className="h-14 sm:h-16 lg:h-[72px] w-auto"
                priority
                style={{ border: 'none', outline: 'none' }}
              />
            </div>
          </Link>

          {/* Right CTA - #001C5F (navy), text-sm, font-medium */}
          <div className="hidden lg:flex items-center justify-end flex-1">
            <Button 
              asChild
              className="font-sans text-sm font-medium px-6 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                color: '#001C5F',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
              }}
            >
              <Link href="#plans">Begin Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-navy"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-warm-divider">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-body-blue hover:text-navy transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                asChild
                className="mt-2 font-sans text-sm font-medium rounded-full transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
                  color: '#001C5F',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 4px 14px rgba(212,185,106,0.4)',
                }}
              >
                <Link href="#plans" onClick={() => setIsMenuOpen(false)}>
                  Begin Free Trial
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
