import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: { height: 50 },
    md: { height: 84 },
    lg: { height: 90 },
    xl: { height: 168 },
  }

  return (
    <Link href="/" className={`inline-block ${className} rounded-lg p-2 transition-all duration-300 hover:shadow-[0_0_22px_rgba(107,158,255,0.45)]`}>
      {/* Light theme logo */}
      <Image 
        src="/images/logo.png" 
        alt="Secure College - Find Your Perfect Engineering College" 
        width={sizes[size].height * 2}
        height={sizes[size].height}
        style={{ width: 'auto', height: sizes[size].height, objectFit: 'contain' }}
        className="object-contain h-full dark:hidden" 
        priority 
        quality={100}
        unoptimized={true}
      />
      {/* Dark theme logo */}
      <Image 
        src="/images/logo-dark.png" 
        alt="Secure College - Find Your Perfect Engineering College" 
        width={sizes[size].height * 2}
        height={sizes[size].height}
        style={{ width: 'auto', height: sizes[size].height, objectFit: 'contain' }}
        className="object-contain h-full hidden dark:block" 
        priority 
        quality={100}
        unoptimized={true}
      />
    </Link>
  )
}

