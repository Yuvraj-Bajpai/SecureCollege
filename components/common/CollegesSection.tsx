'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CollegeCard, type CollegeCardData } from '@/components/common/CollegeCard'
import { supabase } from '@/lib/supabase'

export default function CollegesSection() {
  const [items, setItems] = useState<CollegeCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('colleges')
        .select('name,slug,city,state,rating,highestpackage,averagepackage,placementpercent')
        .order('rating', { ascending: false })
        .limit(12)
      if (!isMounted) return
      if (error) {
        setItems([])
        setLoading(false)
        return
      }
      const mapped: CollegeCardData[] = (data || []).map((c: any) => ({
        id: c.slug || c.name,
        name: c.name,
        city: c.city,
        state: c.state,
        category: 'Engineering',
        logo: '/images/logo.png',
        rating: Number(c.rating) || 0,
        placementPercent: c.placementpercent || undefined,
        averagePackage: c.averagepackage || undefined,
        highestPackage: c.highestpackage || undefined,
        highlight: false,
      }))
      setItems(mapped)
      setLoading(false)
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900" data-animate>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Top Engineering Colleges in India
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the best engineering colleges ranked by students, placements, and infrastructure
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((college, idx) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <CollegeCard college={college} />
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Button variant="outline" asChild size="lg">
            <Link href="/colleges">View All Colleges</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

