import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, TrendingUp, Building2, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 120

export async function generateStaticParams() {
  try {
    const { data, error } = await supabase.from('colleges').select('slug')
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase error in generateStaticParams:', error.message)
      }
      return []
    }
    return (data || []).map((c: { slug: string }) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export default async function CollegeProfilePage({ params }: { params: { slug: string } }) {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (error || !data) {
      console.warn('College not found:', params.slug, error?.message)
      notFound()
    }

    const rating = Number(data.rating) || 0

    return (
      <div className="min-h-screen bg-blue-50 dark:bg-gray-900 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                      <Image
                        src="/images/logo.png"
                        alt={`${data.name} logo`}
                        fill
                        className="object-contain p-2 dark:hidden"
                      />
                      <Image
                        src="/images/logo-dark.png"
                        alt={`${data.name} logo`}
                        fill
                        className="object-contain p-2 hidden dark:block"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                        {data.name}
                      </h1>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{data.city}, {data.state}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold">{rating}/5</span>
                        <span className="text-gray-600 dark:text-gray-400">• Verified Data</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>Highest Package</span>
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {data.highestpackage || '—'}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>Average Package</span>
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {data.averagepackage || '—'}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>Placement Rate</span>
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {data.placementpercent || '—'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">About</h2>
                    <p className="text-gray-700 dark:text-gray-300">{data.description || 'No description available.'}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span>Affiliation</span>
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {data.affiliation || '—'}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4 text-primary" />
                        <span>Approvals</span>
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {Array.isArray(data.approvals) && data.approvals.length > 0 ? data.approvals.join(', ') : '—'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Fees</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tuition</div>
                        <div className="text-lg font-semibold mt-2">—</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Hostel</div>
                        <div className="text-lg font-semibold mt-2">—</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Exam</div>
                        <div className="text-lg font-semibold mt-2">—</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
                  <div className="grid grid-cols-1 gap-3">
                    <Link href="/colleges" className="text-primary hover:underline">Back to Colleges</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching college data:', error)
    notFound()
  }
}