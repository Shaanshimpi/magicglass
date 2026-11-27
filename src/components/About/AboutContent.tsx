'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import styles from './About.module.css'

const WHY_MAGIC_GLASS = [
  {
    num: '01',
    title: 'Certified Excellence',
    desc: 'Adhering to rigorous national and international standards including BIS (IS 2553), European Norms (EN), and ISO 9001, reinforced by certified primary supplier validation for uncompromising architectural glass quality and safety.',
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
    title: 'End-to-End Processing',
    desc: 'Equipped to process over 1.2 million square meters of glass annually with cutting, grinding, tempering, laminating, and DGU insulated glass lines.',
  },
  {
    num: '05',
    title: 'Technical Consultation',
    desc: 'Our experienced structural engineers guide architects, developers, and facade consultants through bespoke glass configurations.',
  },
  {
    num: '06',
    title: 'Sustainability Focused',
    desc: 'High-performance Low-E coatings, solar heat control, and eco-conscious manufacturing helping structures achieve LEED & IGBC green ratings.',
  },
]

const LEADERSHIP = [
  {
    name: 'Manik Kodre',
    role: 'Chairman',
    image: '/images/about/manik-kodre.png',
    bio: 'With a vision for growth, innovation and excellence, Manik Kodre has been instrumental in shaping the journey of Magic Glass. Under his leadership, the company has continually evolved, strengthening its manufacturing capabilities and embracing advanced technology to meet the increasingly sophisticated demands of the glass industry. Driven by a commitment to quality, precision and customer satisfaction, Magic Glass has built a strong reputation and established lasting partnerships with leading businesses across India. Today, the company continues to invest in state-of-the-art infrastructure and cutting-edge manufacturing capabilities, positioning itself to meet the evolving needs of modern architecture and high-performance glass applications.',
  },
  {
    name: 'Anup Kodre',
    role: 'Managing Director',
    image: '/images/about/anup-kodre.png',
    bio: 'Anup Kodre’s innate talent for marketing and finance, coupled with his strong presence, eloquent communication and visionary leadership, has played a significant role in shaping the growth of Magic Glass. His strategic acumen and ability to cultivate strong relationships with key stakeholders have helped expand the company’s presence beyond Pune and Maharashtra into neighbouring states. With expertise in marketing, finance, strategy and business development, Anup continues to play an integral role in driving the company’s growth and strengthening its position in the Indian glass industry. He holds an MBA in Finance from the Sydney Institute of Technology.',
  },
  {
    name: 'Nitish Kodre',
    role: 'Director - Manufacturing & Operations',
    image: '/images/about/nitish-kodre.png',
    bio: 'Holding a Master’s degree in Architecture from Kingston University London, Nitish Kodre joined the family business upon completing his education, bringing with him a vision for manufacturing excellence, efficiency and world-class glass quality. Overseeing the company\'s manufacturing operations, he has been instrumental in driving process optimisation, technological advancement and continuous improvement across the factory. With a keen interest in machinery, glass processing technologies and manufacturing systems, he continually explores new innovations and approaches to enhance production capabilities, quality and efficiency. Through meticulous planning, analytical thinking and a commitment to innovation, he has helped develop a streamlined, end-to-end manufacturing process while continually advancing the company\'s operational capabilities and manufacturing standards.',
  },
]

interface AboutContentProps {
  cmsData?: any
  onOpenQuoteDrawer?: () => void
}

export const AboutContent: React.FC<AboutContentProps> = ({ cmsData, onOpenQuoteDrawer }) => {
  const { openQuoteDrawer } = useLayoutContext()
  const handleOpenDrawer = onOpenQuoteDrawer || openQuoteDrawer
  const heroRef = useRef<HTMLDivElement>(null)

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
                      src={leader.image || leader.portraitUrl || '/images/about/manik-kodre.png'}
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

      {/* 6. Banner CTA Section */}
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
              <button
                type="button"
                onClick={handleOpenDrawer}
                className="button--red"
                data-cms-field="cta_buttonLabel"
              >
                {ctaButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
