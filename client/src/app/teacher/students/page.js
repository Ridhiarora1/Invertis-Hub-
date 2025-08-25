"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search, 
  Filter,
  Mail,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react'

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [classFilter, setClassFilter] = useState('all')

  const students = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      rollNumber: 'CS2021001',
      email: 'john.doe@student.edu',
      class: 'CS-A',
      department: 'Computer Science',
      phone: '+1234567890',
      profileImage: null,
      attendance: 85,
      averageGrade: 88,
      assignmentsSubmitted: 12,
      totalAssignments: 15,
      doubtsAsked: 5,
      lastActive: '2025-08-26'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Smith',
      rollNumber: 'CS2021002',
      email: 'sarah.smith@student.edu',
      class: 'CS-A',
      department: 'Computer Science',
      phone: '+1234567891',
      profileImage: null,
      attendance: 92,
      averageGrade: 94,
      assignmentsSubmitted: 15,
      totalAssignments: 15,
      doubtsAsked: 3,
      lastActive: '2025-08-26'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      rollNumber: 'CS2021003',
      email: 'mike.johnson@student.edu',
      class: 'CS-B',
      department: 'Computer Science',
      phone: '+1234567892',
      profileImage: null,
      attendance: 78,
      averageGrade: 82,
      assignmentsSubmitted: 11,
      totalAssignments: 15,
      doubtsAsked: 8,
      lastActive: '2025-08-25'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      rollNumber: 'CS2021004',
      email: 'emily.davis@student.edu',
      class: 'CS-A',
      department: 'Computer Science',
      phone: '+1234567893',
      profileImage: null,
      attendance: 96,
      averageGrade: 91,
      assignmentsSubmitted: 14,
      totalAssignments: 15,
      doubtsAsked: 2,
      lastActive: '2025-08-26'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      rollNumber: 'CS2021005',
      email: 'david.wilson@student.edu',
      class: 'CS-B',
      department: 'Computer Science',
      phone: '+1234567894',
      profileImage: null,
      attendance: 88,
      averageGrade: 86,
      assignmentsSubmitted: 13,
      totalAssignments: 15,
      doubtsAsked: 4,
      lastActive: '2025-08-25'
    }
  ]

  const classes = ['all', 'CS-A', 'CS-B', 'CS-C']

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClass = classFilter === 'all' || student.class === classFilter
    
    return matchesSearch && matchesClass
  })

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100'
    if (percentage >= 80) return 'text-blue-600 bg-blue-100'
    if (percentage >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const stats = {
    total: students.length,
    active: students.filter(s => s.lastActive === '2025-08-26').length,
    highPerformers: students.filter(s => s.averageGrade >= 90).length,
    needsAttention: students.filter(s => s.attendance < 80 || s.averageGrade < 70).length
  }

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-600">Manage and track your students' progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-sm text-gray-600">Active Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.highPerformers}</div>
                  <p className="text-sm text-gray-600">High Performers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats.needsAttention}</div>
                  <p className="text-sm text-gray-600">Needs Attention</p>
                </div>
              </div>
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
                  placeholder="Search students by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>
                    {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {student.firstName} {student.lastName}
                    </CardTitle>
                    <CardDescription>{student.rollNumber}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>{student.class} - {student.department}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className={`text-lg font-bold ${getPerformanceColor(student.attendance).split(' ')[0]}`}>
                      {student.attendance}%
                    </div>
                    <div className="text-xs text-gray-600">Attendance</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className={`text-lg font-bold ${getPerformanceColor(student.averageGrade).split(' ')[0]}`}>
                      {student.averageGrade}%
                    </div>
                    <div className="text-xs text-gray-600">Avg Grade</div>
                  </div>
                </div>

                {/* Assignment Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignments</span>
                    <span>{student.assignmentsSubmitted}/{student.totalAssignments}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(student.assignmentsSubmitted / student.totalAssignments) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Doubts Asked: {student.doubtsAsked}</span>
                  <span>Last Active: {student.lastActive}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">
                {searchTerm || classFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No students are enrolled in your classes yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}