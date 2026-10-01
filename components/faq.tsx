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
    answer: "Shepherd Verses helps you begin each day with encouragement, guidance, and peace through God's word. By responding to how you're feeling, it delivers carefully chosen scripture, affirmations, and gentle daily guidance tailored to your emotional and spiritual needs."
  },
  {
    question: "How does Shepherd Verses work?",
    answer: "After signing up, you'll connect with Shepherd Verses through Telegram and choose a time to receive your daily message. Each morning, you'll be invited to share how you're feeling by selecting an emotion. Your Shepherd Verses companion then responds with a personalised spoken and written message designed to support and encourage you throughout your day."
  },
  {
    question: "Do I need Telegram?",
    answer: (
      <>
        <p>
  Yes. Shepherd Verses delivers your daily message through Telegram, which is completely free to use. Simply download Telegram from your app store and follow the quick setup process.{" "}
  <em>
  <strong className="font-semibold">Be sure to ALLOW notifications</strong>{" "}so you don&apos;t miss your message when it arrives.
  </em>{" "}
  Once connected, your messages will be delivered directly to you each day.
  </p>
      </>
    )
  },
  {
    question: "How do I update my account details?",
    answer: (
      <>
        <p>
          To update your email address, or time of your daily message, contact us at{" "}
          <a href="mailto:hello@shepherdverses.com" className="underline hover:opacity-80">
            hello@shepherdverses.com
          </a>{" "}
          and our support team will help.
        </p>
        <p className="mt-3">
          To manage billing, change your payment method, or cancel, use the &quot;manage your subscription&quot; link in your welcome email, where you can update your card, view invoices, or cancel anytime. Billing is handled securely by our payment provider, Paddle.
        </p>
        <p className="mt-3">Not sure where to go? Email us anytime, we&apos;re here to help.</p>
      </>
    )
  },
]

// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
      <div className="w-20 h-px bg-gold" />
      <LatinCross className="size-9 text-gold" />
      <div className="w-20 h-px bg-gold" />
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative pt-10 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, var(--light-stone) 22%, var(--stone) 55%, #FFFFFF 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <CrossDivider />
          <h2 className="font-serif text-3xl md:text-4xl text-balance leading-tight text-navy">
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
                  <AccordionTrigger className={`font-serif text-left text-base font-semibold py-3 sm:py-4 text-navy hover:no-underline ${index === 0 ? "pt-0" : ""}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-sans text-base pb-3 sm:pb-4 text-dark-blue"
                    style={{ lineHeight: '1.6', fontWeight: 450 }}
                  >
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
