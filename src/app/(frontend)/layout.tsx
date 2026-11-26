import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll'
import { ClientLayoutShell } from '@/components/Shell/ClientLayoutShell'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getHeaderCmsData, getFooterCmsData, getQuoteDrawerCmsData } from '@/lib/cms'
import './styles.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0b1012',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magicglass.co.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Magic Glass — Architectural Glass Engineering & Processing',
    template: '%s | Magic Glass',
  },
  description:
    'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass for commercial and residential developments.',
  applicationName: 'Magic Glass',
  authors: [{ name: 'Magic Glass Private Limited', url: siteUrl }],
  creator: 'Magic Glass Private Limited',
  publisher: 'Magic Glass Private Limited',
  keywords: [
    'Magic Glass',
    'Architectural Glass Pune',
    'Toughened Glass Manufacturer',
    'DGU Insulated Glass',
    'Sentry Laminated Glass',
    'Low-E Glass Processing',
    'Ceramic Fritted Glass',
    'Glass Facade Engineering',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Magic Glass',
    title: 'Magic Glass — Architectural Glass Engineering & Processing',
    description:
      'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass.',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Magic Glass Architectural Processing Facility and Installations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magic Glass — Architectural Glass Engineering & Processing',
    description:
      'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass.',
    images: ['/images/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const [headerData, footerData, quoteDrawerData] = await Promise.all([
    getHeaderCmsData(),
    getFooterCmsData(),
    getQuoteDrawerCmsData(),
  ])

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('magicglass_loader_shown')==='true'){document.documentElement.classList.add('loader-complete');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <LivePreviewListener />
          <ClientLayoutShell
            headerCmsData={headerData}
            footerCmsData={footerData}
            quoteDrawerCmsData={quoteDrawerData}
          >
            {children}
          </ClientLayoutShell>
        </SmoothScroll>
      </body>
    </html>
  )
}


