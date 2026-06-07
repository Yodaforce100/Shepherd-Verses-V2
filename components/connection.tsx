// Latin cross icon (tall vertical bar, shorter crossbar near the top)
function LatinCross({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="10.5" y="2" width="3" height="20" rx="1" />
      <rect x="6" y="7" width="12" height="3" rx="1" />
    </svg>
  )
}

// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="w-20 h-px" style={{ backgroundColor: '#D9B86A' }} />
      <LatinCross className="size-10" style={{ color: '#D9B86A' }} />
      <div className="w-20 h-px" style={{ backgroundColor: '#D9B86A' }} />
    </div>
  )
}

export function Connection() {
  return (
    <section id="connection" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden" style={{ backgroundColor: '#F7F6F4' }}>
      {/* Subtle Bible image background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/bible-pages-bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.38,
          filter: 'grayscale(80%) saturate(70%)',
        }}
      />
      {/* Top gradient blend from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent 0%, rgba(247,246,244,0.9) 100%)',
        }}
      />
      {/* Bottom gradient blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 100%)',
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl mx-auto text-center">
          <CrossDivider />
          
          <h2 
            className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2"
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
            className="font-sans text-base mx-auto max-w-lg lg:max-w-2xl mb-6"
            style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
          >
            Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
          </p>
          
          {/* Scripture Quote */}
          <p
            className="font-serif italic text-base mx-auto max-w-md mt-4"
            style={{ color: '#001C5F', lineHeight: '1.6', fontWeight: 700 }}
          >
            &quot;Come to me, all you who are weary and burdened,
            <br />
            and I will give you rest.&quot; — Matthew 11:28
          </p>
        </div>
      </div>
    </section>
  )
}
