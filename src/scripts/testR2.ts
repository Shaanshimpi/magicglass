import dotenv from 'dotenv'
import path from 'path'
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const bucket = process.env.R2_BUCKET_NAME
const endpoint = process.env.R2_ENDPOINT
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

console.log('Testing Cloudflare R2 Connection...')
console.log('Bucket:', bucket)
console.log('Endpoint:', endpoint)
console.log('Access Key ID:', accessKeyId ? `${accessKeyId.slice(0, 6)}...` : 'MISSING')

if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
  console.error('Missing required environment variables in .env!')
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

async function run() {
  try {
    // 1. Test PutObject
    const testKey = 'test-verification.txt'
    const testContent = `Magic Glass Cloudflare R2 test verified at ${new Date().toISOString()}`

    console.log(`\n1. Uploading test file "${testKey}" to bucket "${bucket}"...`)
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: testKey,
        Body: testContent,
        ContentType: 'text/plain',
      })
    )
    console.log(' Upload to R2 successful!')

    // 2. Test ListObjects
    console.log('\n2. Listing objects in bucket...')
    const listRes = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        MaxKeys: 5,
      })
    )
    console.log(` Objects found: ${listRes.KeyCount}`)
    listRes.Contents?.forEach((item) => {
      console.log(` - ${item.Key} (${item.Size} bytes)`)
    })

    // 3. Test public access via custom domain
    const customDomainUrl = `https://media.magicglass.co.in/${testKey}`
    console.log(`\n3. Verifying public access via Custom Domain (${customDomainUrl})...`)
    const response = await fetch(customDomainUrl)
    console.log(`HTTP Status: ${response.status} ${response.statusText}`)

    if (response.ok) {
      const text = await response.text()
      console.log(' Content fetched via custom domain:')
      console.log(`   "${text}"`)
      console.log('\n SUCCESS: Cloudflare R2 and media.magicglass.co.in custom domain are fully working!')
    } else {
      console.log(` Public URL returned status ${response.status}. If this is 404/403, check R2 Public Access or Custom Domain binding in Cloudflare.`)
    }
  } catch (err) {
    console.error(' Error during R2 test:', err)
  }
}

run()
