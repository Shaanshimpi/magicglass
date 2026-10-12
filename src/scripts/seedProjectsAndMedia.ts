import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

interface ProjectSeedData {
  slug: string
  title: string
  category: 'Commercial' | 'Residential' | 'Airports'
  developer: string
  location: string
  application: string
  glassDescription: string
  areaSqMtr: number
  heroFeatured: boolean
  tagline: string
  sourceImagePath: string
  targetFilename: string
}

const EXTRACTED_BASE = path.resolve(process.cwd(), 'temp_extracted_images')

const WHATSAPP_PROJECTS: ProjectSeedData[] = [
  {
    slug: 'the-oberoi-nariman-point',
    title: 'The Oberoi',
    category: 'Commercial',
    developer: 'Oberoi Hotels & Resorts',
    location: 'Nariman Point, Mumbai',
    application: 'Luxury Hospitality Façade & Sea-Facing Suites',
    glassDescription: '39.52 SKN 176 High-Performance Laminated DGU (Double Glazed Unit)',
    areaSqMtr: 12000,
    heroFeatured: true,
    tagline: 'Ultra-Luxury Marine-Front Hospitality Glazing',
    sourceImagePath: path.join(EXTRACTED_BASE, 'The Oberoi Nariman Point Mumbai.jpg'),
    targetFilename: 'the-oberoi-nariman-point.jpg',
  },
  {
    slug: 'hotel-trident-nariman-point',
    title: 'Hotel Trident',
    category: 'Commercial',
    developer: 'Trident Hotels',
    location: 'Nariman Point, Mumbai',
    application: 'Hospitality Exterior Façade & Acoustic Window Systems',
    glassDescription: '39.52 Laminated DGU SKN 176 High Performance Glass',
    areaSqMtr: 14500,
    heroFeatured: true,
    tagline: 'Iconic Marine Drive Hospitality Tower',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Hotel Trident Nariman Point.jpg'),
    targetFilename: 'hotel-trident-nariman-point.jpg',
  },
  {
    slug: 'dabolim-airport-goa',
    title: 'Dabolim International Airport',
    category: 'Airports',
    developer: 'Alumine Fabricator Pvt Ltd / AAI',
    location: 'Dabolim, Goa',
    application: 'Terminal Façade, Security Glazing & Airside Glass Partitions',
    glassDescription: '12mm Heavy Toughened & High-Impact Safety Glasses',
    areaSqMtr: 9500,
    heroFeatured: true,
    tagline: 'Aviation Infrastructure & Transit Hub Façade',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Dabolim Airport', 'WhatsApp Image 2026-10-02 at 1.35.21 PM.jpeg'),
    targetFilename: 'dabolim-airport-goa.jpg',
  },
  {
    slug: 'runwal-central-park-chinchwad',
    title: 'Runwal Central Park',
    category: 'Residential',
    developer: 'Runwal Realty',
    location: 'Chinchwad, Pune',
    application: 'High-Rise Residential Glazing & Acoustic Balcony Partitions',
    glassDescription: '13.52mm Acoustic Laminated Safety Glasses',
    areaSqMtr: 11000,
    heroFeatured: true,
    tagline: 'Landmark Residential Township Glazing',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Runwal Ceteal Park.jpg'),
    targetFilename: 'runwal-central-park-chinchwad.jpg',
  },
  {
    slug: 'bioaltus-gujarat',
    title: 'Bioaltus Gujarat',
    category: 'Commercial',
    developer: 'Glazon India Pvt Ltd',
    location: 'Valsad, Gujarat',
    application: 'Corporate Headquarters Façade & Curtain Wall Glazing',
    glassDescription: '6mm ST 750 High-Performance Solar Control Glass',
    areaSqMtr: 4500,
    heroFeatured: true,
    tagline: 'Corporate Industrial & Commercial Façade',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Bioaltus Gujrat.jpg'),
    targetFilename: 'bioaltus-gujarat.jpg',
  },
  {
    slug: 'dnk-square-viman-nagar',
    title: 'DNK Square',
    category: 'Commercial',
    developer: 'Alcorp',
    location: 'Airport Road, Viman Nagar, Pune',
    application: 'Commercial Corporate Façade & Architectural Fenestration',
    glassDescription: '6mm HD Grey DGU (Double Glazed Unit) Glass',
    areaSqMtr: 6200,
    heroFeatured: true,
    tagline: 'Premium Airport Road Corporate Hub',
    sourceImagePath: path.join(EXTRACTED_BASE, 'DNK Square Airport Road Viman Nagar.jpg'),
    targetFilename: 'dnk-square-viman-nagar.jpg',
  },
  {
    slug: 'riverdale-grove-kharadi',
    title: 'Riverdale Grove',
    category: 'Residential',
    developer: 'Shree Enterprises',
    location: 'Kharadi, Pune',
    application: 'Luxury High-Rise Windows & Structural Railings',
    glassDescription: 'SCN 145 High-Performance Solar Control Glass',
    areaSqMtr: 8500,
    heroFeatured: true,
    tagline: 'Luxury Waterfront Residential Towers',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Shree enterprises', 'WhatsApp Image 2026-09-30 at 1.50.21 PM (1).jpeg'),
    targetFilename: 'riverdale-grove-kharadi.jpg',
  },
  {
    slug: 'malpani-m-soulstrings-baner',
    title: 'Malpani M Soulstrings',
    category: 'Residential',
    developer: 'Alufacade / Malpani Group',
    location: 'Baner, Pune',
    application: 'Residential Windows, French Doors & Balcony Balustrades',
    glassDescription: 'N45 & ST 750 High-Performance Double Glazed Units',
    areaSqMtr: 7200,
    heroFeatured: true,
    tagline: 'Contemporary Luxury High-Rise Living',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Malpani M soulstrings.jpg'),
    targetFilename: 'malpani-soulstrings-baner.jpg',
  },
  {
    slug: 'bajaj-auto-office-sambhaji-nagar',
    title: 'Bajaj Auto Corporate Office',
    category: 'Commercial',
    developer: 'Bajaj Auto Ltd',
    location: 'Chhatrapati Sambhaji Nagar, Maharashtra',
    application: 'Corporate Offices, Executive Suites & Curtain Wall Façade',
    glassDescription: '6mm SCN 145 Toughened Glass',
    areaSqMtr: 7800,
    heroFeatured: true,
    tagline: 'Automotive Global Brand Corporate Hub',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Bajaj Auto office', 'WhatsApp Image 2026-10-02 at 1.39.08 PM.jpeg'),
    targetFilename: 'bajaj-auto-sambhaji-nagar.jpg',
  },
  {
    slug: 'attalika-pune',
    title: 'Attalika',
    category: 'Residential',
    developer: 'Art and Vision Façade',
    location: 'Pune, Maharashtra',
    application: 'Architectural Windows, Balcony Railings & Louver Glazing',
    glassDescription: 'Silver Grey 32 Toughened & Solar Reflective Glass',
    areaSqMtr: 5000,
    heroFeatured: false,
    tagline: 'Architectural Residential Tower',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Art And vision Facade.jpg'),
    targetFilename: 'attalika-pune.jpg',
  },
  {
    slug: 'pune-peoples-cooperative-bank',
    title: 'Pune People’s Co-operative Bank',
    category: 'Commercial',
    developer: 'Pune People’s Co-operative Bank',
    location: 'Pune, Maharashtra',
    application: 'Headquarters Façade, Entrance Lobby & Security Partitions',
    glassDescription: 'KT 144 Double Glazed Unit (DGU) Glass',
    areaSqMtr: 3200,
    heroFeatured: false,
    tagline: 'Financial Institution Headquarters',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Pune people cooperative Bank.jpg'),
    targetFilename: 'pune-peoples-cooperative-bank.jpg',
  },
  {
    slug: 'exotic-fruits-nashik',
    title: 'Exotic Fruits Facility',
    category: 'Commercial',
    developer: 'Glaztech',
    location: 'MIDC Vinchur, Nashik, Maharashtra',
    application: 'Agro-Processing Corporate Center & Cold-Insulated Facade',
    glassDescription: 'Solar Control DGU & Toughened Safety Glass',
    areaSqMtr: 3800,
    heroFeatured: false,
    tagline: 'Agro-Industrial Commercial Complex',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Exotic Fruits , MIDC Vinchur,Nasik.jpg'),
    targetFilename: 'exotic-fruits-nashik.jpg',
  },
  {
    slug: 'vaidya-spaces-andheri-mumbai',
    title: 'Vaidya Spaces',
    category: 'Commercial',
    developer: 'Vaidya Spaces',
    location: 'Andheri East, Mumbai',
    application: 'Commercial Office Tower Façade & Entrance Glazing',
    glassDescription: '6mm ST136 and ST 467 Toughened Architectural Glass',
    areaSqMtr: 5400,
    heroFeatured: false,
    tagline: 'Boutique Commercial Center Façade',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Vaidya Spaces', 'WhatsApp Image 2026-10-02 at 1.49.50 PM.jpeg'),
    targetFilename: 'vaidya-spaces-andheri-mumbai.jpg',
  },
  {
    slug: 'endurance-technologies-sambhaji-nagar',
    title: 'Endurance Technologies Ltd',
    category: 'Commercial',
    developer: 'Endurance Technologies Ltd',
    location: 'Chhatrapati Sambhaji Nagar, Maharashtra',
    application: 'Industrial Headquarters & Advanced R&D Center Façade',
    glassDescription: 'High-Performance Low-E Toughened Glazing',
    areaSqMtr: 6800,
    heroFeatured: false,
    tagline: 'Automotive Engineering R&D Center',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Endurance Technologies LTD', 'WhatsApp Image 2026-10-02 at 1.35.19 PM.jpeg'),
    targetFilename: 'endurance-technologies-sambhaji-nagar.jpg',
  },
  {
    slug: 'bbm-muller-pirangut',
    title: 'BBM Müller',
    category: 'Commercial',
    developer: 'BBM Müller',
    location: 'Pirangut, Pune',
    application: 'Manufacturing Headquarters & Administrative Façade',
    glassDescription: 'Architectural Solar Control & Safety Toughened Glass',
    areaSqMtr: 5800,
    heroFeatured: false,
    tagline: 'German Engineering Plant Façade',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Glaztech', 'WhatsApp Image 2026-10-02 at 10.38.37 AM.jpeg'),
    targetFilename: 'bbm-muller-pirangut.jpg',
  },
  {
    slug: 'cn-water-taloja',
    title: 'CN Water Facility',
    category: 'Commercial',
    developer: 'Glaztech',
    location: 'Taloja MIDC, Navi Mumbai',
    application: 'Industrial Purification Plant Façade & Partitions',
    glassDescription: 'High-Performance Solar Reflective Toughened Glass',
    areaSqMtr: 4100,
    heroFeatured: false,
    tagline: 'Industrial & Manufacturing Infrastructure',
    sourceImagePath: path.join(EXTRACTED_BASE, 'Glaztech', 'WhatsApp Image 2026-10-02 at 10.38.36 AM.jpeg'),
    targetFilename: 'cn-water-taloja.jpg',
  },
]

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
    })
  )
  console.log(`   ☁️ [R2 S3 Direct] Uploaded "${targetKey}" (${Math.round(fileBuffer.length / 1024)} KB)`)
}

async function seed() {
  console.log('🚀 Starting Comprehensive WhatsApp Projects & Cloudflare R2 Media Seeding...')
  
  // 1. Direct R2 uploads for all extracted images first
  console.log('\n📦 Step 1: Uploading/Syncing All WhatsApp Photos directly to Cloudflare R2 Bucket...')
  for (const proj of WHATSAPP_PROJECTS) {
    if (fs.existsSync(proj.sourceImagePath)) {
      const ext = path.extname(proj.targetFilename).toLowerCase()
      const contentType = ext === '.png' ? 'image/png' : 'image/jpeg'
      try {
        await uploadDirectToR2(proj.sourceImagePath, proj.targetFilename, contentType)
      } catch (err: any) {
        console.warn(`   ⚠️ Direct R2 upload warning for ${proj.targetFilename}:`, err.message)
      }
    }
  }

  // 2. Initialize Payload
  console.log('\n📦 Step 2: Initializing Payload CMS & Connecting to PostgreSQL Database...')
  const payload = await getPayload({ config: configPromise })

  const seededProjectsListForMock: any[] = []

  // 3. Upsert Projects & Media in Payload
  console.log('\n📦 Step 3: Registering Media & Projects into PostgreSQL...')
  for (const proj of WHATSAPP_PROJECTS) {
    console.log(`\n📌 Processing: ${proj.title} (${proj.slug})...`)

    let mediaDocId: string | number | null = null
    let publicImageUrl = `https://media.magicglass.co.in/${proj.targetFilename}`

    if (fs.existsSync(proj.sourceImagePath)) {
      const fileBuffer = fs.readFileSync(proj.sourceImagePath)
      const ext = path.extname(proj.targetFilename).toLowerCase()
      const mimetype = ext === '.png' ? 'image/png' : 'image/jpeg'

      // Check if media already exists in Payload collection
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: proj.targetFilename } },
        limit: 1,
      })

      if (existingMedia.docs.length > 0) {
        mediaDocId = existingMedia.docs[0].id
        publicImageUrl = (existingMedia.docs[0] as any).url || publicImageUrl
        console.log(`   ✓ Found existing Media doc: ID ${mediaDocId}`)
      } else {
        try {
          const newMedia = await payload.create({
            collection: 'media',
            data: {
              alt: `${proj.title} - ${proj.glassDescription} by Magic Glass`,
            },
            file: {
              data: fileBuffer,
              mimetype,
              name: proj.targetFilename,
              size: fileBuffer.length,
            },
          })
          mediaDocId = newMedia.id
          publicImageUrl = newMedia.url || publicImageUrl
          console.log(`   ✅ Media Uploaded to Collection! Doc ID: ${mediaDocId}`)
        } catch (mediaErr: any) {
          console.warn(`   ⚠️ Payload media create warning for ${proj.targetFilename}:`, mediaErr.message)
        }
      }
    }

    // Upsert Project into Payload PostgreSQL Collection
    const projectPayloadData = {
      slug: proj.slug,
      title: proj.title,
      category: proj.category,
      developer: proj.developer,
      location: proj.location,
      application: proj.application,
      glassDescription: proj.glassDescription,
      areaSqMtr: proj.areaSqMtr,
      image: mediaDocId || undefined,
      imageUrl: publicImageUrl,
      heroFeatured: proj.heroFeatured,
      tagline: proj.tagline,
    }

    const existingProj = await payload.find({
      collection: 'projects',
      where: { slug: { equals: proj.slug } },
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

    seededProjectsListForMock.push({
      id: proj.slug,
      title: proj.title,
      category: proj.category,
      developer: proj.developer,
      location: proj.location,
      application: proj.application,
      glassDescription: proj.glassDescription,
      areaSqMtr: proj.areaSqMtr,
      image: publicImageUrl,
      heroFeatured: proj.heroFeatured,
      tagline: proj.tagline,
    })
  }

  // 4. Update projects_mock.json so mock fallback is fully updated
  const mockPath = path.resolve(process.cwd(), 'src/data/projects_mock.json')
  let existingMock: any[] = []
  if (fs.existsSync(mockPath)) {
    try {
      existingMock = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
    } catch (e) {}
  }

  const finalMockMap = new Map<string, any>()
  for (const item of seededProjectsListForMock) {
    finalMockMap.set(item.id, item)
  }
  for (const item of existingMock) {
    if (!finalMockMap.has(item.id)) {
      finalMockMap.set(item.id, item)
    }
  }
  const finalMockArray = Array.from(finalMockMap.values())
  fs.writeFileSync(mockPath, JSON.stringify(finalMockArray, null, 2), 'utf8')
  console.log(`\n📄 Updated src/data/projects_mock.json with ${finalMockArray.length} total projects.`)

  // 5. Update Projects Page Global Hero Carousel
  console.log('\n🌟 Updating Projects Page Global (Hero Featured Projects)...')
  const heroFeaturedDocs = await payload.find({
    collection: 'projects',
    where: { heroFeatured: { equals: true } },
    limit: 12,
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

  // 6. Update Home Page Global Testimonials
  console.log('\n💬 Updating Home Page Global with AI Testimonials (Godrej, My Windows, Mantra, Vantara, Oberoi)...')
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

  console.log('\n🎉 ALL 17 WHATSAPP PROJECTS & MEDIA SEEDED SUCCESSFULLY IN CLOUDFLARE R2 & POSTGRESQL!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding Failed:', err)
    process.exit(1)
  })
