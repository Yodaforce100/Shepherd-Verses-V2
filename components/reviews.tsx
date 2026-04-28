import { Star } from "lucide-react"

const reviews = [
  {
    quote: "Every morning I used to reach for my phone and feel anxious before the day even started. Now I start with Shepherd Verses and it genuinely changes my whole outlook. The scripture it chooses always feels like it was written just for me.",
    name: "Margaret T.",
    location: "Tennessee",
  },
  {
    quote: "I was sceptical at first — I've been a Christian for thirty years and wondered what an app could offer me. But the way it listens and responds with such relevant scripture surprised me deeply. It's become part of my morning prayer time.",
    name: "David R.",
    location: "Texas",
  },
  {
    quote: "I shared that I was feeling overwhelmed one morning and the verse it gave me brought me to tears — in the best way. It felt like being heard. I've recommended it to everyone in my small group.",
    name: "Joanne M.",
    location: "Georgia",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className="w-3.5 h-3.5 fill-current" 
          style={{ color: '#D4B96A' }} 
        />
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-10 lg:py-14 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-2xl lg:text-3xl leading-tight"
            style={{ color: '#001C5F' }}
          >
            What Our Members Are Saying
          </h2>
        </div>

        {/* Reviews Grid - total width matches subs section (~740px for 2 cards + gap) */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 lg:gap-6 max-w-[760px] mx-auto">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="w-full md:w-1/3 max-w-[240px] mx-auto rounded-xl p-4 lg:p-5 flex flex-col"
              style={{ backgroundColor: '#F7F6F4', border: '0.5px solid #D5CDB8', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              {/* Stars */}
              <StarRating />

              {/* Quote */}
              <blockquote 
                className="font-serif italic text-xs flex-grow mb-3"
                style={{ color: '#2A4B7C', lineHeight: '1.6', fontWeight: 550 }}
              >
                &quot;{review.quote}&quot;
              </blockquote>

              {/* Divider */}
              <div className="w-full h-px mb-3" style={{ backgroundColor: '#E5E2DC' }} />

              {/* Reviewer Info */}
              <div>
                <p 
                  className="font-sans text-xs font-bold mb-0.5"
                  style={{ color: '#001C5F' }}
                >
                  {review.name}
                </p>
                <p 
                  className="font-sans text-xs"
                  style={{ color: '#5E8DBF', fontWeight: 500 }}
                >
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
