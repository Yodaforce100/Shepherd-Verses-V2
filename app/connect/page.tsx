"use client"

import { useState } from "react"
import Image from "next/image"

// Latin cross icon (tall vertical bar, shorter crossbar near the top)
function LatinCross({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <rect x="10.5" y="2" width="3" height="20" rx="1" />
      <rect x="6" y="7" width="12" height="3" rx="1" />
    </svg>
  )
}

export default function ConnectPage() {
  const [showSteps, setShowSteps] = useState(false)

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16"
      style={{ backgroundColor: "#F7F6F4" }}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl px-6 py-10 sm:px-10 sm:py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
        style={{ boxShadow: "0 20px 60px rgba(0,28,95,0.10)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/images/shepherd-verses-logo-cropped.png"
            alt="Shepherd Verses"
            width={1360}
            height={207}
            className="h-10 sm:h-11 w-auto"
            priority
          />
        </div>

        {/* Eyebrow cross */}
        <div className="flex items-center justify-center mb-5">
          <LatinCross className="size-6" style={{ color: "#CF9D3E" }} />
        </div>

        {/* Heading */}
        <h1
          className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-4 text-balance"
          style={{ color: "#001C5F" }}
        >
          Welcome! Your free trial has started.
        </h1>

        {/* Subheading */}
        <p
          className="font-sans text-base mb-8 text-pretty mx-auto max-w-sm"
          style={{ color: "#2A4B7C", lineHeight: "1.6", fontWeight: 450 }}
        >
          Connect to Telegram to receive your daily verse. Telegram is a free, private messaging app.
          Pick the option that&apos;s you:
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-stretch gap-4 mb-5">
          {/* Button 1 — primary gold */}
          <a
            href="https://t.me/Shepherdverses_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-bold text-base px-8 py-5 rounded-full hover:scale-105 transition-transform duration-300"
            style={{
              background: "linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)",
              color: "#001C5F",
              border: "2px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 24px rgba(212,185,106,0.5)",
            }}
          >
            I have Telegram - connect now
          </a>

          {/* Button 2 — secondary outline */}
          <button
            type="button"
            onClick={() => setShowSteps((v) => !v)}
            aria-expanded={showSteps}
            className="font-sans font-semibold text-base px-8 py-4 rounded-full hover:bg-[#001C5F]/5 transition-colors duration-300"
            style={{
              color: "#001C5F",
              border: "2px solid rgba(0,28,95,0.25)",
              backgroundColor: "transparent",
            }}
          >
            I don&apos;t have Telegram yet
          </button>

          {/* Expandable steps */}
          {showSteps && (
            <div
              className="text-left rounded-2xl px-5 py-5 animate-in fade-in slide-in-from-top-2 duration-300"
              style={{ backgroundColor: "#F7F6F4" }}
            >
              <ol
                className="font-sans text-sm space-y-3"
                style={{ color: "#2A4B7C", lineHeight: "1.6" }}
              >
                <li className="flex gap-3">
                  <span className="font-bold" style={{ color: "#CF9D3E" }}>1.</span>
                  <span>Download Telegram (free) from your app store.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold" style={{ color: "#CF9D3E" }}>2.</span>
                  <span>Check your email - we&apos;ve sent you a link to connect your Telegram account to Shepherd Verses.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold" style={{ color: "#CF9D3E" }}>3.</span>
                  <span>Tap that link and you&apos;re in 🙏</span>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Helper line under both buttons */}
        <p
          className="font-sans text-sm mx-auto max-w-sm"
          style={{ color: "#4A5568", lineHeight: "1.6" }}
        >
          📲 When Telegram asks, tap <strong className="font-bold">ALLOW notifications</strong> - that&apos;s how your verse reaches you each day.
        </p>
      </div>
    </main>
  )
}
