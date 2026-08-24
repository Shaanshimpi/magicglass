import React from 'react'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll'
import { ClientLayoutShell } from '@/components/Shell/ClientLayoutShell'
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

export const metadata = {
  title: 'Magic Glass — Architectural Glass Engineering',
  description: 'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <SmoothScroll>
          <ClientLayoutShell>{children}</ClientLayoutShell>
        </SmoothScroll>
      </body>
    </html>
  )
}


