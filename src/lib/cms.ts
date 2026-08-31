import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import contactUsMock from '@/data/contact_us_mock.json'
import industrySolutionsMock from '@/data/industry_solutions_mock.json'
import infrastructureMock from '@/data/infrastructure_mock.json'
import projectsMock from '@/data/projects_mock.json'
import { PDP_MOCK_DATA, PdpProductDetail } from '@/components/PDP/pdpData'
import { CATEGORIES_INFO, ALL_PRODUCTS, TOP_3_FEATURED } from '@/components/ProductsCollection/products.data'

// Helper to safely get payload client
export async function getPayloadClient() {
  try {
    return await getPayload({ config: configPromise })
  } catch (err) {
    console.warn('Failed to initialize Payload CMS client:', err)
    return null
  }
}

// Extract string URL from Payload media upload or fallback string
export function getMediaUrl(mediaField: any, fallbackUrl?: string): string {
  if (typeof mediaField === 'string' && mediaField.length > 0) {
    return mediaField
  }
  if (mediaField && typeof mediaField === 'object' && mediaField.url) {
    return mediaField.url
  }
  return fallbackUrl || ''
}

// Map alias route slugs to canonical PDP dataset keys
export function resolveCanonicalSlug(slug: string): string {
  const ALIAS_MAP: Record<string, string> = {
    'acoustic-lami-glass': 'acoustic-laminated-glass',
    'high-performance-low-e-glass': 'low-e-glass-processing',
    'ceramic-glass': 'ceramic-fritted-glass',
    'skn-ultra-high-performance-glass': 'insulated-glass-dgu',
    'fire-safety-glass': 'toughened-glass',
  }
  return ALIAS_MAP[slug] || slug
}

// ----------------------------------------------------
// Header Global
// ----------------------------------------------------
export async function getHeaderCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'header' })
      if (data && data.navLinks && data.navLinks.length > 0) {
        return {
          logo: getMediaUrl(data.logo, '/images/logo.png'),
          navLinks: data.navLinks.map((item: any) => ({
            label: item.label,
            href: item.href,
          })),
          ctaButtons: data.ctaButtons?.map((item: any) => ({
            label: item.label,
            href: item.href,
            variant: item.variant,
          })) || [
            { label: 'GET A QUOTE', href: '#quote', variant: 'primary' },
          ],
          loaderBrandTag: data.loaderBrandTag || '◆ MAGIC GLASS',
          loaderBrandTitle: data.loaderBrandTitle || 'ARCHITECTURAL GLAZING',
          loaderStatusText: data.loaderStatusText || 'INITIALIZING EXPERIENCE',
          loaderEstYear: data.loaderEstYear || 'EST. 2006',
        }
      }
    }
  } catch (err) {
    console.warn('Header global fetch failed, using fallback:', err)
  }

  return {
    logo: '/images/logo.png',
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
  }
}

// ----------------------------------------------------
// Footer Global
// ----------------------------------------------------
export async function getFooterCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = (await payload.findGlobal({ slug: 'footer' })) as any
      if (data && data.corporateOffice?.heading) {
        return {
          companyName: data.companyName || 'MAGIC GLASS PRIVATE LIMITED',
          corporateOffice: data.corporateOffice,
          factoryOffice: data.factoryOffice,
          mainNavLinks: data.mainNavLinks || [],
          glassSolutionsLinks: data.glassSolutionsLinks || [],
          directConnectLinks: data.directConnectLinks || [],
          copyrightText: data.copyrightText || `© ${new Date().getFullYear()} Magic Glass Private Limited. All rights reserved.`,
          cityTagline: data.cityTagline || 'Pune, Maharashtra, India • Premier Architectural Glass Processing',
          wordmarkText: data.wordmarkText || 'MAGIC GLASS',
        }
      }
    }
  } catch (err) {
    console.warn('Footer global fetch failed, using fallback:', err)
  }

  return {
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
  }
}

// ----------------------------------------------------
// Quote Drawer Global
// ----------------------------------------------------
export async function getQuoteDrawerCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'quote-drawer' })
      if (data && data.projectCategories && data.projectCategories.length > 0) {
        return {
          projectCategories: data.projectCategories.map((c: any) => c.label || c),
          glassTypes: data.glassTypes?.map((g: any) => g.label || g) || [],
          cadDropzoneText: data.cadDropzoneText,
          submissionNotice: data.submissionNotice,
        }
      }
    }
  } catch (err) {
    console.warn('Quote Drawer global fetch failed, using fallback:', err)
  }

  return {
    projectCategories: ['Commercial Facade', 'Residential Interior', 'Skylight / Roof', 'Infrastructure'],
    glassTypes: [
      'DGU Insulated',
      'Low-E SKN Ultra',
      'Sentry Laminated',
      'Acoustic PVB',
      'Toughened HS',
      'Ceramic Fritted',
      'Mirror',
    ],
    cadDropzoneText: 'Drag & Drop CAD Drawings / Specifications (DWG, PDF, STEP)',
    submissionNotice: 'Our technical estimation team responds within 2 business hours.',
  }
}

// -------------------------------------------------------
// Home Page Global
// -------------------------------------------------------
export async function getHomePageCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'home-page' })
      if (data && data.hero?.heading) {
        return {
          hero: {
            ...data.hero,
            bgImage: getMediaUrl(data.hero.bgImage, data.hero.bgImageUrl || '/images/hero-bg.jpg'),
          },
          heritage: data.heritage,
          glassApplications: {
            ...data.glassApplications,
            cards: data.glassApplications?.cards?.map((c: any) => ({
              ...c,
              image: getMediaUrl(c.image, c.imageUrl),
            })),
          },
          craftsmanship: {
            ...data.craftsmanship,
            cards: data.craftsmanship?.cards?.map((c: any) => ({
              ...c,
              image: getMediaUrl(c.image, c.imageUrl),
            })),
          },
          trustBanner: {
            ...data.trustBanner,
            partners: data.trustBanner?.partners?.map((p: any) => ({
              ...p,
              logo: getMediaUrl(p.logo, p.logoUrl),
            })),
          },
          testimonials: data.testimonials?.map((t: any) => ({
            ...t,
            avatar: getMediaUrl(t.avatar, t.avatarUrl),
          })),
          categorySwitcher: data.categorySwitcher?.map((cs: any) => ({
            ...cs,
            specs: cs.specs?.map((s: any) => s.text || s),
            image: getMediaUrl(cs.image, cs.imageUrl),
          })),
        }
      }
    }
  } catch (err) {
    console.warn('Home page global fetch failed, using fallback:', err)
  }

  // Full fallback
  return {
    hero: {
      tagline: 'PRECISION GLASS MANUFACTURING • YAVAT, PUNE, MAHARASHTRA',
      heading: 'Crafting Exceptional Glass Solutions for a Brighter World.',
      primaryCtaLabel: 'REQUEST TECHNICAL QUOTE',
      primaryCtaHref: '#quote',
      secondaryCtaLabel: 'DISCOVER FACTORY',
      secondaryCtaHref: '#heritage',
      scrollText: 'SCROLL',
      bgImage: '/images/hero-bg.jpg',
    },
    heritage: {
      eyebrow: '◆ ABOUT MAGIC GLASS',
      statementText:
        'Welcome to the world of Magic Glass. Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers.',
      ctaLabel: '↳ WHO WE ARE',
      ctaHref: '/about',
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
      topDescription:
        'Our glazing collection is defined by exceptional craftsmanship, refined design, and enduring quality.',
      ctaLabel: '↳ PRODUCT OVERVIEW',
      ctaHref: '/products',
      cards: [
        { title: 'RAILINGS, STAIRCASES AND DOORS', subtitle: 'Frameless Glass Entrances & Structural Balustrades', specs: 'Toughened Laminated Glass Panels, Patch-Fitting Door Glass, Glass Balustrades & Custom Staircase Assemblies.', image: '/images/apps/railings.png', hoverLink: '/products/toughened-glass' },
        { title: 'WINDOWS', subtitle: 'High Performance DGU & Low-E Solar Control', specs: 'Insulated Double Glazed Units (DGU) & High-Performance Low-E Solar Control Glass Panels.', image: '/images/apps/windows.png', hoverLink: '/products/insulated-glass-dgu' },
        { title: 'ROOF', subtitle: 'Structural Overhead Skylight Glass', specs: 'Heat Soaked SentryGlas® & PVB Structural Laminated Glass engineered for overhead safety.', image: '/images/apps/roof.png', hoverLink: '/products/sentry-laminated-glass' },
        { title: 'OVERHEAD SPACES', subtitle: 'Spider-Supported Overhead Glass', specs: 'Point-Supported Spider Glass Canopies, Atrium Glazing Panels & Heavy Wind Load Safety Systems.', image: '/images/apps/overhead-spaces.png', hoverLink: '/products/sentry-laminated-glass' },
        { title: 'GLASS LIFTS', subtitle: 'Curved & Toughened Shaft Enclosures', specs: 'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Enclosures.', image: '/images/apps/glass-lifts.png', hoverLink: '/products/toughened-glass' },
        { title: 'PARTITIONS', subtitle: 'Soundproof & Privacy Interior Walls', specs: 'Acoustic 42dB Soundproof Laminated Glass, Acid-Frosted Privacy & Smart Switchable Glass Panels.', image: '/images/apps/partition.png', hoverLink: '/products/acoustic-lami-glass' },
      ],
    },
    craftsmanship: {
      eyebrow: 'MISSION & CRAFTSMANSHIP',
      heading: '"Delivering precision-engineered glass solutions for commercial facades and luxury interiors, crafted with uncompromising quality control from raw cut to final lamination."',
      cards: [
        { title: 'Precision Lamination Polish', description: 'Extra clear multi-layer PVB & SentryGlas® edge grinding and polish inspection ensuring zero optical distortion.', image: '/images/craft-laminated.jpg' },
        { title: 'Robotic DGU Spacer Assembly', description: 'Double glazed unit secondary structural silicone sealant application with argon gas fill for thermal insulation.', image: '/images/craft-dgu.jpg' },
        { title: 'Custom Ceramic Frit Patterns', description: 'High-temperature ceramic enamel screen-printed privacy dot matrix fused permanently into tempered glass.', image: '/images/craft-ceramic.jpg' },
      ],
    },
    trustBanner: {
      eyebrow: "◆ WE'RE TRUSTED BY LEADING PARTNERS",
      partners: [
        { name: 'Tribeca Developers' }, { name: 'Solitaire' }, { name: 'Nyati Group' },
        { name: 'ABIL Group' }, { name: 'Amar Builders' }, { name: 'ASCII' },
        { name: 'Gujarat Guardian' }, { name: 'Mantra Properties' }, { name: 'Ark' },
        { name: 'Legrand by Nouveaute' }, { name: 'Kesseböhmer' }, { name: 'VTP Realty' },
        { name: 'Gera Developments' }, { name: 'G Interio' }, { name: 'Godrej Properties' },
        { name: 'Kasturi Housing' }, { name: 'Sleek by Asian Paints' }, { name: 'Saint-Gobain' },
      ],
    },
    testimonials: [
      { id: '1', quote: "I've used Magic Glass' HS Laminated Glass for my shop fronts for years. Through heat waves and monsoons, it never fails to impress with its strength and clarity.", author: 'Suraj Divate', title: '', avatar: '/images/hero-bg.jpg' },
      { id: '2', quote: "I used Mirrored Glass to renovate my car automotive dealership and it transformed the space. Customers are wowed by the depth and glow. 5 years later it still looks new.", author: 'Shikha Kumari', title: '', avatar: '/images/craft-dgu.jpg' },
      { id: '3', quote: "As a high-end retailer in a busy area, security is crucial. Sentry Laminated Glass gives me complete peace of mind - it's stopped multiple attempted break-ins without as much as a scratch.", author: 'Rajesh Kumar', title: '', avatar: '/images/factory-cnc.jpg' },
    ],
    categorySwitcher: [
      { id: 'structural', title: 'Structural & Exterior Glazing Systems', badge: '01', subtitle: 'Structural & Exterior Glazing', specs: ['SentryGlas® Laminated Extra Clear Structural Glass Fins', 'Double Glazed DGU 28mm Insulated Facade Panels', 'Low-E & SKN Ultra Solar Control High-Performance Glass', 'Spider Fitting Glass Curtains & Canopy Systems'], image: '/images/prod-structural.jpg' },
      { id: 'interior', title: 'Interior Partitions & Decorative Systems', badge: '02', subtitle: 'Interior & Partitions', specs: ['Acoustic PVB 42dB Soundproof Conference Partitions', 'Ceramic Fritted Screen-Printed Privacy Dot Matrix Glass', 'Acid-Etched Frosted Satin Non-Fingerprint Glass', 'High-Clarity Silver & Tinted Architectural Mirrors'], image: '/images/prod-partitions.jpg' },
      { id: 'safety', title: 'Safety, Toughened & Curved Glass Processing', badge: '03', subtitle: 'Safety & Processing', specs: ['Heat Soaked Toughened Glass (HS) for Spontaneous Breakage Prevention', '3D Curved Architectural Glass Facades & Staircases', 'Fire-Rated EW60 / EI90 Clear Safety Barriers', 'Bullet-Resistant & High-Impact Laminated Security Panels'], image: '/images/prod-additional.jpg' },
    ],
  }
}

// ----------------------------------------------------
// About Page Global
// ----------------------------------------------------
export async function getAboutPageCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'about-page' })
      if (data && data.hero?.title) {
        return {
          hero: {
            ...data.hero,
            facilityImage: getMediaUrl(data.hero.facilityImage, data.hero.facilityImageUrl || '/images/hero-bg.jpg'),
          },
          legacy: data.legacy,
          visionMission: data.visionMission,
          whyMagicGlass: data.whyMagicGlass,
          leadership: data.leadership?.map((l: any) => ({
            ...l,
            image: getMediaUrl(l.portrait, l.portraitUrl),
          })),
          cta: data.cta,
        }
      }
    }
  } catch (err) {
    console.warn('About page global fetch failed, using fallback:', err)
  }

  return {
    hero: {
      eyebrow: 'ABOUT MAGIC GLASS',
      title: 'About Magic Glass',
      tagline: 'With "Build to Last" as our guiding philosophy, Magic Glass stands as a symbol of enduring strength and innovation in the glass processing industry.',
      facilityImage: '/images/hero-bg.jpg',
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
      { number: '01', title: 'Certified Excellence', description: 'Adhering to rigorous international standards (IS 2553, IS 14900, ISO 9001) for uncompromising architectural glass quality and safety.' },
      { number: '02', title: 'Quality Driven Innovation', description: 'Continuously adopting state-of-the-art European processing machinery, CNC edging, and advanced glass tempering technology.' },
      { number: '03', title: 'State-of-the-Art Facility', description: 'Spanning 150,000+ sq. ft. equipped with automated double-chamber furnaces and cleanroom lamination setups.' },
      { number: '04', title: 'Customer Focus', description: 'Dedicated technical consultation, custom BOQ engineering, and reliable nationwide project delivery for architects and builders.' },
    ],
    leadership: [
      { name: 'Manik Kodre', role: 'Managing Director & Founder', image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Manik-Kodre.png', bio: 'Meet Manik Kodre, the visionary Managing Director and founder of Magic Glass. With roots in farming, he recognized the limitless potential of toughened glass in the modern world, founding our company in 2006.' },
      { name: 'Anup Kodre', role: 'Director (Marketing & Finance)', image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Anup-Kodre.png', bio: 'Anup’s innate talent for marketing and finance, paired with his strong presence, eloquent communication, and visionary leadership, has been instrumental in Magic Glass’ rise in the Indian glass industry.' },
      { name: 'Nitish Kodre', role: 'Director (Operations & R&D)', image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Nitish-Kodre.png', bio: 'Nitish, a holder of a master’s degree in architecture from Kingston University London, embraced his role in the family enterprise right after completing his education.' },
    ],
    cta: {
      eyebrow: 'WHERE VISION MEETS EXECUTION',
      headline: 'Every great build begins with understanding',
      subtitle: 'Speak with our technical engineering team to consult on custom BOQ specifications or glass requirements.',
      buttonLabel: 'GET IN TOUCH ↗',
      buttonHref: '/contact-us',
    },
  }
}

// ----------------------------------------------------
// Products Page Global & Dynamic Products Collection
// ----------------------------------------------------
export async function getProductsPageCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = (await payload.findGlobal({ slug: 'products-page' })) as any
      const productsRes = await payload.find({
        collection: 'products',
        limit: 100,
      })

      const dynamicProducts =
        productsRes.docs && productsRes.docs.length > 0
          ? productsRes.docs.map((doc: any) => ({
              id: doc.slug,
              title: doc.title,
              category: doc.category,
              categoryLabel:
                doc.category === 'structural'
                  ? 'Structural & Exterior Glazing'
                  : doc.category === 'interior'
                  ? 'Interior & Partitions'
                  : doc.category === 'safety'
                  ? 'Safety & Processing'
                  : doc.category === 'specialty'
                  ? 'Specialty & Decorative'
                  : 'Architectural Glazing',
              badgeText: doc.subheading || doc.category?.toUpperCase() || 'ARCHITECTURAL GLASS',
              thicknessRange:
                doc.specs?.find((s: any) => s.label?.toLowerCase().includes('thickness'))?.value ||
                'Custom Specifications',
              description: doc.introSummary || doc.secondaryText || '',
              features: doc.characteristics?.map((c: any) => c.item || c) || [],
              image: getMediaUrl(doc.heroImage, doc.heroImageUrl || '/images/prod-structural.jpg'),
            }))
          : ALL_PRODUCTS

      if (data && data.hero?.title) {
        return {
          hero: data.hero,
          topFeaturedEyebrow: data.topFeaturedEyebrow || 'TOP 3 FEATURED SYSTEMS',
          topFeaturedTag: data.topFeaturedTag || 'FLAGSHIP FAÇADES',
          featuredSystems:
            data.featuredSystems && data.featuredSystems.length > 0
              ? data.featuredSystems.map((f: any) => ({
                  id: f.productSlug || f.link?.replace('/products/', '') || 'sentry-laminated-glass',
                  title: f.title,
                  badgeText: f.badgeText || 'FLAGSHIP FAÇADE',
                  categoryLabel: f.categoryLabel || 'Structural & Exterior Glazing',
                  description: f.description || f.descriptionHighlight || '',
                  image: getMediaUrl(f.featuredImage, f.featuredImageUrl || '/images/prod-structural.jpg'),
                  link: f.link || `/products/${f.productSlug || ''}`,
                }))
              : TOP_3_FEATURED,
          collectionEyebrow: data.collectionEyebrow || 'MAGIC GLASS COLLECTION',
          collectionHeadline:
            data.collectionHeadline ||
            'We offer a wide spectrum of bespoke architectural glass solutions where timeless design meets technical precision.',
          categoriesNav: data.categoriesNav || CATEGORIES_INFO,
          allProducts: dynamicProducts,
        }
      }
    }
  } catch (err) {
    console.warn('Products page global fetch failed, using fallback:', err)
  }

  return {
    hero: {
      tag: 'COLLECTION / ARCHITECTURAL GLASS SYSTEMS',
      title: 'Architectural Glass & Precision Processing',
      subtitle:
        'Engineered for high-rise curtain walls, acoustic speech isolation, fire containment barriers, and ionoplast structural fins. Sourced and processed with world-class European technology.',
    },
    topFeaturedEyebrow: 'TOP 3 FEATURED SYSTEMS',
    topFeaturedTag: 'FLAGSHIP FAÇADES',
    featuredSystems: TOP_3_FEATURED,
    collectionEyebrow: 'MAGIC GLASS COLLECTION',
    collectionHeadline:
      'We offer a wide spectrum of bespoke architectural glass solutions where timeless design meets technical precision.',
    categoriesNav: CATEGORIES_INFO,
    allProducts: ALL_PRODUCTS,
  }
}

// ----------------------------------------------------
// Products & PDP Collection
// ----------------------------------------------------
export async function getPdpProductCmsData(slug: string): Promise<PdpProductDetail | null> {
  const canonicalSlug = resolveCanonicalSlug(slug)

  try {
    const payload = await getPayloadClient()
    if (payload) {
      const res = await payload.find({
        collection: 'products',
        where: { slug: { equals: canonicalSlug } },
        limit: 1,
      })
      if (res.docs && res.docs.length > 0) {
        const item: any = res.docs[0]
        return {
          id: item.slug,
          indexNumber: item.indexNumber || '01',
          title: item.title,
          subheading: item.subheading,
          category: item.category,
          heroImage: getMediaUrl(item.heroImage, item.heroImageUrl),
          introSummary: item.introSummary || '',
          secondaryText: item.secondaryText || '',
          detailImages: [
            getMediaUrl(item.detailImages?.[0]?.image, item.detailImages?.[0]?.imageUrl),
            getMediaUrl(item.detailImages?.[1]?.image, item.detailImages?.[1]?.imageUrl),
          ],
          characteristics: item.characteristics?.map((c: any) => c.item || c) || [],
          specs: item.specs?.map((s: any) => ({
            icon: s.icon,
            label: s.label,
            value: s.value,
          })),
          galleryTitle: item.galleryTitle,
          galleryImageItems: item.galleryImages?.map((g: any) => ({
            src: getMediaUrl(g.image, g.src),
            title: g.title,
          })),
          galleryImages: [
            getMediaUrl(item.galleryImages?.[0]?.image, item.galleryImages?.[0]?.src),
            getMediaUrl(item.galleryImages?.[1]?.image, item.galleryImages?.[1]?.src),
            getMediaUrl(item.galleryImages?.[2]?.image, item.galleryImages?.[2]?.src),
            getMediaUrl(item.galleryImages?.[3]?.image, item.galleryImages?.[3]?.src),
          ],
          industries: item.industries?.map((ind: any) => ({
            title: ind.title,
            description: ind.description,
            image: getMediaUrl(ind.image, ind.imageUrl),
          })),
          sliderImages: item.sliderImages?.map((s: any) => getMediaUrl(s.image, s.src)) || [],
          relatedProductIds: item.relatedProductSlugs?.map((r: any) => r.slug || r) || [
            'toughened-glass',
            'insulated-glass-dgu',
          ],
        }
      }
    }
  } catch (err) {
    console.warn(`PDP product fetch failed for slug '${slug}', using mock fallback:`, err)
  }

  // Fallback to local PDP mock data using canonical key
  return PDP_MOCK_DATA[canonicalSlug] || null
}

// ----------------------------------------------------
// Projects Portfolio Collection
// ----------------------------------------------------
export async function getProjectsCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const res = await payload.find({
        collection: 'projects',
        limit: 100,
      })
      if (res.docs && res.docs.length > 0) {
        return res.docs.map((doc: any) => ({
          id: doc.slug,
          title: doc.title,
          category: doc.category,
          developer: doc.developer || '',
          location: doc.location || '',
          application: doc.application || '',
          glassDescription: doc.glassDescription || '',
          areaSqMtr: doc.areaSqMtr || 0,
          image: getMediaUrl(doc.image, doc.imageUrl),
          heroFeatured: Boolean(doc.heroFeatured),
          tagline: doc.tagline || '',
        }))
      }
    }
  } catch (err) {
    console.warn('Projects collection fetch failed, using mock fallback:', err)
  }

  return projectsMock
}

// ----------------------------------------------------
// Industry Solution Page Global
// ----------------------------------------------------
export async function getIndustrySolutionCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'industry-solution-page' })
      if (data && data.industries && data.industries.length > 0) {
        return {
          page: {
            title: data.hero?.title || industrySolutionsMock.page.title,
            redTitle: industrySolutionsMock.page.redTitle,
            mainTitle: industrySolutionsMock.page.mainTitle,
            indexNumber: data.hero?.indexNumber || '04',
            category: data.hero?.category || industrySolutionsMock.page.category,
            heroImage: getMediaUrl(data.hero?.heroImage, data.hero?.heroImageUrl || industrySolutionsMock.page.heroImage),
            fullWidthImage: getMediaUrl(data.hero?.heroImage, data.hero?.heroImageUrl || industrySolutionsMock.page.fullWidthImage),
            ctaText: 'Enquire Now',
            eyebrow: '◆ INDUSTRY SOLUTIONS',
            subheading: data.hero?.subheading || industrySolutionsMock.page.subheading,
            introDescription: industrySolutionsMock.page.introDescription,
          },
          industries: data.industries.map((ind: any) => ({
            id: ind.id,
            title: ind.title,
            subtitle: ind.subtitle || '',
            image: getMediaUrl(ind.image, ind.imageUrl),
            specs: ind.specs || '',
            description: ind.description || '',
          })),
        }
      }
    }
  } catch (err) {
    console.warn('Industry Solution fetch failed, using mock fallback:', err)
  }

  return industrySolutionsMock
}

// ----------------------------------------------------
// Infrastructure Page Global
// ----------------------------------------------------
export async function getInfrastructureCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = (await payload.findGlobal({ slug: 'infrastructure-page' })) as any
      if (data && data.industries && data.industries.length > 0) {
        return {
          page: {
            title: data.hero?.title || infrastructureMock.page.title,
            redTitle: infrastructureMock.page.redTitle,
            mainTitle: infrastructureMock.page.mainTitle,
            indexNumber: data.hero?.indexNumber || '05',
            category: data.hero?.category || infrastructureMock.page.category,
            heroImage: getMediaUrl(data.hero?.heroImage, data.hero?.heroImageUrl || infrastructureMock.page.heroImage),
            fullWidthImage: getMediaUrl(data.hero?.heroImage, data.hero?.heroImageUrl || infrastructureMock.page.fullWidthImage),
            ctaText: 'Enquire Now',
            eyebrow: '◆ OUR INFRASTRUCTURE',
            subheading: data.hero?.subheading || infrastructureMock.page.subheading,
            introDescription: infrastructureMock.page.introDescription,
          },
          industries: data.industries.map((item: any) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || '',
            image: getMediaUrl(item.image, item.imageUrl),
            specs: item.specs || '',
            description: item.description || '',
          })),
        }
      }
    }
  } catch (err) {
    console.warn('Infrastructure fetch failed, using mock fallback:', err)
  }

  return infrastructureMock
}

// ----------------------------------------------------
// Contact Us Page Global
// ----------------------------------------------------
export async function getContactUsCmsData() {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      const data = await payload.findGlobal({ slug: 'contact-us-page' })
      if (data && data.contactCards && data.contactCards.length > 0) {
        return {
          page: {
            title: data.hero?.title || contactUsMock.page.title,
            redTitle: data.hero?.redTitle || contactUsMock.page.redTitle,
            mainTitle: contactUsMock.page.mainTitle,
            indexNumber: data.hero?.indexNumber || '06',
            category: data.hero?.category || contactUsMock.page.category,
            heroImage: getMediaUrl(data.hero?.heroImage, data.hero?.heroImageUrl || contactUsMock.page.heroImage),
            ctaText: 'Contact Now',
            eyebrow: '◆ GET IN TOUCH',
            subheading: data.hero?.subheading || contactUsMock.page.subheading,
            introDescription: contactUsMock.page.introDescription,
          },
          contactCards: data.contactCards.map((card: any) => ({
            id: card.id,
            title: card.title,
            detail: card.detail,
            icon: card.icon || 'location',
            actionText: card.actionText || '',
            actionUrl: card.actionUrl || null,
          })),
          mapEmbedUrl: data.mapEmbedUrl || contactUsMock.mapEmbedUrl,
        }
      }
    }
  } catch (err) {
    console.warn('Contact Us fetch failed, using mock fallback:', err)
  }

  return contactUsMock
}
