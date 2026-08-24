export type ProjectCategory = 'ALL' | 'Residential' | 'Commercial' | 'Airports'

export interface ProjectItem {
  id: string
  title: string
  category: 'Residential' | 'Commercial' | 'Airports'
  developer: string
  location: string
  application: string
  glassDescription: string
  areaSqMtr: number | null
  image: string
  heroFeatured: boolean
  tagline: string
}
