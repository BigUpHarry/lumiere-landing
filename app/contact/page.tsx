"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground text-balance mb-6"
            >
              Request your cinematic hotel demo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Send us your photos and we'll turn them into a cinematic walkthrough video in 1–3 days. No re-shoot required.
            </motion.p>
          </div>

          {/* Form */}
          <ContactForm />

          {/* Example Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 lg:mt-20"
          >
            <p className="text-sm text-muted-foreground text-center mb-6">
              See what's possible
            </p>
            <div className="relative aspect-video bg-muted border border-border overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
                alt="Hotel room example"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center cursor-pointer hover:bg-background transition-colors">
                  <svg
                    className="w-6 h-6 text-foreground ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Unlock your cinematic experience
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
