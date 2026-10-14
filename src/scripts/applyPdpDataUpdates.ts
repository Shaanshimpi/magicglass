import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'src/components/PDP/pdpData.ts')

// We will load the file as text and update the 16 product definitions cleanly
const UPDATES: Record<string, {
  detailImages: [string, string]
  galleryImageItems: Array<{ src: string; title: string }>
  galleryImages: [string, string, string, string]
  sliderImages: string[]
  industries?: Array<{ title: string; image: string; description: string }>
}> = {
  'toughened-glass': {
    detailImages: [
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/windows.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/safety-doors.png', title: 'COMMERCIAL SAFETY DOORS' },
      { src: '/images/products/details/automotive.png', title: 'AUTOMOTIVE GLASS' },
      { src: '/images/products/details/furniture.png', title: 'FURNITURE & TABLETOPS' },
      { src: '/images/products/details/facades.png', title: 'CURTAIN WALL FAÇADES' },
    ],
    galleryImages: [
      '/images/products/details/safety-doors.png',
      '/images/products/details/automotive.png',
      '/images/products/details/furniture.png',
      '/images/products/details/facades.png',
    ],
    sliderImages: [
      '/images/projects/balmoral-by-riverside.jpg',
      '/images/projects/the-ark.jpg',
      '/images/projects/verde.jpg',
      '/images/projects/ganga-platino.jpg',
    ],
  },
  'clear-glass': {
    detailImages: [
      '/images/products/details/interiors.png',
      '/images/products/details/staircase.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/partitions.png', title: 'OFFICE PARTITIONS' },
      { src: '/images/products/details/Shower.png', title: 'LUXURY SHOWER CUBICLES' },
      { src: '/images/products/details/balconies.png', title: 'BALCONY BALUSTRADES' },
      { src: '/images/products/details/display-showcases.png', title: 'SHOWCASES & DISPLAY' },
    ],
    galleryImages: [
      '/images/products/details/partitions.png',
      '/images/products/details/Shower.png',
      '/images/products/details/balconies.png',
      '/images/products/details/display-showcases.png',
    ],
    sliderImages: [
      '/images/projects/apostrophe.jpg',
      '/images/projects/nyati-elysia.jpg',
      '/images/projects/eon-homes.jpg',
      '/images/projects/balmoral-by-riverside.jpg',
    ],
  },
  'extra-clear-glass': {
    detailImages: [
      '/images/products/details/shopfronts.png',
      '/images/products/details/display-showcases.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/kitchens.png', title: 'LUXURY KITCHEN SPLASHBACKS' },
      { src: '/images/products/details/tabletops.png', title: 'CRYSTAL TABLETOPS' },
      { src: '/images/products/details/partitions.png', title: 'SEAMLESS PARTITIONS' },
      { src: '/images/products/details/Shower.png', title: 'PREMIUM SHOWER ENCLOSURES' },
    ],
    galleryImages: [
      '/images/products/details/kitchens.png',
      '/images/products/details/tabletops.png',
      '/images/products/details/partitions.png',
      '/images/products/details/Shower.png',
    ],
    sliderImages: [
      '/images/projects/verde.jpg',
      '/images/projects/the-ark.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/nyati-empress.jpg',
    ],
  },
  'hs-glass': {
    detailImages: [
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/balconies.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/facades-reflective.png', title: 'REFLECTIVE FAÇADES' },
      { src: '/images/products/details/exterior-windows.png', title: 'EXTERIOR ENVELOPE WINDOWS' },
      { src: '/images/products/details/windows-2.png', title: 'ARCHITECTURAL WINDOWS' },
      { src: '/images/products/details/facades-1.png', title: 'STRUCTURAL SPANDREL FAÇADES' },
    ],
    galleryImages: [
      '/images/products/details/facades-reflective.png',
      '/images/products/details/exterior-windows.png',
      '/images/products/details/windows-2.png',
      '/images/products/details/facades-1.png',
    ],
    sliderImages: [
      '/images/projects/ganga-trueno.jpg',
      '/images/projects/kushwal-wall-street.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
    ],
  },
  'heat-soaked-glass': {
    detailImages: [
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/OVERHEAD-SPACES-1.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/facades-3.png', title: 'TALL TOWER FAÇADES' },
      { src: '/images/products/details/glass-lifts-1.png', title: 'PANORAMIC GLASS LIFTS' },
      { src: '/images/products/details/Public-Spaces.png', title: 'PUBLIC INFRASTRUCTURE' },
      { src: '/images/products/details/safety-doors.png', title: 'CERTIFIED SAFETY ENTRANCES' },
    ],
    galleryImages: [
      '/images/products/details/facades-3.png',
      '/images/products/details/glass-lifts-1.png',
      '/images/products/details/Public-Spaces.png',
      '/images/products/details/safety-doors.png',
    ],
    sliderImages: [
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
      '/images/projects/gera-imperium-gateway.jpg',
      '/images/projects/pune-airport.jpg',
    ],
    industries: [
      {
        title: 'HIGH-RISE TOWERS',
        image: '/images/products/details/high-rise-buildings.png',
        description:
          'Heat Soak Testing (HST) eliminates spontaneous breakage caused by nickel sulfide (NiS) inclusions, making it essential for overhead structural canopies and high-rise curtain walls.',
      },
      {
        title: 'PUBLIC INFRASTRUCTURE & TRANSIT',
        image: '/images/products/details/Public-Spaces.png',
        description:
          'Installed across metro rail stations, passenger terminals, and sports stadiums where public safety and zero spontaneous shatter risk are strictly mandated.',
      },
      {
        title: 'OVERHEAD CANOPIES & SKYLIGHTS',
        image: '/images/products/details/OVERHEAD-SPACES-1.png',
        description:
          'Critical for overhead skylights, glass bridges, and atrium roofs where glass must endure extreme thermal cycling without spontaneous failure.',
      },
    ],
  },
  'sentry-laminated-glass': {
    detailImages: [
      '/images/products/details/sentry-fins.jpg',
      '/images/products/details/glass-lifts-1.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/OVERHEAD-SPACES-1.png', title: 'STRUCTURAL CANOPIES' },
      { src: '/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png', title: 'CANTILEVERED BALUSTRADES' },
      { src: '/images/products/details/doors-1.png', title: 'HURRICANE & IMPACT DOORS' },
      { src: '/images/products/details/facades.png', title: 'POINT-SUPPORTED CURTAIN WALLS' },
    ],
    galleryImages: [
      '/images/products/details/OVERHEAD-SPACES-1.png',
      '/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png',
      '/images/products/details/doors-1.png',
      '/images/products/details/facades.png',
    ],
    sliderImages: [
      '/images/projects/pune-airport.jpg',
      '/images/projects/goa-airport.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
    ],
  },
  'acoustic-lami-glass': {
    detailImages: [
      '/images/products/details/acoustic-boardroom.jpg',
      '/images/products/details/acoustic-hero-wide.jpg',
    ],
    galleryImageItems: [
      { src: '/images/products/details/windows-2.png', title: 'SOUND-DAMPENING WINDOWS' },
      { src: '/images/products/details/partitions-1.png', title: 'OFFICE PRIVACY PARTITIONS' },
      { src: '/images/products/details/doors-2.png', title: 'ACOUSTIC GLAZED DOORS' },
      { src: '/images/products/details/architectural-interior.png', title: 'CONFERENCE AUDITORIUMS' },
    ],
    galleryImages: [
      '/images/products/details/windows-2.png',
      '/images/products/details/partitions-1.png',
      '/images/products/details/doors-2.png',
      '/images/products/details/architectural-interior.png',
    ],
    sliderImages: [
      '/images/projects/pune-airport.jpg',
      '/images/projects/srinagar-airport.jpg',
      '/images/projects/aurangabad-airport.jpg',
      '/images/projects/goa-airport.jpg',
    ],
  },
  'pvb-laminated-glass': {
    detailImages: [
      '/images/products/details/OVERHEAD-SPACES-1.png',
      '/images/products/details/glass-lifts-1.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/windows-1.png', title: 'SECURITY WINDOWS' },
      { src: '/images/products/details/railings-staircase-partitions.png', title: 'STAIRCASE & BALUSTRADES' },
      { src: '/images/products/details/doors-2.png', title: 'SAFETY ENTRANCE DOORS' },
      { src: '/images/products/details/facades-1.png', title: 'LAMINATED FAÇADE PANELS' },
    ],
    galleryImages: [
      '/images/products/details/windows-1.png',
      '/images/products/details/railings-staircase-partitions.png',
      '/images/products/details/doors-2.png',
      '/images/products/details/facades-1.png',
    ],
    sliderImages: [
      '/images/projects/balmoral-by-riverside.jpg',
      '/images/projects/ganga-trueno.jpg',
      '/images/projects/eon-homes.jpg',
      '/images/projects/nyati-elysia.jpg',
    ],
  },
  'insulated-glass-dgu': {
    detailImages: [
      '/images/products/details/dgu-facade.jpg',
      '/images/products/details/high-rise-buildings.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/facades-3.png', title: 'ENERGY-EFFICIENT FAÇADES' },
      { src: '/images/products/details/partitions-1.png', title: 'CLIMATE CONTROLLED PARTITIONS' },
      { src: '/images/products/details/windows-2.png', title: 'DUAL PANE CASEMENT WINDOWS' },
      { src: '/images/products/details/Airports.png', title: 'AIRPORT TERMINALS' },
    ],
    galleryImages: [
      '/images/products/details/facades-3.png',
      '/images/products/details/partitions-1.png',
      '/images/products/details/windows-2.png',
      '/images/products/details/Airports.png',
    ],
    sliderImages: [
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
      '/images/projects/atrium-mall.jpg',
      '/images/projects/gera-imperium-gateway.jpg',
    ],
  },
  'dgu-laminated-glass': {
    detailImages: [
      '/images/products/details/dgu-facade.jpg',
      '/images/products/details/hospitality-1-2.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/windows-2.png', title: 'ACOUSTIC THERMAL WINDOWS' },
      { src: '/images/products/details/facades-3.png', title: 'STRUCTURAL DGU FAÇADES' },
      { src: '/images/products/details/Airports.png', title: 'AIRPORT CONCOURSE WALLS' },
      { src: '/images/products/details/high-rise-buildings.png', title: 'HIGH-RISE SKYLINE ENVELOPES' },
    ],
    galleryImages: [
      '/images/products/details/windows-2.png',
      '/images/products/details/facades-3.png',
      '/images/products/details/Airports.png',
      '/images/products/details/high-rise-buildings.png',
    ],
    sliderImages: [
      '/images/projects/pune-airport.jpg',
      '/images/projects/goa-airport.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
    ],
  },
  'high-performance-low-e-glass': {
    detailImages: [
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/windows-2.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/facades-1.png', title: 'SOLAR CONTROL FAÇADES' },
      { src: '/images/products/details/Public-Spaces.png', title: 'PUBLIC INFRASTRUCTURE ENVELOPES' },
      { src: '/images/products/details/facades-3.png', title: 'COMMERCIAL GLAZED TOWERS' },
      { src: '/images/products/details/partitions-1.png', title: 'DAYLIGHT ATRIUMS' },
    ],
    galleryImages: [
      '/images/products/details/facades-1.png',
      '/images/products/details/Public-Spaces.png',
      '/images/products/details/facades-3.png',
      '/images/products/details/partitions-1.png',
    ],
    sliderImages: [
      '/images/projects/gera-imperium-gateway.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/kushwal-wall-street.jpg',
      '/images/projects/nyati-empress.jpg',
    ],
  },
  'skn-ultra-high-performance-glass': {
    detailImages: [
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/OVERHEAD-SPACES-1.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/facades-1.png', title: 'FLAGSHIP COMMERCIAL CURTAIN WALLS' },
      { src: '/images/products/details/windows-1.png', title: 'HIGH-TRANSMISSION WINDOWS' },
      { src: '/images/products/details/facades-3.png', title: 'PREMIER OFFICE TOWERS' },
      { src: '/images/products/details/Public-Spaces.png', title: 'METRO & TRANSPORT HUBS' },
    ],
    galleryImages: [
      '/images/products/details/facades-1.png',
      '/images/products/details/windows-1.png',
      '/images/products/details/facades-3.png',
      '/images/products/details/Public-Spaces.png',
    ],
    sliderImages: [
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/aradhya-square.jpg',
      '/images/projects/atrium-mall.jpg',
      '/images/projects/ganga-trueno.jpg',
    ],
  },
  'fire-safety-glass': {
    detailImages: [
      '/images/products/details/fire-doors.jpg',
      '/images/products/details/architecture-hospitals.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/safety-doors.png', title: 'FIRE RATED CORRIDOR DOORS' },
      { src: '/images/products/details/partitions-1.png', title: 'COMPARTMENTAL FIRE PARTITIONS' },
      { src: '/images/products/details/Public-Spaces.png', title: 'TRANSIT & PUBLIC EVACUATION ZONES' },
      { src: '/images/products/details/hospitality-1.png', title: 'HOTEL STAIRWELL ENCLOSURES' },
    ],
    galleryImages: [
      '/images/products/details/safety-doors.png',
      '/images/products/details/partitions-1.png',
      '/images/products/details/Public-Spaces.png',
      '/images/products/details/hospitality-1.png',
    ],
    sliderImages: [
      '/images/projects/aurangabad-airport.jpg',
      '/images/projects/srinagar-airport.jpg',
      '/images/projects/pune-airport.jpg',
      '/images/projects/33-keshavkung.jpg',
    ],
  },
  'ceramic-glass': {
    detailImages: [
      '/images/products/details/ceramic-frit.jpg',
      '/images/products/details/INTERIOR-DECOR-1.png',
    ],
    galleryImageItems: [
      { src: '/images/products/details/interiors.png', title: 'CERAMIC ENAMELLED WALLS' },
      { src: '/images/products/details/facades-1.png', title: 'FRITTED SOLAR CONTROL FAÇADES' },
      { src: '/images/products/details/high-rise-buildings.png', title: 'SPANDREL GLASS PANELS' },
      { src: '/images/products/details/shopfronts.png', title: 'BRANDED RETAIL SHOPFRONTS' },
    ],
    galleryImages: [
      '/images/products/details/interiors.png',
      '/images/products/details/facades-1.png',
      '/images/products/details/high-rise-buildings.png',
      '/images/products/details/shopfronts.png',
    ],
    sliderImages: [
      '/images/projects/atrium-mall.jpg',
      '/images/projects/solitaire-business-hub.jpg',
      '/images/projects/nyati-empress.jpg',
      '/images/projects/kushwal-wall-street.jpg',
    ],
  },
  'frosted-glass': {
    detailImages: [
      '/images/products/details/frosted-office.jpg',
      '/images/products/details/frosted-bathroom.jpg',
    ],
    galleryImageItems: [
      { src: '/images/products/details/furniture.png', title: 'FURNITURE & TABLETOPS' },
      { src: '/images/products/details/bathrooms.png', title: 'LUXURY BATHROOMS' },
      { src: '/images/products/details/frosted-railing.jpg', title: 'PRIVACY BALCONY BALUSTRADES' },
      { src: '/images/products/details/wall-partitions-doors.png', title: 'SLIDING DOORS & PARTITIONS' },
    ],
    galleryImages: [
      '/images/products/details/furniture.png',
      '/images/products/details/bathrooms.png',
      '/images/products/details/frosted-railing.jpg',
      '/images/products/details/wall-partitions-doors.png',
    ],
    sliderImages: [
      '/images/projects/balmoral-by-riverside.jpg',
      '/images/projects/verde.jpg',
      '/images/projects/the-ark.jpg',
      '/images/projects/ganga-platino.jpg',
    ],
  },
  'mirror-glass': {
    detailImages: [
      '/images/products/details/mirror-vanity.jpg',
      '/images/products/details/mirror-wall.jpg',
    ],
    galleryImageItems: [
      { src: '/images/products/details/INTERIOR-DECOR.png', title: 'INTERIOR & LUXURY DECOR' },
      { src: '/images/products/details/bathrooms.png', title: 'BATHROOMS & VANITIES' },
      { src: '/images/products/details/furniture.png', title: 'FURNITURE & WARDROBES' },
      { src: '/images/products/details/shopfronts.png', title: 'COMMERCIAL & DISPLAY' },
    ],
    galleryImages: [
      '/images/products/details/INTERIOR-DECOR.png',
      '/images/products/details/bathrooms.png',
      '/images/products/details/furniture.png',
      '/images/products/details/shopfronts.png',
    ],
    sliderImages: [
      '/images/projects/the-ark.jpg',
      '/images/projects/verde.jpg',
      '/images/projects/balmoral-by-riverside.jpg',
      '/images/projects/apostrophe.jpg',
    ],
  },
}

import { PDP_MOCK_DATA } from '../components/PDP/pdpData'
const currentData = PDP_MOCK_DATA

for (const [slug, update] of Object.entries(UPDATES)) {
  if (currentData[slug]) {
    currentData[slug].detailImages = update.detailImages
    currentData[slug].galleryImageItems = update.galleryImageItems
    currentData[slug].galleryImages = update.galleryImages
    currentData[slug].sliderImages = update.sliderImages
    if (update.industries) {
      currentData[slug].industries = update.industries
    }
  }
}

// Generate the new file content preserving types and export
const outputCode = `import { PdpLinkedProject } from './pdpProjectsRegistry'

export interface TechnicalSpec {
  icon?: string
  label: string
  value: string
}

export interface IndustryItem {
  title: string
  image: string
  description: string
}

export interface PdpProductDetail {
  id: string
  indexNumber: string
  title: string
  subheading?: string
  category: string
  heroImage: string
  introSummary: string
  secondaryText: string
  detailImages: [string, string]
  characteristics: string[]
  specs?: TechnicalSpec[]
  galleryTitle?: string
  galleryImageItems?: Array<{ src: string; title?: string }>
  galleryImages: [string, string, string, string]
  industries?: IndustryItem[]
  sliderImages: Array<string | PdpLinkedProject>
  relatedProductIds: [string, string]
}

export const PDP_MOCK_DATA: Record<string, PdpProductDetail> = ${JSON.stringify(currentData, null, 2)}
`

fs.writeFileSync(filePath, outputCode, 'utf-8')
console.log('✓ Successfully updated src/components/PDP/pdpData.ts with clean, authentic, non-repetitive glass image mappings!')
