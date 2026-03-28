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
    const { trip_id, title, amount, paid_by } = body

    if (!trip_id || !title || !amount || !paid_by) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("expenses")
      .insert([
        {
          trip_id: Number(trip_id),
          title,
          amount: Number(amount),
          paid_by,
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
      { message: "Expense added successfully", expense: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error("Expense API error:", error)
    return Response.json(
      { error: "Something went wrong while adding expense." },
      { status: 500 }
    )
  }
}