import { PdpLinkedProject } from './pdpProjectsRegistry'

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

export const PDP_MOCK_DATA: Record<string, PdpProductDetail> = {
  "toughened-glass": {
    "id": "toughened-glass",
    "indexNumber": "01",
    "title": "Toughened Glass",
    "subheading": "Fortified Safety Glass Quadruple (4x) Strength",
    "category": "Toughened Glass",
    "heroImage": "/images/products/toughened-glass.png",
    "introSummary": "Toughened glass, commonly referred to as ‘Tempered glass,’ stands as fortified safety glass, its strength amplified through meticulous thermal processes. This involves subjecting annealed glass to temperatures of around 650⁰C followed by swift cooling, culminating in a glass that possesses fourfold the strength of regular glass.",
    "secondaryText": "This intense heat treatment and rapid cooling induce distinct physical attributes, notably instilling surface compressive stress and enhancing the glass’s flexural potency. Preceding toughening, the glass is intricately cut to precise dimensions or expertly shaped, setting the stage for its exceptional attributes.",
    "detailImages": [
      "/images/products/details/SAFETY-DOORS.png",
      "/images/products/details/automotive.png"
    ],
    "characteristics": [
      "4x Strength of Annealed Float Glass",
      "High Surface Compressive Stress",
      "Convection Furnace Quench Processed",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Horizontal roller-hearth forced convection tempering with high-pressure air quenching"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "IS 2553 (Part 1), EN 12150-1, ASTM C1048"
      },
      {
        "icon": "/images/products/details/icons/clarity.png",
        "label": "Mechanical Strength",
        "value": "4x to 5x higher mechanical resilience than standard annealed float glass"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "Jumbo panels up to 9 × 16 ft."
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/SAFETY-DOORS.png",
        "title": "BUILDING AND CONSTRUCTION"
      },
      {
        "src": "/images/products/details/automotive.png",
        "title": "AUTOMOTIVE INDUSTRY"
      },
      {
        "src": "/images/products/details/FURNITURE.png",
        "title": "FURNITURE AND DECOR"
      },
      {
        "src": "/images/products/details/HIGH-RISE-BUILDINGS.png",
        "title": "SOLAR ENERGY"
      }
    ],
    "galleryImages": [
      "/images/products/details/SAFETY-DOORS.png",
      "/images/products/details/automotive.png",
      "/images/products/details/FURNITURE.png",
      "/images/products/details/HIGH-RISE-BUILDINGS.png"
    ],
    "industries": [
      {
        "title": "AUTOMOTIVE INDUSTRY",
        "image": "/images/products/details/windows.png",
        "description": "High-strength toughened safety glass engineered for windshields, side windows, and automotive glass enclosures providing impact resistance and passenger safety."
      },
      {
        "title": "FURNITURE AND DECOR",
        "image": "/images/products/details/FURNITURE.png",
        "description": "Elegant toughened glass tables, shelves, display counters, and interior partition panels crafted for modern residences and retail spaces."
      },
      {
        "title": "SOLAR ENERGY",
        "image": "/images/products/details/HIGH-RISE-BUILDINGS.png",
        "description": "Specialized low-iron toughened glass panels offering high solar transmittance and enduring durability for photovoltaic solar modules and collectors."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "clear-glass",
      "hs-glass"
    ]
  },
  "clear-glass": {
    "id": "clear-glass",
    "indexNumber": "02",
    "title": "Clear Glass",
    "subheading": "BUILT TO LAST — Unsurpassed Optical Transparency",
    "category": "Toughened Glass",
    "heroImage": "/images/products/clear-glass.png",
    "introSummary": "Discover the extraordinary clarity and purity of Clear Glass. This exceptional product is manufactured by Saint Gobain using state-of-the-art techniques, guaranteeing unparalleled transparency without any tint. With its crystal-clear finish, Clear Glass provides an unobstructed view, allowing you to experience the true colors of your surroundings.",
    "secondaryText": "Clear Glass is a versatile solution that seamlessly integrates into various applications. Whether it’s partitions, doors, furniture, or display cabinets, this glass is designed to enhance and elevate any space it adorns. Clear glass can be toughened or heat strengthened",
    "detailImages": [
      "/images/products/details/partitions.png",
      "/images/products/details/Shower.png"
    ],
    "characteristics": [
      "Saint Gobain Premium Float Glass",
      "Low Iron Index at 654 PPM",
      "Jumbo Panels up to 9*16 ft.",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/thickness.png",
        "label": "Min-max thickness",
        "value": "4 mm to 19 mm"
      },
      {
        "icon": "/images/products/details/icons/clarity.png",
        "label": "Clarity",
        "value": "654 PPM"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "9*16 ft."
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 14179, EN 12150-1 and, ASTM C 1048 EN 12150-1 and, ASTM C 1048, IS 2553 PART 1 and, PART 2, EN 1279, EN 12543"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/partitions.png",
        "title": "PARTITIONS"
      },
      {
        "src": "/images/products/details/Shower.png",
        "title": "SHOWER CUBICLES"
      },
      {
        "src": "/images/products/details/balconies.png",
        "title": "BALCONIES"
      },
      {
        "src": "/images/products/details/staircase.png",
        "title": "STAIRCASE"
      },
      {
        "src": "/images/products/details/interiors.png",
        "title": "INTERIORS"
      }
    ],
    "galleryImages": [
      "/images/products/details/partitions.png",
      "/images/products/details/Shower.png",
      "/images/products/details/balconies.png",
      "/images/products/details/staircase.png"
    ],
    "industries": [
      {
        "title": "AUTOMOTIVE",
        "image": "/images/products/details/automotive.png",
        "description": "Experience the ultimate clarity and sophistication with clear glass for automotive application, providing sleek and unobstructed windows, windshields, and panoramic roof that elevate the driving experience."
      },
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Unleash your architectural vision with Clear Glass, perfect for creating stunning facades, modern structures, and captivating interiors that emphasize transparency and elegance."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "extra-clear-glass",
      "hs-glass"
    ]
  },
  "extra-clear-glass": {
    "id": "extra-clear-glass",
    "indexNumber": "03",
    "title": "Extra Clear Glass",
    "subheading": "Pure Light Transmission & True Color Rendering",
    "category": "Toughened Glass",
    "heroImage": "/images/products/extra-clear-glass.png",
    "introSummary": "The Extra clear glass is a type of Float glass that has low iron content (lower than clear glass), which reduces the greenish-blue tint and therefore makes it extra clear. It is also called low iron glass.",
    "secondaryText": "With its unparalleled clarity and transparency, Extra Clear Glass creates an environment that is bathed in natural light, showcasing true colors and creating an atmosphere of purity and refinement. Experience a new level of sophistication with Extra Clear Glass, where visual clarity is elevated to an art form.",
    "detailImages": [
      "/images/products/details/KITCHENS.png",
      "/images/products/details/TABLETOPS.png"
    ],
    "characteristics": [
      "Ultra-Low Ferric Oxide Substrate",
      "Zero Green Edge Tint",
      ">91% Light Transmittance",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/thickness.png",
        "label": "Min-max thickness",
        "value": "4mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/clarity.png",
        "label": "Clarity",
        "value": "654 PPM"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "9*16 ft."
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 14179, EN 12150-1 and, ASTM C 1048 EN 12150-1 and, ASTM C 1048, IS 2553 PART 1 and, PART 2, EN 1279, EN 12543"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/KITCHENS.png",
        "title": "KITCHENS"
      },
      {
        "src": "/images/products/details/TABLETOPS.png",
        "title": "TABLETOPS"
      },
      {
        "src": "/images/products/details/PARTITIONS.png",
        "title": "PARTITIONS"
      },
      {
        "src": "/images/products/details/DISPLAY-SHOWCASES.png",
        "title": "DISPLAY SHOWCASES"
      },
      {
        "src": "/images/products/details/SHOPFRONTS.png",
        "title": "SHOPFRONTS"
      }
    ],
    "galleryImages": [
      "/images/products/details/KITCHENS.png",
      "/images/products/details/TABLETOPS.png",
      "/images/products/details/PARTITIONS.png",
      "/images/products/details/DISPLAY-SHOWCASES.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Unleash your architectural vision with Clear Glass, perfect for creating stunning facades, modern structures, and captivating interiors that emphasize transparency and elegance."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "clear-glass",
      "sentry-laminated-glass"
    ]
  },
  "hs-glass": {
    "id": "hs-glass",
    "indexNumber": "04",
    "title": "HS Glass",
    "subheading": "High Mechanical & Thermal Stress Resistance",
    "category": "Toughened Glass",
    "heroImage": "/images/products/hs-glass.png",
    "introSummary": "Heat-strengthened glass is heat-treated glass that retains the distinctive properties of ordinary float glass. The glass is manufactured in one of the two electric horizontal roller-hearth tempering lines, where the glass is first heated and then cooled down with much less pressure. The machines are equipped with an advanced convection system to produce the best optical quality glass with a significant energy consumption reduction. Along with this, the super flat spotless technology ensures minimum iridescence and produces high-quality glass. Heat-strengthened glass is popular among design professionals for curtain wall façades of buildings, in both the vision and spandrel applications. It is valued for its mechanical strength, higher optical clarity, and flatter finish, and the probability of nickel sulfide inclusions inducing spontaneous breakages in the heat-strengthened glass is practically non-existent.",
    "secondaryText": "Heat-strengthened glass is heat-treated glass that retains the distinctive properties of ordinary float glass. The glass is manufactured in one of the two electric horizontal roller-hearth tempering lines, where the glass is first heated and then cooled down with much less pressure. The machines are equipped with an advanced convection system to produce the best optical quality glass with a significant energy consumption reduction. Along with this, the super flat spotless technology ensures minimum iridescence and produces high-quality glass. Heat-strengthened glass is popular among design professionals for curtain wall façades of buildings, in both the vision and spandrel applications. It is valued for its mechanical strength, higher optical clarity, and flatter finish, and the probability of nickel sulfide inclusions inducing spontaneous breakages in the heat-strengthened glass is practically non-existent.",
    "detailImages": [
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
      "/images/products/details/EXTERIOR-WINDOWS.png"
    ],
    "characteristics": [
      "2x Mechanical Strength of Float Glass",
      "Interlocking Break Pattern",
      "Optimized for Spandrel & Wind-Load Panels",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/thickness.png",
        "label": "Min-max thickness",
        "value": "4mm to 12 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, Extra Clear, Low e, Reflective, Double Silver, Triple Silver"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "9*16 ft."
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 1863 and IS 2553 PART 1"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Tempering using horizontal roller hearth convection furnace, insulating glass, lamination glass, sand frosting, bevelled and chamfered glass"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
        "title": "FACADES (REFLECTIVE GLASS)"
      },
      {
        "src": "/images/products/details/EXTERIOR-WINDOWS.png",
        "title": "EXTERIOR (WINDOWS)"
      }
    ],
    "galleryImages": [
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
      "/images/products/details/EXTERIOR-WINDOWS.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects and designers turn to HS Glass to bring their visions to life. In the field of architecture, this heat-strengthened glass adds an extra layer of safety and aesthetics to structures, empowering architects to create stunning facades and exteriors while ensuring optimal thermal performance."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "toughened-glass",
      "heat-soaked-glass"
    ]
  },
  "heat-soaked-glass": {
    "id": "heat-soaked-glass",
    "indexNumber": "05",
    "title": "Heat Soaked Glass",
    "subheading": "Zero Spontaneous Breakage for High-Rise Glazing",
    "category": "Toughened Glass",
    "heroImage": "/images/products/heat-soaked-glass.jpg",
    "introSummary": "Float glass used in windows and doors often contains microscopic nickel sulfide inclusions that can expand over time and cause panes of tempered glass to suddenly and unexpectedly break—an effect known as spontaneous breakage. This poses serious risks, as shattered glass can injure anyone nearby. Our Heat Soaked Glass to help eliminate this threat.",
    "secondaryText": "Through Magic Glass, we reheat fully tempered panes of glass in special heating chambers, accelerating any expansion of nickel sulfide that may occur naturally over the years. This controlled expansion causes any prone-to-break glass to fail safely inside the chamber rather than unexpectedly in the field. Once cooled, the resulting glass carries a dramatically reduced risk of spontaneous shattering.",
    "detailImages": [
      "/images/products/details/INTERIOR-DECOR-1.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png"
    ],
    "characteristics": [
      "Accelerated Hold Cycle in Oven (EN 14179)",
      "Eliminates Spontaneous NiS Breakage",
      "Certified for High-Rise Facades",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4 mm – 19 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2270.png",
        "label": "Design Type",
        "value": "Full flood coat or a wide range of custom designs."
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, extra clear, COLOR Options: All colours in the RAL colour scheme."
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Automatic Screen Printing in controlled room conditions with IR Drying System and Multicolour options."
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/INTERIOR-DECOR-1.png",
        "title": "INTERIORS"
      },
      {
        "src": "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
        "title": "FACADE"
      },
      {
        "src": "/images/products/details/HIGH-RISE-BUILDINGS.png",
        "title": "HIGH-RISE BUILDINGS"
      }
    ],
    "galleryImages": [
      "/images/products/details/INTERIOR-DECOR-1.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
      "/images/products/details/HIGH-RISE-BUILDINGS.png",
      "/images/products/details/INTERIOR-DECOR-1.png"
    ],
    "industries": [
      {
        "title": "TRANSPORT",
        "image": "/images/products/details/Transport.png",
        "description": "Enhance the passenger experience in transport hubs with Ceramic Glass. Applied to glass walls, partitions, and panels, the coating offers both practicality and aesthetics, elevating the visual appeal and creating an inviting environment in train stations, airports, and other transportation settings."
      },
      {
        "title": "PUBLIC SPACES",
        "image": "/images/products/details/Public-Spaces.png",
        "description": "Enchant public spaces with Ceramic Glass, whether it&#8217;s shopping centers, museums, or educational institutions. The coating can be used to create privacy screens, captivating decorative elements, or elegant signage, captivating visitors while maintaining a flawless appearance."
      },
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects and designers choose Ceramic Glass to create architectural marvels that stand the test of time. From residential complexes to commercial buildings, this glass solution combines enduring beauty with unmatched durability, setting a new benchmark for excellence."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "toughened-glass",
      "hs-glass"
    ]
  },
  "sentry-laminated-glass": {
    "id": "sentry-laminated-glass",
    "indexNumber": "06",
    "title": "Sentry Laminated Glass",
    "subheading": "High-Security Structural Glazing & Overhead Canopies",
    "category": "Laminated Glass",
    "heroImage": "/images/products/sentry-laminated-glass.png",
    "introSummary": "Sentry Laminated Glass by Magic Glass elevates strength and durability to newer heights. Designed to surpass the strength of traditional PVB films, Sentry Laminated Glass employs the superior SGP (Sentry Glass Plus) film to offer unparalleled resistance.",
    "secondaryText": "Sentry Laminated Glass is engineered to withstand the toughest challenges, ensuring the safety and security of your spaces. With its robust SGP film, it offers increased resistance to impacts, breakage, and forced entry. Be it for commercial or residential purposes, sentry laminated glass provides security and delivers ultimate peace of mind, fortifying your surroundings with unyielding strength.",
    "detailImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/OVERHEAD-SPACES-1.png"
    ],
    "characteristics": [
      "5x Tear Strength & 100x Stiffness",
      "Ionoplast Rigid Interlayer",
      "Zero Delamination Risk Under Storm Loads",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4 mm – 19 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2259.png",
        "label": "Unit Thickness Range",
        "value": "8.38 mm – 80 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2260.png",
        "label": "Lamination Film Make",
        "value": "Kurrary Sentry Glass (USA)"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 12543"
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, extra clear, ultra clear, tinted, solar-control coated, low – E coated. (Upto Tripple Silver)"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Horizontal cleanroom assembly with press rollers, high-pressure autoclave curing, and specialized vacuum bag lamination"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "4000 × 2500 mm"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/WINDOWS-2.png",
        "title": "WINDOWS"
      },
      {
        "src": "/images/products/details/OVERHEAD-SPACES-1.png",
        "title": "OVERHEAD SPACES"
      },
      {
        "src": "/images/products/details/GLASS-LIFTS-1.png",
        "title": "GLASS LIFTS"
      },
      {
        "src": "/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png",
        "title": "RAILINGS, STAIRCASE, AND PARTITIONS"
      },
      {
        "src": "/images/products/details/DOORS-1.png",
        "title": "DOORS"
      },
      {
        "src": "/images/products/details/FACADES.png",
        "title": "FACADES"
      }
    ],
    "galleryImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/OVERHEAD-SPACES-1.png",
      "/images/products/details/GLASS-LIFTS-1.png",
      "/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURAL",
        "image": "/images/products/details/architecture.png",
        "description": "From residential complexes to commercial buildings, Sentry Laminated Glass provides an extra layer of security, making it an ideal choice for architects seeking to prioritize safety and durability without compromising on design aesthetics."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "pvb-laminated-glass",
      "skn-ultra-high-performance-glass"
    ]
  },
  "acoustic-lami-glass": {
    "id": "acoustic-lami-glass",
    "indexNumber": "07",
    "title": "Acoustic Lami Glass",
    "subheading": "Revolutionary Sound Control & Acoustic Isolation",
    "category": "Laminated Glass",
    "heroImage": "/images/products/acoustic-lami-glass.png",
    "introSummary": "Designed to provide superior acoustic insulation and noise control, Acoustic Lami Glass plays a crucial role in creating a soothing and peaceful environment in both living and working spaces.",
    "secondaryText": "Acoustic Lami Glass is a revolution in sound control, consisting of multiple layers of glass bonded together by acoustic polyvinyl butyral (PVB) interlayers. This configuration acts as a noise dampener, weakening sound waves as they travel through the glass. By incorporating Acoustic Lami Glass, you can significantly reduce exterior noise, ensuring a peaceful atmosphere within your space. Additionally, the laminated glass provides an added safety benefit, as it remains intact even when broken, reducing the risk of injury.",
    "detailImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/PARTITIONS-1.png"
    ],
    "characteristics": [
      "Superior Sound Insulation up to STC 42dB",
      "Dampens Airborne Noise & Vibration",
      "Speech Privacy for Corporate Interiors",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4 mm – 19 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2259.png",
        "label": "Unit Thickness Range",
        "value": "8.38 mm – 80 mm"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 12543"
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, extra clear, ultra clear, tinted, solar-control coated, low – E coated. (Upto Tripple Silver)"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Horizontal cleanroom assembly with press rollers, high-pressure autoclave curing, and specialized vacuum bag lamination"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "4000 × 2500 mm"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/WINDOWS-2.png",
        "title": "WINDOWS"
      },
      {
        "src": "/images/products/details/PARTITIONS-1.png",
        "title": "PARTITIONS"
      },
      {
        "src": "/images/products/details/DOORS-2.png",
        "title": "DOORS"
      },
      {
        "src": "/images/products/details/ARCHITECTURAL-INTERIOR.png",
        "title": "ARCHITECTURAL INTERIOR"
      }
    ],
    "galleryImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/PARTITIONS-1.png",
      "/images/products/details/DOORS-2.png",
      "/images/products/details/ARCHITECTURAL-INTERIOR.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURAL",
        "image": "/images/products/details/architecture.png",
        "description": "Acoustic Lami Glass finds its place in architectural projects, providing unrivaled sound insulation for both commercial and residential buildings. Architects and designers can create spaces that prioritize occupant comfort, reducing noise disturbances and promoting tranquility."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "pvb-laminated-glass",
      "clear-glass"
    ]
  },
  "pvb-laminated-glass": {
    "id": "pvb-laminated-glass",
    "indexNumber": "08",
    "title": "PVB Laminated Glass",
    "subheading": "Comprehensive Impact Protection & Safety Glazing",
    "category": "Laminated Glass",
    "heroImage": "/images/products/pvb-laminated-glass.png",
    "introSummary": "PVB Laminated Glass is made by combining layers of interlayer film with two or more panes of glass through a meticulous lamination process. Utilizing high temperature and pressure in an autoclave, we ensure exceptional adhesion and impact resistance.",
    "secondaryText": "With a range of interlayers including PVB, SGP, colored, and acoustic options, PVB Laminated Glass is the natural choice for applications requiring safety, security, solar control, UV protection, and noise reduction.",
    "detailImages": [
      "/images/products/details/WINDOWS-1.png",
      "/images/products/details/OVERHEAD-SPACES-1.png"
    ],
    "characteristics": [
      "Polyvinyl Butyral (PVB) High-Tension Interlayer",
      "Fall-Through Protection Upon Breakage",
      "99% Ultraviolet (UV) Ray Rejection",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4 mm – 19 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2259.png",
        "label": "Unit Thickness Range",
        "value": "8.38 mm – 80 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2260.png",
        "label": "Lamination Film Make",
        "value": "Kurrary PVB, Eastman Solutia (USA)"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 12543"
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, extra clear, ultra clear, tinted, solar-control coated, low-E coated. (Upto Triple Silver)"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Horizontal cleanroom assembly with press rollers, high-pressure autoclave curing, and specialized vacuum bag lamination"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "4000 × 2500 mm"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/WINDOWS-1.png",
        "title": "WINDOWS"
      },
      {
        "src": "/images/products/details/OVERHEAD-SPACES-1.png",
        "title": "OVERHEAD SPACES"
      },
      {
        "src": "/images/products/details/GLASS-LIFTS-1.png",
        "title": "GLASS LIFTS"
      },
      {
        "src": "/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png",
        "title": "RAILINGS, STAIRCASE, AND PARTITIONS"
      },
      {
        "src": "/images/products/details/DOORS-2.png",
        "title": "DOORS"
      },
      {
        "src": "/images/products/details/FACADES-1.png",
        "title": "FACADES"
      }
    ],
    "galleryImages": [
      "/images/products/details/WINDOWS-1.png",
      "/images/products/details/OVERHEAD-SPACES-1.png",
      "/images/products/details/GLASS-LIFTS-1.png",
      "/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURAL",
        "image": "/images/products/details/architecture.png",
        "description": "PVB Laminated Glass finds its place in architectural projects where safety is of utmost importance. From commercial buildings to residential complexes, this glass solution ensures the protection of occupants, providing peace of mind for architects and designers alike."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "sentry-laminated-glass",
      "acoustic-lami-glass"
    ]
  },
  "insulated-glass-dgu": {
    "id": "insulated-glass-dgu",
    "indexNumber": "09",
    "title": "DGU (Insulated Glass)",
    "subheading": "Thermal Comfort & Energy Efficient Architecture",
    "category": "Insulated Glass",
    "heroImage": "/images/products/insulated-glass-dgu.png",
    "introSummary": "Insulated glass is a combination of two or more panels that are spaced apart and sealed with sealant to appear as a single unit. At Magic Glass, we have state-of-the-art fully automatic Insulating lines with robot sealing. We were also the first company to manufacture Insulated glass in Pune. With such long experience and an excellent team, we have mastered the art of making the highest quality Insulated panels.",
    "secondaryText": "By harnessing the power of Insulated Glass (DGU) by Magic Glass, you can create a comfortable and sustainable environment while significantly lowering your energy costs.",
    "detailImages": [
      "/images/products/details/FACADES-3.png",
      "/images/products/details/PARTITIONS-1.png"
    ],
    "characteristics": [
      "Robotic Sealing with Fenzi Butyl & Dow Silicone",
      "Argon Gas Thermal Barrier (≥90% Fill, U-value < 1.1)",
      "Warm-Edge Spacer System",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process type",
        "value": "vertically fully automated robotic sealing process"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "3600 × 2400 mm (Robotic Sealant)"
      },
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass thickness range",
        "value": "4mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2288.png",
        "label": "DGU unit thickness",
        "value": "14mm to 48mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2265.png",
        "label": "Airfill type",
        "value": "Air or Argon Gas (≥90% filling concentration per EN 1279)"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Argon Filling Concentration",
        "value": "≥90% target (EN 1279 certified, min. 85% initial requirement)"
      },
      {
        "icon": "/images/products/details/icons/Group-2266.png",
        "label": "Spacer Make",
        "value": "Profil Glass (Italy)"
      },
      {
        "icon": "/images/products/details/icons/Group-2267.png",
        "label": "Butyl Make",
        "value": "Fenzi (Italy)"
      },
      {
        "icon": "/images/products/details/icons/Group-2268.png",
        "label": "Desiccant Make",
        "value": "Netragy"
      },
      {
        "icon": "/images/products/details/icons/Group-2269.png",
        "label": "Silicon Make",
        "value": "Sealande, Dow(USA)"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN 1279"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/FACADES-3.png",
        "title": "FACADES"
      },
      {
        "src": "/images/products/details/PARTITIONS-1.png",
        "title": "PARTITIONS"
      },
      {
        "src": "/images/products/details/HIGH-RISE-BUILDINGS.png",
        "title": "HIGH-RISE BUILDINGS"
      },
      {
        "src": "/images/products/details/WINDOWS-2.png",
        "title": "WINDOWS"
      }
    ],
    "galleryImages": [
      "/images/products/details/FACADES-3.png",
      "/images/products/details/PARTITIONS-1.png",
      "/images/products/details/HIGH-RISE-BUILDINGS.png",
      "/images/products/details/WINDOWS-2.png"
    ],
    "industries": [
      {
        "title": "AUTOMOTIVE",
        "image": "/images/products/details/automotive.png",
        "description": "It is mostly used in commercial refrigerators for reducing heat transfer and having clear visibility. It is also used in elevators, trains, and various places where there is a need to control the temperature and have clear visibility."
      },
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects rely on Insulated Glass (DGU) to create sustainable and environmentally conscious structures. In the field of architecture, this energy-efficient glazing solution helps meet green building standards, enhances thermal comfort, and promotes energy conservation, paving the way for a more sustainable future."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "dgu-laminated-glass",
      "high-performance-low-e-glass"
    ]
  },
  "dgu-laminated-glass": {
    "id": "dgu-laminated-glass",
    "indexNumber": "10",
    "title": "DGU Laminated Glass",
    "subheading": "Indulgent Luxury & Multi-Performance Shielding",
    "category": "Insulated Glass",
    "heroImage": "/images/products/dgu-laminated-glass.png",
    "introSummary": "Indulge in the world of DGU Laminated Glass by Magic Glass, where luxury and elegance intertwine flawlessly. Crafted to elevate premium spaces to unprecedented heights, DGU Laminated Glass is the epitome of super luxurious glass.",
    "secondaryText": "From its impeccable appearance to its exceptional performance, DGU Laminated Glass emanates opulence and refinement, making it the ultimate choice for prestigious venues including airports and 5-star hotels.",
    "detailImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/FACADES-3.png"
    ],
    "characteristics": [
      "Laminated Safety Outer Pane + Low-E DGU Unit",
      "Acoustic Barrier for Transit & Airports",
      "Maximum Security & Climate Protection",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process type",
        "value": "vertically fully automated robotic sealing process"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max size",
        "value": "3600 × 2400 mm (Robotic Sealant)"
      },
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass thickness range",
        "value": "4mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2288.png",
        "label": "DGU unit thickness",
        "value": "12mm to 4860mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2265.png",
        "label": "Airfill type",
        "value": "Air or Argon Gas (≥90% concentration per EN 1279)"
      },
      {
        "icon": "/images/products/details/icons/Group-2266.png",
        "label": "Spacer Make",
        "value": "Profil Glass (Italy)"
      },
      {
        "icon": "/images/products/details/icons/Group-2267.png",
        "label": "Butyl Make",
        "value": "Fenzi (Italy)"
      },
      {
        "icon": "/images/products/details/icons/Group-2268.png",
        "label": "Desiccant Make",
        "value": "Netragy"
      },
      {
        "icon": "/images/products/details/icons/Group-2269.png",
        "label": "Silicon Make",
        "value": "Sealande, Dow(USA)"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Butyl Make",
        "value": "Fenzi (Italy)"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/WINDOWS-2.png",
        "title": "WINDOWS"
      },
      {
        "src": "/images/products/details/FACADES-3.png",
        "title": "FACADES"
      }
    ],
    "galleryImages": [
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/FACADES-3.png",
      "/images/products/details/WINDOWS-2.png",
      "/images/products/details/WINDOWS-2.png"
    ],
    "industries": [
      {
        "title": "AIRPORTS",
        "image": "/images/products/details/Airports.png",
        "description": "Create a truly memorable airport experience with IGU Laminated Glass. Its luxurious appearance and exceptional quality make it the perfect choice for premium airport terminals."
      },
      {
        "title": "HOSPITALITY",
        "image": "/images/products/details/hospitality-1-2.png",
        "description": "From luxurious hotel suites to lavish resorts, IGU Laminated Glass adds a touch of elegance, creating a captivating ambiance that delights guests and leaves a lasting impression."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "insulated-glass-dgu",
      "sentry-laminated-glass"
    ]
  },
  "high-performance-low-e-glass": {
    "id": "high-performance-low-e-glass",
    "indexNumber": "11",
    "title": "High Performance LOW-E Glass",
    "subheading": "Advanced Thermal Insulation & Infrared Control",
    "category": "Reflective Glass",
    "heroImage": "/images/products/high-performance-low-e-glass.png",
    "introSummary": "High-Performance Low-E Glass leverages cutting-edge technology to provide superior thermal performance. Designed as an advanced thermal insulation glass (Low-E), High-Performance Low-E Glass revolutionizes energy efficiency in buildings, setting new benchmarks in the glass manufacturing industry in India.",
    "secondaryText": "Manufactured using state-of-the-art magnetron sputtering processes under vacuum conditions, this coated glass reflects long-wave heat radiation, ensuring exceptional thermal insulation and maximum occupant comfort. With outstanding light transmission and minimal reflection, High-Performance Low-E Glass allows ample natural light to penetrate while providing unparalleled clarity.",
    "detailImages": [
      "/images/products/details/FACADES-1.png",
      "/images/products/details/architecture.png"
    ],
    "characteristics": [
      "Off-Line Vacuum Sputtered Magnetron Coating",
      "Reflects Long-Wave Infrared Heat",
      "Significantly Decreases HVAC Cooling Loads",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness",
        "value": "4mm-12mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2262.png",
        "label": "Tempering",
        "value": "Heat-strengthened (HS), Toughened"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, IS-2553 PART 1"
      },
      {
        "icon": "/images/products/details/icons/Group-2257.png",
        "label": "Glass Make",
        "value": "Saint Gobain, Gujarat Guardian, Asahi India"
      },
      {
        "icon": "/images/products/details/icons/Group-2263.png",
        "label": "Value Addition",
        "value": "Insulated Glass (IGU), Laminated Glass (PVB and SentryGlas)"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/FACADES-1.png",
        "title": "FACADES"
      }
    ],
    "galleryImages": [
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects and designers turn to high-performance low-E Glass to meet the demands of sustainable and energy-efficient building design. Its remarkable thermal insulation properties contribute to improved energy performance."
      },
      {
        "title": "TRANSPORT",
        "image": "/images/products/details/Transport.png",
        "description": "By minimizing heat transfer and ensuring optimal thermal comfort, it enhances the passenger experience while reducing energy consumption. High-Performance Low-E Glass brings innovation and sustainability to transport infrastructure, making it a preferred choice for environmentally conscious design."
      },
      {
        "title": "PUBLIC SPACES",
        "image": "/images/products/details/Public-Spaces.png",
        "description": "High-Performance Low-E Glass contributes to energy savings and enhances the visual appeal of public spaces such as shopping centers, educational institutions, and offices, creating a welcoming and sustainable atmosphere."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "skn-ultra-high-performance-glass",
      "insulated-glass-dgu"
    ]
  },
  "skn-ultra-high-performance-glass": {
    "id": "skn-ultra-high-performance-glass",
    "indexNumber": "12",
    "title": "SKN-Ultra High-Performance Glass",
    "subheading": "Next-Generation Green Building Solar Glazing",
    "category": "Reflective Glass",
    "heroImage": "/images/products/skn-ultra-high-performance-glass.jpg",
    "introSummary": "Ultra-high-performance glass provides natural light transmission while helping to limit heat gain and thermal energy transfer. Through continuous improvements in its thermal insulation and solar control performance, glass has become a flexible building material that can improve buildings&#8217; energy efficiency. High-performance coated glass is a critical part of our glazing system. Coated glass allows building occupants to engage visually with the external environment from a comfortable interior.",
    "secondaryText": "High-performance glass works by controlling how it interacts with the electromagnetic spectrum. Solar energy from the sun includes ultraviolet, visible, and near-infrared wavelengths ranging from 300 to 2,500 nm. Solar control-coated glass can block a significant portion of this energy by reflecting and absorbing it. High-performance coatings on glass are designed to slow radiant heat transfer by reflecting longwave radiation (heat) into the building structure during cooler periods.",
    "detailImages": [
      "/images/products/details/FACADES-1.png",
      "/images/products/details/architecture.png"
    ],
    "characteristics": [
      "Double & Triple Silver Coated Chemistry",
      "Ultra-Low Solar Heat Gain Coefficient (SHGC)",
      "High Natural Neutral Daylight Penetration",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness",
        "value": "4mm-12mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2262.png",
        "label": "Tempering",
        "value": "Heat-strengthened (HS), Toughened"
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Standard",
        "value": "EN-1096, EN-12150, EN-12543, EN-1279, EN-1863, IS-2553 PART 1"
      },
      {
        "icon": "/images/products/details/icons/Group-2257.png",
        "label": "Glass Make",
        "value": "Saint Gobain, Gujarat Guardian, Asahi India"
      },
      {
        "icon": "/images/products/details/icons/Group-2263.png",
        "label": "Value Addition",
        "value": "Insulated Glass (IGU), Laminated Glass (PVB and SentryGlas)"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/FACADES-1.png",
        "title": "FACADES"
      }
    ],
    "galleryImages": [
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png",
      "/images/products/details/FACADES-1.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects and designers turn to high-performance low-E Glass to meet the demands of sustainable and energy-efficient building design. Its remarkable thermal insulation properties contribute to improved energy performance."
      },
      {
        "title": "TRANSPORT",
        "image": "/images/products/details/Transport.png",
        "description": "By minimizing heat transfer and ensuring optimal thermal comfort, it enhances the passenger experience while reducing energy consumption. High-Performance Low-E Glass brings innovation and sustainability to transport infrastructure, making it a preferred choice for environmentally conscious design."
      },
      {
        "title": "PUBLIC SPACES",
        "image": "/images/products/details/Public-Spaces.png",
        "description": "High-Performance Low-E Glass contributes to energy savings and enhances the visual appeal of public spaces such as shopping centers, educational institutions, and offices, creating a welcoming and sustainable atmosphere."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "high-performance-low-e-glass",
      "dgu-laminated-glass"
    ]
  },
  "fire-safety-glass": {
    "id": "fire-safety-glass",
    "indexNumber": "13",
    "title": "Fire & Safety Glass",
    "subheading": "Protecting Lives and Properties with Fire Resistance",
    "category": "Other Glass",
    "heroImage": "/images/products/fire-safety-glass.png",
    "introSummary": "In the face of unpredictable natural calamities such as fire, Fire & Safety Glass by Magic Glass emerges as a crucial line of defense for residential and commercial spaces. With its exceptional fire-resistant properties, this specially laminated glass is designed to withstand high temperatures, preventing the spread of fire and containing it within a specific location. By installing Fire & Safety Glass, you proactively minimize damage and enhance the safety of your property and its occupants.",
    "secondaryText": "Fire & Safety Glass by Magic Glass is more than just a protective barrier—it is a lifeline during critical moments. Its robust composition acts as a shield, preventing the fire from spreading through the glass and minimizing the risk of smoke inhalation. By confining the fire and limiting the spread of smoke, Fire & Safety Glass provides precious time for occupants to call for help and evacuate safely. It is a testament to our commitment to saving lives and protecting properties, offering unmatched peace of mind in the face of fire-related emergencies.",
    "detailImages": [
      "/images/products/details/ARCHITECTURE-HOSPITALS.png",
      "/images/products/details/SAFETY-DOORS.png"
    ],
    "characteristics": [
      "Laminated Fire-Resistive Composition",
      "Confines Flames & Smoke Inhalation Risks",
      "Certified for Hospitals & Commercial Exits",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/thickness.png",
        "label": "Glass Thickness Range",
        "value": "5mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/max-size.png",
        "label": "Max Sheet Size",
        "value": "8*14 ft."
      },
      {
        "icon": "/images/products/details/icons/standard.png",
        "label": "Fire Rating Standards",
        "value": "EN 1363-1, BS 476, IS 3614, UL 10C / ASTM E119"
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Specialized thermal toughening with intumescent fire-resistive interlayers"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/ARCHITECTURE-HOSPITALS.png",
        "title": "ARCHITECTURE (HOSPITALS)"
      },
      {
        "src": "/images/products/details/SAFETY-DOORS.png",
        "title": "SAFETY DOORS"
      }
    ],
    "galleryImages": [
      "/images/products/details/ARCHITECTURE-HOSPITALS.png",
      "/images/products/details/SAFETY-DOORS.png",
      "/images/products/details/ARCHITECTURE-HOSPITALS.png",
      "/images/products/details/ARCHITECTURE-HOSPITALS.png"
    ],
    "industries": [
      {
        "title": "COMMERCIAL",
        "image": "/images/products/details/hospitality-1.png",
        "description": "Fire & Safety Glass is a game-changer in commercial settings, where the protection of assets and the continuity of business operations are paramount. With a fire-resistant glass in office buildings, retail establishments, and industrial facilities, businesses mitigate the risk of fire damage and ensure the safety of employees and valuable."
      },
      {
        "title": "PUBLIC SPACES",
        "image": "/images/products/details/Public-Spaces.png",
        "description": "Fire & Safety Glass plays a pivotal role in public spaces such as shopping centers, educational institutions, and entertainment venues. Fire & Safety Glass enhance fire safety measures, enabling efficient evacuation and reducing the risk of fire-related incidents."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "toughened-glass",
      "pvb-laminated-glass"
    ]
  },
  "ceramic-glass": {
    "id": "ceramic-glass",
    "indexNumber": "14",
    "title": "Ceramic Glass",
    "subheading": "Permanent Architectural Graphics & Sun Shading",
    "category": "Other Glass",
    "heroImage": "/images/products/ceramic-glass.png",
    "introSummary": "Step into the world of Ceramic Glass by Magic Glass, where artistry meets durability. Through the innovative process of Ceramic fritting, glass enamel is fused onto the glass surface, creating a permanent coating that withstands the test of time. Light frit colors and pattern designs enhance brightness, while dark frit colors reduce glare, offering a harmonious balance of aesthetics and functionality.",
    "secondaryText": "Ceramic Glass unlocks boundless possibilities in interior and façade design. Its versatile application allows for privacy, background concealment, product enhancement, and pure aesthetic appeal. The coating remains impervious to moisture, oil, soaps, chemicals, or detergents, ensuring a pristine appearance throughout the glass’s lifespan. With Ceramic Glass, you can redefine the boundaries of design, making a lasting impression with enduring elegance.",
    "detailImages": [
      "/images/products/details/INTERIOR-DECOR-1.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png"
    ],
    "characteristics": [
      "Ceramic Enamel Permanently Fused at 650°C",
      "UV, Scratch & Weathering Immune",
      "Custom Silkscreen Architectural Motifs",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness Range",
        "value": "4 mm – 19 mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2270.png",
        "label": "Design Type",
        "value": "Full flood coat or a wide range of custom designs."
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear, extra clear, COLOR Options: All colours in the RAL colour scheme."
      },
      {
        "icon": "/images/products/details/icons/process-type.png",
        "label": "Process Type",
        "value": "Automatic Screen Printing in controlled room conditions with IR Drying System and Multicolour options."
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/INTERIOR-DECOR-1.png",
        "title": "INTERIORS"
      },
      {
        "src": "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
        "title": "FACADE"
      }
    ],
    "galleryImages": [
      "/images/products/details/INTERIOR-DECOR-1.png",
      "/images/products/details/FACADES-REFLECTIVE-GLASS.png",
      "/images/products/details/INTERIOR-DECOR-1.png",
      "/images/products/details/INTERIOR-DECOR-1.png"
    ],
    "industries": [
      {
        "title": "TRANSPORT",
        "image": "/images/products/details/Transport.png",
        "description": "Enhance the passenger experience in transport hubs with Ceramic Glass. Applied to glass walls, partitions, and panels, the coating offers both practicality and aesthetics, elevating the visual appeal and creating an inviting environment in train stations, airports, and other transportation settings."
      },
      {
        "title": "PUBLIC SPACES",
        "image": "/images/products/details/Public-Spaces.png",
        "description": "Enchant public spaces with Ceramic Glass, whether it&#8217;s shopping centers, museums, or educational institutions. The coating can be used to create privacy screens, captivating decorative elements, or elegant signage, captivating visitors while maintaining a flawless appearance."
      },
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Architects and designers choose Ceramic Glass to create architectural marvels that stand the test of time. From residential complexes to commercial buildings, this glass solution combines enduring beauty with unmatched durability, setting a new benchmark for excellence."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "frosted-glass",
      "clear-glass"
    ]
  },
  "frosted-glass": {
    "id": "frosted-glass",
    "indexNumber": "15",
    "title": "Frosted Glass",
    "subheading": "Sophisticated Privacy & Translucent Light Quality",
    "category": "Other Glass",
    "heroImage": "/images/products/frosted-glass.png",
    "introSummary": "With its distinct appearance, Frosted Glass adds a touch of sophistication to any space. Using techniques like sandblasting, the transparent sheet of glass is transformed into an opaque masterpiece. Light scattering during transmission creates a translucent effect, allowing the glass to transmit light while obscuring visibility.",
    "secondaryText": "This type of glass is widely used in interior applications and gives a great aesthetic appeal. In furniture, it adds a layer of elegance, whether as cabinet doors, tabletops, or shelving units, transforming ordinary pieces into extraordinary statements. In bathrooms, Frosted Glass provides privacy while still allowing natural light to filter through, creating a serene and soothing atmosphere. Railings adorned with Frosted Glass elevate safety and design, adding a touch of sophistication to staircases, balconies, or any architectural element.",
    "detailImages": [
      "/images/products/details/FURNITURE.png",
      "/images/products/details/BATHROOMS.png"
    ],
    "characteristics": [
      "Non-Fingerprint Translucent Acid-Etched Surface",
      "Uniform Soft Light Scattering & Diffusion",
      "Superior Durability Over Sandblasted Glass",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/Group-2258.png",
        "label": "Glass Thickness",
        "value": "4mm to 19mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2262.png",
        "label": "Tempering",
        "value": "Heat Strengthened (HS), Toughened"
      },
      {
        "icon": "/images/products/details/icons/Group-2261.png",
        "label": "Glass Type",
        "value": "Clear Glass, Extra Clear Glass, Tinted Glass, Reflective Glass"
      },
      {
        "icon": "/images/products/details/icons/Group-2263.png",
        "label": "Value Addition",
        "value": "IGU and Laminated Glass"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/FURNITURE.png",
        "title": "FURNITURE"
      },
      {
        "src": "/images/products/details/BATHROOMS.png",
        "title": "BATHROOMS"
      },
      {
        "src": "/images/products/details/RAILINGS.png",
        "title": "RAILINGS"
      },
      {
        "src": "/images/products/details/WALL-PARTITIONS-DOORS.png",
        "title": "WALL PARTITIONS, DOORS"
      }
    ],
    "galleryImages": [
      "/images/products/details/FURNITURE.png",
      "/images/products/details/BATHROOMS.png",
      "/images/products/details/RAILINGS.png",
      "/images/products/details/WALL-PARTITIONS-DOORS.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Whether incorporated into facades, partitions, or windows, Frosted Glass combines functionality and elegance, allowing natural light to enter while maintaining privacy. Architects and designers embrace Frosted Glass as a versatile solution that adds a touch of allure to their creations."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "mirror-glass",
      "ceramic-glass"
    ]
  },
  "mirror-glass": {
    "id": "mirror-glass",
    "indexNumber": "16",
    "title": "Mirror Glass",
    "subheading": "Maximized Room Dimensions & Living Light Reflections",
    "category": "Other Glass",
    "heroImage": "/images/products/mirror-glass.png",
    "introSummary": "Mirrored glass adds a living quality to your design. Whether you want a glamorous, full reflection effect, specific reflectivity with light-diffusing etched or patterned surfaces, or a custom luminous color, we can help. Pair graphics with a mirror to achieve depth, or add an etched layer for a soft, welcoming glow.",
    "secondaryText": "Discover the widest range of designs, shapes, and colors to maximise the room’s lighting, making the details look more prominent than ever",
    "detailImages": [
      "/images/products/details/INTERIOR-DECOR.png",
      "/images/products/details/architecture.png"
    ],
    "characteristics": [
      "Copper-Free & Lead-Free Environmental Backing",
      "Zero Optical Distortion Reflection",
      "High Moisture & Oxidation Resistance",
      "Certified to international standards EN, ASTM, and IS",
      "Custom fabricated to precise structural engineering specifications"
    ],
    "specs": [
      {
        "icon": "/images/products/details/icons/thickness.png",
        "label": "Thickness",
        "value": "4mm to 6mm"
      },
      {
        "icon": "/images/products/details/icons/Group-2264.png",
        "label": "Brands",
        "value": "Saint Gobain, Gujarat Guardian, Sisecam"
      }
    ],
    "galleryTitle": "Glass Applications",
    "galleryImageItems": [
      {
        "src": "/images/products/details/INTERIOR-DECOR.png",
        "title": "INTERIOR (DECOR)"
      }
    ],
    "galleryImages": [
      "/images/products/details/INTERIOR-DECOR.png",
      "/images/products/details/INTERIOR-DECOR.png",
      "/images/products/details/INTERIOR-DECOR.png",
      "/images/products/details/INTERIOR-DECOR.png"
    ],
    "industries": [
      {
        "title": "ARCHITECTURE",
        "image": "/images/products/details/architecture.png",
        "description": "Mirror Glass is a preferred choice for architects and designers, enhancing the aesthetics of structures with its luxurious and refined reflections. From grand entrances to stylish interior designs, these mirrors leave a lasting impression and elevate the visual impact of architectural spaces."
      }
    ],
    "sliderImages": [
      "/images/products/details/balmoral-by-riverside.jpg",
      "/images/products/details/the-ark-tribeca.jpg",
      "/images/products/details/varde-abil.jpg",
      "/images/products/details/ganga-platino.jpg"
    ],
    "relatedProductIds": [
      "extra-clear-glass",
      "frosted-glass"
    ]
  }
}
