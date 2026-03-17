'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('College profile page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-4">🏫</div>
        <h2 className="text-2xl font-bold mb-4">College Not Found</h2>
        <p className="text-gray-400 mb-6">
          We couldn&apos;t load this college&apos;s profile. It might not exist or there could be a temporary issue.
        </p>
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <a href="/colleges">
              Browse All Colleges
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}