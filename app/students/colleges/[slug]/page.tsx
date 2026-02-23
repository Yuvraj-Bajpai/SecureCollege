import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Star, TrendingUp, Building2, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ParticleBackground } from '@/components/common/ParticleBackground'

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

export default async function StudentCollegeProfilePage({ params }: { params: { slug: string } }) {
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
      <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white pb-16 overflow-hidden">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                        <Image
                          src="/images/logo-dark.png"
                          alt={`${data.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 truncate">
                          {data.name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{data.city}, {data.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold">{rating}/5</span>
                          <span className="text-[#A1A1AA]">• Verified Data</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span>Highest Package</span>
                        </div>
                        <div className="text-lg font-semibold mt-2">
                          {data.highestpackage || '—'}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span>Average Package</span>
                        </div>
                        <div className="text-lg font-semibold mt-2">
                          {data.averagepackage || '—'}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span>Placement Rate</span>
                        </div>
                        <div className="text-lg font-semibold mt-2">
                          {data.placementpercent || '—'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-xl font-bold mb-2 text-white">About</h2>
                      <p className="text-[#A1A1AA]">{data.description || 'No description available.'}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span>Affiliation</span>
                        </div>
                        <div className="text-lg font-semibold mt-2">
                          {data.affiliation || '—'}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
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
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-white">Fees</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-sm text-[#A1A1AA]">Tuition</div>
                          <div className="text-lg font-semibold mt-2">—</div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-sm text-[#A1A1AA]">Hostel</div>
                          <div className="text-lg font-semibold mt-2">—</div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-sm text-[#A1A1AA]">Exam</div>
                          <div className="text-lg font-semibold mt-2">—</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-white">Quick Links</h2>
                    <div className="grid grid-cols-1 gap-3">
                      <Link href="/students/colleges" className="text-primary hover:underline">Back to Colleges</Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
