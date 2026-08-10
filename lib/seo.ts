import type { Metadata } from 'next'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://katiekinkel.com'

export const SITE_NAME = 'Katie Kinkel'
export const SITE_TITLE = 'Katie Kinkel | Turning AI into real-world impact'
export const SITE_DESCRIPTION =
  'Ex-Spotify Creative Support QA Buddy. AI-fluent generalist for research, organization, prototyping, and human review that turns drafts into reliable work.'

export function absoluteUrl(path = '/'): string {
  if (path === '/' || path === '') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Katie Kinkel',
    'AI tools',
    'QA',
    'Spotify',
    'Cursor',
    'GitHub Copilot',
    'ChatGPT',
    'operations',
    'resume',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}
