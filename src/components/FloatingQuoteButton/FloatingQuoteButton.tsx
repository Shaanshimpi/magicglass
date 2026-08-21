'use client'

import React from 'react'
import styles from './FloatingQuoteButton.module.css'

interface FloatingQuoteButtonProps {
  onOpenQuoteDrawer: () => void
}

export const FloatingQuoteButton: React.FC<FloatingQuoteButtonProps> = ({
  onOpenQuoteDrawer,
}) => {
  return (
    <div className={styles.floatingContainer}>
      <button
        type="button"
        className={styles.floatingBtn}
        onClick={onOpenQuoteDrawer}
        aria-label="Request Technical Quote"
      >
        <span className={styles.iconDot} />
        <span>GET A QUOTE</span>
      </button>
    </div>
  )
}
