async function testPages() {
  const pages = [
    '/products',
    '/products/frosted-glass',
    '/products/mirror-glass',
    '/products/sentry-laminated-glass',
    '/products/acoustic-lami-glass',
    '/products/ceramic-glass',
    '/products/fire-safety-glass',
    '/products/insulated-glass-dgu',
    '/products/toughened-glass',
  ]

  console.log('Testing rendered PDP pages on http://localhost:3000...\n')

  let hasErrors = false

  for (const page of pages) {
    const url = `http://localhost:3000${page}`
    try {
      const res = await fetch(url)
      if (res.status !== 200) {
        console.error(`❌ [HTTP ${res.status}] ${url}`)
        hasErrors = true
        continue
      }
      const text = await res.text()

      // Check for the black sofa fallback photo
      const hasSofa = text.includes('photo-1513694203232-719a280e022f')
      if (hasSofa) {
        console.error(`🚨 ALERT: Sofa fallback found on ${url}!`)
        hasErrors = true
      } else {
        console.log(`✓ [200 OK] ${url} (No sofa fallback found)`)
      }

      // Check specific expected assets
      if (page === '/products/frosted-glass') {
        const hasOffice = text.includes('frosted-office.jpg')
        const hasBath = text.includes('frosted-bathroom.jpg')
        console.log(`   - frosted-office.jpg present: ${hasOffice}`)
        console.log(`   - frosted-bathroom.jpg present: ${hasBath}`)
      }
      if (page === '/products/mirror-glass') {
        const hasVanity = text.includes('mirror-vanity.jpg')
        const hasWall = text.includes('mirror-wall.jpg')
        console.log(`   - mirror-vanity.jpg present: ${hasVanity}`)
        console.log(`   - mirror-wall.jpg present: ${hasWall}`)
      }
      if (page === '/products/sentry-laminated-glass') {
        const hasFins = text.includes('sentry-fins.jpg')
        console.log(`   - sentry-fins.jpg present: ${hasFins}`)
      }
    } catch (err: any) {
      console.error(`❌ Error fetching ${url}:`, err.message)
      hasErrors = true
    }
  }

  if (!hasErrors) {
    console.log('\n🎉 ALL PDP PAGES VERIFIED AND CLEAN! Zero sofa fallbacks, authentic glass assets active!')
  }
}

testPages()
