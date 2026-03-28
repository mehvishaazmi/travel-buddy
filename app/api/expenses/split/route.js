import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const rawTripId = searchParams.get("trip_id")
    const tripId = Number(rawTripId)

    if (!rawTripId || Number.isNaN(tripId)) {
      return Response.json({ error: "Invalid trip_id" }, { status: 400 })
    }

    const { data: members, error: membersError } = await supabaseServer
      .from("trip_members")
      .select("*")
      .eq("trip_id", tripId)

    if (membersError) {
      return Response.json({ error: membersError.message }, { status: 500 })
    }

    const { data: expenses, error: expensesError } = await supabaseServer
      .from("expenses")
      .select("*")
      .eq("trip_id", tripId)

    if (expensesError) {
      return Response.json({ error: expensesError.message }, { status: 500 })
    }

    if (!members || members.length === 0) {
      return Response.json({
        totalExpense: 0,
        perPerson: 0,
        balances: [],
      })
    }

    const totalExpense = (expenses || []).reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    )

    const perPerson = totalExpense / members.length

    const balances = members.map((member) => {
      const paid = (expenses || [])
        .filter((expense) => expense.paid_by === member.member_name)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0)

      return {
        name: member.member_name,
        paid,
        balance: paid - perPerson,
      }
    })

    return Response.json({
      totalExpense,
      perPerson,
      balances,
    })
  } catch (error) {
    console.error("Split API error:", error)
    return Response.json(
      { error: "Something went wrong while calculating split." },
      { status: 500 }
    )
  }
}