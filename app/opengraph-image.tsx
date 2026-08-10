import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const alt = 'Katie Kinkel — AI drafts, human QA, better UX'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const portraitPath = path.join(
    process.cwd(),
    'public/assets/katie-professional-cartoon-portrait-square.png',
  )
  const portraitData = await readFile(portraitPath)
  const portraitSrc = `data:image/png;base64,${portraitData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(135deg, #0b1220 0%, #1a1440 45%, #0f3d3a 100%)',
          color: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.8 }}>
            katiekinkel.com
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
            Katie Kinkel
          </div>
          <div style={{ fontSize: 30, marginTop: 18, opacity: 0.92, lineHeight: 1.3 }}>
            AI drafts. Human QA. Better UX.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitSrc}
          width={280}
          height={280}
          alt=""
          style={{ borderRadius: 999, boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}
        />
      </div>
    ),
    { ...size },
  )
}
