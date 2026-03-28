"use client"

import { useUser } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser()

  if (!isLoaded) return null

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* 🔥 HERO SECTION (changes when logged in) */}
      <section className="pt-32 pb-20 text-center px-6">
        {!isSignedIn ? (
          <>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Find Travel Buddies & Split Expenses ✈️
            </h1>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Connect with travelers, plan trips together, and manage expenses easily.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-accent text-accent-foreground">
                  Get Started
                </Button>
              </Link>

              <Link href="/login">
                <Button variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Welcome back, {user?.firstName || "Traveler"} ✈️
            </h1>

            <p className="mt-4 text-muted-foreground">
              Ready for your next adventure?
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/discover">
                <Button className="bg-accent text-accent-foreground">
                  Explore Trips
                </Button>
              </Link>

              <Link href="/create-trip">
                <Button variant="outline">
                  Create Trip
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 🔥 REST LANDING CONTENT (same for both) */}
      <div id="features">
        <Features />
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <CTA />
      <Footer />
    </main>
  )
}