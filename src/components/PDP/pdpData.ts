export interface PdpProductDetail {
  id: string
  indexNumber: string
  title: string
  category: string
  heroImage: string
  introSummary: string
  secondaryText: string
  detailImages: [string, string]
  characteristics: string[]
  galleryImages: [string, string, string, string]
  sliderImages: string[]
  relatedProductIds: [string, string]
}

export const PDP_MOCK_DATA: Record<string, PdpProductDetail> = {
  'sentry-laminated-glass': {
    id: 'sentry-laminated-glass',
    indexNumber: '01',
    title: 'Sentry Laminated Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Engineered with ultra-rigid SentryGlas® ionoplast interlayers, delivering 5x tear strength and 100x stiffness compared to standard PVB for hurricane resistance and structural glass fins.',
    secondaryText:
      'We design, produce, and install SentryGlas® structural glass fins, overhead canopies, glass stairs, and hurricane-resistant curtain walls for luxury residences, commercial towers, and landmark public infrastructure.',
    detailImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'SentryGlas® Ionoplast structural interlayer with 5x tear resistance',
      '100x stiffness of standard PVB to prevent post-breakage collapse',
      'Zero edge delamination risk even in humid coastal environments',
      'Certified for hurricane-rated impact facades and structural fins',
      'High optical clarity with minimal yellowing index over 20+ years',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['skn-ultra-high-performance-glass', 'insulated-glass-dgu'],
  },

  'skn-ultra-high-performance-glass': {
    id: 'skn-ultra-high-performance-glass',
    indexNumber: '02',
    title: 'SKN-Ultra High-Performance Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Advanced double-silver and triple-silver solar control coatings engineered to achieve ultra-low Solar Heat Gain Coefficients (SHGC < 0.23) while maintaining neutral daylight transmission.',
    secondaryText:
      'Ideal for modern sustainable green building facades, corporate headquarters, and high-rise developments seeking maximum LEED certification credits and reduced HVAC energy consumption.',
    detailImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Triple-silver magnetron soft coating for extreme solar heat rejection',
      'Ultra-low Solar Heat Gain Coefficient (SHGC < 0.23)',
      'High visible light transmittance with low indoor reflection',
      'Substantially lowers air conditioning loads and carbon footprint',
      'LEED & IGBC Green Building certified substrate coating',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['sentry-laminated-glass', 'high-performance-low-e-glass'],
  },

  'insulated-glass-dgu': {
    id: 'insulated-glass-dgu',
    indexNumber: '03',
    title: 'DGU (Insulated Glass)',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Hermetically sealed dual-pane insulated glass units integrated with primary polyisobutylene seals, argon gas fill, and warm-edge spacers for optimal thermal insulation.',
    secondaryText:
      'Engineered for residential window systems, glass extensions, and exterior curtain walls requiring superior acoustic insulation and energy efficiency (U-value < 1.1 W/m²K).',
    detailImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Dual-sealed hermetic construction with PIB and structural silicone',
      '90%+ Argon gas cavity filling for enhanced U-value thermal insulation',
      'Warm-edge spacer technology preventing perimeter condensation',
      'Significant acoustic attenuation reducing outdoor urban noise',
      'Available in 24mm, 28mm, 32mm, and custom unit thicknesses',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['dgu-laminated-glass', 'skn-ultra-high-performance-glass'],
  },

  'clear-glass': {
    id: 'clear-glass',
    indexNumber: '04',
    title: 'Clear Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'High-clarity primary float glass with uniform thickness, excellent light transmission, and superior optical flatness, serving as the core substrate for processing.',
    secondaryText:
      'Precision manufactured for architectural windows, interior doors, tabletop surfaces, and primary processing into toughened and laminated safety panels.',
    detailImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'High optical distortion-free flatness and dimensional consistency',
      'Available in standard thicknesses from 3mm up to 19mm',
      'Ideal substrate for tempering, heat soaking, and PVB lamination',
      'Uniform edge finish and high mechanical strength base',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['extra-clear-glass', 'hs-glass'],
  },

  'extra-clear-glass': {
    id: 'extra-clear-glass',
    indexNumber: '05',
    title: 'Extra Clear Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Ultra-transparent low-iron float glass with minimal ferric oxide content, eliminating the greenish edge tint of standard glass for maximum color fidelity.',
    secondaryText:
      'Specified for luxury retail display cases, museum vitrines, high-end interior partitions, and premium architectural facades requiring pristine crystal transparency.',
    detailImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Low-iron content completely removing natural green edge tinting',
      '>91% light transmittance for crystal-clear visual transparency',
      'True-color rendering for artwork, retail products, and natural light',
      'Premium substrate for ceramic fritting and extra-clear laminates',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['clear-glass', 'sentry-laminated-glass'],
  },

  'hs-glass': {
    id: 'hs-glass',
    indexNumber: '06',
    title: 'HS Glass',
    category: 'Safety & Processing',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Heat-strengthened glass offering 2x the thermal and mechanical strength of annealed glass while breaking into interlocked fragments that remain safely in frame.',
    secondaryText:
      'Engineered specifically for spandrel panels, high-wind exterior facades, and overhead glazing where post-breakage retention is paramount.',
    detailImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      '2x mechanical and thermal shock resistance of annealed float glass',
      'Interlocking break pattern ensuring fragments stay anchored in frame',
      'Virtually eliminates spontaneous breakage risk associated with NiS',
      'Ideal for exterior spandrels and laminated safety compositions',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['heat-soaked-glass', 'pvb-laminated-glass'],
  },

  'heat-soaked-glass': {
    id: 'heat-soaked-glass',
    indexNumber: '07',
    title: 'Heat Soaked Glass',
    category: 'Safety & Processing',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Fully toughened safety glass subjected to a 290°C heat soak oven hold cycle (DIN EN 14179-1) to eliminate Nickel Sulfide inclusions and guarantee zero spontaneous failure.',
    secondaryText:
      'Mandatory safety processing for high-rise glass curtain walls, frameless glass balustrades, public transit canopies, and overhead skylights.',
    detailImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'DIN EN 14179-1 heat soak oven tested to accelerate NiS expansion',
      'Destroys vulnerable panels during factory testing before installation',
      'Provides 4-5x bending strength of annealed float glass',
      'Full safety glass breakage into small blunt cubic fragments',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['hs-glass', 'sentry-laminated-glass'],
  },

  'acoustic-lami-glass': {
    id: 'acoustic-lami-glass',
    indexNumber: '08',
    title: 'Acoustic Lami Glass',
    category: 'Interior & Partitions',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Specialized acoustic dampening PVB interlayer engineered to absorb airborne noise vibration across critical human speech frequencies, achieving sound reduction indexes up to STC 42dB.',
    secondaryText:
      'Designed for corporate conference rooms, executive office partitions, broadcast studios, luxury hotel guest rooms, and quiet residential sanctuaries.',
    detailImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Tri-layer acoustic PVB interlayer attenuating sound wave resonance',
      'Sound Transmission Class (STC) ratings up to 42dB speech privacy',
      'Full safety glass impact protection adhering to EN 12600 standards',
      '99% blocking of harmful solar ultraviolet (UV) radiation',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['pvb-laminated-glass', 'frosted-glass'],
  },

  'pvb-laminated-glass': {
    id: 'pvb-laminated-glass',
    indexNumber: '09',
    title: 'PVB Laminated Glass',
    category: 'Safety & Processing',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Multi-layer safety glass bonded under elevated pressure and heat with tough Polyvinyl Butyral (PVB) interlayers to ensure fragment retention upon severe impact.',
    secondaryText:
      'Essential for glass floors, staircase balustrades, overhead skylights, security window glazing, and public atrium railings.',
    detailImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'High-adhesion Polyvinyl Butyral (PVB) safety interlayer',
      'Glass shards stick to interlayer upon impact, preventing fall-through',
      'High penetration resistance against forced entry and physical impact',
      'Filters 99% of fading UV solar radiation',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['acoustic-lami-glass', 'sentry-laminated-glass'],
  },

  'dgu-laminated-glass': {
    id: 'dgu-laminated-glass',
    indexNumber: '10',
    title: 'DGU Laminated Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Combines an outer solar control laminated pane with an inner low-E pane enclosing an insulated cavity for maximum structural impact safety, solar protection, and sound dampening.',
    secondaryText:
      'The premier choice for luxury villa envelope glazing, commercial airport facades, and high-rise residential towers exposed to extreme noise and wind loads.',
    detailImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Triple-action performance: Safety + Acoustic + Thermal Insulation',
      'Laminated safety outer pane preventing glass fallout',
      'Argon gas cavity with warm-edge spacer perimeter sealing',
      'Custom combinations with low-E solar control soft coatings',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['insulated-glass-dgu', 'skn-ultra-high-performance-glass'],
  },

  'high-performance-low-e-glass': {
    id: 'high-performance-low-e-glass',
    indexNumber: '11',
    title: 'High Performance LOW-E Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Off-line magnetron sputtered soft-coated glass reflecting long-wave infrared thermal radiation outside while permitting high natural daylight penetration.',
    secondaryText:
      'Engineered for residential window retrofits, architectural curtain walls, and commercial office towers striving for optimum energy performance.',
    detailImages: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Magnetron soft-coat low-emissivity silver layer',
      'Reflects solar heat while admitting high daylight',
      'Reduces interior heating and cooling HVAC operational costs',
      'Can be processed into DGU and laminated safety assemblies',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['skn-ultra-high-performance-glass', 'insulated-glass-dgu'],
  },

  'fire-safety-glass': {
    id: 'fire-safety-glass',
    indexNumber: '12',
    title: 'Fire & Safety Glass',
    category: 'Safety & Processing',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Multi-layered intumescent gel interlayers that react to fire temperatures by turning into an opaque thermal insulation shield, providing certified fire protection up to 120 minutes.',
    secondaryText:
      'Mandatory safety installation for emergency escape corridors, fire-rated stairwells, data center partitions, and hospital fire barriers (EW60 / EI90 ratings).',
    detailImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'EW30 to EI120 fire resistance ratings per EN 1363 testing standards',
      'Intumescent gel layer transforms into an opaque heat insulation shield',
      'Blocks radiant heat transfer and toxic smoke propagation',
      'Full impact safety glass rating for everyday building traffic',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['heat-soaked-glass', 'pvb-laminated-glass'],
  },

  'ceramic-glass': {
    id: 'ceramic-glass',
    indexNumber: '13',
    title: 'Ceramic Glass',
    category: 'Specialty & Decorative',
    heroImage: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'High-temperature ceramic enamel paint fused into the glass surface during tempering, creating permanent custom geometric dot matrices and decorative privacy screens.',
    secondaryText:
      'Specified for building spandrel bands, solar glare control glass fins, decorative interior feature walls, and custom privacy partitions.',
    detailImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Enamel paint permanently baked into glass matrix during tempering',
      'Scratch-resistant, weather-proof, and UV-immune surface finish',
      'Custom dot matrix printing to reduce solar glare and bird strikes',
      'Wide color palette for opaque spandrels and decorative panels',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['frosted-glass', 'mirror-glass'],
  },

  'frosted-glass': {
    id: 'frosted-glass',
    indexNumber: '14',
    title: 'Frosted Glass',
    category: 'Specialty & Decorative',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Uniform acid-etched translucent glass providing soft light diffusion and high visual privacy without darkening interior rooms.',
    secondaryText:
      'Ideal for bathroom shower enclosures, corporate office doors, healthcare privacy screens, and decorative interior furniture.',
    detailImages: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Smooth acid-etched satin surface resisting fingerprint smudges',
      'High daylight transmittance with complete visual privacy',
      'Easier maintenance compared to traditional sandblasted glass',
      'Can be toughened and laminated into safety partitions',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['ceramic-glass', 'mirror-glass'],
  },

  'mirror-glass': {
    id: 'mirror-glass',
    indexNumber: '15',
    title: 'Mirror Glass',
    category: 'Specialty & Decorative',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    introSummary:
      'Copper-free and lead-free environmental silver mirror glass with multi-layer protective paint backing, delivering exceptional depth of reflection and corrosion resistance.',
    secondaryText:
      'Specified for luxury hospitality interiors, residential vanity walls, fitness studios, and architectural mirror wall installations.',
    detailImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    characteristics: [
      'Copper-free and lead-free environmentally friendly mirror backing',
      '7x higher resistance to atmospheric corrosion than standard mirrors',
      'Distortion-free optics with crystal clear reflectivity',
      'Available in silver, bronze, grey, and custom architectural tints',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    ],
    sliderImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedProductIds: ['frosted-glass', 'extra-clear-glass'],
  },
}
