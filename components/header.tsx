"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-serif text-xl lg:text-2xl tracking-tight text-foreground">
            Lumière
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Work
            </a>
            <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Process
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>

          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="bg-foreground text-background hover:bg-foreground/90 text-sm px-6"
              asChild
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Work
            </a>
            <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Process
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <Button 
              variant="default" 
              className="bg-foreground text-background hover:bg-foreground/90 text-sm w-full mt-2"
              asChild
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
