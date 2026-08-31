import React from 'react'
import { ContactUsContent } from '@/components/ContactUs/ContactUsContent'
import { getContactUsCmsData } from '@/lib/cms'

export const metadata = {
  title: 'Contact Us | Magic Glass',
  description: 'Get in touch with Magic Glass. Factory address, contact numbers, email support, and location map.',
}

export default async function ContactUsPage() {
  const cmsData = await getContactUsCmsData()
  return <ContactUsContent cmsData={cmsData} />
}
