'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ErrorTest() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('Test error for error boundary verification')
  }

  return (
    <div className="p-6 border border-dashed border-red-400 rounded-lg bg-red-50 dark:bg-red-950/20">
      <h3 className="text-lg font-semibold mb-4">Error Boundary Test</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Click the button below to test if error boundaries are working correctly.
        This will trigger an error that should be caught by the nearest error boundary.
      </p>
      <Button 
        onClick={() => setShouldError(true)}
        variant="destructive"
      >
        Trigger Test Error
      </Button>
    </div>
  )
}