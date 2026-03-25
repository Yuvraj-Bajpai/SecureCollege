'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useBookingModal } from '@/contexts/BookingModalContext'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  LogOut,
  MapPin,
  Save,
  User,
} from 'lucide-react'

type ProfileRow = {
  full_name: string | null
  phone: string | null
  age: string | null
  course: string | null
}

type BookingRow = {
  id: string
  status: string | null
  notes: string | null
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileRow>({
    full_name: null,
    phone: null,
    age: null,
    course: null,
  })
  const [meta, setMeta] = useState({
    intermediate_percent: '',
    entrance_exam: '',
    entrance_rank: '',
  })
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [showSetup, setShowSetup] = useState(false)
  const [saving, setSaving] = useState(false)
  const [setupError, setSetupError] = useState<string>('')
  const router = useRouter()
  const { openModal } = useBookingModal()

  useEffect(() => {
    let isMounted = true
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) {
        return
      }
      if (error || !data.session) {
        setLoading(false)
        router.replace('/login')
        return
      }

      const sessionUser = data.session.user
      setUser(sessionUser)

      const metadata = (sessionUser.user_metadata || {}) as Record<string, unknown>
      setMeta({
        intermediate_percent: String(metadata.intermediate_percent || ''),
        entrance_exam: String(metadata.entrance_exam || ''),
        entrance_rank: String(metadata.entrance_rank || ''),
      })

      const { data: profileRow } = await supabase
        .from('profiles')
        .select('full_name, phone, age, course')
        .eq('id', sessionUser.id)
        .maybeSingle()

      const nextProfile: ProfileRow = profileRow
        ? {
            full_name: profileRow.full_name,
            phone: profileRow.phone,
            age: profileRow.age,
            course: profileRow.course,
          }
        : {
            full_name: (metadata.full_name as string | undefined) || sessionUser.email?.split('@')[0] || null,
            phone: null,
            age: null,
            course: null,
          }

      setProfile(nextProfile)

      const { data: bookingRows } = await supabase
        .from('counselling_bookings')
        .select('id, status, notes, created_at')
        .eq('student_id', sessionUser.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setBookings((bookingRows || []) as BookingRow[])

      const hasSkipped = localStorage.getItem(`skip_setup_${sessionUser.id}`)
      const needsSetup = [
        (nextProfile.full_name || '').trim().length > 0,
        (nextProfile.phone || '').trim().length > 0,
        (nextProfile.course || '').trim().length > 0,
      ].includes(false)

      setShowSetup(needsSetup && !hasSkipped)
      setLoading(false)
    }
    loadSession()
    return () => {
      isMounted = false
    }
  }, [router])

  const completion = useMemo(() => {
    const checks = [
      profile.full_name && profile.full_name.trim().length > 0,
      profile.phone && profile.phone.trim().length > 0,
      profile.age && profile.age.trim().length > 0,
      profile.course && profile.course.trim().length > 0,
      meta.intermediate_percent.trim().length > 0,
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [meta, profile])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const handleSkipSetup = () => {
    if (user) {
      localStorage.setItem(`skip_setup_${user.id}`, 'true')
    }
    setShowSetup(false)
  }

  const updateProfileField = (key: keyof ProfileRow, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
    if (setupError) setSetupError('')
  }

  const updateMetaField = (key: keyof typeof meta, value: string) => {
    setMeta((prev) => ({ ...prev, [key]: value }))
    if (setupError) setSetupError('')
  }

  const handleSaveSetup = async () => {
    if (!user) return
    setSaving(true)
    setSetupError('')

    const fullName = (profile.full_name || '').trim()
    const phone = (profile.phone || '').trim()
    const course = (profile.course || '').trim()

    if (!fullName || !phone || !course) {
      setSaving(false)
      setSetupError('Please fill name, phone, and target course.')
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          full_name: fullName,
          phone,
          age: (profile.age || '').trim() || null,
          course: course || null,
        },
        { onConflict: 'id' }
      )

    if (profileError) {
      setSaving(false)
      setSetupError(profileError.message)
      return
    }

    const { error: userError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        intermediate_percent: meta.intermediate_percent.trim(),
        entrance_exam: meta.entrance_exam.trim(),
        entrance_rank: meta.entrance_rank.trim(),
      },
    })

    if (userError) {
      setSaving(false)
      setSetupError(userError.message)
      return
    }

    setSaving(false)
    setShowSetup(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section className="pt-32 pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                >
                  Welcome back,{' '}
                  <span className="text-primary">
                    {profile.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </h1>
                <p className="text-[#A1A1AA] mt-3 max-w-2xl">
                  Manage your college search, counselling, and profile in one place.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="xl"
                  className="h-12 px-8 border-white/20 bg-white/5 text-white hover:bg-white/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button
                  asChild
                  size="xl"
                  className="h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                >
                  <Link href="/dashboard/profile">
                    Edit Profile <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PremiumCard className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#A1A1AA]">Saved Colleges</span>
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-xs text-[#A1A1AA] mt-1">Bookmark colleges you like</div>
                  </PremiumCard>

                  <PremiumCard className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#A1A1AA]">Applications</span>
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-xs text-[#A1A1AA] mt-1">Track admission progress</div>
                  </PremiumCard>

                  <PremiumCard className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#A1A1AA]">Profile Completion</span>
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-white">{completion}%</div>
                    <div className="text-xs text-[#A1A1AA] mt-1">More details = better matches</div>
                  </PremiumCard>
                </div>

                <PremiumCard className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      asChild
                      size="xl"
                      className="h-14 justify-between bg-white text-black hover:bg-gray-200 font-bold"
                    >
                      <Link href="/colleges">
                        Browse Colleges
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      size="xl"
                      className="h-14 justify-between bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                      onClick={openModal}
                    >
                      Book Counselling
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="h-14 justify-between border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/dashboard/profile">
                        Update Profile
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Recent Counselling Bookings</h2>
                  {bookings.length === 0 ? (
                    <p className="text-sm text-[#A1A1AA]">No bookings yet. Book a session to get started.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((b) => (
                        <div key={b.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white font-semibold capitalize">{b.status || 'pending'}</span>
                            <span className="text-xs text-[#A1A1AA]">{new Date(b.created_at).toLocaleDateString()}</span>
                          </div>
                          {b.notes && <p className="text-xs text-[#A1A1AA] mt-2 line-clamp-2">{b.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </PremiumCard>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <PremiumCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-white mb-1">Your Details</h2>
                      <p className="text-sm text-[#A1A1AA]">
                        {profile.course ? `Target course: ${profile.course}` : 'Add your target course for better suggestions.'}
                      </p>
                      <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-600 to-primary-800"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <div className="text-xs text-[#A1A1AA] mt-2">{completion}% completed</div>
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-6">
                  <h2 className="text-lg font-bold text-white mb-3">Profile</h2>
                  <p className="text-sm text-[#A1A1AA] mb-4">
                    Update your profile to unlock counselling and personalized matching.
                  </p>
                  <Button
                    asChild
                    size="xl"
                    className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                  >
                    <Link href="/dashboard/profile">
                      Open Profile <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </PremiumCard>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl">
            <PremiumCard className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Complete your profile</h2>
                  <p className="text-sm text-[#A1A1AA] mt-2">
                    Add your basic details to get personalized college recommendations.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>

              {setupError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 p-4 text-sm mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5" />
                    <span>{setupError}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">Full Name *</label>
                  <Input
                    value={profile.full_name || ''}
                    onChange={(e) => updateProfileField('full_name', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">Phone Number *</label>
                  <Input
                    value={profile.phone || ''}
                    onChange={(e) => updateProfileField('phone', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">Target Course *</label>
                  <Input
                    value={profile.course || ''}
                    onChange={(e) => updateProfileField('course', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                    placeholder="e.g. B.Tech CSE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">12th Percentage</label>
                  <Input
                    value={meta.intermediate_percent}
                    onChange={(e) => updateMetaField('intermediate_percent', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                    placeholder="e.g. 85%"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">Age</label>
                  <Input
                    value={profile.age || ''}
                    onChange={(e) => updateProfileField('age', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                    placeholder="e.g. 18"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="ghost"
                  size="xl"
                  className="h-12 px-8 text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  onClick={handleSkipSetup}
                >
                  Skip for now
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="h-12 px-8 border-white/20 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/profile">Go to Profile</Link>
                </Button>
                <Button
                  size="xl"
                  className="h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                  onClick={handleSaveSetup}
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save & Continue'}
                </Button>
              </div>
            </PremiumCard>
          </div>
        </div>
      )}
    </div>
  )
}

