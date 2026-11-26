export interface TechnicalMetric {
  label: string
  value: string
  sub?: string
}

export interface HeroDataset {
  id: string
  name: string
  badge: string
  title: string
  tagline: string
  description: string
  primaryCta: string
  secondaryCta: string
  heroImage: string
  additionalImages: string[]
  metrics: TechnicalMetric[]
  tags: string[]
  specTitle: string
}

export const HERO_DATASETS: Record<string, HeroDataset> = {
  infrastructure: {
    id: 'infrastructure',
    name: 'Infrastructure',
    badge: 'MANUFACTURING & STATE-OF-THE-ART FACILITIES',
    title: 'Infrastructure',
    tagline: 'High-Resilience Architectural Glass Processing & Zero-Downtime Facility',
    description:
      'We uphold the pinnacle of manufacturing resilience, quality, and operational continuity. Equipped with dual automated CNC cutting lines, twin forced-convection tempering furnaces, and dedicated generator backups, our production eliminates single-point downtime risks from raw float cutting through precision edge processing.',
    primaryCta: 'Enquire About Facilities',
    secondaryCta: 'Download Plant Specs',
    heroImage: '/images/infrastructure/banner-1.png',
    additionalImages: [
      '/images/infrastructure/banner-1.png',
      '/images/infrastructure/toughening.jpg',
      '/images/infrastructure/cutting.jpg',
      '/images/infrastructure/lamination.jpg',
      '/images/infrastructure/dgu.jpg',
      '/images/infrastructure/quality-lab.jpg',
    ],
    metrics: [
      { label: 'Line Redundancy', value: '100% Dual', sub: 'Zero Single Point of Failure' },
      { label: 'Max Processing', value: '4000 × 2500 mm', sub: 'Oversized Architectural Sheets' },
      { label: 'Convection Tempering', value: '650 °C', sub: 'Twin Forced-Air Furnaces' },
      { label: 'Power Continuity', value: '24/7 Redundant', sub: 'Dedicated Industrial Diesel Gensets' },
    ],
    tags: [
      'Dual CNC Cutting Lines',
      'Forced-Convection Tempering',
      'Cleanroom Autoclave Lamination',
      'Robotic DGU Sealing',
      'Argon Gas Filling ≥90%',
    ],
    specTitle: 'Manufacturing Capability & Plant Architecture',
  },
  'toughened-glass': {
    id: 'toughened-glass',
    name: 'Toughened Glass (PDP)',
    badge: 'FORTIFIED SAFETY GLASS // 4X STRENGTH',
    title: 'Toughened Glass',
    tagline: 'Fortified Safety Glass with Quadruple Mechanical Strength',
    description:
      'Toughened glass, commonly referred to as Tempered glass, stands as fortified safety glass whose mechanical strength is amplified fourfold through precision thermal quenching at 650°C. Engineered for maximum wind-load resilience, thermal shock tolerance, and safe dicing fragmentation in high-rise curtain walls and architectural canopies.',
    primaryCta: 'Request Specification Sheet',
    secondaryCta: 'View Structural Test Data',
    heroImage: '/images/products/heroes/toughened-glass.png',
    additionalImages: [
      '/images/products/heroes/toughened-glass.png',
      '/images/products/heroes/clear-glass.jpg',
      '/images/products/heroes/extra-clear-glass.jpg',
      '/images/infrastructure/toughening.jpg',
    ],
    metrics: [
      { label: 'Mechanical Strength', value: '4× Annealed', sub: 'Quadruple Impact Resistance' },
      { label: 'Bending Strength', value: '120 N/mm²', sub: 'Surface Compressive Stress' },
      { label: 'Thermal Resistance', value: 'Up to 250 °C', sub: 'Delta T Thermal Shock Proof' },
      { label: 'Breakage Safety', value: 'EN 12150-1', sub: 'Safe Granular Dicing Fragments' },
    ],
    tags: [
      'High-Rise Facades',
      'Structural Balustrades',
      'Point-Supported Spider Glazing',
      'Frameless Commercial Entrances',
    ],
    specTitle: 'Thermal Fortification & Safety Certification',
  },
  'acoustic-laminated': {
    id: 'acoustic-laminated',
    name: 'Acoustic Laminated Glass (PDP)',
    badge: 'ACOUSTIC SHIELDING & IMPACT INTEGRITY',
    title: 'Acoustic Laminated Glass',
    tagline: 'Advanced Sound Attenuation & Shatter-Retention Glazing',
    description:
      'Engineered multi-layer composite integrating high-damping acoustic PVB and SentryGlas® structural interlayers. Dampens exterior noise across traffic and aviation frequencies while maintaining full structural barrier retention even under intentional impact.',
    primaryCta: 'Request Acoustic Decibel Rating',
    secondaryCta: 'Explore Interlayer Types',
    heroImage: '/images/products/heroes/acoustic-lami-glass.jpg',
    additionalImages: [
      '/images/products/heroes/acoustic-lami-glass.jpg',
      '/images/products/heroes/pvb-laminated-glass.jpg',
      '/images/products/heroes/sentry-laminated-glass.jpg',
      '/images/infrastructure/lamination.jpg',
    ],
    metrics: [
      { label: 'Sound Attenuation', value: 'Up to 45 dB', sub: 'Acoustic Damping Interlayer' },
      { label: 'UV Rejection', value: '99.9%', sub: 'Fading Protection for Interiors' },
      { label: 'Interlayer Options', value: 'PVB / SG® / EVA', sub: 'Autoclave Heat-Pressure Bond' },
      { label: 'Post-Breakage', value: 'Zero Falling Glass', sub: 'Adheres Securely to Interlayer' },
    ],
    tags: [
      'Airport & Highway Enclosures',
      'Executive Boardroom Partitions',
      'Overhead Skylights & Canopies',
      'Anti-Intrusion Security Glass',
    ],
    specTitle: 'Acoustic Attenuation & Interlayer Matrix',
  },
  'insulated-dgu': {
    id: 'insulated-dgu',
    name: 'Double Glazed Units (DGU) (PDP)',
    badge: 'ENERGY EFFICIENCY & THERMAL INSULATION',
    title: 'Double Glazed Units (DGU)',
    tagline: 'Dual-Sealed Insulated Glass with Low-E Coatings & Argon Cavity',
    description:
      'High-performance hermetically sealed double and triple glazed units engineered to slash heating and cooling loads in modern commercial developments. Assembled on robotic lines with dual-stage PIB and structural silicone barriers and filled with ≥90% Argon gas for superior U-values and solar heat gain control.',
    primaryCta: 'Get U-Value Calculation',
    secondaryCta: 'Compare Solar Specs',
    heroImage: '/images/products/heroes/insulated-glass-dgu.jpg',
    additionalImages: [
      '/images/products/heroes/insulated-glass-dgu.jpg',
      '/images/products/heroes/dgu-laminated-glass.png',
      '/images/products/heroes/high-performance-low-e-glass.jpg',
      '/images/infrastructure/dgu.jpg',
    ],
    metrics: [
      { label: 'U-Value Performance', value: '< 1.3 W/m²K', sub: 'Significant Energy Conservation' },
      { label: 'Cavity Gas Purity', value: '≥ 90% Argon', sub: 'Robotic Automated Filling' },
      { label: 'Seal Integrity', value: 'Dual PIB + Silicone', sub: '25-Year Moisture Hermetic Seal' },
      { label: 'Spacer Technology', value: 'Warm-Edge Spacer', sub: 'Prevents Perimeter Condensation' },
    ],
    tags: [
      'LEED / IGBC Certified Green Buildings',
      'Curtain Wall Systems',
      'Thermal Acoustic Facades',
      'Luxury Residential Glass',
    ],
    specTitle: 'Thermal Dynamics & Solar Performance',
  },
}

export interface HeroOptionMeta {
  id: number
  key: string
  name: string
  styleTheme: string
  layoutArchetype: string
  bestFor: string
  description: string
  pros: string[]
  recommendedFor: 'Infrastructure' | 'Product Detail Page' | 'Both'
}

export const HERO_OPTIONS_METADATA: HeroOptionMeta[] = [
  {
    id: 1,
    key: 'split-editorial',
    name: 'Option 1: Architectural Split Editorial',
    styleTheme: 'Bauhaus / Architectural Magazine',
    layoutArchetype: '50/50 Desktop Split Grid',
    bestFor: 'High text readability, technical spec scanning, balanced media presence',
    description:
      'A refined editorial split pairing crisp typography, industrial telemetry counters, and a monumental architectural glass image frame with micro-bezel border and ambient reflections.',
    pros: [
      'Zero text overlay over imagery ensures 100% legibility on all devices',
      'Key technical metrics are immediately visible before scrolling',
      'Converts cleanly to an intuitive single-column stack on mobile viewports',
    ],
    recommendedFor: 'Both',
  },
  {
    id: 2,
    key: 'cinematic-glass',
    name: 'Option 2: Cinematic Full-Bleed Glass Overlay',
    styleTheme: 'Awwwards / Apple Pro Luxury',
    layoutArchetype: 'Full-Bleed Panoramic Scrim with Floating Frosted Console',
    bestFor: 'Maximum visual impact, high-end photography, luxury commercial feel',
    description:
      'Immersive full-bleed architectural photograph with a dark cinematic gradient scrim and an ultra-refined frosted glass control card with live telemetry ticker and pulsing status indicators.',
    pros: [
      'Creates instant "wow" factor upon landing on the page',
      'Showcases the grand scale of Magic Glass architectural projects & facilities',
      'Floating glass card reinforces glass industry materiality with authentic backdrop blur',
    ],
    recommendedFor: 'Infrastructure',
  },
  {
    id: 3,
    key: 'architectural-bento',
    name: 'Option 3: Asymmetrical Architectural Bento',
    styleTheme: 'Modern Industrial Tech / Linear Style',
    layoutArchetype: 'Multi-Tile Asymmetrical Bento Grid',
    bestFor: 'Information density, technical credibility, modern corporate buyers',
    description:
      'A modular 3-tile bento layout distributing the narrative title, a high-aspect visual frame, and a live technical spec matrix into clean machined tiles.',
    pros: [
      'Breaks away from standard hero clichés with structured visual rhythm',
      'Provides dedicated real estate for certifications, capabilities, and call-to-actions',
      'Highly flexible: easily accommodates extra facility badges or data points',
    ],
    recommendedFor: 'Both',
  },
  {
    id: 4,
    key: 'framed-console',
    name: 'Option 4: Floating Glass Console on Depth Background',
    styleTheme: 'Precision Engineering / Vanguard Depth',
    layoutArchetype: 'Framed Picture-Window with Inset Floating Glass Pod',
    bestFor: 'Direct focus on inquiry conversion, tactile UI feel, branded luxury',
    description:
      'A framed architectural glass window with deep ambient lighting and an offset floating frosted glass console panel with illuminated border highlights and inline inquiry trigger.',
    pros: [
      'Gives users an authentic tactile glass feeling directly on screen',
      'Keeps conversion CTAs front and center without feeling aggressive',
      'High contrast ratio provides exceptional accessibility compliance',
    ],
    recommendedFor: 'Product Detail Page',
  },
  {
    id: 5,
    key: 'swiss-technical',
    name: 'Option 5: Swiss Minimalist & Telemetry Grid',
    styleTheme: 'Swiss International Style / Technical Blueprint',
    layoutArchetype: 'Structured Horizontal Banding with Monospace Indexing',
    bestFor: 'Architects, facade engineers, structural consultants, procurement teams',
    description:
      'Pure architectural confidence: strict typographic discipline, monospaced system index stamp, precision hairline rules, and an expansive architectural perspective window below.',
    pros: [
      'Instantly establishes institutional authority and engineering rigor',
      'Very fast perceived load performance with clean typographic rhythm',
      'Preferred by architects and specifiers who value precision over marketing fluff',
    ],
    recommendedFor: 'Both',
  },
]
