'use client'

import { useState, useEffect, useCallback } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CollegeCard } from '@/components/common/CollegeCard'
import { 
  MapPin, Star, Download, Calendar, Phone, Mail, CheckCircle2, 
  TrendingUp, Building2, Users, Award, GraduationCap, Rocket,
  Target, ArrowRight, BarChart3, PieChart, TrendingDown, Video, IndianRupee
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock college data
const collegeData = {
  'abes-it': {
    id: 'abes-it',
    name: 'ABES Institute of Technology',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    logo: '/images/logo.png',
    campusImage: '/images/logo.png',
    rating: 4.3,
    reviews: 245,
    badge: 'AKTU',
    accreditation: 'NAAC A+',
    about: 'ABES Institute of Technology is a premier engineering institution in the National Capital Region, offering world-class education in various engineering disciplines. Established with a vision to impart quality technical education, ABES has consistently ranked among the top engineering colleges in Uttar Pradesh. With state-of-the-art infrastructure, experienced faculty, and strong industry connections, ABES prepares students for successful careers in engineering and technology. The institute emphasizes practical learning, innovation, and research, providing students with numerous opportunities to excel academically and professionally.',
    affiliation: 'AKTU (Dr. A.P.J. Abdul Kalam Technical University)',
    naacGrade: 'A+',
    students: 3200,
    facultyRatio: '1:15',
    courses: [
      { branch: 'Computer Science Engineering', duration: '4 years', seats: 180, fees: '₹1.5L/year', cutoff: '85K (JEE Main)' },
      { branch: 'Electronics & Communication', duration: '4 years', seats: 120, fees: '₹1.4L/year', cutoff: '95K (JEE Main)' },
      { branch: 'Mechanical Engineering', duration: '4 years', seats: 120, fees: '₹1.3L/year', cutoff: '1.2L (JEE Main)' },
      { branch: 'Information Technology', duration: '4 years', seats: 90, fees: '₹1.5L/year', cutoff: '90K (JEE Main)' },
    ],
    infrastructure: [
      { name: 'Library', description: 'Fully stocked library with 50K+ books' },
      { name: 'Labs', description: 'Modern labs with latest equipment' },
      { name: 'Sports', description: 'Indoor & outdoor sports facilities' },
      { name: 'Hostel', description: 'Separate hostels for boys and girls' },
      { name: 'Cafeteria', description: 'Multi-cuisine food court' },
      { name: 'Medical', description: '24/7 medical facilities' }
    ],
    rankings: ['NIRF: 185 (2024)', 'Times: 15 in UP', 'Outlook: A++'],
    avgPackage: 8.5,
    highestPackage: 45.0,
    placementPercent: 92,
    companies: 150,
    branchWisePlacements: [
      { branch: 'CSE', avg: 12.5, highest: 50, placed: 95 },
      { branch: 'ECE', avg: 9.8, highest: 42, placed: 90 },
      { branch: 'ME', avg: 7.2, highest: 28, placed: 85 },
      { branch: 'IT', avg: 11.2, highest: 45, placed: 92 }
    ],
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro', 'Accenture', 'Cognizant'],
    successStories: [
      { name: 'Rahul Sharma', branch: 'CSE', company: 'Google', package: '42 LPA', year: '2024' },
      { name: 'Priya Patel', branch: 'ECE', company: 'Microsoft', package: '38 LPA', year: '2024' },
      { name: 'Amit Kumar', branch: 'IT', company: 'Amazon', package: '35 LPA', year: '2023' }
    ],
    eligibility: [
      'JEE Main qualified or equivalent entrance exam',
      '10+2 with 75% aggregate marks (PCM)',
      'Minimum 60% in Mathematics',
      'Valid score in entrance examination'
    ],
    timeline: [
      { month: 'Jan', event: 'Application opens' },
      { month: 'Apr', event: 'JEE Main results' },
      { month: 'May', event: 'Counselling starts' },
      { month: 'Jun', event: 'Admission process' },
      { month: 'Jul', event: 'Classes begin' }
    ],
    cutoffs: [
      { branch: 'CSE', general: '85K', obc: '1.2L', sc: '1.8L', st: '2.1L' },
      { branch: 'ECE', general: '95K', obc: '1.3L', sc: '1.9L', st: '2.2L' },
      { branch: 'ME', general: '1.2L', obc: '1.5L', sc: '2.0L', st: '2.4L' },
      { branch: 'IT', general: '90K', obc: '1.25L', sc: '1.85L', st: '2.1L' }
    ],
    documents: [
      'JEE Main admit card and scorecard',
      '10th & 12th mark sheets',
      'Transfer Certificate',
      'Migration Certificate',
      'Character Certificate',
      'Category Certificate (if applicable)',
      'Passport size photographs',
      'Medical Certificate'
    ],
    scholarships: [
      { name: 'Merit Scholarship', description: 'Up to 50% fee waiver for rank < 10K', amount: '₹75K/year' },
      { name: 'Merit-cum-Means', description: 'For economically weaker students', amount: '100% waiver' },
      { name: 'Sports Scholarship', description: 'For state/national level athletes', amount: '₹50K/year' }
    ],
    similarColleges: [
      { id: 'jss-academy', name: 'JSS Academy', city: 'Noida', state: 'UP', rating: 4.2 },
      { id: 'gl-bajaj', name: 'GL Bajaj Institute', city: 'Greater Noida', state: 'UP', rating: 4.1 },
      { id: 'kiet', name: 'KIET Group', city: 'Ghaziabad', state: 'UP', rating: 4.0 }
    ]
  }
}

type TabType = 'overview' | 'virtual-tour' | 'admissions' | 'placements' | 'student-life' | 'reviews' | 'fees'

export default function CollegeProfilePage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const college = collegeData[slug as keyof typeof collegeData]
  
  if (!college) {
    notFound()
  }

  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'virtual-tour' as TabType, label: 'Virtual Tour' },
    { id: 'admissions' as TabType, label: 'Admissions' },
    { id: 'placements' as TabType, label: 'Placements' },
    { id: 'student-life' as TabType, label: 'Student Life' },
    { id: 'reviews' as TabType, label: 'Reviews' },
    { id: 'fees' as TabType, label: 'Fees' }
  ]

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": college.name,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": college.city,
              "addressRegion": college.state,
              "addressCountry": "IN"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": college.rating,
              "reviewCount": college.reviews
            }
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="relative h-[500px] w-full">
          {/* Campus Image with Gradient */}
          <div className="absolute inset-0">
            <Image
              src={college.campusImage}
              alt={`${college.name} Campus`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 h-full relative z-10 flex items-end pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Left: Logo & Info */}
              <div className="md:col-span-2 flex gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white flex-shrink-0">
                  {/* Light theme logo */}
                  <Image
                    src={college.logo}
                    alt={college.name}
                    fill
                    className="object-contain p-2 dark:hidden"
                  />
                  {/* Dark theme logo */}
                  <Image
                    src="/images/logo-dark.png"
                    alt={college.name}
                    fill
                    className="object-contain p-2 hidden dark:block"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-3">{college.name}</h1>
                  <div className="flex items-center gap-2 text-white/90 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{college.city}, {college.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge label={college.badge} />
                    <Badge label={college.accreditation} />
                  </div>
                </div>
              </div>

              {/* Right: Rating & Actions */}
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl font-bold text-white">{college.rating}</span>
                  </div>
                  <p className="text-white/80 text-sm">{college.reviews} reviews</p>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary-600 text-white">
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Tabs */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-4 px-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 relative",
                    activeTab === tab.id
                      ? "text-primary border-primary"
                      : "text-gray-600 border-transparent hover:text-primary"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'overview' && <OverviewTab college={college} />}
          {activeTab === 'virtual-tour' && <VirtualTourTab college={college} />}
          {activeTab === 'admissions' && <AdmissionsTab college={college} />}
          {activeTab === 'placements' && <PlacementsTab college={college} />}
          {activeTab === 'student-life' && <StudentLifeTab college={college} />}
          {activeTab === 'reviews' && <ReviewsTab college={college} />}
          {activeTab === 'fees' && <FeesTab college={college} />}
        </div>
      </div>
    </>
  )
}

// Badge Component
function Badge({ label, variant = 'hero' }: { label: string; variant?: 'hero' | 'info' }) {
  if (variant === 'info') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {label}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
      {label}
    </span>
  )
}

// Overview Tab
function OverviewTab({ college }: { college: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      {/* Main Content (70%) */}
      <div className="lg:col-span-7 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 mb-1">Affiliation</p>
              <p className="font-semibold text-sm">AKTU</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 mb-1">NAAC Grade</p>
              <p className="font-semibold text-sm">{college.naacGrade}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 mb-1">Students</p>
              <p className="font-semibold text-sm">{college.students.toLocaleString()}+</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 mb-1">Faculty Ratio</p>
              <p className="font-semibold text-sm">{college.facultyRatio}</p>
            </CardContent>
          </Card>
        </div>

        {/* About */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About {college.name}</h2>
            <p className="text-gray-700 leading-relaxed">{college.about}</p>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">Branch</th>
                    <th className="p-3 text-center font-semibold">Duration</th>
                    <th className="p-3 text-center font-semibold">Seats</th>
                    <th className="p-3 text-center font-semibold">Fees</th>
                    <th className="p-3 text-center font-semibold">Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course: any, idx: number) => (
                    <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3 font-medium">{course.branch}</td>
                      <td className="p-3 text-center">{course.duration}</td>
                      <td className="p-3 text-center">{course.seats}</td>
                      <td className="p-3 text-center">{course.fees}</td>
                      <td className="p-3 text-center">{course.cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.infrastructure.map((infra: any, idx: number) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">{infra.name}</h3>
                  <p className="text-sm text-gray-600">{infra.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rankings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rankings</h2>
            <div className="flex flex-wrap gap-3">
              {college.rankings.map((rank: string, idx: number) => (
                <Badge label={rank} variant="info" key={idx} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar (30%) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="sticky top-32">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary-600">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Brochure
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Key Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm text-gray-600">Avg Package</span>
                  <span className="font-bold">₹{college.avgPackage} LPA</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm text-gray-600">Highest Package</span>
                  <span className="font-bold">₹{college.highestPackage} LPA</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm text-gray-600">Placement %</span>
                  <span className="font-bold">{college.placementPercent}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Companies</span>
                  <span className="font-bold">{college.companies}+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Colleges */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Similar Colleges</h3>
              <div className="space-y-4">
                {college.similarColleges.map((similar: any, idx: number) => (
                  <Link key={idx} href={`/colleges/${similar.id}`} className="block p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                    <h4 className="font-semibold mb-1">{similar.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{similar.city}, {similar.state}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{similar.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Virtual Tour Tab
function VirtualTourTab({ college }: { college: any }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <Video className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Virtual Campus Tour</h2>
          <p className="text-gray-600 mb-8">
            Explore {college.name} campus from anywhere. Take a 360° virtual tour of classrooms, labs, library, and more.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-600">
            Start Virtual Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Admissions Tab
function AdmissionsTab({ college }: { college: any }) {
  const [selectedRank, setSelectedRank] = useState('')
  const [chance, setChance] = useState(0)

  const calculateChance = useCallback(() => {
    if (!selectedRank) {
      setChance(0)
      return
    }
    const rank = parseInt(selectedRank.replace(/\D/g, ''))
    let chance = 0
    if (rank <= 50000) chance = 95
    else if (rank <= 100000) chance = 85
    else if (rank <= 150000) chance = 65
    else if (rank <= 200000) chance = 40
    else chance = 15
    setChance(chance)
  }, [selectedRank])

  useEffect(() => {
    calculateChance()
  }, [calculateChance])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="lg:col-span-7 space-y-8">
        {/* Eligibility */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
            <div className="space-y-3">
              {college.eligibility.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admission Timeline</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary"></div>
              <div className="space-y-6">
                {college.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 z-10">
                      {item.month}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-lg">{item.event}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cutoffs */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cutoffs (JEE Main Rank)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">Branch</th>
                    <th className="p-3 text-center font-semibold">General</th>
                    <th className="p-3 text-center font-semibold">OBC</th>
                    <th className="p-3 text-center font-semibold">SC</th>
                    <th className="p-3 text-center font-semibold">ST</th>
                  </tr>
                </thead>
                <tbody>
                  {college.cutoffs.map((cutoff: any, idx: number) => (
                    <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3 font-medium">{cutoff.branch}</td>
                      <td className="p-3 text-center">{cutoff.general}</td>
                      <td className="p-3 text-center">{cutoff.obc}</td>
                      <td className="p-3 text-center">{cutoff.sc}</td>
                      <td className="p-3 text-center">{cutoff.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Admission Chance Calculator */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Check Your Admission Chances</h2>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your JEE Main Rank</label>
                <input
                  type="text"
                  value={selectedRank}
                  onChange={(e) => {
                    setSelectedRank(e.target.value)
                    calculateChance()
                  }}
                  placeholder="e.g., 85,000"
                  className="w-full h-11 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {chance > 0 && (
                <div className="p-6 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Admission Chance</span>
                    <span className="text-3xl font-bold text-primary">{chance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-500 rounded-full"
                      style={{ width: `${chance}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Required Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {college.documents.map((doc: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scholarships */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Scholarships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.scholarships.map((scholar: any, idx: number) => (
                <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-bold mb-2">{scholar.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{scholar.description}</p>
                  <p className="text-lg font-bold text-primary">{scholar.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our admission counselors are here to help you with the application process.
            </p>
            <Button className="w-full bg-primary hover:bg-primary-600 mb-3">
              Talk to Counselor
            </Button>
            <Button variant="outline" className="w-full">
              Download Application Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Placements Tab
function PlacementsTab({ college }: { college: any }) {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600 mb-1">Highest Package</p>
            <p className="text-2xl font-bold">₹{college.highestPackage} LPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-600 mb-1">Average Package</p>
            <p className="text-2xl font-bold">₹{college.avgPackage} LPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-sm text-gray-600 mb-1">Placement Rate</p>
            <p className="text-2xl font-bold">{college.placementPercent}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600 mb-1">Companies</p>
            <p className="text-2xl font-bold">{college.companies}+</p>
          </CardContent>
        </Card>
      </div>

      {/* Branch-wise Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Branch-wise Placements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Branch</th>
                  <th className="p-3 text-center font-semibold">Avg Package</th>
                  <th className="p-3 text-center font-semibold">Highest</th>
                  <th className="p-3 text-center font-semibold">Placed</th>
                </tr>
              </thead>
              <tbody>
                {college.branchWisePlacements.map((branch: any, idx: number) => (
                  <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 font-medium">{branch.branch}</td>
                    <td className="p-3 text-center">₹{branch.avg} LPA</td>
                    <td className="p-3 text-center">₹{branch.highest} LPA</td>
                    <td className="p-3 text-center">{branch.placed}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Recruiters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {college.topRecruiters.map((company: string, idx: number) => (
              <div 
                key={idx} 
                className="h-20 bg-gray-100 rounded-lg flex items-center justify-center font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {college.successStories.map((story: any, idx: number) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary text-lg">{story.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.branch}</p>
                  </div>
                </div>
                <p className="font-bold text-lg text-primary mb-1">₹{story.package}</p>
                <p className="text-sm text-gray-600 mb-2">{story.company}</p>
                <p className="text-xs text-gray-500">Placed in {story.year}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Student Life Tab
function StudentLifeTab({ college }: { college: any }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Student Life</h2>
          <p className="text-gray-600">
            Comprehensive information about campus life, clubs, societies, events, and student activities coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Reviews Tab
function ReviewsTab({ college }: { college: any }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <Star className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Student Reviews</h2>
          <p className="text-gray-600">
            Read authentic reviews and experiences from current students and alumni coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Fees Tab
function FeesTab({ college }: { college: any }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <IndianRupee className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
          <p className="text-gray-600">
            Detailed fee structure and payment options coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

