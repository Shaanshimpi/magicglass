'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FiX, FiSearch, FiCheck, FiImage } from 'react-icons/fi'

interface MediaItem {
  name: string
  url: string
  category: 'General' | 'Applications' | 'Projects' | 'Craftsmanship' | 'Leadership'
}

const PRESET_MEDIA_LIBRARY: MediaItem[] = [
  // General & Hero
  { name: 'Hero Background Facade', url: '/images/hero-bg.jpg', category: 'General' },
  { name: 'Magic Glass Official Logo', url: '/images/logo.png', category: 'General' },
  { name: 'Factory CNC Processing Plant', url: '/images/factory-cnc.jpg', category: 'General' },
  { name: 'Structural Glazing System', url: '/images/prod-structural.jpg', category: 'General' },
  { name: 'Interior Glass Partitions', url: '/images/prod-partitions.jpg', category: 'General' },
  { name: 'Windows & Facades Glazing', url: '/images/prod-windows.jpg', category: 'General' },
  { name: 'Safety & Processing Glass', url: '/images/prod-additional.jpg', category: 'General' },

  // Applications
  { name: 'Railings & Frameless Doors', url: '/images/apps/railings.png', category: 'Applications' },
  { name: 'Windows & DGU Glazing', url: '/images/apps/windows.png', category: 'Applications' },
  { name: 'Overhead Roof Skylights', url: '/images/apps/roof.png', category: 'Applications' },
  { name: 'Overhead Spider Spaces', url: '/images/apps/overhead-spaces.png', category: 'Applications' },
  { name: 'Panoramic Glass Lifts', url: '/images/apps/glass-lifts.png', category: 'Applications' },
  { name: 'Acoustic Soundproof Partitions', url: '/images/apps/partition.png', category: 'Applications' },

  // Craftsmanship
  { name: 'Cleanroom Lamination & Autoclave', url: '/images/craft-laminated.jpg', category: 'Craftsmanship' },
  { name: 'Robotic DGU Spacer Assembly', url: '/images/craft-dgu.jpg', category: 'Craftsmanship' },
  { name: 'Ceramic Screen-Printed Frit', url: '/images/craft-ceramic.jpg', category: 'Craftsmanship' },

  // Leadership
  { name: 'Manik Kodre (Managing Director)', url: 'https://magicglass.co.in/wp-content/uploads/2025/04/Manik-Kodre.png', category: 'Leadership' },
  { name: 'Anup Kodre (Marketing & Finance)', url: 'https://magicglass.co.in/wp-content/uploads/2025/04/Anup-Kodre.png', category: 'Leadership' },
  { name: 'Nitish Kodre (Operations & R&D)', url: 'https://magicglass.co.in/wp-content/uploads/2025/04/Nitish-Kodre.png', category: 'Leadership' },

  // Projects
  { name: 'Balmoral by Riverside', url: '/images/projects/balmoral-by-riverside.jpg', category: 'Projects' },
  { name: 'The Ark', url: '/images/projects/the-ark.jpg', category: 'Projects' },
  { name: 'Verde Luxury Residence', url: '/images/projects/verde.jpg', category: 'Projects' },
  { name: 'Goa International Airport', url: '/images/projects/goa-airport.jpg', category: 'Projects' },
  { name: 'Pune Airport New Terminal', url: '/images/projects/pune-airport.jpg', category: 'Projects' },
  { name: 'Solitaire Business Hub', url: '/images/projects/solitaire-business-hub.jpg', category: 'Projects' },
  { name: 'Nyati Empress', url: '/images/projects/nyati-empress.jpg', category: 'Projects' },
  { name: 'Ganga Platino', url: '/images/projects/ganga-platino.jpg', category: 'Projects' },
  { name: 'Atrium Mall Commercial', url: '/images/projects/atrium-mall.jpg', category: 'Projects' },
  { name: 'Eon Homes', url: '/images/projects/eon-homes.jpg', category: 'Projects' },
  { name: 'Apostrophe', url: '/images/projects/apostrophe.jpg', category: 'Projects' },
]

interface MediaPickerModalProps {
  isOpen: boolean
  currentValue: string
  onSelect: (url: string) => void
  onClose: () => void
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  currentValue,
  onSelect,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [customUrlInput, setCustomUrlInput] = useState<string>(currentValue || '')
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)

  if (!isOpen) return null

  const categories = ['All', 'General', 'Applications', 'Craftsmanship', 'Leadership', 'Projects']

  const filteredMedia = PRESET_MEDIA_LIBRARY.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSelect = (url: string) => {
    onSelect(url)
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          height: '85vh',
          maxHeight: '780px',
          backgroundColor: '#0a0e12',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          borderRadius: '14px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'rgba(197, 168, 128, 0.15)',
                color: '#c5a880',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiImage size={18} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                Media Library & Visual Assets
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Select an image from the library or specify a custom path
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '18px',
              width: 32,
              height: 32,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <FiX />
          </button>
        </div>

        {/* Search & Category Filter Pills */}
        <div
          style={{
            padding: '14px 22px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#0d1117',
            flexShrink: 0,
          }}
        >
          {/* Search bar */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiSearch
              style={{
                position: 'absolute',
                left: 14,
                color: '#64748b',
                fontSize: 14,
              }}
            />
            <input
              type="text"
              placeholder="Search images by name or file path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid #c5a880' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: activeCategory === cat ? 'rgba(197, 168, 128, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat ? '#f8fafc' : '#94a3b8',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Non-overlapping Square Media Tiles Grid */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: '20px 22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px',
            background: '#070a0d',
            alignContent: 'start',
          }}
        >
          {filteredMedia.map((item) => {
            const isSelected = currentValue === item.url
            const isHovered = hoveredUrl === item.url

            return (
              <div
                key={item.url}
                onClick={() => handleSelect(item.url)}
                onMouseEnter={() => setHoveredUrl(item.url)}
                onMouseLeave={() => setHoveredUrl(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {/* 1:1 Square Image Container with real calculated height */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '10px',
                    border: isSelected
                      ? '2px solid #c5a880'
                      : isHovered
                      ? '1px solid rgba(197, 168, 128, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    backgroundColor: '#111827',
                    boxShadow: isSelected
                      ? '0 0 16px rgba(197, 168, 128, 0.45)'
                      : isHovered
                      ? '0 6px 16px rgba(0, 0, 0, 0.6)'
                      : '0 2px 6px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.2s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="160px"
                    style={{
                      objectFit: 'cover',
                      objectPosition: item.category === 'Leadership' ? 'top center' : 'center',
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                    unoptimized={item.url.startsWith('http')}
                  />

                  {/* Selected Checkmark Badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        background: '#c5a880',
                        color: '#000',
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
                        zIndex: 3,
                      }}
                    >
                      <FiCheck size={13} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Clear text label beneath the square */}
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: isSelected ? '#c5a880' : isHovered ? '#f8fafc' : '#94a3b8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.3,
                    padding: '0 2px',
                    transition: 'color 0.2s ease',
                  }}
                  title={item.name}
                >
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom URL & Direct Path Footer */}
        <div
          style={{
            padding: '14px 22px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#0d1117',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
              Custom URL / Path:
            </span>
            <input
              type="text"
              placeholder="/images/example.jpg or https://..."
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '12px',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => handleSelect(customUrlInput)}
            disabled={!customUrlInput.trim()}
            style={{
              padding: '8px 18px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #c5a880, #9f825b)',
              color: '#000',
              fontWeight: 600,
              fontSize: '12px',
              cursor: customUrlInput.trim() ? 'pointer' : 'not-allowed',
              opacity: customUrlInput.trim() ? 1 : 0.5,
              transition: 'opacity 0.2s ease',
            }}
          >
            Apply URL
          </button>
        </div>
      </div>
    </div>
  )
}
