import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data, error } = await supabaseServer
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false })

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(
      { trips: data || [] },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      { error: "Something went wrong while fetching trips." },
      { status: 500 }
    )
  }
}