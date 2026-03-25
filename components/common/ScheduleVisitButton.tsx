'use client'

import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingModal } from '@/contexts/BookingModalContext'

export function ScheduleVisitButton({ collegeName }: { collegeName: string }) {
  const { openModal } = useBookingModal()

  return (
    <Button
      onClick={openModal}
      className="w-full h-12 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 font-semibold rounded-xl transition-all"
    >
      <Calendar className="w-4 h-4 mr-2" />
      Schedule College Visit
    </Button>
  )
}
