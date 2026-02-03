export function Footer() {
  return (
    <footer className="border-t border-border py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a href="#" className="font-serif text-xl text-foreground">
              Lumière
            </a>
            <span className="hidden md:block text-border">|</span>
            <p className="text-sm text-muted-foreground">
              Cinematic hotel videos from your existing photography
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:hello@lumiere.co" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              harrytmwood@me.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Lumière. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
