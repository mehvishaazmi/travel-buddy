import { Star } from "lucide-react"

const testimonials = [
  {
    content: "TravelBuddy changed how I travel! Found amazing companions for my Japan trip and the expense tracking saved us so much hassle.",
    author: "Sarah Chen",
    role: "Digital Nomad",
    avatar: "S",
  },
  {
    content: "The cost splitting feature is brilliant. No more awkward money conversations with friends. Everything is transparent and fair.",
    author: "Marcus Rivera",
    role: "Adventure Traveler",
    avatar: "M",
  },
  {
    content: "I was nervous about solo travel, but TravelBuddy helped me connect with a great group for my European backpacking trip.",
    author: "Aisha Patel",
    role: "First-time Solo Traveler",
    avatar: "A",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Loved by travelers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Join thousands of happy adventurers who made unforgettable memories with TravelBuddy.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 lg:p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
