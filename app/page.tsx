'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { Star, GraduationCap, MapPin, FileText, Target } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

export default function HomePage() {
  const { openModal } = useBookingModal()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Secure College",
            "url": "https://securecollege.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://securecollege.in/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
        </div>

        <div className="relative z-10">
          <section className="relative overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl text-center"
              >
                <h1
                  className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                  style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
                >
                  Low Rank? You Can Still Secure a Great College.
                </h1>
                <div className="mt-6 text-base text-gray-300 md:text-lg">
                  <p>
                    From choosing the right college to admissions, hostel support, scholarships, and mentorship —{' '}
                    <span className="font-semibold text-white whitespace-nowrap">Secure College</span> guides you at every step.
                  </p>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      size="xl"
                      className="h-14 px-10 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-lg font-semibold shadow-xl hover:shadow-xl"
                    >
                      <Link href="/students">Start My College Search</Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      size="xl"
                      variant="outline"
                      className="h-14 px-10 border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/colleges">Become Our College Partner</Link>
                    </Button>
                  </motion.div>
                </div>
                <div className="mt-8 w-full">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2
                      className="text-2xl font-semibold text-white sm:text-3xl"
                      style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                    >
                      Our Impact
                    </h2>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {[
                      {
                        icon: GraduationCap,
                        label: '50+ Verified College Partners',
                      },
                      {
                        icon: MapPin,
                        label: 'Presence Across 8+ States',
                      },
                      {
                        icon: FileText,
                        label: 'Complete Admission Support',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl transition-shadow hover:shadow-primary-glow"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <p className="text-sm lg:text-base font-medium text-white lg:whitespace-nowrap">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 w-full">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
                    <div className="mr-3">
                      <p className="text-base text-white">
                        Complete Admission Support — College Selection, Application Process, Hostel Coordination,
                        Scholarships, and More
                      </p>
                    </div>
                    <Button
                      size="xl"
                      onClick={openModal}
                      className="shrink-0 h-12 px-10 text-base bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl"
                    >
                      Book Free Counseling
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">How It Works</h2>
                <p className="mt-3 text-base text-white/70">
                  A simple 5-step flow from discovery to settling in.
                </p>
              </motion.div>
              <div className="mt-12 max-w-3xl mx-auto space-y-4">
                {[
                  {
                    title: 'Connect',
                    description:
                      'Share your marks, course interests, and locations in one clean flow — we understand your situation before showing any colleges.',
                  },
                  {
                    title: 'Shortlist',
                    description:
                      'Get a focused list of colleges that match your rank, budget, and course, backed by real data instead of paid rankings.',
                  },
                  {
                    title: 'Apply',
                    description:
                      'Apply to multiple colleges from one place with clear steps and deadlines, without hopping across confusing websites.',
                  },
                  {
                    title: 'Admission',
                    description:
                      'Track offers and confirmations in one dashboard while we guide you through counseling, paperwork, and critical dates.',
                  },
                  {
                    title: 'Hostel',
                    description:
                      'Compare hostel options, basic living costs, and genuine student reviews so you know exactly where you’ll stay.',
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                  >
                    <PremiumCard className="h-full transition-shadow hover:shadow-primary-glow">
                      <CardContent className="flex items-center gap-6 p-6">
                        <div className="flex w-28 flex-col items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base font-semibold text-white">
                            {idx + 1}
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="flex-1 text-sm md:text-base text-[#A1A1AA] text-left">
                          {step.description}
                        </p>
                      </CardContent>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2
                  className="text-3xl font-semibold text-white sm:text-4xl"
                  style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
                >
                  Why Choose Us
                </h2>
                <p className="mt-4 text-base text-[#A1A1AA]">
                  Premium support designed for confident decisions.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  'Personal 1:1 Guidance',
                  'Verified Colleges',
                  'Hostel Support',
                  'Campus Tours',
                  'Guaranteed admission'
                ].map((feature) => {
                  const description =
                    feature === 'Personal 1:1 Guidance'
                      ? 'Personalized advice for your rank'
                      : feature === 'Verified Colleges'
                      ? 'Only colleges with verified data'
                      : feature === 'Hostel Support'
                      ? 'Complete hostel and living details'
                      : feature === 'Campus Tours'
                      ? '360° virtual campus walkthroughs included'
                      : 'End-to-end admission process support'

                  return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-6 text-center">
                        <p className="text-base font-semibold text-white">{feature}</p>
                        <p className="mt-2 text-sm text-[#A1A1AA]">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Testimonials</h2>
                <p className="mt-3 text-base text-white/70">Students who shaped their future with us.</p>
              </motion.div>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: 'Rahul Sharma',
                    college: 'IIIT Delhi',
                    text: 'SecureCollege guided me through the entire admission process with clarity and confidence.',
                    rating: 5
                  },
                  {
                    name: 'Priya Patel',
                    college: 'NSUT',
                    text: 'The counselors were honest, supportive, and made my shortlist easy to finalize.',
                    rating: 5
                  },
                  {
                    name: 'Amit Kumar',
                    college: 'ABES IT',
                    text: 'From campus tours to hostel support, everything was handled seamlessly.',
                    rating: 5
                  },
                  {
                    name: 'Neha Singh',
                    college: 'JSS Academy',
                    text: 'I loved the premium experience. SecureCollege truly felt like a partner.',
                    rating: 5
                  }
                ].map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <PremiumCard className="h-full text-white transition-shadow hover:shadow-primary-glow">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="mt-6 border-t border-white/5 pt-4">
                          <p className="text-base font-semibold text-white">{testimonial.name}</p>
                          <p className="text-xs text-white/60">{testimonial.college}</p>
                        </div>
                      </CardContent>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
