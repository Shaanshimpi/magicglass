'use client'

import React from 'react'
import Image from 'next/image'

export interface ApplicationCardItem {
  id: string
  title: string
  subtitle: string
  specs: string
  description?: string
  image: string
}

interface ApplicationCardProps {
  item: ApplicationCardItem
  cardRef?: React.Ref<HTMLDivElement>
  cardClassName?: string
  imageWrapperClassName?: string
  overlayClassName?: string
  hoverDetailsOverlayClassName?: string
  viewBadgeText?: string
  ctaText?: string
  sizes?: string
  priority?: boolean
  stylesObj: Record<string, string>
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  item,
  cardRef,
  cardClassName = '',
  viewBadgeText = 'VIEW',
  ctaText = 'EXPLORE SYSTEM →',
  sizes = '(max-width: 900px) 100vw, 450px',
  priority = false,
  stylesObj,
}) => {
  const isRemoteImage = item.image.startsWith('http')

  return (
    <div ref={cardRef} className={`${stylesObj.collectionCard || ''} ${cardClassName}`}>
      <div className={stylesObj.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={isRemoteImage}
        />
        <div className={stylesObj.cardOverlay} />
        <h3 className={stylesObj.cardMainTitle}>{item.title}</h3>
        <div className={stylesObj.viewBadge}>{viewBadgeText}</div>

        <div className={stylesObj.hoverDetailsOverlay}>
          <div className={stylesObj.hoverContent}>
            <div>
              <span className={stylesObj.hoverCategory}>{item.subtitle}</span>
              <h4 className={stylesObj.hoverTitle}>{item.title}</h4>
              <p className={stylesObj.hoverSpecs}>{item.specs}</p>
            </div>
            {item.description && (
              <p className={stylesObj.hoverDescription}>{item.description}</p>
            )}
            <span className={stylesObj.hoverLink}>{ctaText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
