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
    return <div className="no-print h-9 w-[7.5rem] rounded-full bg-white/10" aria-hidden />
  }

  const options = [
    { id: 'light', Icon: Sun, title: 'Light mode' },
    { id: 'dark', Icon: Moon, title: 'Dark mode' },
    { id: 'system', Icon: Monitor, title: 'System default' },
  ] as const

  return (
    <div
      className="no-print flex h-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1"
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
            className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-teal-glow ${
              active
                ? 'bg-teal-glow text-navy scale-105 shadow-md'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
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
