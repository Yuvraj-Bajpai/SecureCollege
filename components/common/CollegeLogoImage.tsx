'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CollegeLogoImageProps {
  src: string | null
  alt: string
  className?: string
  fill?: boolean
}

export function CollegeLogoImage({ src, alt, className = '', fill = false }: CollegeLogoImageProps) {
  const [logoSrc, setLogoSrc] = useState(src || '/images/logo-dark.png')

  if (fill) {
    return (
      <Image
        src={logoSrc}
        alt={alt}
        fill
        className={className}
        onError={() => setLogoSrc('/images/logo-dark.png')}
      />
    )
  }

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={96}
      height={96}
      className={className}
      onError={() => setLogoSrc('/images/logo-dark.png')}
    />
  )
}

