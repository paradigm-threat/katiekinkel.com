import { Linkedin, Mail } from 'lucide-react'
import {
  also,
  education,
  email,
  experience,
  jobTitle,
  linkedinUrl,
  modelFamilies,
  objective,
  siteUrl,
  summary,
  surfaces,
} from '@/lib/content'

export function Resume() {
  return (
    <section
      id="kk-resume"
      className="resume-section scroll-mt-24 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8"
      aria-labelledby="resume-heading"
    >
      <div className="resume-letterhead border-b border-border pb-6">
        <h2 id="resume-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Katie Kinkel
        </h2>
        <p className="mt-1 text-base text-muted-foreground">{jobTitle}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <a
            className="inline-flex items-center gap-1.5 text-primary underline-offset-2 hover:underline"
            href={`mailto:${email}`}
          >
            <Mail className="h-3.5 w-3.5 no-print" aria-hidden />
            {email}
          </a>
          <span aria-hidden>·</span>
          <a
            className="inline-flex items-center gap-1.5 text-primary underline-offset-2 hover:underline"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-3.5 w-3.5 no-print" aria-hidden />
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a className="text-primary underline-offset-2 hover:underline" href={siteUrl}>
            katiekinkel.com
          </a>
        </p>
      </div>

      <div className="mt-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Objective. </span>
          {objective}
        </p>
        <p>
          <span className="font-semibold text-foreground">Summary. </span>
          {summary}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Experience</h3>
        <ul className="mt-4 space-y-5">
          {experience.map((job) => (
            <li key={`${job.company}-${job.duration}`} className="experience-item break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-semibold text-foreground">{job.title}</h4>
                <span className="text-xs text-muted-foreground italic">{job.duration}</span>
              </div>
              <p className="text-sm font-medium text-primary">
                {job.company}
                <span className="font-normal text-muted-foreground"> · {job.location}</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 education-item break-inside-avoid">
        <h3 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Education</h3>
        <ul className="mt-4 space-y-3">
          {education.map((ed) => (
            <li key={ed.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-semibold">{ed.school}</p>
                <span className="text-xs text-muted-foreground italic">{ed.duration}</span>
              </div>
              <p className="text-sm text-muted-foreground">{ed.degree}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 break-inside-avoid">
        <h3 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Also</h3>
        <ul className="mt-4 space-y-3">
          {also.map((item) => (
            <li key={item.title} className="text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-semibold">{item.title}</p>
                <span className="text-xs text-muted-foreground italic">{item.duration}</span>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 break-inside-avoid">
        <h3 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
          Tools &amp; models
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Surfaces: {surfaces.join(' · ')}. Families: {modelFamilies.join(' · ')}. Versions rotate;
          human QA does not.
        </p>
      </div>
    </section>
  )
}
