import { isWebMcpEnabled, isWebMcpPolyfillForced } from '@/lib/features'
import { hasNativeModelContext } from '@/lib/webmcp/modelContext'
import { nativeWebMcpAvailableAtLoad } from '@/lib/webmcp/nativeAtLoad'
import { registerAllWebMcpTools } from '@/lib/webmcp/registerTools'

let initPromise: Promise<WebMcpInitResult> | null = null

export type WebMcpInitResult = {
  usedPolyfill: boolean
  registered: boolean
  nativeAtLoad: boolean
  error?: string
}

/**
 * Native WebMCP when present; otherwise install `@mcp-b/webmcp-polyfill` so
 * Prompt-API browsers without modelContext still get a registerTool surface.
 * Failures are isolated — in-page tool bridge still works without modelContext.
 */
export async function initWebMcp(): Promise<WebMcpInitResult> {
  if (!isWebMcpEnabled() || typeof window === 'undefined') {
    return { usedPolyfill: false, registered: false, nativeAtLoad: false }
  }
  if (initPromise) return initPromise

  initPromise = (async (): Promise<WebMcpInitResult> => {
    const nativeAtLoad = nativeWebMcpAvailableAtLoad()
    let usedPolyfill = false
    let error: string | undefined

    try {
      const native = hasNativeModelContext()

      if (!native || isWebMcpPolyfillForced()) {
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
    } catch (e) {
      error = e instanceof Error ? e.message : 'WebMCP init failed'
      console.warn('[WebMCP]', error)
      // Allow a later retry if registration failed mid-flight.
      initPromise = null
    }

    return {
      usedPolyfill,
      registered: hasNativeModelContext(),
      nativeAtLoad,
      error,
    }
  })()

  return initPromise
}
