import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Connection } from "@/components/connection"
import { HowItWorks } from "@/components/how-it-works"
import { Plans } from "@/components/plans"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Socials } from "@/components/socials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Connection />
        <HowItWorks />
        <Plans />
        <Reviews />
        <FAQ />
        <Socials />
      </main>
      <Footer />
    </div>
  )
}
