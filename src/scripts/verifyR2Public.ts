async function checkR2() {
  const urls = [
    'https://media.magicglass.co.in/products/details/frosted-office.jpg',
    'https://media.magicglass.co.in/products/details/frosted-bathroom.jpg',
    'https://media.magicglass.co.in/products/details/mirror-vanity.jpg',
    'https://media.magicglass.co.in/products/details/sentry-fins.jpg',
    'https://media.magicglass.co.in/products/details/acoustic-boardroom.jpg',
    'https://media.magicglass.co.in/products/details/furniture.png',
    'https://media.magicglass.co.in/products/toughened-glass.png'
  ]
  console.log('Testing R2 public domain accessibility...')
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' })
      console.log(`✓ [${res.status}] ${u} (${res.headers.get('content-type')})`)
    } catch (e: any) {
      console.error(`❌ [ERROR] ${u}:`, e.message)
    }
  }
}
checkR2()
