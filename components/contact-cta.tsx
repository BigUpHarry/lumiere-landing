"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ContactCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground text-balance mb-6"
        >
          See how your hotel could shine on video
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
        >
          No obligation, just a quick look.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 px-10 h-12 text-sm"
            asChild
          >
            <a href="/contact">Get in Touch</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
