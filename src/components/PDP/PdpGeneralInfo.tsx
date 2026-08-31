'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PdpGeneralInfo.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'
import { TechnicalSpec } from './pdpData'


interface PdpGeneralInfoProps {
  introSummary: string
  secondaryText: string
  detailImages: [string, string]
  characteristics: string[]
  specs?: TechnicalSpec[]
}

export const PdpGeneralInfo: React.FC<PdpGeneralInfoProps> = ({
  introSummary,
  secondaryText,
  detailImages,
  characteristics,
  specs,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const topBlockRef = useRef<HTMLDivElement>(null)
  const bottomBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Intro summary text entrance on scroll
      if (topBlockRef.current) {
        const summaryElem = topBlockRef.current.querySelector(
          '.' + styles.introSummary
        )
        if (summaryElem) {
          gsap.from(summaryElem, {
            y: 30,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: topBlockRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
        }
      }

      // Secondary text & Technical Specifications table entrance on scroll
      if (bottomBlockRef.current) {
        const secText = bottomBlockRef.current.querySelector(
          '.' + styles.secondaryText
        )
        const boxTag = bottomBlockRef.current.querySelector(
          '.' + styles.caratteristicheTag
        )
        const rows = bottomBlockRef.current.querySelectorAll(
          '.' + styles.specTableRow + ', .' + styles.specItem
        )

        if (secText) {
          gsap.from(secText, {
            y: 30,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bottomBlockRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
        }

        if (boxTag) {
          gsap.from(boxTag, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: boxTag,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }

        if (rows && rows.length > 0) {
          gsap.from(rows, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: boxTag || bottomBlockRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.generalSection}>
      <div className={styles.container}>
        <div ref={topBlockRef} className={styles.topBlock}>
          <p className={styles.introSummary} data-cms-field="introSummary">{introSummary}</p>

          <div className={styles.detailImageFlex}>
            <PdpScrubbedImage
              src={detailImages[0]}
              alt="Architectural Glass Detail 1"
              width="46%"
              height="380px"
              marginLeft="0%"
            />
            <PdpScrubbedImage
              src={detailImages[1]}
              alt="Architectural Glass Detail 2"
              width="48%"
              height="440px"
              marginLeft="4%"
              marginTop="-30px"
            />
          </div>
        </div>

        <div ref={bottomBlockRef} className={styles.bottomBlock}>
          <p className={styles.secondaryText} data-cms-field="secondaryText">{secondaryText}</p>

          <div className={styles.characteristicsBox}>
            <div className={styles.caratteristicheTag}>
              TECHNICAL SPECIFICATIONS & PERFORMANCE
            </div>

            {specs && specs.length > 0 ? (
              <div className={styles.specsTable}>
                {specs.map((spec, index) => (
                  <div key={index} className={styles.specTableRow}>
                    <div className={styles.specIconCol}>
                      {spec.icon ? (
                        <Image
                          src={spec.icon}
                          alt={spec.label || 'Specification icon'}
                          width={24}
                          height={24}
                          className={styles.specIconImg}
                          unoptimized={spec.icon.startsWith('http')}
                        />
                      ) : (
                        <div className={styles.specIconFallback} />
                      )}
                    </div>
                    <div className={styles.specLabelCol}>
                      <span className={styles.specLabel}>{spec.label}</span>
                    </div>
                    <div className={styles.specValueCol}>
                      <span className={styles.specValue}>{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className={styles.specList}>
                {characteristics.map((spec, index) => (
                  <li key={index} className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


