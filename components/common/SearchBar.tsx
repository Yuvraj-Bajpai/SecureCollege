'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: () => void
  className?: string
}

export function SearchBar({ 
  placeholder = "Search colleges, courses, or locations...", 
  value,
  onChange,
  onSearch,
  className = '' 
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.()
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button type="submit" size="lg" className="px-8">
          Search
        </Button>
      </div>
    </form>
  )
}

