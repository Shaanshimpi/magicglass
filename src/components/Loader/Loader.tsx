'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

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
          const initialPath = 'M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z'
          const targetPath = 'M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z'
          const curvePath = 'M 0 0 L 100 0 L 100 0 Q 50 -30 0 0 Z'

          exitTl
            .to(titleRef.current, {
              y: -40,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            })
            .to(
              svgPath,
              {
                attr: { d: curvePath },
                duration: 0.5,
                ease: 'power2.in',
              },
              '-=0.2'
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
          <span>◆ MAGIC GLASS</span>
          <span>EST. 2006</span>
        </div>

        {/* Center Kinetic Editorial Title */}
        <div className={styles.titleBox}>
          <h1 ref={titleRef} className={styles.brandTitle}>
            ARCHITECTURAL GLAZING
          </h1>
        </div>

        {/* Bottom Circular Progress Indicator & Monospaced Number */}
        <div className={styles.counterBox}>
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
          <span className={styles.loadingStatus}>INITIALIZING EXPERIENCE</span>
        </div>
      </div>
    </div>
  )
}
