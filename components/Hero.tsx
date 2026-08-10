import { ArrowRight, Download } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { IconBadge } from './IconKit'
import { ThemeImage } from './ThemeImage'
import { focusItems } from '@/lib/content'

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
              Katie Kinkel
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display mt-4 max-w-xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              AI drafts. Human <span className="text-gradient">QA</span>. Better UX.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/75">
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
                className="btn-gradient inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download className="h-4 w-4" aria-hidden />
                View resume
              </a>
              <a
                href="#proof"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/85 dark:hover:text-white"
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
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:shadow-none"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 dark:bg-teal-glow/15">
                    <IconBadge name={item.icon} className="h-4 w-4 text-teal-600 dark:text-teal-glow" />
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
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
