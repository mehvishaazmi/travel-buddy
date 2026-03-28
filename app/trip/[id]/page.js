"use client";

import ChatBox from "@/components/chat-box";
import AIAssistant from "@/components/ai-assistant";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TripPage() {
  const params = useParams();
  const { isLoaded } = useUser();

  const tripId = useMemo(() => Number(params?.id), [params]);

  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [splitData, setSplitData] = useState({
    totalExpense: 0,
    perPerson: 0,
    balances: [],
  });

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [memberName, setMemberName] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [message, setMessage] = useState("");
  const [addingExpense, setAddingExpense] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [tripPlan, setTripPlan] = useState("");
  const [planningTrip, setPlanningTrip] = useState(false);

  const emptySplitState = {
    totalExpense: 0,
    perPerson: 0,
    balances: [],
  };

  const fetchTrip = async () => {
    if (!tripId || Number.isNaN(tripId)) return;

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (!error) {
      setTrip(data);
      setTripPlan(data?.ai_plan || "");
    }
  };

  const fetchExpenses = async () => {
    if (!tripId || Number.isNaN(tripId)) return;

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("trip_id", tripId)
      .order("id", { ascending: false });

    if (!error) setExpenses(data || []);
  };

  const fetchMembers = async () => {
    if (!tripId || Number.isNaN(tripId)) return;

    const { data, error } = await supabase
      .from("trip_members")
      .select("*")
      .eq("trip_id", tripId)
      .order("id", { ascending: true });

    if (!error) setMembers(data || []);
  };

  const generateTripPlan = async () => {
    try {
      setPlanningTrip(true);
      setMessage("");

      const res = await fetch("/api/ai/trip-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trip_id: tripId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to generate trip plan.");
        return;
      }

      setTripPlan(data.reply || "No trip plan generated.");
      await fetchTrip();
      setMessage("AI trip plan generated and saved!");
    } catch (error) {
      console.error("Generate trip plan error:", error);
      setMessage("Something went wrong while generating the trip plan.");
    }

    setPlanningTrip(false);
  };

  const fetchPayments = async () => {
    if (!tripId || Number.isNaN(tripId)) return;

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("trip_id", tripId)
      .order("id", { ascending: false });

    if (!error) setPayments(data || []);
  };

  const fetchSplit = async () => {
    if (!tripId || Number.isNaN(tripId)) {
      setSplitData(emptySplitState);
      return;
    }

    try {
      const res = await fetch(`/api/expenses/split?trip_id=${tripId}`);
      const data = await res.json();

      if (res.ok) {
        setSplitData(data);
      } else {
        console.error("Split API error:", data.error);
        setSplitData(emptySplitState);
      }
    } catch (error) {
      console.error("Split error:", error);
      setSplitData(emptySplitState);
    }
  };

  const refreshTripData = async () => {
    await Promise.all([
      fetchTrip(),
      fetchExpenses(),
      fetchMembers(),
      fetchPayments(),
      fetchSplit(),
    ]);
  };

  const addMember = async (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    setAddingMember(true);
    setMessage("");

    try {
      const res = await fetch("/api/trip-members/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip_id: tripId,
          member_name: memberName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add member");
      } else {
        setMessage("Member added successfully!");
        setMemberName("");
        await fetchMembers();
        await fetchSplit();
      }
    } catch (error) {
      console.error("Add member error:", error);
      setMessage("Something went wrong while adding member.");
    }

    setAddingMember(false);
  };

  const deleteMember = async (memberId) => {
    setMessage("");

    const { error } = await supabase
      .from("trip_members")
      .delete()
      .eq("id", memberId);

    if (error) {
      setMessage("Error deleting member: " + error.message);
    } else {
      setMessage("Member deleted successfully!");
      await fetchMembers();
      await fetchSplit();
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || !paidBy) return;

    setAddingExpense(true);
    setMessage("");

    try {
      const res = await fetch("/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip_id: tripId,
          title: title.trim(),
          amount,
          paid_by: paidBy,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add expense");
      } else {
        setMessage("Expense added successfully!");
        setTitle("");
        setAmount("");
        setPaidBy("");
        await fetchExpenses();
        await fetchSplit();
      }
    } catch (error) {
      console.error("Add expense error:", error);
      setMessage("Something went wrong while adding expense.");
    }

    setAddingExpense(false);
  };

  const deleteExpense = async (expenseId) => {
    setMessage("");

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId);

    if (error) {
      setMessage("Error deleting expense: " + error.message);
    } else {
      setMessage("Expense deleted successfully!");
      await fetchExpenses();
      await fetchSplit();
    }
  };

  const handlePayment = async (amountToPay) => {
    try {
      setMessage("");

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountToPay }),
      });

      const order = await res.json();

      if (!res.ok) {
        setMessage(order.error || "Failed to create payment order");
        return;
      }

      if (typeof window === "undefined" || !window.Razorpay) {
        setMessage("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "TravelBuddy",
        description: "Trip settlement payment",
        order_id: order.id,
        handler: async function () {
          try {
            const saveRes = await fetch("/api/payment/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                trip_id: tripId,
                amount: amountToPay,
                status: "success",
                provider: "razorpay",
              }),
            });

            const saveData = await saveRes.json();

            if (!saveRes.ok) {
              setMessage(saveData.error || "Payment done but failed to save.");
              return;
            }

            setMessage("Payment successful and saved!");
            await fetchPayments();
          } catch (error) {
            console.error("Save payment frontend error:", error);
            setMessage("Payment successful but saving failed.");
          }
        },
        modal: {
          ondismiss: function () {
            setMessage("Payment popup closed.");
          },
        },
        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Something went wrong while opening payment.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!isLoaded) return;

      if (!tripId || Number.isNaN(tripId)) {
        setLoading(false);
        return;
      }

      await refreshTripData();
      setLoading(false);
    };

    loadData();
  }, [isLoaded, tripId]);

  if (!isLoaded || loading) {
    return <div className="p-8">Loading trip...</div>;
  }

  if (!tripId || Number.isNaN(tripId)) {
    return <div className="p-8">Invalid trip ID</div>;
  }

  if (!trip) {
    return <div className="p-8">Trip not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {trip.destination}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {trip.start_date} → {trip.end_date}
              </p>
            </div>

            {trip.budget && (
              <div className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground">
                Budget: ₹{trip.budget}
              </div>
            )}
          </div>

          {trip.description && (
            <div className="mt-4 rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">
                {trip.description}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Add Trip Member
          </h2>

          <form onSubmit={addMember} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Rahul, Aditya, Aman"
                required
              />
            </div>

            <Button type="submit" disabled={addingMember}>
              {addingMember ? "Adding..." : "Add Member"}
            </Button>
          </form>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Trip Members
          </h2>

          {members.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No members added yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border bg-background p-3"
                >
                  <p className="font-medium text-foreground">
                    {member.member_name}
                  </p>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteMember(member.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Add Expense</h2>

          <form onSubmit={addExpense} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="title">Expense Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hotel, Food, Taxi"
                required
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1200"
                required
              />
            </div>

            <div>
              <Label htmlFor="paidBy">Paid By</Label>
              <select
                id="paidBy"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none"
                required
              >
                <option value="">Select member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.member_name}>
                    {member.member_name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" disabled={addingExpense}>
              {addingExpense ? "Adding..." : "Add Expense"}
            </Button>
          </form>

          {message && (
            <div className="mt-4 rounded-lg border bg-muted p-3 text-sm text-foreground">
              {message}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Expense Split Summary
          </h2>

          {!splitData ? (
            <p className="mt-4 text-muted-foreground">Loading...</p>
          ) : splitData.balances.length === 0 ? (
            <p className="mt-4 text-muted-foreground">
              Add members and expenses to see split details.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Settlement Overview
              </p>
              <p>Total Expense: ₹{splitData.totalExpense}</p>
              <p>Per Person: ₹{Number(splitData.perPerson || 0).toFixed(2)}</p>

              {splitData.balances.map((member, index) => {
                const paid = Number(member.paid || 0);
                const balance = Number(member.balance || 0);

                return (
                  <div
                    key={index}
                    className="rounded-lg border bg-background p-4"
                  >
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Paid: ₹{paid.toFixed(2)}
                    </p>

                    {balance > 0 ? (
                      <p className="mt-2 text-green-600">
                        Gets ₹{balance.toFixed(2)}
                      </p>
                    ) : balance < 0 ? (
                      <div className="mt-2">
                        <p className="text-red-600">
                          Owes ₹{Math.abs(balance).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() => handlePayment(Math.abs(balance))}
                          style={{
                            marginTop: "12px",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Pay ₹{Math.abs(balance).toFixed(2)}
                        </button>
                      </div>
                    ) : (
                      <p className="mt-2 text-blue-600">Settled</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Payment History
          </h2>

          {payments.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No payments yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-lg border bg-background p-4"
                >
                  <p className="font-medium text-foreground">
                    Amount: ₹{payment.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {payment.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Provider: {payment.provider}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Payment recorded successfully
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Expense Summary
          </h2>

          {expenses.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No expenses added yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-lg border bg-background p-4"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {expense.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Amount: ₹{expense.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Paid by: {expense.paid_by}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                AI Trip Planner ✨
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Generate and save a personalized travel plan using your trip
                details.
              </p>
            </div>

            <button
              type="button"
              onClick={generateTripPlan}
              disabled={planningTrip}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "12px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                minWidth: "180px",
                opacity: planningTrip ? 0.7 : 1,
              }}
            >
              {planningTrip ? "Generating..." : "Generate AI Plan"}
            </button>
          </div>

          {tripPlan && (
            <div className="mt-6 rounded-lg border bg-background p-4 text-sm text-foreground">
              <p className="whitespace-pre-line">{tripPlan}</p>
            </div>
          )}
        </div>
        <ChatBox tripId={tripId} />
        <AIAssistant />
      </div>
    </div>
  );
}
