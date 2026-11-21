/**
 * Watermarking system has been stopped and disabled.
 * Automatically unwraps and returns original, clean image URLs without any watermarks.
 */
export function getWatermarkedUrl(src: string | undefined | null): string {
  if (!src) return ''
  // If wrapped in /api/watermark, extract the clean original source parameter
  if (src.startsWith('/api/watermark')) {
    try {
      const url = new URL(src, 'http://localhost')
      return url.searchParams.get('src') || src
    } catch {
      return src
    }
  }
  return src
}
