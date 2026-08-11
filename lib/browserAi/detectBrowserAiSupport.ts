import { isWebMcpEnabled } from '@/lib/features'
import { isMobileClient, TimeoutError, withTimeout } from '@/lib/browserAi/utils'

export type BrowserAiUnsupportedReason = 'mobile' | 'no-prompt-api' | 'model-unavailable'

export type BrowserAiSetupReason =
  | 'feature-disabled'
  | 'detection-timeout'
  | 'model-downloadable'

export type BrowserAiSupport =
  | { status: 'unsupported'; reason: BrowserAiUnsupportedReason }
  | { status: 'needs-setup'; reason: BrowserAiSetupReason; modelStatus?: string }
  | {
      status: 'ready'
      modelStatus: string
      nativeWebMcp: boolean
      /** True when @mcp-b/webmcp-polyfill provided modelContext */
      usedPolyfill: boolean
    }

const DETECTION_TIMEOUT_MS = 12_000

const LM_PROBE = {
  expectedInputs: [{ type: 'text' as const, languages: ['en'] }],
  expectedOutputs: [{ type: 'text' as const, languages: ['en'] }],
}

function hasPromptApi(): boolean {
  return typeof window !== 'undefined' && !!window.LanguageModel?.availability
}

async function detectInner(): Promise<BrowserAiSupport> {
  if (typeof window === 'undefined') {
    return { status: 'unsupported', reason: 'no-prompt-api' }
  }
  if (isMobileClient()) {
    return { status: 'unsupported', reason: 'mobile' }
  }
  if (!hasPromptApi()) {
    return { status: 'unsupported', reason: 'no-prompt-api' }
  }
  if (!isWebMcpEnabled()) {
    return { status: 'needs-setup', reason: 'feature-disabled' }
  }

  let modelStatus: string
  try {
    modelStatus = await window.LanguageModel!.availability(LM_PROBE)
  } catch {
    return { status: 'unsupported', reason: 'model-unavailable' }
  }

  if (modelStatus === 'unavailable') {
    return { status: 'unsupported', reason: 'model-unavailable' }
  }

  // Install WebMCP polyfill when native modelContext is missing (common on
  // Prompt-API Chrome builds that do not yet enable WebMCP).
  const { initWebMcp } = await import('@/lib/webmcp/init')
  const webmcp = await initWebMcp()

  if (modelStatus === 'downloadable' || modelStatus === 'downloading') {
    return {
      status: 'needs-setup',
      reason: 'model-downloadable',
      modelStatus,
    }
  }

  // In-page agent uses the tool bridge + Prompt API; polyfill is best-effort
  // for registerTool / inspector — do not block the demo if it fails.
  return {
    status: 'ready',
    modelStatus,
    nativeWebMcp: webmcp.nativeAtLoad,
    usedPolyfill: webmcp.usedPolyfill,
  }
}

export async function detectBrowserAiSupport(): Promise<BrowserAiSupport> {
  try {
    return await withTimeout(detectInner(), DETECTION_TIMEOUT_MS, 'Browser AI detection')
  } catch (e) {
    if (e instanceof TimeoutError) {
      return { status: 'needs-setup', reason: 'detection-timeout' }
    }
    throw e
  }
}

/** Show launcher when desktop Prompt API exists and feature is on (incl. downloadable). */
export function shouldShowBrowserAiLauncher(
  support: BrowserAiSupport | { status: 'checking' },
): boolean {
  if (support.status === 'checking') return false
  if (support.status === 'unsupported') return false
  if (support.status === 'needs-setup' && support.reason === 'feature-disabled') return false
  return true
}
