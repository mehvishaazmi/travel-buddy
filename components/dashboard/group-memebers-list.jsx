'use client'

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserPlus, Crown, MoreHorizontal } from 'lucide-react'

const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    initials: 'JD',
    role: 'admin',
    totalPaid: 1720,
    expenseCount: 2,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
    initials: 'SC',
    role: 'member',
    totalPaid: 2265,
    expenseCount: 2,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    initials: 'MW',
    role: 'member',
    totalPaid: 320,
    expenseCount: 1,
  },
  {
    id: 4,
    name: 'Emma Thompson',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    initials: 'ET',
    role: 'member',
    totalPaid: 90,
    expenseCount: 1,
  },
]

export function GroupMembersList() {
  const totalGroupSpent = members.reduce((acc, m) => acc + m.totalPaid, 0)
  const averagePerPerson = totalGroupSpent / members.length

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle>Group Members</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm" className="gap-1">
            <UserPlus className="size-4" />
            Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* Group Stats */}
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Group Spend</span>
            <span className="font-semibold text-foreground">${totalGroupSpent.toLocaleString()}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg per person</span>
            <span className="font-medium text-foreground">${averagePerPerson.toFixed(0)}</span>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
            >
              <div className="relative">
                <Avatar className="size-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                {member.role === 'admin' && (
                  <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Crown className="size-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                  {member.role === 'admin' && (
                    <span className="text-xs text-muted-foreground">(Admin)</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${member.totalPaid.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{member.expenseCount} expenses</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}