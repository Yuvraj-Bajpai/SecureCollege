const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// Minimal .env loader so we don't depend on extra packages
function loadEnvFromFile(filename) {
  const envPath = path.join(__dirname, '..', filename)
  if (!fs.existsSync(envPath)) return

  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue

    const key = trimmed.slice(0, eqIdx).trim()
    let value = trimmed.slice(eqIdx + 1).trim()

    // Remove optional surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

// Load .env.local first (Next.js convention), then fall back to .env
loadEnvFromFile('.env.local')
loadEnvFromFile('.env')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase environment variables not set!')
  console.error('Looked for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local or .env at project root.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  const collegesDataPath = path.join(__dirname, '..', 'lib', 'data', 'colleges-seed.json')
  const raw = fs.readFileSync(collegesDataPath, 'utf-8')
  const collegesData = JSON.parse(raw)

  console.log('Starting college seed...')
  console.log(`Total colleges to insert: ${collegesData.colleges.length}`)

  try {
    const batchSize = 10
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < collegesData.colleges.length; i += batchSize) {
      const rawBatch = collegesData.colleges.slice(i, i + batchSize)

      // Map seed keys (camelCase) to expected snake_case columns in DB
      // Map to lowercase column names
      const batch = rawBatch.map((c) => ({
        name: c.name,
        slug: c.slug,
        city: c.city,
        state: c.state,
        estd: c.estd,
        affiliation: c.affiliation,
        approvals: c.approvals,
        campusarea: c.campusArea,
        intake: c.intake,
        rating: c.rating,
        highestpackage: c.highestPackage,
        averagepackage: c.averagePackage,
        placementpercent: c.placementPercent,
        notablerecruiters: c.notableRecruiters,
        description: c.description,
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

    console.log('\n✅ Seeding complete!')
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


