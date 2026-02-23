'use client'

import { useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/common/Logo'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

export default function SignupPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[32rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.18),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#5B8DEF]/12 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-indigo-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Logo size="lg" className="mx-auto mb-4" />
            <h1
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
              style={{ textShadow: '0 0 14px rgba(91, 141, 239, 0.25)' }}
            >
              Create your account
            </h1>
            <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto">
              Join Secure College and unlock premium, rank-based guidance for your dream college.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-primary/20 p-8">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#6B9EFF',
                      brandAccent: '#4A7FFF',
                      inputBackground: 'rgba(15,23,42,0.6)',
                      inputText: '#F9FAFB',
                    },
                    radii: {
                      borderRadiusButton: '9999px',
                      buttonBorderRadius: '9999px',
                      inputBorderRadius: '9999px',
                    },
                  },
                },
              }}
              providers={['google']}
              redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
              view="sign_up"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
