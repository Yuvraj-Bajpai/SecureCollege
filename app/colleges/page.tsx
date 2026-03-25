import { createSupabaseServerClient } from '@/lib/supabase/server'
import { CollegesClient } from '@/components/common/CollegesClient'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import type { CollegeCardData } from '@/components/common/CollegeCard'

export const revalidate = 60

type CollegeRow = {
  id: string
  name: string
  slug: string
  city: string
  state: string
  rating: number | string | null
  logo_url: string | null
  type: string | null
  naac_grade: string | null
  nirf_rank: number | null
  description: string | null
  courses: string[] | null
}

const normalizeUrl = (value: string | null | undefined) => {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export default async function StudentCollegesPage() {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('colleges')
    .select('id,name,slug,city,state,rating,logo_url,type,naac_grade,nirf_rank,description,courses')
    .order('rating', { ascending: false })

  const resolveSlug = (c: CollegeRow) => {
    const raw = c.slug != null ? String(c.slug).trim() : ''
    if (raw.length > 0) return raw
    return String(c.id).trim() || 'college'
  }

  const mapped: CollegeCardData[] = !error && data
    ? (data as CollegeRow[]).map((c) => {
        return {
          id: resolveSlug(c),
          name: c.name,
          city: c.city,
          state: c.state,
          category: c.type || undefined,
          naacGrade: c.naac_grade || undefined,
          logo: normalizeUrl(c.logo_url) || '/images/logo-dark.png',
          rating: Number(c.rating) || 0,
          nirfRank: typeof c.nirf_rank === 'number' ? c.nirf_rank : undefined,
          description: c.description || undefined,
          topCourses: Array.isArray(c.courses) ? c.courses.filter(Boolean).slice(0, 3) : undefined,
          highlight: false,
        }
      })
    : []

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
      <div className="relative z-10">
        <CollegesClient
          initialColleges={mapped}
          heading="Explore Colleges"
          breadcrumbLabel="Colleges"
          sortOptions={[
            { value: 'best-match', label: 'Best Match' },
            { value: 'highest-placement', label: 'Highest Placement' },
            { value: 'lowest-fees', label: 'Lowest Fees' },
            { value: 'highest-rating', label: 'Highest Rated' }
          ]}
          defaultSort="best-match"
          profileBasePath="/colleges"
          footerLabel="View Profile"
          stickySidebar
          filterLocationMode="city-only"
          filterHideSections={['rating', 'facilities', 'special']}
        />
      </div>
    </div>
  )
}
