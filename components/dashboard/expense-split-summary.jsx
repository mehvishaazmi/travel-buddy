'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

const balances = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face', initials: 'SC' },
    amount: 425,
    direction: 'owes-you',
  },
  {
    id: 2,
    user: { name: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', initials: 'MW' },
    amount: 180,
    direction: 'you-owe',
  },
  {
    id: 3,
    user: { name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face', initials: 'ET' },
    amount: 95,
    direction: 'owes-you',
  },
]

export function ExpenseSplitSummary() {
  const totalOwed = balances
    .filter((b) => b.direction === 'owes-you')
    .reduce((acc, b) => acc + b.amount, 0)
  
  const totalYouOwe = balances
    .filter((b) => b.direction === 'you-owe')
    .reduce((acc, b) => acc + b.amount, 0)

  const netBalance = totalOwed - totalYouOwe

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle>Split Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Net Balance */}
        <div className="mb-6 rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">Your Net Balance</p>
          <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-accent' : 'text-destructive'}`}>
            {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {netBalance >= 0 ? 'You are owed overall' : 'You owe overall'}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-accent">
              <ArrowDownLeft className="size-4" />
              <span className="text-sm font-medium">You get</span>
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">${totalOwed}</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <ArrowUpRight className="size-4" />
              <span className="text-sm font-medium">You owe</span>
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">${totalYouOwe}</p>
          </div>
        </div>

        {/* Individual Balances */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Individual Balances</p>
          {balances.map((balance) => (
            <div
              key={balance.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage src={balance.user.avatar} alt={balance.user.name} />
                  <AvatarFallback className="text-xs">{balance.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{balance.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {balance.direction === 'owes-you' ? 'owes you' : 'you owe'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${
                  balance.direction === 'owes-you' ? 'text-accent' : 'text-orange-500'
                }`}>
                  {balance.direction === 'owes-you' ? '+' : '-'}${balance.amount}
                </span>
                <Button variant="ghost" size="icon" className="size-7">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Settle All Balances
        </Button>
      </CardContent>
    </Card>
  )
}