import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { collaboration_id } = await req.json()

    if (!collaboration_id) {
      return Response.json(
        { error: "collaboration_id is required" },
        { status: 400 }
      )
    }

    const { data: collaboration, error: fetchError } = await supabaseServer
      .from("trip_collaborations")
      .select("*")
      .eq("id", collaboration_id)
      .single()

    if (fetchError || !collaboration) {
      return Response.json({ error: "Request not found" }, { status: 404 })
    }

    // only target user can accept
    if (collaboration.target_user_id !== userId) {
      return Response.json({ error: "Not allowed" }, { status: 403 })
    }

    const { error } = await supabaseServer
      .from("trip_collaborations")
      .update({ status: "accepted" })
      .eq("id", collaboration_id)

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ message: "Collaboration accepted" })
  } catch (error) {
    console.error("Accept error:", error)
    return Response.json(
      { error: "Something went wrong while accepting request" },
      { status: 500 }
    )
  }
}