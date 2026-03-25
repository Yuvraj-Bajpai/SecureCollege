import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  BadgeCheck,
  GraduationCap,
  BookOpen,
  Facebook,
  Instagram,
  Linkedin,
  Info,
} from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import { CollegeLogoImage } from '@/components/common/CollegeLogoImage'
import { extractYouTubeVideoId, formatPhoneDisplay, isValidSocialUrl } from '@/lib/collegeProfileUtils'
import { ScheduleVisitButton } from '@/components/common/ScheduleVisitButton'

export const dynamic = 'force-dynamic'
export const revalidate = 120

type CourseRow = {
  id: string
  course: string
  specialization: string | null
  level: string
  duration_years: number | null
  fees_min: number | null
  fees_max: number | null
  fees_type: string | null
  highestpackage: string | null
  averagepackage: string | null
  placementpercent: string | null
  entrance: string[] | null
  eligibility: string | null
  cutoff_type: string | null
  cutoff_min: string | null
  cutoff_comment: string | null
  notablerecruiters: string[] | null
}

const inrFormat = new Intl.NumberFormat('en-IN')

const normalizeUrl = (value: string | null | undefined) => {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const readVirtualTourUrl = (college: Record<string, unknown>) => {
  const candidates = ['virtual_tour_url', 'virtual_tour', 'virtualtour_url', 'virtual_tour_link']
  for (const key of candidates) {
    const value = college[key]
    if (typeof value === 'string' && value.trim()) {
      return normalizeUrl(value)
    }
  }
  return null
}

export default async function StudentCollegeProfilePage({ params }: { params: { slug: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const slug = params.slug.trim()

    const exact = await supabase.from('colleges').select('*').eq('slug', slug).limit(1).maybeSingle()
    let college = exact.data as any
    let error = exact.error

    if (!college) {
      const prefix = await supabase.from('colleges').select('*').ilike('slug', `${slug}%`).limit(5)
      const rows = (prefix.data || []) as Array<Record<string, unknown>>
      college = rows.find((r) => (typeof r.slug === 'string' ? r.slug.trim() : '') === slug) || rows[0] || null
      error = prefix.error
    }

    if (error || !college) notFound()

    const { data: courseData } = await supabase
      .from('college_courses')
      .select('*')
      .eq('college_id', college.id)
      .order('level', { ascending: true })
      .order('course', { ascending: true })

    const courses = (courseData || []) as CourseRow[]
    const rating = Number(college.rating) || 0
    const ratingCount = Number(college.rating_count) || 0

    const rawLogo = normalizeUrl(college.logo_url)
    const logo = rawLogo || '/images/logo-dark.png'
    const websiteHref = normalizeUrl(college.website)
    const brochureHref = normalizeUrl(college.brochure_url)
    const virtualTourHref = readVirtualTourUrl(college)
    const emailValue = college.email?.trim() || null
    const phoneValue = college.phone?.trim() || null

    const heroVideoUrl = college.youtube_url?.trim() || null
    const heroVideoId = college.youtube_video_id || (heroVideoUrl ? extractYouTubeVideoId(heroVideoUrl) : null)
    const heroEmbedSrc = heroVideoId
      ? `https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${heroVideoId}`
      : null
    const heroImage = normalizeUrl(college.hero_image_url) || normalizeUrl(college.banner_url)
    const description = typeof college.description === 'string' ? college.description.trim() : ''

    const socialLinks = [
      { label: 'Facebook', href: normalizeUrl(college.facebook_url), Icon: Facebook },
      { label: 'Instagram', href: normalizeUrl(college.instagram_url), Icon: Instagram },
      { label: 'LinkedIn', href: normalizeUrl(college.linkedin_url), Icon: Linkedin },
    ].filter((s) => s.href && isValidSocialUrl(s.href))

    const infoTiles = [
      { label: 'Established', value: college.estd },
      { label: 'Type', value: college.type },
      { label: 'Ownership', value: college.ownership },
      { label: 'Affiliation', value: college.affiliation },
      { label: 'Country', value: college.country },
      { label: 'Campus Size', value: college.campus_size },
      { label: 'NAAC Grade', value: college.naac_grade },
      { label: 'NIRF Rank', value: college.nirf_rank ? `#${college.nirf_rank}` : null },
    ].filter((t) => t.value !== null && t.value !== undefined && String(t.value).trim() !== '')
    const approvals = Array.isArray(college.approvals) ? college.approvals.filter(Boolean) : []
    const locationText = [college.city, college.state].filter(Boolean).join(', ')

    return (
      <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
        </div>
        <div className="relative z-10">
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[100svh] min-h-[640px] w-full">
            {heroVideoUrl && heroEmbedSrc ? (
              <div className="absolute inset-0">
                <iframe
                  src={heroEmbedSrc}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${college.name} campus video`}
                />
              </div>
            ) : heroImage ? (
              <Image src={heroImage} alt={`${college.name} hero`} fill priority className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#0A0A0A]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[#0A0A0A]" />

            <div className="absolute inset-0">
              <div className="container mx-auto px-4 pt-24">
                <Link
                  href="/colleges"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/30"
                >
                  ← Back to Colleges
                </Link>
              </div>

              <div className="container mx-auto px-4">
                <div className="mt-10 max-w-4xl">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-2xl border border-white/20 bg-black/20 backdrop-blur overflow-hidden">
                      <CollegeLogoImage src={logo} alt={`${college.name} logo`} fill className="object-contain p-3" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">{college.name}</h1>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/90">
                        {locationText ? (
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {locationText}
                          </span>
                        ) : null}
                        {college.type ? <span className="text-white/85">{college.type}</span> : null}
                        {rating > 0 ? (
                          <span className="inline-flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-300" />
                            {rating}/5{ratingCount > 0 ? <span className="text-white/75">({ratingCount})</span> : null}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {college.naac_grade ? (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        NAAC {college.naac_grade}
                      </span>
                    ) : null}
                    {college.nirf_rank ? (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        NIRF #{college.nirf_rank}
                      </span>
                    ) : null}
                    {college.contact_verified ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        <BadgeCheck className="h-4 w-4" />
                        Verified contacts
                      </span>
                    ) : null}
                    {approvals.length > 0 ? (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {approvals.slice(0, 3).join(' • ')}
                        {approvals.length > 3 ? ` +${approvals.length - 3}` : ''}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    {websiteHref ? (
                      <Button
                        asChild
                        size="lg"
                        className="h-12 px-6 bg-white text-black hover:bg-gray-200 border border-white/20"
                      >
                        <a href={websiteHref} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Official Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    ) : null}
                    {brochureHref ? (
                      <Button
                        asChild
                        size="lg"
                        className="h-12 px-6 bg-black/20 text-white hover:bg-black/30 border border-white/20 backdrop-blur"
                      >
                        <a href={brochureHref} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Brochure
                        </a>
                      </Button>
                    ) : null}
                    {virtualTourHref ? (
                      <Button
                        asChild
                        size="lg"
                        className="h-12 px-6 bg-black/20 text-white hover:bg-black/30 border border-white/20 backdrop-blur"
                      >
                        <a href={virtualTourHref} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Virtual Tour
                        </a>
                      </Button>
                    ) : null}
                  </div>

                  {description ? (
                    <p className="mt-8 max-w-3xl text-sm md:text-base leading-relaxed text-white/90">
                      {description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="space-y-8">
              {(infoTiles.length > 0 || approvals.length > 0) ? (
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-lg font-semibold text-white">
                      <Info className="h-5 w-5 text-primary" />
                      Key facts
                    </div>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {infoTiles.slice(0, 9).map((tile) => (
                        <div key={tile.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-[11px] uppercase tracking-wider text-[#A1A1AA] mb-2">{tile.label}</p>
                          <p className="text-white font-semibold">{String(tile.value)}</p>
                        </div>
                      ))}
                    </div>
                    {approvals.length > 0 ? (
                      <div className="mt-5">
                        <p className="text-sm text-[#A1A1AA] mb-2">Approvals</p>
                        <div className="flex flex-wrap gap-2">
                          {approvals.map((approval: string) => (
                            <span
                              key={approval}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                            >
                              {approval}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}

              <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Courses & admission
                  </h2>
                  <p className="mt-2 text-sm text-[#A1A1AA]">
                    A quick, student-friendly summary of the most relevant details.
                  </p>

                  {courses.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {courses.slice(0, 18).map((course) => {
                        const direct = Array.isArray(course.entrance) && course.entrance.some((e) => /direct admission/i.test(String(e)))
                        const merit = Array.isArray(course.entrance) && course.entrance.some((e) => /merit|board/i.test(String(e)))
                        const feeMin = typeof course.fees_min === 'number' ? `₹${inrFormat.format(course.fees_min)}` : null
                        const feeMax = typeof course.fees_max === 'number' ? `₹${inrFormat.format(course.fees_max)}` : null
                        const feeText = feeMin && feeMax ? `${feeMin} - ${feeMax}` : feeMin || feeMax
                        const entranceList =
                          Array.isArray(course.entrance) && course.entrance.length > 0 ? course.entrance.slice(0, 3).filter(Boolean) : []

                        return (
                          <div key={course.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-base md:text-lg font-semibold text-white">
                                {course.course}
                                {course.specialization ? <span className="text-[#A1A1AA]"> — {course.specialization}</span> : null}
                              </h3>
                              <div className="flex flex-wrap gap-2 text-xs">
                                {course.level ? (
                                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white">
                                    {course.level}
                                  </span>
                                ) : null}
                                {course.duration_years ? (
                                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white">
                                    {course.duration_years} years
                                  </span>
                                ) : null}
                                {direct ? (
                                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                                    Direct admission
                                  </span>
                                ) : null}
                                {merit ? (
                                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-700">
                                    Merit based
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              {feeText ? (
                                <div className="text-[#A1A1AA]">
                                  Fees: <span className="text-white font-medium">{feeText}</span>
                                  {course.fees_type ? <span className="text-[#A1A1AA]"> ({course.fees_type})</span> : null}
                                </div>
                              ) : null}
                              {course.eligibility ? (
                                <div className="text-[#A1A1AA]">
                                  Eligibility: <span className="text-white font-medium">{course.eligibility}</span>
                                </div>
                              ) : null}
                              {course.placementpercent ? (
                                <div className="text-[#A1A1AA]">
                                  Placement: <span className="text-white font-medium">{course.placementpercent}</span>
                                </div>
                              ) : null}
                              {course.averagepackage ? (
                                <div className="text-[#A1A1AA]">
                                  Avg package: <span className="text-white font-medium">{course.averagepackage}</span>
                                </div>
                              ) : null}
                            </div>

                            {entranceList.length > 0 ? (
                              <div className="mt-4">
                                <p className="text-xs text-[#A1A1AA] mb-2">Entrance</p>
                                <div className="flex flex-wrap gap-2">
                                  {entranceList.map((exam) => (
                                    <span key={exam} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white">
                                      {exam}
                                    </span>
                                  ))}
                                  {Array.isArray(course.entrance) && course.entrance.length > entranceList.length ? (
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#A1A1AA]">
                                      +{course.entrance.length - entranceList.length} more
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )
                      })}

                      {courses.length > 18 ? (
                        <p className="text-xs text-[#A1A1AA]">
                          Showing top 18 course rows for readability. More rows exist for this college.
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-[#A1A1AA]">No course rows available for this college yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              {(websiteHref ||
                emailValue ||
                phoneValue ||
                socialLinks.length > 0 ||
                brochureHref ||
                virtualTourHref ||
                college.contact_last_checked_at) ? (
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-white">Official links & contact</h2>
                    {college.contact_last_checked_at ? (
                      <p className="mt-1 text-xs text-[#A1A1AA]">
                        Last checked on {new Date(college.contact_last_checked_at).toLocaleDateString()}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-3 text-sm">
                      <ScheduleVisitButton collegeName={college.name} />
                      {websiteHref ? (
                        <a
                          href={websiteHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                        >
                          <span className="inline-flex items-center gap-2 text-white">
                            <Globe className="h-4 w-4" />
                            Official Website
                          </span>
                          <ExternalLink className="h-4 w-4 text-[#A1A1AA]" />
                        </a>
                      ) : null}
                      {brochureHref ? (
                        <a
                          href={brochureHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                        >
                          <span className="inline-flex items-center gap-2 text-white">
                            <BookOpen className="h-4 w-4" />
                            Brochure
                          </span>
                          <ExternalLink className="h-4 w-4 text-[#A1A1AA]" />
                        </a>
                      ) : null}
                      {virtualTourHref ? (
                        <a
                          href={virtualTourHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                        >
                          <span className="inline-flex items-center gap-2 text-white">
                            <ExternalLink className="h-4 w-4" />
                            Virtual Tour
                          </span>
                          <ExternalLink className="h-4 w-4 text-[#A1A1AA]" />
                        </a>
                      ) : null}
                      {emailValue ? (
                        <a
                          href={`mailto:${emailValue}`}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                        >
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-white font-medium break-all">{emailValue}</span>
                        </a>
                      ) : null}
                      {phoneValue ? (
                        <a
                          href={`tel:${String(phoneValue).replace(/[^\d+]/g, '')}`}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                        >
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-white font-medium">{formatPhoneDisplay(String(phoneValue))}</span>
                        </a>
                      ) : null}
                    </div>

                    {socialLinks.length > 0 ? (
                      <div className="mt-5">
                        <p className="text-xs text-[#A1A1AA] mb-2">Socials</p>
                        <div className="flex flex-wrap gap-2">
                          {socialLinks.map(({ label, href, Icon }) => (
                            <a
                              key={label}
                              href={href!}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              title={label}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                            >
                              <Icon className="h-5 w-5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}
            </aside>
          </div>
        </section>
        </div>
      </div>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
