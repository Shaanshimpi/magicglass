import fs from 'fs'
import path from 'path'
import industrySolutionsMock from '../data/industry_solutions_mock.json'
import infrastructureMock from '../data/infrastructure_mock.json'
import projectsMock from '../data/projects_mock.json'
import contactUsMock from '../data/contact_us_mock.json'
import { PDP_MOCK_DATA } from '../components/PDP/pdpData'
import { ALL_PRODUCTS, TOP_3_FEATURED } from '../components/ProductsCollection/products.data'

const publicDir = path.resolve(process.cwd(), 'public')

console.log('====================================================')
console.log('🔍 RUNNING COMPREHENSIVE SITE-WIDE DIAGNOSTIC AUDIT')
console.log('====================================================\n')

const missingAssets: string[] = []
const placeholderOccurrences: Array<{ file: string; url: string }> = []

function checkFile(relPath?: string, context?: string) {
  if (!relPath) return
  if (relPath.startsWith('http')) return
  const full = path.join(publicDir, relPath.replace(/^\//, ''))
  if (!fs.existsSync(full)) {
    console.log(`❌ Missing asset [${context}]: ${relPath}`)
    missingAssets.push(`${context}: ${relPath}`)
  }
}

// 1. Audit Products & PDP
console.log('1. Checking All Products & PDP Data (16 Products)...')
for (const [slug, p] of Object.entries(PDP_MOCK_DATA)) {
  checkFile(p.heroImage, `PDP Hero: ${slug}`)
  p.detailImages?.forEach((img, i) => checkFile(img, `PDP Detail ${i}: ${slug}`))
  p.galleryImageItems?.forEach((g, i) => checkFile(g.src, `PDP Gallery ${i}: ${slug}`))
  p.industries?.forEach((ind, i) => checkFile(ind.image, `PDP Industry ${i}: ${slug}`))
  p.sliderImages?.forEach((s: any, i) => {
    const src = typeof s === 'string' ? s : s.src
    checkFile(src, `PDP Slider ${i}: ${slug}`)
  })
}

// 2. Audit Products Collection page
console.log('\n2. Checking Products Collection (/products)...')
ALL_PRODUCTS.forEach((prod) => checkFile(prod.image, `Product Item: ${prod.id}`))
TOP_3_FEATURED.forEach((prod) => checkFile(prod.image, `Top Featured: ${prod.id}`))

// 3. Audit Industry Solutions
console.log('\n3. Checking Industry Solutions (/industry-solution)...')
checkFile(industrySolutionsMock.page?.heroImage, 'Industry Page Hero')
industrySolutionsMock.industries?.forEach((ind) => {
  checkFile(ind.image, `Industry: ${ind.id}`)
})

// 4. Audit Infrastructure
console.log('\n4. Checking Infrastructure (/infrastructure)...')
checkFile(infrastructureMock.page?.heroImage, 'Infrastructure Page Hero')
infrastructureMock.industries?.forEach((fac: any) => {
  checkFile(fac.image, `Facility: ${fac.id}`)
})

// 5. Audit Projects Portfolio
console.log('\n5. Checking Projects Portfolio (/projects)...')
projectsMock.forEach((proj: any) => {
  checkFile(proj.image, `Project: ${proj.title}`)
})

// 6. Audit Contact Us
console.log('\n6. Checking Contact Us (/contact-us)...')
checkFile(contactUsMock.page?.heroImage, 'Contact Us Hero')

// 7. Search for Unsplash or generic placeholder links in src/
console.log('\n7. Scanning source code for external placeholder domains...')
function scanSrcDir(dir: string) {
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const full = path.join(dir, f)
    if (fs.statSync(full).isDirectory()) {
      scanSrcDir(full)
    } else if (/\.(tsx|ts|jsx|js|json)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf-8')
      const matches = content.match(/https?:\/\/(images\.unsplash\.com|via\.placeholder\.com|picsum\.photos)[^\s"'`)]+/g)
      if (matches) {
        matches.forEach((url) => {
          placeholderOccurrences.push({ file: path.relative(process.cwd(), full), url })
        })
      }
    }
  }
}
scanSrcDir(path.resolve(process.cwd(), 'src'))

console.log('\n====================================================')
console.log('📊 DIAGNOSTIC RESULTS:')
console.log(`- Total Missing Assets: ${missingAssets.length}`)
if (missingAssets.length > 0) {
  missingAssets.forEach((m) => console.log(`   ⚠️ ${m}`))
} else {
  console.log('   ✓ Zero missing asset files across all mock datasets!')
}

console.log(`- Total External Placeholder URLs: ${placeholderOccurrences.length}`)
if (placeholderOccurrences.length > 0) {
  placeholderOccurrences.forEach((p) => console.log(`   ⚠️ In ${p.file}: ${p.url}`))
} else {
  console.log('   ✓ Zero external placeholder URLs found in source code!')
}
console.log('====================================================\n')
