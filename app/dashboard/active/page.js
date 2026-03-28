"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ActiveCollaborationsPage() {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollabs = async () => {
    try {
      const res = await fetch("/api/collaborations/accepted");
      const data = await res.json();

      if (res.ok) {
        setCollabs(data.collaborations || []);
      }
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground">
          Active Collaborations
        </h1>

        {loading ? (
          <p className="mt-6 text-muted-foreground">Loading...</p>
        ) : collabs.length === 0 ? (
          <p className="mt-6 text-muted-foreground">
            No active collaborations yet.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {collabs.map((collab) => {
              const trip =
                collab.source_trip?.user_id === collab.requester_user_id
                  ? collab.source_trip
                  : collab.matched_trip;

              return (
                <div
                  key={collab.id}
                  className="rounded-xl border bg-card p-6"
                >
                  <h2 className="text-xl font-semibold text-foreground">
                    {trip?.destination}
                  </h2>

                  <p className="mt-2 text-muted-foreground">
                    {trip?.start_date} → {trip?.end_date}
                  </p>

                  <p className="mt-2 text-foreground">
                    Budget: ₹{trip?.budget || "N/A"}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <Link href={`/trip/${trip?.id}`}>
                      <Button>Open Trip</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}