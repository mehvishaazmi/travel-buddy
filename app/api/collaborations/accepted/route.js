import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabaseServer
      .from("trip_collaborations")
      .select(`
        *,
        source_trip:trips!source_trip_id(*),
        matched_trip:trips!matched_trip_id(*)
      `)
      .or(`requester_user_id.eq.${userId},target_user_id.eq.${userId}`)
      .eq("status", "accepted")
      .order("created_at", { ascending: false })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ collaborations: data })
  } catch (error) {
    console.error("Accepted collaborations error:", error)
    return Response.json(
      { error: "Failed to fetch accepted collaborations" },
      { status: 500 }
    )
  }
}