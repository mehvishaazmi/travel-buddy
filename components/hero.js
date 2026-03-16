import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Join 50,000+ travelers worldwide</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Find Travel Buddies & Track Expenses
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Connect with like-minded travelers, plan unforgettable trips together, and never worry about splitting costs again. Your next adventure starts here.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Start Your Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Travelers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">120+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">$2M+</div>
                <div className="text-sm text-muted-foreground">Expenses Tracked</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl border border-border shadow-xl p-6 lg:p-8">
              {/* Mock App UI */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Trip to Bali</div>
                  <div className="text-sm text-muted-foreground">4 travelers · 7 days</div>
                </div>
              </div>

              {/* Travelers */}
              <div className="flex -space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-accent/30 border-2 border-card flex items-center justify-center text-sm font-medium text-accent">S</div>
                <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-sm font-medium text-primary">M</div>
                <div className="h-10 w-10 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center text-sm font-medium text-accent">A</div>
                <div className="h-10 w-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-sm font-medium text-muted-foreground">+2</div>
              </div>

              {/* Expense Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Hotel Stay</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">$420</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Transportation</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">$85</span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your share</span>
                <span className="text-lg font-bold text-accent">$126.25</span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-card rounded-xl border border-border shadow-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Expense Split</div>
                  <div className="text-sm font-semibold text-foreground">Auto-calculated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
