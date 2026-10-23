import fs from 'fs';
import path from 'path';

const heroReplacements: Record<string, string> = {
  'toughened-glass': '/images/products/heroes/toughened-glass.png',
  'clear-glass': '/images/products/heroes/clear-glass.jpg',
  'extra-clear-glass': '/images/products/heroes/extra-clear-glass.jpg',
  'hs-glass': '/images/products/heroes/hs-glass.jpg',
  'heat-soaked-glass': '/images/products/heroes/heat-soaked-glass.jpg',
  'sentry-laminated-glass': '/images/products/heroes/sentry-laminated-glass.jpg',
  'acoustic-lami-glass': '/images/products/heroes/acoustic-lami-glass.jpg',
  'pvb-laminated-glass': '/images/products/heroes/pvb-laminated-glass.jpg',
  'insulated-glass-dgu': '/images/products/heroes/insulated-glass-dgu.jpg',
  'dgu-laminated-glass': '/images/products/heroes/dgu-laminated-glass.png',
  'high-performance-low-e-glass': '/images/products/heroes/high-performance-low-e-glass.jpg',
  'skn-ultra-high-performance-glass': '/images/products/heroes/skn-ultra-high-performance-glass.jpg',
  'fire-safety-glass': '/images/products/heroes/fire-safety-glass.jpg',
  'ceramic-glass': '/images/products/heroes/ceramic-glass.jpg',
  'frosted-glass': '/images/products/heroes/frosted-glass.jpg',
  'mirror-glass': '/images/products/heroes/mirror-glass.jpg',
};

const filePath = path.resolve('src/components/PDP/pdpData.ts');
let content = fs.readFileSync(filePath, 'utf8');

let count = 0;
for (const [slug, newHero] of Object.entries(heroReplacements)) {
  // Regex to match "id": "slug", ... "heroImage": "..."
  const regex = new RegExp(`("${slug}":\\s*\\{[\\s\\S]*?"id":\\s*"${slug}",[\\s\\S]*?"heroImage":\\s*)"[^"]+"`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1"${newHero}"`);
    console.log(`✓ Replaced heroImage for ${slug} -> ${newHero}`);
    count++;
  } else {
    console.error(`❌ Could not find match for ${slug}`);
  }
}

console.log(`\nReplaced ${count} of ${Object.keys(heroReplacements).length} hero images in pdpData.ts`);
fs.writeFileSync(filePath, content, 'utf8');
