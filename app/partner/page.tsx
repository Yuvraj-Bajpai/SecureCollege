'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  Building2,
  Megaphone,
  Share2,
  BarChart3,
  Users,
  Sparkles,
  Phone,
} from 'lucide-react'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const processSteps = [
  {
    title: 'Strategy',
    blurb: 'Align goals, programs, and markets before any ad spend.',
  },
  {
    title: 'Campaign',
    blurb: 'Ads, landing pages, and creatives tuned for serious applicants.',
  },
  {
    title: 'Leads',
    blurb: 'Route qualified inquiries fast so no hot lead is missed.',
  },
  {
    title: 'Convert',
    blurb: 'Scripts, follow-ups, and tidy CRM to improve seat fills.',
  },
  {
    title: 'Report',
    blurb: 'Weekly views of spend, CPL, and funnel health.',
  },
]

export default function PartnerPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section className="pt-28 pb-10 md:pt-32 md:pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="show"
              variants={sectionVariants}
              transition={{ duration: 0.6 }}
              className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
            >
              <div>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                >
                  Grow Your Admissions With Secure College
                </h1>
                <p className="text-lg md:text-xl text-[#A1A1AA] mb-8 max-w-2xl">
                  Trusted performance marketing, admissions support, and brand growth for partner colleges.
                </p>
                <Button
                  asChild
                  size="xl"
                  className="h-14 px-10 bg-white text-black hover:bg-gray-200 text-lg font-semibold shadow-xl rounded-full"
                >
                  <Link href="/contact?type=partnership">Request Proposal</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-sm border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-10 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Building2 className="h-8 w-8" />
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-white">Admissions Growth Partner</p>
                    <p className="mt-3 text-base md:text-lg leading-relaxed text-[#A1A1AA]">
                      Lead generation, conversion, and branding in one plan.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Solutions</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: 'Lead Generation', points: ['Meta Ads', 'School Outreach', 'Referrals'] },
                { title: 'Conversion Support', points: ['Counseling', 'CRM, Follow-ups'] },
                { title: 'Branding & Marketing', points: ['Social Media', 'Events, SEO'] },
              ].map((item) => (
                <Card key={item.title} className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">How we help your college grow</h2>
              <p className="mt-3 text-sm md:text-base text-[#A1A1AA]">
                Full-funnel growth: from discovery to enrolled students — not just vanity impressions.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Megaphone,
                  title: 'Lead generation',
                  text: 'High-intent student leads through search, social, and education-marketplace campaigns tuned to your courses.',
                },
                {
                  icon: Share2,
                  title: 'Social & content',
                  text: 'Consistent reels, success stories, and open-day pushes that build trust with parents and students.',
                },
                {
                  icon: Users,
                  title: 'Counseling & nurture',
                  text: 'Scripts, WhatsApp flows, and CRM hygiene so inquiries turn into campus visits and admissions.',
                },
                {
                  icon: BarChart3,
                  title: 'Reporting & ROI',
                  text: 'Weekly clarity on cost per lead, visit rate, and seat fill — optimize budgets with confidence.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[#A1A1AA] max-w-2xl mx-auto">
              We also support open-house promotions, scholarship pushes, referral partner programs, and brand refreshes when you launch new programs.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Process</h2>
              <p className="mt-2 text-sm text-[#A1A1AA]">Five clear stages from kickoff to measurable growth.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, idx) => (
                <Card
                  key={step.title}
                  className="relative border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl"
                >
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-bold text-white">
                        {idx + 1}
                      </div>
                      <h3 className="text-base font-semibold text-white leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#A1A1AA] flex-1">{step.blurb}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-xl space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#A1A1AA]">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      No-obligation intro
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Schedule a free growth call</h2>
                    <p className="text-sm md:text-base text-[#A1A1AA]">
                      Share your campus goals — we’ll suggest a realistic acquisition plan and next steps.
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto lg:min-w-[320px]">
                    <input
                      type="text"
                      placeholder="College name"
                      className="h-11 w-full flex-1 rounded-xl border border-white/15 bg-black/30 px-4 text-sm text-white placeholder:text-[#A1A1AA]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="h-11 w-full flex-1 rounded-xl border border-white/15 bg-black/30 px-4 text-sm text-white placeholder:text-[#A1A1AA] sm:max-w-[200px]"
                    />
                    <Button
                      asChild
                      className="h-11 w-full shrink-0 bg-white text-black hover:bg-gray-200 font-semibold shadow-lg sm:w-auto sm:min-w-[140px]"
                    >
                      <Link href="/contact?type=partnership" className="inline-flex items-center justify-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Book call
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
