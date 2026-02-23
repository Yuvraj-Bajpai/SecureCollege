'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

export default function PremiumPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
            <CardContent className="p-8 md:p-10 text-center space-y-4">
              <p className="text-xs font-semibold tracking-widest text-[#8B5CF6]/90 uppercase">
                Premium
              </p>
              <h1
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
              >
                Premium is Coming Soon
              </h1>
              <p className="text-sm md:text-base text-[#A1A1AA] max-w-xl mx-auto">
                We&apos;re building a deeper, more personalized Secure College experience — early access will open
                soon. In the meantime, you can still explore colleges and book free counseling.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl"
                >
                  <Link href="/students">Book Free Counseling</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/students/colleges">Explore Colleges</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
