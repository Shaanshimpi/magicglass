'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
  cmsData?: {
    logo?: string
    loaderBrandTag?: string
    loaderBrandTitle?: string
    loaderStatusText?: string
    loaderEstYear?: string
  }
}

export const Loader: React.FC<LoaderProps> = ({ onComplete, cmsData }) => {
  const brandTag = cmsData?.loaderBrandTag || '◆ MAGIC GLASS'
  const brandTitle = cmsData?.loaderBrandTitle || "It's not just glass It's"
  const logoSrc = cmsData?.logo || '/images/logo.png'
  const statusText = cmsData?.loaderStatusText || 'INITIALIZING EXPERIENCE'
  const estYear = cmsData?.loaderEstYear || 'EST. 2006'
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 }

      const tl = gsap.timeline({
        onComplete: () => {
          // Awwwards Curved Liquid SVG Exit Animation
          const svgPath = svgPathRef.current
          if (!svgPath) {
            onComplete()
            return
          }

          const exitTl = gsap.timeline({
            onComplete: () => {
              onComplete()
            },
          })

          // Animate SVG path curve morph to pull up the curtain
          const targetPath = 'M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z'
          const curvePath = 'M 0 0 L 100 0 L 100 0 Q 50 -30 0 0 Z'

          // Fade out all content elements (texts, metadata, counter) before curtain lifts
          exitTl
            .to([tagRef.current, titleRef.current, counterRef.current], {
              opacity: 0,
              y: -20,
              duration: 0.35,
              ease: 'power2.in',
            })
            .set(loaderRef.current, { backgroundColor: 'transparent' })
            .to(
              svgPath,
              {
                attr: { d: curvePath },
                duration: 0.5,
                ease: 'power2.in',
              }
            )
            .to(svgPath, {
              attr: { d: targetPath },
              duration: 0.45,
              ease: 'power3.out',
            })
        },
      })

      // Smooth Title & Tag Reveal from initial opacity: 0 state
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
        })
      }
      if (tagRef.current) {
        gsap.to(tagRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.25,
        })
      }

      // Awwwards Non-Scroll Kinetic Logo Animations:
      // 1. Initial Scale & Elastic Entrance Reveal
      if (logoWrapperRef.current) {
        gsap.fromTo(
          logoWrapperRef.current,
          { scale: 0.85, opacity: 0, y: 25 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power4.out',
            delay: 0.2,
          }
        )

        // 2. Ambient Levitation Floating Loop
        gsap.to(logoWrapperRef.current, {
          y: -5,
          duration: 1.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        })
      }

      // Progress counter 0 to 100
      tl.to(counterObj, {
        value: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.floor(counterObj.value)
          setProgress(val)

          // Animate SVG circle stroke
          if (circleRef.current) {
            const circumference = 2 * Math.PI * 44
            const offset = circumference - (val / 100) * circumference
            circleRef.current.style.strokeDashoffset = `${offset}`
          }
        },
      })
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={loaderRef} className={styles.loaderWrapper}>
      {/* Liquid SVG Shutter Background */}
      <svg className={styles.svgCurtain} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={svgPathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          fill="#0b1012"
        />
      </svg>

      {/* Main Kinetic Content */}
      <div className={styles.loaderContent}>
        {/* Top Tagline */}
        <div ref={tagRef} className={styles.topMeta}>
          <span>{brandTag}</span>
          <span>{estYear}</span>
        </div>

        {/* Center Kinetic Editorial Title & Prominent Brand Logo */}
        <div ref={titleRef} className={styles.titleBox}>
          {brandTitle && <span className={styles.brandKicker}>{brandTitle}</span>}
          <div ref={logoWrapperRef} className={styles.centerLogoWrapper}>
            <Image
              src="/images/logo.png"
              alt="Magic Glass Logo"
              width={320}
              height={105}
              className={styles.centerLogoImg}
              priority
            />
          </div>
        </div>

        {/* Bottom Circular Progress Indicator & Monospaced Number */}
        <div ref={counterRef} className={styles.counterBox}>
          <div className={styles.ringWrapper}>
            <svg className={styles.ringSvg} viewBox="0 0 100 100">
              <circle className={styles.ringTrack} cx="50" cy="50" r="44" />
              <circle
                ref={circleRef}
                className={styles.ringProgress}
                cx="50"
                cy="50"
                r="44"
                style={{
                  strokeDasharray: `${2 * Math.PI * 44}`,
                  strokeDashoffset: `${2 * Math.PI * 44}`,
                }}
              />
            </svg>
            <span className={styles.counterNumber}>
              {progress < 10 ? `0${progress}` : progress}
            </span>
          </div>
          <span className={styles.loadingStatus}>{statusText}</span>
        </div>
      </div>
    </div>
  )
}

