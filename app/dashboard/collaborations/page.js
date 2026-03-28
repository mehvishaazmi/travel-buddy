"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollaborationsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/collaborations/incoming");
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load collaboration requests");
      } else {
        setRequests(data.requests || []);
      }
    } catch (error) {
      setMessage("Something went wrong while loading requests.");
    }

    setLoading(false);
  };

  const handleAccept = async (collaborationId) => {
    try {
      setMessage("");

      const res = await fetch("/api/collaborations/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collaboration_id: collaborationId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to accept request");
      } else {
        setMessage("Collaboration accepted successfully!");
        await fetchRequests();
      }
    } catch (error) {
      setMessage("Something went wrong while accepting request.");
    }
  };

  const handleReject = async (collaborationId) => {
    try {
      setMessage("");

      const res = await fetch("/api/collaborations/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collaboration_id: collaborationId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to reject request");
      } else {
        setMessage("Collaboration rejected.");
        await fetchRequests();
      }
    } catch (error) {
      setMessage("Something went wrong while rejecting request.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Collaboration Inbox
            </h1>
            <p className="mt-2 text-muted-foreground">
              View and manage incoming collaboration requests.
            </p>
          </div>

          <Link href="/dashboard">
            <Button variant="outline">Back to My Trips</Button>
          </Link>
        </div>

        {message && (
          <div className="mt-6 rounded-lg border bg-muted p-3 text-sm text-foreground">
            {message}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-muted-foreground">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No pending collaboration requests.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  Incoming Request
                </h2>

                <p className="mt-3 text-sm text-muted-foreground">
                  Status: {request.status}
                </p>

                {request.source_trip && (
                  <div className="mt-4 rounded-lg border bg-background p-4">
                    <p className="font-medium text-foreground">
                      Destination: {request.source_trip.destination}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Dates: {request.source_trip.start_date} →{" "}
                      {request.source_trip.end_date}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Budget: ₹{request.source_trip.budget || "Not specified"}
                    </p>
                    {request.source_trip.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {request.source_trip.description}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <Button onClick={() => handleAccept(request.id)}>
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
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