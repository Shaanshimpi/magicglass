import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import contactUsMock from '../data/contact_us_mock.json'
import industrySolutionsMock from '../data/industry_solutions_mock.json'
import infrastructureMock from '../data/infrastructure_mock.json'
import projectsMock from '../data/projects_mock.json'
import { PDP_MOCK_DATA } from '../components/PDP/pdpData'
import { CATEGORIES_INFO } from '../components/ProductsCollection/products.data'

async function seed() {
  console.log('🚀 Starting Comprehensive Payload CMS Database Seeding...')
  const payload = await getPayload({ config: configPromise })

  // ---------------------------------------------------------------------------
  // 1. Seed Header Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Header Global (with Loader Configuration)...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: [
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Toughened Glass', href: '/toughened-glass' },
        { label: 'Industry Solution', href: '/industry-solution' },
        { label: 'Infrastructure', href: '/infrastructure' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
      ctaButtons: [
        { label: 'GET A QUOTE', href: '#quote', variant: 'primary' },
      ],
      loaderBrandTag: '◆ MAGIC GLASS',
      loaderBrandTitle: 'ARCHITECTURAL GLAZING',
      loaderStatusText: 'INITIALIZING EXPERIENCE',
      loaderEstYear: 'EST. 2006',
    },
  })

  // ---------------------------------------------------------------------------
  // 2. Seed Footer Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Footer Global...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      companyName: 'MAGIC GLASS PRIVATE LIMITED',
      corporateOffice: {
        heading: 'CORPORATE OFFICE',
        address: 'Boulevard Towers Phase-2, 9th Floor, A1-901 & A1-902, Sadhu Vaswani Chowk, Camp, Pune, Maharashtra – 411001',
        phone: '+91-7774017900',
        email: 'info@magicglass.co.in',
        web: 'www.magicglass.co.in',
      },
      factoryOffice: {
        heading: 'FACTORY OFFICE',
        address: 'Gurukripa Ind. Estate, National Highway No. 9, Survey No.: 813/8 & 813/9, At-Post Yavat, Tal: Daund, Dist: Pune Pin Code – 412214',
      },
      mainNavLinks: [
        { label: 'About Us', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Industry Solution', href: '/industry-solution' },
        { label: 'Infrastructure', href: '/infrastructure' },
        { label: 'Projects Portfolio', href: '/projects' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
      glassSolutionsLinks: [
        { label: 'Toughened Glass', href: '/toughened-glass' },
        { label: 'Double Glazed Unit (DGU)', href: '/products/insulated-glass-dgu' },
        { label: 'Sentry Laminated Glass', href: '/products/sentry-laminated-glass' },
        { label: 'Acoustic Laminated Glass', href: '/products/acoustic-lami-glass' },
        { label: 'Low-E Glass Processing', href: '/products/high-performance-low-e-glass' },
        { label: 'SKN-Ultra High-Performance Glass', href: '/products/skn-ultra-high-performance-glass' },
        { label: 'Ceramic Glass', href: '/products/ceramic-glass' },
        { label: 'Fire & Safety Glass', href: '/products/fire-safety-glass' },
      ],
      directConnectLinks: [
        { label: 'WhatsApp Sales Chat →', href: 'https://wa.me/917774017900', type: 'whatsapp' },
        { label: 'Call: +91-7774017900', href: 'tel:+917774017900', type: 'phone' },
        { label: 'sales@magicglass.co.in', href: 'mailto:sales@magicglass.co.in', type: 'email' },
      ],
      copyrightText: `© ${new Date().getFullYear()} Magic Glass Private Limited. All rights reserved.`,
      cityTagline: 'Pune, Maharashtra, India • Premier Architectural Glass Processing',
      wordmarkText: 'MAGIC GLASS',
    },
  })

  // ---------------------------------------------------------------------------
  // 3. Seed Quote Drawer Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Quote Drawer Global...')
  await payload.updateGlobal({
    slug: 'quote-drawer',
    data: {
      projectCategories: [
        { label: 'Commercial Facade' },
        { label: 'Residential Interior' },
        { label: 'Skylight / Roof' },
        { label: 'Infrastructure' },
      ],
      glassTypes: [
        { label: 'DGU Insulated' },
        { label: 'Low-E SKN Ultra' },
        { label: 'Sentry Laminated' },
        { label: 'Acoustic PVB' },
        { label: 'Toughened HS' },
        { label: 'Ceramic Fritted' },
        { label: 'Mirror' },
      ],
      cadDropzoneText: 'Drop DWG, DXF, PDF drawings or BOQ spreadsheet here',
      submissionNotice: 'Our Pune technical sales engineering team will review your specifications and respond within 24 business hours.',
    },
  })

  // ---------------------------------------------------------------------------
  // 4. Seed Home Page Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Home Page Global (with Complete Statements & Stats)...')
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        tagline: 'PRECISION GLASS MANUFACTURING • YAVAT, PUNE, MAHARASHTRA',
        heading: 'Crafting Exceptional Glass Solutions for a Brighter World.',
        primaryCtaLabel: 'REQUEST TECHNICAL QUOTE',
        primaryCtaHref: '#quote',
        secondaryCtaLabel: 'DISCOVER FACTORY',
        secondaryCtaHref: '#heritage',
        scrollText: 'SCROLL',
        bgImageUrl: '/images/hero-bg.jpg',
      },
      heritage: {
        eyebrow: '◆ ABOUT MAGIC GLASS',
        headline: 'Welcome to the world of Magic Glass.',
        statementText: 'Welcome to the world of Magic Glass. Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers. As a family-run enterprise, we are driven by a passion for perfection that has been passed down through generations.',
        ctaLabel: '↳ WHO WE ARE',
        ctaHref: '/about',
        bgImageUrl: '/images/hero-bg.jpg',
        stats: [
          { value: '600+', label: 'Projects Finished' },
          { value: '17+', label: 'Years of Experience' },
          { value: '80,000', label: 'Sq ft Factory Area' },
          { value: '500+', label: 'Customers' },
        ],
      },
      glassApplications: {
        eyebrow: '◆ GLASS APPLICATIONS',
        heading: 'GET EVERY GLASS APPLICATION UNDER ONE ROOF',
        topDescription: 'Our glazing collection is defined by exceptional craftsmanship, refined design, and enduring quality. Get every glass application under one roof for bold architecture and uncompromising vision.',
        ctaLabel: '↳ PRODUCT OVERVIEW',
        ctaHref: '/products',
        cards: [
          {
            title: 'RAILINGS, STAIRCASES AND DOORS',
            subtitle: 'Balustrades & Frameless Doors',
            hoverCategory: 'Frameless Glass Entrances & Structural Balustrades',
            specs: 'Toughened Laminated Glass Panels, Patch-Fitting Door Glass, Glass Balustrades & Custom Staircase Assemblies.',
            hoverLink: '/products/toughened-glass',
            imageUrl: '/images/apps/railings.png',
          },
          {
            title: 'WINDOWS',
            subtitle: 'Insulated & Solar Control',
            hoverCategory: 'High Performance DGU & Low-E Solar Control',
            specs: 'Insulated Double Glazed Units (DGU) & High-Performance Low-E Solar Control Glass Panels.',
            hoverLink: '/products/insulated-glass-dgu',
            imageUrl: '/images/apps/windows.png',
          },
          {
            title: 'ROOF',
            subtitle: 'Overhead Skylights',
            hoverCategory: 'Structural Overhead Skylight Glass',
            specs: 'Heat Soaked SentryGlas® & PVB Structural Laminated Glass engineered for overhead safety.',
            hoverLink: '/products/sentry-laminated-glass',
            imageUrl: '/images/apps/roof.png',
          },
          {
            title: 'OVERHEAD SPACES',
            subtitle: 'Spider Glass Canopies',
            hoverCategory: 'Spider-Supported Overhead Glass',
            specs: 'Point-Supported Spider Glass Canopies, Atrium Glazing Panels & Heavy Wind Load Safety Systems.',
            hoverLink: '/products/sentry-laminated-glass',
            imageUrl: '/images/apps/overhead-spaces.png',
          },
          {
            title: 'GLASS LIFTS',
            subtitle: 'Panoramic Enclosures',
            hoverCategory: 'Curved & Toughened Shaft Enclosures',
            specs: 'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Enclosures.',
            hoverLink: '/products/toughened-glass',
            imageUrl: '/images/apps/glass-lifts.png',
          },
          {
            title: 'PARTITIONS',
            subtitle: 'Acoustic Office Interiors',
            hoverCategory: 'Corporate & Hospitality Partitions',
            specs: 'Acoustic 42dB Soundproof Laminated Glass, Acid-Frosted Privacy & Smart Switchable Glass Panels.',
            hoverLink: '/products/acoustic-lami-glass',
            imageUrl: '/images/apps/partition.png',
          },
        ],
      },
      craftsmanship: {
        eyebrow: 'MISSION & CRAFTSMANSHIP',
        heading: 'Delivering precision-engineered glass solutions for commercial facades and luxury interiors, crafted with uncompromising quality control from raw cut to final lamination.',
        cards: [
          {
            title: 'Precision Lamination Polish',
            description: 'Advanced cleanroom autoclave lamination with PVB, SentryGlas®, and EVA interlayers ensuring optical clarity and safety.',
            imageUrl: '/images/craft-laminated.jpg',
          },
          {
            title: 'Robotic DGU Spacer Assembly',
            description: 'Automatic robotic spacer application, 99.9% argon gas filling, and dual structural silicone sealing for thermal efficiency.',
            imageUrl: '/images/craft-dgu.jpg',
          },
          {
            title: 'Custom Ceramic Frit Patterns',
            description: 'High-temperature ceramic enamel screen-printed privacy dot matrix fused permanently into tempered glass.',
            imageUrl: '/images/craft-ceramic.jpg',
          },
        ],
      },
      trustBanner: {
        eyebrow: '◆ WE\'RE TRUSTED BY LEADING PARTNERS',
        heading: 'Partnered with Leading Developers & Architects',
        partners: [
          { name: 'Tribeca Developers', logoUrl: '/images/partners/tribeca.png' },
          { name: 'Solitaire', logoUrl: '/images/partners/solitaire.png' },
          { name: 'Nyati Group', logoUrl: '/images/partners/nyati.png' },
          { name: 'ABIL Group', logoUrl: '/images/partners/abil.png' },
          { name: 'Amar Builders', logoUrl: '/images/partners/amar.png' },
          { name: 'ASCII', logoUrl: '/images/partners/ascii.png' },
          { name: 'Gujarat Guardian', logoUrl: '/images/partners/guardian.png' },
          { name: 'Mantra Properties', logoUrl: '/images/partners/mantra.png' },
          { name: 'Ark', logoUrl: '/images/partners/ark.png' },
          { name: 'Legrand by Nouveaute', logoUrl: '/images/partners/legrand.png' },
          { name: 'Kesseböhmer', logoUrl: '/images/partners/kessebohmer.png' },
          { name: 'VTP Realty', logoUrl: '/images/partners/vtp.png' },
          { name: 'Gera Developments', logoUrl: '/images/partners/gera.png' },
          { name: 'G Interio', logoUrl: '/images/partners/g-interio.png' },
          { name: 'Godrej Properties', logoUrl: '/images/partners/godrej.png' },
          { name: 'Kasturi Housing', logoUrl: '/images/partners/kasturi.png' },
          { name: 'Sleek by Asian Paints', logoUrl: '/images/partners/sleek.png' },
          { name: 'Saint-Gobain', logoUrl: '/images/partners/saint-gobain.png' },
        ],
      },
      testimonials: [
        {
          id: '1',
          quote: "I've used Magic Glass' HS Laminated Glass for my shop fronts for years. Through heat waves and monsoons, it never fails to impress with its strength and clarity.",
          author: 'Suraj Divate',
          title: 'Commercial Developer',
          avatarUrl: '/images/hero-bg.jpg',
        },
        {
          id: '2',
          quote: 'I used Mirrored Glass to renovate my car automotive dealership and it transformed the space. Customers are wowed by the depth and glow. 5 years later it still looks new.',
          author: 'Shikha Kumari',
          title: 'Automotive Showroom Architect',
          avatarUrl: '/images/craft-dgu.jpg',
        },
        {
          id: '3',
          quote: "As a high-end retailer in a busy area, security is crucial. Sentry Laminated Glass gives me complete peace of mind - it's stopped multiple attempted break-ins without as much as a scratch.",
          author: 'Rajesh Kumar',
          title: 'Retail Store Owner',
          avatarUrl: '/images/factory-cnc.jpg',
        },
      ],
      categorySwitcher: [
        {
          id: 'structural',
          title: 'Structural & Exterior Glazing Systems',
          badge: '01',
          subtitle: 'Structural & Exterior Glazing',
          specs: [
            { text: 'SentryGlas® Laminated Extra Clear Structural Glass Fins' },
            { text: 'Double Glazed DGU 28mm Insulated Facade Panels' },
            { text: 'Low-E & SKN Ultra Solar Control High-Performance Glass' },
            { text: 'Spider Fitting Glass Curtains & Canopy Systems' },
          ],
          imageUrl: '/images/prod-structural.jpg',
        },
        {
          id: 'interior',
          title: 'Interior Partitions & Decorative Systems',
          badge: '02',
          subtitle: 'Interior & Partitions',
          specs: [
            { text: 'Acoustic PVB 42dB Soundproof Conference Partitions' },
            { text: 'Ceramic Fritted Screen-Printed Privacy Dot Matrix Glass' },
            { text: 'Acid-Etched Frosted Satin Non-Fingerprint Glass' },
            { text: 'High-Clarity Silver & Tinted Architectural Mirrors' },
          ],
          imageUrl: '/images/prod-partitions.jpg',
        },
        {
          id: 'safety',
          title: 'Safety, Toughened & Curved Glass Processing',
          badge: '03',
          subtitle: 'Safety & Processing',
          specs: [
            { text: 'Heat Soaked Toughened Glass (HS) for Spontaneous Breakage Prevention' },
            { text: '3D Curved Architectural Glass Facades & Staircases' },
            { text: 'Fire-Rated EW60 / EI90 Clear Safety Barriers' },
            { text: 'Bullet-Resistant & High-Impact Laminated Security Panels' },
          ],
          imageUrl: '/images/prod-additional.jpg',
        },
      ],
    },
  })

  // ---------------------------------------------------------------------------
  // 5. Seed About Page Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding About Page Global (with Full Unabridged Leadership Bios)...')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      hero: {
        eyebrow: 'ABOUT MAGIC GLASS',
        title: 'About Magic Glass',
        tagline: 'With "Build to Last" as our guiding philosophy, Magic Glass stands as a symbol of enduring strength and innovation in the glass processing industry.',
        facilityImageUrl: '/images/hero-bg.jpg',
      },
      legacy: {
        eyebrow: 'OUR LEGACY',
        title: 'OUR LEGACY',
        headline: 'Welcome to the world of Magic Glass, where excellence is not just a commitment; it’s a legacy.',
        bodyText: 'Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers. As a family-run enterprise, we are driven by a passion for perfection that has been passed down through generations.',
        buttonLabel: 'OUR SOLUTIONS ↗',
        buttonHref: '/industry-solution',
      },
      visionMission: {
        visionTitle: 'Setting the Gold Standard',
        visionDesc: 'Our vision is to lead the global glass processing industry, setting the gold standard for quality, craftsmanship, and sustainability.',
        missionTitle: 'Uncompromising Quality',
        missionDesc: 'To solidify our position as global leaders in the glass processing industry by consistently delivering exceptional quality, leveraging cutting-edge technology, and nurturing a culture of innovation.',
      },
      whyMagicGlass: [
        {
          number: '01',
          title: 'Certified Excellence',
          description: 'Adhering to rigorous international standards (IS 2553, IS 14900, ISO 9001) for uncompromising architectural glass quality and safety.',
        },
        {
          number: '02',
          title: 'Quality Driven Innovation',
          description: 'Continuously adopting state-of-the-art European processing machinery, CNC edging, and advanced glass tempering technology.',
        },
        {
          number: '03',
          title: 'State-of-the-Art Facility',
          description: 'Spanning 150,000+ sq. ft. equipped with automated double-chamber furnaces and cleanroom lamination setups.',
        },
        {
          number: '04',
          title: 'Customer Focus',
          description: 'Dedicated technical consultation, custom BOQ engineering, and reliable nationwide project delivery for architects and builders.',
        },
      ],
      leadership: [
        {
          name: 'Manik Kodre',
          role: 'Managing Director & Founder',
          portraitUrl: 'https://magicglass.co.in/wp-content/uploads/2025/04/Manik-Kodre.png',
          bio: 'Meet Manik Kodre, the visionary Managing Director and founder of Magic Glass. With roots in farming, he recognized the limitless potential of toughened glass in the modern world, founding our company in 2006. Under his leadership, Magic Glass has grown into a dominant force in Pune’s retail market and expanded swiftly, meeting surging demand in 2014. Manik’s strategic acumen and unwavering belief in the potential of toughened glass have propelled us to unprecedented heights, forging partnerships with major corporations across India and shaping our journey of excellence.',
        },
        {
          name: 'Anup Kodre',
          role: 'Director (Marketing & Finance)',
          portraitUrl: 'https://magicglass.co.in/wp-content/uploads/2025/04/Anup-Kodre.png',
          bio: 'Anup’s innate talent for marketing and finance, paired with his strong presence, eloquent communication, and visionary leadership, has been instrumental in Magic Glass’ rise in the Indian glass industry. Anup’s strategic acumen has strengthened our relationships with key stakeholders, expanding Magic Glass’s influence beyond Pune and Maharashtra to neighboring states. His expertise in marketing, finance, strategy, and business development continues to drive our success story. He holds an MBA (Finance) from the Sydney Institute of Technology.',
        },
        {
          name: 'Nitish Kodre',
          role: 'Director (Operations & R&D)',
          portraitUrl: 'https://magicglass.co.in/wp-content/uploads/2025/04/Nitish-Kodre.png',
          bio: 'Nitish, a holder of a master’s degree in architecture from Kingston University London, embraced his role in the family enterprise right after completing his education. Taking the reins of production and operations, Nitish envisioned a pursuit of perfection, efficiency, and world-class glass quality. His dedication led him to extensively study machinery, glass processes, and production lines. Collaborating with diverse companies, he set new benchmarks for quality standards and operational efficiency. His meticulous planning and analysis of production lines have culminated in the establishment of a seamless, end-to-end production journey.',
        },
      ],
      cta: {
        eyebrow: 'WHERE VISION MEETS EXECUTION',
        headline: 'Every great build begins with understanding',
        subtitle: 'Speak with our technical engineering team to consult on custom BOQ specifications or glass requirements.',
        buttonLabel: 'GET IN TOUCH ↗',
        buttonHref: '/contact-us',
      },
    },
  })

  // ---------------------------------------------------------------------------
  // 6. Seed Products Page Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Products Page Global...')
  await payload.updateGlobal({
    slug: 'products-page',
    data: {
      hero: {
        tag: 'COLLECTION / ARCHITECTURAL GLASS SYSTEMS',
        title: 'Architectural Glass & Precision Processing',
        subtitle:
          'Engineered for high-rise curtain walls, acoustic speech isolation, fire containment barriers, and ionoplast structural fins. Sourced and processed with world-class European technology.',
      },
      topFeaturedEyebrow: 'TOP 3 FEATURED SYSTEMS',
      topFeaturedTag: 'FLAGSHIP FAÇADES',
      featuredSystems: [
        {
          productSlug: 'sentry-laminated-glass',
          title: 'Sentry Laminated Glass',
          categoryLabel: 'Structural & Exterior Glazing',
          badgeText: 'STRUCTURAL FIN / CANOPY',
          description:
            'Ultra-rigid Ionoplast interlayer delivering 5x tear strength and 100x stiffness for structural fins and high-impact facades.',
          featuredImageUrl: '/images/craft-laminated.jpg',
          link: '/products/sentry-laminated-glass',
        },
        {
          productSlug: 'skn-ultra-high-performance-glass',
          title: 'SKN-Ultra High-Performance Glass',
          categoryLabel: 'Structural & Exterior Glazing',
          badgeText: 'SOLAR CONTROL LOW-E',
          description:
            'Advanced solar control coatings offering ultra-low SHGC (< 0.23) with maximum neutral daylight transmission.',
          featuredImageUrl: '/images/prod-structural.jpg',
          link: '/products/skn-ultra-high-performance-glass',
        },
        {
          productSlug: 'insulated-glass-dgu',
          title: 'DGU (Insulated Glass)',
          categoryLabel: 'Structural & Exterior Glazing',
          badgeText: 'THERMAL & ACOUSTIC',
          description:
            'Dual-sealed argon filled double glazing units delivering superior thermal insulation (U-value < 1.1 W/m²K).',
          featuredImageUrl: '/images/craft-dgu.jpg',
          link: '/products/insulated-glass-dgu',
        },
      ],
      collectionEyebrow: 'MAGIC GLASS COLLECTION',
      collectionHeadline:
        'We offer a wide spectrum of bespoke architectural glass solutions where timeless design meets technical precision.',
      categoriesNav: CATEGORIES_INFO.map((c) => ({
        id: c.id,
        code: c.code,
        label: c.label,
        title: c.title,
        description: c.description,
      })),
    },
  })

  // ---------------------------------------------------------------------------
  // 7. Seed Industry Solution Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Industry Solution Page Global...')
  await payload.updateGlobal({
    slug: 'industry-solution-page',
    data: {
      hero: {
        indexNumber: industrySolutionsMock.page.indexNumber,
        title: industrySolutionsMock.page.title,
        category: industrySolutionsMock.page.category,
        subheading: industrySolutionsMock.page.subheading,
        heroImageUrl: industrySolutionsMock.page.heroImage,
      },
      industries: industrySolutionsMock.industries.map((ind: any) => ({
        id: ind.id,
        title: ind.title,
        subtitle: ind.subtitle,
        imageUrl: ind.image,
        specs: ind.specs,
        description: ind.description,
      })),
    },
  })

  // ---------------------------------------------------------------------------
  // 8. Seed Infrastructure Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Infrastructure Page Global...')
  await payload.updateGlobal({
    slug: 'infrastructure-page',
    data: {
      hero: {
        indexNumber: infrastructureMock.page.indexNumber,
        title: infrastructureMock.page.title,
        category: infrastructureMock.page.category,
        subheading: infrastructureMock.page.subheading,
        heroImageUrl: infrastructureMock.page.heroImage,
      },
      industries: infrastructureMock.industries.map((fac: any) => ({
        id: fac.id,
        title: fac.title,
        subtitle: fac.subtitle,
        imageUrl: fac.image,
        specs: fac.specs,
        description: fac.description,
      })),
    },
  })

  // ---------------------------------------------------------------------------
  // 9. Seed Contact Us Global
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Contact Us Page Global...')
  await payload.updateGlobal({
    slug: 'contact-us-page',
    data: {
      hero: {
        indexNumber: contactUsMock.page.indexNumber,
        title: contactUsMock.page.title,
        redTitle: contactUsMock.page.redTitle,
        category: contactUsMock.page.category,
        subheading: contactUsMock.page.subheading,
        heroImageUrl: contactUsMock.page.heroImage,
      },
      contactCards: contactUsMock.contactCards.map((card: any) => ({
        id: card.id,
        title: card.title,
        detail: card.detail,
        icon: card.icon,
        actionText: card.actionText,
        actionUrl: card.actionUrl,
      })),
      mapEmbedUrl: contactUsMock.mapEmbedUrl,
    },
  })

  // ---------------------------------------------------------------------------
  // 10. Seed Products Collection (11+ Complete Architectural Glass PDPs)
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Products Collection (11+ Architectural Glass Records)...')
  for (const [slug, prod] of Object.entries(PDP_MOCK_DATA)) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const prodData = {
      slug: slug,
      indexNumber: prod.indexNumber || '01',
      title: prod.title,
      subheading: prod.subheading || '',
      category: prod.category || 'structural',
      heroImageUrl: prod.heroImage || '/images/hero-bg.jpg',
      introSummary: prod.introSummary || '',
      secondaryText: prod.secondaryText || '',
      detailImages: [
        { imageUrl: prod.detailImages?.[0] || '/images/hero-bg.jpg' },
        { imageUrl: prod.detailImages?.[1] || '/images/craft-dgu.jpg' },
      ],
      characteristics: (prod.characteristics || []).map((char: string) => ({ item: char })),
      specs: (prod.specs || []).map((s: any) => ({
        icon: s.icon || '',
        label: s.label || '',
        value: s.value || '',
      })),
      galleryTitle: prod.galleryTitle || 'Glass Applications',
      galleryImages: (prod.galleryImageItems || []).map((g: any) => ({
        src: g.src,
        title: g.title,
      })),
      industries: (prod.industries || []).map((ind: any) => ({
        title: ind.title,
        description: ind.description,
        imageUrl: ind.image || '/images/apps/windows.png',
      })),
      sliderImages: (prod.sliderImages || []).map((imgSrc: string) => ({
        src: imgSrc,
      })),
      relatedProductSlugs: (prod.relatedProductIds || []).map((relSlug: string) => ({
        slug: relSlug,
      })),
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: prodData,
      })
      console.log(`   ✓ Updated Product: ${prod.title} (${slug})`)
    } else {
      await payload.create({
        collection: 'products',
        data: prodData,
      })
      console.log(`   + Created Product: ${prod.title} (${slug})`)
    }
  }

  // ---------------------------------------------------------------------------
  // 11. Seed Projects Collection (15+ Portfolio Projects)
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Projects Collection (15+ Portfolio Records)...')
  for (const proj of projectsMock) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: proj.id } },
      limit: 1,
    })

    const projData = {
      slug: proj.id,
      title: proj.title,
      category: proj.category,
      developer: proj.developer || '',
      location: proj.location || '',
      application: proj.application || '',
      glassDescription: proj.glassDescription || '',
      areaSqMtr: proj.areaSqMtr || 0,
      imageUrl: proj.image || '/images/projects/balmoral-by-riverside.jpg',
      heroFeatured: Boolean(proj.heroFeatured),
      tagline: proj.tagline || '',
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        data: projData,
      })
      console.log(`   ✓ Updated Project: ${proj.title}`)
    } else {
      await payload.create({
        collection: 'projects',
        data: projData,
      })
      console.log(`   + Created Project: ${proj.title}`)
    }
  }

  // ---------------------------------------------------------------------------
  // 12. Seed Staff & Management Users (Admin & Manager Roles)
  // ---------------------------------------------------------------------------
  console.log('📦 Seeding Staff & Management Users (Admin & Manager)...')
  const defaultUsers = [
    {
      email: 'admin@magicglass.co.in',
      password: 'Admin@123',
      name: 'System Administrator',
      role: 'admin' as const,
    },
    {
      email: 'manager@magicglass.co.in',
      password: 'Manager@123',
      name: 'Production Manager',
      role: 'manager' as const,
    },
  ]

  for (const userItem of defaultUsers) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: userItem.email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: {
          name: userItem.name,
          role: userItem.role,
        },
      })
      console.log(`   ✓ Updated User: ${userItem.email} (${userItem.role})`)
    } else {
      await payload.create({
        collection: 'users',
        data: userItem,
      })
      console.log(`   + Created User: ${userItem.email} (${userItem.role})`)
    }
  }

  console.log('✅ ALL Payload CMS Globals & Collections Successfully Seeded in PostgreSQL!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding Failed:', err)
    process.exit(1)
  })
