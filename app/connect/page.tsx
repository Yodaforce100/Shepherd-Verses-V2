import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome — Connect to Telegram | Shepherd Verses",
  description:
    "Your free trial has started. Connect to Telegram to receive your daily verse and voice message.",
}

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

        {/* Body */}
        <p
          className="font-sans text-base mb-8 text-pretty mx-auto max-w-sm"
          style={{ color: "#2A4B7C", lineHeight: "1.6", fontWeight: 450 }}
        >
          One last step, and it only takes a few minutes: Connect to Telegram where you will receive your
          daily verse and voice message.
        </p>

        {/* Gold CTA button */}
        <a
          href="https://t.me/Shepherdverses_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans font-bold text-base px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 mb-5"
          style={{
            background: "linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)",
            color: "#001C5F",
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "0 8px 24px rgba(212,185,106,0.5)",
          }}
        >
          Open Telegram &amp; connect →
        </a>

        {/* Helper line under button */}
        <p
          className="font-sans text-sm mb-4 mx-auto max-w-sm"
          style={{ color: "#4A5568", lineHeight: "1.6" }}
        >
          Tap the button, then press Start in Telegram — we&apos;ll take it from there.
        </p>

        {/* New to Telegram line */}
        <p
          className="font-sans text-sm mx-auto max-w-sm"
          style={{ color: "#4A5568", opacity: 0.8, lineHeight: "1.6" }}
        >
          New to Telegram? No problem — it&apos;s free, tap the button and we&apos;ll walk you through it.
        </p>
      </div>
    </main>
  )
}
