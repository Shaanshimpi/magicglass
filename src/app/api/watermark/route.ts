import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Watermarking engine has been permanently stopped.
 * Automatically redirects any remaining or cached /api/watermark requests directly
 * to the original, clean, unwatermarked source image.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const src = searchParams.get('src')

    if (!src) {
      return new NextResponse('Missing required "src" query parameter', { status: 400 })
    }

    // Redirect to original clean external or CDN URL
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return NextResponse.redirect(src, 301)
    }

    // Redirect to original clean local static file
    const normalizedPath = src.startsWith('/') ? src : `/${src}`
    return NextResponse.redirect(new URL(normalizedPath, request.url), 301)
  } catch (error) {
    console.error('[WatermarkEngine] Error processing redirect:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
