"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Pricing() {
  const plans = [
    {
      name: "Teaser",
      price: "$1,000",
      duration: "15–30 seconds",
      description: "Ideal for social media and quick property overviews.",
      features: [
        "Cinematic transitions",
        "Licensed ambient music",
        "1–2 revision rounds",
        "Optimised for web & social",
        "Delivered in 1–3 days",
      ],
    },
    {
      name: "Hero Video",
      price: "$2,000",
      duration: "~60 seconds",
      description: "Complete property showcase for your website and OTAs.",
      features: [
        "Extended cinematic narrative",
        "Premium music selection",
        "2–3 revision rounds",
        "Multiple format exports",
        "Delivered in 2–4 days",
      ],
      highlighted: true,
    },
  ]

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground mb-4">
            Simple pricing
          </h2>
          <p className="text-muted-foreground">
            Customer supplies still photography. All prices exclude GST.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`p-8 lg:p-10 rounded-sm ${
                plan.highlighted
                  ? "bg-foreground text-background"
                  : "bg-background border border-border"
              }`}
            >
              <div className="mb-8">
                <h3
                  className={`font-serif text-2xl mb-2 ${
                    plan.highlighted ? "text-background" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted
                      ? "text-background/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.duration}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-serif text-4xl lg:text-5xl ${
                      plan.highlighted ? "text-background" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted
                        ? "text-background/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    + GST
                  </span>
                </div>
              </div>

              <p
                className={`mb-8 ${
                  plan.highlighted
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      className={`h-4 w-4 flex-shrink-0 ${
                        plan.highlighted
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted
                          ? "text-background/90"
                          : "text-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
                asChild
              >
                <a href="/contact">Start Your Walkthrough</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
