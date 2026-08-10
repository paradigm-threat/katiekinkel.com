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
    return <div className="no-print h-9 w-[7.5rem] rounded-full bg-secondary/60" aria-hidden />
  }

  const options = [
    { id: 'light', Icon: Sun, title: 'Light mode' },
    { id: 'dark', Icon: Moon, title: 'Dark mode' },
    { id: 'system', Icon: Monitor, title: 'System default' },
  ] as const

  return (
    <div
      className="no-print flex h-fit items-center gap-1 rounded-full border border-primary/15 bg-background/70 p-1 shadow-inner backdrop-blur-md"
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
                ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
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
