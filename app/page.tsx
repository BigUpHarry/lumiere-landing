import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { VideoShowcase } from "@/components/video-showcase"
import { BeforeAfter } from "@/components/before-after"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { ContactCTA } from "@/components/contact-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <VideoShowcase />
      <BeforeAfter />
      <HowItWorks />
      <Pricing />
      <ContactCTA />
      <Footer />
    </main>
  )
}
