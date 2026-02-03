"use client"

import { motion } from "framer-motion"

export function VideoShowcase() {
  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
            Recent work
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video rounded-sm overflow-hidden"
        >
          {/* Vimeo Embed */}
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src="https://player.vimeo.com/video/1161372252?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title="Devon Hotel – Cinematic Property Video"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Created entirely from existing hotel photography
        </motion.p>
      </div>
    </section>
  )
}
