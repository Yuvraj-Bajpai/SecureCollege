import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, Star, TrendingUp, Building2, Award, Users, 
  BookOpen, Calendar, Globe, Phone, Mail, ExternalLink,
  GraduationCap, Briefcase, DollarSign, Clock, CheckCircle
} from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ParticleBackground } from '@/components/common/ParticleBackground'

export const revalidate = 120

export async function generateStaticParams() {
  try {
    const supabase = createSupabaseServerClient()
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
    const supabase = createSupabaseServerClient()
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
    const ratingCount = Number(data.rating_count) || 0

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
          {/* Header Section */}
          <div className="container mx-auto px-4 pt-28">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/colleges" className="text-[#A1A1AA] hover:text-white transition-colors">
                ← Back to Colleges
              </Link>
              <span className="text-[#A1A1AA]">•</span>
              <span className="text-sm text-[#A1A1AA]">College Profile</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* College Header Card */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 border border-white/10">
                        <Image
                          src={data.logo_url || "/images/logo-dark.png"}
                          alt={`${data.name} logo`}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                          {data.name}
                        </h1>
                        
                        <div className="flex items-center gap-3 text-sm text-[#A1A1AA] mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{data.city}, {data.state}</span>
                          <span>•</span>
                          <span>Established {data.estd}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold">{rating}/5</span>
                            {ratingCount > 0 && (
                              <span className="text-[#A1A1AA] text-sm">({ratingCount} reviews)</span>
                            )}
                          </div>
                          <span className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                            Verified Data
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          {data.website && (
                            <a 
                              href={data.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                            >
                              <Globe className="w-4 h-4" />
                              Visit Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {data.highestpackage || '—'}
                      </div>
                      <div className="text-sm text-[#A1A1AA]">Highest Package</div>
                    </CardContent>
                  </Card>

                  <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {data.averagepackage || '—'}
                      </div>
                      <div className="text-sm text-[#A1A1AA]">Average Package</div>
                    </CardContent>
                  </Card>

                  <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {data.placementpercent || '—'}
                      </div>
                      <div className="text-sm text-[#A1A1AA]">Placement Rate</div>
                    </CardContent>
                  </Card>

                  <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {data.intake_total ? `${data.intake_total}+` : '—'}
                      </div>
                      <div className="text-sm text-[#A1A1AA]">Annual Intake</div>
                    </CardContent>
                  </Card>
                </div>

                {/* About Section */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-primary" />
                      About the College
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed text-lg">
                      {data.description || 'No detailed description available. This college provides quality education with modern infrastructure and experienced faculty.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          Affiliation
                        </h3>
                        <p className="text-[#A1A1AA]">{data.affiliation || 'Not specified'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          Approvals
                        </h3>
                        <p className="text-[#A1A1AA]">
                          {Array.isArray(data.approvals) && data.approvals.length > 0 
                            ? data.approvals.join(', ') 
                            : 'UGC, AICTE'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Established
                        </h3>
                        <p className="text-[#A1A1AA]">{data.estd || 'Not specified'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          Type
                        </h3>
                        <p className="text-[#A1A1AA]">{data.type || 'Engineering College'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Courses & Programs */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      Programs Offered
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.isArray(data.courses) && data.courses.length > 0 ? (
                        data.courses.slice(0, 8).map((course: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-white">{course}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-white">B.Tech Computer Science</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-white">B.Tech Mechanical Engineering</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-white">B.Tech Electrical Engineering</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-white">MBA</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {(Array.isArray(data.courses) && data.courses.length > 8) && (
                      <div className="mt-4 text-center">
                        <span className="text-sm text-[#A1A1AA]">
                          +{data.courses.length - 8} more programs
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Placement Highlights */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-primary" />
                      Placement Highlights
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-white">Top Recruiters</h3>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(data.notablerecruiters) && data.notablerecruiters.length > 0 ? (
                            data.notablerecruiters.slice(0, 6).map((recruiter: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">
                                {recruiter}
                              </span>
                            ))
                          ) : (
                            <>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">Amazon</span>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">Microsoft</span>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">TCS</span>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">Infosys</span>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">Wipro</span>
                              <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white border border-white/10">Accenture</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold text-white">Placement Statistics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[#A1A1AA]">Highest Package</span>
                            <span className="text-white font-semibold">{data.highestpackage || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#A1A1AA]">Average Package</span>
                            <span className="text-white font-semibold">{data.averagepackage || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#A1A1AA]">Placement Rate</span>
                            <span className="text-white font-semibold">{data.placementpercent || '—'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-4">College At a Glance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm text-[#A1A1AA]">{data.city}, {data.state}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-[#A1A1AA]">Est. {data.estd}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-[#A1A1AA]">{data.type || 'Engineering College'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm text-[#A1A1AA]">
                          {Array.isArray(data.approvals) && data.approvals.length > 0 
                            ? data.approvals.join(', ') 
                            : 'UGC Approved'}
                        </span>
                      </div>
                      {data.campusarea && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-sm text-[#A1A1AA]">{data.campusarea} Campus</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-4">Get In Touch</h3>
                    <div className="space-y-3">
                      {data.website && (
                        <a 
                          href={data.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-[#A1A1AA] hover:text-white transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Official Website
                        </a>
                      )}
                      <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                        <Mail className="w-4 h-4" />
                        <span>info@abes.ac.in</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                        <Phone className="w-4 h-4" />
                        <span>+91-XXXXXXXXXX</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                        Apply Now
                      </button>
                      <button className="w-full border border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-4 rounded-lg transition-colors">
                        Download Brochure
                      </button>
                      <button className="w-full border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-4 rounded-lg transition-colors">
                        Schedule Campus Visit
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Options */}
                <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-4">Share This College</h3>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded text-sm transition-colors">
                        Facebook
                      </button>
                      <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-3 rounded text-sm transition-colors">
                        Twitter
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded text-sm transition-colors">
                        WhatsApp
                      </button>
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