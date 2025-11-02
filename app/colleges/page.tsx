'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CollegeCard } from '@/components/common/CollegeCard'
import { FilterSidebar } from '@/components/common/FilterSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, Grid, List, ChevronRight, Building2, GraduationCap, TrendingUp, Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterState {
  location: string[]
  rankRange: [number, number]
  branch: string[]
  feesRange: [number, number]
  placement: { minPackage: number; minPercent: number }
  rating: { min: number; minReviews: number }
  affiliation: string[]
  accreditation: string[]
  facilities: string[]
  special: string[]
}

// Extended mock data with more colleges
const mockColleges = [
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
  },
  {
    id: 'dtu',
    name: 'Delhi Technological University',
    city: 'New Delhi',
    state: 'Delhi',
    category: 'Engineering',
    nirfRank: 39,
    logo: '/images/logo.png',
    rating: 4.3,
    feeRange: '₹70K - ₹1.2L/year'
  },
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    category: 'Engineering',
    nirfRank: 2,
    logo: '/images/logo.png',
    rating: 4.7,
    feeRange: '₹2L - ₹2.5L/year',
    highlight: true
  },
  {
    id: 'nit-delhi',
    name: 'NIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    category: 'Engineering',
    nirfRank: 67,
    logo: '/images/logo.png',
    rating: 4.1,
    feeRange: '₹1L - ₹1.5L/year'
  },
  {
    id: 'ggsipu',
    name: 'GGSIPU East Campus',
    city: 'New Delhi',
    state: 'Delhi',
    category: 'Engineering',
    nirfRank: 120,
    logo: '/images/logo.png',
    rating: 3.9,
    feeRange: '₹90K - ₹1.3L/year'
  },
  {
    id: 'integral',
    name: 'Integral University',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    category: 'Engineering',
    nirfRank: 235,
    logo: '/images/logo.png',
    rating: 3.8,
    feeRange: '₹1.5L - ₹2L/year'
  },
  {
    id: 'kiet',
    name: 'KIET Group of Institutions',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    category: 'Engineering',
    nirfRank: 198,
    logo: '/images/logo.png',
    rating: 4.0,
    feeRange: '₹1.3L - ₹1.8L/year'
  },
  {
    id: 'akgec',
    name: 'AKG Engineering College',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    category: 'Engineering',
    nirfRank: 215,
    logo: '/images/logo.png',
    rating: 3.9,
    feeRange: '₹1.1L - ₹1.5L/year'
  },
  {
    id: 'hbtu',
    name: 'HBTU Kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    category: 'Engineering',
    nirfRank: 145,
    logo: '/images/logo.png',
    rating: 4.1,
    feeRange: '₹80K - ₹1.2L/year'
  },
  {
    id: 'jnu',
    name: 'Jawaharlal Nehru University',
    city: 'New Delhi',
    state: 'Delhi',
    category: 'Engineering',
    nirfRank: 10,
    logo: '/images/logo.png',
    rating: 4.5,
    feeRange: '₹15K - ₹30K/year'
  }
]

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    location: [],
    rankRange: [1000, 200000],
    branch: [],
    feesRange: [50000, 500000],
    placement: { minPackage: 0, minPercent: 0 },
    rating: { min: 0, minReviews: 0 },
    affiliation: [],
    accreditation: [],
    facilities: [],
    special: []
  })

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.location.length > 0) count += filters.location.length
    if (filters.branch.length > 0) count += filters.branch.length
    if (filters.affiliation.length > 0) count += filters.affiliation.length
    if (filters.accreditation.length > 0) count += filters.accreditation.length
    if (filters.facilities.length > 0) count += filters.facilities.length
    if (filters.special.length > 0) count += filters.special.length
    if (filters.rating.min > 0) count += 1
    if (filters.placement.minPackage > 0) count += 1
    if (filters.placement.minPercent > 0) count += 1
    return count
  }, [filters])

  // Filter colleges based on current filters
  const filteredColleges = useMemo(() => {
    return mockColleges.filter(college => {
      // Search query filter
      if (searchQuery && !college.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Location filter
      if (filters.location.length > 0) {
        const matches = filters.location.some(loc => 
          college.city === loc || college.state === loc
        )
        if (!matches) return false
      }

      // Branch filter
      if (filters.branch.length > 0 && !filters.branch.includes(college.category)) {
        return false
      }

      // Rating filter
      if (filters.rating.min > 0 && college.rating < filters.rating.min) {
        return false
      }

      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchQuery])

  // Sort colleges
  const sortedColleges = useMemo(() => {
    const sorted = [...filteredColleges]
    switch (sortBy) {
      case 'highest-rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'lowest-fees':
        return sorted.sort((a, b) => {
          const aNum = parseInt(a.feeRange.replace(/[^0-9]/g, ''))
          const bNum = parseInt(b.feeRange.replace(/[^0-9]/g, ''))
          return aNum - bNum
        })
      case 'nirf-rank':
        return sorted.sort((a, b) => (a.nirfRank || 9999) - (b.nirfRank || 9999))
      default:
        return sorted
    }
  }, [filteredColleges, sortBy])

  // Pagination
  const itemsPerPage = 12
  const totalPages = Math.ceil(sortedColleges.length / itemsPerPage)
  const paginatedColleges = sortedColleges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle scroll to show/hide header content
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Engineering Colleges in India",
            "description": "Browse and filter 5000+ engineering colleges across India",
            "url": "https://securecollege.in/colleges"
          })
        }}
      />

      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumbs */}
            <div className={`flex items-center gap-2 text-sm text-gray-600 mb-4 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Colleges</span>
            </div>

            {/* Title and Stats */}
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 transition-all duration-300 ${isScrolled ? 'hidden' : 'flex'}`}>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Engineering Colleges in India
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {sortedColleges.length} Colleges Found
                  </span>
                  <span>•</span>
                  <span>Verified Data</span>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search colleges by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-fees">Lowest Fees</option>
                <option value="nirf-rank">NIRF Rank</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : paginatedColleges.length > 0 ? (
                <>
                  <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' 
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                      : "grid-cols-1"
                  )}>
                    {paginatedColleges.map((college, idx) => (
                      <motion.div
                        key={college.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                      >
                        <CollegeCard college={college} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={page === currentPage ? "default" : "outline"}
                              onClick={() => handlePageChange(page)}
                              className={page === currentPage ? "bg-primary" : ""}
                            >
                              {page}
                            </Button>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2">...</span>
                        }
                        return null
                      })}
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No colleges found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    onClick={() => {
                      setFilters({
                        location: [],
                        rankRange: [1000, 200000],
                        branch: [],
                        feesRange: [50000, 500000],
                        placement: { minPackage: 0, minPercent: 0 },
                        rating: { min: 0, minReviews: 0 },
                        affiliation: [],
                        accreditation: [],
                        facilities: [],
                        special: []
                      })
                      setSearchQuery('')
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

