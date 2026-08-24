'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  image: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      "I've used Magic Glass' HS Laminated Glass for my shop fronts for years. Through heat waves and monsoons, it never fails to impress with its strength and clarity. While others have replaced regular glass multiple times, my investment in HS Laminated Glass stays protected.",
    author: 'Suraj Divate',
    title: '',
    image: '/images/hero-bg.jpg',
  },
  {
    id: '2',
    quote:
      'I used Mirrored Glass to renovate my car automotive dealership and it transformed the space. Customers are wowed by the depth and glow. 5 years later it still looks new - a perfect high-end finish that enhances my brand and boosts sales.',
    author: 'Shikha Kumari',
    title: '',
    image: '/images/craft-dgu.jpg',
  },
  {
    id: '3',
    quote:
      "As a high-end retailer in a busy area, security is crucial. Sentry Laminated Glass gives me complete peace of mind - it's stopped multiple attempted break-ins without as much as a scratch. Highly recommend for protecting your property and investments.",
    author: 'Rajesh Kumar',
    title: '',
    image: '/images/factory-cnc.jpg',
  },
]

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const slideContentRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  useEffect(() => {
    if (slideContentRef.current) {
      gsap.fromTo(
        slideContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [currentIndex])


  const currentItem = TESTIMONIALS[currentIndex]

  return (
    <section ref={sectionRef} className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Eyebrow Header & Slide Navigation Controls */}
        <div className={styles.topHeader}>
          <div className={styles.eyebrow}>
            ◆ CLIENT TESTIMONIALS
          </div>

          <div className={styles.navControls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* Testimonial Slide Content (fluid.glass Layout) */}
        <div ref={slideContentRef} className={styles.slideGrid}>
          {/* Left Column: B&W Portrait Image */}
          <div className={styles.portraitWrapper}>
            <Image
              src={currentItem.image}
              alt={currentItem.author}
              fill
              sizes="180px"
              className={styles.portraitImage}
            />
          </div>

          {/* Right Column: Quote & Author Details */}
          <div className={styles.quoteWrapper}>
            <span className={styles.quoteMark}>“</span>
            <blockquote className={styles.quoteText}>
              {currentItem.quote}
            </blockquote>
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
