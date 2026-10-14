import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const bucket = process.env.R2_BUCKET_NAME
const endpoint = process.env.R2_ENDPOINT
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const publicUrl = process.env.R2_PUBLIC_URL || 'https://media.magicglass.co.in'

if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
  console.error('Missing R2 environment variables in .env!')
  process.exit(1)
}

const s3 = new S3Client({
  endpoint,
  region: 'auto',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

const brainDir = 'C:\\Users\\shaan\\.gemini\\antigravity-ide\\brain\\89195a78-1119-4e02-889c-e36e56bf19f7'
const targetDetailsDir = path.resolve(process.cwd(), 'public/images/products/details')

// 1. Map generated images from brainDir to targetDetailsDir
const generatedImageMappings: Record<string, string> = {
  'frosted_glass_office_partition_1791970340968.jpg': 'frosted-office.jpg',
  'frosted_glass_bathroom_screen_1791970375414.jpg': 'frosted-bathroom.jpg',
  'frosted_glass_balcony_railing_1791970402973.jpg': 'frosted-railing.jpg',
  'mirror_glass_luxury_vanity_1791970431420.jpg': 'mirror-vanity.jpg',
  'mirror_glass_feature_wall_1791970476137.jpg': 'mirror-wall.jpg',
  'sentry_glass_structural_fin_1791970507394.jpg': 'sentry-fins.jpg',
  'acoustic_glass_conference_1791970538482.jpg': 'acoustic-boardroom.jpg',
  'ceramic_glass_frit_facade_1791970570206.jpg': 'ceramic-frit.jpg',
  'fire_safety_glass_doors_1791970605753.jpg': 'fire-doors.jpg',
  'dgu_insulated_facade_1791970643319.jpg': 'dgu-facade.jpg',
}

function getContentType(file: string): string {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg'
  if (file.endsWith('.png')) return 'image/png'
  if (file.endsWith('.svg')) return 'image/svg+xml'
  if (file.endsWith('.webp')) return 'image/webp'
  return 'application/octet-stream'
}

async function uploadFileToR2(filePath: string, r2Key: string) {
  const fileContent = fs.readFileSync(filePath)
  const contentType = getContentType(filePath)
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: r2Key,
      Body: fileContent,
      ContentType: contentType,
    })
  )
  console.log(`  ✓ Uploaded to R2: ${r2Key} (${(fileContent.length / 1024).toFixed(1)} KB)`)
}

async function main() {
  console.log('1. Staging generated high-res images to public/images/products/details/...')
  if (!fs.existsSync(targetDetailsDir)) {
    fs.mkdirSync(targetDetailsDir, { recursive: true })
  }

  for (const [srcName, destName] of Object.entries(generatedImageMappings)) {
    const srcPath = path.join(brainDir, srcName)
    const destPath = path.join(targetDetailsDir, destName)
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`  ✓ Copied ${srcName} -> ${destName}`)
    } else {
      console.warn(`  ⚠️ Source not found: ${srcPath}`)
    }
  }

  console.log('\n2. Uploading all product detail images to Cloudflare R2...')
  const detailsFiles = fs.readdirSync(targetDetailsDir)
  for (const file of detailsFiles) {
    const fullPath = path.join(targetDetailsDir, file)
    if (fs.statSync(fullPath).isFile()) {
      const r2Key = `products/details/${file}`
      try {
        await uploadFileToR2(fullPath, r2Key)
      } catch (err: any) {
        console.error(`  ❌ Failed uploading ${r2Key}:`, err.message)
      }
    }
  }

  console.log('\n3. Uploading main product hero images to Cloudflare R2...')
  const productsDir = path.resolve(process.cwd(), 'public/images/products')
  const productFiles = fs.readdirSync(productsDir)
  for (const file of productFiles) {
    const fullPath = path.join(productsDir, file)
    if (fs.statSync(fullPath).isFile()) {
      const r2Key = `products/${file}`
      try {
        await uploadFileToR2(fullPath, r2Key)
      } catch (err: any) {
        console.error(`  ❌ Failed uploading ${r2Key}:`, err.message)
      }
    }
  }

  console.log('\n✅ Staging & R2 Upload completed successfully!')
  console.log(`Public base URL: ${publicUrl}`)
}

main().catch((err) => {
  console.error('Fatal error during upload:', err)
  process.exit(1)
})
