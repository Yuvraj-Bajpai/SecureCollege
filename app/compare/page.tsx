import { Suspense } from 'react'
import CompareClient from './CompareClient'

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <CompareClient />
    </Suspense>
  )
}
