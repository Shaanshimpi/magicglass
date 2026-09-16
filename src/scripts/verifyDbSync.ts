import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const EXPECTED_PRODUCTS = [
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
]

async function verifyDb() {
  console.log('🔍 Connecting to Payload CMS & PostgreSQL database...')
  const payload = await getPayload({ config: configPromise })

  console.log('📦 Querying all products from database collection `products`...')
  const res = await payload.find({
    collection: 'products',
    limit: 100,
  })

  console.log(`Found ${res.docs.length} products in DB.`);
  const dbSlugs = res.docs.map(d => d.slug);
  console.log('DB Slugs:', dbSlugs);

  // 1. Check for missing or extra products
  const missingInDb = EXPECTED_PRODUCTS.filter(s => !dbSlugs.includes(s));
  const unexpectedInDb = dbSlugs.filter(s => !EXPECTED_PRODUCTS.includes(s as string));

  if (missingInDb.length > 0) {
    console.error('❌ Missing products in DB:', missingInDb);
  } else {
    console.log('✓ All 16 authentic products exist in DB.');
  }

  if (unexpectedInDb.length > 0) {
    console.error('❌ Unexpected/stale products found in DB:', unexpectedInDb);
  } else {
    console.log('✓ Zero unexpected or stale products in DB.');
  }

  // 2. Deep audit of each product in DB
  const publicDir = path.resolve(process.cwd(), 'public');
  let totalImagesChecked = 0;
  let missingImages: string[] = [];
  let issues: string[] = [];

  for (const doc of res.docs as any[]) {
    console.log(`\n--- Inspecting [${doc.slug}] "${doc.title}" ---`);
    console.log(`  Category: ${doc.category}`);
    console.log(`  Subheading: ${doc.subheading}`);
    console.log(`  Intro Summary length: ${doc.introSummary?.length || 0} chars`);
    console.log(`  Specs count: ${doc.specs?.length || 0}`);
    console.log(`  Gallery images count: ${doc.galleryImages?.length || 0}`);
    console.log(`  Industries count: ${doc.industries?.length || 0}`);

    // Verify fields are not empty
    if (!doc.title) issues.push(`${doc.slug}: Missing title`);
    if (!doc.category) issues.push(`${doc.slug}: Missing category`);
    if (!doc.introSummary) issues.push(`${doc.slug}: Missing introSummary`);
    if (!doc.specs || doc.specs.length === 0) issues.push(`${doc.slug}: Missing specs`);
    if (!doc.galleryImages || doc.galleryImages.length === 0) issues.push(`${doc.slug}: Missing galleryImages`);

    // Check images
    const imagesToCheck: string[] = [];
    if (doc.heroImageUrl) imagesToCheck.push(doc.heroImageUrl);
    if (doc.detailImages) {
      doc.detailImages.forEach((d: any) => { if (d.imageUrl) imagesToCheck.push(d.imageUrl); });
    }
    if (doc.galleryImages) {
      doc.galleryImages.forEach((g: any) => { if (g.src) imagesToCheck.push(g.src); });
    }
    if (doc.industries) {
      doc.industries.forEach((ind: any) => { if (ind.imageUrl) imagesToCheck.push(ind.imageUrl); });
    }
    if (doc.sliderImages) {
      doc.sliderImages.forEach((s: any) => { if (s.src) imagesToCheck.push(s.src); });
    }
    if (doc.specs) {
      doc.specs.forEach((s: any) => { if (s.icon) imagesToCheck.push(s.icon); });
    }

    for (const imgPath of imagesToCheck) {
      totalImagesChecked++;
      if (imgPath.startsWith('http')) {
        issues.push(`${doc.slug}: Remote image hotlink detected: ${imgPath}`);
      } else {
        const cleanPath = imgPath.split('?')[0];
        const diskPath = path.join(publicDir, cleanPath.replace(/^\//, ''));
        if (!fs.existsSync(diskPath)) {
          missingImages.push(`${doc.slug} -> ${imgPath} (missing at ${diskPath})`);
        }
      }
    }
  }

  // 3. Inspect Products Page Global in DB
  console.log('\n--- Inspecting `products-page` Global in DB ---');
  const productsPageGlobal = await payload.findGlobal({ slug: 'products-page' }) as any;
  console.log('Title:', productsPageGlobal?.hero?.title);
  console.log('Featured Systems count:', productsPageGlobal?.featuredSystems?.length);
  console.log('Categories Nav count:', productsPageGlobal?.categoriesNav?.length);

  productsPageGlobal?.featuredSystems?.forEach((f: any, idx: number) => {
    console.log(`  Featured [${idx + 1}]: ${f.title} (${f.productSlug}) - Category: ${f.categoryLabel} - Badge: ${f.badgeText}`);
    if (f.featuredImageUrl) {
      totalImagesChecked++;
      const diskPath = path.join(publicDir, f.featuredImageUrl.replace(/^\//, ''));
      if (!fs.existsSync(diskPath)) {
        missingImages.push(`Featured System -> ${f.featuredImageUrl}`);
      }
    }
  });

  productsPageGlobal?.categoriesNav?.forEach((c: any) => {
    console.log(`  Category [${c.code}]: ${c.label} (${c.id})`);
  });

  console.log('\n=======================================');
  console.log(`SUMMARY OF DB AUDIT:`);
  console.log(`Total Products in DB: ${res.docs.length} (Expected: 16)`);
  console.log(`Total Image References Checked in DB: ${totalImagesChecked}`);
  console.log(`Missing Image Files: ${missingImages.length}`);
  console.log(`Data Issues: ${issues.length}`);

  if (missingImages.length > 0) {
    console.error('\nMissing images on disk:');
    missingImages.forEach(m => console.error('  ' + m));
  }

  if (issues.length > 0) {
    console.error('\nData issues:');
    issues.forEach(i => console.error('  ' + i));
  }

  if (res.docs.length === 16 && missingImages.length === 0 && issues.length === 0 && missingInDb.length === 0 && unexpectedInDb.length === 0) {
    console.log('\n🎉 DATABASE IS 100% IN SYNC WITH MAGIC GLASS PRODUCTS, DATA, AND IMAGES!');
  } else {
    console.error('\n❌ DATABASE AUDIT DETECTED INCONSISTENCIES!');
    process.exit(1);
  }
}

verifyDb()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error during DB verification:', err);
    process.exit(1);
  });
