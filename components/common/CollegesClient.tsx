'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CollegeCard, type CollegeCardData } from '@/components/common/CollegeCard'
import { FilterSidebar } from '@/components/common/FilterSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, Grid, List, ChevronRight, Building2
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

interface Props {
  initialColleges: CollegeCardData[]
}

export function CollegesClient({ initialColleges }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [colleges, setColleges] = useState<CollegeCardData[]>(initialColleges || [])

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      if (searchQuery && !college.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (filters.location.length > 0) {
        const matches = filters.location.some(loc => 
          college.city === loc || college.state === loc
        )
        if (!matches) return false
      }
      if (filters.branch.length > 0 && !filters.branch.includes(college.category)) {
        return false
      }
      if (filters.rating.min > 0 && college.rating < filters.rating.min) {
        return false
      }
      return true
    })
  }, [filters, searchQuery, colleges])

  const sortedColleges = useMemo(() => {
    const sorted = [...filteredColleges]
    switch (sortBy) {
      case 'highest-rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'lowest-fees':
        return sorted.sort((a, b) => {
          const aNum = a.feeRange ? parseInt(a.feeRange.replace(/[^0-9]/g, '')) : Number.POSITIVE_INFINITY
          const bNum = b.feeRange ? parseInt(b.feeRange.replace(/[^0-9]/g, '')) : Number.POSITIVE_INFINITY
          return aNum - bNum
        })
      case 'nirf-rank':
        return sorted.sort((a, b) => (a.nirfRank || 9999) - (b.nirfRank || 9999))
      default:
        return sorted
    }
  }, [filteredColleges, sortBy])

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

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className={`flex items-center gap-2 text-sm text-gray-600 mb-4 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Colleges</span>
          </div>
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
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </aside>
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
  )
}

