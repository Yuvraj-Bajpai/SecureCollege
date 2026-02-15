import Link from 'next/link'
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

export function Footer() {
  return (
    <footer className="bg-[#06132E] border-t border-white/10">
      <div className="bg-gradient-to-b from-[#06132E] via-[#0B1A3D] to-[#06132E] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl lg:text-3xl font-bold text-white mb-3"
              style={{ textShadow: '0 0 18px rgba(107, 158, 255, 0.35)' }}
            >
              Stay Updated with Admission Alerts
            </h2>
            <p className="text-slate-400 mb-6">
              Get latest cutoffs, scholarships & college news delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 rounded-xl border border-white/10 bg-[#06132E]/60 text-white placeholder:text-slate-400 focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              />
              <Button 
                type="submit"
                className="h-12 px-8 rounded-xl bg-[#6B9EFF] text-white shadow-lg shadow-blue-500/20 hover:bg-[#3B82F6]"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-slate-400 mt-3">
              Join 10,000+ students getting admission updates
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <Logo size="md" className="mb-4" />
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Helping students find their perfect engineering college with complete transparency and insider insights.
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/10 text-slate-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Check className="w-4 h-4" />
              100% Free for Students
            </div>

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
                  className="w-10 h-10 rounded-full bg-[#6B9EFF] hover:bg-[#3B82F6] flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg shadow-blue-500/20"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="text-base font-semibold text-white mb-4"
              style={{ textShadow: '0 0 14px rgba(107, 158, 255, 0.25)' }}
            >
              Quick Links
            </h3>
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
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3
              className="text-base font-semibold text-white mb-4"
              style={{ textShadow: '0 0 14px rgba(107, 158, 255, 0.25)' }}
            >
              Resources
            </h3>
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
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore by State */}
          <div>
            <h3
              className="text-base font-semibold text-white mb-4"
              style={{ textShadow: '0 0 14px rgba(107, 158, 255, 0.25)' }}
            >
              Explore by State
            </h3>
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
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/colleges/all-states"
                  className="text-sm text-[#6B9EFF] hover:text-[#3B82F6] font-medium inline-flex items-center gap-1"
                >
                  View All States →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Black Background */}
      <div className="bg-[#06132E] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © 2025 Secure College. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-sm text-slate-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
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
