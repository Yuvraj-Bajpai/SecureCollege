'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarRating } from './StarRating'
import { MapPin, GraduationCap, TrendingUp, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CollegeCardData {
  id: string
  name: string
  city: string
  state: string
  category?: string
  naacGrade?: string
  nirfRank?: number
  logo: string
  rating: number
  feeRange?: string
  placementPercent?: string
  averagePackage?: string
  highestPackage?: string
  description?: string
  topCourses?: string[]
  highlight?: boolean
}

interface CollegeCardProps {
  college: CollegeCardData
  className?: string
  hrefBase?: string
  footerLabel?: string
  compareSelected?: boolean
  compareDisabled?: boolean
  compareDisabledReason?: string
  onCompareToggle?: () => void
}

export function CollegeCard({ 
  college, 
  className = '', 
  hrefBase = '/colleges',
  footerLabel = 'View Details',
  compareSelected = false,
  compareDisabled = false,
  compareDisabledReason,
  onCompareToggle
}: CollegeCardProps) {
  const [logoSrc, setLogoSrc] = useState(college.logo || '/images/logo-dark.png')

  return (
    <Card 
      className={cn(
        'group overflow-hidden cursor-pointer border border-white/10 bg-black transition-shadow duration-300 hover:shadow-primary-glow',
        college.highlight && 'ring-2 ring-primary',
        className
      )}
    >
      <Link href={`${hrefBase}/${college.id}`} className="block">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
              <Image
                src={logoSrc}
                alt={`${college.name} logo`}
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                onError={() => setLogoSrc('/images/logo-dark.png')}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text truncate mb-1 group-hover:text-primary transition-colors">
                {college.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {college.city}, {college.state}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <StarRating rating={college.rating} size="sm" showNumber />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {college.category ? (
              <Badge variant="outline" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                {college.category}
              </Badge>
            ) : null}
            {college.naacGrade ? (
              <Badge variant="outline" className="text-xs">
                NAAC {college.naacGrade}
              </Badge>
            ) : null}
            {college.nirfRank && (
              <Badge variant="default" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                NIRF #{college.nirfRank}
              </Badge>
            )}
          </div>
          {college.feeRange && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-text-secondary">
                Fees: <span className="font-semibold text-text">{college.feeRange}</span>
              </span>
            </div>
          )}
          {college.placementPercent && (
            <div className="flex items-center gap-2 text-sm mt-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-text-secondary">
                Placement: <span className="font-semibold text-text">{college.placementPercent}</span>
              </span>
            </div>
          )}
          {(college.averagePackage || college.highestPackage) && (
            <div className="flex items-center gap-4 text-sm mt-2">
              {college.averagePackage && (
                <span className="text-text-secondary">
                  Avg: <span className="font-semibold text-text">{college.averagePackage}</span>
                </span>
              )}
              {college.highestPackage && (
                <span className="text-text-secondary">
                  High: <span className="font-semibold text-text">{college.highestPackage}</span>
                </span>
              )}
            </div>
          )}
          {college.description && (
            <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
              {college.description}
            </p>
          )}
          {Array.isArray(college.topCourses) && college.topCourses.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {college.topCourses.map((course) => (
                <span key={course} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-[#D4D4D8]">
                  {course}
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Link>
      <CardFooter className="pt-0">
        <div className="w-full border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <Link href={`${hrefBase}/${college.id}`} className="text-text-secondary hover:text-white transition-colors">
              {footerLabel}
            </Link>
            {onCompareToggle ? (
              <button
                type="button"
                onClick={onCompareToggle}
                disabled={compareDisabled}
                title={compareDisabled ? compareDisabledReason : undefined}
                className={cn(
                  'rounded-full border border-white/20 px-3 py-1 text-xs font-semibold transition',
                  compareSelected ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 text-white hover:bg-white/10',
                  compareDisabled && 'cursor-not-allowed opacity-60'
                )}
              >
                {compareSelected ? 'Selected' : 'Compare'}
              </button>
            ) : (
              <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

