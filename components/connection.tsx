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
    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
      <div className="w-24 sm:w-28 lg:w-16 h-px" style={{ backgroundColor: '#D9B86A' }} />
      <LatinCross className="size-8 shrink-0" style={{ color: '#D9B86A' }} />
      <div className="w-24 sm:w-28 lg:w-16 h-px" style={{ backgroundColor: '#D9B86A' }} />
    </div>
  )
}

export function Connection() {
  return (
    <section id="connection" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-16">
          <div className="relative z-10 text-center lg:text-left lg:col-start-1 lg:row-start-1 lg:self-end">
            <CrossDivider />

            <h2
              className="font-serif text-[1.875rem] sm:text-4xl lg:text-4xl leading-tight mb-2 text-balance"
              style={{ color: '#001C5F' }}
            >
              A companion for every
            </h2>

            <p
              className="font-sans text-xl lg:text-xl mb-6"
  style={{ color: '#001C5F', fontWeight: 500 }}
  >
  moment of your day
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_16px_32px_-20px_rgba(0,28,95,0.22)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/bible-pages.mp4"
                poster="/images/bible-pages-bg.jpeg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ boxShadow: 'inset 0 0 24px 4px rgba(255, 255, 255, 0.35)' }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-0 text-center lg:text-left lg:col-start-1 lg:row-start-2 lg:self-start">
            <p
              className="font-sans text-base mx-auto lg:mx-0 max-w-lg mb-8"
              style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 450 }}
            >
              Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments - listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
            </p>

            <blockquote className="mx-auto lg:mx-0 max-w-md">
              <p
                className="font-serif italic text-lg"
                style={{ color: '#001C5F', lineHeight: '1.6' }}
              >
                &ldquo;Come to me, all you who are weary and burdened,
                <br />
                and I will give you rest.&rdquo;
              </p>
              <footer className="font-sans text-sm mt-2" style={{ color: '#5E8DBF', fontWeight: 500 }}>
                Matthew 11:28
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
