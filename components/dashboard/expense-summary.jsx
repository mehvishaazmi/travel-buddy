'use client'

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plus } from 'lucide-react'

const expenses = [
  { category: 'Accommodation', amount: 1450, percentage: 34, color: 'bg-accent' },
  { category: 'Transport', amount: 820, percentage: 19, color: 'bg-chart-4' },
  { category: 'Food & Dining', amount: 680, percentage: 16, color: 'bg-chart-5' },
  { category: 'Activities', amount: 590, percentage: 14, color: 'bg-chart-2' },
  { category: 'Shopping', amount: 450, percentage: 11, color: 'bg-chart-3' },
  { category: 'Other', amount: 290, percentage: 6, color: 'bg-muted-foreground' },
]

const recentTransactions = [
  { id: 1, description: 'Flight to Tokyo', amount: -450, date: 'Today', paidBy: 'You' },
  { id: 2, description: 'Hotel deposit', amount: -200, date: 'Yesterday', paidBy: 'You' },
  { id: 3, description: 'Split from Sarah', amount: 125, date: 'Mar 10', paidBy: 'Sarah' },
  { id: 4, description: 'Rail pass', amount: -180, date: 'Mar 8', paidBy: 'You' },
]

export function ExpenseSummary() {
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle>Expense Breakdown</CardTitle>
          <CardAction>
            <Button variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent">
              Details
              <ArrowRight className="size-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold">${total.toLocaleString()}</p>
          </div>

          {/* Stacked bar */}
          <div className="mb-4 flex h-3 overflow-hidden rounded-full">
            {expenses.map((expense) => (
              <div
                key={expense.category}
                className={`${expense.color}`}
                style={{ width: `${expense.percentage}%` }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div key={expense.category} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`size-3 rounded-full ${expense.color}`} />
                  <span className="text-muted-foreground">{expense.category}</span>
                </div>
                <span className="font-medium">${expense.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle>Recent Transactions</CardTitle>
          <CardAction>
            <Button size="icon" variant="outline" className="size-7">
              <Plus className="size-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} · {transaction.paidBy}
                  </p>
                </div>
                <span className={`text-sm font-semibold ${
                  transaction.amount > 0 ? 'text-chart-2' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4 w-full">
            View All Transactions
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">You owe</p>
              <p className="text-xl font-bold text-destructive">$245</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">You are owed</p>
              <p className="text-xl font-bold text-chart-2">$180</p>
            </div>
          </div>
          <Button className="mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Settle Up
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
