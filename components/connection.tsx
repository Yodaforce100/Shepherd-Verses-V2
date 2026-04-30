// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
      <span style={{ color: '#D9B86A', fontSize: '24px' }}>✝</span>
      <div className="w-14 h-px" style={{ backgroundColor: '#C5B49A' }} />
    </div>
  )
}

export function Connection() {
  return (
    <section id="connection" className="py-12 lg:py-20" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
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
            className="font-sans text-[14px] sm:text-[15px] mx-auto max-w-lg"
            style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 450 }}
          >
            Some days begin with calm. Others begin with uncertainty, heaviness, or quiet worry. <span style={{ fontWeight: 550 }}>Shepherd Verses</span> meets you in those moments—listening to how you feel and responding with spoken scripture and affirmations, chosen just for you.
          </p>
        </div>
      </div>
    </section>
  )
}
