import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import {
  Proof,
  SkillsTools,
  StatusBar,
  Strengths,
  WhatIBring,
} from '@/components/Marketing'
import { Resume } from '@/components/Resume'
import { email } from '@/lib/content'

export default function HomePage() {
  return (
    <div id="top" className="page-content">
      <SiteHeader />
      <main>
        <Hero />
        <Strengths />
        <SkillsTools />
        <WhatIBring />
        <Proof />

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Resume />
        </div>

        <section
          id="contact"
          className="no-print web-only border-t border-border bg-secondary/30"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Say hello
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Want help organizing, researching, prototyping, or QA-ing something with AI in the
              loop? Reach out — Katie reads every message herself.
            </p>
            <a
              href={`mailto:${email}`}
              className="btn-gradient mt-8 inline-flex items-center rounded-lg px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {email}
            </a>
          </div>
        </section>

        <StatusBar />
      </main>
    </div>
  )
}
