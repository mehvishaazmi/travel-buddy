'use client'

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, MapPin, Calendar, Users, ArrowRight } from 'lucide-react'

const trips = [
  {
    id: 1,
    name: 'Japan Adventure',
    location: 'Tokyo, Kyoto, Osaka',
    dates: 'Mar 15 - Mar 28, 2026',
    status: 'In Progress',
    statusColor: 'bg-accent text-accent-foreground',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
    buddies: [
      { name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face' },
      { name: 'Mike', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' },
      { name: 'Emma', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face' },
    ],
    totalExpenses: '$2,450',
  },
  {
    id: 2,
    name: 'Italian Escape',
    location: 'Rome, Florence, Venice',
    dates: 'Apr 10 - Apr 22, 2026',
    status: 'Upcoming',
    statusColor: 'bg-chart-4/20 text-chart-4',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop',
    buddies: [
      { name: 'Alex', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face' },
      { name: 'Lisa', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face' },
    ],
    totalExpenses: '$0',
  },
  {
    id: 3,
    name: 'Bali Retreat',
    location: 'Ubud, Seminyak, Uluwatu',
    dates: 'Feb 1 - Feb 12, 2026',
    status: 'Completed',
    statusColor: 'bg-chart-2/20 text-chart-2',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
    buddies: [
      { name: 'Tom', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face' },
      { name: 'Nina', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face' },
      { name: 'Jake', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=face' },
      { name: 'More', image: '' },
    ],
    totalExpenses: '$1,830',
  },
]

export function MyTrips() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle>My Trips</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent">
            View all
            <ArrowRight className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {trips.map((trip) => (
            <div key={trip.id} className="flex gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold truncate">{trip.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3" />
                      <span className="truncate">{trip.location}</span>
                    </div>
                  </div>
                  <Badge className={trip.statusColor}>{trip.status}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {trip.dates}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {trip.buddies.slice(0, 3).map((buddy, i) => (
                        <Avatar key={i} className="size-6 border-2 border-card">
                          <AvatarImage src={buddy.image} alt={buddy.name} />
                          <AvatarFallback className="text-[10px]">{buddy.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {trip.buddies.length > 3 && (
                        <div className="flex size-6 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium">
                          +{trip.buddies.length - 3}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="size-7">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
