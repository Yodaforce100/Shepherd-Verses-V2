import Image from "next/image"
import { AnimatedHeading, Reveal } from "@/components/reveal"

// Speech Bubble Icon
function SpeechBubbleIcon() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#D4B96A" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

// Soundwave Icon - thin elegant lines
function SoundwaveIcon() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#D4B96A" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      className="flex-shrink-0"
    >
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8" y1="7" x2="8" y2="17" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  )
}

const steps = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Mobile%20phone%20image%20Apr26-JLFOCxANb5QnS51z8WCdLELMtMraKZ.png",
    title: "Share How You Feel",
    accentWord: "Pause.",
    description: "Each morning your Shepherd Verses companion gently asks 'How are you feeling today?' Choose your current emotion - whether you're anxious, tired, or grateful. We listen to where you are in this moment.",
    emphasis: null,
    descriptionEnd: null,
    icon: "speech",
  },
  {
    image: "/images/mobile-app-ui-new.jpg",
    title: "Hear a Caring Voice",
    accentWord: "Listen.",
    description: "Shepherd Verses shares a spoken Scripture, and a personalised affirmation and mantra, tailored to how you're feeling. Carefully chosen to offer comfort and support - delivered via Telegram.",
    emphasis: null,
    descriptionEnd: null,
    icon: "soundwave",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative px-3 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8 scroll-mt-20 lg:scroll-mt-24"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F6F4 100%)' }}
    >
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] py-8 sm:py-10 lg:py-14"
        style={{
          background: 'linear-gradient(180deg, #0A2468 0%, #001C5F 55%, #00154A 100%)',
          boxShadow: '0 24px 60px -24px rgba(0,28,95,0.55), 0 0 0 1px rgba(212,185,106,0.28)',
        }}
      >
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-12">
          {/* Primary Heading */}
          <AnimatedHeading
            lead="Wake up to a voice that"
            highlight="hears you"
            color="#FFFFFF"
            className="font-serif text-3xl lg:text-4xl leading-tight mb-3 text-balance font-bold"
          />
          {/* Sub-heading */}
          <p
            className="font-sans text-xl lg:text-2xl text-balance"
            style={{ color: '#D4B96A', fontWeight: 500 }}
          >
            Two simple steps to a day transformed!
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6 lg:gap-10 max-w-2xl sm:max-w-3xl mx-auto px-4">
          {steps.map((step, index) => (
            <Reveal
              key={index}
              delay={index * 180}
              className="w-full md:w-1/2 max-w-[320px] sm:max-w-[300px] lg:max-w-[340px] mx-auto"
            >
              {/* Card */}
              <div 
                className="group bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out motion-safe:hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(0,0,0,0.35),0_0_0_1px_rgba(212,185,106,0.6),0_0_28px_rgba(212,185,106,0.25)]"
                style={{ border: '0.5px solid rgba(212,185,106,0.35)' }}
              >
                {/* Image with Title Overlay */}
                <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.06]"
                  />
                  {/* Soft warm gradient overlay for better title visibility */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background: 'linear-gradient(to top, rgba(62,50,38,0.7) 0%, rgba(62,50,38,0.35) 50%, rgba(62,50,38,0) 100%)',
                    }}
                  />
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <h3 
                      className="font-serif text-lg sm:text-xl text-white"
                      style={{ fontWeight: 500 }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description with Icon */}
                <div className="px-4 py-3.5 sm:p-5 flex-grow">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="mt-0.5">
                      {step.icon === "speech" ? <SpeechBubbleIcon /> : <SoundwaveIcon />}
                    </div>
                    {/* Text */}
                    <p 
                      className="font-sans text-[15px] leading-[1.55] sm:text-base sm:leading-[1.6]"
                      style={{ color: '#5E8DBF', fontWeight: 450 }}
                    >
                      <span 
                        className="font-semibold"
                        style={{ color: '#D4B96A' }}
                      >
                        {step.accentWord}
                      </span>{" "}
                      {step.description}
                      {step.emphasis && (
                        <>
                          {" "}
                          <span style={{ fontWeight: 600 }}>{step.emphasis}</span>{" "}
                          {step.descriptionEnd}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
