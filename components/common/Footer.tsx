'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, type FormEvent } from 'react'
import { Logo } from '@/components/common/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone,
  Check
} from 'lucide-react'
import { ParticleBackground as ParticleBackgroundType } from '@/components/common/ParticleBackground'
import { supabase } from '@/lib/supabase'

const ParticleBackground = dynamic(
  () =>
    import('@/components/common/ParticleBackground').then((mod) => ({
      default: mod.ParticleBackground as typeof ParticleBackgroundType,
    })),
  { ssr: false }
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMsg(null)
    setIsSuccess(false)

    if (!email.trim()) {
      setErrorMsg('Please enter your email.')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email.trim()
      })

      if (error) {
        if (error.code === '23505') {
          setErrorMsg("You're already subscribed!")
        } else {
          setErrorMsg('Something went wrong. Please try again.')
        }
      } else {
        setIsSuccess(true)
        setEmail('')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="relative border-t border-white/10 text-white overflow-hidden">
      <ParticleBackground />
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Stay Updated with Admission Alerts
            </h2>
            <p className="text-sm text-[#A1A1AA] mb-8">
              Get latest cutoffs, scholarships & college news delivered to your inbox
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-300 placeholder:font-semibold backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                className="h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {isSuccess && !errorMsg && (
              <p className="mt-3 text-sm text-emerald-400">
                Subscribed successfully!
              </p>
            )}
            {errorMsg && (
              <p className="mt-3 text-sm text-red-400">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <Logo size="xl" className="mb-6" />
            <p className="text-sm text-text-secondary mb-6 max-w-xs">
              Helping students find their perfect college across every course with complete transparency and insider insights.
            </p>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Check className="w-4 h-4" />
              100% Free for Students
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/80 shadow-sm transition-all hover:text-white hover:border-primary/60 hover:bg-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Colleges', href: '/colleges' },
                { label: 'Compare Colleges', href: '/compare' },
                { label: 'Virtual Tours', href: '/virtual-tours' },
                { label: 'Premium Features', href: '/premium' },
                { label: 'Blog & Resources', href: '/blog' },
                { label: 'FAQs', href: '/faqs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: 'Admission Guides', href: '/guides' },
                { label: 'Scholarship Finder', href: '/scholarships' },
                { label: 'Rank Predictor', href: '/rank-predictor' },
                { label: 'College Reviews', href: '/reviews' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore by State */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-4">Explore by State</h3>
            <ul className="space-y-3">
              {[
                { label: 'Uttar Pradesh Colleges', href: '/colleges/uttar-pradesh' },
                { label: 'Delhi NCR Colleges', href: '/colleges/delhi-ncr' },
                { label: 'Haryana Colleges', href: '/colleges/haryana' },
                { label: 'Rajasthan Colleges', href: '/colleges/rajasthan' },
                { label: 'Maharashtra Colleges', href: '/colleges/maharashtra' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/colleges/all-states"
                  className="text-sm text-primary hover:text-primary-600 font-medium inline-flex items-center gap-1"
                >
                  View All States →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © 2025 Secure College. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-sm text-gray-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-white flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{SITE_CONFIG.contactEmail}</span>
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
