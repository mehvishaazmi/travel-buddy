import { Card, CardContent } from '@/components/ui/card'
import { Map, Users, Receipt, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
  {
    title: 'Total Trips',
    value: '12',
    change: '+2',
    changeType: 'positive',
    description: 'this month',
    icon: Map,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    title: 'Travel Buddies',
    value: '24',
    change: '+5',
    changeType: 'positive',
    description: 'connections',
    icon: Users,
    iconBg: 'bg-chart-4/10',
    iconColor: 'text-chart-4',
  },
  {
    title: 'Total Expenses',
    value: '$4,280',
    change: '-12%',
    changeType: 'negative',
    description: 'vs last month',
    icon: Receipt,
    iconBg: 'bg-chart-5/10',
    iconColor: 'text-chart-5',
  },
  {
    title: 'Money Saved',
    value: '$1,420',
    change: '+18%',
    changeType: 'positive',
    description: 'by splitting',
    icon: TrendingUp,
    iconBg: 'bg-chart-2/10',
    iconColor: 'text-chart-2',
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">{stat.title}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span
                    className={`flex items-center text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-chart-2' : 'text-destructive'
                    }`}
                  >
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`size-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}