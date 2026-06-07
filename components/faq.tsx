"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Latin cross icon (tall vertical bar, shorter crossbar near the top)
function LatinCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect x="10.5" y="2" width="3" height="20" rx="1" />
      <rect x="6" y="7" width="12" height="3" rx="1" />
    </svg>
  )
}

const faqs = [
  {
    question: "What is Shepherd Verses?",
    answer: "Shepherd Verses is a personal spiritual companion that helps you begin each day with encouragement, guidance, and peace through God's word. By responding to how you're feeling, it delivers carefully chosen scripture, affirmations, and gentle daily guidance tailored to your emotional and spiritual needs."
  },
  {
    question: "How does Shepherd Verses work?",
    answer: "After signing up, you'll connect with Shepherd Verses through Telegram and choose a time to receive your daily message. Each morning, you'll be invited to share how you're feeling by selecting an emotion. Your Shepherd Verses companion then responds with a personalised spoken and written message designed to support and encourage you throughout your day."
  },
  {
    question: "Do I need to know the Bible to use Shepherd Verses?",
    answer: "Not at all. Shepherd Verses is designed for anyone seeking encouragement and support through God's word, whether you're new to the Bible or have been reading it for years."
  },
  {
    question: "How does Shepherd Verses choose scripture?",
    answer: "Each emotion is thoughtfully matched with scripture that reflects the challenges, hopes, and encouragement associated with that feeling. Our goal is to provide verses that speak meaningfully to where you are emotionally and spiritually."
  },
  {
    question: "What feelings can I share?",
    answer: "Shepherd Verses currently supports a wide range of emotions, including anxiety, stress, sadness, loneliness, uncertainty, gratitude, hope, joy, and more. Simply select the emotion that best reflects how you're feeling, and your message will be tailored accordingly."
  },
  {
    question: "Do I need Telegram?",
    answer: "Yes. Shepherd Verses currently delivers messages through Telegram. Telegram is free to use and only takes a few moments to set up. Once connected, you'll receive your daily messages directly through the app."
  },
  {
    question: "How do I update my account details?",
    answer: "If you'd like to update your email address, change the time of your daily message, or make changes to your billing details, our support team can help. Simply get in touch at hello@shepherdverses.com and we'll assist you in keeping your account up to date."
  },
]

// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
      <div className="w-14 h-px bg-gold" />
      <LatinCross className="size-6 text-gold" />
      <div className="w-14 h-px bg-gold" />
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative pt-10 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-light-stone via-stone to-stone" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <CrossDivider />
          <h2 className="font-serif text-2xl lg:text-3xl leading-tight text-navy">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion Card - centered */}
        <div className="max-w-lg lg:max-w-3xl mx-auto px-2 sm:px-0">
          <div className="bg-popover rounded-2xl p-4 sm:p-6 lg:p-8 border border-warm-divider shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="font-serif text-left text-base font-semibold py-3 sm:py-4 text-navy hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base font-medium leading-relaxed pb-3 sm:pb-4 text-dark-blue">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
