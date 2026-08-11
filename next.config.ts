import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // WebMCP tools Permission-Policy defaults to self; be explicit.
          { key: 'Permissions-Policy', value: 'tools=(self)' },
        ],
      },
    ]
  },
}

export default nextConfig
