'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Search, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CollegeLogoImage } from '@/components/common/CollegeLogoImage'
import { ParticleBackground } from '@/components/common/ParticleBackground'

type CollegeRow = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  type: string | null
  estd: number | null
  campus_size: string | null
  affiliation: string | null
  naac_grade: string | null
  nirf_rank: number | null
  approvals: string[] | null
}

type CourseRow = {
  id: string
  college_id: string
  course: string | null
  specialization: string | null
  fees_min: number | null
  fees_max: number | null
  duration_years: number | null
  intake: number | null
  entrance: string[] | null
  cutoff_min: string | null
  cutoff_type: string | null
  eligibility: string | null
  averagepackage: string | null
  highestpackage: string | null
  medianpackage: string | null
  notablerecruiters: string[] | null
  average_package_num: number | null
  highest_package_num: number | null
  median_package_num: number | null
  placement_percent_num: number | null
}

const inrFormat = new Intl.NumberFormat('en-IN')

const normalizeUrl = (value: string | null | undefined) => {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const formatFeeRange = (feesMin: number | null, feesMax: number | null) => {
  const minText = typeof feesMin === 'number' ? `₹${inrFormat.format(feesMin)}` : null
  const maxText = typeof feesMax === 'number' ? `₹${inrFormat.format(feesMax)}` : null
  if (minText && maxText) return `${minText} - ${maxText}`
  return minText || maxText || '—'
}

const formatEntranceBadge = (entrance: string[] | null) => {
  if (!Array.isArray(entrance)) return null
  const direct = entrance.some((entry) => /direct admission/i.test(String(entry)))
  const merit = entrance.some((entry) => /merit|board/i.test(String(entry)))
  if (!direct && !merit) return null
  return { direct, merit }
}

export default function CompareClient() {
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [courseOptions, setCourseOptions] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<CollegeRow[]>([])
  const [selectedColleges, setSelectedColleges] = useState<CollegeRow[]>([])
  const [courseRows, setCourseRows] = useState<Record<string, CourseRow | null>>({})
  const [courseCollegeIds, setCourseCollegeIds] = useState<string[]>([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)

  const selectedSlugs = useMemo(() => selectedColleges.map((college) => college.slug), [selectedColleges])

  useEffect(() => {
    let active = true
    const loadCourses = async () => {
      const { data } = await supabase
        .from('college_courses')
        .select('course')
        .not('course', 'is', null)
      if (!active) return
      const distinct = Array.from(new Set((data || []).map((row) => row.course).filter(Boolean))) as string[]
      setCourseOptions(distinct.sort((a, b) => a.localeCompare(b)))
    }
    loadCourses()
    return () => {
      active = false
    }
  }, [supabase])

  useEffect(() => {
    const compare = searchParams?.get('compare') || ''
    const slugs = compare.split(',').map((item) => item.trim()).filter(Boolean).slice(0, 3)
    if (slugs.length === 0) {
      setSelectedColleges([])
      return
    }
    let active = true
    const loadSelected = async () => {
      const { data } = await supabase
        .from('colleges')
        .select('id,name,slug,logo_url,type,estd,campus_size,affiliation,naac_grade,nirf_rank,approvals')
        .in('slug', slugs)
      if (!active) return
      const sorted = (data || []).sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))
      setSelectedColleges(sorted)
    }
    loadSelected()
    return () => {
      active = false
    }
  }, [searchParams, supabase])

  useEffect(() => {
    const next = selectedSlugs.join(',')
    const params = new URLSearchParams(searchParams?.toString())
    if (next) {
      params.set('compare', next)
    } else {
      params.delete('compare')
    }
    const query = params.toString()
    router.replace(query ? `?${query}` : '?', { scroll: false })
  }, [selectedSlugs, router, searchParams])

  useEffect(() => {
    let active = true
    if (!selectedCourse) {
      setCourseCollegeIds([])
      setSearchResults([])
      setCourseRows({})
      return () => {
        active = false
      }
    }
    const loadCourseCollegeIds = async () => {
      const { data } = await supabase
        .from('college_courses')
        .select('college_id')
        .eq('course', selectedCourse)
      if (!active) return
      const ids = Array.from(new Set((data || []).map((row) => row.college_id).filter(Boolean))) as string[]
      setCourseCollegeIds(ids)
    }
    loadCourseCollegeIds()
    return () => {
      active = false
    }
  }, [selectedCourse, supabase])

  useEffect(() => {
    let active = true
    if (!selectedCourse || selectedColleges.length === 0) {
      setCourseRows({})
      return () => {
        active = false
      }
    }
    const loadCourseRows = async () => {
      const { data } = await supabase
        .from('college_courses')
        .select('*')
        .eq('course', selectedCourse)
        .in('college_id', selectedColleges.map((college) => college.id))
      if (!active) return
      const map: Record<string, CourseRow | null> = {}
      selectedColleges.forEach((college) => {
        map[college.id] = null
      })
      ;(data || []).forEach((row) => {
        map[row.college_id] = row
      })
      setCourseRows(map)
    }
    loadCourseRows()
    return () => {
      active = false
    }
  }, [selectedCourse, selectedColleges, supabase])

  useEffect(() => {
    let active = true
    if (!selectedCourse || !searchQuery.trim()) {
      setSearchResults([])
      return () => {
        active = false
      }
    }
    const runSearch = async () => {
      setIsLoadingSearch(true)
      const { data } = await supabase
        .from('colleges')
        .select('id,name,slug,logo_url,type,estd,campus_size,affiliation,naac_grade,nirf_rank,approvals')
        .ilike('name', `%${searchQuery.trim()}%`)
        .in('id', courseCollegeIds.length > 0 ? courseCollegeIds : [''])
        .limit(12)
      if (!active) return
      setSearchResults((data || []).filter((college) => !selectedSlugs.includes(college.slug)))
      setIsLoadingSearch(false)
    }
    runSearch()
    return () => {
      active = false
    }
  }, [selectedCourse, searchQuery, courseCollegeIds, selectedSlugs, supabase])

  const addCollege = (college: CollegeRow) => {
    if (selectedColleges.length >= 3) return
    if (selectedSlugs.includes(college.slug)) return
    setSelectedColleges((prev) => [...prev, college])
  }

  const removeCollege = (slug: string) => {
    setSelectedColleges((prev) => prev.filter((college) => college.slug !== slug))
  }

  const compareCount = selectedColleges.length

  const bestValues = useMemo(() => {
    if (compareCount < 2) {
      return {
        avg: null,
        high: null,
        median: null,
        placement: null,
        nirf: null,
        fees: null,
      }
    }
    const courseList = selectedColleges.map((college) => courseRows[college.id]).filter(Boolean) as CourseRow[]
    const avg = Math.max(...courseList.map((row) => row.average_package_num || 0))
    const high = Math.max(...courseList.map((row) => row.highest_package_num || 0))
    const median = Math.max(...courseList.map((row) => row.median_package_num || 0))
    const placement = Math.max(...courseList.map((row) => row.placement_percent_num || 0))
    const nirfValues = selectedColleges.map((college) => college.nirf_rank).filter((value) => typeof value === 'number') as number[]
    const nirf = nirfValues.length ? Math.min(...nirfValues) : null
    const feesValues = courseList.map((row) => row.fees_min).filter((value) => typeof value === 'number') as number[]
    const fees = feesValues.length ? Math.min(...feesValues) : null
    return { avg, high, median, placement, nirf, fees }
  }, [compareCount, selectedColleges, courseRows])

  const gridTemplateColumns = `minmax(220px, 260px) repeat(${Math.max(compareCount, 1)}, minmax(220px, 1fr))`

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">Compare Colleges</h1>
          <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200">
            <Link href="/colleges">Browse Colleges</Link>
          </Button>
        </div>

        <Card className="mt-6 border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-3">
                <label className="text-base md:text-lg font-semibold text-white">Select a Course to Compare</label>
                <select
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  className="h-14 w-full rounded-xl border border-white/15 bg-black/60 px-4 text-base text-white md:text-lg"
                >
                  <option value="" disabled className="bg-black text-white">
                    Select a course
                  </option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course} className="bg-black text-white">
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-base md:text-lg font-semibold text-white">Search and add a college</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1A1AA]" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={selectedCourse ? 'Search and add a college' : 'Select a course first'}
                    disabled={!selectedCourse}
                    className="h-14 pl-12 text-base md:text-lg bg-black/60 border-white/15 text-white placeholder:text-[#A1A1AA]"
                  />
                </div>
                {isLoadingSearch ? (
                  <p className="text-xs text-[#A1A1AA]">Searching colleges...</p>
                ) : null}
                {selectedCourse && searchResults.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {searchResults.map((college) => {
                      const disabled = compareCount >= 3
                      return (
                        <button
                          key={college.id}
                          type="button"
                          onClick={() => addCollege(college)}
                          disabled={disabled}
                          title={disabled ? 'Max 3 colleges can be compared' : undefined}
                          className={`rounded-full border px-3 py-1 text-xs transition ${
                            disabled
                              ? 'border-white/10 text-white/50 cursor-not-allowed'
                              : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          + {college.name}
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          {selectedColleges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedColleges.map((college) => (
                <div key={college.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="relative h-10 w-10 rounded-lg border border-white/10 bg-gray-800">
                    <CollegeLogoImage
                      src={normalizeUrl(college.logo_url) || '/images/logo-dark.png'}
                      alt={`${college.name} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="text-sm text-white">{college.name}</span>
                  <button type="button" onClick={() => removeCollege(college.slug)} className="text-white/70 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#A1A1AA]">Select colleges to begin comparing.</p>
          )}
        </div>

        {compareCount < 2 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-[#A1A1AA]">
            Add at least 2 colleges to start comparing
          </div>
        ) : null}

        {compareCount > 0 ? (
          <div className="mt-8">
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto rounded-2xl border border-white/10 bg-black/60">
              <div className="min-w-[760px]" style={{ display: 'grid', gridTemplateColumns }}>
                <div className="sticky top-0 left-0 z-30 border-b border-white/10 bg-black/90 p-4 text-sm text-[#A1A1AA]">
                  Category
                </div>
                {selectedColleges.map((college) => (
                  <div key={college.id} className="sticky top-0 z-20 border-b border-white/10 bg-black/90 p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg border border-white/10 bg-gray-800">
                        <CollegeLogoImage
                          src={normalizeUrl(college.logo_url) || '/images/logo-dark.png'}
                          alt={`${college.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{college.name}</p>
                        <p className="text-xs text-[#A1A1AA]">{college.type || '—'}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                  Basic Info
                </div>
                {selectedColleges.map((college) => (
                  <div key={`${college.id}-basic`} className="border-b border-white/10 bg-black/60 px-4 py-2" />
                ))}

                {[
                  { label: 'College Type', value: (college: CollegeRow) => college.type || '—' },
                  { label: 'Established', value: (college: CollegeRow) => college.estd ? String(college.estd) : '—' },
                  { label: 'Campus Size', value: (college: CollegeRow) => college.campus_size || '—' },
                  { label: 'Affiliation', value: (college: CollegeRow) => college.affiliation || '—' },
                ].map((row) => (
                  <div key={row.label} className="contents">
                    <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                      {row.label}
                    </div>
                    {selectedColleges.map((college) => (
                      <div key={`${college.id}-${row.label}`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {row.value(college)}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                  Accreditation
                </div>
                {selectedColleges.map((college) => (
                  <div key={`${college.id}-accredit`} className="border-b border-white/10 bg-black/60 px-4 py-2" />
                ))}

                <div className="contents" key="naac-grade">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    NAAC Grade
                  </div>
                  {selectedColleges.map((college) => (
                    <div key={`${college.id}-naac`} className="border-b border-white/10 bg-black/60 px-4 py-3">
                      {college.naac_grade ? (
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white">
                          NAAC {college.naac_grade}
                        </span>
                      ) : (
                        <span className="text-sm text-white">—</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="contents" key="nirf-rank">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    NIRF Rank
                  </div>
                  {selectedColleges.map((college) => {
                    const highlight = bestValues.nirf && college.nirf_rank === bestValues.nirf
                    return (
                      <div
                        key={`${college.id}-nirf`}
                        className={`border-b border-white/10 bg-black/60 px-4 py-3 text-sm ${
                          highlight ? 'text-emerald-300 font-semibold' : 'text-white'
                        }`}
                      >
                        {college.nirf_rank ? `#${college.nirf_rank}` : 'Not Ranked'}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="approvals">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Approvals
                  </div>
                  {selectedColleges.map((college) => (
                    <div key={`${college.id}-approvals`} className="border-b border-white/10 bg-black/60 px-4 py-3">
                      {Array.isArray(college.approvals) && college.approvals.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {college.approvals.map((approval) => (
                            <span key={approval} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white">
                              {approval}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-white">—</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                  Course & Fees
                </div>
                {selectedColleges.map((college) => (
                  <div key={`${college.id}-coursefees`} className="border-b border-white/10 bg-black/60 px-4 py-2" />
                ))}

                <div className="contents" key="specializations">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Specializations Available
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-specs`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {course?.specialization ? course.specialization : 'This course is not offered here'}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="annual-fees">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Annual Fees
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    const highlight = bestValues.fees && course?.fees_min === bestValues.fees
                    return (
                      <div
                        key={`${college.id}-fees`}
                        className={`border-b border-white/10 bg-black/60 px-4 py-3 text-sm ${
                          highlight ? 'text-emerald-300 font-semibold' : 'text-white'
                        }`}
                      >
                        {course ? formatFeeRange(course.fees_min, course.fees_max) : 'This course is not offered here'}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="duration">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Duration
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-duration`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {course?.duration_years ? `${course.duration_years} years` : course ? '—' : 'This course is not offered here'}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="intake">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Total Intake
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-intake`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {course?.intake ? `${course.intake} seats` : course ? '—' : 'This course is not offered here'}
                      </div>
                    )
                  })}
                </div>

                <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                  Admissions
                </div>
                {selectedColleges.map((college) => (
                  <div key={`${college.id}-admissions`} className="border-b border-white/10 bg-black/60 px-4 py-2" />
                ))}

                <div className="contents" key="entrance-exams">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Entrance Exams
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-entrance`} className="border-b border-white/10 bg-black/60 px-4 py-3">
                        {course?.entrance && course.entrance.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {course.entrance.map((exam) => (
                              <span key={exam} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white">
                                {exam}
                              </span>
                            ))}
                          </div>
                        ) : course ? (
                          <span className="text-sm text-white">—</span>
                        ) : (
                          <span className="text-sm text-white">This course is not offered here</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="admission-type">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Admission Type
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    const badge = formatEntranceBadge(course?.entrance || null)
                    return (
                      <div key={`${college.id}-admission-type`} className="border-b border-white/10 bg-black/60 px-4 py-3">
                        {course ? (
                          badge ? (
                            <div className="flex flex-wrap gap-2">
                              {badge.direct ? (
                                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-200">
                                  Direct Admission
                                </span>
                              ) : null}
                              {badge.merit ? (
                                <span className="rounded-full border border-blue-500/30 bg-blue-500/15 px-2.5 py-1 text-xs text-blue-200">
                                  Merit Based
                                </span>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-sm text-white">—</span>
                          )
                        ) : (
                          <span className="text-sm text-white">This course is not offered here</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="cutoff">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Cutoff
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-cutoff`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {course?.cutoff_min
                          ? `${course.cutoff_min}${course.cutoff_type ? ` — ${course.cutoff_type}` : ''}`
                          : course
                            ? '—'
                            : 'This course is not offered here'}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="eligibility">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Eligibility
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-eligibility`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm text-white">
                        {course?.eligibility || (course ? '—' : 'This course is not offered here')}
                      </div>
                    )
                  })}
                </div>

                <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                  Placements
                </div>
                {selectedColleges.map((college) => (
                  <div key={`${college.id}-placements`} className="border-b border-white/10 bg-black/60 px-4 py-2" />
                ))}

                {[
                  {
                    label: 'Average Package',
                    value: (course: CourseRow | null) => course?.averagepackage || '—',
                    highlight: (course: CourseRow | null) => bestValues.avg && course?.average_package_num === bestValues.avg,
                  },
                  {
                    label: 'Highest Package',
                    value: (course: CourseRow | null) => course?.highestpackage || '—',
                    highlight: (course: CourseRow | null) => bestValues.high && course?.highest_package_num === bestValues.high,
                  },
                  {
                    label: 'Median Package',
                    value: (course: CourseRow | null) => course?.medianpackage || '—',
                    highlight: (course: CourseRow | null) => bestValues.median && course?.median_package_num === bestValues.median,
                  },
                ].map((row) => (
                  <div key={row.label} className="contents">
                    <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                      {row.label}
                    </div>
                    {selectedColleges.map((college) => {
                      const course = courseRows[college.id] || null
                      return (
                        <div
                          key={`${college.id}-${row.label}`}
                          className={`border-b border-white/10 bg-black/60 px-4 py-3 text-sm ${
                            row.highlight(course) ? 'text-emerald-300 font-semibold' : 'text-white'
                          }`}
                        >
                          {course ? row.value(course) : 'This course is not offered here'}
                        </div>
                      )
                    })}
                  </div>
                ))}

                <div className="contents" key="placement-percent">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Placement %
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    const highlight = bestValues.placement && course?.placement_percent_num === bestValues.placement
                    const percent = course?.placement_percent_num ?? null
                    return (
                      <div key={`${college.id}-placement`} className="border-b border-white/10 bg-black/60 px-4 py-3 text-sm">
                        {course ? (
                          percent !== null ? (
                            <div className="space-y-2">
                              <div className={`text-sm ${highlight ? 'text-emerald-300 font-semibold' : 'text-white'}`}>
                                {percent}%
                              </div>
                              <div className="h-2 w-full rounded-full bg-white/10">
                                <div
                                  className={`h-2 rounded-full ${highlight ? 'bg-emerald-400' : 'bg-white/50'}`}
                                  style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-white">—</span>
                          )
                        ) : (
                          <span className="text-sm text-white">This course is not offered here</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="contents" key="notable-recruiters">
                  <div className="sticky left-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 text-sm text-[#A1A1AA]">
                    Notable Recruiters
                  </div>
                  {selectedColleges.map((college) => {
                    const course = courseRows[college.id]
                    return (
                      <div key={`${college.id}-recruiters`} className="border-b border-white/10 bg-black/60 px-4 py-3">
                        {course?.notablerecruiters && course.notablerecruiters.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {course.notablerecruiters.map((recruiter) => (
                              <span key={recruiter} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white">
                                {recruiter}
                              </span>
                            ))}
                          </div>
                        ) : course ? (
                          <span className="text-sm text-white">—</span>
                        ) : (
                          <span className="text-sm text-white">This course is not offered here</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
