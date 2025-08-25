"use client"

import { useUser } from '@clerk/nextjs'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children, userRole = 'student' }) {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <div className="flex-1 md:ml-64">
        <main className="p-6 overflow-auto h-full">
          {children}
        </main>
      </div>
    </div>
  )
}