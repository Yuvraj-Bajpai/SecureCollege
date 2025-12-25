'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, GraduationCap, Users, MapPin, TrendingUp, Award, BookOpen, Building2, 
  CheckCircle2, Sparkles, Star, Phone, Video, Shield, Globe, MessageSquare,
  PlayCircle, Filter, Eye, UserCheck, Heart, ChevronDown, X
} from 'lucide-react'
import { CollegeCard } from '@/components/common/CollegeCard'
import { StatCard } from '@/components/common/StatCard'
import { INDIAN_STATES } from '@/lib/constants'
import CollegesSection from '@/components/common/CollegesSection'

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
  const [budget, setBudget] = useState(100000)
  const [selectedBranch, setSelectedBranch] = useState('All Branches')
  const [branchSearchQuery, setBranchSearchQuery] = useState('')
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false)
  const branchDropdownRef = useRef<HTMLDivElement>(null)
  const [selectedState, setSelectedState] = useState('All India')
  const [stateSearchQuery, setStateSearchQuery] = useState('')
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false)
  const stateDropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Ensure elements are always visible - use Framer Motion only for smooth animations
    // No GSAP that might hide elements
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(event.target as Node)) {
        setIsBranchDropdownOpen(false)
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
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
      {/* JSON-LD Schema for SEO */}
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

      <div className="min-h-screen">
        {/* Section 1: HERO */}
        <section 
          ref={heroRef}
          className="relative bg-blue-50 dark:bg-gray-900 py-16 lg:py-24 overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-6000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center" data-animate>
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900 dark:text-white"
              >
                Find Your Perfect <span className="text-gradient-primary bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Engineering College</span> in India
              </motion.h1>
              <motion.p 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero-subtitle text-xl lg:text-2xl text-gray-800 dark:text-gray-200 mb-8 max-w-3xl mx-auto"
              >
                Compare 5000+ colleges, get real student reviews, and make the best choice for your career
              </motion.p>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="hero-badges flex flex-wrap justify-center gap-4 mb-10"
              >
                <Badge variant="outline" className="text-sm py-2.5 px-5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600 shadow-lg backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  100% Free
                </Badge>
                <Badge variant="outline" className="text-sm py-2.5 px-5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-600 shadow-lg backdrop-blur-sm">
                  <Users className="w-4 h-4 mr-2" />
                  10K+ Helped
                </Badge>
                <Badge variant="outline" className="text-sm py-2.5 px-5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-600 shadow-lg backdrop-blur-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Verified Data
                </Badge>
              </motion.div>

              {/* Search Card */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hero-search max-w-4xl mx-auto shadow-2xl border border-border/50 bg-background/90 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">Your Rank</label>
                      <Input 
                        type="number" 
                        placeholder="Enter JEE rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="relative" ref={branchDropdownRef}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">Branch</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsBranchDropdownOpen(!isBranchDropdownOpen)
                            setBranchSearchQuery('')
                          }}
                          className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
                        >
                          <span className="truncate">{selectedBranch}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isBranchDropdownOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-96 overflow-hidden">
                            {/* Search Input */}
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type="text"
                                  placeholder="Search branches..."
                                  value={branchSearchQuery}
                                  onChange={(e) => setBranchSearchQuery(e.target.value)}
                                  className="pl-8 h-8 text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {branchSearchQuery && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setBranchSearchQuery('')
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Options List */}
                            <div className="py-1 max-h-80 overflow-y-auto">
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
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                                      selectedBranch === branch
                                        ? 'bg-blue-100 dark:bg-blue-900 text-primary font-medium'
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`}
                                  >
                                    {branch}
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                  No branches found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative" ref={stateDropdownRef}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">State</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsStateDropdownOpen(!isStateDropdownOpen)
                            setStateSearchQuery('')
                          }}
                          className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
                        >
                          <span className="truncate flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            {selectedState || "Select State/Region"}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isStateDropdownOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-96 overflow-hidden">
                            {/* Search Input */}
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type="text"
                                  placeholder="Search states..."
                                  value={stateSearchQuery}
                                  onChange={(e) => setStateSearchQuery(e.target.value)}
                                  className="pl-8 h-8 text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {stateSearchQuery && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setStateSearchQuery('')
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Options List */}
                            <div className="py-1 max-h-80 overflow-y-auto">
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
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                                      selectedState === state
                                        ? 'bg-blue-100 dark:bg-blue-900 text-primary font-medium'
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`}
                                  >
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    {state}
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                  No states found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">
                        Budget: ₹{budget.toLocaleString('en-IN')}
                      </label>
                      <input 
                        type="range" 
                        min="50000" 
                        max="500000" 
                        step="50000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white py-6 shadow-xl hover:shadow-2xl transition-all">
                    <Search className="w-5 h-5 mr-2" />
                    Find My Perfect College
                  </Button>
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: FEATURED COLLEGES */}
        <CollegesSection />

        {/* Section 3: HOW IT WORKS */}
        <section className="py-16 bg-blue-50 dark:bg-gray-900" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Find your dream college in three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { number: '1', title: 'Search & Filter', description: 'Enter your rank, branch, and budget to find matching colleges', icon: <Search className="w-8 h-8" /> },
                { number: '2', title: 'Explore Insights', description: 'Compare colleges with detailed data on fees, placements, and reviews', icon: <Eye className="w-8 h-8" /> },
                { number: '3', title: 'Expert Guidance', description: 'Get personalized counseling to make the right choice', icon: <UserCheck className="w-8 h-8" /> },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="border-0 shadow-md text-center card-hover">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center text-white shadow-lg">
                        <span className="text-3xl font-bold">{step.number}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: WHY CHOOSE US */}
        <section className="py-16 bg-blue-50 dark:bg-gray-900" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Choose Secure College?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: '100% Free for Students', description: 'No hidden charges, no premium fees. Everything is free forever.', icon: <Heart className="w-6 h-6" /> },
                { title: 'Verified Student Reviews', description: 'Read authentic reviews from real students and alumni', icon: <CheckCircle2 className="w-6 h-6" /> },
                { title: 'Virtual Campus Tours', description: 'Explore college campuses from your home with 360° tours', icon: <Video className="w-6 h-6" /> },
                { title: 'End-to-End Support', description: 'Get help from application to admission process', icon: <MessageSquare className="w-6 h-6" /> },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <Card className="border-gray-200 card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-primary flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: TESTIMONIALS */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Loved by Thousands of Students
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-0 bg-background/10 backdrop-blur-sm card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white/90 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="border-t border-white/20 pt-4">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/80">{testimonial.college}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: POPULAR SEARCHES */}
        <section className="py-16 bg-blue-50 dark:bg-gray-900" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Popular Searches
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                'Top AKTU Colleges',
                'CSE Colleges Delhi',
                'Under 5L Fees',
                'Best Placement Colleges',
                'NIRF Ranked',
                'Private Engineering Colleges UP',
                'Lowest Fees Colleges',
                'Highest Package Colleges',
                'Top B.Tech Colleges Noida',
                'Mechanical Engineering Delhi',
                'Computer Science Colleges',
                'Colleges Near Me'
              ].map((search, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="outline" 
                    className="text-sm py-3 px-5 cursor-pointer bg-white dark:bg-blue-900 border-gray-300 dark:border-blue-800 text-gray-900 dark:text-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all shadow-sm"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {search}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: FINAL CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden" data-animate>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Ready to Find Your Dream College?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of students who are making informed decisions about their future.
                Start your college search journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-background text-primary hover:bg-gray-100 dark:hover:bg-gray-800 text-base px-8 py-6">
                  <Link href="/colleges">Start Search</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-2 border-background text-background hover:bg-background/10 text-base px-8 py-6">
                  <Link href="/counselor">
                    <Phone className="w-5 h-5 mr-2" />
                    Talk to Counselor
                  </Link>
                </Button>
              </div>
              
              {/* Trust Signals */}
              <div className="mt-8 flex items-center justify-center gap-6 text-white/90 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
