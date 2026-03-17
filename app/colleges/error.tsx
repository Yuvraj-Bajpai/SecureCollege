'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('College page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We couldn&apos;t load the colleges page. This might be a temporary issue.
        </p>
        <Button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}