import { isWebMcpEnabled, isWebMcpPolyfillForced } from '@/lib/features'
import { hasNativeModelContext } from '@/lib/webmcp/modelContext'
import { nativeWebMcpAvailableAtLoad } from '@/lib/webmcp/nativeAtLoad'
import { registerAllWebMcpTools } from '@/lib/webmcp/registerTools'

let initPromise: Promise<void> | null = null

export async function initWebMcp(): Promise<void> {
  if (!isWebMcpEnabled()) return
  if (typeof window === 'undefined') return
  if (initPromise) return initPromise

  initPromise = (async () => {
    nativeWebMcpAvailableAtLoad()
    const native = hasNativeModelContext()
    if (!native || isWebMcpPolyfillForced()) {
      const { initializeWebMCPPolyfill } = await import('@mcp-b/webmcp-polyfill')
      initializeWebMCPPolyfill({
        autoInitialize: false,
        installTestingShim: 'if-missing',
      })
    }
    registerAllWebMcpTools()
  })()

  return initPromise
}
