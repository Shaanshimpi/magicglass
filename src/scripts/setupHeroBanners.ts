import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface HeroMapping {
  slug: string;
  source: string;
  destName: string;
}

const mappings: HeroMapping[] = [
  {
    slug: 'toughened-glass',
    source: 'public/images/temp_check/Mask-group-4.png',
    destName: 'toughened-glass.png',
  },
  {
    slug: 'clear-glass',
    source: 'public/images/temp_check/Clear-Glass.jpg',
    destName: 'clear-glass.jpg',
  },
  {
    slug: 'extra-clear-glass',
    source: 'public/images/temp_check/1900-px-890-pxExtra-Clear-Glass.jpg',
    destName: 'extra-clear-glass.jpg',
  },
  {
    slug: 'hs-glass',
    source: 'public/images/temp_check/HS-Glass-Banner.jpg',
    destName: 'hs-glass.jpg',
  },
  {
    slug: 'heat-soaked-glass',
    source: 'public/images/industry/Industry-Solution3-scaled.jpg',
    destName: 'heat-soaked-glass.jpg',
  },
  {
    slug: 'sentry-laminated-glass',
    source: 'public/images/temp_check/Sentry-banner.jpg',
    destName: 'sentry-laminated-glass.jpg',
  },
  {
    slug: 'acoustic-lami-glass',
    source: 'public/images/products/details/acoustic-hero-wide.jpg',
    destName: 'acoustic-lami-glass.jpg',
  },
  {
    slug: 'pvb-laminated-glass',
    source: 'public/images/temp_check/PVB-Laminated-Glass.jpg',
    destName: 'pvb-laminated-glass.jpg',
  },
  {
    slug: 'insulated-glass-dgu',
    source: 'public/images/temp_check/DGU-Glass.jpg',
    destName: 'insulated-glass-dgu.jpg',
  },
  {
    slug: 'dgu-laminated-glass',
    source: 'public/images/temp_check/Banner-1.png',
    destName: 'dgu-laminated-glass.png',
  },
  {
    slug: 'high-performance-low-e-glass',
    source: 'public/images/temp_check/High-Performance-Glass.jpg',
    destName: 'high-performance-low-e-glass.jpg',
  },
  {
    slug: 'skn-ultra-high-performance-glass',
    source: 'public/images/temp_check/SKN-–-Ultra-high-Performance-Glass.jpg',
    destName: 'skn-ultra-high-performance-glass.jpg',
  },
  {
    slug: 'fire-safety-glass',
    source: 'public/images/temp_check/Fire-Safety-Glass.jpg',
    destName: 'fire-safety-glass.jpg',
  },
  {
    slug: 'ceramic-glass',
    source: 'public/images/temp_check/Ceramic-Glass.jpg',
    destName: 'ceramic-glass.jpg',
  },
  {
    slug: 'frosted-glass',
    source: 'public/images/temp_check/Frosted-Glass.jpg',
    destName: 'frosted-glass.jpg',
  },
  {
    slug: 'mirror-glass',
    source: 'public/images/temp_check/Mirror-Glass.jpg',
    destName: 'mirror-glass.jpg',
  },
];

async function setup() {
  const targetDir = path.resolve('public/images/products/heroes');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Setting up high-res hero banners in ${targetDir}...\n`);

  for (const m of mappings) {
    const srcPath = path.resolve(m.source);
    const destPath = path.join(targetDir, m.destName);

    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Source not found: ${srcPath}`);
      continue;
    }

    fs.copyFileSync(srcPath, destPath);

    const meta = await sharp(destPath).metadata();
    const stats = fs.statSync(destPath);
    console.log(
      `✓ [${m.slug}] -> /images/products/heroes/${m.destName} (${meta.width}x${meta.height}, ${(stats.size / 1024).toFixed(0)} KB)`
    );
  }

  console.log('\nAll 16 product heroes successfully configured!');
}

setup().catch((e) => {
  console.error(e);
  process.exit(1);
});
