'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PdpScrubbedImage.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const DEFAULT_FALLBACK_IMG =
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'

interface PdpScrubbedImageProps {
  src: string
  alt: string
  width?: string
  height?: string
  marginLeft?: string
  marginTop?: string
  className?: string
  fallbackSrc?: string
}

export const PdpScrubbedImage: React.FC<PdpScrubbedImageProps> = ({
  src,
  alt,
  width = '100%',
  height = '420px',
  marginLeft = '0px',
  marginTop = '0px',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK_IMG,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    setImgSrc(src || fallbackSrc)
    setHasError(false)
  }, [src, fallbackSrc])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Single clean GSAP animation:
      // - onEnter (scrolling down): scrub scale from 0.82 -> 1.0 until top reaches screen center (top 50%)
      // - onLeave (scrolling past center/top): stays at 1.0 (no exit scale down!)
      // - onLeaveBack (scrolling up past screen bottom): scrub scale from 1.0 back -> 0.82
      gsap.fromTo(
        containerRef.current,
        {
          scale: 0.82,
          opacity: 0.4,
          filter: 'blur(3px)',
        },
        {
          scale: 1.0,
          opacity: 1.0,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom', // top of image enters screen bottom
            end: 'top 50%',     // completes scaling when top reaches screen center
            scrub: 0.8,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.scrubbedContainer} ${className}`}
      style={{
        width,
        height,
        marginLeft,
        marginTop,
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={styles.scrubbedImage}
        sizes="(max-width: 768px) 100vw, 600px"
        onError={handleError}
        unoptimized={imgSrc.startsWith('http://')}
      />
    </div>
  )
}
