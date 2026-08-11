/** Shared clamps for agent / tool inputs (client-side hardening). */

export const MAX_USER_MESSAGE_CHARS = 4_000
export const MAX_TOOL_ARG_CHARS = 8_000
export const MAX_SCORE_DRAFT_CHARS = 12_000
export const MAX_SEARCH_QUERY_CHARS = 200
export const MAX_TOOL_RESULT_CHARS = 12_000
export const MAX_AGENT_TURNS = 6
export const MAX_CHAT_MESSAGES = 40

export function clampString(value: unknown, max: number): string {
  const s = typeof value === 'string' ? value : String(value ?? '')
  if (s.length <= max) return s
  return s.slice(0, max)
}

export function truncateForModel(text: string, max = MAX_TOOL_RESULT_CHARS): string {
  if (text.length <= max) return text
  return `${text.slice(0, max)}\n…[truncated]`
}

/** Only keep plain object string/number/boolean args; drop nested objects/functions. */
export function sanitizeToolArgs(args: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(args ?? {})) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/.test(key)) continue
    if (typeof value === 'string') {
      out[key] = clampString(value, MAX_TOOL_ARG_CHARS)
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      out[key] = value
    } else if (typeof value === 'boolean') {
      out[key] = value
    } else if (value == null) {
      // skip
    } else {
      // stringify unknown nested values rather than passing through
      out[key] = clampString(JSON.stringify(value), MAX_TOOL_ARG_CHARS)
    }
  }
  return out
}
