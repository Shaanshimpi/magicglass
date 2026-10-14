import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function checkDb() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 100,
  })

  console.log(`Found ${products.docs.length} products in DB:`)
  for (const doc of products.docs) {
    console.log(`\n--- Product: ${doc.title} (${doc.slug}) ---`)
    console.log('Hero Image:', JSON.stringify(doc.heroImage || doc.heroImageUrl))
    console.log('Detail Images:', JSON.stringify(doc.detailImages))
    console.log('Gallery Images:', JSON.stringify(doc.galleryImages))
    console.log('Industries:', JSON.stringify(doc.industries))
  }
}

checkDb()
