"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.error || "AI request failed.");
      } else {
        setResponse(data.reply || "No response received.");
      }
    } catch (error) {
      setResponse("Something went wrong while asking AI.");
    }

    setLoading(false);
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold text-foreground">
        AI Travel Assistant 🤖
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Ask for itinerary ideas, budget suggestions, places to visit, food recommendations, and more.
      </p>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about travel..."
          style={{
            flex: "1",
            minWidth: "260px",
            padding: "14px 16px",
            border: "1px solid #d4d4d8",
            borderRadius: "10px",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            color: "#111827",
            outline: "none",
          }}
        />

        <button
          type="button"
          onClick={askAI}
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "14px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            minWidth: "110px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {response && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            color: "#111827",
            fontSize: "14px",
            whiteSpace: "pre-line",
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}