import React from 'react'
import styles from './ProjectsSkeleton.module.css'

interface ProjectsSkeletonProps {
  cardCount?: number
}

export const ProjectsSkeleton: React.FC<ProjectsSkeletonProps> = ({ cardCount = 6 }) => {
  return (
    <div className={styles.skeletonWrapper} aria-busy="true" aria-label="Loading projects portfolio">
      {/* 1. Hero Skeleton Section */}
      <section className={styles.heroSkeleton}>
        <div className={styles.heroBackground} />
        <div className={styles.heroContent}>
          <div className={`${styles.badgeSkeleton} ${styles.darkShimmerBox}`} />
          <div className={`${styles.titleSkeleton} ${styles.darkShimmerBox}`} />
          <div className={`${styles.taglineSkeleton} ${styles.darkShimmerBox}`} />
        </div>
        <div className={`${styles.controlsSkeleton} ${styles.darkShimmerBox}`} />
      </section>

      {/* 2. Filter Nav Skeleton */}
      <nav className={styles.filterNavSkeleton}>
        <div className={`${styles.navLabelSkeleton} ${styles.lightShimmerBox}`} />
        <div className={styles.filterGroupSkeleton}>
          <div className={`${styles.pillSkeleton} ${styles.lightShimmerBox}`} />
          <div className={`${styles.pillSkeleton} ${styles.lightShimmerBox}`} />
          <div className={`${styles.pillSkeleton} ${styles.lightShimmerBox}`} />
          <div className={`${styles.pillSkeleton} ${styles.lightShimmerBox}`} />
        </div>
      </nav>

      {/* 3. Grid Skeleton */}
      <section className={styles.gridSectionSkeleton}>
        <div className={styles.gridContainer}>
          {Array.from({ length: cardCount }).map((_, index) => (
            <div key={`project-skeleton-${index}`} className={styles.cardSkeleton}>
              <div className={`${styles.imageSkeleton} ${styles.lightShimmerBox}`} />
              <div className={styles.metaSkeleton}>
                <div className={`${styles.categorySkeleton} ${styles.lightShimmerBox}`} />
                <div className={`${styles.titleSkeletonCard} ${styles.lightShimmerBox}`} />
                <div className={`${styles.locationSkeleton} ${styles.lightShimmerBox}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
