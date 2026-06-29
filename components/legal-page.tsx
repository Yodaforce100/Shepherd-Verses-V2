"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-stone">
      <Navbar onSignupClick={() => router.push("/#plans")} />

      <main className="flex-1">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-3xl">
          {/* Header */}
          <header className="mb-8 lg:mb-10">
            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-balance"
              style={{ color: "#001C5F" }}
            >
              {title}
            </h1>
            <p
              className="font-sans text-sm mt-3"
              style={{ color: "#4A5B6B", fontWeight: 450 }}
            >
              Last updated: {lastUpdated}
            </p>
          </header>

          {/* Body */}
          <div className="legal-content flex flex-col gap-6">{children}</div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

/* ---- Shared content building blocks for consistent styling ---- */

export function LegalLead({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-sans text-base leading-relaxed"
      style={{ color: "#2A4B7C", fontWeight: 450 }}
    >
      {children}
    </p>
  )
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3 mt-2">
      <h2
        className="font-serif text-xl sm:text-2xl text-balance"
        style={{ color: "#001C5F" }}
      >
        {heading}
      </h2>
      {children}
    </section>
  )
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3
      className="font-sans text-base font-semibold mt-2"
      style={{ color: "#243E6B" }}
    >
      {children}
    </h3>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-sans text-base leading-relaxed"
      style={{ color: "#3A4A5A" }}
    >
      {children}
    </p>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-[#D9B86A]">
      {children}
    </ul>
  )
}

export function LegalListItem({ children }: { children: ReactNode }) {
  return (
    <li
      className="font-sans text-base leading-relaxed"
      style={{ color: "#3A4A5A" }}
    >
      {children}
    </li>
  )
}

export function LegalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 transition-opacity hover:opacity-80"
      style={{ color: "#001C5F", fontWeight: 500 }}
    >
      {children}
    </a>
  )
}
