"use client"

import { motion } from "framer-motion"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Send 10–20 photos",
      description:
        "Share your existing hotel photography. High-resolution images work best.",
    },
    {
      number: "02",
      title: "We create your video",
      description:
        "We turn them into a cinematic walkthrough with smooth transitions and ambient music.",
    },
    {
      number: "03",
      title: "Ready in 1–3 days",
      description:
        "You receive a ready-to-use video optimised for web, social media, and booking platforms.",
    },
  ]

  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
            How it works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center md:text-left"
            >
              <span className="inline-block font-serif text-5xl lg:text-6xl text-muted-foreground/30 mb-4">
                {step.number}
              </span>
              <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
