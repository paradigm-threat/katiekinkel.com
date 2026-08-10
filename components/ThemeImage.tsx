'use client'

import Image, { type ImageProps } from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeImageProps = Omit<ImageProps, 'src'> & {
  lightSrc: string
  darkSrc: string
}

/** Swap asset by resolved theme; defaults to lightSrc before mount to avoid FOUC flash on light. */
export function ThemeImage({ lightSrc, darkSrc, alt, className, ...props }: ThemeImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const src = mounted && resolvedTheme === 'dark' ? darkSrc : lightSrc

  return <Image src={src} alt={alt} className={className} {...props} />
}
