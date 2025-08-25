"use client"

import { useUser } from '@clerk/nextjs'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  ClipboardList, 
  MessageCircle, 
  Bell, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useUser()

  const stats = [
    { title: 'Total Notes', value: '24', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Pending Assignments', value: '3', icon: ClipboardList, color: 'text-orange-600' },
    { title: 'Open Doubts', value: '2', icon: MessageCircle, color: 'text-purple-600' },
    { title: 'New Announcements', value: '5', icon: Bell, color: 'text-green-600' },
  ]

  const recentActivities = [
    { type: 'assignment', title: 'Math Assignment 3 submitted', time: '2 hours ago', status: 'completed' },
    { type: 'doubt', title: 'Physics doubt posted', time: '4 hours ago', status: 'pending' },
    { type: 'announcement', title: 'New exam schedule released', time: '1 day ago', status: 'new' },
    { type: 'note', title: 'Chemistry notes uploaded', time: '2 days ago', status: 'completed' },
  ]

  const upcomingDeadlines = [
    { title: 'English Essay', subject: 'English', dueDate: '2025-08-28', priority: 'high' },
    { title: 'Physics Lab Report', subject: 'Physics', dueDate: '2025-08-30', priority: 'medium' },
    { title: 'Math Problem Set', subject: 'Mathematics', dueDate: '2025-09-02', priority: 'low' },
  ]

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-blue-100">
            Here's what's happening with your studies today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'pending' ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{deadline.dueDate}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high' ? 'bg-red-100 text-red-600' :
                        deadline.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {deadline.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump to the most common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Browse Notes</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm">View Assignments</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Ask Doubt</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Announcements</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}