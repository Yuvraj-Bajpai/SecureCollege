import 'dotenv/config'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createClient } from '@supabase/supabase-js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'


const supabase = createClient(supabaseUrl, supabaseAnonKey)

type SeedCollege = {
  name: string
  slug: string
  city: string
  state: string
  estd?: number
  affiliation?: string
  approvals?: string[]
  campusArea?: string
  intake?: number
  rating?: number
  highestPackage?: string
  averagePackage?: string
  placementPercent?: string
  notableRecruiters?: string[]
  description?: string
}

type SeedPayload = {
  colleges: SeedCollege[]
}


async function main() {
  const collegesDataPath = join(__dirname, '../lib/data/colleges-seed.json')
  const collegesData = await import(collegesDataPath, { assert: { type: 'json' } }).then(m => m.default as SeedPayload)


  console.log('Starting college seed...')
  console.log(`Total colleges to insert: ${collegesData.colleges.length}`)


  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Error: Supabase environment variables not set!')
    process.exit(1)
  }


  try {
    const batchSize = 10
    let successCount = 0
    let errorCount = 0


    for (let i = 0; i < collegesData.colleges.length; i += batchSize) {
      const batch = collegesData.colleges.slice(i, i + batchSize).map((college) => ({
        name: college.name,
        slug: college.slug,
        city: college.city,
        state: college.state,
        estd: college.estd,
        affiliation: college.affiliation,
        approvals: college.approvals,
        campusarea: college.campusArea,
        intake: college.intake,
        rating: college.rating,
        highestpackage: college.highestPackage,
        averagepackage: college.averagePackage,
        placementpercent: college.placementPercent,
        notablerecruiters: college.notableRecruiters,
        description: college.description,
      }))
      
      const { data, error } = await supabase
        .from('colleges')
        .insert(batch)
        .select()


      if (error) {
        console.error(`Batch ${i / batchSize + 1} failed:`, error)
        errorCount += batch.length
      } else {
        console.log(`✅ Batch ${i / batchSize + 1} inserted: ${data?.length || 0} colleges`)
        successCount += data?.length || 0
      }


      await new Promise(resolve => setTimeout(resolve, 500))
    }


    console.log(`\n✅ Seeding complete!`)
    console.log(`Successfully inserted: ${successCount} colleges`)
    if (errorCount > 0) {
      console.log(`❌ Failed to insert: ${errorCount} colleges`)
      process.exit(1)
    }
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err)
    process.exit(1)
  }
}


main()
