"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function AnimatedHeading({
  lead,
  highlight,
  className = "",
  color = "#001C5F",
}: {
  lead: string
  highlight: string
  className?: string
  color?: string
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>(0.4)
  const leadWords = lead.split(" ")
  const wordDelay = 90
  const highlightDelay = leadWords.length * wordDelay
  const underlineDrawDelay = highlightDelay + 250
  const underlineHoldMs = 2200
  const [underlineGone, setUnderlineGone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setUnderlineGone(true), underlineDrawDelay + 700 + underlineHoldMs)
    return () => clearTimeout(timer)
  }, [inView, underlineDrawDelay])

  const wordClass = `inline-block transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`

  return (
    <h2 ref={ref} className={className} style={{ color }}>
      <span className="sr-only">{`${lead} ${highlight}`}</span>
      <span aria-hidden="true">
        {leadWords.map((word, i) => (
          <span key={i} className={wordClass} style={{ transitionDelay: `${i * wordDelay}ms` }}>
            {word}
            {"\u00A0"}
          </span>
        ))}
        <span className="relative inline-block whitespace-nowrap">
          <span className={wordClass} style={{ transitionDelay: `${highlightDelay}ms` }}>
            {highlight}
          </span>
          <span
            className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] rounded-full origin-left transition-[transform,opacity] duration-700 ease-out motion-reduce:hidden ${
              inView ? "scale-x-100" : "scale-x-0"
            } ${underlineGone ? "opacity-0" : "opacity-100"}`}
            style={{
              backgroundColor: "#CF9D3E",
              transitionDelay: underlineGone ? "0ms" : `${underlineDrawDelay}ms`,
            }}
          />
        </span>
      </span>
    </h2>
  )
}
