'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import styles from './About.module.css'

const WHY_MAGIC_GLASS = [
  {
    num: '01',
    title: 'Certified Excellence',
    desc: 'Adhering to rigorous international standards (IS 2553, IS 14900, ISO 9001) for uncompromising architectural glass quality and safety.',
  },
  {
    num: '02',
    title: 'Quality Driven Innovation',
    desc: 'Continuously adopting state-of-the-art European processing machinery, CNC edging, and advanced glass tempering technology.',
  },
  {
    num: '03',
    title: 'State-of-the-Art Facility',
    desc: 'Spanning 150,000+ sq. ft. equipped with automated double-chamber furnaces and cleanroom lamination setups.',
  },
  {
    num: '04',
    title: 'Customer Focus',
    desc: 'Dedicated technical consultation, custom BOQ engineering, and reliable nationwide project delivery for architects and builders.',
  },
]

const LEADERSHIP = [
  {
    name: 'Manik Kodre',
    role: 'Managing Director & Founder',
    image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Manik-Kodre.png',
    bio: 'Meet Manik Kodre, the visionary Managing Director and founder of Magic Glass. With roots in farming, he recognized the limitless potential of toughened glass in the modern world, founding our company in 2006. Under his leadership, Magic Glass has grown into a dominant force in Pune’s retail market and expanded swiftly, meeting surging demand in 2014. Manik’s strategic acumen and unwavering belief in the potential of toughened glass have propelled us to unprecedented heights, forging partnerships with major corporations across India and shaping our journey of excellence.',
  },
  {
    name: 'Anup Kodre',
    role: 'Director (Marketing & Finance)',
    image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Anup-Kodre.png',
    bio: 'Anup’s innate talent for marketing and finance, paired with his strong presence, eloquent communication, and visionary leadership, has been instrumental in Magic Glass’ rise in the Indian glass industry. Anup’s strategic acumen has strengthened our relationships with key stakeholders, expanding Magic Glass’s influence beyond Pune and Maharashtra to neighboring states. His expertise in marketing, finance, strategy, and business development continues to drive our success story. He holds an MBA (Finance) from the Sydney Institute of Technology.',
  },
  {
    name: 'Nitish Kodre',
    role: 'Director (Operations & R&D)',
    image: 'https://magicglass.co.in/wp-content/uploads/2025/04/Nitish-Kodre.png',
    bio: 'Nitish, a holder of a master’s degree in architecture from Kingston University London, embraced his role in the family enterprise right after completing his education. Taking the reins of production and operations, Nitish envisioned a pursuit of perfection, efficiency, and world-class glass quality. His dedication led him to extensively study machinery, glass processes, and production lines. Collaborating with diverse companies, he set new benchmarks for quality standards and operational efficiency. His meticulous planning and analysis of production lines have culminated in the establishment of a seamless, end-to-end production journey.',
  },
]

interface AboutContentProps {
  cmsData?: any
}

export const AboutContent: React.FC<AboutContentProps> = ({ cmsData }) => {
  const heroRef = useRef<HTMLDivElement>(null)

  const heroEyebrow = cmsData?.hero?.eyebrow || 'ABOUT MAGIC GLASS'
  const heroTitle = cmsData?.hero?.title || 'About Magic Glass'
  const heroTagline = cmsData?.hero?.tagline || 'With "Build to Last" as our guiding philosophy, Magic Glass stands as a symbol of enduring strength and innovation in the glass processing industry.'
  const facilityImage = cmsData?.hero?.facilityImage || '/images/hero-bg.jpg'

  const legacyEyebrow = cmsData?.legacy?.eyebrow || 'OUR LEGACY'
  const legacyHeadline = cmsData?.legacy?.headline || 'Welcome to the world of Magic Glass, where excellence is not just a commitment; it’s a legacy.'
  const legacyBodyText = cmsData?.legacy?.bodyText || 'Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers. As a family-run enterprise, we are driven by a passion for perfection that has been passed down through generations.'
  const legacyButtonLabel = cmsData?.legacy?.buttonLabel || 'OUR SOLUTIONS ↗'
  const legacyButtonHref = cmsData?.legacy?.buttonHref || '/industry-solution'

  const visionTitle = cmsData?.visionMission?.visionTitle || 'Setting the Gold Standard'
  const visionDesc = cmsData?.visionMission?.visionDesc || 'Our vision is to lead the global glass processing industry, setting the gold standard for quality, craftsmanship, and sustainability.'
  const missionTitle = cmsData?.visionMission?.missionTitle || 'Uncompromising Quality'
  const missionDesc = cmsData?.visionMission?.missionDesc || 'To solidify our position as global leaders in the glass processing industry by consistently delivering exceptional quality, leveraging cutting-edge technology, and nurturing a culture of innovation.'

  const whyList = cmsData?.whyMagicGlass?.map((w: any) => ({
    num: w.number || w.num,
    title: w.title,
    desc: w.description || w.desc,
  })) || WHY_MAGIC_GLASS

  const leadersList = cmsData?.leadership?.length ? cmsData.leadership : LEADERSHIP

  const ctaEyebrow = cmsData?.cta?.eyebrow || 'WHERE VISION MEETS EXECUTION'
  const ctaHeadline = cmsData?.cta?.headline || 'Every great build begins with understanding'
  const ctaSubtitle = cmsData?.cta?.subtitle || 'Speak with our technical engineering team to consult on custom BOQ specifications or glass requirements.'
  const ctaButtonLabel = cmsData?.cta?.buttonLabel || 'GET IN TOUCH ↗'
  const ctaButtonHref = cmsData?.cta?.buttonHref || '/contact-us'

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out' }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Hero Header Section */}
      <section className={styles.heroSection}>
        <div ref={heroRef} className={styles.heroContent}>
          <span className="base-title" data-cms-field="hero_eyebrow">{heroEyebrow}</span>
          <h1 className={styles.heroTitle} data-cms-field="hero_title">{heroTitle}</h1>
          <p className={styles.heroTagline} data-cms-field="hero_tagline">{heroTagline}</p>
        </div>

        {/* Full-Width Viewport Image Frame */}
        <div className={styles.heroImageFrameFullWidth}>
          <Image
            src={facilityImage}
            alt="Magic Glass State-of-the-Art Processing Facility"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* 2. Legacy & Manifesto Section */}
      <section className={styles.manifestoSection}>
        <div className={styles.container}>
          <div className={styles.manifestoGrid}>
            <div>
              <span className="base-title" data-cms-field="legacy_title">{legacyEyebrow}</span>
            </div>
            <div>
              <h2 className={styles.manifestoLead} data-cms-field="legacy_headline">
                {legacyHeadline}
              </h2>
              <p className={styles.manifestoBody} data-cms-field="legacy_bodyText">
                {legacyBodyText}
              </p>
              <div>
                <Link href={legacyButtonHref} className="btn-black" data-cms-field="legacy_buttonLabel">
                  {legacyButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className={styles.visionMissionSection}>
        <div className={styles.container}>
          <div className={styles.visionMissionGrid}>
            {/* Vision */}
            <div className={styles.vmCardShell}>
              <div className={styles.vmCardInner}>
                <span className="base-title">VISION</span>
                <h3 className={styles.vmTitle} data-cms-field="visionMission_visionTitle">{visionTitle}</h3>
                <p className={styles.vmDesc} data-cms-field="visionMission_visionDesc">
                  {visionDesc}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className={styles.vmCardShell}>
              <div className={styles.vmCardInner}>
                <span className="base-title">MISSION</span>
                <h3 className={styles.vmTitle} data-cms-field="visionMission_missionTitle">{missionTitle}</h3>
                <p className={styles.vmDesc} data-cms-field="visionMission_missionDesc">
                  {missionDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Magic Glass Section */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.whyHeader}>
            <span className="base-title">WHY MAGIC GLASS</span>
            <h2 className={styles.whyHeadline}>Built on Precision, Performance &amp; Trust</h2>
          </div>

          <div className={styles.whyGrid}>
            {whyList.map((item: any) => (
              <div key={item.num || item.number} className={styles.whyCardShell}>
                <div className={styles.whyCardInner}>
                  <span className={styles.whyNum}>{item.num || item.number}</span>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc || item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership Section */}
      <section className={styles.leadershipSection}>
        <div className={styles.container}>
          <div className={styles.leadershipHeader}>
            <span className="base-title">EXECUTIVE LEADERSHIP</span>
            <h2 className={styles.leadershipHeading}>Leadership &amp; Vision</h2>
          </div>

          <div className={styles.leadershipGrid}>
            {leadersList.map((leader: any) => (
              <div key={leader.name} className={styles.leaderCardShell}>
                <div className={styles.leaderCardInner}>
                  <div className={styles.leaderImageContainer}>
                    <Image
                      src={leader.image || leader.portraitUrl || 'https://magicglass.co.in/wp-content/uploads/2025/04/Manik-Kodre.png'}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className={styles.leaderPortrait}
                    />
                  </div>
                  <h3 className={styles.leaderName}>{leader.name}</h3>
                  <span className={styles.leaderRole}>{leader.role}</span>
                  <p className={styles.leaderBio}>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Component */}
      <Testimonials />

      {/* 7. Banner CTA Section */}
      <section className={styles.ctaBannerSection}>
        <div className={styles.container}>
          <div className={styles.ctaBannerContent}>
            <span className="base-title" style={{ color: '#ffffff' }}>
              {ctaEyebrow}
            </span>
            <h2 className={styles.ctaHeadline} data-cms-field="cta_headline">{ctaHeadline}</h2>
            <p className={styles.ctaSubtitle} data-cms-field="cta_subtitle">
              {ctaSubtitle}
            </p>

            <div className={styles.ctaBtnRow}>
              <Link href={ctaButtonHref} className="button--red" data-cms-field="cta_buttonLabel">
                {ctaButtonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
