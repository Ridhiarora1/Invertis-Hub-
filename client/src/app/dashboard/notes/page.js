"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  User,
  Tag
} from 'lucide-react'

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const notes = [
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      uploadDate: '2025-08-20',
      fileType: 'PDF',
      size: '2.4 MB',
      description: 'Basic concepts of differential and integral calculus'
    },
    {
      id: 2,
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      teacher: 'Prof. Johnson',
      uploadDate: '2025-08-18',
      fileType: 'PDF',
      size: '3.1 MB',
      description: 'Fundamentals of organic chemistry and molecular structures'
    },
    {
      id: 3,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      teacher: 'Dr. Brown',
      uploadDate: '2025-08-15',
      fileType: 'PDF',
      size: '1.8 MB',
      description: 'Comprehensive study of Newton\'s three laws of motion'
    },
    {
      id: 4,
      title: 'Shakespeare\'s Hamlet Analysis',
      subject: 'English',
      teacher: 'Ms. Davis',
      uploadDate: '2025-08-12',
      fileType: 'DOCX',
      size: '1.2 MB',
      description: 'Character analysis and themes in Hamlet'
    },
    {
      id: 5,
      title: 'World War II Timeline',
      subject: 'History',
      teacher: 'Mr. Wilson',
      uploadDate: '2025-08-10',
      fileType: 'PDF',
      size: '4.2 MB',
      description: 'Detailed timeline of major WWII events'
    }
  ]

  const subjects = ['all', 'Mathematics', 'Chemistry', 'Physics', 'English', 'History']

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Notes</h1>
            <p className="text-gray-600">Access and download your course materials</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notes by title, subject, or teacher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{note.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Tag className="h-4 w-4" />
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {note.subject}
                      </span>
                    </div>
                  </div>
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <CardDescription>{note.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{note.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{note.uploadDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{note.fileType} • {note.size}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedSubject !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No study notes have been uploaded yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}