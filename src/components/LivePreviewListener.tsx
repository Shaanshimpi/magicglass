'use client'

import { useEffect } from 'react'

export const LivePreviewListener: React.FC = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'MAGIC_GLASS_CMS_PREVIEW_UPDATE') {
        const { fieldPath, value } = event.data
        if (!fieldPath) return

        // Direct DOM update for live visual feedback in preview mode
        const targetElement = document.querySelector(`[data-cms-field="${fieldPath}"]`)
        if (targetElement) {
          targetElement.textContent = value
          targetElement.classList.add('cms-field-highlight')
          setTimeout(() => {
            targetElement.classList.remove('cms-field-highlight')
          }, 1000)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return null
}
