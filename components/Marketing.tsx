import { FadeIn } from './FadeIn'
import { BrandMark, IconBadge, toolLogos } from './IconKit'
import {
  capabilities,
  email,
  highlights,
  modelFamilies,
  proofItems,
  skillTags,
  strengths,
  surfaces,
  values,
} from '@/lib/content'
import { Briefcase } from 'lucide-react'

export function Strengths() {
  return (
    <section className="no-print web-only relative z-10 -mt-10 px-4 sm:px-6" aria-labelledby="strengths-heading">
      <h2 id="strengths-heading" className="sr-only">
        Core strengths
      </h2>
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.06}>
            <article className="card-dark h-full rounded-2xl p-5 text-white shadow-xl transition duration-300 hover:-translate-y-1">
              <IconBadge name={item.icon} className="icon-glow h-6 w-6" />
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
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
        <FadeIn>
          <h2 id="skills-heading" className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Skills &amp; tools
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Surfaces: {surfaces.join(' · ')}. Model families without version noise — tools rotate;
            QA judgment does not.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
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
          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
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
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Also fluent across: {modelFamilies.join(' · ')}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export function WhatIBring() {
  return (
    <section id="ai" className="no-print web-only scroll-mt-24 border-y border-border/70 bg-secondary/40 py-20" aria-labelledby="bring-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 id="bring-heading" className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What I bring
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Since leaving Spotify — deep interest in AI tools for virtually everything companies
            need, finished with a human QA pass.
          </p>
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
    <section id="proof" className="no-print web-only scroll-mt-24 py-20" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 id="proof-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Proof in the wild
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Generate → review → ship. Real community and ops work where AI sped things up and Katie
            made sure they were right.
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
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Katie Kinkel
          </p>
          <a
            href={`mailto:${email}`}
            className="text-sm font-semibold text-teal-glow hover:underline outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  )
}
