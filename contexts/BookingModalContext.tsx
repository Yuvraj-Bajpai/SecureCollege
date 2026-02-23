'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type BookingModalContextValue = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BookingModalContext = createContext<BookingModalContextValue | undefined>(undefined)

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  )

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>
}

export function useBookingModal() {
  const context = useContext(BookingModalContext)
  if (!context) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }
  return context
}
