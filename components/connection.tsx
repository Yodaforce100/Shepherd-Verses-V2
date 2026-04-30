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
    <section id="connection" className="relative pt-10 pb-16 lg:pt-4 lg:pb-20 overflow-hidden">
      {/* Background - clean light wash */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#F8F6F2' }}
      />

      {/* Left Image with Fade */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 z-0 opacity-40 lg:opacity-100">
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
            background: 'linear-gradient(to right, rgba(248,246,242,0) 0%, rgba(248,246,242,0.3) 40%, rgba(248,246,242,0.8) 70%, rgba(248,246,242,1) 100%)',
          }}
        />
        {/* Additional top/bottom fade for seamless blend */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(248,246,242,0.5) 0%, rgba(248,246,242,0) 20%, rgba(248,246,242,0) 80%, rgba(248,246,242,0.5) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden text-center pt-0 pb-12">
          <CrossDivider compact />
          <h2 
            className="font-serif text-2xl sm:text-3xl leading-tight mb-1"
            style={{ color: '#001C5F' }}
          >
            A companion for every
          </h2>
          <p 
            className="font-serif text-xl sm:text-2xl mb-5"
            style={{ color: '#5E8DBF', fontWeight: 550 }}
          >
            moment of your day
          </p>
          <p 
            className="font-sans text-[15px] mx-auto max-w-sm"
            style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
          >
            Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
          </p>
        </div>

        {/* Desktop Layout - Text positioned to the right */}
        <div className="hidden lg:flex justify-end py-12">
          <div className="max-w-md text-center lg:text-left lg:mr-12">
            <CrossDivider />
            
            <h2 
              className="font-serif text-2xl lg:text-3xl leading-tight mb-1"
              style={{ color: '#001C5F' }}
            >
              A companion for every
            </h2>
            
            <p 
              className="font-serif text-xl lg:text-2xl mb-6"
              style={{ color: '#5E8DBF', fontWeight: 550 }}
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
    </section>
  )
}
