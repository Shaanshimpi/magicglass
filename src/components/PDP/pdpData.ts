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
  sliderImages: string[]
  relatedProductIds: [string, string]
}


export const PDP_MOCK_DATA: Record<string, PdpProductDetail> = {
  'toughened-glass': {
    id: 'toughened-glass',
    indexNumber: '14',
    title: 'Toughened Glass',
    subheading: 'Fortified Safety Glass Quadruple (4x) Strength',
    category: 'Safety & Processing',
    heroImage: 'https://magicglass.co.in/wp-content/uploads/2023/11/HIGH-RISE-BUILDINGS.png',
    introSummary:
      'Toughened glass, commonly referred to as \'Tempered glass,\' stands as fortified safety glass, its strength amplified through meticulous thermal processes. This involves subjecting annealed glass to temperatures of around 650°C followed by swift cooling, culminating in a glass that possesses fourfold the strength of regular glass.',
    secondaryText:
      'This intense heat treatment and rapid cooling induce distinct physical attributes, notably instilling surface compressive stress and enhancing the glass\'s flexural potency. Preceding toughening, the glass is intricately cut to precise dimensions or expertly shaped, setting the stage for its exceptional attributes.',
    detailImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/11/SAFETY-DOORS.png',
      'https://magicglass.co.in/wp-content/uploads/2024/02/automotive.png',
    ],
    characteristics: [
      'Fourfold (4x) mechanical strength compared to annealed float glass',
      'High surface compressive stress & enhanced flexural resistance',
      'Precision custom cut & edge preparation before furnace tempering',
      'Triple heating method harmony (conduction, convection, and radiation)',
      'Motorized roller hearth ensuring equal heat distribution across surfaces',
      'Uniform high-pressure air quenching achieving high physical resilience',
      'Safe small-fragment crumbling pattern upon impact reducing injury risk',
    ],
    specs: [
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2258.png',
        label: 'Glass Thickness Range',
        value: '4mm to 19mm',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2288.png',
        label: 'DGU unit thickness',
        value: '14mm to 48 mm',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2267.png',
        label: 'Butyl Make',
        value: 'Fenzi (Italy)',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2268.png',
        label: 'Desiccant Make',
        value: 'Netragy',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2269.png',
        label: 'Silicon Make',
        value: 'Sealande, Dow(USA)',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/10/process-type.png',
        label: 'Process Type',
        value: 'Vertically fully automated robotic sealing process',
      },
    ],
    galleryTitle: 'Glass Applications',
    galleryImageItems: [
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/SAFETY-DOORS.png',
        title: 'BUILDING AND CONSTRUCTION',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2024/02/automotive.png',
        title: 'AUTOMOTIVE INDUSTRY',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/FURNITURE.png',
        title: 'FURNITURE AND DECOR',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/HIGH-RISE-BUILDINGS.png',
        title: 'SOLAR ENERGY',
      },
    ],
    galleryImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/11/SAFETY-DOORS.png',
      'https://magicglass.co.in/wp-content/uploads/2024/02/automotive.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/FURNITURE.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/HIGH-RISE-BUILDINGS.png',
    ],
    industries: [
      {
        title: 'BUILDING & CONSTRUCTION',
        image: 'https://magicglass.co.in/wp-content/uploads/2023/11/Mask-group-3.png',
        description:
          'Toughened glass glides on rollers through our furnace undergoing thermal processing at 650°C. Conduction, convection, and radiation work in harmony to produce high structural strength and resilience.',
      },
      {
        title: 'AUTOMOTIVE & TRANSPORT',
        image: 'https://magicglass.co.in/wp-content/uploads/2024/02/automotive.png',
        description:
          'High mechanical impact resistance and safe fragmentation characteristics engineered for transport, automotive side glazing, and heavy machinery cabins.',
      },
      {
        title: 'INTERIOR & FURNITURE',
        image: 'https://magicglass.co.in/wp-content/uploads/2023/11/FURNITURE.png',
        description:
          'Sleek frameless glass doors, shower enclosures, table tops, and architectural balustrades combining safety with pristine clarity.',
      },
    ],
    sliderImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/12/Balmoral-by-riverside.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/the-ark-Tribeca-devlopers.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/VARDE-ABIL.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/Ganga-Platino-.jpg',
    ],
    relatedProductIds: ['clear-glass', 'hs-glass'],
  },

  'clear-glass': {
    id: 'clear-glass',
    indexNumber: '01',
    title: 'Clear Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/prod-windows.jpg',
    introSummary:
      'Discover the extraordinary clarity and purity of Clear Glass. Manufactured by Saint Gobain using state-of-the-art float glass technology, it offers high optical clarity, uniform thickness, and superior optical flatness.',
    secondaryText:
      'Clear Glass is a versatile solution that seamlessly integrates into various applications. Whether it is partitions, doors, windows, or furniture, Clear Glass enhances aesthetics while providing optimal functionality.',
    detailImages: [
      '/images/prod-windows.jpg',
      '/images/prod-structural.jpg',
    ],
    characteristics: [
      'High optical clarity with minimal distortion',
      'Iron content precision measured at 654 PPM',
      'Max manufacturing jumbo panel size up to 9*16 ft.',
      'Certified to EN 14179, EN 12150-1, ASTM C 1048, and IS 2553 standards',
      'Ideal base float substrate for tempering, insulating, and lamination',
    ],
    specs: [
      {
        
        label: 'Min-max thickness',
        value: '4 mm to 19 mm',
      },
      {
        
        label: 'Clarity',
        value: '654 PPM',
      },
      {
        
        label: 'Max size',
        value: '9*16 ft.',
      },
      {
        
        label: 'Standard',
        value: 'EN 14179, EN 12150-1, ASTM C 1048, IS 2553 PART 1 & PART 2, EN 1279, EN 12543',
      },
      {
        
        label: 'Process Type',
        value: 'Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass',
      },
    ],
    galleryImages: [
      '/images/prod-windows.jpg',
      '/images/prod-structural.jpg',
      '/images/prod-additional.jpg',
      '/images/craft-laminated.jpg',
    ],
    sliderImages: [
      '/images/prod-windows.jpg',
      '/images/prod-structural.jpg',
    ],
    relatedProductIds: ['extra-clear-glass', 'hs-glass'],
  },

  'extra-clear-glass': {
    id: 'extra-clear-glass',
    indexNumber: '02',
    title: 'Extra Clear Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/prod-structural.jpg',
    introSummary:
      'The Extra clear glass is a type of Float glass that has low iron content (lower than clear glass), which reduces the greenish-blue tint and therefore makes it extra clear. It is also called low iron glass.',
    secondaryText:
      'With its unparalleled clarity and transparency, Extra Clear Glass creates an environment that is bathed in natural light, showcasing true colors and creating an atmosphere of purity and refinement. Experience a new level of sophistication with Extra Clear Glass, where visual clarity is elevated to an art form.',
    detailImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
    ],
    characteristics: [
      'Ultra-low iron float glass reducing greenish edge tinting',
      'Precision optical clarity with 654 PPM ferric oxide index',
      'Jumbo sheet processing dimensions up to 9*16 ft.',
      'Certified to EN 14179, EN 12150-1, ASTM C 1048, and IS 2553',
      'Perfect substrate for premium facades, display showcases, and luxury partitions',
    ],
    specs: [
      {
        
        label: 'Min-max thickness',
        value: '4mm to 19mm',
      },
      {
        
        label: 'Clarity',
        value: '654 PPM',
      },
      {
        
        label: 'Max size',
        value: '9*16 ft.',
      },
      {
        
        label: 'Standard',
        value: 'EN 14179, EN 12150-1, ASTM C 1048, IS 2553 PART 1 & PART 2, EN 1279, EN 12543',
      },
      {
        
        label: 'Process Type',
        value: 'Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass',
      },
    ],
    galleryImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
      '/images/craft-laminated.jpg',
      '/images/prod-partitions.jpg',
    ],
    sliderImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
    ],
    relatedProductIds: ['clear-glass', 'sentry-laminated-glass'],
  },

  'hs-glass': {
    id: 'hs-glass',
    indexNumber: '03',
    title: 'HS Glass',
    category: 'Safety & Processing',
    heroImage: '/images/prod-additional.jpg',
    introSummary:
      'Heat-strengthened glass is heat-treated glass that retains the distinctive properties of ordinary float glass. The glass is subjected to a heating and cooling process that makes it approximately twice as strong as annealed glass of the same thickness and configuration.',
    secondaryText:
      'Engineered specifically for spandrel panels, high-wind exterior facades, and overhead glazing where post-breakage retention is paramount, breaking into large interlocked fragments that remain safely anchored in the frame.',
    detailImages: [
      '/images/prod-additional.jpg',
      '/images/factory-cnc.jpg',
    ],
    characteristics: [
      '2x mechanical and thermal strength compared to annealed float glass',
      'Interlocking break pattern ensuring fragments stay anchored in frame',
      'Available in Clear, Extra Clear, Low-E, Reflective, Double & Triple Silver',
      'Certified under EN 1863 and IS 2553 PART 1 standards',
      'Eliminates spontaneous NiS breakage risk for spandrels and facades',
    ],
    specs: [
      {
        
        label: 'Min-max thickness',
        value: '4mm to 12 mm',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear, Extra Clear, Low e, Reflective, Double Silver, Triple Silver',
      },
      {
        
        label: 'Max size',
        value: '9*16 ft.',
      },
      {
        
        label: 'Standard',
        value: 'EN 1863 and IS 2553 PART 1',
      },
      {
        
        label: 'Process Type',
        value: 'Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass',
      },
    ],
    galleryImages: [
      '/images/prod-additional.jpg',
      '/images/factory-cnc.jpg',
      '/images/apps/railings.png',
      '/images/craft-laminated.jpg',
    ],
    sliderImages: [
      '/images/prod-additional.jpg',
      '/images/factory-cnc.jpg',
    ],
    relatedProductIds: ['heat-soaked-glass', 'pvb-laminated-glass'],
  },

  'heat-soaked-glass': {
    id: 'heat-soaked-glass',
    indexNumber: '04',
    title: 'Heat Soaked Glass',
    category: 'Safety & Processing',
    heroImage: '/images/factory-cnc.jpg',
    introSummary:
      'Float glass used in windows and doors often contains microscopic nickel sulfide inclusions that can expand over time and cause spontaneous breakage. Through Magic Glass, we reheat fully tempered panes of glass in special heating chambers, accelerating any expansion of NiS inclusions.',
    secondaryText:
      'By toughening the glass using horizontal roller hearth convection furnace, we help ensure it will maintain structural integrity and prevent unexpected spontaneous breakage on high-rise facades, providing DIN EN 14179-1 certified protection.',
    detailImages: [
      '/images/factory-cnc.jpg',
      '/images/prod-additional.jpg',
    ],
    characteristics: [
      'Subjected to DIN EN 14179-1 certified heat soak hold testing',
      'Destroys vulnerable panels in factory to guarantee zero spontaneous failure',
      '4-5x bending strength of annealed float glass with safety fragment pattern',
      'Compatible with full flood coat or custom screen-printed ceramic designs',
      'Essential safety processing for high-rise glass curtain walls and overhead glazing',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '4 mm - 19 mm',
      },
      {
        
        label: 'Design Type',
        value: 'Full flood coat or a wide range of custom designs.',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear, extra clear, COLOR Options: All colours in the RAL colour scheme.',
      },
      {
        
        label: 'Process Type',
        value: 'Automatic Screen Printing in controlled room conditions with IR Drying System and Multicolour options.',
      },
    ],
    galleryImages: [
      '/images/factory-cnc.jpg',
      '/images/prod-additional.jpg',
      '/images/craft-laminated.jpg',
      '/images/apps/railings.png',
    ],
    sliderImages: [
      '/images/factory-cnc.jpg',
      '/images/prod-additional.jpg',
    ],
    relatedProductIds: ['hs-glass', 'sentry-laminated-glass'],
  },

  'sentry-laminated-glass': {
    id: 'sentry-laminated-glass',
    indexNumber: '05',
    title: 'Sentry Laminated Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/craft-laminated.jpg',
    introSummary:
      'Sentry Laminated Glass by Magic Glass elevates strength and durability to newer heights. Designed to surpass the strength of traditional laminated glass, Sentry Laminated Glass uses SentryGlas® ionoplast interlayers to deliver 5x tear strength and 100x stiffness compared to standard PVB.',
    secondaryText:
      'Sentry Laminated Glass is engineered to withstand the toughest challenges, ensuring the safety and security of your space. Ideal for hurricane-resistant curtain walls, structural glass fins, glass staircases, overhead canopies, and luxury residential facades.',
    detailImages: [
      '/images/craft-laminated.jpg',
      '/images/prod-structural.jpg',
    ],
    characteristics: [
      'Ultra-rigid Kuraray SentryGlas® Ionoplast interlayer with 5x tear strength',
      '100x stiffness of standard PVB to prevent post-breakage glass collapse',
      'Zero edge delamination risk even in humid coastal environments',
      'Certified for hurricane-rated impact facades, glass fins, and staircases',
      'High optical clarity with minimal yellowing index over 20+ years',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '4 mm - 19 mm',
      },
      {
        
        label: 'Unit Thickness Range',
        value: '8.38 mm - 80 mm',
      },
      {
        
        label: 'Lamination Film Make',
        value: 'Kuraray Sentry Glass (USA)',
      },
      {
        
        label: 'Standard',
        value: 'EN 12543',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear, extra clear, ultra clear, tinted, solar-control coated, low - E coated. (Upto Triple Silver)',
      },
      {
        
        label: 'Process Type',
        value: 'Horizontal Assembly line with Press Rollers under controlled room conditions followed by autoclaving',
      },
    ],
    galleryImages: [
      '/images/craft-laminated.jpg',
      '/images/prod-structural.jpg',
      '/images/craft-dgu.jpg',
      '/images/prod-additional.jpg',
    ],
    sliderImages: [
      '/images/craft-laminated.jpg',
      '/images/prod-structural.jpg',
      '/images/craft-dgu.jpg',
    ],
    relatedProductIds: ['skn-ultra-high-performance-glass', 'insulated-glass-dgu'],
  },

  'acoustic-lami-glass': {
    id: 'acoustic-lami-glass',
    indexNumber: '06',
    title: 'Acoustic Lami Glass',
    subheading: 'Experience Exceptional Sound Insulation',
    category: 'Interior & Partitions',
    heroImage: 'https://magicglass.co.in/wp-content/uploads/2024/02/1900-px-890-px.jpg',
    introSummary:
      'Designed to provide superior acoustic insulation and noise control, Acoustic Lami Glass plays a crucial role in creating a soothing and peaceful environment in both living and working spaces.',
    secondaryText:
      'Acoustic Lami Glass is a revolution in sound control, consisting of multiple layers of glass bonded together by acoustic polyvinyl butyral (PVB) interlayers. This configuration acts as a noise dampener, weakening sound waves as they travel through the glass. By incorporating Acoustic Lami Glass, you can significantly reduce exterior noise, ensuring a peaceful atmosphere within your space. Additionally, the laminated glass provides an added safety benefit, as it remains intact even when broken, reducing the risk of injury.',
    detailImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/11/PARTITIONS-1.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/WINDOWS-2.png',
    ],
    characteristics: [
      'Tri-layer acoustic PVB interlayer attenuating sound wave resonance',
      'Sound Transmission Class (STC) ratings up to 42dB speech privacy',
      'Full safety glass impact protection adhering to EN 12543 standards',
      '99% blocking of harmful solar ultraviolet (UV) radiation',
      'Horizontal assembly line autoclaved production under cleanroom control',
    ],
    specs: [
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2258.png',
        label: 'Glass Thickness Range',
        value: '4 mm – 19 mm',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2259.png',
        label: 'Unit Thickness Range',
        value: '8.38 mm – 80 mm',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/10/standard.png',
        label: 'Standard',
        value: 'EN 12543',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/11/Group-2261.png',
        label: 'Glass Type',
        value: 'Clear, extra clear, ultra clear, tinted, solar-control coated, low – E coated. (Upto Tripple Silver)',
      },
      {
        icon: 'https://magicglass.co.in/wp-content/uploads/2023/10/process-type.png',
        label: 'Process Type',
        value: 'Horizontal Assembly line with Press Rollers under controlled room conditions followed by autoclaving',
      },
    ],
    galleryTitle: 'Glass Applications',
    galleryImageItems: [
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/WINDOWS-2.png',
        title: 'WINDOWS',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/PARTITIONS-1.png',
        title: 'PARTITIONS',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/DOORS-2.png',
        title: 'DOORS',
      },
      {
        src: 'https://magicglass.co.in/wp-content/uploads/2023/11/ARCHITECTURAL-INTERIOR.png',
        title: 'ARCHITECTURAL INTERIOR',
      },
    ],
    galleryImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/11/WINDOWS-2.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/PARTITIONS-1.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/DOORS-2.png',
      'https://magicglass.co.in/wp-content/uploads/2023/11/ARCHITECTURAL-INTERIOR.png',
    ],
    industries: [
      {
        title: 'ARCHITECTURAL',
        image: 'https://magicglass.co.in/wp-content/uploads/2023/09/architecture.png',
        description:
          'Acoustic Lami Glass finds its place in architectural projects, providing unrivaled sound insulation for both commercial and residential buildings. Architects and designers can create spaces that prioritize occupant comfort, reducing noise disturbances and promoting tranquility.',
      },
      {
        title: 'AIRPORT',
        image: 'https://magicglass.co.in/wp-content/uploads/2023/12/industry-banner-1.jpg',
        description:
          'The airport industry seeks glass solutions to enhance passenger experience in premium terminals. Façades, partitions and panels elevate visual appeal with luxurious sound dampening aesthetics.',
      },
      {
        title: 'HOSPITALITY',
        image: 'https://magicglass.co.in/wp-content/uploads/2023/12/Hospitality.jpg',
        description:
          'Hotel lobbies and restaurant interiors requiring acoustic isolation and sound damping to offer guests a quiet and peaceful environment under heavy usage over long durations.',
      },
    ],
    sliderImages: [
      'https://magicglass.co.in/wp-content/uploads/2023/12/Balmoral-by-riverside.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/the-ark-Tribeca-devlopers.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/VARDE-ABIL.jpg',
      'https://magicglass.co.in/wp-content/uploads/2023/12/Ganga-Platino-.jpg',
    ],
    relatedProductIds: ['pvb-laminated-glass', 'sentry-laminated-glass'],
  },

  'pvb-laminated-glass': {
    id: 'pvb-laminated-glass',
    indexNumber: '07',
    title: 'PVB Laminated Glass',
    category: 'Safety & Processing',
    heroImage: '/images/apps/railings.png',
    introSummary:
      'PVB Laminated Glass is made by combining layers of interlayer film with two or more panes of glass through a meticulous manufacturing process. With a range of interlayers including PVB, SGP, colored, and acoustic options, PVB Laminated Glass is the natural choice.',
    secondaryText:
      'PVB Laminated Glass provides comprehensive protection in various scenarios. In the event of glass breakage, the interlayer holds the fragments intact, preventing fall-through injuries and blocking 99% of fading solar UV radiation.',
    detailImages: [
      '/images/apps/railings.png',
      '/images/craft-laminated.jpg',
    ],
    characteristics: [
      'High-adhesion Kuraray PVB & Eastman Solutia safety interlayers',
      'Glass shards adhere to interlayer upon impact, preventing fall-through',
      'High penetration resistance against forced entry and physical impact',
      'Filters 99% of fading UV solar radiation',
      'Certified EN 12543 horizontal assembly line autoclaved production',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '4 mm - 19 mm',
      },
      {
        
        label: 'Unit Thickness Range',
        value: '8.38 mm - 80 mm',
      },
      {
        
        label: 'Lamination Film Make',
        value: 'Kuraray PVB, Eastman Solutia (USA)',
      },
      {
        
        label: 'Standard',
        value: 'EN 12543',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear, extra clear, ultra clear, tinted, solar-control coated, low-E coated. (Upto Triple Silver)',
      },
      {
        
        label: 'Process Type',
        value: 'Horizontal Assembly line with Press Rollers under controlled room conditions followed by autoclaving',
      },
    ],
    galleryImages: [
      '/images/apps/railings.png',
      '/images/craft-laminated.jpg',
      '/images/prod-partitions.jpg',
      '/images/prod-additional.jpg',
    ],
    sliderImages: [
      '/images/apps/railings.png',
      '/images/craft-laminated.jpg',
    ],
    relatedProductIds: ['acoustic-lami-glass', 'sentry-laminated-glass'],
  },

  'insulated-glass-dgu': {
    id: 'insulated-glass-dgu',
    indexNumber: '08',
    title: 'DGU (Insulated Glass)',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/craft-dgu.jpg',
    introSummary:
      'Insulated glass is a combination of two or more panels that are spaced apart and sealed with sealant to appear as a single unit. By harnessing the power of Insulated Glass (DGU) by Magic Glass, you can create a comfortable and sustainable environment.',
    secondaryText:
      'By combining tinted glass, Low-E coatings, reflective coatings, etc., a wide variety of insulating glass configurations are available to achieve superior U-value thermal insulation (< 1.1 W/m²K) and sound reduction.',
    detailImages: [
      '/images/craft-dgu.jpg',
      '/images/apps/windows.png',
    ],
    characteristics: [
      'Vertically fully automated robotic sealing process with PIB primary seal',
      'Italian Profil Glass warm-edge spacers preventing condensation',
      'Argon gas cavity filling options for optimal U-value performance',
      'Fenzi butyl & Sealande/Dow Corning structural silicone secondary sealing',
      'Certified EN 1279 hermetically sealed double glazing units',
    ],
    specs: [
      {
        
        label: 'Process type',
        value: 'vertically fully automated robotic sealing process',
      },
      {
        
        label: 'Glass thickness range',
        value: '4mm to 19mm',
      },
      {
        
        label: 'DGU unit thickness',
        value: '14mm to 48mm',
      },
      {
        
        label: 'Airfill type',
        value: 'Air or Argon Glass',
      },
      {
        
        label: 'Spacer Make',
        value: 'Profil Glass (Italy)',
      },
      {
        
        label: 'Butyl Make',
        value: 'Fenzi (Italy)',
      },
      {
        
        label: 'Desiccant Make',
        value: 'Netragy',
      },
      {
        
        label: 'Silicon Make',
        value: 'Sealande, Dow(USA)',
      },
      {
        
        label: 'Standard',
        value: 'EN 1279',
      },
    ],
    galleryImages: [
      '/images/craft-dgu.jpg',
      '/images/apps/windows.png',
      '/images/prod-structural.jpg',
      '/images/craft-laminated.jpg',
    ],
    sliderImages: [
      '/images/craft-dgu.jpg',
      '/images/apps/windows.png',
    ],
    relatedProductIds: ['dgu-laminated-glass', 'skn-ultra-high-performance-glass'],
  },

  'dgu-laminated-glass': {
    id: 'dgu-laminated-glass',
    indexNumber: '09',
    title: 'DGU Laminated Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/apps/windows.png',
    introSummary:
      'Indulge in the world of DGU Laminated Glass by Magic Glass, where luxury and elegance intertwine flawlessly. Crafted to perfection, this extraordinary glass creation offers an exceptional blend of aesthetics, safety, and acoustic performance.',
    secondaryText:
      'From its impeccable appearance to its exceptional performance, DGU Laminated Glass emanates opulence and refinement, making it the premier choice for luxury villa envelopes, commercial airport facades, and high-rise residential towers.',
    detailImages: [
      '/images/apps/windows.png',
      '/images/craft-dgu.jpg',
    ],
    characteristics: [
      'Vertically fully automated robotic sealing process for dual-pane laminated units',
      'Combines outer laminated safety pane with inner Low-E energy pane',
      'Argon gas cavity with Italian Profil Glass warm-edge spacer sealing',
      'Fenzi butyl & Dow Corning structural silicone secondary hermetic seals',
      'Maximum impact safety + sound reduction + thermal solar control in one assembly',
    ],
    specs: [
      {
        
        label: 'Process type',
        value: 'vertically fully automated robotic sealing process',
      },
      {
        
        label: 'Glass thickness range',
        value: '4mm to 19mm',
      },
      {
        
        label: 'DGU unit thickness',
        value: '28mm to 48mm',
      },
      {
        
        label: 'Airfill type',
        value: 'Air or Argon Glass',
      },
      {
        
        label: 'Spacer Make',
        value: 'Profil Glass (Italy)',
      },
      {
        
        label: 'Butyl Make',
        value: 'Fenzi (Italy)',
      },
      {
        
        label: 'Desiccant Make',
        value: 'Netragy',
      },
      {
        
        label: 'Silicon Make',
        value: 'Sealande, Dow(USA)',
      },
    ],
    galleryImages: [
      '/images/apps/windows.png',
      '/images/craft-dgu.jpg',
      '/images/apps/roof.png',
      '/images/craft-laminated.jpg',
    ],
    sliderImages: [
      '/images/apps/windows.png',
      '/images/craft-dgu.jpg',
    ],
    relatedProductIds: ['insulated-glass-dgu', 'skn-ultra-high-performance-glass'],
  },

  'high-performance-low-e-glass': {
    id: 'high-performance-low-e-glass',
    indexNumber: '10',
    title: 'High Performance LOW-E Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/apps/roof.png',
    introSummary:
      'High-Performance Low-E Glass leverages cutting-edge technology to provide superior thermal performance. Designed as an advanced thermal insulation glass (Low-E), High-Performance Low-E Glass revolutionizes energy efficiency in buildings, setting new benchmarks in the glass manufacturing industry in India.',
    secondaryText:
      'Manufactured using state-of-the-art magnetron sputtering processes under vacuum conditions, this coated glass reflects long-wave heat radiation, ensuring exceptional thermal insulation and maximum occupant comfort. With outstanding light transmission and minimal reflection, High-Performance Low-E Glass allows ample natural light to penetrate while providing unparalleled clarity.',
    detailImages: [
      '/images/apps/roof.png',
      '/images/prod-structural.jpg',
    ],
    characteristics: [
      'Magnetron soft-coat low-emissivity coating applied under high vacuum',
      'Reflects long-wave infrared thermal radiation while transmitting natural daylight',
      'Substantially reduces HVAC operational costs and building carbon footprint',
      'Processed onto Saint Gobain, Gujarat Guardian & Asahi India float substrates',
      'Certified to EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, and IS-2553 standards',
    ],
    specs: [
      {
        
        label: 'Glass Thickness',
        value: '4mm-12mm',
      },
      {
        
        label: 'Tempering',
        value: 'Heat-strengthened (HS), Toughened',
      },
      {
        
        label: 'Standard',
        value: 'EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, IS-2553 PART 1',
      },
      {
        
        label: 'Glass Make',
        value: 'Saint Gobain, Gujarat Guardian, Asahi India',
      },
      {
        
        label: 'Value Addition',
        value: 'Insulated Glass (IGU), Laminated Glass (PVB and SentryGlas)',
      },
    ],
    galleryImages: [
      '/images/apps/roof.png',
      '/images/prod-structural.jpg',
      '/images/craft-dgu.jpg',
      '/images/prod-windows.jpg',
    ],
    sliderImages: [
      '/images/apps/roof.png',
      '/images/prod-structural.jpg',
    ],
    relatedProductIds: ['skn-ultra-high-performance-glass', 'insulated-glass-dgu'],
  },

  'skn-ultra-high-performance-glass': {
    id: 'skn-ultra-high-performance-glass',
    indexNumber: '11',
    title: 'SKN-Ultra High-Performance Glass',
    category: 'Structural & Exterior Glazing',
    heroImage: '/images/prod-structural.jpg',
    introSummary:
      'Ultra-high-performance glass provides natural light transmission while helping to limit heat gain and thermal energy transfer. Through continuous improvements in its thermal insulation and solar control performance, glass has become a flexible building material that can improve buildings energy efficiency.',
    secondaryText:
      'SKN High-Performance Glass from Magic Glass offers critical benefits for thermal insulation and solar control. It allows sunlight to pass through while reflecting a large proportion of solar heat (SHGC < 0.23). This keeps indoor spaces brighter and cooler compared to uncoated glass, improving energy efficiency.',
    detailImages: [
      '/images/prod-structural.jpg',
      '/images/apps/roof.png',
    ],
    characteristics: [
      'Triple & double-silver magnetron coatings delivering SHGC < 0.23',
      'High spectral selectivity admitting daylight while reflecting solar heat',
      'Blocks up to 99% of damaging UV radiation to prevent interior fading',
      'Reduces glare and air conditioning energy consumption significantly',
      'Certified to EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, and IS-2553 standards',
    ],
    specs: [
      {
        
        label: 'Glass Thickness',
        value: '4mm-12mm',
      },
      {
        
        label: 'Tempering',
        value: 'Heat-strengthened (HS), Toughened',
      },
      {
        
        label: 'Standard',
        value: 'EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, IS-2553 PART 1',
      },
      {
        
        label: 'Glass Make',
        value: 'Saint Gobain, Gujarat Guardian, Asahi India',
      },
      {
        
        label: 'Value Addition',
        value: 'Insulated Glass (IGU), Laminated Glass (PVB and SentryGlas)',
      },
    ],
    galleryImages: [
      '/images/prod-structural.jpg',
      '/images/apps/roof.png',
      '/images/craft-dgu.jpg',
      '/images/craft-laminated.jpg',
    ],
    sliderImages: [
      '/images/prod-structural.jpg',
      '/images/apps/roof.png',
    ],
    relatedProductIds: ['sentry-laminated-glass', 'high-performance-low-e-glass'],
  },

  'fire-safety-glass': {
    id: 'fire-safety-glass',
    indexNumber: '12',
    title: 'Fire & Safety Glass',
    category: 'Safety & Processing',
    heroImage: '/images/apps/glass-lifts.png',
    introSummary:
      'In the face of unpredictable natural calamities such as fire, Fire & Safety Glass by Magic Glass emerges as a crucial line of defense for residential and commercial spaces. With its exceptional fire-resistant properties, this specially laminated glass is designed to withstand high temperatures, preventing the spread of fire and containing it within a specific location.',
    secondaryText:
      'Fire & Safety Glass by Magic Glass is more than just a protective barrier—it is a lifeline during critical moments. Its robust composition acts as a shield, preventing the fire from spreading through the glass and minimizing the risk of smoke inhalation. By confining the fire and limiting the spread of smoke, Fire & Safety Glass provides precious time for occupants to call for help and evacuate safely.',
    detailImages: [
      '/images/apps/glass-lifts.png',
      '/images/factory-cnc.jpg',
    ],
    characteristics: [
      'Certified EW30 to EI120 fire resistance ratings (30 to 120 minutes)',
      'Intumescent gel layer transforms into an opaque thermal heat shield during fire',
      'Blocks radiant heat transfer and dangerous toxic smoke propagation',
      'Class 1 impact safety glass rating for daily high-traffic building use',
      'Mandatory safety installation for escape stairwells, corridors, and fire barriers',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '10 mm to 32 mm',
      },
      {
        
        label: 'Fire Rating',
        value: 'EW30 to EI120 (30 to 120 Minutes Fire Protection)',
      },
      {
        
        label: 'Standard',
        value: 'EN 1363, EN 12600, BS 476',
      },
      {
        
        label: 'Interlayer Type',
        value: 'Intumescent Gel Fire-Insulating Interlayer',
      },
      {
        
        label: 'Process Type',
        value: 'Laminated safety fire barrier composition with clear visual light transmission',
      },
    ],
    galleryImages: [
      '/images/apps/glass-lifts.png',
      '/images/factory-cnc.jpg',
      '/images/prod-additional.jpg',
      '/images/apps/railings.png',
    ],
    sliderImages: [
      '/images/apps/glass-lifts.png',
      '/images/factory-cnc.jpg',
    ],
    relatedProductIds: ['heat-soaked-glass', 'pvb-laminated-glass'],
  },

  'ceramic-glass': {
    id: 'ceramic-glass',
    indexNumber: '13',
    title: 'Ceramic Glass',
    category: 'Specialty & Decorative',
    heroImage: '/images/craft-ceramic.jpg',
    introSummary:
      'Step into the world of Ceramic Glass by Magic Glass, where artistry meets durability. Through the innovative process of Ceramic fritting, glass enamel is fused onto the glass surface, creating a permanent coating that withstands the test of time. Light frit colors and pattern designs enhance brightness, while dark frit colors reduce glare.',
    secondaryText:
      'Ceramic Glass unlocks boundless possibilities in interior and façade design. Its versatile application allows for privacy, background concealment, product enhancement, and pure aesthetic appeal. The coating remains impervious to moisture, oil, soaps, chemicals, or detergents, ensuring a pristine appearance throughout the glass lifetime.',
    detailImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
    ],
    characteristics: [
      'Enamel paint fused into glass matrix during tempering cycle',
      'Scratch-resistant, weather-proof, and UV-immune surface finish',
      'Automatic screen printing in controlled cleanroom with IR drying',
      'Full flood coat or custom dot matrices in all RAL color scheme options',
      'Ideal for building spandrels, glare control fins, and decorative screens',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '4 mm - 19 mm',
      },
      {
        
        label: 'Design Type',
        value: 'Full flood coat or a wide range of custom designs.',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear, extra clear, COLOR Options: All colours in the RAL colour scheme.',
      },
      {
        
        label: 'Process Type',
        value: 'Automatic Screen Printing in controlled room conditions with IR Drying System and Multicolour options.',
      },
    ],
    galleryImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
    ],
    sliderImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
    ],
    relatedProductIds: ['frosted-glass', 'mirror-glass'],
  },

  'frosted-glass': {
    id: 'frosted-glass',
    indexNumber: '14',
    title: 'Frosted Glass',
    category: 'Specialty & Decorative',
    heroImage: '/images/apps/partition.png',
    introSummary:
      'With its distinct appearance, Frosted Glass adds a touch of sophistication to any space. Using techniques like sandblasting or acid-etching, the transparent sheet of glass is transformed into an opaque masterpiece. Light scattering during transmission creates a translucent effect, allowing the glass to transmit light while obscuring visibility.',
    secondaryText:
      'This type of glass is widely used in interior applications and gives a great aesthetic appeal. In furniture, it adds a layer of elegance, whether as cabinet doors, tabletops, or shelving units, transforming ordinary pieces into extraordinary statements. In bathrooms, Frosted Glass provides privacy while still allowing natural light to filter through.',
    detailImages: [
      '/images/apps/partition.png',
      '/images/craft-ceramic.jpg',
    ],
    characteristics: [
      'Smooth acid-etched satin surface providing privacy and light diffusion',
      'High daylight transmittance with complete visual privacy protection',
      'Smudge-resistant and easy to clean compared to sandblasted glass',
      'Can be toughened and laminated into safety partitions',
      'Available on Clear, Extra Clear, Tinted, and Reflective glass substrates',
    ],
    specs: [
      {
        
        label: 'Glass Thickness',
        value: '4mm to 19mm',
      },
      {
        
        label: 'Tempering',
        value: 'Heat Strengthened (HS), Toughened',
      },
      {
        
        label: 'Glass Type',
        value: 'Clear Glass, Extra Clear Glass, Tinted Glass, Reflective Glass',
      },
      {
        
        label: 'Value Addition',
        value: 'IGU and Laminated Glass',
      },
    ],
    galleryImages: [
      '/images/apps/partition.png',
      '/images/craft-ceramic.jpg',
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
    ],
    sliderImages: [
      '/images/apps/partition.png',
      '/images/craft-ceramic.jpg',
    ],
    relatedProductIds: ['ceramic-glass', 'mirror-glass'],
  },

  'mirror-glass': {
    id: 'mirror-glass',
    indexNumber: '15',
    title: 'Mirror Glass',
    category: 'Specialty & Decorative',
    heroImage: '/images/prod-partitions.jpg',
    introSummary:
      'Mirrored glass adds a living quality to your design. Whether you want a glamorous, full reflection effect, specific reflectivity with light-diffusing etched or patterned surfaces, or a custom luminous color, we can help. Pair graphics with a mirror to achieve depth, or add an etched layer for a soft, welcoming glow.',
    secondaryText:
      'Discover the widest range of designs, shapes, and colors to maximize the room lighting, making the details look more prominent than ever. Manufactured with environmental copper-free and lead-free silver backing for long-lasting corrosion resistance.',
    detailImages: [
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
    ],
    characteristics: [
      'Copper-free and lead-free environmental silver mirror backing',
      'High resistance to atmospheric corrosion and edge blackening',
      'Distortion-free optics with crystal clear depth of reflection',
      'Brands available: Saint Gobain, Gujarat Guardian, Sisecam',
      'Available in silver, bronze, grey, and custom architectural tints',
    ],
    specs: [
      {
        
        label: 'Thickness',
        value: '4mm to 6mm',
      },
      {
        
        label: 'Brands',
        value: 'Saint Gobain, Gujarat Guardian, Sisecam',
      },
      {
        
        label: 'Backing Type',
        value: 'Copper-free and lead-free environmental silver mirror backing',
      },
      {
        
        label: 'Value Addition',
        value: 'Bevelled edges, frosted graphics, tinted mirrors (bronze, grey, clear)',
      },
    ],
    galleryImages: [
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
      '/images/apps/partition.png',
      '/images/craft-ceramic.jpg',
    ],
    sliderImages: [
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
    ],
    relatedProductIds: ['frosted-glass', 'extra-clear-glass'],
  },

  'back-painted-glass': {
    id: 'back-painted-glass',
    indexNumber: '16',
    title: 'Back-Painted Glass',
    category: 'Specialty & Decorative',
    heroImage: '/images/craft-ceramic.jpg',
    introSummary:
      'High-grade opaque colored lacquered glass featuring durable moisture-resistant backing enamel. Perfect for modern kitchen backsplashes, wall paneling, writing boards, and interior accents.',
    secondaryText:
      'Available in custom RAL color matching, offering a seamless, non-porous glass surface that is easy to clean and maintains high-gloss brilliance over time.',
    detailImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
    ],
    characteristics: [
      'Opaque high-gloss lacquered surface finish',
      'Durable moisture and heat resistant backing enamel',
      'Available in all RAL color scheme matching options',
      'Ideal for kitchen backsplashes, wall cladding, and writing boards',
      'Easy to clean non-porous hygienic glass surface',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '4mm - 12mm',
      },
      {
        
        label: 'Color Options',
        value: 'All colors in the RAL color scheme',
      },
      {
        
        label: 'Process Type',
        value: 'Lacquered back coating with moisture-resistant enamel',
      },
      {
        
        label: 'Value Addition',
        value: 'Magnetic glass writing board processing, custom cutouts',
      },
    ],
    galleryImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
      '/images/prod-partitions.jpg',
      '/images/prod-structural.jpg',
    ],
    sliderImages: [
      '/images/craft-ceramic.jpg',
      '/images/apps/partition.png',
    ],
    relatedProductIds: ['ceramic-glass', 'frosted-glass'],
  },

  'led-lighting-glass': {
    id: 'led-lighting-glass',
    indexNumber: '17',
    title: 'LED Lighting Glass',
    category: 'Specialty & Decorative',
    heroImage: '/images/prod-structural.jpg',
    introSummary:
      'Integrated edge-lit and surface-diffused LED architectural glass panels providing uniform edge-to-edge glow for signages, luxury interior feature displays, and backlit cladding.',
    secondaryText:
      'Combines low-voltage LED illumination with extra clear float glass substrates for high-impact architectural features in commercial lobbies, hotel reception desks, and retail storefronts.',
    detailImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
    ],
    characteristics: [
      'Integrated edge-lit low voltage LED lighting channels',
      'Uniform edge-to-edge light guide surface diffusion',
      'Low-iron extra clear glass substrate for crystal transparency',
      'Custom laser engraving and fritted graphic illumination',
      'Available in single color, CCT tunable, and RGB LED options',
    ],
    specs: [
      {
        
        label: 'Glass Thickness Range',
        value: '6mm - 19mm',
      },
      {
        
        label: 'Illumination Type',
        value: 'Integrated Edge-Lit LED & Surface Light Guide Panel',
      },
      {
        
        label: 'Glass Substrate',
        value: 'Low-Iron Extra Clear Float Glass',
      },
      {
        
        label: 'Value Addition',
        value: 'Custom laser engraving, fritted graphics, RGB / CCT LED options',
      },
    ],
    galleryImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
      '/images/craft-ceramic.jpg',
      '/images/prod-partitions.jpg',
    ],
    sliderImages: [
      '/images/prod-structural.jpg',
      '/images/prod-windows.jpg',
    ],
    relatedProductIds: ['extra-clear-glass', 'ceramic-glass'],
  },
}

