'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="no-print h-9 w-[7.5rem] rounded-full bg-secondary dark:bg-white/10" aria-hidden />
  }

  const options = [
    { id: 'light', Icon: Sun, title: 'Light mode' },
    { id: 'dark', Icon: Moon, title: 'Dark mode' },
    { id: 'system', Icon: Monitor, title: 'System default' },
  ] as const

  return (
    <div
      className="no-print flex h-fit items-center gap-1 rounded-full border border-border bg-secondary/70 p-1 dark:border-white/15 dark:bg-white/5"
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ id, Icon, title }) => {
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? 'scale-105 bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-background hover:text-foreground dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
            title={title}
            aria-label={title}
            aria-pressed={active}
          >
            <Icon size={16} strokeWidth={active ? 2.75 : 2} />
          </button>
        )
      })}
    </div>
  )
}
