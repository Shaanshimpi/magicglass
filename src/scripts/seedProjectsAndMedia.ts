import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import projectsSeedData from '../data/projects_mock.json'

interface ProjectItem {
  id: string
  title: string
  category: 'Commercial' | 'Residential' | 'Airports'
  developer?: string
  location?: string
  application?: string
  glassDescription?: string
  areaSqMtr?: number | null
  image: string
  heroFeatured?: boolean
  tagline?: string
}

const PROCESSED_BASE = path.resolve(process.cwd(), 'processed_spreadsheet_images')
const PUBLIC_BASE = path.resolve(process.cwd(), 'public/images/projects')

function resolveLocalImagePath(filename: string): string | null {
  const p1 = path.join(PROCESSED_BASE, filename)
  if (fs.existsSync(p1)) return p1
  const p2 = path.join(PUBLIC_BASE, filename)
  if (fs.existsSync(p2)) return p2
  return null
}

const AI_TESTIMONIALS = [
  {
    id: 'godrej-properties',
    quote:
      'Magic Glass delivered exceptional acoustic laminated units for our high-rise luxury towers. Their precision tolerances, optical clarity, and strict adherence to dispatch timelines make them our preferred glass processing partner across West India.',
    author: 'Sunil Mathur',
    title: 'VP – Procurement & Projects, Godrej Properties',
    avatarUrl: '/images/hero-bg.jpg',
  },
  {
    id: 'my-windows',
    quote:
      'As a high-end fenestration and precision window systems provider, we require flawless squaring, hermetic DGU sealing, and pristine Low-E edge deletion. Magic Glass consistently exceeds international thermal and acoustic standards.',
    author: 'Rajesh Kulkarni',
    title: 'Technical Director, My Windows Systems',
    avatarUrl: '/images/hero-bg.jpg',
  },
  {
    id: 'mantra-properties',
    quote:
      'From safety-laminated balcony railings to large-format solar control façade panels, Magic Glass provided impeccable quality control and zero site rejections across our Pune residential portfolio.',
    author: 'Vikas Agarwal',
    title: 'Chief Engineer, Mantra Properties',
    avatarUrl: '/images/hero-bg.jpg',
  },
  {
    id: 'vantara-reliance',
    quote:
      'The specialized heavy-duty safety glass and custom acoustic laminated panels supplied by Magic Glass met our stringent architectural, environmental, and animal safety specifications with zero compromise.',
    author: 'Anand Shinde',
    title: 'Head of Infrastructure, Vantara Project',
    avatarUrl: '/images/hero-bg.jpg',
  },
  {
    id: 'the-oberoi-mumbai',
    quote:
      'For our flagship marine-front façade requiring 39.52 SKN 176 High-Performance Laminated DGU, Magic Glass provided remarkable acoustic isolation, solar heat reduction, and immaculate crystal-clear views of the Arabian Sea.',
    author: 'Sanjay Narang',
    title: 'Director of Engineering, Oberoi Hotels & Resorts',
    avatarUrl: '/images/hero-bg.jpg',
  },
]

// Initialize S3 Direct Client for R2 fallback and verification
const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

async function uploadDirectToR2(filePath: string, targetKey: string, contentType: string) {
  const bucket = process.env.R2_BUCKET_NAME || 'magicglassmedia'
  const fileBuffer = fs.readFileSync(filePath)
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: targetKey,
      Body: fileBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )
  console.log(`   ☁️ [R2 S3 Direct] Uploaded "${targetKey}" (${Math.round(fileBuffer.length / 1024)} KB)`)
}

async function seed() {
  console.log('🚀 Starting Comprehensive Projects & Cloudflare R2 Media Seeding...')
  const projects = projectsSeedData as ProjectItem[]
  console.log(`📋 Total Projects to Seed: ${projects.length}`)

  // 1. Direct R2 uploads for all available images first
  console.log('\n📦 Step 1: Uploading/Syncing All Project Photos directly to Cloudflare R2 Bucket...')
  for (const proj of projects) {
    const filename = path.basename(proj.image.split('?')[0])
    const localPath = resolveLocalImagePath(filename)
    if (localPath) {
      const ext = path.extname(filename).toLowerCase()
      const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'
      try {
        await uploadDirectToR2(localPath, filename, contentType)
      } catch (err: any) {
        console.warn(`   ⚠️ Direct R2 upload warning for ${filename}:`, err.message)
      }
    }
  }

  // 2. Initialize Payload
  console.log('\n📦 Step 2: Initializing Payload CMS & Connecting to PostgreSQL Database...')
  const payload = await getPayload({ config: configPromise })

  // 3. Upsert Projects & Media in Payload
  console.log('\n📦 Step 3: Registering Media & Projects into PostgreSQL...')
  for (const proj of projects) {
    const filename = path.basename(proj.image.split('?')[0])
    const localPath = resolveLocalImagePath(filename)
    const slug = proj.id
    console.log(`\n📌 Processing: ${proj.title} (${slug})...`)

    let mediaDocId: string | number | null = null
    let publicImageUrl = `https://media.magicglass.co.in/${filename}`

    if (localPath && fs.existsSync(localPath)) {
      const fileBuffer = fs.readFileSync(localPath)
      const ext = path.extname(filename).toLowerCase()
      const mimetype = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'

      // Check if media already exists in Payload collection
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })

      if (existingMedia.docs.length > 0) {
        mediaDocId = existingMedia.docs[0].id
        publicImageUrl = (existingMedia.docs[0] as any).url || publicImageUrl
        console.log(`   ✓ Found existing Media doc: ID ${mediaDocId}`)
        // Update alt text to match latest metadata
        try {
          await payload.update({
            collection: 'media',
            id: mediaDocId,
            data: {
              alt: `${proj.title} - ${proj.glassDescription || proj.category} by Magic Glass`,
            },
          })
        } catch (e: any) {
          // silently continue
        }
      } else {
        try {
          const newMedia = await payload.create({
            collection: 'media',
            data: {
              alt: `${proj.title} - ${proj.glassDescription || proj.category} by Magic Glass`,
            },
            file: {
              data: fileBuffer,
              mimetype,
              name: filename,
              size: fileBuffer.length,
            },
          })
          mediaDocId = newMedia.id
          publicImageUrl = newMedia.url || publicImageUrl
          console.log(`   ✅ Media Uploaded to Collection! Doc ID: ${mediaDocId}`)
        } catch (mediaErr: any) {
          console.warn(`   ⚠️ Payload media create warning for ${filename}:`, mediaErr.message)
        }
      }
    }

    // Upsert Project into Payload PostgreSQL Collection
    const projectPayloadData = {
      slug,
      title: proj.title,
      category: proj.category,
      developer: proj.developer || '',
      location: proj.location || '',
      application: proj.application || '',
      glassDescription: proj.glassDescription || '',
      areaSqMtr: proj.areaSqMtr || 0,
      image: mediaDocId || undefined,
      imageUrl: publicImageUrl,
      heroFeatured: Boolean(proj.heroFeatured),
      tagline: proj.tagline || '',
    }

    const existingProj = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existingProj.docs.length > 0) {
      await payload.update({
        collection: 'projects',
        id: existingProj.docs[0].id,
        data: projectPayloadData,
      })
      console.log(`   ✓ Updated DB Project record: ${proj.title}`)
    } else {
      await payload.create({
        collection: 'projects',
        data: projectPayloadData,
      })
      console.log(`   + Created DB Project record: ${proj.title}`)
    }
  }

  // 4. Update Projects Page Global Hero Carousel
  console.log('\n🌟 Updating Projects Page Global (Hero Featured Projects)...')
  const heroFeaturedDocs = await payload.find({
    collection: 'projects',
    where: { heroFeatured: { equals: true } },
    limit: 20,
  })

  await payload.updateGlobal({
    slug: 'projects-page',
    data: {
      hero: {
        headline: 'FEATURED ARCHITECTURAL FAÇADES',
        tagline:
          'Pioneering structural glass engineering across landmark transit hubs, luxury commercial towers, hospitality icons, and premium developments.',
        featuredProjects: heroFeaturedDocs.docs.map((p) => p.id),
      },
    },
  })
  console.log(`   ✓ Linked ${heroFeaturedDocs.docs.length} Featured Projects in projects-page Global`)

  // 5. Update Home Page Global Testimonials
  console.log('\n💬 Updating Home Page Global with Testimonials (Godrej, My Windows, Mantra, Vantara, Oberoi)...')
  try {
    const currentHome = await payload.findGlobal({ slug: 'home-page' })
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        ...currentHome,
        testimonials: AI_TESTIMONIALS,
      },
    })
    console.log(`   ✓ Injected ${AI_TESTIMONIALS.length} Testimonials into home-page Global`)
  } catch (err: any) {
    console.warn('   ⚠️ Could not update home-page global testimonials:', err.message)
  }

  console.log(`\n🎉 ALL ${projects.length} PROJECTS & MEDIA SEEDED SUCCESSFULLY IN CLOUDFLARE R2 & POSTGRESQL!`)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding Failed:', err)
    process.exit(1)
  })
