'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Copy, Download, Loader2, Send, Square, X } from 'lucide-react'
import { DEMO_CONFESSION } from '@/lib/agent/factSheet'
import {
  detectBrowserAiSupport,
  shouldShowBrowserAiLauncher,
  shouldShowWebMcpSetupHint,
  type BrowserAiSupport,
} from '@/lib/browserAi/detectBrowserAiSupport'
import { getLanguageModelAvailability } from '@/lib/browserAi/browserLanguageModel'
import { TimeoutError } from '@/lib/browserAi/utils'
import { isWebMcpEnabled } from '@/lib/features'
import { MAX_CHAT_MESSAGES, MAX_USER_MESSAGE_CHARS, clampString } from '@/lib/siteAi/limits'
import { runBrowserAgent, type AgentProgress } from '@/lib/siteAi/runAgent'
import { buildAgentSystemPrompt } from '@/lib/siteAi/systemPrompt'
import { WEBMCP_TOOL_NAMES } from '@/lib/webmcp/registerTools'
import { clsx } from 'clsx'

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

const STARTER_PROMPTS = [
  'What kind of work history does she have?',
  'What is this site built with?',
  'What’s her Spotify QA proof?',
  'Give me a short hire pitch.',
] as const

const WEBMCP_FLAG_URL = 'chrome://flags/#enable-webmcp-testing'
const HINT_DISMISS_KEY = 'kk-webmcp-setup-hint-dismissed'

function appendMessages(prev: ChatMessage[], next: ChatMessage | ChatMessage[]): ChatMessage[] {
  const added = Array.isArray(next) ? next : [next]
  const merged = [...prev, ...added]
  if (merged.length <= MAX_CHAT_MESSAGES) return merged
  const system = merged.filter((m) => m.role === 'system').slice(0, 1)
  const rest = merged.filter((m) => m.role !== 'system').slice(-(MAX_CHAT_MESSAGES - system.length))
  return [...system, ...rest]
}

function WebMcpSetupHint({ onDismiss }: { onDismiss: () => void }) {
  const [copied, setCopied] = useState(false)

  async function copyFlagUrl() {
    try {
      await navigator.clipboard.writeText(WEBMCP_FLAG_URL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside
      className="no-print fixed right-4 bottom-4 z-50 w-[min(100%-2rem,22rem)] rounded-2xl border border-border bg-background p-4 shadow-xl"
      aria-label="How to enable the browser AI demo"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-sm font-bold text-foreground">Try the on-page AI demo</p>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        This demo needs Chrome with the WebMCP testing flag enabled. Without that flag, the chat
        button stays hidden.
      </p>
      <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-foreground">
        <li>
          Open{' '}
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.7rem]">
            {WEBMCP_FLAG_URL}
          </code>
        </li>
        <li>
          Set <strong>Enable WebMCP Testing</strong> to <strong>Enabled</strong>
        </li>
        <li>Relaunch Chrome, then reload this page</li>
      </ol>
      <button
        type="button"
        onClick={() => void copyFlagUrl()}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
      >
        <Copy className="h-3.5 w-3.5" aria-hidden />
        {copied ? 'Copied flag URL' : 'Copy flag URL'}
      </button>
    </aside>
  )
}

export function BrowserAiDemo() {
  const [support, setSupport] = useState<BrowserAiSupport | { status: 'checking' }>({
    status: 'checking',
  })
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)
  const [hintDismissed, setHintDismissed] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: DEMO_CONFESSION },
  ])
  const abortRef = useRef<AbortController | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enabled = isWebMcpEnabled()

  useEffect(() => {
    try {
      setHintDismissed(sessionStorage.getItem(HINT_DISMISS_KEY) === '1')
    } catch {
      setHintDismissed(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setSupport({ status: 'needs-setup', reason: 'feature-disabled' })
      return
    }
    let cancelled = false
    detectBrowserAiSupport()
      .then((s) => {
        if (!cancelled) setSupport(s)
      })
      .catch(() => {
        if (!cancelled) setSupport({ status: 'unsupported', reason: 'model-unavailable' })
      })
    return () => {
      cancelled = true
      abortRef.current?.abort()
    }
  }, [enabled])

  const close = useCallback(() => {
    abortRef.current?.abort()
    setOpen(false)
    setBusy(false)
    setProgress(null)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, close])

  const showLauncher = shouldShowBrowserAiLauncher(support)
  const showSetupHint = shouldShowWebMcpSetupHint(support) && !hintDismissed

  const dismissHint = useCallback(() => {
    setHintDismissed(true)
    try {
      sessionStorage.setItem(HINT_DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

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
      if (support.reason === 'webmcp-flag-required') return 'Enable WebMCP testing flag in Chrome'
      if (support.reason === 'feature-disabled') return 'Demo flag off'
      return 'Needs setup'
    }
    if (support.reason === 'mobile') return 'Desktop Chrome required'
    if (support.reason === 'not-chrome') return 'Desktop Chrome required'
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

  function stop() {
    abortRef.current?.abort()
    setBusy(false)
    setProgress(null)
  }

  async function send(raw?: string) {
    const text = clampString((raw ?? input).trim(), MAX_USER_MESSAGE_CHARS)
    if (!text || busy) return
    setInput('')
    setMessages((m) => appendMessages(m, { role: 'user', content: text }))
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
      if (ac.signal.aborted) return
      const toolsNote =
        result.toolCalls.length > 0
          ? `\n\nTools used: ${result.toolCalls.map((t) => t.name).join(', ')}`
          : ''
      setMessages((m) =>
        appendMessages(m, {
          role: 'assistant',
          content: clampString(`${result.finalText}${toolsNote}`, MAX_USER_MESSAGE_CHARS),
        }),
      )
    } catch (e) {
      if (ac.signal.aborted || (e instanceof DOMException && e.name === 'AbortError')) {
        setMessages((m) => appendMessages(m, { role: 'assistant', content: 'Stopped.' }))
        return
      }
      const msg = e instanceof Error ? e.message : 'Agent failed'
      setMessages((m) => appendMessages(m, { role: 'assistant', content: `Error: ${msg}` }))
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  async function enableModel() {
    setBusy(true)
    setProgress('Checking / downloading model (may take a few minutes)…')
    setOpen(true)
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    try {
      await getLanguageModelAvailability()
      if (ac.signal.aborted) return
      const next = await detectBrowserAiSupport()
      setSupport(next)
      if (next.status === 'needs-setup' && next.reason === 'model-downloadable') {
        await runBrowserAgent({
          systemPrompt: buildAgentSystemPrompt(),
          userMessage: 'Call explain_this_demo and summarize in one sentence.',
          signal: ac.signal,
          onProgress,
        })
        if (!ac.signal.aborted) {
          setSupport(await detectBrowserAiSupport())
        }
      }
    } catch (e) {
      if (ac.signal.aborted || (e instanceof DOMException && e.name === 'AbortError')) return
      const timedOut =
        e instanceof TimeoutError ||
        (e instanceof Error && /timed out/i.test(e.message))
      const msg = e instanceof Error ? e.message : 'unknown error'
      setMessages((m) =>
        appendMessages(m, {
          role: 'assistant',
          content: timedOut
            ? `Model download timed out. ${msg}`
            : `Could not enable model: ${msg}`,
        }),
      )
      // After a failed download, re-detect so we don't pretend the model is ready.
      try {
        setSupport(await detectBrowserAiSupport())
      } catch {
        /* keep previous */
      }
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  if (!showLauncher && !showSetupHint) return null

  return (
    <>
      {showSetupHint && !showLauncher ? <WebMcpSetupHint onDismiss={dismissHint} /> : null}

      {showLauncher ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="no-print fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-primary"
          aria-label="Open browser AI demo"
        >
          <Bot className="h-4 w-4" aria-hidden />
          Browser AI demo
        </button>
      ) : null}

      {open && showLauncher ? (
        <div
          className="no-print fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="browser-ai-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={panelRef}
            className="flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
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
                onClick={close}
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
                    'rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words',
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
              {!busy && messages.every((m) => m.role === 'system') ? (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {STARTER_PROMPTS.map((prompt) => (
                    <li key={prompt}>
                      <button
                        type="button"
                        onClick={() => void send(prompt)}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-left text-xs font-medium text-foreground transition hover:bg-secondary"
                      >
                        {prompt}
                      </button>
                    </li>
                  ))}
                </ul>
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
                  className="btn-gradient mb-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {busy ? 'Downloading model…' : 'Enable on-device model'}
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
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(clampString(e.target.value, MAX_USER_MESSAGE_CHARS))}
                  maxLength={MAX_USER_MESSAGE_CHARS}
                  placeholder="Ask about Katie’s work history, Spotify QA, hire pitch…"
                  className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  disabled={busy || support.status !== 'ready'}
                  autoComplete="off"
                />
                {busy ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-3 text-foreground"
                    aria-label="Stop"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim() || support.status !== 'ready'}
                    className="inline-flex items-center justify-center rounded-xl bg-navy px-3 text-white disabled:opacity-50 dark:bg-primary"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </form>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  )
}
