import Image from "next/image"

// Speech Bubble Icon
function SpeechBubbleIcon() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#CF9D3E" 
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
      stroke="#CF9D3E" 
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
    accentWord: "Pause",
    description: "and name your current emotion — whether you're anxious, tired, or grateful. Your",
    emphasis: "Shepherd Verses",
    descriptionEnd: "companion listens to where you are in this moment.",
    icon: "speech",
  },
  {
    image: "/images/mobile-app-ui-new.jpg",
    title: "Hear a Caring Voice",
    accentWord: "Listen",
    description: "as your companion shares spoken scripture and affirmations tailored to your feelings, carefully chosen to guide and support you.",
    emphasis: null,
    descriptionEnd: null,
    icon: "soundwave",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-10 lg:py-14 bg-white">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Heading with inline subtitle */}
          <h2 
            className="font-serif text-2xl lg:text-3xl leading-tight"
            style={{ color: '#001C5F' }}
          >
            Two simple steps<span style={{ color: '#5E8DBF' }}>.. a day transformed</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6 lg:gap-10 max-w-2xl sm:max-w-3xl mx-auto px-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="w-full md:w-1/2 max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] mx-auto"
            >
              {/* Card */}
              <div 
                className="bg-white rounded-2xl overflow-hidden h-full flex flex-col"
                style={{ border: '0.5px solid #D5CDB8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              >
                {/* Image with Title Overlay */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
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
                <div className="p-4 sm:p-5 flex-grow">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="mt-0.5">
                      {step.icon === "speech" ? <SpeechBubbleIcon /> : <SoundwaveIcon />}
                    </div>
                    {/* Text */}
                    <p 
                      className="font-sans text-sm sm:text-[15px]"
                      style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
                    >
                      <span 
                        className="font-semibold"
                        style={{ color: '#CF9D3E' }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
