import React from 'react'

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b1012',
        color: '#ffffff',
        gap: '1.75rem',
      }}
    >
      {/* Centered M Emblem with Orbiting Buffer Spinner */}
      <div
        style={{
          position: 'relative',
          width: '104px',
          height: '104px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Orbiting Circular Buffer Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderTopColor: '#e30016',
            borderRightColor: 'rgba(227, 0, 22, 0.5)',
            animation: 'bufferSpin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            boxShadow: '0 0 28px rgba(227, 0, 22, 0.25)',
          }}
        />

        {/* Magic Glass Stylized 'M' Emblem */}
        <div
          style={{
            width: '50px',
            height: '62px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'emblemPulse 2s ease-in-out infinite',
            zIndex: 2,
          }}
        >
          <svg
            viewBox="71.8 145.7 76 94"
            width="50"
            height="62"
            style={{ overflow: 'visible' }}
          >
            {/* White Wing of M */}
            <path
              style={{ fill: '#ffffff', fillRule: 'evenodd' }}
              d="m 115.1734,186.0385 v 18.0232 l 17.0469,-14.0949 v 29.5015 h 14.2783 v -57.852 z"
            />
            {/* Red Geometric Facet of M */}
            <path
              style={{ fill: '#e30016', fillRule: 'evenodd' }}
              d="m 83.8103,161.6163 v 57.852 h 14.2705 v -29.5015 l 17.0926,14.0949 v 16.0854 l -41.9953,18.3055 v -91.4117 l 41.9953,19.0679 v 19.9296 z"
            />
          </svg>
        </div>
      </div>

      {/* Refined Tracked Brand Wordmark */}
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.85)',
          fontWeight: 600,
          textAlign: 'center',
          paddingLeft: '0.28em',
        }}
      >
        MAGIC GLASS
      </div>

      <style>{`
        @keyframes bufferSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes emblemPulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 16px rgba(227, 0, 22, 0.55)); }
        }
      `}</style>
    </div>
  )
}
