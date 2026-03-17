'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Globe, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react'

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
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="show"
              variants={sectionVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
              >
                Scale Your Admissions with <span className="text-primary">Secure College</span>
              </h1>
              <p className="text-lg md:text-xl text-[#A1A1AA] mb-10 max-w-2xl mx-auto">
                Connect with verified, high-intent students. Showcase your institution to thousands of applicants looking for their dream college.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  asChild
                  size="xl"
                  className="h-14 px-10 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-lg font-semibold shadow-xl w-full sm:w-auto"
                >
                  <Link href="/contact?type=partnership">Partner With Us Now</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="xl"
                  className="h-14 px-10 border-white/20 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  <a href="#benefits">Learn More</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { label: 'Students Helped', value: '10,000+' },
                { label: 'Partner Colleges', value: '37+' },
                { label: 'State Presence', value: '8+' },
                { label: 'Monthly Visitors', value: '50K+' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PremiumCard className="text-center p-6">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs md:text-sm text-[#A1A1AA] uppercase tracking-wider">{stat.label}</p>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Partner With Us?</h2>
              <p className="text-[#A1A1AA] max-w-2xl mx-auto">
                We bridge the gap between institutions and students using data, transparency, and expert guidance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Verified Student Leads',
                  description: 'Get access to high-intent students who have already been screened by our counselors.',
                  icon: Users,
                },
                {
                  title: 'Data-Driven Insights',
                  description: 'Understand applicant trends and student preferences with our detailed analytics.',
                  icon: BarChart3,
                },
                {
                  title: 'Brand Showcase',
                  description: 'Premium placement for your college with 360° virtual tours and detailed profiles.',
                  icon: Building2,
                },
                {
                  title: 'Admission Support',
                  description: 'Our counselors guide students through your specific admission process.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Wider Reach',
                  description: 'Expand your presence across 8+ states and reach students you couldn\'t before.',
                  icon: Globe,
                },
                {
                  title: 'Fast-Track Admissions',
                  description: 'Streamline your intake with our digital-first application tracking system.',
                  icon: Zap,
                },
              ].map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-primary-glow transition-all">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                        <benefit.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-[#A1A1AA] leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Partnership Process</h2>
                <p className="text-[#A1A1AA]">Get started in three easy steps.</p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Contact Us',
                    description: 'Reach out through our partnership form or email us with your institution details.'
                  },
                  {
                    step: '02',
                    title: 'Verification',
                    description: 'Our team will verify your details and schedule a discovery call to understand your needs.'
                  },
                  {
                    step: '03',
                    title: 'Go Live',
                    description: 'Once verified, your college profile is optimized and you start receiving verified leads.'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6 p-6 rounded-2xl border border-white/5 bg-white/5"
                  >
                    <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-[#A1A1AA]">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <PremiumCard className="overflow-hidden rounded-3xl">
                <CardContent className="p-12 md:p-16 text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to grow your institution?
                  </h2>
                  <p className="text-lg text-[#A1A1AA] mb-10 max-w-2xl mx-auto">
                    Join our network of 37+ verified partner colleges and start reaching the right students today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      asChild
                      size="xl"
                      className="h-14 px-12 bg-white text-black hover:bg-gray-200 text-lg font-bold shadow-xl w-full sm:w-auto"
                    >
                      <Link href="/contact?type=partnership">
                        Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      size="xl"
                      className="h-14 px-12 border-white/20 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      <Link href="/about">Learn About Us</Link>
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
