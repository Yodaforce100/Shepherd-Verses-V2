"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"

const CANDIDATES = [
  {
    id: "current",
    label: "A — Current",
    note: "companion-moment.jpg · window light, coffee, praying hands",
    src: "/images/companion-moment.jpg",
    mobilePosition: "center 35%",
    desktopPosition: "center",
  },
  {
    id: "contemplative",
    label: "B — Silver hair",
    note: "hero-contemplative.jpg · already in project, matches palette",
    src: "/images/hero-contemplative.jpg",
    mobilePosition: "center 30%",
    desktopPosition: "35% center",
  },
  {
    id: "option-3",
    label: "C — Dark wavy hair",
    note: "hero-option-3.jpg · already in project, golden window light",
    src: "/images/hero-option-3.jpg",
    mobilePosition: "center 30%",
    desktopPosition: "40% center",
  },
  {
    id: "option-4",
    label: "D — Linen, soft light",
    note: "hero-option-4.jpg · already in project, brightest of the set",
    src: "/images/hero-option-4.jpg",
    mobilePosition: "center 30%",
    desktopPosition: "55% center",
  },
  {
    id: "istock",
    label: "E — iStock test",
    note: "WATERMARKED comp · cooler white tones, wider crop",
    src: "/images/hero-candidate-istock.jpg",
    mobilePosition: "center 40%",
    desktopPosition: "30% center",
    watermarked: true,
  },
]

export default function HeroPreviewPage() {
  const [active, setActive] = useState(0)
  const candidate = CANDIDATES[active]

  return (
    <main style={{ backgroundColor: "#F7F6F4" }} className="min-h-screen">
      {/* Switcher */}
      <div
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ borderColor: "rgba(0,28,95,0.12)", backgroundColor: "rgba(247,246,244,0.92)" }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mr-1"
              style={{ color: "#001C5F" }}
            >
              Hero image
            </span>
            {CANDIDATES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className="font-sans text-xs rounded-full px-3 py-1.5 transition-colors"
                style={
                  i === active
                    ? { backgroundColor: "#001C5F", color: "#F7F6F4", fontWeight: 600 }
                    : {
                        backgroundColor: "transparent",
                        color: "#2A4B7C",
                        border: "1px solid rgba(0,28,95,0.2)",
                        fontWeight: 500,
                      }
                }
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="font-sans text-xs mt-2" style={{ color: "#4A5568" }}>
            {candidate.note}
            {candidate.watermarked && (
              <span style={{ color: "#B45309", fontWeight: 600 }}>
                {" "}
                — watermark is visible; licensed file would be clean
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Live hero with the selected image */}
      <Hero
        key={candidate.id}
        imageSrc={candidate.src}
        mobilePosition={candidate.mobilePosition}
        desktopPosition={candidate.desktopPosition}
      />

      <p className="font-sans text-xs text-center py-6" style={{ color: "#4A5568" }}>
        Preview only — the live homepage still uses the current image until you pick one.
      </p>
    </main>
  )
}
