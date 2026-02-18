'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  ChevronDown, ChevronUp, X, MapPin, GraduationCap, TrendingUp, Shield, 
  Award, Filter, Building, Wifi, Video, Home, IndianRupee
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

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  activeFiltersCount: number
}

const STATES = ['Uttar Pradesh', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat']
const CITIES = ['Ghaziabad', 'Noida', 'Delhi', 'Greater Noida', 'Mumbai', 'Pune', 'Bangalore']
const BRANCHES = ['Computer Science', 'Electronics', 'Mechanical', 'Information Technology', 'Civil', 'Electrical', 'Chemical']
const AFFILIATIONS = ['AKTU', 'IPU', 'RTU', 'GGSIPU', 'VTU']
const ACCREDITATIONS = ['NAAC', 'NBA', 'AICTE']
const FACILITIES = ['Hostel', 'Virtual Tour', 'Wi-Fi', 'Library', 'Sports', 'Cafeteria', 'Gym', 'Medical']
const SPECIAL = ['Scholarship Available', 'Loan Assistance', '100% Placement', 'Campus Interview']

export function FilterSidebar({ filters, onChange, activeFiltersCount }: FilterSidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(['location', 'branch'])

  const toggleExpanded = (section: string) => {
    setExpanded(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onChange({ ...filters, [key]: value })
  }

  const removeLocation = (item: string) => {
    updateFilter('location', filters.location.filter(l => l !== item))
  }

  const removeBranch = (branch: string) => {
    updateFilter('branch', filters.branch.filter(b => b !== branch))
  }

  const removeAffiliation = (aff: string) => {
    updateFilter('affiliation', filters.affiliation.filter(a => a !== aff))
  }

  const removeAccreditation = (acc: string) => {
    updateFilter('accreditation', filters.accreditation.filter(a => a !== acc))
  }

  const removeFacility = (fac: string) => {
    updateFilter('facilities', filters.facilities.filter(f => f !== fac))
  }

  const removeSpecial = (spec: string) => {
    updateFilter('special', filters.special.filter(s => s !== spec))
  }

  const clearAllFilters = () => {
    onChange({
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
  }

  const FilterSection = ({
    title,
    section,
    children
  }: {
    title: string
    section: string
    children: React.ReactNode
  }) => (
    <Collapsible open={expanded.includes(section)}>
      <CollapsibleTrigger
        className="flex items-start justify-between w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/10"
        onClick={() => toggleExpanded(section)}
      >
        <span className="font-semibold text-sm text-white">{title}</span>
        {expanded.includes(section) ? (
          <ChevronUp className="w-4 h-4 text-[#A1A1AA] mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#A1A1AA] mt-0.5" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <aside className="w-full lg:w-80 space-y-4">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Active Filters ({activeFiltersCount})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-7"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.location.map(loc => (
                <Badge key={loc} variant="secondary" className="flex items-center gap-1 pr-1">
                  <MapPin className="w-3 h-3" />
                  {loc}
                  <button onClick={() => removeLocation(loc)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.branch.map(br => (
                <Badge key={br} variant="secondary" className="flex items-center gap-1 pr-1">
                  <GraduationCap className="w-3 h-3" />
                  {br}
                  <button onClick={() => removeBranch(br)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.affiliation.map(aff => (
                <Badge key={aff} variant="secondary" className="flex items-center gap-1 pr-1">
                  {aff}
                  <button onClick={() => removeAffiliation(aff)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.accreditation.map(acc => (
                <Badge key={acc} variant="secondary" className="flex items-center gap-1 pr-1">
                  {acc}
                  <button onClick={() => removeAccreditation(acc)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.facilities.map(fac => (
                <Badge key={fac} variant="secondary" className="flex items-center gap-1 pr-1">
                  {fac}
                  <button onClick={() => removeFacility(fac)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.special.map(spec => (
                <Badge key={spec} variant="secondary" className="flex items-center gap-1 pr-1">
                  {spec}
                  <button onClick={() => removeSpecial(spec)} className="hover:bg-gray-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Options */}
      <Card>
        <CardContent className="p-0">
          {/* Location */}
          <FilterSection title="Location" section="location">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">State</p>
                <div className="space-y-2">
                  {STATES.map(state => (
                    <label key={state} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(state)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter('location', [...filters.location, state])
                          } else {
                            removeLocation(state)
                          }
                        }}
                        className="w-4 h-4 text-primary rounded border-gray-300"
                      />
                      <span>{state}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">City</p>
                <div className="space-y-2">
                  {CITIES.map(city => (
                    <label key={city} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(city)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter('location', [...filters.location, city])
                          } else {
                            removeLocation(city)
                          }
                        }}
                        className="w-4 h-4 text-primary rounded border-gray-300"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Rank Range */}
          <FilterSection title="JEE Rank Range" section="rank">
            <div className="space-y-3">
              <div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={filters.rankRange[1]}
                  onChange={(e) => updateFilter('rankRange', [filters.rankRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>{filters.rankRange[0].toLocaleString()}</span>
                  <span>{filters.rankRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Branch */}
          <FilterSection title="Branch" section="branch">
            <div className="space-y-2">
              {BRANCHES.map(branch => (
                <label key={branch} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.branch.includes(branch)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFilter('branch', [...filters.branch, branch])
                      } else {
                        removeBranch(branch)
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300"
                  />
                  <span>{branch}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Fees Range */}
          <FilterSection title="Annual Fees" section="fees">
            <div className="space-y-3">
              <div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="50000"
                  value={filters.feesRange[1]}
                  onChange={(e) => updateFilter('feesRange', [filters.feesRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>₹{(filters.feesRange[0] / 1000).toFixed(0)}K</span>
                  <span>₹{(filters.feesRange[1] / 100000).toFixed(1)}L</span>
                </div>
              </div>
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Placements */}
          <FilterSection title="Placements" section="placement">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Min Avg Package (LPA)
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={filters.placement.minPackage}
                  onChange={(e) => updateFilter('placement', { 
                    ...filters.placement, 
                    minPackage: Number(e.target.value) 
                  })}
                  className="w-full"
                />
                <div className="text-xs text-gray-600 mt-1 text-center">
                  {filters.placement.minPackage} LPA
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Min Placement %
                </label>
                <div className="flex gap-2">
                  {['Any', '50%', '70%', '90%'].map(opt => (
                    <label key={opt} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="placement-percent"
                        checked={(opt === 'Any' && filters.placement.minPercent === 0) || 
                                  (opt === '50%' && filters.placement.minPercent === 50) ||
                                  (opt === '70%' && filters.placement.minPercent === 70) ||
                                  (opt === '90%' && filters.placement.minPercent === 90)}
                        onChange={() => updateFilter('placement', { 
                          ...filters.placement, 
                          minPercent: opt === 'Any' ? 0 : Number(opt.replace('%', ''))
                        })}
                        className="sr-only"
                      />
                      <div className={cn(
                        "text-center py-2 px-2 rounded-md text-xs transition-colors",
                        ((opt === 'Any' && filters.placement.minPercent === 0) || 
                         (opt === '50%' && filters.placement.minPercent === 50) ||
                         (opt === '70%' && filters.placement.minPercent === 70) ||
                         (opt === '90%' && filters.placement.minPercent === 90))
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}>
                        {opt}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Rating */}
          <FilterSection title="Rating" section="rating">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Minimum Rating
                </label>
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => updateFilter('rating', { 
                        ...filters.rating, 
                        min: star 
                      })}
                      className={cn(
                        "text-2xl transition-transform hover:scale-110",
                        star <= filters.rating.min ? "text-yellow-400" : "text-gray-300"
                      )}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">
                  {filters.rating.min > 0 ? `${filters.rating.min}+ stars` : 'Any rating'}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Min Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.rating.minReviews}
                  onChange={(e) => updateFilter('rating', { 
                    ...filters.rating, 
                    minReviews: Number(e.target.value) 
                  })}
                  className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Affiliation */}
          <FilterSection title="Affiliation" section="affiliation">
            <div className="space-y-2">
              {AFFILIATIONS.map(aff => (
                <label key={aff} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.affiliation.includes(aff)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFilter('affiliation', [...filters.affiliation, aff])
                      } else {
                        removeAffiliation(aff)
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300"
                  />
                  <span>{aff}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Accreditation */}
          <FilterSection title="Accreditation" section="accreditation">
            <div className="space-y-2">
              {ACCREDITATIONS.map(acc => (
                <label key={acc} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.accreditation.includes(acc)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFilter('accreditation', [...filters.accreditation, acc])
                      } else {
                        removeAccreditation(acc)
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300"
                  />
                  <span>{acc}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Facilities */}
          <FilterSection title="Facilities" section="facilities">
            <div className="space-y-2">
              {FACILITIES.map(fac => (
                <label key={fac} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.facilities.includes(fac)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFilter('facilities', [...filters.facilities, fac])
                      } else {
                        removeFacility(fac)
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300"
                  />
                  <span>{fac}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <div className="border-t border-gray-200" />

          {/* Special */}
          <FilterSection title="Special Features" section="special">
            <div className="space-y-2">
              {SPECIAL.map(spec => (
                <label key={spec} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.special.includes(spec)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFilter('special', [...filters.special, spec])
                      } else {
                        removeSpecial(spec)
                      }
                    }}
                    className="w-4 h-4 text-primary rounded border-gray-300"
                  />
                  <span>{spec}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </CardContent>
      </Card>
    </aside>
  )
}

