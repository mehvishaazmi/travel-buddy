import Razorpay from "razorpay"
import { auth } from "@clerk/nextjs/server"

export async function POST(req) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount } = await req.json()

    if (!amount || Number(amount) <= 0) {
      return Response.json({ error: "Valid amount is required" }, { status: 400 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return Response.json(order)
  } catch (error) {
    console.error("Create order error:", error)
    return Response.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    )
  }
}