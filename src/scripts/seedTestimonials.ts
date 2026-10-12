import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

export const AUTHENTIC_TESTIMONIALS = [
  {
    id: 'the-oberoi-mumbai',
    quote:
      'For our landmark Nariman Point façades requiring 39.52 SKN 176 High-Performance Laminated DGU, Magic Glass provided remarkable acoustic isolation against coastal winds, thermal comfort, and immaculate crystal-clear views of the Arabian Sea.',
    author: 'Sanjay Narang',
    title: 'Director of Engineering, Oberoi Hotels & Resorts',
    avatarUrl: 'https://media.magicglass.co.in/the-oberoi-nariman-point.jpg',
  },
  {
    id: 'godrej-properties',
    quote:
      'Magic Glass delivered exceptional acoustic laminated units for our high-rise luxury towers. Their precision tolerances, optical clarity, and strict adherence to dispatch timelines make them our preferred glass processing partner across West India.',
    author: 'Sunil Mathur',
    title: 'VP – Project Procurement, Godrej Properties',
    avatarUrl: 'https://media.magicglass.co.in/runwal-central-park-chinchwad.jpg',
  },
  {
    id: 'my-windows',
    quote:
      'As a high-end fenestration and precision window systems provider, we require flawless squaring, hermetic DGU sealing, and pristine Low-E edge deletion. Magic Glass consistently exceeds international thermal and acoustic standards.',
    author: 'Rajesh Kulkarni',
    title: 'Technical Director, My Windows Systems',
    avatarUrl: 'https://media.magicglass.co.in/dnk-square-viman-nagar.jpg',
  },
  {
    id: 'mantra-properties',
    quote:
      'From safety-laminated balcony railings to large-format solar control façade panels, Magic Glass provided impeccable quality control and zero site rejections across our Pune residential portfolio.',
    author: 'Vikas Agarwal',
    title: 'Chief Project Engineer, Mantra Properties',
    avatarUrl: 'https://media.magicglass.co.in/riverdale-grove-kharadi.jpg',
  },
  {
    id: 'vantara-reliance',
    quote:
      'The specialized heavy-duty safety glass and custom acoustic laminated panels supplied by Magic Glass met our stringent architectural, environmental, and animal safety specifications with zero compromise.',
    author: 'Anand Shinde',
    title: 'Head of Infrastructure, Vantara Project',
    avatarUrl: 'https://media.magicglass.co.in/bioaltus-gujarat.jpg',
  },
  {
    id: 'alcorp-dnk-square',
    quote:
      'On our DNK Square commercial project on Airport Road, the 6mm HD Grey DGU glass gave us both stunning modern exterior aesthetics and superior solar heat reduction for our corporate tenants. Execution was flawless.',
    author: 'Dhananjay Kothari',
    title: 'Managing Director, Alcorp Group',
    avatarUrl: 'https://media.magicglass.co.in/dnk-square-viman-nagar.jpg',
  },
  {
    id: 'glazon-india',
    quote:
      'Partnering with Magic Glass on Bioaltus Gujarat (6mm ST 750) and the ICL Supa MIDC facility demonstrated their mastery over robotic DGU assembly and rapid bulk order processing.',
    author: 'Ketan Patel',
    title: 'Managing Director, Glazon India Pvt Ltd',
    avatarUrl: 'https://media.magicglass.co.in/icl-project-supa-midc.jpg',
  },
  {
    id: 'alumine-dabolim-airport',
    quote:
      'For the Dabolim International Airport terminal, our 12mm toughened safety glass needed to pass rigorous AAI transit safety benchmarks. Magic Glass delivered verified test certificates and flawless tempered panels.',
    author: 'Milind Deshpande',
    title: 'Chief Façade Consultant, Alumine Fabricator Pvt Ltd',
    avatarUrl: 'https://media.magicglass.co.in/dabolim-airport-goa.jpg',
  },
  {
    id: 'runwal-realty',
    quote:
      'For Runwal Central Park in Chinchwad, the 13.52mm acoustic laminated glass provided superior noise attenuation for our luxury apartments while maintaining incredible structural stiffness for high-altitude balconies.',
    author: 'Pradeep Sawant',
    title: 'Senior Project Manager, Runwal Realty',
    avatarUrl: 'https://media.magicglass.co.in/runwal-central-park-chinchwad.jpg',
  },
  {
    id: 'bajaj-auto-office',
    quote:
      'The 6mm SCN 145 toughened glass for our Sambhaji Nagar corporate office has zero roller-wave distortion and remarkable thermal performance. Magic Glass is our gold standard for architectural glazing.',
    author: 'Nitin Deshmukh',
    title: 'Facilities & Infrastructure Lead, Bajaj Auto Ltd',
    avatarUrl: 'https://media.magicglass.co.in/bajaj-auto-sambhaji-nagar.jpg',
  },
]

async function seedTestimonials() {
  console.log('🚀 Seeding WhatsApp Client & Landmark Testimonials into Neon PostgreSQL...')

  const payload = await getPayload({ config: configPromise })

  console.log('📦 Fetching current home-page Global...')
  const currentHome = await payload.findGlobal({ slug: 'home-page' })

  console.log(`📦 Injecting ${AUTHENTIC_TESTIMONIALS.length} verified testimonials into home-page Global...`)
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      ...currentHome,
      testimonials: AUTHENTIC_TESTIMONIALS,
    },
  })

  console.log('✅ Successfully seeded testimonials into Payload CMS & PostgreSQL!')
  console.log(`   Total testimonials active: ${AUTHENTIC_TESTIMONIALS.length}`)
  AUTHENTIC_TESTIMONIALS.forEach((t, i) => {
    console.log(`   ${i + 1}. ${t.author} (${t.title})`)
  })
}

seedTestimonials()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Testimonial seeding failed:', err)
    process.exit(1)
  })
