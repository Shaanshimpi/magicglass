import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { MAGIC_GLASS_WATERMARK_SVG } from '@/lib/watermarkSvg'

export const dynamic = 'force-dynamic'

interface CacheEntry {
  buffer: Buffer
  contentType: string
  etag: string
  timestamp: number
}

// In-memory cache for ultra-fast subsequent responses (LRU-style with max 150 items)
const memoryCache = new Map<string, CacheEntry>()
const MAX_CACHE_ITEMS = 150

// Pre-cached resized watermark buffers to eliminate re-rendering SVG for repeated widths
const watermarkPngCache = new Map<number, { buffer: Buffer; height: number }>()

async function getWatermarkPng(targetWidth: number): Promise<{ buffer: Buffer; height: number }> {
  const cached = watermarkPngCache.get(targetWidth)
  if (cached) return cached

  const buffer = await sharp(Buffer.from(MAGIC_GLASS_WATERMARK_SVG))
    .resize({ width: targetWidth })
    .png()
    .toBuffer()

  const meta = await sharp(buffer).metadata()
  const height = meta.height || Math.round(targetWidth * (130 / 300))

  const entry = { buffer, height }
  if (watermarkPngCache.size > 50) {
    const firstKey = watermarkPngCache.keys().next().value
    if (firstKey !== undefined) watermarkPngCache.delete(firstKey)
  }
  watermarkPngCache.set(targetWidth, entry)
  return entry
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const src = searchParams.get('src')

    if (!src) {
      return new NextResponse('Missing required "src" query parameter', { status: 400 })
    }

    const acceptsWebp = request.headers.get('accept')?.includes('image/webp') ?? true
    const cacheKey = `${src}:${acceptsWebp ? 'webp' : 'raw'}`

    // Check memory cache
    const cachedItem = memoryCache.get(cacheKey)
    if (cachedItem) {
      const ifNoneMatch = request.headers.get('if-none-match')
      if (ifNoneMatch === cachedItem.etag) {
        return new NextResponse(null, { status: 304 })
      }
      return new NextResponse(new Uint8Array(cachedItem.buffer), {
        status: 200,
        headers: {
          'Content-Type': cachedItem.contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          ETag: cachedItem.etag,
        },
      })
    }

    let inputBuffer: Buffer
    let sourceFormat: string | undefined

    if (src.startsWith('http://') || src.startsWith('https://')) {
      const parsedUrl = new URL(src)
      const allowedHosts = [
        'magicglass.co.in',
        'media.magicglass.co.in',
        'r2.cloudflarestorage.com',
        'images.unsplash.com',
        'a.storyblok.com',
        'localhost',
      ]
      const isAllowed = allowedHosts.some(
        (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`)
      )

      if (!isAllowed) {
        return new NextResponse('Host not permitted for image processing', { status: 403 })
      }

      const res = await fetch(src, {
        headers: { 'User-Agent': 'MagicGlass-WatermarkEngine/1.0' },
        next: { revalidate: 86400 },
      })

      if (!res.ok) {
        return new NextResponse('Failed to fetch remote image', { status: 502 })
      }

      const arrayBuf = await res.arrayBuffer()
      inputBuffer = Buffer.from(arrayBuf)
    } else {
      // Local static file resolution from public directory
      const cleanRelative = path.normalize(src.replace(/^\/+/, ''))
      const publicDir = path.resolve(process.cwd(), 'public')
      const filePath = path.resolve(publicDir, cleanRelative)

      // Guard against path traversal
      if (!filePath.startsWith(publicDir)) {
        return new NextResponse('Forbidden path', { status: 403 })
      }

      if (!fs.existsSync(filePath)) {
        return new NextResponse('Image not found', { status: 404 })
      }

      inputBuffer = fs.readFileSync(filePath)
    }

    const imageMetadata = await sharp(inputBuffer).metadata()
    const width = imageMetadata.width || 1200
    const height = imageMetadata.height || 800
    sourceFormat = imageMetadata.format

    // Calculate watermark width proportionally: 18% of base width, clamped between 150px and 450px
    const watermarkWidth = Math.min(Math.max(Math.round(width * 0.18), 150), 450)
    const margin = Math.max(Math.round(width * 0.022), 16)

    const { buffer: watermarkPng, height: watermarkHeight } = await getWatermarkPng(watermarkWidth)

    const top = Math.max(0, height - watermarkHeight - margin)
    const left = Math.max(0, width - watermarkWidth - margin)

    let outputBuffer: Buffer
    let contentType: string

    if (acceptsWebp || sourceFormat === 'webp') {
      outputBuffer = await sharp(inputBuffer)
        .composite([{ input: watermarkPng, top, left }])
        .webp({ quality: 86, effort: 4 })
        .toBuffer()
      contentType = 'image/webp'
    } else if (sourceFormat === 'png') {
      outputBuffer = await sharp(inputBuffer)
        .composite([{ input: watermarkPng, top, left }])
        .png({ compressionLevel: 8 })
        .toBuffer()
      contentType = 'image/png'
    } else {
      outputBuffer = await sharp(inputBuffer)
        .composite([{ input: watermarkPng, top, left }])
        .jpeg({ quality: 88, mozjpeg: true })
        .toBuffer()
      contentType = 'image/jpeg'
    }

    const etag = `W/"${Buffer.from(src).toString('base64url')}-${outputBuffer.length}"`

    // Store in memory cache
    if (memoryCache.size >= MAX_CACHE_ITEMS) {
      const oldestKey = memoryCache.keys().next().value
      if (oldestKey !== undefined) memoryCache.delete(oldestKey)
    }
    memoryCache.set(cacheKey, {
      buffer: outputBuffer,
      contentType,
      etag,
      timestamp: Date.now(),
    })

    const ifNoneMatch = request.headers.get('if-none-match')
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 })
    }

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        ETag: etag,
      },
    })
  } catch (error) {
    console.error('[WatermarkEngine] Error processing dynamic watermark:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
