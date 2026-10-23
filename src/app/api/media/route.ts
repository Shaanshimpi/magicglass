import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

    // 1. Scan directory structures in public/images
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

    const visitedUrls = new Set<string>()

    for (const item of scannedDirs) {
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
    }

    // 2. Fetch from Payload CMS Media collection if available
    try {
      const payload = await getPayload({ config: configPromise })
      if (payload) {
        const payloadMedia = await payload.find({
          collection: 'media',
          limit: 100,
          sort: '-createdAt',
        })
        for (const doc of payloadMedia.docs) {
          const docUrl = doc.url || (doc.filename ? `/media/${doc.filename}` : '')
          if (docUrl && !visitedUrls.has(docUrl)) {
            visitedUrls.add(docUrl)
            results.unshift({
              id: String(doc.id),
              name: doc.alt || doc.filename || 'CMS Upload',
              url: docUrl,
              category: 'CMS Uploads',
              width: doc.width || 0,
              height: doc.height || 0,
              size: doc.filesize || 0,
              aspect: doc.width && doc.height ? (doc.width / doc.height).toFixed(2) + ':1' : '1:1',
              format: (doc.mimeType?.split('/')[1] || 'IMAGE').toUpperCase(),
              createdAt: doc.createdAt || new Date().toISOString(),
            })
          }
        }
      }
    } catch {
      // Ignore Payload fetch error, local scan is already populated
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

    const uploadsDir = path.resolve('public/images/uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
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
      const targetPath = path.join(uploadsDir, uniqueFilename)

      fs.writeFileSync(targetPath, buffer)

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
      const relativeUrl = `/images/uploads/${uniqueFilename}`

      const cleanName = baseName
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      // Also register in Payload CMS if available
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
              mimetype: file.type || 'image/jpeg',
              name: uniqueFilename,
              size: buffer.length,
            },
          })
        }
      } catch (cmsErr) {
        // Fallback: local file is saved regardless
        console.warn('Payload CMS media create fallback to local file:', cmsErr)
      }

      const item: MediaItemDto = {
        id: relativeUrl,
        name: cleanName,
        url: relativeUrl,
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
      message: `Successfully uploaded ${uploadedItems.length} file(s)`,
      uploaded: uploadedItems,
      items: uploadedItems,
      item: uploadedItems[0] || null,
    })
  } catch (err: any) {
    console.error('Media upload error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
