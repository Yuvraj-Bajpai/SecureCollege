'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { useBookingModal } from '@/contexts/BookingModalContext'
import {
  Shield,
  Users,
  Search,
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  const { openModal } = useBookingModal()

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
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={sectionVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="px-6 py-10 md:px-10">
                  <p className="text-sm font-semibold tracking-widest text-[#8B5CF6]/90 uppercase mb-3">
                    About
                  </p>
                  <h1
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                    style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                  >
                    About Secure College
                  </h1>
                  <p className="text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
                    The right college changes everything. We make sure you find it.
                  </p>
                </CardContent>
              </PremiumCard>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={sectionVariants}
            >
              <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="p-8 md:p-10">
                  <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-5">
                      <h2 className="text-2xl md:text-3xl font-semibold text-white">
                        Our Story
                      </h2>
                      <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
                        Every year, lakhs of students across India receive their entrance exam results, stare at a rank
                        or score, and have no idea what to do next. They scroll through cluttered websites, sit through
                        biased counseling sessions, and end up choosing a college based on incomplete information or
                        peer pressure.
                      </p>
                      <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
                        Students from smaller cities, mid-scorers, and first-generation college-goers were the most
                        affected — those with the least guidance and the most at stake, across every course from B.Tech
                        to MBA to Law to Design.
                      </p>
                      <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
                        SecureCollege was built to fix that. One platform where any student — regardless of course,
                        rank, or background — gets honest, complete information to make a confident decision.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                          <CardContent className="p-6 md:p-7">
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF]">
                                <Compass className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white mb-1">
                                  Built for real students, not just toppers
                                </p>
                                <p className="text-xs md:text-sm text-[#A1A1AA]">
                                  We obsess over the questions an actual confused student has on result day — not just
                                  what looks good on a brochure.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </PremiumCard>
                        <div className="pointer-events-none absolute -inset-1 rounded-2xl border border-[#5B8DEF]/30 opacity-40 blur-sm" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-[#A1A1AA]">
                        <PremiumCard className="rounded-2xl px-4 py-3 transition-shadow hover:shadow-primary-glow">
                          <p className="text-xs uppercase tracking-wide text-[#8B5CF6] mb-1">
                            Students Helped
                          </p>
                          <p className="text-lg font-semibold text-white">10,000+</p>
                        </PremiumCard>
                        <PremiumCard className="rounded-2xl px-4 py-3 transition-shadow hover:shadow-primary-glow">
                          <p className="text-xs uppercase tracking-wide text-[#5B8DEF] mb-1">
                            Partner Colleges
                          </p>
                          <p className="text-lg font-semibold text-white">37+</p>
                        </PremiumCard>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </PremiumCard>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={sectionVariants}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#5B8DEF]/15 px-4 py-1 mb-4">
                      <span className="h-2 w-2 rounded-full bg-[#5B8DEF]" />
                      <span className="text-xs font-medium tracking-wide text-[#5B8DEF] uppercase">
                        Mission
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
                    <p className="text-sm md:text-base text-[#A1A1AA] leading-relaxed">
                      Make college selection transparent, data-driven, and genuinely student-first — for every course,
                      every rank, every student.
                    </p>
                  </CardContent>
                </PremiumCard>

                <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/15 px-4 py-1 mb-4">
                      <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                      <span className="text-xs font-medium tracking-wide text-[#8B5CF6] uppercase">
                        Vision
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Our Vision</h2>
                    <p className="text-sm md:text-base text-[#A1A1AA] leading-relaxed">
                      A future where no student picks the wrong college simply because they didn&apos;t have access to
                      the right information at the right time.
                    </p>
                  </CardContent>
                </PremiumCard>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={sectionVariants}
            >
              <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="p-8 md:p-10">
                  <div className="max-w-3xl mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">
                      What We Stand For
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-[#A1A1AA]">
                      Four principles guide every feature, partnership, and decision at SecureCollege.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF]">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Transparency First
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Real placement data, real reviews, no paid rankings.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6]">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Students Over Everything
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Every feature built around what students actually need.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF]">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Clarity Over Noise
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Specific, rank-based guidance instead of generic top-10 lists.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6]">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Access for All
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Free for every student, forever. No exceptions.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>
                  </div>
                </CardContent>
              </PremiumCard>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={sectionVariants}
            >
              <PremiumCard className="rounded-2xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="p-8 md:p-10">
                  <div className="max-w-3xl mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">
                      What Makes Us Different
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-[#A1A1AA]">
                      A lot of platforms claim to help students. Here&apos;s what actually sets us apart.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF]">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            We Don&apos;t Take Sides
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Every college on SecureCollege earns its place through verified data, not paid listings. What
                            you see is what&apos;s actually true — placement numbers, fee structures, student reviews, all
                            unfiltered.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6]">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Built Around Your Rank
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            We don&apos;t show you the same &quot;Top 10 Colleges&quot; list everyone else does. You enter
                            your rank, your course, your budget — and we show you what&apos;s actually within your reach,
                            with full details to back it up.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF]">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Beyond the Brochure
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            Most platforms stop at a college&apos;s official information. We go further — real campus
                            experiences, hostel conditions, faculty feedback, and 360° virtual tours so you know exactly
                            what you&apos;re walking into.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard className="rounded-2xl p-6 transition-shadow hover:shadow-primary-glow">
                      <div className="flex items-start gap-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6]">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            From Decision to Admission
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            We don&apos;t disappear after you shortlist. From understanding cutoffs to navigating counseling
                            rounds, we stay with you through the entire process.
                          </p>
                        </div>
                      </div>
                    </PremiumCard>
                  </div>
                </CardContent>
              </PremiumCard>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <PremiumCard className="overflow-hidden rounded-2xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="flex flex-col gap-6 items-start justify-between px-6 py-10 md:px-10 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Every Student Deserves the Right Guidance
                    </h2>
                    <p className="text-sm md:text-base text-[#A1A1AA]">
                      Join thousands of students who found their right college with SecureCollege.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="w-full h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl sm:w-auto"
                    >
                      <Link href="/students">Find My College</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={openModal}
                      className="w-full h-12 px-8 border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                    >
                      Talk to Our Team
                    </Button>
                  </div>
                </CardContent>
              </PremiumCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
