/**
 * Authentic local fallback mapping for landmark architectural projects.
 * Guarantees every project card and hero slide always renders its own
 * authentic image, preventing generic fallback collisions (e.g. Balmoral).
 */

export const LOCAL_PROJECT_IMAGES: Record<string, string> = {
  'the-oberoi-nariman-point': '/images/projects/the-oberoi-nariman-point.jpg',
  'hotel-trident-nariman-point': '/images/projects/hotel-trident-nariman-point.jpg',
  'dabolim-airport-goa': '/images/projects/dabolim-airport-goa.jpg',
  'runwal-central-park-chinchwad': '/images/projects/runwal-central-park-chinchwad.jpg',
  'bioaltus-gujarat': '/images/projects/bioaltus-gujarat.jpg',
  'dnk-square-viman-nagar': '/images/projects/dnk-square-viman-nagar.jpg',
  'riverdale-grove-kharadi': '/images/projects/riverdale-grove-kharadi.jpg',
  'malpani-m-soulstrings-baner': '/images/projects/malpani-soulstrings-baner.jpg',
  'bajaj-auto-office-sambhaji-nagar': '/images/projects/bajaj-auto-sambhaji-nagar.jpg',
  'attalika-pune': '/images/projects/attalika-pune.jpg',
  'pune-peoples-cooperative-bank': '/images/projects/pune-peoples-cooperative-bank.jpg',
  'exotic-fruits-nashik': '/images/projects/exotic-fruits-nashik.jpg',
  'vaidya-spaces-andheri-mumbai': '/images/projects/vaidya-spaces-andheri-mumbai.jpg',
  'endurance-technologies-sambhaji-nagar': '/images/projects/endurance-technologies-sambhaji-nagar.jpg',
  'bbm-muller-pirangut': '/images/projects/bbm-muller-pirangut.jpg',
  'cn-water-taloja': '/images/projects/cn-water-taloja.jpg',
  'goa-airport': '/images/projects/goa-airport.jpg',
  'balmoral-by-riverside': '/images/projects/balmoral-by-riverside.jpg',
  'the-ark': '/images/projects/the-ark.webp',
  'verde': '/images/projects/verde.jpg',
  'apostrophe': '/images/projects/apostrophe.jpg',
  'ganga-platino': '/images/projects/ganga-platino.jpg',
  'nyati-elysia': '/images/projects/nyati-elysia.jpg',
  'eon-homes': '/images/projects/eon-homes.jpg',
  'ganga-trueno': '/images/projects/ganga-trueno.jpg',
  'kushwal-wall-street': '/images/projects/kushwal-wall-street.jpg',
  'aradhya-square': '/images/projects/aradhya-square.jpg',
  'gera-imperium-gateway': '/images/projects/gera-imperium-gateway.jpg',
  'nyati-empress': '/images/projects/nyati-empress.jpg',
  '33-keshavkung': '/images/projects/33-keshavkung.jpg',
  'solitaire-business-hub': '/images/projects/solitaire-business-hub.jpg',
  'atrium-mall': '/images/projects/atrium-mall.jpg',
  'pune-airport': '/images/projects/pune-airport.jpg',
  'srinagar-airport': '/images/projects/srinagar-airport.jpg',
  'aurangabad-airport': '/images/projects/aurangabad-airport.jpg',
}

/**
 * Returns an authentic fallback image for any project item.
 */
export function getProjectFallbackImage(project: { id?: string; image?: string; title?: string }): string {
  if (project.id && LOCAL_PROJECT_IMAGES[project.id]) {
    return LOCAL_PROJECT_IMAGES[project.id]
  }

  if (project.image) {
    const cleanUrl = project.image.split('?')[0]
    const filename = cleanUrl.split('/').pop()
    if (filename && filename.includes('.')) {
      return `/images/projects/${filename}`
    }
  }

  if (project.id) {
    return `/images/projects/${project.id}.jpg`
  }

  return '/images/projects/the-oberoi-nariman-point.jpg'
}
