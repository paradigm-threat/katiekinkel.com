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
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-navy/80 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
        >
          Katie Kinkel
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
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
