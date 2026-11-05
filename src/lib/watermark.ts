/**
 * Wraps an image source URL with the dynamic on-the-fly watermarking route.
 * Preserves clean master originals in storage/filesystem while dynamically baking
 * the Magic Glass watermark into served project & product imagery.
 */
export function getWatermarkedUrl(src: string | undefined | null): string {
  if (!src) return ''
  // If already an API watermark URL, don't double wrap
  if (src.startsWith('/api/watermark')) return src
  // If data URI or blob, return untouched
  if (src.startsWith('data:') || src.startsWith('blob:')) return src

  return `/api/watermark?src=${encodeURIComponent(src)}&v=40`
}
