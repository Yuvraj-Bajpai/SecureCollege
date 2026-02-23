import { supabase } from '@/lib/supabase'
import { CollegesClient } from '@/components/common/CollegesClient'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import type { CollegeCardData } from '@/components/common/CollegeCard'

export const revalidate = 60

type CollegeRow = {
  name: string | null
  slug: string | null
  city: string | null
  state: string | null
  rating: number | string | null
  highestpackage: string | null
  averagepackage: string | null
  placementpercent: string | null
  description: string | null
  feerange: string | null
  feeRange?: string | null
}

type SeedCollege = {
  name: string
  slug?: string
  city: string
  state: string
  rating: number | string
  placementPercent?: string
  averagePackage?: string
  highestPackage?: string
  feeRange?: string
  description?: string
}

export default async function StudentCollegesPage() {
  const { data, error } = await supabase
    .from('colleges')
    .select('name,slug,city,state,rating,highestpackage,averagepackage,placementpercent,description,feerange,feeRange')
    .order('rating', { ascending: false })

  let mapped: CollegeCardData[] = []

  if (!error && data && data.length > 0) {
    mapped = (data as CollegeRow[]).map((c) => ({
      id: c.slug || c.name || 'unknown',
      name: c.name || 'Unknown College',
      city: c.city || 'Unknown City',
      state: c.state || 'Unknown State',
      category: 'Engineering',
      logo: '/images/logo.png',
      rating: Number(c.rating) || 0,
      placementPercent: c.placementpercent || undefined,
      averagePackage: c.averagepackage || undefined,
      highestPackage: c.highestpackage || undefined,
      feeRange: c.feerange || c.feeRange || undefined,
      description: c.description || undefined,
      highlight: false,
    }))
  }

  if (mapped.length === 0) {
    const seedModule = await import('@/lib/data/colleges-seed.json')
    const seed = seedModule.default as { colleges: SeedCollege[] }
    mapped = seed.colleges.map((c) => ({
      id: c.slug || c.name,
      name: c.name,
      city: c.city,
      state: c.state,
      category: 'Engineering',
      logo: '/images/logo.png',
      rating: Number(c.rating) || 0,
      placementPercent: c.placementPercent || undefined,
      averagePackage: c.averagePackage || undefined,
      highestPackage: c.highestPackage || undefined,
      feeRange: c.feeRange || undefined,
      description: c.description || undefined,
      highlight: false,
    }))
  }

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
          profileBasePath="/students/colleges"
          footerLabel="View Profile"
          stickySidebar
        />
      </div>
    </div>
  )
}
