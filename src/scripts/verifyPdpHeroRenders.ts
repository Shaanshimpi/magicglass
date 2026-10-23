import http from 'http';

function checkUrl(urlPath: string): Promise<any> {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasHero = data.includes('/images/products/heroes/');
        const regex = /heroImageFrame[\s\S]*?<img[^>]+src=["']([^"']+)["']/i;
        const matches = data.match(regex);
        resolve({
          path: urlPath,
          status: res.statusCode,
          hasHero,
          imgSrc: matches ? decodeURIComponent(matches[1]) : 'NOT FOUND'
        });
      });
    }).on('error', (err) => resolve({ path: urlPath, error: err.message }));
  });
}

async function run() {
  const slugs = [
    'toughened-glass',
    'clear-glass',
    'extra-clear-glass',
    'hs-glass',
    'heat-soaked-glass',
    'sentry-laminated-glass',
    'acoustic-lami-glass',
    'pvb-laminated-glass',
    'insulated-glass-dgu',
    'dgu-laminated-glass',
    'high-performance-low-e-glass',
    'skn-ultra-high-performance-glass',
    'fire-safety-glass',
    'ceramic-glass',
    'frosted-glass',
    'mirror-glass'
  ];

  console.log('Verifying all 16 PDP routes on localhost:3000...\n');
  for (const s of slugs) {
    const res = await checkUrl('/products/' + s);
    console.log(`[${s}] -> Status: ${res.status}, Hero found: ${res.hasHero}, Image src: ${res.imgSrc}`);
  }
}

run();
