import Image from "next/image"

// Cross Divider Component
function CrossDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${compact ? 'mb-2' : 'mb-4'}`}>
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
      <span style={{ color: '#D9B86A', fontSize: '24px' }}>✝</span>
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
    </div>
  )
}

export function Connection() {
  return (
    <section id="connection" className="relative overflow-hidden" style={{ backgroundColor: '#F7F6F4' }}>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Image at top with fade to bottom */}
        <div className="relative h-64 sm:h-72">
          <Image
            src="/images/companion-moment.jpg"
            alt="A peaceful moment of reflection"
            fill
            className="object-cover object-[center_25%]"
          />
          {/* Gradient fade to bottom */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(247,246,244,0) 0%, rgba(247,246,244,0.4) 60%, rgba(247,246,244,1) 100%)',
            }}
          />
        </div>
        
        {/* Text content below image */}
        <div className="text-center px-4 -mt-2 pb-6">
          <CrossDivider compact />
          <h2 
            className="font-serif text-2xl sm:text-3xl leading-tight mb-0"
            style={{ color: '#001C5F' }}
          >
            A companion for every
          </h2>
          <p 
            className="font-sans text-lg sm:text-xl mb-4"
            style={{ color: '#5E8DBF', fontWeight: 500 }}
          >
            moment of your day
          </p>
          <p 
            className="font-sans text-[14px] mx-auto max-w-sm"
            style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
          >
            Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative pt-10 pb-24">
        {/* Left Image with Fade */}
        <div className="absolute inset-y-0 left-0 w-3/5 z-0">
          <Image
            src="/images/companion-moment.jpg"
            alt="A peaceful moment of reflection"
            fill
            className="object-cover object-center"
          />
          {/* Gradient fade to the right */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(247,246,244,0) 0%, rgba(247,246,244,0.3) 40%, rgba(247,246,244,0.8) 70%, rgba(247,246,244,1) 100%)',
            }}
          />
          {/* Additional top/bottom fade for seamless blend */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(247,246,244,0.5) 0%, rgba(247,246,244,0) 20%, rgba(247,246,244,0) 80%, rgba(247,246,244,0.5) 100%)',
            }}
          />
        </div>

        {/* Text Content - Right side */}
        <div className="relative z-10 container mx-auto px-8">
          <div className="flex justify-end py-12">
            <div className="max-w-md mr-12">
              <div className="flex justify-start">
                <CrossDivider />
              </div>
              
              <h2 
                className="font-serif text-3xl leading-tight mb-1"
                style={{ color: '#001C5F' }}
              >
                A companion for every
              </h2>
              
              <p 
                className="font-sans text-lg lg:text-xl mb-6"
                style={{ color: '#5E8DBF', fontWeight: 500 }}
              >
                moment of your day
              </p>
              
              <p 
                className="font-sans text-[15px]"
                style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
              >
                Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
