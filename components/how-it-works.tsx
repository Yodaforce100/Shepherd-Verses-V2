import Image from "next/image"

const steps = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Mobile%20phone%20image%20Apr26-JLFOCxANb5QnS51z8WCdLELMtMraKZ.png",
    title: "Share How You Feel",
    accentWord: "PAUSE",
    description: "and name your current emotion—whether you're anxious, tired, or grateful. Your",
    emphasis: "Shepherd Verses companion",
    descriptionEnd: "listens to where you are in this moment.",
  },
  {
    image: "/images/mobile-app-ui-new.jpg",
    title: "Hear a Caring Voice",
    accentWord: "LISTEN",
    description: "as your companion shares spoken scripture and affirmations tailored to your feelings, carefully chosen to guide and support you.",
    emphasis: null,
    descriptionEnd: null,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-10 lg:py-14 bg-white">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Heading - matches Connection section */}
          <h2 
            className="font-serif text-2xl lg:text-3xl leading-tight mb-2"
            style={{ color: '#001C5F' }}
          >
            Two simple steps
          </h2>

          {/* Subtitle - matches Connection section (not italic) */}
          <p 
            className="font-serif text-lg lg:text-xl"
            style={{ color: '#5E8DBF', fontWeight: 550 }}
          >
            A day transformed
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-4 sm:gap-6 lg:gap-10 max-w-2xl sm:max-w-3xl mx-auto px-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="w-full md:w-1/2 max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] mx-auto"
            >
              {/* Card */}
              <div 
                className="bg-white rounded-2xl overflow-hidden"
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
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 
                      className="font-serif text-lg sm:text-xl text-white"
                      style={{ fontWeight: 500 }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 sm:p-5">
                  <p 
                    className="font-sans text-sm sm:text-[15px]"
                    style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
                  >
                    <span 
                      className="font-semibold tracking-wide"
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
          ))}
        </div>
      </div>
    </section>
  )
}
