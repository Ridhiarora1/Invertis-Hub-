"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs'
import { 
  BookOpen, 
  FileText, 
  MessageCircle, 
  Bell, 
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  Home,
  GraduationCap,
  ClipboardList
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const studentNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Notes', href: '/dashboard/notes', icon: BookOpen },
  { name: 'Assignments', href: '/dashboard/assignments', icon: ClipboardList },
  { name: 'Doubts', href: '/dashboard/doubts', icon: MessageCircle },
  { name: 'Announcements', href: '/dashboard/announcements', icon: Bell },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
]

const teacherNavItems = [
  { name: 'Dashboard', href: '/teacher', icon: Home },
  { name: 'Students', href: '/teacher/students', icon: Users },
  { name: 'Assignments', href: '/teacher/assignments', icon: ClipboardList },
  { name: 'Doubts', href: '/teacher/doubts', icon: MessageCircle },
  { name: 'Announcements', href: '/teacher/announcements', icon: Bell },
  { name: 'Resources', href: '/teacher/resources', icon: FileText },
]

export default function Sidebar({ userRole = 'student' }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()
  
  const navItems = userRole === 'teacher' ? teacherNavItems : studentNavItems

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="font-bold text-lg">EduPlatform</h2>
            <p className="text-sm text-gray-500 capitalize">{userRole} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-100 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <SidebarContent />
      </div>
    </>
  )
}