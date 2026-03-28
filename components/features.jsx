import { Users, Map, Receipt, Calculator } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Find Travel Companions",
    description: "Connect with travelers who share your interests, travel style, and destination preferences. Never travel alone again.",
  },
  {
    icon: Map,
    title: "Trip Planning",
    description: "Create detailed itineraries, share plans with your group, and keep everyone on the same page throughout the journey.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Log every expense in real-time. From hotels to street food, keep track of where your money goes with ease.",
  },
  {
    icon: Calculator,
    title: "Split Costs Easily",
    description: "Automatically calculate who owes what. Support for multiple currencies and uneven splits for hassle-free settlements.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need for group travel
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            From finding the perfect travel buddies to settling expenses, we have got you covered at every step.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl border border-border p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
