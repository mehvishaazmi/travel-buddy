"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function TestSupabasePage() {
  const [message, setMessage] = useState("")
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      setMessage("Fetch error: " + error.message)
    } else {
      setTrips(data || [])
    }
  }

  const addTestTrip = async () => {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.from("trips").insert([
      {
        user_id: "test-user-1",
        destination: "Goa",
        start_date: "2026-04-10",
        end_date: "2026-04-15",
        budget: 15000,
        description: "Test trip from app",
      },
    ])

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Trip added successfully")
      fetchTrips()
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-foreground">Supabase Test</h1>
        <p className="mt-2 text-muted-foreground">
          This page checks whether your app can insert and read data from Supabase.
        </p>

        <div className="mt-6">
          <Button onClick={addTestTrip} disabled={loading}>
            {loading ? "Adding..." : "Add Test Trip"}
          </Button>
        </div>

        {message && (
          <div className="mt-4 rounded-lg border bg-muted p-3 text-sm text-foreground">
            {message}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground">
            Trips from Database
          </h2>

          {trips.length === 0 ? (
            <p className="mt-3 text-muted-foreground">No trips found yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="rounded-xl border bg-background p-4"
                >
                  <p className="text-lg font-semibold text-foreground">
                    {trip.destination}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {trip.start_date} to {trip.end_date}
                  </p>

                  <p className="mt-2 text-sm text-foreground">
                    Budget: ₹{trip.budget}
                  </p>

                  <p className="text-sm text-foreground">
                    Description: {trip.description}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    User ID: {trip.user_id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}