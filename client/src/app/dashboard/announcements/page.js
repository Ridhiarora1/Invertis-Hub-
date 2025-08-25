"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Bell, 
  Search, 
  Calendar,
  User,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Pin
} from 'lucide-react'

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const announcements = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      content: 'The mid-term examination schedule for all subjects has been released. Please check your individual timetables and prepare accordingly. Exams will begin from September 15th.',
      type: 'exam',
      priority: 'high',
      author: 'Academic Office',
      date: '2025-08-26',
      isPinned: true,
      isRead: false
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      content: 'Due to upcoming exams, the library will remain open until 10 PM from Monday to Friday. Weekend hours remain unchanged (9 AM - 6 PM).',
      type: 'facility',
      priority: 'medium',
      author: 'Library Administration',
      date: '2025-08-25',
      isPinned: false,
      isRead: true
    },
    {
      id: 3,
      title: 'Guest Lecture on Quantum Physics',
      content: 'Dr. Sarah Johnson from MIT will be delivering a guest lecture on "Quantum Entanglement and Its Applications" on September 5th at 2 PM in the main auditorium.',
      type: 'event',
      priority: 'medium',
      author: 'Physics Department',
      date: '2025-08-24',
      isPinned: false,
      isRead: true
    },
    {
      id: 4,
      title: 'Assignment Submission Deadline Extended',
      content: 'The deadline for Chemistry Lab Report (Assignment #3) has been extended to August 30th due to equipment maintenance issues.',
      type: 'assignment',
      priority: 'high',
      author: 'Prof. Johnson',
      date: '2025-08-23',
      isPinned: true,
      isRead: false
    },
    {
      id: 5,
      title: 'New Online Learning Platform',
      content: 'We are introducing a new online learning platform for better course management. Training sessions will be conducted next week.',
      type: 'general',
      priority: 'low',
      author: 'IT Department',
      date: '2025-08-22',
      isPinned: false,
      isRead: true
    },
    {
      id: 6,
      title: 'Campus WiFi Maintenance',
      content: 'Campus WiFi will be under maintenance on August 28th from 2 AM to 6 AM. Please plan your online activities accordingly.',
      type: 'facility',
      priority: 'medium',
      author: 'IT Department',
      date: '2025-08-21',
      isPinned: false,
      isRead: true
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'exam': return 'text-red-600 bg-red-100'
      case 'assignment': return 'text-orange-600 bg-orange-100'
      case 'event': return 'text-purple-600 bg-purple-100'
      case 'facility': return 'text-blue-600 bg-blue-100'
      case 'general': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'medium': return <Info className="h-4 w-4 text-orange-600" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter
    return matchesSearch && matchesType
  })

  // Sort by pinned first, then by date
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.date) - new Date(a.date)
  })

  const stats = {
    total: announcements.length,
    unread: announcements.filter(a => !a.isRead).length,
    pinned: announcements.filter(a => a.isPinned).length,
    thisWeek: announcements.filter(a => {
      const announcementDate = new Date(a.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return announcementDate >= weekAgo
    }).length
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">Stay updated with important notifications</p>
          </div>
          <Button variant="outline">
            Mark All as Read
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
              <p className="text-sm text-gray-600">Unread</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.pinned}</div>
              <p className="text-sm text-gray-600">Pinned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
              <p className="text-sm text-gray-600">This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="exam">Exams</option>
                <option value="assignment">Assignments</option>
                <option value="event">Events</option>
                <option value="facility">Facilities</option>
                <option value="general">General</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`hover:shadow-md transition-shadow ${
                !announcement.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.isPinned && (
                        <Pin className="h-4 w-4 text-orange-600" />
                      )}
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      {!announcement.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{announcement.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {announcement.content}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(announcement.priority)}
                    <span className="text-xs text-gray-500 capitalize">
                      {announcement.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Posted {announcement.date}</span>
                  </div>
                  {!announcement.isRead && (
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAnnouncements.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {searchTerm || typeFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No announcements have been posted yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}