import type { Metadata, Viewport } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BrowserAiProviders } from '@/components/BrowserAiProviders'
import { JsonLd } from '@/components/JsonLd'
import { baseMetadata } from '@/lib/seo'
import './globals.css'

const display = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const body = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const webmcpOt = process.env.NEXT_PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {webmcpOt ? <meta httpEquiv="origin-trial" content={webmcpOt} /> : null}
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <BrowserAiProviders>{children}</BrowserAiProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
