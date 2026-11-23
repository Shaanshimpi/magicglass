import React from 'react'
import { ProjectsSkeleton } from '@/components/Projects/ProjectsSkeleton'

export default function ProjectsLoading() {
  return <ProjectsSkeleton cardCount={6} />
}
