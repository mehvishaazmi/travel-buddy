import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

function datesOverlap(start1, end1, start2, end2) {
  return new Date(start1) <= new Date(end2) && new Date(start2) <= new Date(end1)
}

function budgetScore(b1, b2) {
  if (!b1 || !b2) return 0
  const diff = Math.abs(Number(b1) - Number(b2))
  if (diff <= 2000) return 30
  if (diff <= 5000) return 20
  if (diff <= 10000) return 10
  return 0
}

export async function GET(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const tripId = searchParams.get("trip_id")

    if (!tripId) {
      return Response.json({ error: "trip_id is required" }, { status: 400 })
    }

    const { data: currentTrip, error: currentTripError } = await supabaseServer
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single()

    if (currentTripError || !currentTrip) {
      return Response.json({ error: "Trip not found" }, { status: 404 })
    }

    const { data: allTrips, error: allTripsError } = await supabaseServer
      .from("trips")
      .select("*")
      .neq("id", tripId)
      .neq("user_id", userId)

    if (allTripsError) {
      return Response.json({ error: allTripsError.message }, { status: 500 })
    }

    const matches = (allTrips || [])
      .map((trip) => {
        let score = 0
        const reasons = []

        if (
          trip.destination?.trim().toLowerCase() ===
          currentTrip.destination?.trim().toLowerCase()
        ) {
          score += 50
          reasons.push("Same destination")
        }

        const bScore = budgetScore(currentTrip.budget, trip.budget)
        if (bScore > 0) {
          score += bScore
          reasons.push("Similar budget")
        }

        if (
          datesOverlap(
            currentTrip.start_date,
            currentTrip.end_date,
            trip.start_date,
            trip.end_date
          )
        ) {
          score += 20
          reasons.push("Dates overlap")
        }

        return {
          ...trip,
          match_score: score,
          reasons,
        }
      })
      .filter((trip) => trip.match_score > 0)
      .sort((a, b) => b.match_score - a.match_score)

    return Response.json({ matches })
  } catch (error) {
    console.error("Match API error:", error)
    return Response.json(
      { error: "Something went wrong while finding matches." },
      { status: 500 }
    )
  }
}