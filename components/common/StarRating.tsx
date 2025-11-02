'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  className = ''
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < Math.round(rating)
              ? 'fill-primary text-primary'
              : 'text-gray-300'
          )}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-text-secondary">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

