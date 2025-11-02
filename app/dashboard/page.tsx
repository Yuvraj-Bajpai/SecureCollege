'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/common/Logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, FileText, User, Settings, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        redirect('/login')
      }
      setUser(session.user)
      setLoading(false)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    redirect('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your college search, applications, and profile all in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Saved Colleges</CardTitle>
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-1">0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep track of your favorite colleges
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Applications</CardTitle>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-1">0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your application status
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Profile Completion</CardTitle>
                <User className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-1">30%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete your profile for better matches
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="justify-start h-auto py-4">
                <GraduationCap className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Search Colleges</div>
                  <div className="text-sm opacity-90">Explore 5000+ colleges</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4">
                <FileText className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">View Applications</div>
                  <div className="text-sm opacity-90">Track your progress</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4">
                <User className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Complete Profile</div>
                  <div className="text-sm opacity-90">Get personalized matches</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No recent activity. Start exploring colleges to see your activity here!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

