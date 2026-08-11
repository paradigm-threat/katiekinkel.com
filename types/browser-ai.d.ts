/** Chrome Prompt API (Gemini Nano) — https://developer.chrome.com/docs/ai/prompt-api */
interface LanguageModelCreateOptions {
  signal?: AbortSignal
  expectedInputs?: Array<{ type: 'text' | 'image' | 'audio'; languages?: string[] }>
  expectedOutputs?: Array<{ type: 'text'; languages?: string[] }>
  initialPrompts?: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
  monitor?: (monitor: EventTarget) => void
}

interface LanguageModelSession {
  prompt: (
    input: string | Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: { signal?: AbortSignal },
  ) => Promise<string>
  destroy: () => void
}

interface LanguageModelStatic {
  availability: (
    options?: LanguageModelCreateOptions,
  ) => Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>
  create: (options?: LanguageModelCreateOptions) => Promise<LanguageModelSession>
}

interface Navigator {
  modelContext?: import('@mcp-b/webmcp-types').ModelContext
}

interface Document {
  modelContext?: import('@mcp-b/webmcp-types').ModelContext
}

interface Window {
  LanguageModel?: LanguageModelStatic
}
