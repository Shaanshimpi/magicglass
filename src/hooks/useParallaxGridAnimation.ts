'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxConfig {
  desktopRef: React.RefObject<HTMLElement | null>
  mobileSectionRef?: React.RefObject<HTMLElement | null>
  mobilePinRef: React.RefObject<HTMLDivElement | null>
  row1CardRef?: React.RefObject<HTMLDivElement | null>
  row1TextRef?: React.RefObject<HTMLDivElement | null>
  row2Card1Ref?: React.RefObject<HTMLDivElement | null>
  row2Card2Ref?: React.RefObject<HTMLDivElement | null>
  row2Card3Ref?: React.RefObject<HTMLDivElement | null>
  row3Card1Ref?: React.RefObject<HTMLDivElement | null>
  row3Card2Ref?: React.RefObject<HTMLDivElement | null>
  mobileCardCount: number
}

export function useParallaxGridAnimation({
  desktopRef,
  mobileSectionRef,
  mobilePinRef,
  row1CardRef,
  row1TextRef,
  row2Card1Ref,
  row2Card2Ref,
  row2Card3Ref,
  row3Card1Ref,
  row3Card2Ref,
  mobileCardCount,
}: ParallaxConfig) {
  const mobileTileRefs = useRef<(HTMLDivElement | null)[]>([])

  // Helper function to set ref array elements safely
  const setMobileTileRef = (index: number) => (el: HTMLDivElement | null) => {
    mobileTileRefs.current[index] = el
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    // -------------------------------------------------------------------------
    // DESKTOP ANIMATION (> 900px): 3-Row Parallax Grid
    // -------------------------------------------------------------------------
    mm.add('(min-width: 901px)', () => {
      if (desktopRef.current) {
        if (row1CardRef?.current) {
          gsap.to(row1CardRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: desktopRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
        if (row1TextRef?.current) {
          gsap.to(row1TextRef.current, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: desktopRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }

        if (row2Card1Ref?.current) {
          gsap.to(row2Card1Ref.current, {
            y: -75,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          })
        }
        if (row2Card2Ref?.current) {
          gsap.to(row2Card2Ref.current, {
            y: 35,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        }
        if (row2Card3Ref?.current) {
          gsap.to(row2Card3Ref.current, {
            y: -105,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card3Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.1,
            },
          })
        }

        if (row3Card1Ref?.current) {
          gsap.to(row3Card1Ref.current, {
            y: -85,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          })
        }
        if (row3Card2Ref?.current) {
          gsap.to(row3Card2Ref.current, {
            y: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.7,
            },
          })
        }
      }
    })

    // -------------------------------------------------------------------------
    // MOBILE ANIMATION (<= 900px): Pinned Diagonal Scale Scene
    // -------------------------------------------------------------------------
    mm.add('(max-width: 900px)', () => {
      const triggerEl = mobileSectionRef?.current || mobilePinRef.current
      if (triggerEl && mobilePinRef.current && mobileCardCount > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top top',
            end: `+=${mobileCardCount * 90}%`,
            pin: mobilePinRef.current,
            scrub: 1,
          },
        })

        // Initial setup for mobile cards
        mobileTileRefs.current.forEach((card, i) => {
          if (!card) return
          if (i === 0) {
            gsap.set(card, {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              transformOrigin: 'bottom right',
            })
          } else {
            gsap.set(card, {
              xPercent: 75,
              yPercent: 75,
              scale: 0.2,
              opacity: 0,
              transformOrigin: 'bottom right',
            })
          }
        })

        for (let i = 0; i < mobileCardCount - 1; i++) {
          const currentCard = mobileTileRefs.current[i]
          const nextCard = mobileTileRefs.current[i + 1]

          if (currentCard && nextCard) {
            tl.to(
              currentCard,
              {
                xPercent: -40,
                yPercent: -40,
                scale: 0.75,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            ).to(
              nextCard,
              {
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            )
          }
        }
      }
    })

    return () => mm.revert()
  }, [mobileCardCount, desktopRef, mobilePinRef, row1CardRef, row1TextRef, row2Card1Ref, row2Card2Ref, row2Card3Ref, row3Card1Ref, row3Card2Ref])

  return { setMobileTileRef }
}
