"use client"

import { ArrowRight, Images, Film } from "lucide-react"
import { motion } from "framer-motion"

export function BeforeAfter() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground text-balance">
            From stills to cinematic walkthrough
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Images className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
                Your Photos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div
                className="aspect-[4/3] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop')`,
                }}
              />
              <div
                className="aspect-[4/3] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1474&auto=format&fit=crop')`,
                }}
              />
              <div
                className="aspect-[4/3] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop')`,
                }}
              />
              <div
                className="aspect-[4/3] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop')`,
                }}
              />
            </div>
          </motion.div>

          {/* Arrow for desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10"
          >
            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-foreground" />
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Film className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
                Your Video
              </span>
            </div>
            <div
              className="relative aspect-video bg-cover bg-center rounded-sm overflow-hidden"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-foreground/10" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="flex-1 h-1 bg-background/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "66%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-background rounded-full"
                  />
                </div>
                <span className="text-background text-xs">0:32 / 0:45</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
