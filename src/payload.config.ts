import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Projects } from './collections/Projects'
import { Inquiries } from './collections/Inquiries'

import { HeaderGlobal } from './globals/HeaderGlobal'
import { FooterGlobal } from './globals/FooterGlobal'
import { QuoteDrawerGlobal } from './globals/QuoteDrawerGlobal'
import { HomePageGlobal } from './globals/HomePageGlobal'
import { AboutPageGlobal } from './globals/AboutPageGlobal'
import { ProductsPageGlobal } from './globals/ProductsPageGlobal'
import { IndustrySolutionPageGlobal } from './globals/IndustrySolutionPageGlobal'
import { InfrastructurePageGlobal } from './globals/InfrastructurePageGlobal'
import { ContactUsPageGlobal } from './globals/ContactUsPageGlobal'
import { ProjectsPageGlobal } from './globals/ProjectsPageGlobal'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const r2Bucket = process.env.R2_BUCKET_NAME || 'magicglassmedia'
const r2Endpoint = process.env.R2_ENDPOINT || 'https://e8946ac9629a61bbcaf129fe511e6976.r2.cloudflarestorage.com'
const r2AccessKey = process.env.R2_ACCESS_KEY_ID || 'f5b19787302bb8af2fc4e6f7ec6b268c'
const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY || '73ec9aac097a21ed10bd35d829bb51351524976e9d5eeb726ba7dd121e70c1a9'
const r2PublicUrl = process.env.R2_PUBLIC_URL || 'https://media.magicglass.co.in'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Projects, Inquiries],
  globals: [
    HeaderGlobal,
    FooterGlobal,
    QuoteDrawerGlobal,
    HomePageGlobal,
    AboutPageGlobal,
    ProductsPageGlobal,
    ProjectsPageGlobal,
    IndustrySolutionPageGlobal,
    InfrastructurePageGlobal,
    ContactUsPageGlobal,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            return `${r2PublicUrl}/${prefix ? `${prefix}/` : ''}${filename}`
          },
        },
      },
      bucket: r2Bucket,
      config: {
        endpoint: r2Endpoint,
        credentials: {
          accessKeyId: r2AccessKey,
          secretAccessKey: r2SecretKey,
        },
        region: 'auto',
        forcePathStyle: true,
      },
      disableLocalStorage: true,
    }),
  ],
})
