export type ProductCategory = 'toughened' | 'laminated' | 'insulated' | 'reflective' | 'other'

export interface ProductItem {
  id: string
  title: string
  category: ProductCategory
  categoryLabel: string
  badgeText: string
  thicknessRange: string
  description: string
  features: string[]
  image: string
  isTopFeatured?: boolean
}

export interface CategoryInfo {
  id: 'all' | ProductCategory
  code: string
  label: string
  title: string
  description: string
  icon?: string
}

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: 'all',
    code: '00',
    label: 'ALL PRODUCTS',
    title: 'Complete Architectural Glass Collection',
    description:
      'Explore Magic Glass’s complete architectural portfolio—spanning Toughened Glass, Laminated Glass, Insulated Glass (DGU), High-Performance Reflective Low-E Glass, and Specialty Fire, Ceramic, Frosted & Mirror Glass.',
  },
  {
    id: 'toughened',
    code: '01',
    label: 'TOUGHENED GLASS',
    title: 'Toughened & High-Strength Safety Glass',
    description:
      'Fortified safety glass fourfold (4x) stronger than regular float glass, subjected to intense 650°C thermal tempering and rapid uniform air quenching.',
    icon: '/images/products/toughened-glass.png',
  },
  {
    id: 'laminated',
    code: '02',
    label: 'LAMINATED GLASS',
    title: 'Sentry, Acoustic & PVB Impact Laminated Systems',
    description:
      'High-impact safety and acoustic dampening interlayers delivering exceptional structural stiffness, sound reduction up to 42dB, and zero delamination risk.',
    icon: '/images/products/laminated-glass.png',
  },
  {
    id: 'insulated',
    code: '03',
    label: 'INSULATED GLASS',
    title: 'Hermetically Sealed Double Glazed Units (DGU)',
    description:
      'Dual-pane and laminated DGU assemblies with primary polyisobutylene seals, structural silicone, and argon fill for maximum thermal insulation and energy efficiency.',
    icon: '/images/products/insulated-glass.png',
  },
  {
    id: 'reflective',
    code: '04',
    label: 'REFLECTIVE GLASS',
    title: 'High-Performance Solar Control & Low-E Glazing',
    description:
      'Off-line magnetron sputtered Low-E coatings and SKN ultra-high-performance double/triple silver coatings delivering ultra-low SHGC with maximum natural daylight.',
    icon: '/images/products/reflective-glass.png',
  },
  {
    id: 'other',
    code: '05',
    label: 'OTHER GLASS',
    title: 'Fire Safety, Ceramic Fritted, Frosted & Mirror Systems',
    description:
      'Specialized architectural solutions including certified fire & safety barrier glass, permanent ceramic fritted silkscreen graphics, acid-etched frosted satin glass, and distortion-free environmental mirrors.',
    icon: '/images/products/other-glass.png',
  },
]

export const TOP_3_FEATURED: ProductItem[] = [
  {
    "id": "sentry-laminated-glass",
    "title": "Sentry Laminated Glass",
    "category": "laminated",
    "categoryLabel": "Laminated Glass",
    "badgeText": "IONOPLAST STRUCTURAL",
    "thicknessRange": "4mm - 19mm (Unit: 8.38mm - 80mm)",
    "description": "Sentry Laminated Glass by Magic Glass elevates strength and durability to newer heights. Designed to surpass the strength of traditional PVB films, Sentry Laminated Glass employs the superior SGP (Sentry Glass Plus) film to offer unparalleled resistance.",
    "features": [
      "5x Tear Strength & 100x Stiffness",
      "Ionoplast Rigid Interlayer",
      "Zero Delamination Risk Under Storm Loads"
    ],
    "image": "/images/products/sentry-laminated-glass.png",
    "isTopFeatured": true
  },
  {
    "id": "skn-ultra-high-performance-glass",
    "title": "SKN-Ultra High-Performance Glass",
    "category": "reflective",
    "categoryLabel": "Reflective Glass",
    "badgeText": "SOLAR CONTROL LOW-E",
    "thicknessRange": "4mm - 19mm",
    "description": "Ultra-high-performance glass provides natural light transmission while helping to limit heat gain and thermal energy transfer. Through continuous improvements in its thermal insulation and solar control performance, glass has become a flexible building material that can improve buildings&#8217; energy efficiency. High-performance coated glass is a critical part of our glazing system. Coated glass allows building occupants to engage visually with the external environment from a comfortable interior.",
    "features": [
      "Double & Triple Silver Coated Chemistry",
      "Ultra-Low Solar Heat Gain Coefficient (SHGC)",
      "High Natural Neutral Daylight Penetration"
    ],
    "image": "/images/products/skn-ultra-high-performance-glass.jpg",
    "isTopFeatured": true
  },
  {
    "id": "insulated-glass-dgu",
    "title": "DGU (Insulated Glass)",
    "category": "insulated",
    "categoryLabel": "Insulated Glass",
    "badgeText": "HERMETIC DUAL PANE",
    "thicknessRange": "4mm - 19mm (Unit: 14mm - 48mm)",
    "description": "Insulated glass is a combination of two or more panels that are spaced apart and sealed with sealant to appear as a single unit. At Magic Glass, we have state-of-the-art fully automatic Insulating lines with robot sealing. We were also the first company to manufacture Insulated glass in Pune. With such long experience and an excellent team, we have mastered the art of making the highest quality Insulated panels.",
    "features": [
      "Robotic Sealing with Fenzi Butyl & Dow Silicone",
      "Argon Gas Thermal Barrier (≥90% Fill, U-value < 1.1)",
      "Warm-Edge Spacer System"
    ],
    "image": "/images/products/insulated-glass-dgu.png",
    "isTopFeatured": true
  }
]

export const ALL_PRODUCTS: ProductItem[] = [
  {
    "id": "toughened-glass",
    "title": "Toughened Glass",
    "category": "toughened",
    "categoryLabel": "Toughened Glass",
    "badgeText": "TEMPERED SAFETY GLASS",
    "thicknessRange": "4mm - 19mm",
    "description": "Toughened glass, commonly referred to as ‘Tempered glass,’ stands as fortified safety glass, its strength amplified through meticulous thermal processes. This involves subjecting annealed glass to temperatures of around 650⁰C followed by swift cooling, culminating in a glass that possesses fourfold the strength of regular glass.",
    "features": [
      "4x Strength of Annealed Float Glass",
      "High Surface Compressive Stress",
      "Convection Furnace Quench Processed"
    ],
    "image": "/images/products/toughened-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "clear-glass",
    "title": "Clear Glass",
    "category": "toughened",
    "categoryLabel": "Toughened Glass",
    "badgeText": "FLOAT GLASS BASE",
    "thicknessRange": "4mm - 19mm",
    "description": "Discover the extraordinary clarity and purity of Clear Glass. This exceptional product is manufactured by Saint Gobain using state-of-the-art techniques, guaranteeing unparalleled transparency without any tint. With its crystal-clear finish, Clear Glass provides an unobstructed view, allowing you to experience the true colors of your surroundings.",
    "features": [
      "Saint Gobain Premium Float Glass",
      "Low Iron Index at 654 PPM",
      "Jumbo Panels up to 9*16 ft."
    ],
    "image": "/images/products/clear-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "extra-clear-glass",
    "title": "Extra Clear Glass",
    "category": "toughened",
    "categoryLabel": "Toughened Glass",
    "badgeText": "LOW-IRON ULTRA CLARITY",
    "thicknessRange": "4mm - 19mm",
    "description": "The Extra clear glass is a type of Float glass that has low iron content (lower than clear glass), which reduces the greenish-blue tint and therefore makes it extra clear. It is also called low iron glass.",
    "features": [
      "Ultra-Low Ferric Oxide Substrate",
      "Zero Green Edge Tint",
      ">91% Light Transmittance"
    ],
    "image": "/images/products/extra-clear-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "hs-glass",
    "title": "HS Glass",
    "category": "toughened",
    "categoryLabel": "Toughened Glass",
    "badgeText": "HEAT STRENGTHENED",
    "thicknessRange": "4mm - 12mm",
    "description": "Heat-strengthened glass is heat-treated glass that retains the distinctive properties of ordinary float glass. The glass is manufactured in one of the two electric horizontal roller-hearth tempering lines, where the glass is first heated and then cooled down with much less pressure. The machines are equipped with an advanced convection system to produce the best optical quality glass with a significant energy consumption reduction. Along with this, the super flat spotless technology ensures minimum iridescence and produces high-quality glass. Heat-strengthened glass is popular among design professionals for curtain wall façades of buildings, in both the vision and spandrel applications. It is valued for its mechanical strength, higher optical clarity, and flatter finish, and the probability of nickel sulfide inclusions inducing spontaneous breakages in the heat-strengthened glass is practically non-existent.",
    "features": [
      "2x Mechanical Strength of Float Glass",
      "Interlocking Break Pattern",
      "Optimized for Spandrel & Wind-Load Panels"
    ],
    "image": "/images/products/hs-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "heat-soaked-glass",
    "title": "Heat Soaked Glass",
    "category": "toughened",
    "categoryLabel": "Toughened Glass",
    "badgeText": "NICKEL SULFIDE TESTED",
    "thicknessRange": "6mm - 19mm",
    "description": "Float glass used in windows and doors often contains microscopic nickel sulfide inclusions that can expand over time and cause panes of tempered glass to suddenly and unexpectedly break—an effect known as spontaneous breakage. This poses serious risks, as shattered glass can injure anyone nearby. Our Heat Soaked Glass to help eliminate this threat.",
    "features": [
      "Accelerated Hold Cycle in Oven (EN 14179)",
      "Eliminates Spontaneous NiS Breakage",
      "Certified for High-Rise Facades"
    ],
    "image": "/images/products/heat-soaked-glass.jpg",
    "isTopFeatured": false
  },
  {
    "id": "sentry-laminated-glass",
    "title": "Sentry Laminated Glass",
    "category": "laminated",
    "categoryLabel": "Laminated Glass",
    "badgeText": "IONOPLAST STRUCTURAL",
    "thicknessRange": "4mm - 19mm (Unit: 8.38mm - 80mm)",
    "description": "Sentry Laminated Glass by Magic Glass elevates strength and durability to newer heights. Designed to surpass the strength of traditional PVB films, Sentry Laminated Glass employs the superior SGP (Sentry Glass Plus) film to offer unparalleled resistance.",
    "features": [
      "5x Tear Strength & 100x Stiffness",
      "Ionoplast Rigid Interlayer",
      "Zero Delamination Risk Under Storm Loads"
    ],
    "image": "/images/products/sentry-laminated-glass.png",
    "isTopFeatured": true
  },
  {
    "id": "acoustic-lami-glass",
    "title": "Acoustic Lami Glass",
    "category": "laminated",
    "categoryLabel": "Laminated Glass",
    "badgeText": "ACOUSTIC SOUNDPROOFING",
    "thicknessRange": "4mm - 19mm (Unit: 8.38mm - 80mm)",
    "description": "Designed to provide superior acoustic insulation and noise control, Acoustic Lami Glass plays a crucial role in creating a soothing and peaceful environment in both living and working spaces.",
    "features": [
      "Superior Sound Insulation up to STC 42dB",
      "Dampens Airborne Noise & Vibration",
      "Speech Privacy for Corporate Interiors"
    ],
    "image": "/images/products/acoustic-lami-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "pvb-laminated-glass",
    "title": "PVB Laminated Glass",
    "category": "laminated",
    "categoryLabel": "Laminated Glass",
    "badgeText": "IMPACT SAFETY LAMINATE",
    "thicknessRange": "4mm - 19mm (Unit: 8.38mm - 80mm)",
    "description": "PVB Laminated Glass is made by combining layers of interlayer film with two or more panes of glass through cleanroom assembly, autoclave curing, and specialized vacuum bag lamination (up to 4000 × 2500 mm), ensuring exceptional adhesion and impact resistance.",
    "features": [
      "Polyvinyl Butyral (PVB) High-Tension Interlayer",
      "Fall-Through Protection Upon Breakage",
      "99% Ultraviolet (UV) Ray Rejection"
    ],
    "image": "/images/products/pvb-laminated-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "insulated-glass-dgu",
    "title": "DGU (Insulated Glass)",
    "category": "insulated",
    "categoryLabel": "Insulated Glass",
    "badgeText": "HERMETIC DUAL PANE",
    "thicknessRange": "4mm - 19mm (Unit: 14mm - 48mm)",
    "description": "Insulated glass is a combination of two or more panels that are spaced apart and sealed with sealant to appear as a single unit. At Magic Glass, we have state-of-the-art fully automatic Insulating lines with robot sealing. We were also the first company to manufacture Insulated glass in Pune. With such long experience and an excellent team, we have mastered the art of making the highest quality Insulated panels.",
    "features": [
      "Robotic Sealing with Fenzi Butyl & Dow Silicone",
      "Argon Gas Thermal Barrier (≥90% Fill, U-value < 1.1)",
      "Warm-Edge Spacer System"
    ],
    "image": "/images/products/insulated-glass-dgu.png",
    "isTopFeatured": true
  },
  {
    "id": "dgu-laminated-glass",
    "title": "DGU Laminated Glass",
    "category": "insulated",
    "categoryLabel": "Insulated Glass",
    "badgeText": "DUAL INSULATED SAFETY",
    "thicknessRange": "4mm - 19mm (Unit: 14mm - 48mm)",
    "description": "Indulge in the world of DGU Laminated Glass by Magic Glass, where luxury and elegance intertwine flawlessly. Crafted to elevate premium spaces to unprecedented heights, DGU Laminated Glass is the epitome of super luxurious glass.",
    "features": [
      "Laminated Safety Outer Pane + Low-E DGU Unit",
      "Acoustic Barrier for Transit & Airports",
      "Maximum Security & Climate Protection"
    ],
    "image": "/images/products/dgu-laminated-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "high-performance-low-e-glass",
    "title": "High Performance LOW-E Glass",
    "category": "reflective",
    "categoryLabel": "Reflective Glass",
    "badgeText": "MAGNETRON COATED LOW-E",
    "thicknessRange": "4mm - 19mm",
    "description": "High-Performance Low-E Glass leverages cutting-edge technology to provide superior thermal performance. Designed as an advanced thermal insulation glass (Low-E), High-Performance Low-E Glass revolutionizes energy efficiency in buildings, setting new benchmarks in the glass manufacturing industry in India.",
    "features": [
      "Off-Line Vacuum Sputtered Magnetron Coating",
      "Reflects Long-Wave Infrared Heat",
      "Significantly Decreases HVAC Cooling Loads"
    ],
    "image": "/images/products/high-performance-low-e-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "skn-ultra-high-performance-glass",
    "title": "SKN-Ultra High-Performance Glass",
    "category": "reflective",
    "categoryLabel": "Reflective Glass",
    "badgeText": "SOLAR CONTROL LOW-E",
    "thicknessRange": "4mm - 19mm",
    "description": "Ultra-high-performance glass provides natural light transmission while helping to limit heat gain and thermal energy transfer. Through continuous improvements in its thermal insulation and solar control performance, glass has become a flexible building material that can improve buildings&#8217; energy efficiency. High-performance coated glass is a critical part of our glazing system. Coated glass allows building occupants to engage visually with the external environment from a comfortable interior.",
    "features": [
      "Double & Triple Silver Coated Chemistry",
      "Ultra-Low Solar Heat Gain Coefficient (SHGC)",
      "High Natural Neutral Daylight Penetration"
    ],
    "image": "/images/products/skn-ultra-high-performance-glass.jpg",
    "isTopFeatured": true
  },
  {
    "id": "fire-safety-glass",
    "title": "Fire & Safety Glass",
    "category": "other",
    "categoryLabel": "Other Glass",
    "badgeText": "FIRE BARRIER CERTIFIED",
    "thicknessRange": "5mm - 19mm",
    "description": "In the face of unpredictable natural calamities such as fire, Fire & Safety Glass by Magic Glass emerges as a crucial line of defense for residential and commercial spaces. With its exceptional fire-resistant properties, this specially laminated glass is designed to withstand high temperatures, preventing the spread of fire and containing it within a specific location. By installing Fire & Safety Glass, you proactively minimize damage and enhance the safety of your property and its occupants.",
    "features": [
      "Laminated Fire-Resistive Composition",
      "Confines Flames & Smoke Inhalation Risks",
      "Certified for Hospitals & Commercial Exits"
    ],
    "image": "/images/products/fire-safety-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "ceramic-glass",
    "title": "Ceramic Glass",
    "category": "other",
    "categoryLabel": "Other Glass",
    "badgeText": "FRITTED SCREEN-PRINTED",
    "thicknessRange": "4mm - 19mm",
    "description": "Step into the world of Ceramic Glass by Magic Glass, where artistry meets durability. Through the innovative process of Ceramic fritting, glass enamel is fused onto the glass surface, creating a permanent coating that withstands the test of time. Light frit colors and pattern designs enhance brightness, while dark frit colors reduce glare, offering a harmonious balance of aesthetics and functionality.",
    "features": [
      "Ceramic Enamel Permanently Fused at 650°C",
      "UV, Scratch & Weathering Immune",
      "Custom Silkscreen Architectural Motifs"
    ],
    "image": "/images/products/ceramic-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "frosted-glass",
    "title": "Frosted Glass",
    "category": "other",
    "categoryLabel": "Other Glass",
    "badgeText": "ACID-ETCHED SATIN",
    "thicknessRange": "4mm - 12mm",
    "description": "With its distinct appearance, Frosted Glass adds a touch of sophistication to any space. Using techniques like sandblasting, the transparent sheet of glass is transformed into an opaque masterpiece. Light scattering during transmission creates a translucent effect, allowing the glass to transmit light while obscuring visibility.",
    "features": [
      "Non-Fingerprint Translucent Acid-Etched Surface",
      "Uniform Soft Light Scattering & Diffusion",
      "Superior Durability Over Sandblasted Glass"
    ],
    "image": "/images/products/frosted-glass.png",
    "isTopFeatured": false
  },
  {
    "id": "mirror-glass",
    "title": "Mirror Glass",
    "category": "other",
    "categoryLabel": "Other Glass",
    "badgeText": "ENVIRONMENTAL SILVER",
    "thicknessRange": "4mm - 8mm",
    "description": "Mirrored glass adds a living quality to your design. Whether you want a glamorous, full reflection effect, specific reflectivity with light-diffusing etched or patterned surfaces, or a custom luminous color, we can help. Pair graphics with a mirror to achieve depth, or add an etched layer for a soft, welcoming glow.",
    "features": [
      "Copper-Free & Lead-Free Environmental Backing",
      "Zero Optical Distortion Reflection",
      "High Moisture & Oxidation Resistance"
    ],
    "image": "/images/products/mirror-glass.png",
    "isTopFeatured": false
  }
]
