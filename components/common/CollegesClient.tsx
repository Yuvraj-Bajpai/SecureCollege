'use client'

import { useState, useMemo } from 'react'
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

interface SortOption {
  value: string
  label: string
}

interface Props {
  initialColleges: CollegeCardData[]
  heading?: string
  breadcrumbLabel?: string
  sortOptions?: SortOption[]
  defaultSort?: string
  profileBasePath?: string
  footerLabel?: string
  stickySidebar?: boolean
}

const defaultSortOptions: SortOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'highest-rating', label: 'Highest Rating' },
  { value: 'lowest-fees', label: 'Lowest Fees' },
  { value: 'nirf-rank', label: 'NIRF Rank' }
]

export function CollegesClient({ 
  initialColleges, 
  heading = 'Private Colleges in India',
  breadcrumbLabel = 'Colleges',
  sortOptions,
  defaultSort,
  profileBasePath = '/colleges',
  footerLabel = 'View Details',
  stickySidebar = false
}: Props) {
  const resolvedSortOptions = sortOptions && sortOptions.length > 0 ? sortOptions : defaultSortOptions
  const initialSort = defaultSort || resolvedSortOptions[0]?.value || 'relevance'
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState(initialSort)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
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
      case 'highest-placement':
        return sorted.sort((a, b) => {
          const aNum = a.placementPercent ? parseFloat(a.placementPercent.replace(/[^0-9.]/g, '')) : 0
          const bNum = b.placementPercent ? parseFloat(b.placementPercent.replace(/[^0-9.]/g, '')) : 0
          return bNum - aNum
        })
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
    <div className="min-h-screen pb-16">
      <div className="sticky top-16 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{breadcrumbLabel}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1
                className="text-3xl lg:text-4xl font-bold text-white mb-2"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                {heading}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
              <Input
                type="text"
                placeholder="Search colleges by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/15 text-white placeholder:text-[#A1A1AA] backdrop-blur-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-full border border-white/15 bg-white/5 text-sm text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {resolvedSortOptions.map((option) => (
                <option key={option.value} className="text-slate-900" value={option.value}>
                  Sort: {option.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'text-[#A1A1AA] hover:bg-white/10'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'text-[#A1A1AA] hover:bg-white/10'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-14 pb-16">
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row gap-8">
          <aside className={cn(
            "w-full lg:w-80 flex-shrink-0",
            stickySidebar ? "lg:sticky lg:top-28 h-fit" : ""
          )}>
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
                  <div key={i} className="h-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />
                ))}
              </div>
            ) : paginatedColleges.length > 0 ? (
              <>
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === 'grid'
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {paginatedColleges.map((college, idx) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <CollegeCard 
                        college={college} 
                        hrefBase={profileBasePath}
                        footerLabel={footerLabel}
                      />
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
                <Building2 className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No colleges found
                </h3>
                <p className="text-[#A1A1AA] mb-6">
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
