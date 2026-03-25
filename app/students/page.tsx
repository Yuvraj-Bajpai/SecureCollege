'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, MapPin, TrendingUp, Award, GraduationCap,
  CheckCircle2, Star, Phone, Video, Shield,
  PlayCircle, UserCheck, ChevronDown, X, BookOpen
} from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'
import { CollegeLogoImage } from '@/components/common/CollegeLogoImage'
import { STUDENT_TESTIMONIALS } from '@/lib/constants'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

type CourseRow = {
  id: string
  college_id: string
  course: string | null
  specialization: string | null
  fees_min: number | null
  fees_max: number | null
  entrance: string[] | null
}

type CollegeRow = {
  id: string
  name: string
  slug: string
  state: string
  logo_url: string | null
  rating: number | null
  type: string | null
}

type CollegeResult = CollegeRow & {
  courses: CourseRow[]
}

const inrFormat = new Intl.NumberFormat('en-IN')

const normalizeUrl = (value: string | null | undefined) => {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export default function StudentsPage() {
  const { openModal } = useBookingModal()
  const supabase = createClientComponentClient()
  const heroRef = useRef<HTMLDivElement>(null)
  const [courseOptions, setCourseOptions] = useState<string[]>([])
  const [specializationOptions, setSpecializationOptions] = useState<string[]>([])
  const [stateOptions, setStateOptions] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations')
  const [selectedState, setSelectedState] = useState('All States')
  const [selectedAdmissionType, setSelectedAdmissionType] = useState('All Admission Types')
  const [courseSearchQuery, setCourseSearchQuery] = useState('')
  const [specializationSearchQuery, setSpecializationSearchQuery] = useState('')
  const [stateSearchQuery, setStateSearchQuery] = useState('')
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false)
  const [isSpecializationDropdownOpen, setIsSpecializationDropdownOpen] = useState(false)
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false)
  const [isAdmissionDropdownOpen, setIsAdmissionDropdownOpen] = useState(false)
  const courseDropdownRef = useRef<HTMLDivElement>(null)
  const specializationDropdownRef = useRef<HTMLDivElement>(null)
  const stateDropdownRef = useRef<HTMLDivElement>(null)
  const admissionDropdownRef = useRef<HTMLDivElement>(null)
  const [searchResults, setSearchResults] = useState<CollegeResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [courseError, setCourseError] = useState('')
  const [enquiryName, setEnquiryName] = useState('')
  const [enquiryPhone, setEnquiryPhone] = useState('')
  const [enquiryCourse, setEnquiryCourse] = useState('')
  const [enquiryCity, setEnquiryCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target
      if (!target || !(target instanceof Node)) {
        return
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(target)) {
        setIsCourseDropdownOpen(false)
      }
      if (specializationDropdownRef.current && !specializationDropdownRef.current.contains(target)) {
        setIsSpecializationDropdownOpen(false)
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(target)) {
        setIsStateDropdownOpen(false)
      }
      if (admissionDropdownRef.current && !admissionDropdownRef.current.contains(target)) {
        setIsAdmissionDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    let active = true
    const loadFilters = async () => {
      const { data: coursesData } = await supabase
        .from('college_courses')
        .select('course')
        .not('course', 'is', null)
      const { data: statesData } = await supabase
        .from('colleges')
        .select('state')
        .not('state', 'is', null)
      if (!active) return
      const courses = Array.from(new Set((coursesData || []).map((row) => row.course).filter(Boolean))) as string[]
      const states = Array.from(new Set((statesData || []).map((row) => row.state).filter(Boolean))) as string[]
      setCourseOptions(courses.sort((a, b) => a.localeCompare(b)))
      setStateOptions(states.sort((a, b) => a.localeCompare(b)))
    }
    loadFilters()
    return () => {
      active = false
    }
  }, [supabase])

  useEffect(() => {
    let active = true
    if (selectedCourse !== 'B.Tech') {
      setSelectedSpecialization('All Specializations')
      setSpecializationSearchQuery('')
      setSpecializationOptions([])
      setIsSpecializationDropdownOpen(false)
      return () => {
        active = false
      }
    }
    const loadSpecializations = async () => {
      const { data } = await supabase
        .from('college_courses')
        .select('specialization')
        .eq('course', 'B.Tech')
        .not('specialization', 'is', null)
      if (!active) return
      const specs = Array.from(new Set((data || []).map((row) => row.specialization).filter(Boolean))) as string[]
      setSpecializationOptions(specs.sort((a, b) => a.localeCompare(b)))
    }
    loadSpecializations()
    return () => {
      active = false
    }
  }, [selectedCourse, supabase])

  const filteredCourses = courseOptions.filter(course =>
    course.toLowerCase().includes(courseSearchQuery.toLowerCase())
  )

  const filteredSpecializations = specializationOptions.filter(spec =>
    spec.toLowerCase().includes(specializationSearchQuery.toLowerCase())
  )

  const filteredStates = stateOptions.filter(state =>
    state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  )

  const admissionOptions = ['All Admission Types', 'Direct Admission', 'Merit Based']

  const handleSearch = async () => {
    if (!selectedCourse) {
      setCourseError('Choose your course to see matching colleges.')
      return
    }
    setCourseError('')
    setIsSearching(true)
    setHasSearched(true)
    try {
      let courseQuery = supabase
        .from('college_courses')
        .select('id,college_id,course,specialization,fees_min,fees_max,entrance')
        .eq('course', selectedCourse)
      if (selectedCourse === 'B.Tech' && selectedSpecialization !== 'All Specializations') {
        courseQuery = courseQuery.eq('specialization', selectedSpecialization)
      }
      const { data: courseRows } = await courseQuery
      const courseData = (courseRows || []) as CourseRow[]
      const filteredByAdmission = courseData.filter((course) => {
        if (selectedAdmissionType === 'Direct Admission') {
          return Array.isArray(course.entrance) && course.entrance.some((entry) => /direct admission/i.test(String(entry)))
        }
        if (selectedAdmissionType === 'Merit Based') {
          return Array.isArray(course.entrance) && course.entrance.some((entry) => /merit|board/i.test(String(entry)))
        }
        return true
      })
      const collegeIds = Array.from(new Set(filteredByAdmission.map((course) => course.college_id).filter(Boolean)))
      if (collegeIds.length === 0) {
        setSearchResults([])
        return
      }
      let collegeQuery = supabase
        .from('colleges')
        .select('id,name,slug,state,logo_url,rating,type')
        .in('id', collegeIds)
      if (selectedState !== 'All States') {
        collegeQuery = collegeQuery.eq('state', selectedState)
      }
      const { data: collegeRows } = await collegeQuery
      const colleges = (collegeRows || []) as CollegeRow[]
      const allowedIds = new Set(colleges.map((college) => college.id))
      const coursesByCollege = new Map<string, CourseRow[]>()
      filteredByAdmission.forEach((course) => {
        if (!allowedIds.has(course.college_id)) return
        const existing = coursesByCollege.get(course.college_id) || []
        existing.push(course)
        coursesByCollege.set(course.college_id, existing)
      })
      const results = colleges.map((college) => ({
        ...college,
        courses: coursesByCollege.get(college.id) || []
      }))
      setSearchResults(results)
    } finally {
      setIsSearching(false)
    }
  }

  const featuredColleges = [
    {
      id: 'abes-it',
      name: 'ABES Engineering College',
      slug: 'abes-engineering-college-ghaziabad',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 201,
      logo: '/images/logo.png',
      rating: 4.1,
      feeRange: '₹1.2L - ₹1.5L/year',
      highlight: true
    },
    {
      id: 'jss-academy',
      name: 'JSS Academy of Technical Education',
      slug: 'jss-academy-technical-education-noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 198,
      logo: '/images/logo.png',
      rating: 4.2,
      feeRange: '₹1.1L - ₹1.4L/year'
    },
    {
      id: 'gl-bajaj',
      name: 'GL Bajaj Institute of Technology',
      slug: 'gl-bajaj-greater-noida',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 205,
      logo: '/images/logo.png',
      rating: 4.1,
      feeRange: '₹1.0L - ₹1.3L/year'
    },
    {
      id: 'kiet',
      name: 'KIET Group of Institutions',
      slug: 'kiet-ghaziabad',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 151,
      logo: '/images/logo.png',
      rating: 4.2,
      feeRange: '₹1.1L - ₹1.4L/year'
    },
    {
      id: 'akgec',
      name: 'Ajay Kumar Garg Engineering College',
      slug: 'akgec-ghaziabad',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 190,
      logo: '/images/logo.png',
      rating: 4.0,
      feeRange: '₹1.1L - ₹1.4L/year'
    },
    {
      id: 'galgotias',
      name: 'Galgotias College of Engineering',
      slug: 'gcet-greater-noida',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 202,
      logo: '/images/logo.png',
      rating: 3.9,
      feeRange: '₹1.0L - ₹1.3L/year'
    }
  ]

  const handleEnquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanedPhone = enquiryPhone.replace(/\D/g, '')
    if (!enquiryName.trim() || cleanedPhone.length < 10) {
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert({
          name: enquiryName.trim(),
          phone: cleanedPhone,
          course: enquiryCourse.trim() || null,
          city: enquiryCity.trim() || null,
        })
      if (!error) {
        setIsSuccess(true)
        setEnquiryName('')
        setEnquiryPhone('')
        setEnquiryCourse('')
        setEnquiryCity('')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-visible">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
        </div>

        <div className="relative z-10">
          <section ref={heroRef} className="relative overflow-visible">
            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl text-center"
              >
                <h1
                  className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                  style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                >
                  Your Admission Journey Starts Here
                </h1>
                <p className="mt-6 text-base text-gray-300 md:text-xl text-center">
                  Verified placements, transparent insights, and personalized support for every{' '}
                  <span className="whitespace-nowrap">admission milestone.</span>
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  {[
                    '50+ Verified College Partners',
                    '24/7 Student Support',
                    'Transparent Fee Insights'
                  ].map((badge) => (
                    <span key={badge} className="rounded-full bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/20 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="xl"
                      onClick={openModal}
                      className="h-14 px-10 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-lg font-semibold shadow-xl hover:shadow-xl"
                    >
                      Book Free Counseling
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      size="xl"
                      className="h-14 px-10 bg-white text-black hover:bg-gray-200 text-lg font-semibold shadow-xl"
                    >
                      <Link href="/colleges">View Listed Colleges</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Card className="mx-auto max-w-5xl overflow-visible rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6 md:p-8 overflow-visible">
                    <div className="text-center">
                      <h2
                        className="text-2xl font-bold text-white sm:text-3xl"
                        style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                      >
                        Course-Based Quick Finder
                      </h2>
                      <p className="mt-2 mb-6 text-[#A1A1AA]">
                        Find the right colleges based on your course, specialization, and admission path.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="relative z-50 space-y-2" ref={courseDropdownRef}>
                        <label className="text-sm font-semibold text-slate-200">Choose Your Course</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCourseDropdownOpen(!isCourseDropdownOpen)
                              setCourseSearchQuery('')
                            }}
                            className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-black/70 px-3 text-sm text-white shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <span className="truncate font-medium">
                              {selectedCourse || 'Select course'}
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isCourseDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isCourseDropdownOpen && (
                            <div className="absolute z-50 mt-2 w-full max-h-[240px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain">
                              <div className="sticky top-0 z-10 border-b border-white/10 bg-black/80 p-2 backdrop-blur-sm">
                                <div className="relative">
                                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" />
                                  <Input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={courseSearchQuery}
                                    onChange={(e) => setCourseSearchQuery(e.target.value)}
                                    className="h-9 pl-8 text-sm bg-transparent text-white placeholder:text-[#A1A1AA]"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  {courseSearchQuery && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setCourseSearchQuery('')
                                      }}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-slate-600"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="py-1 pb-2">
                                {filteredCourses.length > 0 ? (
                                  filteredCourses.map((course) => (
                                    <button
                                      key={course}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCourse(course)
                                        setIsCourseDropdownOpen(false)
                                        setCourseSearchQuery('')
                                      }}
                                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                        selectedCourse === course
                                          ? 'bg-primary/10 font-semibold text-primary'
                                          : 'text-white hover:bg-white/10'
                                      }`}
                                    >
                                      {course}
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-4 py-3 text-sm text-[#A1A1AA]">No courses found</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {courseError ? (
                          <p className="text-xs text-red-300">{courseError}</p>
                        ) : null}
                      </div>
                      <AnimatePresence initial={false}>
                        {selectedCourse === 'B.Tech' ? (
                          <motion.div
                            key="specialization"
                            initial={{ opacity: 0, y: -6, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -6, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-50 space-y-2"
                            ref={specializationDropdownRef}
                          >
                            <label className="text-sm font-semibold text-slate-200">Specialization</label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsSpecializationDropdownOpen(!isSpecializationDropdownOpen)
                                  setSpecializationSearchQuery('')
                                }}
                                className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-black/70 px-3 text-sm text-white shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                              >
                                <span className="truncate font-medium">{selectedSpecialization}</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${isSpecializationDropdownOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isSpecializationDropdownOpen && (
                                <div className="absolute z-50 mt-2 w-full max-h-[240px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain">
                                  <div className="sticky top-0 z-10 border-b border-white/10 bg-black/80 p-2 backdrop-blur-sm">
                                    <div className="relative">
                                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" />
                                      <Input
                                        type="text"
                                        placeholder="Search specializations..."
                                        value={specializationSearchQuery}
                                        onChange={(e) => setSpecializationSearchQuery(e.target.value)}
                                        className="h-9 pl-8 text-sm bg-transparent text-white placeholder:text-[#A1A1AA]"
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                      {specializationSearchQuery && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setSpecializationSearchQuery('')
                                          }}
                                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-slate-600"
                                        >
                                          <X className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <div className="py-1 pb-2">
                                    {['All Specializations', ...filteredSpecializations].map((specialization) => (
                                      <button
                                        key={specialization}
                                        type="button"
                                        onClick={() => {
                                          setSelectedSpecialization(specialization)
                                          setIsSpecializationDropdownOpen(false)
                                          setSpecializationSearchQuery('')
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                          selectedSpecialization === specialization
                                            ? 'bg-primary/10 font-semibold text-primary'
                                            : 'text-white hover:bg-white/10'
                                        }`}
                                      >
                                        {specialization}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                      <div className="relative z-50 space-y-2" ref={stateDropdownRef}>
                        <label className="text-sm font-semibold text-slate-200">State</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setIsStateDropdownOpen(!isStateDropdownOpen)
                              setStateSearchQuery('')
                            }}
                            className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-black/70 px-3 text-sm text-white shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <span className="flex items-center gap-2 truncate font-medium">
                              <MapPin className="h-4 w-4 text-primary" />
                              {selectedState}
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isStateDropdownOpen && (
                            <div className="absolute z-50 mt-2 w-full max-h-[240px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain">
                              <div className="sticky top-0 z-10 border-b border-white/10 bg-black/80 p-2 backdrop-blur-sm">
                                <div className="relative">
                                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" />
                                  <Input
                                    type="text"
                                    placeholder="Search states..."
                                    value={stateSearchQuery}
                                    onChange={(e) => setStateSearchQuery(e.target.value)}
                                    className="h-9 pl-8 text-sm bg-transparent text-white placeholder:text-[#A1A1AA]"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  {stateSearchQuery && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setStateSearchQuery('')
                                      }}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-slate-600"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="py-1 pb-2">
                                {['All States', ...filteredStates].map((state) => (
                                  <button
                                    key={state}
                                    type="button"
                                    onClick={() => {
                                      setSelectedState(state)
                                      setIsStateDropdownOpen(false)
                                      setStateSearchQuery('')
                                    }}
                                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                                      selectedState === state
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                                  >
                                    <MapPin className="h-4 w-4 opacity-50" />
                                    {state}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="relative z-50 space-y-2" ref={admissionDropdownRef}>
                        <label className="text-sm font-semibold text-slate-200">Admission Type</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsAdmissionDropdownOpen(!isAdmissionDropdownOpen)}
                            className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-black/70 px-3 text-sm text-white shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <span className="truncate font-medium">{selectedAdmissionType}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isAdmissionDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isAdmissionDropdownOpen && (
                            <div className="absolute z-50 mt-2 w-full max-h-[240px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain">
                              <div className="py-1 pb-2">
                                {admissionOptions.map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      setSelectedAdmissionType(option)
                                      setIsAdmissionDropdownOpen(false)
                                    }}
                                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                      selectedAdmissionType === option
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex justify-center"
                      >
                        <Button
                          size="xl"
                          onClick={handleSearch}
                          className="w-full max-w-md h-14 bg-white text-black hover:bg-gray-200 text-lg font-semibold shadow-xl"
                        >
                          Find Matching Colleges
                        </Button>
                      </motion.div>
                    </div>
                    {hasSearched ? (
                      <div className="mt-6 border-t border-white/10 pt-6">
                        {isSearching ? (
                          <p className="text-sm text-[#A1A1AA] text-center">Finding matching colleges...</p>
                        ) : searchResults.length > 0 ? (
                          <div className="space-y-4">
                            {searchResults.map((college) => (
                              <div key={college.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                  <div className="flex items-start gap-4">
                                    <div className="relative h-14 w-14 rounded-xl border border-white/10 bg-gray-800">
                                      <CollegeLogoImage
                                        src={normalizeUrl(college.logo_url) || '/images/logo-dark.png'}
                                        alt={`${college.name} logo`}
                                        fill
                                        className="object-contain p-2"
                                      />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-semibold text-white">{college.name}</h3>
                                      <p className="text-sm text-[#A1A1AA]">{college.state}</p>
                                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                                        {college.type ? (
                                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white">
                                            {college.type}
                                          </span>
                                        ) : null}
                                        {typeof college.rating === 'number' ? (
                                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white">
                                            <Star className="h-3.5 w-3.5 text-yellow-400" />
                                            {college.rating.toFixed(1)}
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                  {college.slug ? (
                                    <Button
                                      asChild
                                      size="sm"
                                      className="h-10 px-5 bg-white text-black hover:bg-gray-200"
                                    >
                                      <Link href={`/colleges/${college.slug}`}>View Profile</Link>
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      disabled
                                      className="h-10 px-5 bg-white/50 text-black/60 cursor-not-allowed"
                                    >
                                      View Profile
                                    </Button>
                                  )}
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                                  {college.courses.map((course) => {
                                    const feeMin = typeof course.fees_min === 'number' ? `₹${inrFormat.format(course.fees_min)}` : null
                                    const feeMax = typeof course.fees_max === 'number' ? `₹${inrFormat.format(course.fees_max)}` : null
                                    const feeText = feeMin && feeMax ? `${feeMin} - ${feeMax}` : feeMin || feeMax
                                    return (
                                      <div key={course.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#D4D4D8]">
                                        <div className="font-medium text-white">
                                          {course.course}{course.specialization ? ` — ${course.specialization}` : ''}
                                        </div>
                                        {feeText ? <div className="text-xs text-[#A1A1AA]">Fees: {feeText}</div> : null}
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-[#A1A1AA] text-center">No colleges matched these filters.</p>
                        )}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="text-3xl font-semibold text-white sm:text-4xl"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Our Services
                </h2>
                <p className="mt-4 text-base text-[#A1A1AA]">
                  Expert support across every admission milestone.
                </p>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {[
                  { title: 'Admission Guidance', description: 'Roadmap from shortlist to admission.', icon: <UserCheck className="h-5 w-5" /> },
                  { title: 'College Shortlisting', description: 'Rank and goal aligned options.', icon: <TrendingUp className="h-5 w-5" /> },
                  { title: 'Application Help', description: 'Form, docs, and tracking support.', icon: <CheckCircle2 className="h-5 w-5" /> },
                  { title: 'Hostel Finding', description: 'Safe stays near your campus.', icon: <Shield className="h-5 w-5" /> },
                  { title: 'Campus Tour', description: 'Virtual or planned campus visits.', icon: <Video className="h-5 w-5" /> },
                  { title: 'Career Counseling', description: 'Future-ready career guidance sessions.', icon: <Award className="h-5 w-5" /> },
                ].map((service) => (
                  <motion.div
                    key={service.title}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {service.icon}
                          </div>
                          <h3 className="text-base font-semibold text-white">{service.title}</h3>
                        </div>
                        <p className="mt-3 text-sm text-[#A1A1AA]">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="text-3xl font-semibold text-white sm:text-4xl"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Courses We Cover
                </h2>
                <p className="mt-4 text-base text-[#A1A1AA]">
                  Popular programs with dedicated counseling tracks.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {['B.Tech', 'MBA', 'MCA', 'BBA', 'BCA', 'B.Pharm', 'Many More'].map((course) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center gap-2 text-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <p className="text-base font-semibold text-white">{course}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
                <div>
                  <h2
                    className="text-3xl font-semibold text-white"
                    style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                  >
                    Colleges We Work With
                  </h2>
                  <p className="mt-2 text-base text-[#A1A1AA]">
                    Trusted institutions that partner with SecureCollege.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 font-semibold shadow-lg"
                >
                    <Link href="/colleges">View all colleges</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {featuredColleges.slice(0, 6).map((college, idx) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/colleges/${college.slug}`}>
                      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow cursor-pointer">
                        <CardContent className="p-5 h-full flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{college.name}</h3>
                              <p className="mt-1 text-sm text-[#A1A1AA] flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-primary" />
                                {college.city}, {college.state}
                              </p>
                            </div>
                            <div className="rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold">
                              NIRF {college.nirfRank}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-[#A1A1AA]">Avg Fees</span>
                            <span className="text-sm font-medium text-white">{college.feeRange}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white/[0.02]">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-3xl text-center"
              >
                <h2
                  className="text-3xl font-semibold text-white"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Our Process
                </h2>
                <p className="mt-3 text-base text-[#A1A1AA]">
                  Five steps to move confidently toward admission.
                </p>
              </motion.div>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { title: 'Counsel', text: 'Discuss goals and budget', icon: <Phone className="h-6 w-6" /> },
                  { title: 'Choose', text: 'Shortlist best-fit colleges', icon: <Search className="h-6 w-6" /> },
                  { title: 'Visit', text: 'Plan campus walkthrough', icon: <PlayCircle className="h-6 w-6" /> },
                  { title: 'Apply', text: 'Complete forms confidently', icon: <CheckCircle2 className="h-6 w-6" /> },
                  { title: 'Confirm', text: 'Lock seat and onboarding', icon: <GraduationCap className="h-6 w-6" /> },
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {step.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="mt-2 text-sm text-[#A1A1AA]">{step.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="enquire" className="py-20 bg-white/[0.02]">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="text-3xl font-semibold text-white"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Enquire Now
                </h2>
                <p className="mt-3 text-base text-white/70">
                  Share your details and get free guidance from our counselors.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto mt-10 max-w-2xl"
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-8">
                    <p className="text-sm text-[#A1A1AA] mb-4">
                      No sign-up required. Just drop your details and we&apos;ll call you.
                    </p>
                    {isSuccess ? (
                      <p className="text-sm text-white/80">
                        Thanks for reaching out! Our counselor will call you shortly.
                      </p>
                    ) : (
                      <form onSubmit={handleEnquirySubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                          placeholder="Name"
                          value={enquiryName}
                          onChange={(event) => setEnquiryName(event.target.value)}
                          className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                        />
                        <Input
                          placeholder="Phone"
                          value={enquiryPhone}
                          onChange={(event) => setEnquiryPhone(event.target.value)}
                          className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                        />
                        <Input
                          placeholder="Course"
                          value={enquiryCourse}
                          onChange={(event) => setEnquiryCourse(event.target.value)}
                          className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                        />
                        <Input
                          placeholder="City"
                          value={enquiryCity}
                          onChange={(event) => setEnquiryCity(event.target.value)}
                          className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                        />
                        <div className="md:col-span-2">
                          <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="w-full h-12 bg-white text-black hover:bg-gray-200 font-semibold shadow-lg"
                          >
                            {isLoading ? 'Submitting...' : 'Get Free Guidance'}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white/[0.02]">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Loved by ambitious students</h2>
                <p className="mt-3 text-base text-white/70">Stories from students who secured their ideal college.</p>
              </motion.div>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {STUDENT_TESTIMONIALS.map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl text-white transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">{testimonial.text}</p>
                        <div className="mt-6 border-t border-white/5 pt-4">
                          <p className="text-base font-semibold text-white">{testimonial.name}</p>
                          <p className="text-xs text-white/60">{testimonial.college}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="flex flex-col items-start justify-between gap-8 p-10 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-bold text-white">
                        Ready to start your SecureCollege journey?
                      </h2>
                      <p className="mt-4 text-lg text-slate-300">
                        Use the quick finder or book a counseling session to get personalized guidance.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="xl" asChild className="w-full bg-white text-slate-900 shadow-xl hover:bg-slate-100 sm:w-auto">
                          <Link href="/colleges">
                            <Search className="mr-2 h-5 w-5" />
                            Start Quick Finder
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="xl"
                          variant="outline"
                          onClick={openModal}
                          className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                        >
                          <Phone className="mr-2 h-5 w-5" />
                          Book Counseling
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
