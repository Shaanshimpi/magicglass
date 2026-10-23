import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'magicglass.co.in',
      },
      {
        protocol: 'https',
        hostname: 'media.magicglass.co.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/images/products/details/FURNITURE.png',
        destination: '/images/products/details/furniture.png',
      },
      {
        source: '/images/products/details/HIGH-RISE-BUILDINGS.png',
        destination: '/images/products/details/high-rise-buildings.png',
      },
      {
        source: '/images/products/details/FACADES-REFLECTIVE-GLASS.png',
        destination: '/images/products/details/facades-reflective.png',
      },
      {
        source: '/images/products/details/INTERIOR-DECOR.png',
        destination: '/images/products/details/interiors.png',
      },
      {
        source: '/images/products/details/INTERIOR-DECOR-1.png',
        destination: '/images/products/details/interiors.png',
      },
      {
        source: '/images/products/details/OVERHEAD-SPACES-1.png',
        destination: '/images/apps/overhead-spaces.png',
      },
      {
        source: '/images/products/details/RAILINGS-STAIRCASE-AND-PARTITIONS-2.png',
        destination: '/images/products/details/railings-staircase-partitions.png',
      },
      {
        source: '/images/projects/soliatre-business-hub.jpg',
        destination: '/images/projects/solitaire-business-hub.jpg',
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
