"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DiscoverPage() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return <div className="p-8">Please login first.</div>
  }

  const destinations = [
    {
      name: "Goa",
      desc: "Beaches, nightlife, and chill vibes",
      budget: "₹8,000 - ₹15,000",
    },
    {
      name: "Manali",
      desc: "Mountains, snow, and adventure",
      budget: "₹10,000 - ₹18,000",
    },
    {
      name: "Jaipur",
      desc: "Royal palaces and rich culture",
      budget: "₹6,000 - ₹12,000",
    },
  ]

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Discover Trips</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {destinations.map((place, i) => (
          <div key={i} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p className="mt-2 text-muted-foreground">{place.desc}</p>
            <p className="mt-2 text-sm">Budget: {place.budget}</p>

            <Link href="/create-trip">
              <Button className="mt-4 w-full">
                Choose This Trip
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}