import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { Resume } from '@/components/Resume'
import {
  capabilities,
  email,
  modelFamilies,
  proofItems,
  surfaces,
} from '@/lib/content'

export default function HomePage() {
  return (
    <div id="top" className="page-content">
      <SiteHeader />

      <main>
        <section className="no-print web-only relative isolate overflow-hidden hero-glow">
          <div className="mx-auto flex min-h-[min(92dvh,880px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
            <p className="animate-fade-up text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Katie Kinkel
            </p>
            <h1 className="animate-fade-up-delay font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              AI for every job companies need — with human QA that actually ships.
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
              Ex-Spotify Creative Support &amp; QA Buddy. Now building, organizing, researching,
              and validating with Cursor, Copilot, and ChatGPT — enthusiastically, professionally,
              and never without a human review pass.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <a
                href="#ai"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                How I work with AI
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#kk-resume"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Jump to resume
              </a>
            </div>
          </div>
        </section>

        <div className="web-only no-print mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
          <section id="ai" className="scroll-mt-24" aria-labelledby="ai-heading">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                Since leaving Spotify
              </p>
              <h2 id="ai-heading" className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Deep interest. Daily practice. Real understanding through the tools.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Katie has used AI for virtually everything — legal aid support, neighborhood
                association minutes, cat rescue coordination, computer cleanup, website prototypes,
                and fast proofreading. The lightly proud part: with the right AI stack she can
                organize, research, QA, prototype, validate, and communicate at a level every
                company in history has needed. The serious part: she understands the underlying
                workflow well enough to direct the tools, catch mistakes, and own the result.
              </p>
              <div className="mt-8 flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <p className="text-base leading-relaxed">
                  <strong className="text-foreground">The key lesson:</strong> everything an AI
                  generates still needs a human review. That QA judgment — sharpened at Spotify —
                  is where Katie especially exceeds.
                </p>
              </div>
            </div>
          </section>

          <section id="capabilities" className="scroll-mt-24" aria-labelledby="cap-heading">
            <h2 id="cap-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              What AI + Katie ship
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The skills every company needs — accelerated by models, finished by a person who
              reads the final product.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border/80 bg-card/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="models" className="scroll-mt-24" aria-labelledby="models-heading">
            <h2 id="models-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Models I actually work in
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Working fluency across Cursor, GitHub Copilot, and ChatGPT. Family names only —
              versions rotate; QA judgment does not.
            </p>
            <div className="mt-8">
              <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Surfaces</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {surfaces.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Families</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {modelFamilies.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-border bg-secondary/80 px-3.5 py-1.5 text-sm font-medium"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="proof" className="scroll-mt-24" aria-labelledby="proof-heading">
            <h2 id="proof-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Proof in the wild
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Post-Spotify work where AI sped things up and Katie made sure they were right.
            </p>
            <ol className="mt-10 space-y-4">
              {proofItems.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card/60 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl border border-dashed border-primary/30 bg-accent/40 px-5 py-4 text-sm font-medium tracking-wide text-foreground">
              Generate → review → ship. That loop is the whole game.
            </p>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Resume />
        </div>

        <section
          id="contact"
          className="no-print web-only border-t border-border/60 bg-secondary/30"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 id="contact-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Say hello
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Want help organizing, researching, prototyping, or QA-ing something with AI in the
              loop? Reach out — Katie reads every message herself.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {email}
            </a>
          </div>
        </section>
      </main>

      <footer className="no-print web-only border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Katie Kinkel ·{' '}
          <a className="underline-offset-2 hover:underline" href="/Katie-Kinkel-Resume.pdf">
            Download resume PDF
          </a>
        </p>
      </footer>
    </div>
  )
}
