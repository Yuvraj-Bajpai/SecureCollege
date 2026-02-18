'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg border-2 lg:top-5 lg:right-5 lg:bottom-auto"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 dark:hidden rotate-0 scale-100 transition-all" />
      <Moon className="h-5 w-5 hidden dark:block rotate-0 scale-100 transition-all" />
    </Button>
  )
}

