'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, X } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'
import { supabase } from '@/lib/supabase'

type Profile = {
  phone?: string | null
  current_status?: string | null
  target_course?: string | null
}

const statusOptions = ['Class 12th', 'Dropper', 'Graduate', 'Other']
const courseOptions = ['B.Tech', 'BBA', 'BCA', 'MBA', 'Law', 'Design', 'Other']

export function BookCounsellingModal() {
  const { isOpen, closeModal } = useBookingModal()

  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sessionLoading, setSessionLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [targetCourse, setTargetCourse] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasPhone = useMemo(() => Boolean(profile?.phone && profile.phone.trim().length > 0), [profile])

  useEffect(() => {
    if (!isOpen) {
      setSession(null)
      setProfile(null)
      setSessionLoading(false)
      setProfileLoading(false)
      setPhone('')
      setCurrentStatus('')
      setTargetCourse('')
      setError('')
      setSuccess(false)
      setIsSubmitting(false)
      return
    }

    const loadSession = async () => {
      setSessionLoading(true)
      setError('')
      const { data } = await supabase.auth.getSession()
      const activeSession = data.session
      setSession(activeSession ?? null)
      setSessionLoading(false)

      if (!activeSession) {
        return
      }

      setProfileLoading(true)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('phone,current_status,target_course')
        .eq('id', activeSession.user.id)
        .maybeSingle()
      setProfile(profileData ?? null)
      setPhone(profileData?.phone ?? '')
      setCurrentStatus(profileData?.current_status ?? '')
      setTargetCourse(profileData?.target_course ?? '')
      setProfileLoading(false)
    }

    loadSession()
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleGoogleLogin = async () => {
    setError('')
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const handleSubmitProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const cleanedPhone = phone.replace(/\D/g, '')
    if (cleanedPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }
    if (!currentStatus) {
      setError('Please select your current status.')
      return
    }
    if (!targetCourse) {
      setError('Please select your target course.')
      return
    }

    setIsSubmitting(true)

    const userId = session?.user?.id
    if (!userId) {
      setError('Please sign in to continue.')
      setIsSubmitting(false)
      return
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        phone: cleanedPhone,
        current_status: currentStatus,
        target_course: targetCourse,
      })
      .eq('id', userId)

    if (updateError) {
      setError('Unable to update your profile. Please try again.')
      setIsSubmitting(false)
      return
    }

    const { error: insertError } = await supabase
      .from('counselling_bookings')
      .insert({ student_id: userId, status: 'pending' })

    if (insertError) {
      setError('Unable to book a session. Please try again.')
      setIsSubmitting(false)
      return
    }

    setSuccess(true)
    setIsSubmitting(false)
  }

  const handleConfirmBooking = async () => {
    setError('')
    setIsSubmitting(true)
    const userId = session?.user?.id
    if (!userId) {
      setError('Please sign in to continue.')
      setIsSubmitting(false)
      return
    }

    const { error: insertError } = await supabase
      .from('counselling_bookings')
      .insert({ student_id: userId, status: 'pending' })

    if (insertError) {
      setError('Unable to book a session. Please try again.')
      setIsSubmitting(false)
      return
    }

    setSuccess(true)
    setIsSubmitting(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/5 bg-[#121212] p-6 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Book Free Counseling</h2>
            <p className="mt-1 text-sm text-white/70">Get connected with a Secure College expert.</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {success ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-base font-semibold text-emerald-200">Booking Confirmed!</p>
              <p className="mt-2 text-sm text-emerald-100/80">
                Our expert counselor will call you within 24 hours.
              </p>
              <Button className="mt-5 w-full" onClick={closeModal}>
                Close
              </Button>
            </div>
          ) : sessionLoading ? (
            <p className="text-sm text-white/70">Checking your account...</p>
          ) : !session ? (
            <div className="space-y-4">
              <p className="text-sm text-white/80">
                Sign in to book a free counseling session.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold"
                onClick={handleGoogleLogin}
              >
                Continue with Google
              </Button>
            </div>
          ) : profileLoading ? (
            <p className="text-sm text-white/70">Loading your profile...</p>
          ) : hasPhone ? (
            <div className="space-y-4">
              <p className="text-sm text-white/80">
                Book a call for {profile?.phone}?
              </p>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="flex gap-3">
                <Button
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmitProfile}>
              <div>
                <label className="text-sm font-medium text-white">Phone Number</label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit number"
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">Current Status</label>
                <select
                  value={currentStatus}
                  onChange={(event) => setCurrentStatus(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled className="bg-[#121212] text-white/60">
                    Select status
                  </option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#121212]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Target Course</label>
                <select
                  value={targetCourse}
                  onChange={(event) => setTargetCourse(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled className="bg-[#121212] text-white/60">
                    Select course
                  </option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#121212]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
