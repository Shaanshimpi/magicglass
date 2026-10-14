async function checkAllRoutes() {
  const routes = [
    '/',
    '/about',
    '/products',
    '/toughened-glass',
    '/industry-solution',
    '/infrastructure',
    '/projects',
    '/contact-us',
    // All 16 products
    '/products/toughened-glass',
    '/products/clear-glass',
    '/products/extra-clear-glass',
    '/products/hs-glass',
    '/products/heat-soaked-glass',
    '/products/sentry-laminated-glass',
    '/products/acoustic-lami-glass',
    '/products/pvb-laminated-glass',
    '/products/insulated-glass-dgu',
    '/products/dgu-laminated-glass',
    '/products/high-performance-low-e-glass',
    '/products/skn-ultra-high-performance-glass',
    '/products/fire-safety-glass',
    '/products/ceramic-glass',
    '/products/frosted-glass',
    '/products/mirror-glass',
  ]

  console.log(`Auditing all ${routes.length} main routes on http://localhost:3000...\n`)
  let passed = 0
  let failed = 0

  for (const r of routes) {
    const url = `http://localhost:3000${r}`
    try {
      const res = await fetch(url)
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${r}`)
        passed++
      } else {
        console.error(`❌ [HTTP ${res.status}] ${r}`)
        failed++
      }
    } catch (err: any) {
      console.error(`❌ [FETCH ERROR] ${r}:`, err.message)
      failed++
    }
  }

  console.log(`\nAudit Complete: ${passed} Passed, ${failed} Failed.`)
}

checkAllRoutes()
