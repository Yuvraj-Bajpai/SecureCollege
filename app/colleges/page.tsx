import { supabase } from '@/lib/supabase'
import { CollegesClient } from '@/components/common/CollegesClient'
import type { CollegeCardData } from '@/components/common/CollegeCard'

export const revalidate = 60

export default async function CollegesPage() {
  const { data, error } = await supabase
    .from('colleges')
    .select('name,slug,city,state,rating,highestpackage,averagepackage,placementpercent,description')
    .order('rating', { ascending: false })

  let mapped: CollegeCardData[] = []

  if (!error && data && data.length > 0) {
    mapped = data.map((c: any) => ({
      id: c.slug || c.name,
      name: c.name,
      city: c.city,
      state: c.state,
      category: 'Engineering',
      logo: '/images/logo.png',
      rating: Number(c.rating) || 0,
      placementPercent: c.placementpercent || undefined,
      averagePackage: c.averagepackage || undefined,
      highestPackage: c.highestpackage || undefined,
      description: c.description || undefined,
      highlight: false,
    }))
  }

  if (mapped.length === 0) {
    const seedModule = await import('@/lib/data/colleges-seed.json')
    const seed = seedModule.default as { colleges: any[] }
    mapped = seed.colleges.map((c: any) => ({
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
      description: c.description || undefined,
      highlight: false,
    }))
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[32rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.18),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#5B8DEF]/12 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-indigo-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <CollegesClient initialColleges={mapped} />
      </div>
    </div>
  )
}

