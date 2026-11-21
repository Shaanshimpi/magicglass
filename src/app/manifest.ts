import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Magic Glass — Architectural Glass Engineering',
    short_name: 'Magic Glass',
    description:
      'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1012',
    theme_color: '#0b1012',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
