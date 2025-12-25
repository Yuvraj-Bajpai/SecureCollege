'use client'

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
  category: string
  nirfRank?: number
  logo: string
  rating: number
  feeRange?: string
  placementPercent?: string
  averagePackage?: string
  highestPackage?: string
  description?: string
  highlight?: boolean
}

interface CollegeCardProps {
  college: CollegeCardData
  className?: string
}

export function CollegeCard({ college, className = '' }: CollegeCardProps) {
  return (
    <Card 
      className={cn(
        'group hover:shadow-primary-glow transition-all duration-300 overflow-hidden cursor-pointer',
        college.highlight && 'ring-2 ring-primary',
        className
      )}
    >
      <Link href={`/colleges/${college.id}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
              {/* Light theme logo */}
              <Image
                src={college.logo || '/images/logo.png'}
                alt={`${college.name} logo`}
                fill
                className="object-contain p-2 dark:hidden"
              />
              {/* Dark theme logo */}
              <Image
                src={college.logo || '/images/logo-dark.png'}
                alt={`${college.name} logo`}
                fill
                className="object-contain p-2 hidden dark:block"
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
            <Badge variant="outline" className="text-xs">
              <GraduationCap className="w-3 h-3 mr-1" />
              {college.category}
            </Badge>
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
        </CardContent>

        <CardFooter className="pt-0">
          <div className="w-full border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">View Details</span>
              <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

