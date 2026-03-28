import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plane, Clock, MapPin } from 'lucide-react'

const upcomingEvents = [
  {
    id: 1,
    type: 'Flight',
    title: 'Tokyo - NRT',
    time: 'Mar 15, 08:30 AM',
    details: 'JAL 412 - Terminal 1',
    icon: Plane,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    id: 2,
    type: 'Check-in',
    title: 'Hotel Shinjuku',
    time: 'Mar 15, 3:00 PM',
    details: 'Confirmation: SH2024031',
    icon: MapPin,
    iconBg: 'bg-chart-4/10',
    iconColor: 'text-chart-4',
  },
  {
    id: 3,
    type: 'Activity',
    title: 'Senso-ji Temple Tour',
    time: 'Mar 16, 10:00 AM',
    details: 'Meet at Asakusa Station',
    icon: Clock,
    iconBg: 'bg-chart-5/10',
    iconColor: 'text-chart-5',
  },
  {
    id: 4,
    type: 'Flight',
    title: 'Rome - FCO',
    time: 'Apr 10, 11:15 AM',
    details: 'Alitalia 208 - Terminal 3',
    icon: Plane,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
]

export function UpcomingTrips() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle>Upcoming Activities</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent">
            View calendar
            <ArrowRight className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex size-10 items-center justify-center rounded-lg ${event.iconBg}`}>
                  <event.icon className={`size-5 ${event.iconColor}`} />
                </div>
                {index < upcomingEvents.length - 1 && (
                  <div className="mt-2 flex-1 w-px bg-border" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">{event.type}</span>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
