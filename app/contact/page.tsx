"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground text-balance mb-6"
            >
              Bring your property to life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
            >
              If this feels like a fit for your property, feel free to reach out directly.
            </motion.p>
          </div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            <a
              href="mailto:lumieresvideos@gmail.com"
              className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-lg">lumieresvideos@gmail.com</span>
            </a>

            <a
              href="tel:+64275057536"
              className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
            >
              <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-lg">+64 27 505 7536</span>
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <a
              href="https://www.linkedin.com/in/harry-wood-a959ab337"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-muted-foreground transition-colors">
                <img
                  src="/images/profile.jpg"
                  alt="Harry Wood"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Connect on LinkedIn
              </span>
            </a>
          </motion.div>

          {/* Helper Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-muted-foreground text-center"
          >
            When reaching out, including your hotel name and website is helpful.
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
