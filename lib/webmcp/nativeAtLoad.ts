import type { ModelContext } from '@mcp-b/webmcp-types'

let captured: boolean | null = null

export function nativeWebMcpAvailableAtLoad(): boolean {
  if (captured !== null) return captured
  if (typeof document === 'undefined') {
    captured = false
    return false
  }
  const doc = document as Document & { modelContext?: ModelContext }
  captured = !!(
    doc.modelContext ||
    (typeof navigator !== 'undefined' && navigator.modelContext)
  )
  return captured
}

export function resetNativeWebMcpCaptureForTests(): void {
  captured = null
}
