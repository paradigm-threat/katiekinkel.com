/** Master switch for WebMCP + in-page browser AI demo. */
export function isWebMcpEnabled(): boolean {
  return process.env.NEXT_PUBLIC_WEBMCP_ENABLED === '1'
}

/** Dev: force polyfill even when native modelContext exists. */
export function isWebMcpPolyfillForced(): boolean {
  return process.env.NEXT_PUBLIC_WEBMCP_POLYFILL === '1'
}
