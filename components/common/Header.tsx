'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import { NAVIGATION_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header
      className={cn(
        "fixed top-1 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[15px] font-semibold transition-all duration-200 relative",
                  "hover:text-primary hover:scale-105",
                  pathname === link.href
                    ? "text-primary after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-primary-500 after:to-primary-700 after:rounded-full"
                    : "text-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/compare">Compare Colleges</Link>
            </Button>
            {user ? (
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-all"
              >
                <Link href="/dashboard/profile">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <span>Profile</span>
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-foreground hover:text-primary">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-[280px] bg-background border-l border-border shadow-2xl lg:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Logo size="md" />
            <button
              className="p-2 hover:bg-gray-800 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium py-3 px-4 rounded-xl transition-all",
                  pathname === link.href
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(107,158,255,0.1)]"
                    : "text-white hover:bg-white/5"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-border">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold shadow-lg w-full rounded-xl"
            >
              <Link href="/compare" onClick={() => setIsMobileMenuOpen(false)}>
                Compare Colleges
              </Link>
            </Button>
            {user ? (
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-white/10 hover:bg-white/5 text-white"
              >
                <Link href="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild className="w-full rounded-xl border-white/10 hover:bg-white/5">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black hover:bg-gray-200 w-full rounded-xl"
                >
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
