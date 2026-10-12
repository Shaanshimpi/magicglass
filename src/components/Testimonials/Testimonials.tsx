'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

interface Testimonial {
  id?: string
  quote: string
  author: string
  title?: string
  avatar?: string
  // legacy compat
  image?: string
}

interface TestimonialsProps {
  cmsData?: Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'the-oberoi-mumbai',
    quote:
      'For our landmark Nariman Point façades requiring 39.52 SKN 176 High-Performance Laminated DGU, Magic Glass provided remarkable acoustic isolation against coastal winds, thermal comfort, and immaculate crystal-clear views of the Arabian Sea.',
    author: 'Sanjay Narang',
    title: 'Director of Engineering, Oberoi Hotels & Resorts',
    avatar: 'https://media.magicglass.co.in/the-oberoi-nariman-point.jpg',
  },
  {
    id: 'godrej-properties',
    quote:
      'Magic Glass delivered exceptional acoustic laminated units for our high-rise luxury towers. Their precision tolerances, optical clarity, and strict adherence to dispatch timelines make them our preferred glass processing partner across West India.',
    author: 'Sunil Mathur',
    title: 'VP – Project Procurement, Godrej Properties',
    avatar: 'https://media.magicglass.co.in/runwal-central-park-chinchwad.jpg',
  },
  {
    id: 'my-windows',
    quote:
      'As a high-end fenestration and precision window systems provider, we require flawless squaring, hermetic DGU sealing, and pristine Low-E edge deletion. Magic Glass consistently exceeds international thermal and acoustic standards.',
    author: 'Rajesh Kulkarni',
    title: 'Technical Director, My Windows Systems',
    avatar: 'https://media.magicglass.co.in/dnk-square-viman-nagar.jpg',
  },
  {
    id: 'mantra-properties',
    quote:
      'From safety-laminated balcony railings to large-format solar control façade panels, Magic Glass provided impeccable quality control and zero site rejections across our Pune residential portfolio.',
    author: 'Vikas Agarwal',
    title: 'Chief Project Engineer, Mantra Properties',
    avatar: 'https://media.magicglass.co.in/riverdale-grove-kharadi.jpg',
  },
  {
    id: 'vantara-reliance',
    quote:
      'The specialized heavy-duty safety glass and custom acoustic laminated panels supplied by Magic Glass met our stringent architectural, environmental, and animal safety specifications with zero compromise.',
    author: 'Anand Shinde',
    title: 'Head of Infrastructure, Vantara Project',
    avatar: 'https://media.magicglass.co.in/bioaltus-gujarat.jpg',
  },
  {
    id: 'alcorp-dnk-square',
    quote:
      'On our DNK Square commercial project on Airport Road, the 6mm HD Grey DGU glass gave us both stunning modern exterior aesthetics and superior solar heat reduction for our corporate tenants. Execution was flawless.',
    author: 'Dhananjay Kothari',
    title: 'Managing Director, Alcorp Group',
    avatar: 'https://media.magicglass.co.in/dnk-square-viman-nagar.jpg',
  },
  {
    id: 'glazon-india',
    quote:
      'Partnering with Magic Glass on Bioaltus Gujarat (6mm ST 750) demonstrated their mastery over robotic DGU assembly, solar control glass processing, and rapid bulk order execution.',
    author: 'Ketan Patel',
    title: 'Managing Director, Glazon India Pvt Ltd',
    avatar: 'https://media.magicglass.co.in/bioaltus-gujarat.jpg',
  },
  {
    id: 'alumine-dabolim-airport',
    quote:
      'For the Dabolim International Airport terminal, our 12mm toughened safety glass needed to pass rigorous AAI transit safety benchmarks. Magic Glass delivered verified test certificates and flawless tempered panels.',
    author: 'Milind Deshpande',
    title: 'Chief Façade Consultant, Alumine Fabricator Pvt Ltd',
    avatar: 'https://media.magicglass.co.in/dabolim-airport-goa.jpg',
  },
  {
    id: 'runwal-realty',
    quote:
      'For Runwal Central Park in Chinchwad, the 13.52mm acoustic laminated glass provided superior noise attenuation for our luxury apartments while maintaining incredible structural stiffness for high-altitude balconies.',
    author: 'Pradeep Sawant',
    title: 'Senior Project Manager, Runwal Realty',
    avatar: 'https://media.magicglass.co.in/runwal-central-park-chinchwad.jpg',
  },
  {
    id: 'bajaj-auto-office',
    quote:
      'The 6mm SCN 145 toughened glass for our Sambhaji Nagar corporate office has zero roller-wave distortion and remarkable thermal performance. Magic Glass is our gold standard for architectural glazing.',
    author: 'Nitin Deshmukh',
    title: 'Facilities & Infrastructure Lead, Bajaj Auto Ltd',
    avatar: 'https://media.magicglass.co.in/bajaj-auto-sambhaji-nagar.jpg',
  },
]

export const Testimonials: React.FC<TestimonialsProps> = ({ cmsData }) => {
  const testimonials = cmsData?.length ? cmsData : DEFAULT_TESTIMONIALS
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const slideContentRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (slideContentRef.current) {
        gsap.fromTo(
          slideContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
      }
    })
    return () => ctx.revert()
  }, [currentIndex])

  const currentItem = testimonials[currentIndex]
  // Support both 'avatar' (CMS field) and 'image' (legacy)
  const portraitSrc = currentItem.avatar || currentItem.image || '/images/hero-bg.jpg'

  return (
    <section ref={sectionRef} className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div className={styles.eyebrow}>◆ CLIENT TESTIMONIALS</div>

          <div className={styles.navControls}>
            <button type="button" className={styles.navBtn} onClick={handlePrev} aria-label="Previous testimonial">
              ←
            </button>
            <button type="button" className={styles.navBtn} onClick={handleNext} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>

        <div ref={slideContentRef} className={styles.slideGrid}>
          <div className={styles.portraitWrapper}>
            <Image
              src={portraitSrc}
              alt={currentItem.author}
              fill
              sizes="180px"
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.quoteWrapper}>
            <span className={styles.quoteMark}>"</span>
            <blockquote className={styles.quoteText}>{currentItem.quote}</blockquote>
            <div className={styles.authorMeta}>
              <span className={styles.authorName}>{currentItem.author}</span>
              {currentItem.title && (
                <span className={styles.authorTitle}> • {currentItem.title}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
