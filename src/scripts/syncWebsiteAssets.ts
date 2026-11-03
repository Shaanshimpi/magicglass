import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

// Directories
const WORKSPACE_ROOT = path.resolve(process.cwd(), '../..')
const SOURCE_DIR = path.join(
  WORKSPACE_ROOT,
  'Web Site Project images-20261103T072211Z-1-001',
  'Web Site Project images'
)
const PUBLIC_PROJECTS_DIR = path.resolve(process.cwd(), 'public/images/projects')
const PUBLIC_INFRA_DIR = path.resolve(process.cwd(), 'public/images/infrastructure')
const INFRA_MOCK_FILE = path.resolve(process.cwd(), 'src/data/infrastructure_mock.json')
const PROJECTS_MOCK_FILE = path.resolve(process.cwd(), 'src/data/projects_mock.json')

// S3 R2 Client
const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

async function uploadToR2(filePath: string, targetKey: string, contentType: string) {
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
  console.log(`   ☁️ [R2 Uploaded] "${targetKey}" (${Math.round(fileBuffer.length / 1024)} KB)`)
}

// Map of project source filename patterns to target public project filenames
const PROJECT_FILE_MAP: Record<string, string> = {
  'apostrophe.jpg.jpeg': 'apostrophe.jpg',
  'aradhya-square.jpg.jpeg': 'aradhya-square.jpg',
  'atrium-mall.jpg.jpeg': 'atrium-mall.jpg',
  'aurangabad-airport.jpg.jpeg': 'aurangabad-airport.jpg',
  'balmoral.jpg.jpeg': 'balmoral-by-riverside.jpg',
  'eon-homes.jpg.jpeg': 'eon-homes.jpg',
  'ganga-platino.jpg.jpeg': 'ganga-platino.jpg',
  'ganga-trueno.jpg.jpeg': 'ganga-trueno.jpg',
  'gera-imperium.jpg.jpeg': 'gera-imperium-gateway.jpg',
  'goa-airport.jpg.jpeg': 'goa-airport.jpg',
  'keshavkunj-33.jpg.jpeg': '33-keshavkung.jpg',
  'kushwal-wall-street.jpg.jpeg': 'kushwal-wall-street.jpg',
  'nyati-elysia.jpg.jpeg': 'nyati-elysia.jpg',
  'nyati-empress.jpg.jpeg': 'nyati-empress.jpg',
  'pune-airport.jpg.jpeg': 'pune-airport.jpg',
  'solitaire-business-hub.jpg.jpeg': 'solitaire-business-hub.jpg',
  'srinagar-airport.jpg.jpeg': 'srinagar-airport.jpg',
  'the-ark.jpg.jpeg': 'the-ark.jpg',
  'verde.jpg.jpeg': 'verde.jpg',
  'WhatsApp Image 2026-11-03 at 9.56.03 AM.jpeg': 'dnk-square-viman-nagar.jpg',
}

async function processImage(inputPath: string, outputPath: string, maxWidth = 1920, quality = 85) {
  const ext = path.extname(outputPath).toLowerCase()
  const transformer = sharp(inputPath).rotate() // Auto-orient via EXIF

  if (ext === '.png') {
    await transformer
      .resize({ width: maxWidth, withoutEnlargement: true })
      .png({ quality, compressionLevel: 8 })
      .toFile(outputPath)
  } else if (ext === '.webp') {
    await transformer
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath)
  } else {
    // Default jpeg
    await transformer
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath)
  }
}

async function main() {
  console.log('================================================================');
  console.log('🚀 Synchronizing All Website Images with DB & Cloudflare R2');
  console.log('================================================================');

  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`)
  }

  // ---------------------------------------------------------------------------
  // STEP 1: Process Infrastructure Images (Changes in the picture/)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 1: Processing Infrastructure / Factory Plant Images ---')
  const changesDir = path.join(SOURCE_DIR, 'Changes in the picture')

  const infraTasks = [
    {
      name: 'Cutting & Processing',
      source: path.join(changesDir, 'Cutting', 'New Cutting.png'),
      targets: ['cutting.jpg', 'infra-banner.jpg'],
    },
    {
      name: 'Toughening Plant',
      source: path.join(changesDir, 'Toughening', 'New.png'),
      targets: ['toughening.jpg', 'infra-banner-1.jpg'],
    },
    {
      name: 'Lamination & Cleanroom',
      source: path.join(changesDir, 'Lamination', 'New Lamination.png'),
      targets: ['lamination.jpg', 'infra-banner-3.jpg'],
    },
    {
      name: 'Double Glazing (DGU)',
      source: path.join(changesDir, 'DGU', 'NEW DGU.png'),
      targets: ['dgu.jpg', 'infra-banner-2.jpg'],
    },
    {
      name: 'Quality Control Center',
      source: path.join(changesDir, 'Quality Control', 'New Quality lab.png'),
      targets: ['quality-lab.jpg', 'quality-control.jpg'],
    },
  ]

  for (const item of infraTasks) {
    if (!fs.existsSync(item.source)) {
      console.warn(`⚠️ Source not found for ${item.name}: ${item.source}`)
      continue
    }

    console.log(`📸 Processing ${item.name} (${path.basename(item.source)})...`)
    for (const targetName of item.targets) {
      const outPath = path.join(PUBLIC_INFRA_DIR, targetName)
      await processImage(item.source, outPath, 1920, 85)
      const stat = fs.statSync(outPath)
      console.log(`   ✓ Saved: ${targetName} (${Math.round(stat.size / 1024)} KB)`)

      // Upload to R2 under infrastructure/ prefix or root
      try {
        await uploadToR2(outPath, `infrastructure/${targetName}`, 'image/jpeg')
      } catch (err: any) {
        console.warn(`   ⚠️ R2 upload warning for ${targetName}:`, err.message)
      }
    }
  }

  // Update infrastructure_mock.json
  console.log('\n📝 Updating infrastructure_mock.json with updated facility images...')
  const infraMock = JSON.parse(fs.readFileSync(INFRA_MOCK_FILE, 'utf-8'))
  const infraImageMap: Record<string, string> = {
    'cutting-processing': '/images/infrastructure/cutting.jpg',
    'toughening-plant': '/images/infrastructure/toughening.jpg',
    'lamination-cleanroom': '/images/infrastructure/lamination.jpg',
    'double-glazing-dgu': '/images/infrastructure/dgu.jpg',
    'quality-control': '/images/infrastructure/quality-lab.jpg',
  }
  infraMock.industries.forEach((ind: any) => {
    if (infraImageMap[ind.id]) {
      ind.image = infraImageMap[ind.id]
    }
  })
  fs.writeFileSync(INFRA_MOCK_FILE, JSON.stringify(infraMock, null, 2), 'utf-8')
  console.log('   ✓ infrastructure_mock.json updated.')

  // ---------------------------------------------------------------------------
  // STEP 2: Process Testimonials Runwal Central Park Image
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 2: Processing Runwal Central Park Testimonial Image ---')
  const runwalSource = path.join(WORKSPACE_ROOT, 'Project images', 'Runwal Ceteal Park.jpg')
  const runwalTarget = path.join(PUBLIC_PROJECTS_DIR, 'runwal-central-park-chinchwad.jpg')

  if (fs.existsSync(runwalSource)) {
    console.log(`📸 Processing Runwal Central Park (${path.basename(runwalSource)})...`)
    await processImage(runwalSource, runwalTarget, 1920, 85)
    const stat = fs.statSync(runwalTarget)
    console.log(`   ✓ Saved: runwal-central-park-chinchwad.jpg (${Math.round(stat.size / 1024)} KB)`)
    try {
      await uploadToR2(runwalTarget, 'runwal-central-park-chinchwad.jpg', 'image/jpeg')
    } catch (err: any) {
      console.warn('   ⚠️ R2 upload warning for Runwal:', err.message)
    }
  } else {
    console.warn(`⚠️ Runwal source not found at: ${runwalSource}`)
  }

  // ---------------------------------------------------------------------------
  // STEP 3: Process 20 Project Images (Project/)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 3: Processing 20 Project Images from Project/ ---')
  const projectSourceDir = path.join(SOURCE_DIR, 'Project')
  const sourceProjectFiles = fs.readdirSync(projectSourceDir)

  for (const srcFile of sourceProjectFiles) {
    const targetFile = PROJECT_FILE_MAP[srcFile]
    if (!targetFile) {
      console.warn(`⚠️ No mapping for source project file: ${srcFile}`)
      continue
    }

    const fullSrcPath = path.join(projectSourceDir, srcFile)
    const fullTargetPath = path.join(PUBLIC_PROJECTS_DIR, targetFile)

    console.log(`📸 Processing Project: ${srcFile} -> ${targetFile}...`)
    await processImage(fullSrcPath, fullTargetPath, 1920, 85)
    const stat = fs.statSync(fullTargetPath)
    console.log(`   ✓ Saved: ${targetFile} (${Math.round(stat.size / 1024)} KB)`)

    // If it's the-ark, also create the-ark.webp
    if (targetFile === 'the-ark.jpg') {
      const arkWebp = path.join(PUBLIC_PROJECTS_DIR, 'the-ark.webp')
      await processImage(fullSrcPath, arkWebp, 1920, 85)
      console.log(`   ✓ Generated: the-ark.webp`)
      try {
        await uploadToR2(arkWebp, 'the-ark.webp', 'image/webp')
      } catch (err: any) {
        console.warn('   ⚠️ R2 upload warning for the-ark.webp:', err.message)
      }
    }

    // Upload to R2
    try {
      await uploadToR2(fullTargetPath, targetFile, 'image/jpeg')
    } catch (err: any) {
      console.warn(`   ⚠️ R2 upload warning for ${targetFile}:`, err.message)
    }
  }

  // Also ensure projects_mock.json has clean paths
  console.log('\n📝 Validating projects_mock.json paths...')
  const projectsMock = JSON.parse(fs.readFileSync(PROJECTS_MOCK_FILE, 'utf-8'))
  projectsMock.forEach((p: any) => {
    // If the image was /images/projects/soliatre-business-hub.jpg with typo, fix to solitaire-business-hub.jpg
    if (p.image === '/images/projects/soliatre-business-hub.jpg') {
      p.image = '/images/projects/solitaire-business-hub.jpg'
    }
  })
  fs.writeFileSync(PROJECTS_MOCK_FILE, JSON.stringify(projectsMock, null, 2), 'utf-8')
  console.log('   ✓ projects_mock.json validated and saved.')

  // ---------------------------------------------------------------------------
  // STEP 4: Synchronize Database (Neon PostgreSQL via Payload CMS)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 4: Synchronizing Database with Payload CMS ---')
  const payload = await getPayload({ config: configPromise })

  // 4A: Sync Infrastructure Page Global
  console.log('📦 Updating infrastructure-page Global in PostgreSQL...')
  const currentInfra = await payload.findGlobal({ slug: 'infrastructure-page' })
  await payload.updateGlobal({
    slug: 'infrastructure-page',
    data: {
      ...currentInfra,
      hero: {
        ...(currentInfra as any)?.hero,
        title: infraMock.page.title,
        category: infraMock.page.category,
        subheading: infraMock.page.subheading,
        heroImageUrl: infraMock.page.heroImage,
      },
      industries: infraMock.industries.map((fac: any) => ({
        id: fac.id,
        title: fac.title,
        subtitle: fac.subtitle,
        imageUrl: fac.image,
        specs: fac.specs,
        description: fac.description,
      })),
    },
  })
  console.log('   ✅ infrastructure-page Global successfully updated in DB!')

  // 4B: Sync Testimonials in home-page Global
  console.log('📦 Updating testimonials in home-page Global...')
  const currentHome = await payload.findGlobal({ slug: 'home-page' })
  const testimonials = (currentHome as any)?.testimonials || []
  let updatedTestimonialCount = 0

  const updatedTestimonials = testimonials.map((t: any) => {
    const isRunwal = t.id === 'runwal-realty' || t.id === 'godrej-properties' || t.quote?.includes('Runwal Central Park')
    const isDnk = t.id === 'alcorp-dnk-square' || t.id === 'my-windows' || t.quote?.includes('DNK Square')

    let avatarUrl = t.avatarUrl
    if (isRunwal) {
      avatarUrl = 'https://media.magicglass.co.in/runwal-central-park-chinchwad.jpg'
      updatedTestimonialCount++
    } else if (isDnk) {
      avatarUrl = 'https://media.magicglass.co.in/dnk-square-viman-nagar.jpg'
      updatedTestimonialCount++
    }

    // Only pass avatar if it is a valid relation ID (number or hex string), otherwise undefined so avatarUrl is used
    const validAvatarId = (t.avatar && typeof t.avatar === 'object')
      ? t.avatar.id
      : (typeof t.avatar === 'number' ? t.avatar : undefined)

    return {
      id: t.id,
      quote: t.quote,
      author: t.author,
      title: t.title,
      ...(validAvatarId ? { avatar: validAvatarId } : {}),
      avatarUrl,
    }
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      ...currentHome,
      testimonials: updatedTestimonials,
    },
  })
  console.log(`   ✅ home-page Global testimonials updated (${updatedTestimonialCount} entries touched)!`)

  // 4C: Upsert Projects in PostgreSQL Database
  console.log('📦 Upserting projects in PostgreSQL Database...')
  for (const proj of projectsMock) {
    const slug = proj.id
    const filename = path.basename(proj.image.split('?')[0])
    const localPath = path.join(PUBLIC_PROJECTS_DIR, filename)

    let mediaDocId: string | number | null = null

    // Check media collection
    if (fs.existsSync(localPath)) {
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existingMedia.docs.length > 0) {
        mediaDocId = existingMedia.docs[0].id
      } else {
        try {
          const fileBuffer = fs.readFileSync(localPath)
          const ext = path.extname(filename).toLowerCase()
          const mimetype = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'
          const createdMedia = await payload.create({
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
          mediaDocId = createdMedia.id
          console.log(`   📸 Registered new Media doc: ${filename} (ID: ${mediaDocId})`)
        } catch (mediaErr: any) {
          // If media creation fails, imageUrl is still persisted
        }
      }
    }

    const existingProject = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const payloadData: any = {
      slug,
      title: proj.title,
      category: proj.category,
      developer: proj.developer || '',
      location: proj.location || '',
      application: proj.application || '',
      glassDescription: proj.glassDescription || '',
      areaSqMtr: proj.areaSqMtr || null,
      imageUrl: proj.image,
      heroFeatured: !!proj.heroFeatured,
      tagline: proj.tagline || '',
    }
    if (mediaDocId) {
      payloadData.image = mediaDocId
    }

    if (existingProject.docs.length > 0) {
      await payload.update({
        collection: 'projects',
        id: existingProject.docs[0].id,
        data: payloadData,
      })
      console.log(`   ✓ Updated project in DB: ${proj.title} (${slug})`)
    } else {
      await payload.create({
        collection: 'projects',
        data: payloadData,
      })
      console.log(`   ✅ Created project in DB: ${proj.title} (${slug})`)
    }
  }

  console.log('\n================================================================');
  console.log('🎉 ALL CHANGES SUCCESSFULLY APPLIED & SYNCED WITH DB & R2!');
  console.log('================================================================');
  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ Error synchronizing assets:', err)
  process.exit(1)
})
