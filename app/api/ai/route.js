import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel assistant. Give short, practical, budget-friendly travel suggestions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({
      reply: completion.choices?.[0]?.message?.content || "No response generated.",
    });
  } catch (error) {
    console.error("AI ERROR FULL:", error);
    return Response.json(
      {
        error:
          error?.message ||
          error?.error?.message ||
          "Unknown AI error",
      },
      { status: 500 }
    );
  }
}