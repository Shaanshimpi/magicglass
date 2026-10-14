import fs from 'fs'
import path from 'path'
import { PDP_MOCK_DATA } from '../components/PDP/pdpData'

const publicDir = path.resolve(process.cwd(), 'public')

console.log('Auditing PDP_MOCK_DATA for all 16 products...\n')

for (const [slug, prod] of Object.entries(PDP_MOCK_DATA)) {
  console.log(`=== [${prod.indexNumber}] ${prod.title} (${slug}) ===`)

  // Check detailImages
  const detail = prod.detailImages || []
  console.log('  detailImages:', detail)
  for (const img of detail) {
    const localPath = path.join(publicDir, img.replace(/^\//, ''))
    const exists = fs.existsSync(localPath)
    if (!exists) {
      console.log(`    ⚠️ MISSING FILE: ${img}`)
    }
  }

  // Check galleryImages
  const gallery = (prod.galleryImageItems || []).map((g) => g.src)
  console.log('  galleryImages:', gallery)
  for (const img of gallery) {
    const localPath = path.join(publicDir, img.replace(/^\//, ''))
    const exists = fs.existsSync(localPath)
    if (!exists) {
      console.log(`    ⚠️ MISSING FILE: ${img}`)
    }
  }

  // Check for duplicates between detailImages and gallery
  const duplicates = detail.filter((d) => gallery.includes(d))
  if (duplicates.length > 0) {
    console.log(`    🚨 DUPLICATE between detailImages and gallery:`, duplicates)
  }

  // Check sliderImages
  const slider = (prod.sliderImages || []).map((s) => (typeof s === 'string' ? s : s.src))
  console.log('  sliderImages count:', slider.length)
}
