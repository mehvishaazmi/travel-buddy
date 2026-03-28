"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TripMatchesPage() {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchMatches = async () => {
    try {
      const res = await fetch(`/api/trips/matches?trip_id=${id}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load matches");
      } else {
        setMatches(data.matches || []);
      }
    } catch (error) {
      setMessage("Something went wrong while loading matches.");
    }

    setLoading(false);
  };

  const handleCollaborate = async (matchedTripId) => {
    try {
      setMessage("");

      const res = await fetch("/api/collaborations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_trip_id: id,
          matched_trip_id: matchedTripId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to send collaboration request");
      } else {
        setMessage("Collaboration request sent successfully!");
      }
    } catch (error) {
      setMessage("Something went wrong while sending collaboration request.");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [id]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground">
          Similar Trips
        </h1>
        <p className="mt-2 text-muted-foreground">
          We found trips that may match your destination, budget, and dates.
        </p>

        <div className="mt-6 flex gap-4">
          <Link href={`/trip/${id}`}>
            <Button variant="outline">Back to Trip</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">My Trips</Button>
          </Link>
        </div>

        {message && (
          <div className="mt-6 rounded-lg border bg-muted p-3 text-sm text-foreground">
            {message}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-muted-foreground">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No similar trips found yet.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {matches.map((trip) => (
              <div
                key={trip.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {trip.destination}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {trip.start_date} → {trip.end_date}
                </p>

                <p className="mt-2 text-sm text-foreground">
                  Budget: ₹{trip.budget || "Not specified"}
                </p>

                {trip.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {trip.description}
                  </p>
                )}

                <p className="mt-4 text-sm font-medium text-foreground">
                  Match Score: {trip.match_score}/100
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {trip.reasons.map((reason, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                    >
                      {reason}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Button onClick={() => handleCollaborate(trip.id)}>
                    Collaborate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}