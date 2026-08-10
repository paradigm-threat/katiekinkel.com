import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { IconBadge } from './IconKit'
import { focusItems } from '@/lib/content'

export function Hero() {
  return (
    <section className="no-print web-only relative isolate min-h-[min(94dvh,920px)] overflow-hidden bg-navy text-white">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.28em] text-white/70 uppercase">
              Katie Kinkel
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display mt-4 max-w-xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Turning AI into <span className="text-gradient">real-world</span> impact.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Ex-Spotify Creative Support &amp; QA Buddy. Passionate about using Cursor, Copilot,
              and ChatGPT to organize, research, prototype, and ship — with human review on every
              deliverable.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/Katie-Kinkel-Resume.pdf"
                download
                className="btn-gradient inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
              >
                <Download className="h-4 w-4" aria-hidden />
                View resume
              </a>
              <a
                href="#proof"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
              >
                View projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="lg:justify-self-end">
          <aside className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy-card/80 p-5 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-semibold text-white/90">Current focus:</p>
            <ul className="mt-4 space-y-3">
              {focusItems.map((item) => (
                <li key={item.title} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-glow/30 bg-teal-glow/10">
                    <IconBadge name={item.icon} className="icon-glow h-4 w-4" />
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          </aside>
        </FadeIn>
      </div>
    </section>
  )
}
