import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { trip_id } = await req.json();

    if (!trip_id) {
      return Response.json({ error: "trip_id is required" }, { status: 400 });
    }

    const { data: trip, error: tripError } = await supabaseServer
      .from("trips")
      .select("*")
      .eq("id", Number(trip_id))
      .single();

    if (tripError || !trip) {
      return Response.json({ error: "Trip not found" }, { status: 404 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const prompt = `
Create a short practical trip plan for this travel trip.

Destination: ${trip.destination || "Not specified"}
Start date: ${trip.start_date || "Not specified"}
End date: ${trip.end_date || "Not specified"}
Budget: ₹${trip.budget || "Not specified"}
Description / preferences: ${trip.description || "Not specified"}

Give the answer in this format:
1. Short overview
2. Best places to visit
3. Suggested itinerary by day
4. Approx budget tips
5. Food / local recommendations

Keep it practical, concise, and beginner-friendly.
`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel planner. Give practical, budget-aware, realistic plans.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse =
      completion.choices?.[0]?.message?.content || "No plan generated.";

    const { error: updateError } = await supabaseServer
      .from("trips")
      .update({ ai_plan: aiResponse })
      .eq("id", Number(trip_id));

    if (updateError) {
      return Response.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return Response.json({
      reply: aiResponse,
    });
  } catch (error) {
    console.error("Trip plan AI error:", error);
    return Response.json(
      { error: error?.message || "Failed to generate trip plan." },
      { status: 500 }
    );
  }
}