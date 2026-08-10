import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Katie Kinkel',
    short_name: 'Katie Kinkel',
    description:
      'AI-fluent QA & operations generalist — Cursor, Copilot, ChatGPT, with human review.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4faf7',
    theme_color: '#3b7a68',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
