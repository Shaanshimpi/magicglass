import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  plugins: [],
})
