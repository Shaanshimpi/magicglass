export interface PdpLinkedProject {
  src: string
  title: string
  developer?: string
  location?: string
  category?: string
  slug?: string
}

export const AUTHENTIC_PROJECTS_REGISTRY: Record<string, PdpLinkedProject> = {
  'balmoral-by-riverside': {
    slug: 'balmoral-by-riverside',
    title: 'Balmoral by Riverside',
    developer: 'Kasturi Builder',
    location: 'Baner, Pune',
    category: 'Residential',
    src: '/images/projects/balmoral-by-riverside.jpg',
  },
  'the-ark': {
    slug: 'the-ark',
    title: 'The Ark',
    developer: 'Tribeca Developers',
    location: 'NIBM, Pune',
    category: 'Residential',
    src: '/images/projects/the-ark.jpg',
  },
  'verde': {
    slug: 'verde',
    title: 'Verde Luxury Residence',
    developer: 'ABIL Group',
    location: 'Vimanagar, Pune',
    category: 'Residential',
    src: '/images/projects/verde.jpg',
  },
  'ganga-platino': {
    slug: 'ganga-platino',
    title: 'Ganga Platino',
    developer: 'Goel Ganga Developments',
    location: 'Kharadi, Pune',
    category: 'Residential',
    src: '/images/projects/ganga-platino.jpg',
  },
  'apostrophe': {
    slug: 'apostrophe',
    title: 'Apostrophe',
    developer: 'Kasturi',
    location: 'Hinjewadi, Pune',
    category: 'Residential',
    src: '/images/projects/apostrophe.jpg',
  },
  'nyati-elysia': {
    slug: 'nyati-elysia',
    title: 'Nyati Elysia',
    developer: 'Nyati Group',
    location: 'Kharadi, Pune',
    category: 'Residential',
    src: '/images/projects/nyati-elysia.jpg',
  },
  'eon-homes': {
    slug: 'eon-homes',
    title: 'Eon Homes',
    developer: 'Kasturi',
    location: 'Hinjewadi, Pune',
    category: 'Residential',
    src: '/images/projects/eon-homes.jpg',
  },
  'ganga-trueno': {
    slug: 'ganga-trueno',
    title: 'Ganga Trueno',
    developer: 'Goel Ganga Developments',
    location: 'Vimanagar, Pune',
    category: 'Commercial',
    src: '/images/projects/ganga-trueno.jpg',
  },
  'kushwal-wall-street': {
    slug: 'kushwal-wall-street',
    title: 'Kushal Wall Street',
    developer: 'Kushal Builders',
    location: 'FC Road, Pune',
    category: 'Commercial',
    src: '/images/projects/kushwal-wall-street.jpg',
  },
  'aradhya-square': {
    slug: 'aradhya-square',
    title: 'Aaradhya Square Tower',
    developer: 'MICL, Mumbai',
    location: 'Ghatkopar, Mumbai',
    category: 'Commercial',
    src: '/images/projects/aradhya-square.jpg',
  },
  'gera-imperium-gateway': {
    slug: 'gera-imperium-gateway',
    title: 'Gera Imperium Gateway',
    developer: 'Gera Developers',
    location: 'PCMC, Pune',
    category: 'Commercial',
    src: '/images/projects/gera-imperium-gateway.jpg',
  },
  'nyati-empress': {
    slug: 'nyati-empress',
    title: 'Nyati Empress',
    developer: 'Nyati Group',
    location: 'Vimanagar, Pune',
    category: 'Commercial',
    src: '/images/projects/nyati-empress.jpg',
  },
  '33-keshavkung': {
    slug: '33-keshavkung',
    title: '33 Keshavkunj',
    developer: 'Crystal Properties',
    location: 'Keshavnagar, Pune',
    category: 'Commercial',
    src: '/images/projects/33-keshavkung.jpg',
  },
  'solitaire-business-hub': {
    slug: 'solitaire-business-hub',
    title: 'Solitaire Business Hub',
    developer: 'Solitaire Group',
    location: 'Balewadi, Pune',
    category: 'Commercial',
    src: '/images/projects/solitaire-business-hub.jpg',
  },
  'atrium-mall': {
    slug: 'atrium-mall',
    title: 'Atrium Mall Commercial',
    developer: 'VTP Realty',
    location: 'Magarpatta, Pune',
    category: 'Commercial',
    src: '/images/projects/atrium-mall.jpg',
  },
  'pune-airport': {
    slug: 'pune-airport',
    title: 'Pune Airport Terminal',
    developer: 'Airports Authority of India',
    location: 'Pune',
    category: 'Airports',
    src: '/images/projects/pune-airport.jpg',
  },
  'srinagar-airport': {
    slug: 'srinagar-airport',
    title: 'Srinagar Airport',
    developer: 'Airports Authority of India',
    location: 'Srinagar',
    category: 'Airports',
    src: '/images/projects/srinagar-airport.jpg',
  },
  'aurangabad-airport': {
    slug: 'aurangabad-airport',
    title: 'Aurangabad Airport',
    developer: 'Airports Authority of India',
    location: 'Aurangabad',
    category: 'Airports',
    src: '/images/projects/aurangabad-airport.jpg',
  },
  'goa-airport': {
    slug: 'goa-airport',
    title: 'Goa International Airport',
    developer: 'Airports Authority of India',
    location: 'Goa',
    category: 'Airports',
    src: '/images/projects/goa-airport.jpg',
  },
}

/**
 * Resolves a raw image URL, filename, slug or project object into a canonical PdpLinkedProject
 */
export function resolveProjectInfo(
  item: string | Partial<PdpLinkedProject> | any
): PdpLinkedProject {
  if (!item) {
    return {
      src: '/images/projects/balmoral-by-riverside.jpg',
      title: 'Balmoral by Riverside',
      developer: 'Kasturi Builder',
      location: 'Baner, Pune',
      category: 'Residential',
      slug: 'balmoral-by-riverside',
    }
  }

  // If already an object with title provided explicitly
  if (typeof item === 'object') {
    const rawSrc = item.src || item.imageUrl || item.image?.url || ''
    const rawTitle = item.title

    if (rawTitle && rawTitle.trim() && rawTitle !== 'MAGIC GLASS INSTALLATION') {
      return {
        src: rawSrc || '/images/projects/balmoral-by-riverside.jpg',
        title: rawTitle.trim(),
        developer: item.developer,
        location: item.location,
        category: item.category || 'Featured Project',
        slug: item.slug,
      }
    }
    // Otherwise fallback to resolving from src / slug
    item = rawSrc || item.slug || ''
  }

  const str = String(item).toLowerCase()

  // Match against known project keywords
  if (str.includes('balmoral')) return AUTHENTIC_PROJECTS_REGISTRY['balmoral-by-riverside']
  if (str.includes('the-ark') || str.includes('tribeca')) return AUTHENTIC_PROJECTS_REGISTRY['the-ark']
  if (str.includes('varde') || str.includes('verde') || str.includes('abil')) return AUTHENTIC_PROJECTS_REGISTRY['verde']
  if (str.includes('platino')) return AUTHENTIC_PROJECTS_REGISTRY['ganga-platino']
  if (str.includes('trueno')) return AUTHENTIC_PROJECTS_REGISTRY['ganga-trueno']
  if (str.includes('elysia')) return AUTHENTIC_PROJECTS_REGISTRY['nyati-elysia']
  if (str.includes('empress')) return AUTHENTIC_PROJECTS_REGISTRY['nyati-empress']
  if (str.includes('eon')) return AUTHENTIC_PROJECTS_REGISTRY['eon-homes']
  if (str.includes('apostrophe')) return AUTHENTIC_PROJECTS_REGISTRY['apostrophe']
  if (str.includes('kushwal') || str.includes('kushal')) return AUTHENTIC_PROJECTS_REGISTRY['kushwal-wall-street']
  if (str.includes('aradhya') || str.includes('aaradhya')) return AUTHENTIC_PROJECTS_REGISTRY['aradhya-square']
  if (str.includes('gera')) return AUTHENTIC_PROJECTS_REGISTRY['gera-imperium-gateway']
  if (str.includes('keshav')) return AUTHENTIC_PROJECTS_REGISTRY['33-keshavkung']
  if (str.includes('solit')) return AUTHENTIC_PROJECTS_REGISTRY['solitaire-business-hub']
  if (str.includes('atrium')) return AUTHENTIC_PROJECTS_REGISTRY['atrium-mall']
  if (str.includes('pune-airport') || (str.includes('pune') && str.includes('airport')))
    return AUTHENTIC_PROJECTS_REGISTRY['pune-airport']
  if (str.includes('srinagar')) return AUTHENTIC_PROJECTS_REGISTRY['srinagar-airport']
  if (str.includes('aurangabad')) return AUTHENTIC_PROJECTS_REGISTRY['aurangabad-airport']
  if (str.includes('goa')) return AUTHENTIC_PROJECTS_REGISTRY['goa-airport']

  // Clean filename fallback
  const filename = String(item).split('/').pop()?.split('.')[0] || 'Architectural Project'
  const cleanedTitle = filename
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    src: typeof item === 'string' ? item : '/images/projects/balmoral-by-riverside.jpg',
    title: cleanedTitle,
    developer: 'Magic Glass Installation',
    location: 'Architectural Glazing',
    category: 'Commercial',
  }
}
