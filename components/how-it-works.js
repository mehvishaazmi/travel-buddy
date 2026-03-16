const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your travel preferences, interests, and the destinations on your bucket list.",
  },
  {
    number: "02",
    title: "Find Your Buddies",
    description: "Browse through travelers heading to the same destination or post your trip to attract like-minded adventurers.",
  },
  {
    number: "03",
    title: "Plan Together",
    description: "Collaborate on itineraries, book accommodations, and organize activities all in one place with your group.",
  },
  {
    number: "04",
    title: "Track & Split",
    description: "Log expenses as you go, and let TravelBuddy automatically calculate fair splits for everyone.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Get started in minutes and hit the road with your new travel crew.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative z-10">
                <div className="text-5xl font-bold text-accent/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
