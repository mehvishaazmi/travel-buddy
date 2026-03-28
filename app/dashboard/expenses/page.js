'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground">
            Manage expenses from your trip pages.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/dashboard">
            <Button className="w-full">Go to My Trips</Button>
          </Link>

          <Link href="/create-trip">
            <Button variant="outline" className="w-full">
              Create New Trip
            </Button>
          </Link>
        </div>

        <div className="mt-6 rounded-lg border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            This page was simplified for production deployment. Use individual
            trip pages to add members, add expenses, split costs, make payments,
            chat, and generate AI plans.
          </p>
        </div>
      </div>
    </div>
  )
}