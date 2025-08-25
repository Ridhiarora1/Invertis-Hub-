"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  Search, 
  Plus,
  Clock,
  CheckCircle,
  MessageSquare,
  User,
  Calendar,
  Tag
} from 'lucide-react'

export default function DoubtsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const doubts = [
    {
      id: 1,
      title: 'Integration by Parts Confusion',
      subject: 'Mathematics',
      description: 'I\'m having trouble understanding when to use integration by parts vs substitution method.',
      status: 'open',
      createdDate: '2025-08-25',
      responses: 2,
      lastActivity: '2025-08-26',
      teacher: 'Dr. Smith'
    },
    {
      id: 2,
      title: 'Organic Reaction Mechanisms',
      subject: 'Chemistry',
      description: 'Can someone explain the mechanism for nucleophilic substitution reactions?',
      status: 'answered',
      createdDate: '2025-08-23',
      responses: 5,
      lastActivity: '2025-08-24',
      teacher: 'Prof. Johnson'
    },
    {
      id: 3,
      title: 'Projectile Motion Problem',
      subject: 'Physics',
      description: 'How do I calculate the maximum height when the initial velocity has both x and y components?',
      status: 'open',
      createdDate: '2025-08-22',
      responses: 1,
      lastActivity: '2025-08-23',
      teacher: null
    },
    {
      id: 4,
      title: 'Shakespeare\'s Writing Style',
      subject: 'English',
      description: 'What are the key characteristics of Shakespeare\'s writing that make it unique?',
      status: 'resolved',
      createdDate: '2025-08-20',
      responses: 3,
      lastActivity: '2025-08-21',
      teacher: 'Ms. Davis'
    },
    {
      id: 5,
      title: 'World War Timeline',
      subject: 'History',
      description: 'I\'m confused about the sequence of events leading to WWII. Can someone clarify?',
      status: 'answered',
      createdDate: '2025-08-18',
      responses: 4,
      lastActivity: '2025-08-19',
      teacher: 'Mr. Wilson'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-orange-600 bg-orange-100'
      case 'answered': return 'text-blue-600 bg-blue-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />
      case 'answered': return <MessageSquare className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || doubt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: doubts.length,
    open: doubts.filter(d => d.status === 'open').length,
    answered: doubts.filter(d => d.status === 'answered').length,
    resolved: doubts.filter(d => d.status === 'resolved').length
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doubts & Questions</h1>
            <p className="text-gray-600">Ask questions and get help from teachers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-sm text-gray-600">Total Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.open}</div>
              <p className="text-sm text-gray-600">Open</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.answered}</div>
              <p className="text-sm text-gray-600">Answered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <p className="text-sm text-gray-600">Resolved</p>
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
                  placeholder="Search doubts and questions..."
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
                <option value="open">Open</option>
                <option value="answered">Answered</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Doubts List */}
        <div className="space-y-4">
          {filteredDoubts.map((doubt) => (
            <Card key={doubt.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{doubt.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {doubt.subject}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{doubt.createdDate}</span>
                      </div>
                    </div>
                    <CardDescription className="mb-3">{doubt.description}</CardDescription>
                    {doubt.teacher && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Answered by: {doubt.teacher}</span>
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doubt.status)}`}>
                    {getStatusIcon(doubt.status)}
                    <span className="capitalize">{doubt.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{doubt.responses} responses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Last activity: {doubt.lastActivity}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoubts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You haven\'t asked any questions yet'
                }
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Ask Your First Question
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}