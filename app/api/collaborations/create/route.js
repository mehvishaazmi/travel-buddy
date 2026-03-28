import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { source_trip_id, matched_trip_id } = body

    if (!source_trip_id || !matched_trip_id) {
      return Response.json(
        { error: "source_trip_id and matched_trip_id are required" },
        { status: 400 }
      )
    }

    const { data: matchedTrip, error: matchedTripError } = await supabaseServer
      .from("trips")
      .select("*")
      .eq("id", matched_trip_id)
      .single()

    if (matchedTripError || !matchedTrip) {
      return Response.json({ error: "Matched trip not found" }, { status: 404 })
    }

    const { data: existing, error: existingError } = await supabaseServer
      .from("trip_collaborations")
      .select("*")
      .eq("source_trip_id", source_trip_id)
      .eq("matched_trip_id", matched_trip_id)
      .eq("requester_user_id", userId)

    if (existingError) {
      return Response.json({ error: existingError.message }, { status: 500 })
    }

    if (existing && existing.length > 0) {
      return Response.json(
        { error: "Collaboration request already sent" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("trip_collaborations")
      .insert([
        {
          source_trip_id: Number(source_trip_id),
          matched_trip_id: Number(matched_trip_id),
          requester_user_id: userId,
          target_user_id: matchedTrip.user_id,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(
      { message: "Collaboration request sent", collaboration: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create collaboration error:", error)
    return Response.json(
      { error: "Something went wrong while creating collaboration request." },
      { status: 500 }
    )
  }
}