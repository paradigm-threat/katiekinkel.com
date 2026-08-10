import { ArrowRight, Download, Linkedin } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { ThemeImage } from './ThemeImage'
import {
  aiResumePdf,
  availabilityLine,
  heroSubheadline,
  linkedinUrl,
  spotifyProofLine,
} from '@/lib/content'

export function Hero() {
  return (
    <section className="no-print web-only relative isolate min-h-[min(92dvh,900px)] overflow-hidden bg-[#eef3fb] text-slate-900 dark:bg-navy dark:text-white">
      <ThemeImage
        lightSrc="/assets/ai-network-background-light.png"
        darkSrc="/assets/ai-network-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right opacity-55 dark:opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#eef3fb] via-[#eef3fb]/92 to-[#eef3fb]/45 dark:from-navy dark:via-navy/90 dark:to-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e8eef8] via-transparent to-white/40 dark:from-navy/90 dark:to-navy/40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase dark:text-white/65">
              Katie Kinkel · Available for work
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display mt-4 max-w-xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              AI drafts. Human <span className="text-gradient">QA</span>. Better UX.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/75">
              {heroSubheadline}
            </p>
          </FadeIn>
          <FadeIn delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={aiResumePdf}
                download
                className="btn-gradient inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download AI QA Resume — PDF
              </a>
              <p className="max-w-xs text-xs font-medium leading-snug text-slate-500 dark:text-white/60">
                Available for work · {availabilityLine}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#hire"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                Hire Katie
              </a>
              <a
                href="#proof"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/85 dark:hover:text-white"
              >
                View projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0A66C2]/30 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/20 dark:bg-white/10 dark:text-white"
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" aria-hidden />
                LinkedIn
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.34}>
            <p className="mt-6 inline-flex max-w-xl items-center rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-800 dark:border-teal-glow/30 dark:bg-teal-glow/10 dark:text-teal-100">
              {spotifyProofLine}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.18} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-violet-300/50 via-sky-200/40 to-teal-200/50 blur-2xl dark:from-violet-glow/40 dark:via-sky-400/20 dark:to-teal-glow/40" />
            <ThemeImage
              lightSrc="/assets/katie-professional-cartoon-portrait.png"
              darkSrc="/assets/katie-professional-cartoon-portrait.png"
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
