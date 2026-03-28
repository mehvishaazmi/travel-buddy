import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { trip_id, amount, status, provider } = body

    if (!trip_id || !amount || !status || !provider) {
      return Response.json(
        { error: "All payment fields are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("payments")
      .insert([
        {
          user_id: userId,
          trip_id: Number(trip_id),
          amount: Number(amount),
          status,
          provider,
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
      { message: "Payment saved successfully", payment: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error("Save payment error:", error)
    return Response.json(
      { error: "Something went wrong while saving payment." },
      { status: 500 }
    )
  }
}