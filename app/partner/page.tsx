'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Building2, Star } from 'lucide-react'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function PartnerPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="show"
              variants={sectionVariants}
              transition={{ duration: 0.6 }}
              className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
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
                    <p className="text-white font-semibold">Admissions Growth Partner</p>
                    <p className="mt-2 text-sm text-[#A1A1AA]">Lead generation, conversion, and branding in one plan.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Solutions</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
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
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Partnership Models</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'Per Admission' },
                { title: 'Retainer + Bonus' },
                { title: 'Campaign Based' },
              ].map((item) => (
                <Card key={item.title} className="border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6 flex h-full flex-col items-start">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-6">{item.title}</h3>
                    <Button className="mt-auto bg-white text-black hover:bg-gray-200">Know More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Process</h2>
            </div>
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
              {['Strategy', 'Campaign', 'Leads', 'Convert', 'Report'].map((step, idx) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white font-semibold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-white">{step}</span>
                  {idx < 4 ? (
                    <ArrowRight className="hidden md:block h-5 w-5 text-white/40" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Schedule a Free Growth Call</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="College Name"
                  className="h-12 w-full rounded-xl border border-white/15 bg-black/60 px-4 text-sm text-white placeholder:text-[#A1A1AA]"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="h-12 w-full rounded-xl border border-white/15 bg-black/60 px-4 text-sm text-white placeholder:text-[#A1A1AA]"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button className="h-12 px-8 bg-emerald-500 text-black hover:bg-emerald-400 font-semibold">
                  Book Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
