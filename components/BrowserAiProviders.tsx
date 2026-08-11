'use client'

import { BrowserAiDemo } from '@/components/BrowserAiDemo'

/** Client mount for WebMCP + Prompt API demo (progressive enhancement). */
export function BrowserAiProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BrowserAiDemo />
    </>
  )
}
