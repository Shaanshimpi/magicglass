import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '85vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-taupe)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        className="base-title"
        style={{ color: 'var(--color-crimson)', marginBottom: '1.25rem' }}
      >
        ◆ 404 — PAGE NOT FOUND
      </div>
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: 'var(--color-cream)',
          marginBottom: '1rem',
          maxWidth: '22ch',
        }}
      >
        The requested glass specification page does not exist.
      </h1>
      <p style={{ maxWidth: '500px', marginBottom: '2.5rem', opacity: 0.85 }}>
        The architectural product or route you are looking for may have been relocated or updated in our catalog.
      </p>
      <Link href="/" className="button--red">
        ↳ RETURN TO HOMEPAGE
      </Link>
    </div>
  )
}
