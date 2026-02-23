'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

export default function CollegesPage() {
  const [showPerDetails, setShowPerDetails] = useState(false)
  const [showRetainerDetails, setShowRetainerDetails] = useState(false)
  const [showCampaignDetails, setShowCampaignDetails] = useState(false)
  const [collegeName, setCollegeName] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSuccess(false)

    if (!collegeName.trim() || !phone.trim()) {
      setError('Please fill in both college name and phone.')
      return
    }

    setIsLoading(true)

    try {
      const { error: insertError } = await supabase.from('college_leads').insert({
        college_name: collegeName.trim(),
        phone: phone.trim(),
      })

      if (insertError) {
        console.error('Error inserting college lead:', insertError)
        setError('Something went wrong. Please try again.')
      } else {
        setIsSuccess(true)
        setCollegeName('')
        setPhone('')
      }
    } catch (err) {
      console.error('Unexpected error inserting college lead:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
          <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-8">
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
                Grow Your Admissions With Secure College
              </h1>
              <p className="mt-6 text-lg text-gray-300 md:text-xl">
                Connect with serious, well-counseled students actively looking for the right college.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="xl"
                    className="h-14 px-10 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-lg font-semibold shadow-xl hover:shadow-xl"
                  >
                    <Link href="#growth-call">Request a Proposal</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-semibold text-white sm:text-4xl"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                Our Solutions
              </h2>
              <p className="mt-4 text-base text-[#A1A1AA]">
                Full-funnel growth programs designed for admission teams.
              </p>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {[
                {
                  title: 'Lead Generation',
                  description: 'Meta Ads, School Outreach, Referral'
                },
                {
                  title: 'Conversion Support',
                  description: 'Counseling, CRM, Follow-ups'
                },
                {
                  title: 'Branding & Marketing',
                  description: 'Social Media, Events, SEO'
                }
              ].map((solution) => (
                <motion.div
                  key={solution.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white">{solution.title}</h3>
                      <p className="mt-2 text-sm text-[#A1A1AA]">{solution.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-semibold text-white sm:text-4xl"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                Partnership Models
              </h2>
              <p className="mt-4 text-base text-white/70">
                Flexible engagement options aligned to your goals.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white">Per Admission</h3>
                    <p className="mt-2 text-sm text-[#A1A1AA]">Pay only when a student enrolls</p>
                    {showPerDetails && (
                      <p className="mt-4 text-sm text-[#A1A1AA]">
                        Zero upfront risk. You only pay when we deliver a confirmed enrollment — no seat filled, no fee
                        charged. Ideal for colleges looking to test the partnership before committing.
                      </p>
                    )}
                    <div className="mt-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => setShowPerDetails((prev) => !prev)}
                      >
                        {showPerDetails ? 'Hide details' : 'Know More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white">Retainer + Bonus</h3>
                    <p className="mt-2 text-sm text-[#A1A1AA]">Ongoing pipeline with performance incentives</p>
                    {showRetainerDetails && (
                      <p className="mt-4 text-sm text-[#A1A1AA]">
                        A dedicated monthly pipeline of qualified student profiles, with a bonus triggered only on
                        performance milestones. You get volume consistency, we stay accountable to results.
                      </p>
                    )}
                    <div className="mt-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => setShowRetainerDetails((prev) => !prev)}
                      >
                        {showRetainerDetails ? 'Hide details' : 'Know More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white">Campaign Based</h3>
                    <p className="mt-2 text-sm text-[#A1A1AA]">Focused admission campaigns per season</p>
                    {showCampaignDetails && (
                      <p className="mt-4 text-sm text-[#A1A1AA]">
                        Built for peak admission seasons — we run targeted outreach, rank-based matching, and direct
                        college promotion to students actively comparing options. One focused sprint, maximum seat
                        fills.
                      </p>
                    )}
                    <div className="mt-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => setShowCampaignDetails((prev) => !prev)}
                      >
                        {showCampaignDetails ? 'Hide details' : 'Know More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
              className="mx-auto max-w-3xl text-center"
            >
              <h2
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                Our Process
              </h2>
              <p className="mt-3 text-base text-[#A1A1AA]">
                A clear system to move from planning to measurable outcomes.
              </p>
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  title: 'Strategy',
                  description: 'Align objectives, intake goals, and target regions.'
                },
                {
                  title: 'Campaign',
                  description: 'Launch high-intent campaigns across channels.'
                },
                {
                  title: 'Leads',
                  description: 'Capture qualified student inquiries with context.'
                },
                {
                  title: 'Convert',
                  description: 'Counsel and nurture every lead to admission.'
                },
                {
                  title: 'Report',
                  description: 'Track performance with transparent reporting.'
                }
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                    <CardContent className="p-6 text-center">
                      <p className="text-base font-semibold text-white">{step.title}</p>
                      <p className="mt-2 text-sm text-[#A1A1AA]">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="growth-call" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
              >
                Schedule a Free Growth Call
              </h2>
              <p className="mt-3 text-base text-white/70">
                Share your details and we will tailor a growth plan for your admissions team.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-10 max-w-xl"
            >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <Input
                      placeholder="College Name"
                      className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                      value={collegeName}
                      onChange={(event) => setCollegeName(event.target.value)}
                    />
                    <Input
                      placeholder="Phone"
                      className="h-12 border-white/20 bg-white/10 text-white placeholder:text-[#A1A1AA]"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Booking...' : 'Book a Call'}
                    </Button>
                  </form>
                  {isSuccess && !error && (
                    <p className="mt-3 text-sm text-emerald-400">
                      Request received. We&apos;ll call you shortly.
                    </p>
                  )}
                  {error && (
                    <p className="mt-3 text-sm text-red-400">
                      {error}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
