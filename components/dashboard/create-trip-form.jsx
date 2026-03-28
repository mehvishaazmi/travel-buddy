'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  X,
  Plus,
  Plane,
  Search,
} from 'lucide-react'

const suggestedMembers = [
  { id: '1', name: 'Sarah Miller', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face', initials: 'SM' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', initials: 'MC' },
  { id: '3', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face', initials: 'EW' },
  { id: '4', name: 'James Taylor', email: 'james@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face', initials: 'JT' },
  { id: '5', name: 'Lisa Brown', email: 'lisa@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face', initials: 'LB' },
]

export function CreateTripForm() {
  const [selectedMembers, setSelectedMembers] = useState([])
  const [memberSearch, setMemberSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredMembers = suggestedMembers.filter(
    (member) =>
      !selectedMembers.find((m) => m.id === member.id) &&
      (member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        member.email.toLowerCase().includes(memberSearch.toLowerCase()))
  )

  const addMember = (member) => {
    setSelectedMembers([...selectedMembers, member])
    setMemberSearch('')
    setShowSuggestions(false)
  }

  const removeMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Plane className="size-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Trip Details</CardTitle>
              <CardDescription>
                Fill in the details below to create your new adventure
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Destination */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="startDate" type="date" className="pl-10" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="endDate" type="date" className="pl-10" required />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Trip Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell us about your trip plans, activities, and what makes it special..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="budget" className="text-sm font-medium">
                Estimated Budget
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="budget" type="number" placeholder="0.00" min="0" step="0.01" className="pl-10" />
              </div>
              <p className="text-xs text-muted-foreground">
                This helps track expenses against your planned budget
              </p>
            </div>

            {/* Add Members */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Users className="size-4" />
                  Travel Buddies
                </span>
              </Label>

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {selectedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 rounded-full bg-secondary py-1 pl-1 pr-3">
                      <Avatar className="size-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="size-3" />
                        <span className="sr-only">Remove {member.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Member Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={memberSearch}
                  onChange={(e) => {
                    setMemberSearch(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-10"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredMembers.length > 0 && (
                  <div className="absolute top-full z-10 mt-1 w-full rounded-lg border border-border bg-card shadow-lg">
                    <ul className="max-h-48 overflow-auto py-1">
                      {filteredMembers.map((member) => (
                        <li key={member.id}>
                          <button
                            type="button"
                            onClick={() => addMember(member)}
                            className="flex w-full items-center gap-3 px-3 py-2 hover:bg-muted"
                          >
                            <Avatar className="size-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            <Plus className="size-4 text-muted-foreground" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Add friends to plan and share expenses together
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" className="order-2 sm:order-1">
                Save as Draft
              </Button>
              <Button type="submit" className="order-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground sm:order-2">
                <Plane className="size-4" />
                Create Trip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}