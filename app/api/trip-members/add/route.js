import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { trip_id, member_name } = body

    if (!trip_id || !member_name) {
      return Response.json(
        { error: "Trip ID and member name are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("trip_members")
      .insert([
        {
          trip_id: Number(trip_id),
          user_id: userId,
          member_name,
        },
      ])
      .select()

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(
      { message: "Member added successfully", member: data[0] },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: "Something went wrong while adding member." },
      { status: 500 }
    )
  }
}