"use client"

import { useUser } from '@clerk/nextjs'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  ClipboardList, 
  MessageCircle, 
  Bell, 
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react'

export default function TeacherDashboard() {
  const { user } = useUser()

  const stats = [
    { title: 'Total Students', value: '156', icon: Users, color: 'text-blue-600' },
    { title: 'Active Assignments', value: '8', icon: ClipboardList, color: 'text-orange-600' },
    { title: 'Pending Doubts', value: '12', icon: MessageCircle, color: 'text-purple-600' },
    { title: 'Announcements', value: '3', icon: Bell, color: 'text-green-600' },
  ]

  const recentActivities = [
    { type: 'submission', title: 'New assignment submission from John Doe', time: '1 hour ago', status: 'new' },
    { type: 'doubt', title: 'Physics doubt posted by Sarah Smith', time: '2 hours ago', status: 'pending' },
    { type: 'assignment', title: 'Math Assignment 5 deadline approaching', time: '4 hours ago', status: 'warning' },
    { type: 'submission', title: '15 students submitted Chemistry lab report', time: '6 hours ago', status: 'completed' },
  ]

  const upcomingDeadlines = [
    { title: 'Grade Math Assignment 4', subject: 'Mathematics', dueDate: '2025-08-28', priority: 'high', type: 'grading' },
    { title: 'Prepare Physics Quiz', subject: 'Physics', dueDate: '2025-08-30', priority: 'medium', type: 'preparation' },
    { title: 'Submit Grade Reports', subject: 'All Subjects', dueDate: '2025-09-02', priority: 'high', type: 'administrative' },
  ]

  const classOverview = [
    { class: 'Physics 101', students: 45, assignments: 3, doubts: 5 },
    { class: 'Advanced Physics', students: 32, assignments: 2, doubts: 3 },
    { class: 'Physics Lab', students: 28, assignments: 1, doubts: 2 },
  ]

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, Prof. {user?.firstName}! 👨‍🏫
          </h1>
          <p className="text-green-100">
            Here's an overview of your classes and student activities.
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
                      activity.status === 'pending' ? 'bg-orange-100' :
                      activity.status === 'warning' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
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

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{task.dueDate}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-600' :
                        task.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Class Overview</CardTitle>
            <CardDescription>
              Summary of your classes and student engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {classOverview.map((classInfo, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">{classInfo.class}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Students</span>
                      <span className="font-medium">{classInfo.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Assignments</span>
                      <span className="font-medium">{classInfo.assignments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Doubts</span>
                      <span className="font-medium">{classInfo.doubts}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm">Create Assignment</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Post Announcement</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Answer Doubts</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Upload Resources</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}