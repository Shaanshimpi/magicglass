async function verifyVercel() {
  const baseUrl = 'https://magicglass-five.vercel.app'
  const routes = [
    '/',
    '/products',
    '/products/frosted-glass',
    '/products/mirror-glass',
    '/products/sentry-laminated-glass',
    '/products/acoustic-lami-glass',
    '/products/toughened-glass',
    '/products/ceramic-glass',
    '/products/fire-safety-glass',
    '/products/insulated-glass-dgu',
  ]

  console.log(`🌐 Auditing live Vercel deployment: ${baseUrl}...\n`)

  let hasErrors = false

  for (const route of routes) {
    const url = `${baseUrl}${route}`
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } })
      if (res.status !== 200) {
        console.error(`❌ [HTTP ${res.status}] ${url}`)
        hasErrors = true
        continue
      }

      const html = await res.text()

      // 1. Check for black couch fallback
      const hasSofa = html.includes('photo-1513694203232-719a280e022f')
      if (hasSofa) {
        console.error(`🚨 ALERT: Black sofa fallback still found on ${url}!`)
        hasErrors = true
      } else {
        console.log(`✓ [200 OK] ${route} - No sofa fallback`)
      }

      // 2. Specific asset checks for frosted-glass
      if (route === '/products/frosted-glass') {
        const hasOffice = html.includes('frosted-office')
        const hasBath = html.includes('frosted-bathroom')
        console.log(`   - frosted-office image referenced: ${hasOffice}`)
        console.log(`   - frosted-bathroom image referenced: ${hasBath}`)
      }

      // 3. Specific asset checks for mirror-glass
      if (route === '/products/mirror-glass') {
        const hasVanity = html.includes('mirror-vanity')
        const hasWall = html.includes('mirror-wall')
        console.log(`   - mirror-vanity image referenced: ${hasVanity}`)
        console.log(`   - mirror-wall image referenced: ${hasWall}`)
      }
    } catch (err: any) {
      console.error(`❌ Error fetching ${url}:`, err.message)
      hasErrors = true
    }
  }

  // 4. Test image assets directly on Vercel
  console.log('\n🖼️ Testing key static image assets directly on Vercel...')
  const testAssets = [
    '/images/products/details/frosted-office.jpg',
    '/images/products/details/frosted-bathroom.jpg',
    '/images/products/details/mirror-vanity.jpg',
    '/images/products/details/mirror-wall.jpg',
    '/images/products/details/sentry-fins.jpg',
    '/images/products/details/dgu-facade.jpg',
    '/images/products/details/acoustic-boardroom.jpg',
    '/images/products/details/ceramic-frit.jpg',
    '/images/products/details/fire-doors.jpg',
    '/images/projects/solitaire-business-hub.jpg',
  ]

  for (const asset of testAssets) {
    const assetUrl = `${baseUrl}${asset}`
    try {
      const res = await fetch(assetUrl, { method: 'HEAD' })
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${asset}`)
      } else {
        console.error(`❌ [HTTP ${res.status}] ${asset}`)
        hasErrors = true
      }
    } catch (err: any) {
      console.error(`❌ Failed fetching asset ${asset}:`, err.message)
      hasErrors = true
    }
  }

  if (!hasErrors) {
    console.log('\n🎉 VERCEL DEPLOYMENT FULLY VERIFIED! Everything is live, correct, and 200 OK!')
  } else {
    console.log('\n⚠️ Some issues found on Vercel deployment (check if Vercel is still building the latest commit).')
  }
}

verifyVercel()
