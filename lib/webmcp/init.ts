import { isWebMcpEnabled, isWebMcpPolyfillForced } from '@/lib/features'
import { hasNativeModelContext } from '@/lib/webmcp/modelContext'
import { nativeWebMcpAvailableAtLoad } from '@/lib/webmcp/nativeAtLoad'
import { registerAllWebMcpTools } from '@/lib/webmcp/registerTools'

let initPromise: Promise<{ usedPolyfill: boolean; registered: boolean }> | null = null

export type WebMcpInitResult = {
  usedPolyfill: boolean
  registered: boolean
  nativeAtLoad: boolean
}

/**
 * Native WebMCP when present; otherwise install `@mcp-b/webmcp-polyfill` so
 * Prompt-API browsers without modelContext still get a registerTool surface
 * for the in-page demo (and Tool Inspector testing shim).
 *
 * Polyfill does not make tools visible to Gemini-in-Chrome — that needs native + OT.
 */
export async function initWebMcp(): Promise<WebMcpInitResult> {
  if (!isWebMcpEnabled() || typeof window === 'undefined') {
    return { usedPolyfill: false, registered: false, nativeAtLoad: false }
  }
  if (initPromise) return initPromise

  initPromise = (async () => {
    const nativeAtLoad = nativeWebMcpAvailableAtLoad()
    const native = hasNativeModelContext()
    let usedPolyfill = false

    // Prompt-API browsers often ship without WebMCP yet — polyfill fills modelContext.
    if (!native || isWebMcpPolyfillForced()) {
      // Prevent duplicate auto-init side effects; we call initialize explicitly.
      window.__webMCPPolyfillOptions = {
        autoInitialize: false,
        installTestingShim: 'if-missing',
      }
      const { initializeWebMCPPolyfill } = await import('@mcp-b/webmcp-polyfill')
      initializeWebMCPPolyfill({
        installTestingShim: 'if-missing',
      })
      usedPolyfill = !nativeAtLoad || isWebMcpPolyfillForced()
    }

    registerAllWebMcpTools()
    return {
      usedPolyfill,
      registered: hasNativeModelContext(),
      nativeAtLoad,
    }
  })()

  return initPromise
}
