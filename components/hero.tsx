"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight text-foreground text-balance mb-8"
        >
          Show your guests the experience before they arrive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
        >
          We turn your existing hotel photography into short cinematic walkthrough videos. Ready in 1–3 days, no re-shoot required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 h-12 text-sm"
            asChild
          >
            <a href="#work">Watch a 60-Second Walkthrough</a>
          </Button>
          <a
            href="#process"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Discover how it works
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-border" />
      </motion.div>
    </section>
  )
}
