'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Plane,
  Hotel,
  UtensilsCrossed,
  Ticket,
  ShoppingBag,
  Car,
  MoreHorizontal,
  Filter,
  Search,
} from 'lucide-react'

const categoryIcons = {
  transport: Plane,
  accommodation: Hotel,
  food: UtensilsCrossed,
  activities: Ticket,
  shopping: ShoppingBag,
  car: Car,
}

const categoryColors = {
  transport: 'bg-blue-100 text-blue-700',
  accommodation: 'bg-teal-100 text-teal-700',
  food: 'bg-orange-100 text-orange-700',
  activities: 'bg-purple-100 text-purple-700',
  shopping: 'bg-pink-100 text-pink-700',
  car: 'bg-gray-100 text-gray-700',
}

const expenses = [
  {
    id: 1,
    description: 'Flight tickets to Bali',
    amount: 1240,
    category: 'transport',
    paidBy: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face', initials: 'JD' },
    date: '2024-03-15',
    splitWith: 4,
  },
  {
    id: 2,
    description: 'Villa accommodation (5 nights)',
    amount: 2100,
    category: 'accommodation',
    paidBy: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face', initials: 'SC' },
    date: '2024-03-15',
    splitWith: 4,
  },
  {
    id: 3,
    description: 'Group dinner at Locavore',
    amount: 320,
    category: 'food',
    paidBy: { name: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', initials: 'MW' },
    date: '2024-03-16',
    splitWith: 4,
  },
  {
    id: 4,
    description: 'Scuba diving tour',
    amount: 480,
    category: 'activities',
    paidBy: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face', initials: 'JD' },
    date: '2024-03-17',
    splitWith: 3,
  },
  {
    id: 5,
    description: 'Scooter rental (3 days)',
    amount: 90,
    category: 'car',
    paidBy: { name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face', initials: 'ET' },
    date: '2024-03-17',
    splitWith: 2,
  },
  {
    id: 6,
    description: 'Souvenirs & gifts',
    amount: 165,
    category: 'shopping',
    paidBy: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face', initials: 'SC' },
    date: '2024-03-18',
    splitWith: 4,
  },
]

const groupMembers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Sarah Chen' },
  { id: '3', name: 'Mike Wilson' },
  { id: '4', name: 'Emma Thompson' },
]

export function ExpensesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0)

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>All Expenses</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {expenses.length} expenses totaling ${totalExpenses.toLocaleString()}
            </p>
          </div>
          <CardAction>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="size-4" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>
                    Add an expense to split with your travel group.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="What was this expense for?" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="amount" type="number" className="pl-7" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="accommodation">Accommodation</SelectItem>
                          <SelectItem value="food">Food & Dining</SelectItem>
                          <SelectItem value="activities">Activities</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="car">Car/Rental</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidBy">Paid by</Label>
                    <Select>
                      <SelectTrigger id="paidBy">
                        <SelectValue placeholder="Who paid?" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea id="notes" placeholder="Add any additional details..." rows={2} />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsDialogOpen(false)
                      }}
                    >
                      Add Expense
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            Filter
          </Button>
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          {filteredExpenses.map((expense) => {
            const CategoryIcon = categoryIcons[expense.category] || Ticket
            const colorClasses = categoryColors[expense.category] || 'bg-gray-100 text-gray-700'

            return (
              <div
                key={expense.id}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorClasses}`}>
                  <CategoryIcon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{expense.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="text-border">|</span>
                    <span>Split {expense.splitWith} ways</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={expense.paidBy.avatar} alt={expense.paidBy.name} />
                    <AvatarFallback className="text-xs">{expense.paidBy.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${expense.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">${(expense.amount / expense.splitWith).toFixed(0)}/person</p>
                  </div>
                  <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}