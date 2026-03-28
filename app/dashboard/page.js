"use client"

import { useEffect, useState } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/trips/my-trips")
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || "Failed to fetch trips")
      } else {
        setTrips(data.trips || [])
      }
    } catch (error) {
      setMessage("Something went wrong while loading trips.")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Trips</h2>

          <Button asChild>
            <Link href="/create-trip">Create Trip</Link>
          </Button>
        </div>

        {loading ? (
          <p className="mt-6 text-muted-foreground">Loading trips...</p>
        ) : message ? (
          <p className="mt-6 text-red-600">{message}</p>
        ) : trips.length === 0 ? (
          <p className="mt-6 text-muted-foreground">
            You haven't created any trips yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <Link
                key={trip.id}
                href={`/trip/${trip.id}`}
                className="block rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{trip.destination}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {trip.start_date} → {trip.end_date}
                </p>

                {trip.budget && (
                  <p className="mt-2 text-sm">Budget: ₹{trip.budget}</p>
                )}

                {trip.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {trip.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}