import { Linkedin } from 'lucide-react'
import { linkedinUrl } from '@/lib/content'
import { PrintButton } from './PrintButton'
import { ThemeSwitch } from './ThemeSwitch'

const links = [
  { href: '#ai', label: 'AI work' },
  { href: '#models', label: 'Skills' },
  { href: '#proof', label: 'Projects' },
  { href: '#kk-resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/80 bg-background/85 text-foreground backdrop-blur-xl dark:border-white/10 dark:bg-navy/80 dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Katie Kinkel
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Katie Kinkel on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/15 dark:hover:bg-white/10"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
          </a>
          <PrintButton />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
