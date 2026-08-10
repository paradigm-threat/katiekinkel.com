import Image from 'next/image'
import { Briefcase, Linkedin } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { BrandMark, IconBadge, toolLogos } from './IconKit'
import { ThemeImage } from './ThemeImage'
import {
  capabilities,
  email,
  highlights,
  linkedinUrl,
  missionQuote,
  modelFamilies,
  proofItems,
  skillTags,
  surfaces,
  techFocus,
  valueCards,
  values,
} from '@/lib/content'

export function ValueCards() {
  return (
    <section
      className="no-print web-only relative z-10 -mt-8 px-4 sm:-mt-12 sm:px-6"
      aria-labelledby="values-heading"
    >
      <h2 id="values-heading" className="sr-only">
        Core strengths
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
                Surfaces: {surfaces.join(' · ')}. Brand logos for the stack Katie actually works in —
                model families stay unversioned because tools rotate; QA judgment does not.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <ul className="mt-10 flex flex-wrap gap-6">
                {toolLogos.map((tool) => (
                  <li key={tool.label} className="flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm dark:bg-card">
                      <BrandMark name={tool.name} className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{tool.label}</span>
                  </li>
                ))}
              </ul>
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

            <FadeIn delay={0.16}>
              <p className="mt-6 text-sm text-muted-foreground">
                Also fluent across: {modelFamilies.join(' · ')}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <aside className="rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm dark:bg-card">
              <p className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                Tech focus
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
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white p-3 dark:bg-background/40">
                <Image
                  src="/assets/katie-professional-cartoon-portrait-square.png"
                  alt="Katie Kinkel illustrated portrait"
                  width={480}
                  height={480}
                  className="mx-auto h-auto w-full max-w-[280px] object-contain"
                />
              </div>
            </aside>
          </FadeIn>
        </div>
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
            Brief → draft → QA → UX. AI speeds the first pass; Katie&apos;s review is the quality
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
            Proof in the wild
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Post-Spotify work where AI sped things up and Katie made sure they were right.
          </p>
        </FadeIn>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {proofItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <li className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <IconBadge name="check" className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
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
            Actively exploring AI-augmented QA, operations, and communications roles — where human
            review is valued as much as model fluency.
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
