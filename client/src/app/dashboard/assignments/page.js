"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ClipboardList, 
  Search, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  User
} from 'lucide-react'

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 5',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      dueDate: '2025-08-30',
      submittedDate: null,
      status: 'pending',
      description: 'Solve problems 1-20 from Chapter 5',
      maxMarks: 50,
      obtainedMarks: null
    },
    {
      id: 2,
      title: 'Organic Chemistry Lab Report',
      subject: 'Chemistry',
      teacher: 'Prof. Johnson',
      dueDate: '2025-08-28',
      submittedDate: null,
      status: 'pending',
      description: 'Write a detailed lab report on the synthesis experiment',
      maxMarks: 30,
      obtainedMarks: null
    },
    {
      id: 3,
      title: 'Physics Motion Analysis',
      subject: 'Physics',
      teacher: 'Dr. Brown',
      dueDate: '2025-08-25',
      submittedDate: '2025-08-24',
      status: 'submitted',
      description: 'Analyze the motion of projectiles using given data',
      maxMarks: 40,
      obtainedMarks: null
    },
    {
      id: 4,
      title: 'Hamlet Essay',
      subject: 'English',
      teacher: 'Ms. Davis',
      dueDate: '2025-08-20',
      submittedDate: '2025-08-19',
      status: 'graded',
      description: 'Write a 1500-word essay on themes in Hamlet',
      maxMarks: 100,
      obtainedMarks: 85
    },
    {
      id: 5,
      title: 'WWII Research Project',
      subject: 'History',
      teacher: 'Mr. Wilson',
      dueDate: '2025-08-15',
      submittedDate: '2025-08-14',
      status: 'graded',
      description: 'Research and present on a specific WWII battle',
      maxMarks: 75,
      obtainedMarks: 68
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100'
      case 'submitted': return 'text-blue-600 bg-blue-100'
      case 'graded': return 'text-green-600 bg-green-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'submitted': return <CheckCircle className="h-4 w-4" />
      case 'graded': return <CheckCircle className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600">Track and submit your assignments</p>
          </div>
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
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
              <p className="text-sm text-gray-600">Submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.graded}</div>
              <p className="text-sm text-gray-600">Graded</p>
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
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{assignment.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {assignment.subject}
                      </span>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{assignment.teacher}</span>
                      </div>
                    </div>
                    <CardDescription>{assignment.description}</CardDescription>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    <span className="capitalize">{assignment.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    {assignment.submittedDate && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Submitted: {assignment.submittedDate}</span>
                      </div>
                    )}
                    <div>
                      <span>Max Marks: {assignment.maxMarks}</span>
                      {assignment.obtainedMarks && (
                        <span className="ml-2 font-medium text-green-600">
                          Obtained: {assignment.obtainedMarks}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {assignment.status === 'pending' && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No assignments have been assigned yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}