import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { PDP_MOCK_DATA } from '../components/PDP/pdpData'
import { resolveProjectInfo } from '../components/PDP/pdpProjectsRegistry'

async function seedProducts() {
  console.log('🚀 Starting targeted Products Collection DB Seeding...')
  const payload = await getPayload({ config: configPromise })

  const validSlugs = Object.keys(PDP_MOCK_DATA)
  console.log(`Found ${validSlugs.length} authentic glass products to sync...`)

  for (const [pSlug, pData] of Object.entries(PDP_MOCK_DATA)) {
    console.log(`\nSyncing [${pData.indexNumber}] ${pData.title} (${pSlug})...`)

    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: pSlug } },
      limit: 1,
    })

    const payloadProductData: any = {
      slug: pSlug,
      indexNumber: pData.indexNumber,
      title: pData.title,
      subheading: pData.subheading,
      category: pData.category,
      heroImageUrl: pData.heroImage,
      introSummary: pData.introSummary,
      secondaryText: pData.secondaryText,
      detailImages: (pData.detailImages || []).map((img) => ({ imageUrl: img })),
      characteristics: (pData.characteristics || []).map((c) => ({ item: c })),
      specs: (pData.specs || []).map((s) => ({
        icon: s.icon,
        label: s.label,
        value: s.value,
      })),
      galleryTitle: pData.galleryTitle || 'Glass Applications',
      galleryImages: (pData.galleryImageItems || []).map((g: any) => ({
        title: g.title || '',
        src: g.src,
      })),
      industries: (pData.industries || []).map((ind) => ({
        title: ind.title,
        description: ind.description,
        imageUrl: ind.image,
      })),
      sliderImages: (pData.sliderImages || []).map((s) => {
        const p = resolveProjectInfo(s)
        return {
          src: p.src,
          title: p.title,
          developer: p.developer,
          location: p.location,
          category: p.category,
        }
      }),
      relatedProductSlugs: (pData.relatedProductIds || []).map((r) => ({ slug: r })),
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: payloadProductData,
      })
      console.log(`  ✓ Updated in DB: ${pData.title}`)
    } else {
      await payload.create({
        collection: 'products',
        data: payloadProductData,
      })
      console.log(`  + Created in DB: ${pData.title}`)
    }
  }

  console.log('\n✅ All 16 glass products successfully synchronized in Neon Postgres DB!')
  process.exit(0)
}

seedProducts().catch((err) => {
  console.error('Fatal error during product seeding:', err)
  process.exit(1)
})
