import { ErrorTest } from '@/components/test/ErrorTest'

export default function TestErrorPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Error Boundary Test Page</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        This page is for testing error boundaries. Click the button below to trigger an error
        and verify that the error boundary catches it properly.
      </p>
      <ErrorTest />
    </div>
  )
}