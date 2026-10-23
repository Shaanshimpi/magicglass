import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export interface MediaItemDto {
  id: string
  name: string
  url: string
  category: string
  width: number
  height: number
  size: number
  aspect: string
  format: string
  createdAt: string
}

// Cloudflare R2 Configuration with safe fallback defaults
const R2_BUCKET = process.env.R2_BUCKET_NAME || 'magicglassmedia'
const R2_ENDPOINT = process.env.R2_ENDPOINT || 'https://e8946ac9629a61bbcaf129fe511e6976.r2.cloudflarestorage.com'
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY_ID || 'f5b19787302bb8af2fc4e6f7ec6b268c'
const R2_SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY || '73ec9aac097a21ed10bd35d829bb51351524976e9d5eeb726ba7dd121e70c1a9'
const R2_PUBLIC_BASE = (process.env.R2_PUBLIC_URL || 'https://media.magicglass.co.in').replace(/\/+$/, '')

const r2Client = new S3Client({
  endpoint: R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
  forcePathStyle: true,
})

// In-memory cache for fast metadata lookup
const metadataCache = new Map<string, { width: number; height: number; size: number; aspect: string; format: string }>()

async function getFileMeta(absPath: string) {
  if (metadataCache.has(absPath)) {
    return metadataCache.get(absPath)!
  }
  try {
    const stat = fs.statSync(absPath)
    const meta = await sharp(absPath).metadata()
    const width = meta.width || 0
    const height = meta.height || 0
    const aspect = height > 0 ? (width / height).toFixed(2) + ':1' : '1:1'
    const format = (meta.format || path.extname(absPath).replace('.', '')).toUpperCase()
    const result = {
      width,
      height,
      size: stat.size,
      aspect,
      format,
    }
    metadataCache.set(absPath, result)
    return result
  } catch {
    return {
      width: 0,
      height: 0,
      size: 0,
      aspect: 'N/A',
      format: path.extname(absPath).replace('.', '').toUpperCase(),
    }
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryFilter = searchParams.get('category')
    const searchFilter = searchParams.get('search')?.toLowerCase()

    const results: MediaItemDto[] = []
    const visitedUrls = new Set<string>()

    // 1. Fetch from Payload CMS Media collection (Backed by Cloudflare R2)
    try {
      const payload = await getPayload({ config: configPromise })
      if (payload) {
        const payloadMedia = await payload.find({
          collection: 'media',
          limit: 250,
          sort: '-createdAt',
        })
        for (const doc of payloadMedia.docs) {
          const docUrl = doc.url || (doc.filename ? `${R2_PUBLIC_BASE}/${doc.filename}` : '')
          if (docUrl && !visitedUrls.has(docUrl)) {
            visitedUrls.add(docUrl)
            const width = doc.width || 0
            const height = doc.height || 0
            results.push({
              id: String(doc.id),
              name: doc.alt || doc.filename || 'Cloudflare R2 Media',
              url: docUrl,
              category: 'User Uploads',
              width,
              height,
              size: doc.filesize || 0,
              aspect: width && height ? (width / height).toFixed(2) + ':1' : '1:1',
              format: (doc.mimeType?.split('/')[1] || 'IMAGE').toUpperCase(),
              createdAt: doc.createdAt || new Date().toISOString(),
            })
          }
        }
      }
    } catch (err) {
      console.warn('Payload CMS media collection query skipped:', err)
    }

    // 2. Safe local directory scan in public/images (works on both local & Vercel bundled output)
    const scannedDirs = [
      { dir: 'public/images/products/heroes', category: 'Heroes & Banners' },
      { dir: 'public/images/products', category: 'Products' },
      { dir: 'public/images/projects', category: 'Projects' },
      { dir: 'public/images/industry', category: 'Industries' },
      { dir: 'public/images/infrastructure', category: 'Infrastructure' },
      { dir: 'public/images/apps', category: 'Applications' },
      { dir: 'public/images/uploads', category: 'User Uploads' },
      { dir: 'public/images', category: 'General' },
    ]

    for (const item of scannedDirs) {
      try {
        const absDir = path.resolve(item.dir)
        if (!fs.existsSync(absDir)) continue

        const files = fs.readdirSync(absDir, { withFileTypes: true })
        for (const f of files) {
          if (!f.isFile() || !/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(f.name)) continue

          const relativeUrl = '/' + path.relative('public', path.join(absDir, f.name)).replace(/\\/g, '/')
          if (visitedUrls.has(relativeUrl)) continue
          visitedUrls.add(relativeUrl)

          const meta = await getFileMeta(path.join(absDir, f.name))
          const cleanName = f.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())

          results.push({
            id: relativeUrl,
            name: cleanName,
            url: relativeUrl,
            category: item.category,
            width: meta.width,
            height: meta.height,
            size: meta.size,
            aspect: meta.aspect,
            format: meta.format,
            createdAt: new Date().toISOString(),
          })
        }
      } catch {
        // Skip directory read errors safely in serverless
      }
    }

    // Filter results
    let filtered = results
    if (categoryFilter && categoryFilter !== 'All') {
      filtered = filtered.filter((r) => r.category.toLowerCase() === categoryFilter.toLowerCase())
    }
    if (searchFilter) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchFilter) ||
          r.url.toLowerCase().includes(searchFilter) ||
          r.category.toLowerCase().includes(searchFilter)
      )
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      media: filtered,
      items: filtered,
    })
  } catch (err: any) {
    console.error('Failed to get media:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    const singleFile = formData.get('file') as File | null

    const allUploads: File[] = []
    if (files && files.length > 0) {
      allUploads.push(...files)
    } else if (singleFile) {
      allUploads.push(singleFile)
    }

    if (allUploads.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided for upload' }, { status: 400 })
    }

    const uploadedItems: MediaItemDto[] = []

    for (const file of allUploads) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const safeName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/-+/g, '-')

      const ext = path.extname(safeName)
      const baseName = path.basename(safeName, ext)
      const uniqueFilename = `${baseName}-${Date.now()}${ext}`
      const mimeType =
        file.type ||
        (ext === '.png'
          ? 'image/png'
          : ext === '.webp'
          ? 'image/webp'
          : ext === '.svg'
          ? 'image/svg+xml'
          : 'image/jpeg')

      // 1. Calculate natural image dimensions via Sharp
      let width = 0
      let height = 0
      let format = ext.replace('.', '').toUpperCase()
      try {
        const meta = await sharp(buffer).metadata()
        width = meta.width || 0
        height = meta.height || 0
        if (meta.format) format = meta.format.toUpperCase()
      } catch {}

      const aspect = height > 0 ? (width / height).toFixed(2) + ':1' : '1:1'
      const cleanName = baseName
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      // 2. Direct upload to Cloudflare R2
      const r2Key = uniqueFilename
      await r2Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: r2Key,
          Body: buffer,
          ContentType: mimeType,
        })
      )
      const publicUrl = `${R2_PUBLIC_BASE}/${r2Key}`

      // 3. Register in Payload CMS media collection (Uses s3Storage with disableLocalStorage: true)
      try {
        const payload = await getPayload({ config: configPromise })
        if (payload) {
          await payload.create({
            collection: 'media',
            data: {
              alt: cleanName,
            },
            file: {
              data: buffer,
              mimetype: mimeType,
              name: uniqueFilename,
              size: buffer.length,
            },
          })
        }
      } catch (cmsErr) {
        console.warn('Payload CMS media create fallback (R2 upload already succeeded):', cmsErr)
      }

      // 4. Safe optional local disk write (only on local dev, NEVER on Vercel)
      if (!process.env.VERCEL) {
        try {
          const uploadsDir = path.resolve('public/images/uploads')
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
          }
          fs.writeFileSync(path.join(uploadsDir, uniqueFilename), buffer)
        } catch {
          // Ignore read-only filesystem errors silently
        }
      }

      const item: MediaItemDto = {
        id: publicUrl,
        name: cleanName,
        url: publicUrl,
        category: 'User Uploads',
        width,
        height,
        size: buffer.length,
        aspect,
        format,
        createdAt: new Date().toISOString(),
      }

      uploadedItems.push(item)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedItems.length} file(s) to Cloudflare R2`,
      uploaded: uploadedItems,
      items: uploadedItems,
      item: uploadedItems[0] || null,
    })
  } catch (err: any) {
    console.error('Media upload error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
