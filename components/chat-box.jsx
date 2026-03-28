"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ChatBox({ tripId }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "User";

  const formatTime = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchMessages = async () => {
    if (!tripId || Number.isNaN(Number(tripId))) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("trip_id", Number(tripId))
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data || []);
    } else {
      console.error("Fetch messages error:", error.message);
    }
  };

  const sendMessage = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      alert("Please log in first.");
      return;
    }

    if (!input.trim()) return;

    setSending(true);

    const { error } = await supabase.from("messages").insert([
      {
        trip_id: Number(tripId),
        user_id: user.id,
        user_name: displayName,
        message: input.trim(),
      },
    ]);

    if (error) {
      console.error("Send message error:", error.message);
    } else {
      setInput("");
    }

    setSending(false);
  };

  useEffect(() => {
    if (!tripId || Number.isNaN(Number(tripId))) return;

    fetchMessages();

    const channel = supabase
      .channel(`chat-room-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `trip_id=eq.${Number(tripId)}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold text-foreground">Trip Chat</h2>

      {!isLoaded ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading chat...</p>
      ) : !isSignedIn ? (
        <p className="mt-4 text-sm text-red-600">
          Please log in to use chat.
        </p>
      ) : (
        <>
          <div className="mt-4 h-80 overflow-y-auto rounded-lg border bg-background p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No messages yet. Start the conversation.
              </p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => {
                  const isOwn = msg.user_id === user?.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                          isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-2 text-xs opacity-80">
                          <span className="font-medium">
                            {isOwn ? "You" : msg.user_name || "User"}
                          </span>
                          <span>•</span>
                          <span>{formatTime(msg.created_at)}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={sending}
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}