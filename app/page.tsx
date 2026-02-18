'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, MapPin, TrendingUp, Award, GraduationCap,
  CheckCircle2, Star, Phone, Video, Shield, MessageSquare,
  PlayCircle, Eye, UserCheck, ChevronDown, X
} from 'lucide-react'
import { CollegeCard } from '@/components/common/CollegeCard'
import { INDIAN_STATES } from '@/lib/constants'

const branches = [
  'All Branches',
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'AI & Machine Learning',
  'AI & Data Science',
  'Electronics & Communication (ECE)',
  'Electrical Engineering (EE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Cyber Security',
  'Internet of Things (IoT)',
  'Automobile Engineering',
  'Biotechnology',
  'Chemical Engineering',
  'Other Branches'
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [rank, setRank] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('All Branches')
  const [branchSearchQuery, setBranchSearchQuery] = useState('')
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false)
  const branchDropdownRef = useRef<HTMLDivElement>(null)
  const [selectedState, setSelectedState] = useState('All India')
  const [stateSearchQuery, setStateSearchQuery] = useState('')
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false)
  const stateDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target
      if (!target || !(target instanceof Node)) {
        return
      }
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(target)) {
        setIsBranchDropdownOpen(false)
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(target)) {
        setIsStateDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter branches based on search query
  const filteredBranches = branches.filter(branch =>
    branch.toLowerCase().includes(branchSearchQuery.toLowerCase())
  )

  // Filter states based on search query
  const filteredStates = INDIAN_STATES.filter(state =>
    state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  )

  // Featured colleges mock data
  const featuredColleges = [
    {
      id: 'abes-it',
      name: 'ABES Institute of Technology',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 185,
      logo: '/images/logo.png',
      rating: 4.3,
      feeRange: '₹1.2L - ₹1.5L/year',
      highlight: true
    },
    {
      id: 'jss-academy',
      name: 'JSS Academy of Technical Education',
      city: 'Noida',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 198,
      logo: '/images/logo.png',
      rating: 4.2,
      feeRange: '₹1.1L - ₹1.4L/year'
    },
    {
      id: 'gl-bajaj',
      name: 'GL Bajaj Institute of Technology',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      category: 'Engineering',
      nirfRank: 205,
      logo: '/images/logo.png',
      rating: 4.1,
      feeRange: '₹1.0L - ₹1.3L/year'
    },
    {
      id: 'iiit-delhi',
      name: 'IIIT Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      category: 'Engineering',
      nirfRank: 56,
      logo: '/images/logo.png',
      rating: 4.5,
      feeRange: '₹80K - ₹1.5L/year'
    },
    {
      id: 'jmi',
      name: 'Jamia Millia Islamia',
      city: 'New Delhi',
      state: 'Delhi',
      category: 'Engineering',
      nirfRank: 17,
      logo: '/images/logo.png',
      rating: 4.2,
      feeRange: '₹50K - ₹80K/year'
    },
    {
      id: 'nsut',
      name: 'Netaji Subhas University of Technology',
      city: 'New Delhi',
      state: 'Delhi',
      category: 'Engineering',
      nirfRank: 42,
      logo: '/images/logo.png',
      rating: 4.4,
      feeRange: '₹60K - ₹1.0L/year'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Secure College",
            "url": "https://securecollege.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://securecollege.in/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
        {/* Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
        </div>

        {/* Page content above particles */}
        <div className="relative z-10">
        {/* Section 1: HERO - no section background so particles + global gradient show through like other sections */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
        >
          <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h1
                className="text-5xl font-bold tracking-tight text-white md:text-6xl"
                style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
              >
                Find your <span className="text-[#5B8DEF]">Dream College</span> with trusted guidance
              </h1>
              <p className="mt-6 text-lg text-gray-300 md:text-xl">
                Verified placements, transparent insights, and personalized support for every admission milestone.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {[
                  '100% Free for Students',
                  '37+ Partner Colleges',
                  '10,000+ Students Helped'
                ].map((badge) => (
                  <span key={badge} className="rounded-full bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/20 px-6 py-3 text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <Card className="mx-auto max-w-5xl overflow-visible rounded-2xl border border-white/5 bg-[#121212] transition-shadow hover:shadow-primary-glow">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center">
                    <h2
                      className="text-2xl font-bold text-white sm:text-3xl"
                      style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                    >
                      Rank-based Quick Finder
                    </h2>
                    <p className="mt-2 mb-6 text-[#A1A1AA]">
                      Tailored college recommendations based on your rank and preferences.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your Rank</label>
                      <Input
                        type="number"
                        min={1}
                        max={999999}
                        placeholder="Enter JEE rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        onInput={(e) => {
                          const target = e.currentTarget
                          if (Number(target.value) < 1) {
                            target.value = '1'
                          }
                        }}
                        className="h-12 border-white/20 bg-white/50 backdrop-blur-sm focus:ring-primary dark:bg-slate-900/50"
                      />
                    </div>
                    <div className="relative z-50 space-y-2" ref={branchDropdownRef}>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Branch</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsBranchDropdownOpen(!isBranchDropdownOpen)
                            setBranchSearchQuery('')
                          }}
                          className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-white/50 px-3 text-sm text-slate-900 shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900/50 dark:text-white"
                        >
                          <span className="truncate font-medium">{selectedBranch}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isBranchDropdownOpen && (
                          <div className="absolute z-50 mt-2 w-full max-h-[300px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-white shadow-2xl backdrop-blur-xl dark:bg-slate-900 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
                            <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 p-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" />
                                <Input
                                  type="text"
                                  placeholder="Search branches..."
                                  value={branchSearchQuery}
                                  onChange={(e) => setBranchSearchQuery(e.target.value)}
                                  className="h-9 pl-8 text-sm bg-transparent"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {branchSearchQuery && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setBranchSearchQuery('')
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-slate-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="py-1">
                              {filteredBranches.length > 0 ? (
                                filteredBranches.map((branch) => (
                                  <button
                                    key={branch}
                                    type="button"
                                    onClick={() => {
                                      setSelectedBranch(branch)
                                      setIsBranchDropdownOpen(false)
                                      setBranchSearchQuery('')
                                    }}
                                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                      selectedBranch === branch
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                                    }`}
                                  >
                                    {branch}
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-3 text-sm text-[#A1A1AA]">No branches found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative z-50 space-y-2" ref={stateDropdownRef}>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">State</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsStateDropdownOpen(!isStateDropdownOpen)
                            setStateSearchQuery('')
                          }}
                          className="flex h-12 w-full items-center justify-between rounded-md border border-white/20 bg-white/50 px-3 text-sm text-slate-900 shadow-sm backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900/50 dark:text-white"
                        >
                          <span className="flex items-center gap-2 truncate font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            {selectedState || 'Select State/Region'}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isStateDropdownOpen && (
                          <div className="absolute z-50 mt-2 w-full max-h-[300px] overflow-y-auto overflow-x-hidden rounded-xl border border-white/20 bg-white shadow-2xl backdrop-blur-xl dark:bg-slate-900 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
                            <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 p-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" />
                                <Input
                                  type="text"
                                  placeholder="Search states..."
                                  value={stateSearchQuery}
                                  onChange={(e) => setStateSearchQuery(e.target.value)}
                                  className="h-9 pl-8 text-sm bg-transparent"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {stateSearchQuery && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setStateSearchQuery('')
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-slate-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="py-1">
                              {filteredStates.length > 0 ? (
                                filteredStates.map((state) => (
                                  <button
                                    key={state}
                                    type="button"
                                    onClick={() => {
                                      setSelectedState(state)
                                      setIsStateDropdownOpen(false)
                                      setStateSearchQuery('')
                                    }}
                                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                                      selectedState === state
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                                    }`}
                                  >
                                    <MapPin className="h-4 w-4 opacity-50" />
                                    {state}
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-3 text-sm text-[#A1A1AA]">No states found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex justify-center"
                    >
                      <Button
                        size="xl"
                        className="w-full max-w-md h-14 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-lg font-semibold shadow-xl hover:shadow-xl"
                      >
                        Find My College
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>


        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-semibold text-white sm:text-4xl"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                A premium guidance suite for every step
              </h2>
              <p className="mt-4 text-base text-[#A1A1AA]">
                Unlock verified insights, expert support, and immersive campus experiences tailored to your goals.
              </p>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { title: '360° Virtual Tours', description: 'Explore campuses with immersive walkthroughs.', icon: <Video className="h-6 w-6" /> },
                { title: 'Insider Reviews', description: 'Real student insights on placements and campus life.', icon: <MessageSquare className="h-6 w-6" /> },
                { title: 'Rank-Based Matching', description: 'Shortlists curated by your rank and preferences.', icon: <TrendingUp className="h-6 w-6" /> },
                { title: 'Scholarship Assistance', description: 'Guidance on funding and fee waivers.', icon: <Award className="h-6 w-6" /> },
                { title: '1:1 Counseling', description: 'Dedicated advisors for every admission milestone.', icon: <UserCheck className="h-6 w-6" /> },
                { title: 'Post-Admission Mentorship', description: 'Support that continues after you join.', icon: <Shield className="h-6 w-6" /> },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm text-[#A1A1AA]">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
              <div>
                <h2
                  className="text-3xl font-semibold text-white"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Featured colleges
                </h2>
                <p className="mt-2 text-base text-[#A1A1AA]">
                  Handpicked institutions with standout placements and student outcomes.
                </p>
              </div>
              <Button asChild size="lg" variant="outline" className="border-white/5 bg-[#121212] text-white hover:bg-white/5">
                <Link href="/colleges">View all colleges</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredColleges.map((college, idx) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <CollegeCard 
                    college={college} 
                    className="border border-white/5 bg-[#121212] transition-shadow hover:shadow-primary-glow"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                How it works
              </h2>
              <p className="mt-3 text-base text-[#A1A1AA]">
                Simple steps to move from shortlist to admission.
              </p>
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: 'Enter your rank', description: 'Share rank, branch, budget, and state preferences.', icon: <Search className="h-6 w-6" /> },
                { title: 'Compare colleges', description: 'Review placements, fees, and verified student insights.', icon: <Eye className="h-6 w-6" /> },
                { title: 'Get guided admission', description: 'Work with counselors to finalize your applications.', icon: <UserCheck className="h-6 w-6" /> },
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-white/5 bg-[#121212] transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-[#A1A1AA]">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Loved by ambitious students</h2>
              <p className="mt-3 text-base text-white/70">Stories from students who secured their ideal college.</p>
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: 'Rahul Sharma',
                  college: 'IIIT Delhi',
                  text: 'Secure College helped me find the perfect engineering college. The detailed placement data and student reviews made my decision easy!',
                  rating: 5
                },
                {
                  name: 'Priya Patel',
                  college: 'NSUT',
                  text: 'The virtual tour feature is amazing! I could explore multiple colleges without leaving home. Highly recommend!',
                  rating: 5
                },
                {
                  name: 'Amit Kumar',
                  college: 'ABES IT',
                  text: 'Best platform for college search. All information in one place, verified data, and completely free. What more do you need?',
                  rating: 5
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-white/5 bg-[#121212] text-white transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-white/80">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="mt-6 border-t border-white/5 pt-4">
                        <p className="text-base font-semibold text-white">{testimonial.name}</p>
                        <p className="text-xs text-white/60">{testimonial.college}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border border-white/5 bg-[#121212] transition-shadow hover:shadow-primary-glow">
                <CardContent className="flex flex-col items-start justify-between gap-8 p-10 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      Ready to start your SecureCollege journey?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                      Use the quick finder or book a counseling session to get personalized guidance.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="xl" asChild className="w-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:w-auto">
                        <Link href="/colleges">
                          <Search className="mr-2 h-5 w-5" />
                          Start Quick Finder
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="xl" variant="outline" asChild className="w-full border-slate-300 bg-white/70 text-slate-900 hover:bg-white dark:border-white/20 dark:bg-slate-900/40 dark:text-white sm:w-auto">
                        <Link href="/counselor">
                          <Phone className="mr-2 h-5 w-5" />
                          Book Counseling
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        </div>
      </div>
    </>
  )
}
