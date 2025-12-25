import { supabase } from '@/lib/supabase'
import { CollegesClient } from '@/components/common/CollegesClient'
import type { CollegeCardData } from '@/components/common/CollegeCard'

export const revalidate = 60

export default async function CollegesPage() {
  const { data, error } = await supabase
    .from('colleges')
    .select('name,slug,city,state,rating,highestpackage,averagepackage,placementpercent,description')
    .order('rating', { ascending: false })

  const mapped: CollegeCardData[] = (error ? [] : (data || [])).map((c: any) => ({
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

  return <CollegesClient initialColleges={mapped} />
}

