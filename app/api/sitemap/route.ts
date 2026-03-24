import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

const BASE_URL = 'https://securecollege.in'

export async function GET() {
  try {
    const supabase = createClient(env.supabase.url, env.supabase.anonKey)

    const { data: colleges } = await supabase
      .from('colleges')
      .select('slug, updated_at')
      .order('updated_at', { ascending: false })

    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/students', priority: 0.9, changefreq: 'weekly' },
      { url: '/colleges', priority: 0.9, changefreq: 'weekly' },
      { url: '/partner', priority: 0.8, changefreq: 'monthly' },
      { url: '/premium', priority: 0.7, changefreq: 'monthly' },
      { url: '/about', priority: 0.5, changefreq: 'monthly' },
      { url: '/contact', priority: 0.5, changefreq: 'monthly' },
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' },
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
    <url>
      <loc>${BASE_URL}${page.url}</loc>
      <priority>${page.priority}</priority>
      <changefreq>${page.changefreq}</changefreq>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
  
  ${colleges?.map(college => `
    <url>
      <loc>${BASE_URL}/colleges/${college.slug}</loc>
      <priority>0.8</priority>
      <changefreq>weekly</changefreq>
      <lastmod>${college.updated_at ? new Date(college.updated_at).toISOString() : new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)

    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${BASE_URL}/colleges</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${BASE_URL}/partner</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>`

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
