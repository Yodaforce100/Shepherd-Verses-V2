"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Cross } from "lucide-react"

const faqs = [
  {
    question: "What is Shepherd Verses?",
    answer: "Shepherd Verses is a faith-based companion app that delivers personalized spoken scripture and affirmations based on how you're feeling. It's designed to help you start your day with peace, clarity, and spiritual encouragement."
  },
  {
    question: "How does Shepherd Verses work?",
    answer: "Each morning, you share how you're feeling by selecting an emotion. Your Shepherd Verses companion then responds with carefully chosen scripture and affirmations delivered via voice, helping you find comfort and guidance tailored to your emotional state."
  },
  {
    question: "Do I need to know the Bible to use Shepherd Verses?",
    answer: "Not at all. Shepherd Verses is designed for everyone, whether you're deeply familiar with scripture or just beginning your faith journey. The verses are chosen to speak to your feelings in a way that's accessible and meaningful."
  },
  {
    question: "What kinds of feelings can I share?",
    answer: "You can share a wide range of emotions including feeling anxious, tired, grateful, hopeful, heavy, peaceful, uncertain, and more. Shepherd Verses meets you wherever you are emotionally."
  },
  {
    question: "Will the scripture be relevant to how I feel?",
    answer: "Yes. Our companion thoughtfully selects scripture and affirmations that directly relate to the emotion you've shared, ensuring the message feels personal and relevant to your current state of mind."
  },
  {
    question: "Can I use Shepherd Verses more than once a day?",
    answer: "Absolutely. While many members use it as part of their morning routine, you can return to Shepherd Verses anytime you need encouragement, comfort, or a moment of peace throughout your day."
  },
]

// Cross Divider Component
function CrossDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
      <div className="w-14 h-px bg-gold" />
      <Cross className="size-7 text-gold" strokeWidth={2.5} />
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
        <div className="max-w-lg mx-auto px-2 sm:px-0">
          <div className="bg-popover rounded-2xl p-4 sm:p-5 lg:p-6 border border-warm-divider shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
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
