'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Download, Loader2, Send, X } from 'lucide-react'
import { DEMO_CONFESSION } from '@/lib/agent/factSheet'
import {
  detectBrowserAiSupport,
  shouldShowBrowserAiLauncher,
  type BrowserAiSupport,
} from '@/lib/browserAi/detectBrowserAiSupport'
import { getLanguageModelAvailability } from '@/lib/browserAi/browserLanguageModel'
import { isWebMcpEnabled } from '@/lib/features'
import { runBrowserAgent, type AgentProgress } from '@/lib/siteAi/runAgent'
import { buildAgentSystemPrompt } from '@/lib/siteAi/systemPrompt'
import { WEBMCP_TOOL_NAMES } from '@/lib/webmcp/registerTools'
import { clsx } from 'clsx'

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

export function BrowserAiDemo() {
  const [support, setSupport] = useState<BrowserAiSupport | { status: 'checking' }>({
    status: 'checking',
  })
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: DEMO_CONFESSION },
  ])
  const abortRef = useRef<AbortController | null>(null)
  const enabled = isWebMcpEnabled()

  useEffect(() => {
    if (!enabled) {
      setSupport({ status: 'needs-setup', reason: 'feature-disabled' })
      return
    }
    let cancelled = false
    detectBrowserAiSupport().then((s) => {
      if (!cancelled) setSupport(s)
    })
    return () => {
      cancelled = true
    }
  }, [enabled])

  const show = shouldShowBrowserAiLauncher(support)

  const statusLabel = useMemo(() => {
    if (support.status === 'checking') return 'Checking browser AI…'
    if (support.status === 'ready') {
      if (support.nativeWebMcp) {
        return 'Ready · on-device model · native WebMCP'
      }
      if (support.usedPolyfill) {
        return 'Ready · on-device model · WebMCP polyfill (in-page tools)'
      }
      return 'Ready · on-device model · page tool bridge'
    }
    if (support.status === 'needs-setup') {
      if (support.reason === 'model-downloadable') return 'Model downloadable — open chat to install'
      if (support.reason === 'feature-disabled') return 'Demo flag off'
      return 'Needs setup'
    }
    if (support.reason === 'mobile') return 'Desktop Chrome required'
    if (support.reason === 'no-prompt-api') return 'Prompt API not in this browser'
    return 'On-device model unavailable'
  }, [support])

  const onProgress = useCallback((event: AgentProgress) => {
    if (event.phase === 'loading-model') {
      const pct =
        typeof event.loaded === 'number' ? ` ${Math.round(event.loaded * 100)}%` : ''
      setProgress(`${event.message}${pct}`)
    } else if (event.phase === 'thinking') {
      setProgress(event.message)
    } else if (event.phase === 'tool') {
      setProgress(
        event.status === 'start' ? `Calling ${event.toolName}…` : `Got ${event.toolName}`,
      )
    }
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setBusy(true)
    setProgress('Starting…')
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    try {
      const result = await runBrowserAgent({
        systemPrompt: buildAgentSystemPrompt(),
        userMessage: text,
        signal: ac.signal,
        onProgress,
      })
      const toolsNote =
        result.toolCalls.length > 0
          ? `\n\n_Tools used: ${result.toolCalls.map((t) => t.name).join(', ')}_`
          : ''
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `${result.finalText}${toolsNote}` },
      ])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Agent failed'
      setMessages((m) => [...m, { role: 'assistant', content: `Error: ${msg}` }])
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  async function enableModel() {
    setBusy(true)
    setProgress('Checking / downloading model…')
    try {
      await getLanguageModelAvailability()
      const next = await detectBrowserAiSupport()
      setSupport(next)
      // Trigger create path via a tiny agent turn if downloadable
      if (next.status === 'needs-setup' && next.reason === 'model-downloadable') {
        await runBrowserAgent({
          systemPrompt: buildAgentSystemPrompt(),
          userMessage: 'Call explain_this_demo and summarize in one sentence.',
          onProgress,
        })
        setSupport(await detectBrowserAiSupport())
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Could not enable model: ${e instanceof Error ? e.message : 'unknown error'}`,
        },
      ])
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  if (!show) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="no-print fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-primary"
        aria-label="Open browser AI demo"
      >
        <Bot className="h-4 w-4" aria-hidden />
        Browser AI demo
      </button>

      {open ? (
        <div
          className="no-print fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="browser-ai-title"
        >
          <div className="flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
              <div>
                <h2 id="browser-ai-title" className="font-display text-lg font-bold">
                  WebMCP + on-device Gemini demo
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{statusLabel}</p>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="border-b border-border bg-secondary/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              {DEMO_CONFESSION}
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={clsx(
                    'rounded-xl px-3 py-2 text-sm leading-relaxed',
                    m.role === 'user' && 'ml-8 bg-primary/15 text-foreground',
                    m.role === 'assistant' && 'mr-4 bg-card border border-border',
                    m.role === 'system' && 'border border-dashed border-border text-muted-foreground',
                  )}
                >
                  {m.content}
                </div>
              ))}
              {progress ? (
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {progress}
                </p>
              ) : null}
            </div>

            <details className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium text-foreground">
                QA tools registered ({WEBMCP_TOOL_NAMES.length})
              </summary>
              <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {WEBMCP_TOOL_NAMES.map((name) => (
                  <li key={name} className="font-mono">
                    {name}
                  </li>
                ))}
              </ul>
            </details>

            <footer className="border-t border-border p-3">
              {support.status === 'needs-setup' && support.reason === 'model-downloadable' ? (
                <button
                  type="button"
                  onClick={() => void enableModel()}
                  disabled={busy}
                  className="btn-gradient mb-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
                >
                  <Download className="h-4 w-4" />
                  Enable on-device model
                </button>
              ) : null}
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  void send()
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Katie’s work history, Spotify QA, hire pitch…"
                  className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  disabled={busy || support.status === 'unsupported'}
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="inline-flex items-center justify-center rounded-xl bg-navy px-3 text-white disabled:opacity-50 dark:bg-primary"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  )
}
