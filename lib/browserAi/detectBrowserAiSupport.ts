import { isWebMcpEnabled } from '@/lib/features'
import { isDesktopChrome, isMobileClient, TimeoutError, withTimeout } from '@/lib/browserAi/utils'
import { nativeWebMcpAvailableAtLoad } from '@/lib/webmcp/nativeAtLoad'

export type BrowserAiUnsupportedReason = 'mobile' | 'no-prompt-api' | 'model-unavailable' | 'not-chrome'

export type BrowserAiSetupReason =
  | 'feature-disabled'
  | 'detection-timeout'
  | 'model-downloadable'
  | 'webmcp-flag-required'

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
  if (!isWebMcpEnabled()) {
    return { status: 'needs-setup', reason: 'feature-disabled' }
  }
  // Demo requires Chrome + chrome://flags/#enable-webmcp-testing (native modelContext).
  if (!isDesktopChrome()) {
    return { status: 'unsupported', reason: 'not-chrome' }
  }
  if (!nativeWebMcpAvailableAtLoad()) {
    return { status: 'needs-setup', reason: 'webmcp-flag-required' }
  }
  if (!hasPromptApi()) {
    return { status: 'unsupported', reason: 'no-prompt-api' }
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

  const { initWebMcp } = await import('@/lib/webmcp/init')
  const webmcp = await initWebMcp()

  if (modelStatus === 'downloadable' || modelStatus === 'downloading') {
    return {
      status: 'needs-setup',
      reason: 'model-downloadable',
      modelStatus,
    }
  }

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
    console.warn('[Browser AI] detection failed', e)
    return { status: 'unsupported', reason: 'model-unavailable' }
  }
}

/** Floating AI demo — only when WebMCP flag is on and the on-device model is usable or installable. */
export function shouldShowBrowserAiLauncher(
  support: BrowserAiSupport | { status: 'checking' },
): boolean {
  if (support.status === 'checking') return false
  if (support.status === 'ready') return true
  if (support.status === 'needs-setup' && support.reason === 'model-downloadable') return true
  return false
}

/** Chrome tip card — WebMCP testing flag not enabled yet. */
export function shouldShowWebMcpSetupHint(
  support: BrowserAiSupport | { status: 'checking' },
): boolean {
  return support.status === 'needs-setup' && support.reason === 'webmcp-flag-required'
}
