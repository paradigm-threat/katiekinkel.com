import Image from 'next/image'
import { Briefcase, Linkedin } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { BrandMark, IconBadge, toolLogos } from './IconKit'
import { ThemeImage } from './ThemeImage'
import {
  capabilities,
  caseStudies,
  email,
  evaluationCriteria,
  highlights,
  linkedinUrl,
  missionQuote,
  siteStack,
  siteStackQuip,
  skillTags,
  surfaces,
  techFocus,
  valueCards,
  values,
} from '@/lib/content'

export function Evaluation() {
  return (
    <section
      id="evaluation"
      className="no-print web-only scroll-mt-24 border-b border-border/70 bg-background py-16"
      aria-labelledby="evaluation-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2
            id="evaluation-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            AI Evaluation
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            What Katie evaluates on every model draft — before anything ships.
          </p>
        </FadeIn>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {evaluationCriteria.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.03}>
              <li className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ValueCards() {
  return (
    <section
      className="no-print web-only relative z-10 px-4 py-12 sm:px-6"
      aria-labelledby="values-heading"
    >
      <h2 id="values-heading" className="sr-only">
        Hire focus areas
      </h2>
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {valueCards.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.06}>
            <article className="card-surface flex h-full flex-col rounded-2xl p-5 shadow-xl transition duration-300 hover:-translate-y-1">
              <ThemeImage
                lightSrc={item.lightImage}
                darkSrc={item.darkImage}
                alt=""
                width={160}
                height={120}
                className="mx-auto h-24 w-auto object-contain"
              />
              <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export function SpotifyProofStrip() {
  return (
    <section className="no-print web-only border-y border-border/70 bg-secondary/40 py-8" aria-label="Spotify QA proof">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Spotify Support / QA experience
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Via 24-7 Intouch: QA audits, alignments, nesting assistance, Guru process feedback,
            LIO &amp; Marquee ROTAs, and the CrS Phoenix Hub — 3+ years Creative Support / QA Buddy.
          </p>
        </div>
        <a
          href="#proof"
          className="shrink-0 text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          See case studies →
        </a>
      </div>
    </section>
  )
}

export function SkillsTools() {
  return (
    <section id="models" className="no-print web-only scroll-mt-24 py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <FadeIn>
              <h2 id="skills-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Skills &amp; tools
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Skill-first: evaluation, judgment, QA, research, operations, and communication.
                Surfaces Katie works in daily: {surfaces.join(' · ')}. Model families stay
                unversioned because tools rotate; QA judgment does not. Below: the stack this site
                runs on — literacy for the car she&apos;s driving, not a solo-engineer claim.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <ul className="mt-10 flex flex-wrap gap-6">
                {toolLogos.map((tool) => (
                  <li key={tool.label} className="flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm dark:bg-card">
                      <BrandMark name={tool.name} className="h-7 w-7" />
                    </span>
                    <span className="max-w-[7rem] text-center text-xs font-medium text-muted-foreground">
                      {tool.label}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 inline-flex rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-medium text-muted-foreground">
                Spotify Support / QA via 24-7 Intouch
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {skillTags.map((tag) => (
                  <li
                    key={tag.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 text-sm font-medium shadow-sm dark:bg-card"
                  >
                    <IconBadge name={tag.icon} className="h-4 w-4 text-primary" />
                    {tag.label}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <aside className="rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm dark:bg-card">
              <p className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                Capability focus
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {techFocus.map((item) => (
                  <li
                    key={item.label}
                    className="inline-flex items-center gap-2.5 rounded-full bg-navy px-4 py-2.5 text-sm font-medium text-white shadow-sm dark:bg-slate-900"
                  >
                    <IconBadge name={item.icon} className="h-4 w-4 text-sky-300" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </aside>
          </FadeIn>
        </div>

        <FadeIn delay={0.14}>
          <div
            id="stack"
            className="mt-12 scroll-mt-24 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
              Under the hood · this site
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {siteStackQuip} Naming the pieces is stack literacy for AI QA — not a claim that Katie
              engineers the chassis alone.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteStack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-secondary/70 px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function Workflow() {
  return (
    <section id="ai" className="no-print web-only scroll-mt-24 border-y border-border/70 bg-secondary/35 py-16" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 id="workflow-heading" className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How I work with AI
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Brief → draft → QA → UX. AI speeds the first pass; Katie&apos;s review is the reliability
            gate for clarity, accuracy, and usable experience.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-white p-4 shadow-sm sm:p-8 dark:bg-card">
            <Image
              src="/assets/ai-workflow-brief-draft-qa-ux.png"
              alt="Workflow: Brief to Draft to QA to UX"
              width={1400}
              height={440}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.16}>
          <blockquote className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/15 bg-white px-6 py-8 text-center text-lg leading-relaxed text-foreground shadow-sm sm:text-xl dark:bg-card">
            “{missionQuote}”
          </blockquote>
        </FadeIn>
      </div>
    </section>
  )
}

export function WhatIBring() {
  return (
    <section className="no-print web-only py-20" aria-labelledby="bring-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 id="bring-heading" className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What I bring
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <IconBadge name={item.icon} className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.1}>
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}

export function Proof() {
  return (
    <section id="proof" className="no-print web-only scroll-mt-24 bg-secondary/30 py-20" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 id="proof-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Case studies
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Problem → AI used → what Katie reviewed → result. Flagship projects lead; Spotify QA
            proof sits near the top.
          </p>
        </FadeIn>
        <ol className="mt-10 grid gap-6">
          {caseStudies.map((item, i) => (
            <FadeIn key={item.title} delay={Math.min(i * 0.04, 0.2)}>
              <li
                className={`rounded-2xl border bg-card p-5 shadow-sm sm:p-6 ${
                  item.flagship ? 'border-primary/35 ring-1 ring-primary/15' : 'border-border'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  {item.metric ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.metric}
                    </span>
                  ) : null}
                </div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-foreground">Problem</dt>
                    <dd className="mt-1 text-muted-foreground">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">AI used</dt>
                    <dd className="mt-1 text-muted-foreground">{item.aiUsed}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">What Katie reviewed / corrected</dt>
                    <dd className="mt-1 text-muted-foreground">{item.reviewed}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Result</dt>
                    <dd className="mt-1 text-muted-foreground">{item.result}</dd>
                  </div>
                </dl>
                {item.images?.length ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {item.images.map((img) => (
                      <figure
                        key={img.src}
                        className="overflow-hidden rounded-xl border border-border bg-white dark:bg-background"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={600}
                          height={360}
                          className="h-auto w-full object-cover"
                        />
                        <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                          {img.alt}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function StatusBar() {
  return (
    <section className="no-print web-only bg-navy text-white" aria-label="Status and highlights">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-md items-start gap-3">
          <Briefcase className="mt-0.5 h-5 w-5 text-teal-glow" aria-hidden />
          <p className="text-sm leading-relaxed text-white/80">
            Available for remote part-time and contract work in AI QA, LLM evaluation, and
            AI-assisted operations — where human review is the product.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {highlights.map((item) => (
            <li key={item.label} className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <IconBadge name={item.icon} className="h-4 w-4 text-teal-glow" />
                <span className="text-2xl font-bold tracking-tight">{item.value}</span>
              </div>
              <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Katie Kinkel</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-glow hover:underline outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href={`mailto:${email}`}
              className="text-sm font-semibold text-teal-glow hover:underline outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
