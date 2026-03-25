'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BookOpen, Calendar, Clock, Search, ArrowRight, Sparkles } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

type Category =
  | 'all'
  | 'featured'
  | 'admission'
  | 'course'
  | 'compare'
  | 'counseling'

type Post = {
  id: string
  title: string
  excerpt: string
  category: Exclude<Category, 'all'>
  date: string
  readMin: number
  featured?: boolean
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'admission', label: 'Admission guides' },
  { id: 'course', label: 'Course guides' },
  { id: 'compare', label: 'College comparison' },
  { id: 'counseling', label: 'Counseling' },
]

const POSTS: Post[] = [
  {
    id: '1',
    title: 'JEE Main to Admission: A Practical Timeline for 2026 Aspirants',
    excerpt:
      'Cutoff waves, choice filling, and document checks — a week-by-week checklist so you never miss a counseling round.',
    category: 'admission',
    date: 'Mar 18, 2025',
    readMin: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'B.Tech vs Integrated Programs: How to Choose Without Regret',
    excerpt:
      'We compare duration, exit options, and industry perception so you can align with your rank and long-term goals.',
    category: 'course',
    date: 'Mar 12, 2025',
    readMin: 10,
    featured: true,
  },
  {
    id: '3',
    title: 'MBA Admissions in India: CAT, XAT, and Beyond — What Actually Matters',
    excerpt:
      'Beyond percentiles: shortlists, fees, placements, and how to shortlist B-schools on a realistic budget.',
    category: 'course',
    date: 'Mar 08, 2025',
    readMin: 12,
    featured: true,
  },
  {
    id: '4',
    title: 'BCA vs B.Tech CS: Skills, Placements, and Who Each Path Fits',
    excerpt:
      'Not every rank needs a four-year engineering grind — here is an honest split for math comfort and career speed.',
    category: 'course',
    date: 'Mar 02, 2025',
    readMin: 9,
  },
  {
    id: '5',
    title: 'MCA After BCA: NIMCET, State Tests, and College Selection Tips',
    excerpt:
      'A focused guide for students aiming at tier-1 MCA programs without burning out on the wrong test.',
    category: 'course',
    date: 'Feb 26, 2025',
    readMin: 7,
  },
  {
    id: '6',
    title: 'BBA + MBA Track: When a Five-Year Route Makes Financial Sense',
    excerpt:
      'Integrated programs can save a year — we break down when they beat the traditional BBA → CAT path.',
    category: 'course',
    date: 'Feb 20, 2025',
    readMin: 8,
  },
  {
    id: '7',
    title: 'B.Pharm College Selection: Approvals, Hospitals, and Career Exits',
    excerpt:
      'From PCI approvals to clinical exposure — the checklist parents and students forget until semester two.',
    category: 'course',
    date: 'Feb 14, 2025',
    readMin: 11,
  },
  {
    id: '8',
    title: 'Side-by-Side College Comparison: Fees, Placements, and Red Flags',
    excerpt:
      'How to read NIRF, NAAC, and placement PDFs without getting fooled by cherry-picked averages.',
    category: 'compare',
    date: 'Feb 08, 2025',
    readMin: 9,
  },
  {
    id: '9',
    title: 'How to Read a Placement Report Like an Analyst (Quick Framework)',
    excerpt:
      'Median vs average, batch size, and role quality — three numbers that change every “90% placed” claim.',
    category: 'compare',
    date: 'Feb 01, 2025',
    readMin: 6,
  },
  {
    id: '10',
    title: 'Free Counseling: What to Ask in the First 15 Minutes',
    excerpt:
      'Rank, budget, geography, and risk tolerance — the four buckets that turn a vague call into a plan.',
    category: 'counseling',
    date: 'Jan 28, 2025',
    readMin: 5,
  },
  {
    id: '11',
    title: 'Scholarship Forms You Can Still Target After Board Results',
    excerpt:
      'State schemes, institution merit lists, and external trusts that our 50+ partner colleges see every year.',
    category: 'admission',
    date: 'Jan 22, 2025',
    readMin: 7,
  },
  {
    id: '12',
    title: 'Hostel and City Cost Reality Check Before You Pay the Seat Fee',
    excerpt:
      'A simple worksheet for rent, food, and commute so “affordable tuition” does not become a shock.',
    category: 'featured',
    date: 'Jan 15, 2025',
    readMin: 6,
    featured: true,
  },
]

export default function BlogPage() {
  const { openModal } = useBookingModal()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')

  const filtered = useMemo(() => {
    return POSTS.filter((post) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      const matchesCat =
        category === 'all' ||
        (category === 'featured' ? post.featured : post.category === category)
      return matchesQuery && matchesCat
    })
  }, [query, category])

  const featuredStrip = POSTS.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)] blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Blogs &amp; resources
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}>
            Smarter admissions for every course
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#A1A1AA]">
            Guides and tips for students exploring 50+ verified colleges on Secure College — from BTech and MBA to
            pharmacy and integrated programs.
          </p>
        </motion.div>

        <div className="mt-10 max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1A1AA]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="h-12 pl-12 bg-white/5 border-white/15 text-white placeholder:text-[#A1A1AA]"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'border-white/20 bg-white text-black'
                  : 'border-white/10 bg-white/5 text-[#A1A1AA] hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Featured this month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredStrip.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-primary-glow transition-shadow">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-4 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-primary/80" />
                    </div>
                    <p className="text-xs text-[#A1A1AA] flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readMin} min
                      </span>
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white leading-snug">{post.title}</h3>
                    <p className="mt-2 text-sm text-[#A1A1AA] flex-1 leading-relaxed">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/90">
                      Read guide
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-white mb-6">All articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <Card key={post.id} className="border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-primary-glow transition-shadow">
                <CardContent className="p-5">
                  <div className="h-36 rounded-xl bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a] border border-white/10 mb-4" />
                  <p className="text-xs text-[#A1A1AA] flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMin} min read
                    </span>
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-white leading-snug">{post.title}</h3>
                  <p className="mt-2 text-sm text-[#A1A1AA] line-clamp-3">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-wide text-primary">
                    {post.category.replace(/-/g, ' ')}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="text-center text-[#A1A1AA] py-12">No articles match your filters. Try another category or search.</p>
          ) : null}
        </section>

        <section className="mt-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Want a personalized plan?</h2>
          <p className="mt-3 text-[#A1A1AA] max-w-xl mx-auto">
            Book a free counseling call — we’ll help you shortlist from our 50+ verified partner colleges.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold" onClick={openModal}>
              Book free counseling
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link href="/colleges">Explore colleges</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
