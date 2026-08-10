import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import {
  Evaluation,
  Proof,
  SkillsTools,
  SpotifyProofStrip,
  StatusBar,
  ValueCards,
  WhatIBring,
  Workflow,
} from '@/components/Marketing'
import { Linkedin, Mail } from 'lucide-react'
import { email, linkedinUrl } from '@/lib/content'

export default function HomePage() {
  return (
    <div id="top" className="page-content">
      <SiteHeader />
      <main>
        <Hero />
        <Evaluation />
        <ValueCards />
        <SpotifyProofStrip />
        <Proof />
        <SkillsTools />
        <Workflow />
        <WhatIBring />

        <section
          id="hire"
          className="no-print web-only border-t border-border bg-secondary/40"
          aria-labelledby="hire-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2
              id="hire-heading"
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Looking for remote AI QA, LLM evaluation, AI training, or AI operations help?
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Katie is available for part-time, contract, and project-based work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="btn-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail className="h-5 w-5" aria-hidden />
                Email Katie
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-base font-semibold text-foreground shadow-sm transition hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2]" aria-hidden />
                LinkedIn
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Or email directly:{' '}
              <a className="font-medium text-primary underline-offset-2 hover:underline" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
          </div>
        </section>

        <StatusBar />
      </main>
    </div>
  )
}
