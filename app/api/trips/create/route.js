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
    const { destination, start_date, end_date, budget, description } = body

    if (!destination || !start_date || !end_date) {
      return Response.json(
        { error: "Destination, start date, and end date are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("trips")
      .insert([
        {
          user_id: userId,
          destination,
          start_date,
          end_date,
          budget: budget ? Number(budget) : null,
          description: description || null,
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
      { message: "Trip created successfully", trip: data[0] },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: "Something went wrong while creating the trip." },
      { status: 500 }
    )
  }
}