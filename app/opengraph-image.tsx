import { ImageResponse } from 'next/og'

export const alt = 'Katie Kinkel — AI-fluent QA & operations generalist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: 'linear-gradient(135deg, #0f3d32 0%, #1a6b58 45%, #3d9b82 100%)',
          color: '#f4faf7',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.85 }}>
          katiekinkel.com
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Katie Kinkel
        </div>
        <div style={{ fontSize: 34, marginTop: 20, maxWidth: 900, opacity: 0.92, lineHeight: 1.3 }}>
          AI for every job companies need — with human QA that actually ships.
        </div>
      </div>
    ),
    { ...size },
  )
}
