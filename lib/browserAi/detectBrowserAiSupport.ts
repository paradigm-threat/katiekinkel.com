import { isWebMcpEnabled } from '@/lib/features'
import { isMobileClient, TimeoutError, withTimeout } from '@/lib/browserAi/utils'
import { getModelContext } from '@/lib/webmcp/modelContext'

export type BrowserAiUnsupportedReason = 'mobile' | 'no-prompt-api' | 'model-unavailable'

export type BrowserAiSetupReason =
  | 'feature-disabled'
  | 'webmcp-unavailable'
  | 'detection-timeout'
  | 'model-downloadable'

export type BrowserAiSupport =
  | { status: 'unsupported'; reason: BrowserAiUnsupportedReason }
  | { status: 'needs-setup'; reason: BrowserAiSetupReason; modelStatus?: string }
  | { status: 'ready'; modelStatus: string; nativeWebMcp: boolean }

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

  const { initWebMcp } = await import('@/lib/webmcp/init')
  await initWebMcp()

  const ctx = getModelContext()
  if (!ctx) {
    return { status: 'needs-setup', reason: 'webmcp-unavailable', modelStatus }
  }

  if (modelStatus === 'downloadable' || modelStatus === 'downloading') {
    return { status: 'needs-setup', reason: 'model-downloadable', modelStatus }
  }

  const { nativeWebMcpAvailableAtLoad } = await import('@/lib/webmcp/nativeAtLoad')
  return {
    status: 'ready',
    modelStatus,
    nativeWebMcp: nativeWebMcpAvailableAtLoad(),
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
