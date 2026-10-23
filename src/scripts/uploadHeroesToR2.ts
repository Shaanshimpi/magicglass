import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

async function uploadHeroes() {
  const dir = path.resolve(process.cwd(), 'public/images/products/heroes')
  if (!fs.existsSync(dir)) {
    console.log('No heroes directory found.')
    return
  }
  const files = fs.readdirSync(dir)
  console.log(`Uploading ${files.length} hero images to Cloudflare R2...`)
  for (const f of files) {
    const full = path.join(dir, f)
    const body = fs.readFileSync(full)
    const contentType = f.endsWith('.png') ? 'image/png' : 'image/jpeg'
    const key = `products/heroes/${f}`
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    )
    console.log(`  ✓ Uploaded to R2: ${key}`)
  }
  console.log('✅ All hero images uploaded to Cloudflare R2!')
}

uploadHeroes()
