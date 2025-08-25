"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  User,
  BookOpen,
  ClipboardList,
  Bell
} from 'lucide-react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Math Assignment Due',
      type: 'assignment',
      date: '2025-08-28',
      time: '11:59 PM',
      subject: 'Mathematics',
      description: 'Calculus Problem Set 5 submission deadline'
    },
    {
      id: 2,
      title: 'Physics Lab',
      type: 'class',
      date: '2025-08-29',
      time: '2:00 PM - 4:00 PM',
      location: 'Lab 201',
      subject: 'Physics',
      description: 'Projectile Motion Experiment'
    },
    {
      id: 3,
      title: 'Mid-term Exams Begin',
      type: 'exam',
      date: '2025-09-15',
      time: '9:00 AM',
      subject: 'All Subjects',
      description: 'Mid-term examination period starts'
    },
    {
      id: 4,
      title: 'Guest Lecture',
      type: 'event',
      date: '2025-09-05',
      time: '2:00 PM - 3:30 PM',
      location: 'Main Auditorium',
      subject: 'Physics',
      description: 'Quantum Physics by Dr. Sarah Johnson'
    },
    {
      id: 5,
      title: 'Chemistry Lab Report Due',
      type: 'assignment',
      date: '2025-08-30',
      time: '11:59 PM',
      subject: 'Chemistry',
      description: 'Organic synthesis lab report submission'
    }
  ]

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'assignment': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'exam': return 'bg-red-100 text-red-800 border-red-200'
      case 'class': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'assignment': return <ClipboardList className="h-4 w-4" />
      case 'exam': return <BookOpen className="h-4 w-4" />
      case 'class': return <User className="h-4 w-4" />
      case 'event': return <Bell className="h-4 w-4" />
      default: return <CalendarIcon className="h-4 w-4" />
    }
  }

  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    event.date === selectedDate.toISOString().split('T')[0]
  )

  // Get upcoming events (next 7 days)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    return eventDate >= today && eventDate <= nextWeek
  }).sort((a, b) => new Date(a.date) - new Date(b.date))

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateString = date.toISOString().split('T')[0]
      const hasEvents = events.some(event => event.date === dateString)
      const isSelected = selectedDate.toDateString() === date.toDateString()
      const isToday = new Date().toDateString() === date.toDateString()
      
      days.push(
        <div
          key={day}
          className={`p-2 cursor-pointer rounded-lg transition-colors ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : isToday 
                ? 'bg-blue-100 text-blue-800' 
                : 'hover:bg-gray-100'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="text-center">
            <span className="text-sm font-medium">{day}</span>
            {hasEvents && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1"></div>
            )}
          </div>
        </div>
      )
    }
    
    return days
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Keep track of your schedule and important dates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                        <div className="flex items-start gap-2">
                          {getEventIcon(event.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            <p className="text-xs mt-1 opacity-75">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No events scheduled for this date
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className={`p-1 rounded ${getEventTypeColor(event.type)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-gray-500">{event.subject}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No upcoming events
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}