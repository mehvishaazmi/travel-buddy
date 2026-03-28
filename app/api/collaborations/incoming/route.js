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
        source_trip:trips!source_trip_id(*)
      `)
      .eq("target_user_id", userId)
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ requests: data })
  } catch (error) {
    console.error("Incoming collaborations error:", error)
    return Response.json(
      { error: "Failed to fetch incoming requests" },
      { status: 500 }
    )
  }
}