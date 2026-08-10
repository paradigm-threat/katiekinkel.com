import { PrintButton } from './PrintButton'
import { ThemeSwitch } from './ThemeSwitch'

const links = [
  { href: '#ai', label: 'AI work' },
  { href: '#models', label: 'Models' },
  { href: '#proof', label: 'Proof' },
  { href: '#kk-resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Katie Kinkel
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          <PrintButton />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
