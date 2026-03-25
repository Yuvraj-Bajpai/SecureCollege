'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  MapPin,
  User,
  Mail,
  Phone,
  GraduationCap,
  Save,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Calendar,
  FileText,
  ArrowRight,
  School,
  ClipboardList,
  Building2,
} from 'lucide-react'

type ProfileRow = {
  full_name: string | null
  phone: string | null
  age: string | null
  course: string | null
  current_status?: string | null
  target_course?: string | null
}

type BookingRow = {
  id: string
  status: string | null
  notes: string | null
  created_at: string
  type?: 'counselling' | 'campus_visit'
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'success' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState<string>('')

  const [profile, setProfile] = useState<ProfileRow>({
    full_name: null,
    phone: null,
    age: null,
    course: null,
    current_status: null,
    target_course: null,
  })

  const [meta, setMeta] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    high_school_percent: '',
    intermediate_percent: '',
    entrance_exam: '',
    entrance_rank: '',
  })

  const [bookings, setBookings] = useState<BookingRow[]>([])

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) return
      if (error || !data.session) {
        setLoading(false)
        router.replace('/login')
        return
      }

      const sessionUser = data.session.user
      setUser(sessionUser)

      const metadata = (sessionUser.user_metadata || {}) as Record<string, unknown>
      setMeta({
        address_line1: String(metadata.address_line1 || ''),
        address_line2: String(metadata.address_line2 || ''),
        city: String(metadata.city || ''),
        state: String(metadata.state || ''),
        pincode: String(metadata.pincode || ''),
        high_school_percent: String(metadata.high_school_percent || ''),
        intermediate_percent: String(metadata.intermediate_percent || ''),
        entrance_exam: String(metadata.entrance_exam || ''),
        entrance_rank: String(metadata.entrance_rank || ''),
      })

      const { data: profileRow } = await supabase
        .from('profiles')
        .select('full_name, phone, age, course, current_status, target_course')
        .eq('id', sessionUser.id)
        .maybeSingle()

      if (profileRow) {
        setProfile({
          full_name: profileRow.full_name,
          phone: profileRow.phone,
          age: profileRow.age,
          course: profileRow.course,
          current_status: profileRow.current_status,
          target_course: profileRow.target_course,
        })
      } else {
        setProfile({
          full_name: (metadata.full_name as string | undefined) || sessionUser.email?.split('@')[0] || null,
          phone: null,
          age: null,
          course: null,
          current_status: null,
          target_course: null,
        })
      }

      const { data: bookingRows } = await supabase
        .from('counselling_bookings')
        .select('id, status, notes, created_at')
        .eq('student_id', sessionUser.id)
        .order('created_at', { ascending: false })

      const mappedBookings = (bookingRows || []).map(b => ({
        ...b,
        type: b.notes?.includes('Visit') ? 'campus_visit' : 'counselling'
      })) as BookingRow[]

      setBookings(mappedBookings)
      setLoading(false)
    }

    load()
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
      meta.address_line1.trim().length > 0,
      meta.city.trim().length > 0,
      meta.state.trim().length > 0,
      meta.pincode.trim().length > 0,
      meta.intermediate_percent.trim().length > 0,
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [meta, profile])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const updateProfileField = (key: keyof ProfileRow, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
    if (saveState !== 'idle') setSaveState('idle')
  }

  const updateMetaField = (key: keyof typeof meta, value: string) => {
    setMeta((prev) => ({ ...prev, [key]: value }))
    if (saveState !== 'idle') setSaveState('idle')
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setSaveState('idle')
    setSaveMessage('')

    const fullName = (profile.full_name || '').trim()
    const phone = (profile.phone || '').trim()
    const age = (profile.age || '').trim()
    const course = (profile.course || '').trim()

    if (!fullName || !phone) {
      setSaving(false)
      setSaveState('error')
      setSaveMessage('Please add your name and phone number.')
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          full_name: fullName,
          phone,
          age: age || null,
          course: course || null,
          current_status: profile.current_status || null,
          target_course: profile.target_course || null,
        },
        { onConflict: 'id' }
      )

    if (profileError) {
      setSaving(false)
      setSaveState('error')
      setSaveMessage(profileError.message)
      return
    }

    const { error: userError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        address_line1: meta.address_line1.trim(),
        address_line2: meta.address_line2.trim(),
        city: meta.city.trim(),
        state: meta.state.trim(),
        pincode: meta.pincode.trim(),
        high_school_percent: meta.high_school_percent.trim(),
        intermediate_percent: meta.intermediate_percent.trim(),
        entrance_exam: meta.entrance_exam.trim(),
        entrance_rank: meta.entrance_rank.trim(),
      },
    })

    if (userError) {
      setSaving(false)
      setSaveState('error')
      setSaveMessage(userError.message)
      return
    }

    setSaving(false)
    setSaveState('success')
    setSaveMessage('Profile updated successfully.')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
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
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA] mb-3">
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <span>•</span>
                  <span>Profile</span>
                </div>
                <h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                >
                  Your <span className="text-primary">Profile</span>
                </h1>
                <p className="text-[#A1A1AA] mt-3 max-w-2xl">
                  Keep your details updated to get better counselling and personalized college recommendations.
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
                  size="xl"
                  className="h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <PremiumCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#A1A1AA]">Signed in as</p>
                      <p className="text-white font-semibold truncate">
                        {profile.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#A1A1AA] mt-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#A1A1AA]">Profile completion</span>
                      <span className="text-sm text-white font-semibold">{completion}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-600 to-primary-800"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>

                  {saveState !== 'idle' && (
                    <div
                      className={cn(
                        'mt-6 rounded-xl border p-4 text-sm',
                        saveState === 'success'
                          ? 'border-green-500/30 bg-green-500/10 text-green-200'
                          : 'border-red-500/30 bg-red-500/10 text-red-200'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {saveState === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mt-0.5" />
                        )}
                        <span>{saveMessage}</span>
                      </div>
                    </div>
                  )}
                </PremiumCard>

                <PremiumCard className="p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="xl"
                      className="w-full h-12 justify-between bg-white text-black hover:bg-gray-200 font-bold"
                    >
                      <Link href="/colleges">
                        Browse Colleges
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="w-full h-12 justify-between border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/premium">
                        Premium Guidance
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="w-full h-12 justify-between border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/contact">
                        Contact Support
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Registrations & Visits</h2>
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  {bookings.length === 0 ? (
                    <p className="text-sm text-[#A1A1AA]">No bookings or visits scheduled yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((b) => (
                        <div key={b.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {b.type === 'campus_visit' ? (
                                <Building2 className="w-4 h-4 text-primary" />
                              ) : (
                                <FileText className="w-4 h-4 text-primary" />
                              )}
                              <span className="text-sm text-white font-semibold capitalize">
                                {b.type === 'campus_visit' ? 'Campus Visit' : 'Counselling'}
                              </span>
                            </div>
                            <span className="text-xs text-[#A1A1AA]">
                              {new Date(b.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full border",
                              b.status === 'completed' 
                                ? "border-green-500/30 bg-green-500/10 text-green-400"
                                : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                            )}>
                              {b.status || 'pending'}
                            </span>
                          </div>
                          {b.notes && <p className="text-xs text-[#A1A1AA] mt-2 line-clamp-2">{b.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </PremiumCard>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <PremiumCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <School className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Academic Profile</h2>
                      <p className="text-sm text-[#A1A1AA]">Your academic background for better recommendations.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Current Status</label>
                      <select
                        value={profile.current_status || ''}
                        onChange={(e) => updateProfileField('current_status', e.target.value)}
                        className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled className="bg-[#121212]">Select status</option>
                        <option value="Class 12th" className="bg-[#121212]">Class 12th</option>
                        <option value="Dropper" className="bg-[#121212]">Dropper</option>
                        <option value="Graduate" className="bg-[#121212]">Graduate</option>
                        <option value="Other" className="bg-[#121212]">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Target Course</label>
                      <select
                        value={profile.target_course || ''}
                        onChange={(e) => updateProfileField('target_course', e.target.value)}
                        className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled className="bg-[#121212]">Select course</option>
                        <option value="B.Tech" className="bg-[#121212]">B.Tech</option>
                        <option value="BBA" className="bg-[#121212]">BBA</option>
                        <option value="BCA" className="bg-[#121212]">BCA</option>
                        <option value="MBA" className="bg-[#121212]">MBA</option>
                        <option value="Law" className="bg-[#121212]">Law</option>
                        <option value="Design" className="bg-[#121212]">Design</option>
                        <option value="Other" className="bg-[#121212]">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">10th Percentage / CGPA</label>
                      <Input
                        value={meta.high_school_percent}
                        onChange={(e) => updateMetaField('high_school_percent', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. 90% or 9.5 CGPA"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">12th Percentage (Intermediate)</label>
                      <Input
                        value={meta.intermediate_percent}
                        onChange={(e) => updateMetaField('intermediate_percent', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. 85%"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Entrance Exam (JEE/CUET/etc.)</label>
                      <Input
                        value={meta.entrance_exam}
                        onChange={(e) => updateMetaField('entrance_exam', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. JEE Main"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Entrance Rank / Percentile</label>
                      <Input
                        value={meta.entrance_rank}
                        onChange={(e) => updateMetaField('entrance_rank', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. 45000"
                      />
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Basic Details</h2>
                      <p className="text-sm text-[#A1A1AA]">These help us personalize your experience.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Age</label>
                      <Input
                        value={profile.age || ''}
                        onChange={(e) => updateProfileField('age', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. 18"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Target Course</label>
                      <Input
                        value={profile.course || ''}
                        onChange={(e) => updateProfileField('course', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. B.Tech CSE"
                      />
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Address Details</h2>
                      <p className="text-sm text-[#A1A1AA]">Used for counselling and verification.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Address Line 1 *</label>
                      <Input
                        value={meta.address_line1}
                        onChange={(e) => updateMetaField('address_line1', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="House / Street / Locality"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Address Line 2</label>
                      <Input
                        value={meta.address_line2}
                        onChange={(e) => updateMetaField('address_line2', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="Landmark / Area"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">City *</label>
                      <Input
                        value={meta.city}
                        onChange={(e) => updateMetaField('city', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">State *</label>
                      <Input
                        value={meta.state}
                        onChange={(e) => updateMetaField('state', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Pincode *</label>
                      <Input
                        value={meta.pincode}
                        onChange={(e) => updateMetaField('pincode', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        placeholder="e.g. 110001"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A1A1AA]">Last Updated</label>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3 flex items-center gap-2 text-sm text-[#A1A1AA]">
                        <Calendar className="w-4 h-4" />
                        <span>Updates save instantly to your account</span>
                      </div>
                    </div>
                  </div>
                </PremiumCard>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    variant="outline"
                    size="xl"
                    className="h-12 px-10 border-white/20 bg-white/5 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </Button>
                  <Button
                    size="xl"
                    className="h-12 px-10 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-xl"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

