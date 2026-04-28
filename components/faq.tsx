"use client"

import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-12 h-px" style={{ backgroundColor: '#D4B96A' }} />
      <span style={{ color: '#D4B96A', fontSize: '18px' }}>&#10013;</span>
      <div className="w-12 h-px" style={{ backgroundColor: '#D4B96A' }} />
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative pt-10 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background Image - cross on left side */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iStock-1164883816-2-gSL0XSXOLnHcHGGunyw5N3XNuZ8n6c.jpg"
          alt=""
          fill
          className="object-cover"
          style={{
            opacity: 0.9,
            filter: 'brightness(1.1)',
            objectPosition: 'left center',
          }}
        />
        {/* White gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <CrossDivider />
          <h2 
            className="font-serif text-2xl lg:text-3xl leading-tight"
            style={{ color: '#001C5F' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion Card - centered */}
        <div className="max-w-lg mx-auto">
          <div 
            className="bg-white rounded-2xl p-5 lg:p-6"
            style={{ border: '0.5px solid #D5CDB8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b last:border-b-0"
                  style={{ borderColor: '#E5E2DC' }}
                >
                  <AccordionTrigger 
                    className="font-serif text-left text-[15px] py-4 hover:no-underline"
                    style={{ color: '#001C5F', fontWeight: 600 }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="font-sans text-sm pb-4"
                    style={{ color: '#2A4B7C', lineHeight: '1.7', fontWeight: 500 }}
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
