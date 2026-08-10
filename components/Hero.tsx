import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { IconBadge } from './IconKit'
import { focusItems } from '@/lib/content'

export function Hero() {
  return (
    <section className="no-print web-only relative isolate min-h-[min(92dvh,900px)] overflow-hidden bg-navy text-white">
      <Image
        src="/assets/ai-network-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.28em] text-white/65 uppercase">
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
              Ex-Spotify Creative Support &amp; QA Buddy with a passion for solving messy problems,
              building with Cursor / Copilot / ChatGPT, and shipping outcomes that hold up under
              human review.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/Katie-Kinkel-Resume.pdf"
                download
                className="btn-gradient inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
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

          <FadeIn delay={0.3}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {focusItems.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/80 backdrop-blur-sm"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-glow/15">
                    <IconBadge name={item.icon} className="icon-glow h-4 w-4" />
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn delay={0.18} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-violet-glow/40 via-sky-400/20 to-teal-glow/40 blur-2xl" />
            <Image
              src="/assets/katie-professional-cartoon-portrait.png"
              alt="Illustrated portrait of Katie Kinkel"
              width={420}
              height={420}
              priority
              className="relative h-auto w-[min(100%,420px)] drop-shadow-2xl"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
