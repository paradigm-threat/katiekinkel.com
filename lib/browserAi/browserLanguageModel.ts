export type BrowserLanguageModelSession = {
  prompt: (
    input: string | LanguageModelMessage[],
    options?: { signal?: AbortSignal },
  ) => Promise<string>
  destroy: () => void
}

export type LanguageModelMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type ModelSessionProgress = {
  kind: 'checking' | 'downloading' | 'ready'
  message: string
  loaded?: number
}

const LM_OPTIONS = {
  expectedInputs: [{ type: 'text' as const, languages: ['en'] }],
  expectedOutputs: [{ type: 'text' as const, languages: ['en'] }],
}

const LM_CREATE_TIMEOUT_MS = 120_000

export async function getLanguageModelAvailability(): Promise<string> {
  if (typeof window === 'undefined' || !window.LanguageModel?.availability) {
    return 'unavailable'
  }
  try {
    return await window.LanguageModel.availability(LM_OPTIONS)
  } catch {
    return 'unavailable'
  }
}

export async function createBrowserLanguageModelSession(
  systemPrompt: string,
  options?: {
    signal?: AbortSignal
    onSessionProgress?: (progress: ModelSessionProgress) => void
  },
): Promise<BrowserLanguageModelSession> {
  const LM = window.LanguageModel
  if (!LM?.create) {
    throw new Error('Browser language model (Prompt API) is not available')
  }

  options?.onSessionProgress?.({
    kind: 'checking',
    message: 'Preparing on-device language model…',
  })

  const controller = new AbortController()
  let timedOut = false
  const timeoutId = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, LM_CREATE_TIMEOUT_MS)

  const onUserAbort = () => controller.abort()
  if (options?.signal) {
    if (options.signal.aborted) controller.abort()
    else options.signal.addEventListener('abort', onUserAbort, { once: true })
  }

  try {
    const session = await LM.create({
      ...LM_OPTIONS,
      signal: controller.signal,
      initialPrompts: [{ role: 'system', content: systemPrompt }],
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          const loaded = (e as ProgressEvent & { loaded?: number }).loaded
          options?.onSessionProgress?.({
            kind: 'downloading',
            message: 'Downloading on-device language model…',
            loaded: typeof loaded === 'number' ? loaded : undefined,
          })
        })
      },
    })

    options?.onSessionProgress?.({ kind: 'ready', message: 'Language model ready' })

    return {
      prompt: (input, opts) => session.prompt(input, opts),
      destroy: () => session.destroy(),
    }
  } catch (e) {
    if (timedOut && !options?.signal?.aborted) {
      throw new Error('Language model create timed out — try again after the model finishes downloading.')
    }
    throw e
  } finally {
    clearTimeout(timeoutId)
    options?.signal?.removeEventListener('abort', onUserAbort)
  }
}
