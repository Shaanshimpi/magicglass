export interface ProductItem {
  id: string
  title: string
  category: 'structural' | 'interior' | 'safety' | 'specialty'
  categoryLabel: string
  badgeText: string
  thicknessRange: string
  description: string
  features: string[]
  image: string
  isTopFeatured?: boolean
}

export interface CategoryInfo {
  id: 'all' | 'structural' | 'interior' | 'safety' | 'specialty'
  code: string
  label: string
  title: string
  description: string
}

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: 'all',
    code: '00',
    label: 'ALL PRODUCTS',
    title: 'Complete Architectural Glass Collection',
    description:
      'Explore Magic Glass’s complete architectural portfolio—spanning structural glazing fins, high-performance low-E solar control facades, acoustic laminates, heat-soaked toughened safety glass, and custom decorative fritted solutions.',
  },
  {
    id: 'structural',
    code: '01',
    label: 'STRUCTURAL & EXTERIOR',
    title: 'Structural Glazing & High-Performance Facade Systems',
    description:
      'Engineered for maximum structural integrity, hurricane load endurance, and solar energy control. Featuring SentryGlas® ionoplast interlayers, SKN-ultra low-E coatings, and double-glazed insulated DGU units.',
  },
  {
    id: 'interior',
    code: '02',
    label: 'INTERIOR & PARTITIONS',
    title: 'Acoustic Partitions & Interior Glazing Systems',
    description:
      'Precision acoustic and decorative interior solutions designed for corporate office spaces, hospitality, and modern residential interiors with up to 42dB acoustic isolation and non-fingerprint satin finishes.',
  },
  {
    id: 'safety',
    code: '03',
    label: 'SAFETY & PROCESSING',
    title: 'Toughened, Heat Soaked & High-Security Glass',
    description:
      'Advanced thermal processing and safety engineering. Certified heat-soak testing to prevent nickel sulfide (NiS) spontaneous breakage, alongside EW60/EI90 fire-rated and bullet-resistant laminates.',
  },
  {
    id: 'specialty',
    code: '04',
    label: 'SPECIALTY & DECORATIVE',
    title: 'Ceramic Fritted, Satin Etched & Architectural Mirrors',
    description:
      'Artisanal ceramic matrix printing, acid-etched satin privacy surfaces, and high-reflection silver and tinted architectural mirrors tailored for interior facades and feature walls.',
  },
]

export const TOP_3_FEATURED: ProductItem[] = [
  {
    id: 'sentry-laminated-glass',
    title: 'Sentry Laminated Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'STRUCTURAL FIN / CANOPY',
    thicknessRange: '12.76mm - 40mm',
    description:
      'Ultra-rigid Ionoplast interlayer delivering 5x tear strength and 100x stiffness for structural fins and high-impact facades.',
    features: ['5x Tear Strength', 'Ionoplast Interlayer', 'Zero Delamination Risk', 'Structural Fin Rating'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Sentry-Laminated-Glass.png',
    isTopFeatured: true,
  },
  {
    id: 'skn-ultra-high-performance-glass',
    title: 'SKN-Ultra High-Performance Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'SOLAR CONTROL LOW-E',
    thicknessRange: '6mm - 12mm Substrates',
    description:
      'Advanced solar control coatings offering ultra-low SHGC (< 0.23) with maximum neutral daylight transmission.',
    features: ['SHGC < 0.23', 'Neutral High Daylight', 'Coated Double-Silver', 'LEED Compliant'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/magic-product-2.jpg',
    isTopFeatured: true,
  },
  {
    id: 'insulated-glass-dgu',
    title: 'DGU (Insulated Glass)',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'THERMAL & ACOUSTIC',
    thicknessRange: '24mm - 36mm Total DGU Assembly',
    description:
      'Dual-sealed argon filled double glazing units delivering superior thermal insulation (U-value < 1.1 W/m²K).',
    features: ['Argon Gas Filled', 'U-value < 1.1 W/m²K', 'Warm-Edge Spacer', 'Dual-Sealed Perimeter'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Insulated-Glass-DGU.png',
    isTopFeatured: true,
  },
]

export const ALL_PRODUCTS: ProductItem[] = [
  {
    id: 'clear-glass',
    title: 'Clear Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'FLOAT GLASS BASE',
    thicknessRange: '3mm - 19mm',
    description:
      'High-clarity primary float glass with uniform thickness, excellent light transmission, and superior optical flatness, serving as the foundational substrate for toughening and processing.',
    features: ['High Uniformity', 'Optically Flat', 'Base Processing Substrate'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Clear-Glass.png',
  },
  {
    id: 'extra-clear-glass',
    title: 'Extra Clear Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'LOW-IRON HIGH CLARITY',
    thicknessRange: '4mm - 19mm',
    description:
      'Ultra-transparent low-iron float glass engineered with minimal ferric oxide content. Completely eliminates the greenish edge tint of standard glass, ensuring maximum light transmission and true-color rendering.',
    features: ['Minimal Iron Content', 'No Green Edge Tint', '>91% Light Transmittance'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Extra-Clear-Glass.png',
  },
  {
    id: 'hs-glass',
    title: 'HS Glass',
    category: 'safety',
    categoryLabel: 'Safety & Processing',
    badgeText: 'HEAT STRENGTHENED',
    thicknessRange: '5mm - 12mm',
    description:
      'Heat-strengthened glass subjected to controlled heating and slower cooling than fully tempered glass. Offers 2x thermal and mechanical strength of annealed glass while breaking into large interlocked fragments.',
    features: ['2x Strength of Annealed', 'Interlocking Break Pattern', 'Ideal for Spandrel Panels'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/HS-Glass.png',
  },
  {
    id: 'heat-soaked-glass',
    title: 'Heat Soaked Glass',
    category: 'safety',
    categoryLabel: 'Safety & Processing',
    badgeText: 'NICKEL SULFIDE TESTED',
    thicknessRange: '5mm - 19mm',
    description:
      'Fully tempered glass subjected to a rigorous 290°C heat soak oven hold cycle (DIN EN 14179-1). Destroys any unstable Nickel Sulfide (NiS) inclusions in the factory to guarantee zero spontaneous breakage on high-rise facades.',
    features: ['DIN EN 14179-1 Certified', 'Zero Spontaneous Breakage', 'High-Rise Facade Safety'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/magic-product-3.jpg',
  },
  {
    id: 'sentry-laminated-glass',
    title: 'Sentry Laminated Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'IONOPLAST STRUCTURAL',
    thicknessRange: '12.76mm - 40mm',
    description:
      'Ultra-rigid Ionoplast interlayer delivering 5x tear strength and 100x stiffness compared to standard PVB. Essential for structural glass fins, spider fit curtains, overhead canopies, and high-impact hurricane facades.',
    features: ['5x Tear Strength', 'Ionoplast Interlayer', 'Zero Delamination Risk', 'Structural Fin Rating'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Sentry-Laminated-Glass.png',
  },
  {
    id: 'acoustic-lami-glass',
    title: 'Acoustic Lami Glass',
    category: 'interior',
    categoryLabel: 'Interior & Partitions',
    badgeText: '42dB SOUNDPROOFING',
    thicknessRange: '6.76mm - 16.76mm',
    description:
      'Specialized acoustic dampening PVB interlayer engineered to absorb airborne noise vibration across critical human speech frequencies, achieving sound reduction indexes up to STC 42dB.',
    features: ['STC 42dB Acoustic Rating', 'Noise Vibration Absorption', 'Speech Privacy Compliant'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Acoustic-Lami-Glass.png',
  },
  {
    id: 'pvb-laminated-glass',
    title: 'PVB Laminated Glass',
    category: 'safety',
    categoryLabel: 'Safety & Processing',
    badgeText: 'IMPACT SAFETY',
    thicknessRange: '6.38mm - 24.38mm',
    description:
      'Multi-layer safety glass bonded under elevated pressure and heat with tough Polyvinyl Butyral (PVB) interlayers. Ensures fragments adhere to the interlayer upon impact to prevent fall-through injuries.',
    features: ['Impact Fall-Through Protection', '99% UV Ray Rejection', 'Class 1 Safety Rated'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/PVB-Laminated-Glass.png',
  },
  {
    id: 'insulated-glass-dgu',
    title: 'DGU',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'INSULATED GLASS UNIT',
    thicknessRange: '24mm - 36mm Total DGU Assembly',
    description:
      'Hermetically sealed dual-pane glazing integrated with primary polyisobutylene seals, structural silicone, argon gas fill, and warm-edge spacers for optimal thermal insulation (U-value < 1.1 W/m²K).',
    features: ['Argon Gas Filled', 'U-value < 1.1 W/m²K', 'Warm-Edge Spacer', 'Dual-Sealed Perimeter'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Insulated-Glass-DGU.png',
  },
  {
    id: 'dgu-laminated-glass',
    title: 'DGU Laminated Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'DUAL INSULATED SAFETY',
    thicknessRange: '28mm - 42mm Total DGU',
    description:
      'Combines an outer solar control laminated pane with an inner low-E pane enclosing an insulated air cavity, delivering maximum structural impact safety, solar protection, and sound insulation in one unit.',
    features: ['Laminated Safety + DGU', 'Maximum Security Facades', 'Enhanced Acoustic & Thermal'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/IGU-Laminated-Glass.png',
  },
  {
    id: 'high-performance-low-e-glass',
    title: 'High Performance LOW-E Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'THERMAL SPECTRAL',
    thicknessRange: '6mm - 12mm Substrates',
    description:
      'Off-line magnetron sputtered soft-coated glass that reflects long-wave infrared thermal radiation back outside while permitting optimal natural light to penetrate building interiors.',
    features: ['Infrared Heat Reflection', 'Low Emissivity Coating', 'Reduces HVAC Energy Loads'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/High-Performance-LOW-E-Glass.png',
  },
  {
    id: 'skn-ultra-high-performance-glass',
    title: 'SKN-Ultra High-Performance Glass',
    category: 'structural',
    categoryLabel: 'Structural & Exterior Glazing',
    badgeText: 'SOLAR CONTROL LOW-E',
    thicknessRange: '6mm - 12mm Substrates',
    description:
      'Triple and double-silver solar control coatings delivering ultra-low Solar Heat Gain Coefficients (SHGC < 0.23) while maintaining exceptional neutral daylight transmittance for modern green building facades.',
    features: ['SHGC < 0.23', 'Neutral High Daylight', 'Coated Double-Silver', 'LEED Compliant'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/magic-product-2.jpg',
  },
  {
    id: 'fire-safety-glass',
    title: 'Fire & Safety Glass',
    category: 'safety',
    categoryLabel: 'Safety & Processing',
    badgeText: 'FIRE BARRIER CERTIFIED',
    thicknessRange: '10mm - 32mm',
    description:
      'Multi-layered intumescent gel interlayers that react to fire temperatures by turning into an opaque thermal insulation shield. Provides certified fire resistance from 30 up to 120 minutes.',
    features: ['30 - 120 Min Fire Protection', 'Intumescent Heat Shield', 'Radiant Heat Reduction'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Fire-Safety-Glass.png',
  },
  {
    id: 'ceramic-glass',
    title: 'Ceramic Glass',
    category: 'specialty',
    categoryLabel: 'Specialty & Decorative',
    badgeText: 'FRITTED SCREEN-PRINTED',
    thicknessRange: '5mm - 12mm',
    description:
      'High-temperature ceramic enamel paint fused into the glass surface during tempering. Creates permanent custom geometric patterns, dot matrices, and privacy screens resistant to scratching, UV, and weathering.',
    features: ['Fused Enamel Surface', 'Custom Pattern Graphics', 'Solar Glare Reduction'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Ceramic-Glass.png',
  },
  {
    id: 'frosted-glass',
    title: 'Frosted Glass',
    category: 'specialty',
    categoryLabel: 'Specialty & Decorative',
    badgeText: 'ACID-ETCHED SATIN',
    thicknessRange: '4mm - 12mm',
    description:
      'Uniform acid-etched translucent glass providing soft light diffusion and high privacy without darkening interior rooms. Resists fingerprint smudges and staining far better than sandblasted alternatives.',
    features: ['Acid-Etched Translucency', 'Smudge & Stain Resistant', 'Soft Light Diffusion'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/FROSTED-Glass.png',
  },
  {
    id: 'mirror-glass',
    title: 'Mirror Glass',
    category: 'specialty',
    categoryLabel: 'Specialty & Decorative',
    badgeText: 'ARCHITECTURAL SILVER',
    thicknessRange: '3mm - 8mm',
    description:
      'Copper-free and lead-free environmental silver mirror glass with multi-layer protective paint backing. Delivers exceptional depth of reflection, distortion-free clarity, and high corrosion resistance.',
    features: ['Copper-Free & Lead-Free', 'Distortion-Free Optics', 'High Moisture Resistance'],
    image: 'https://magicglass.co.in/wp-content/uploads/2024/02/Mirror-Glass.png',
  },
]
