import {
  createBrowserLanguageModelSession,
  type LanguageModelMessage,
} from '@/lib/browserAi/browserLanguageModel'
import {
  executeSiteAiTool,
  parseToolCall,
  stripToolMarkers,
} from '@/lib/siteAi/toolBridge'

export type AgentProgress =
  | { phase: 'loading-model'; message: string; loaded?: number }
  | { phase: 'thinking'; turn: number; message: string }
  | { phase: 'tool'; toolName: string; status: 'start' | 'done' }

export type RunAgentResult = {
  finalText: string
  toolCalls: Array<{ name: string; arguments: Record<string, unknown> }>
  turns: number
}

const DEFAULT_MAX_TURNS = 8

export async function runBrowserAgent(input: {
  systemPrompt: string
  userMessage: string
  history?: LanguageModelMessage[]
  maxTurns?: number
  signal?: AbortSignal
  onProgress?: (event: AgentProgress) => void
}): Promise<RunAgentResult> {
  const maxTurns = input.maxTurns ?? DEFAULT_MAX_TURNS
  const session = await createBrowserLanguageModelSession(input.systemPrompt, {
    signal: input.signal,
    onSessionProgress: (p) => {
      if (p.kind === 'downloading' || p.kind === 'checking') {
        input.onProgress?.({
          phase: 'loading-model',
          message: p.message,
          loaded: p.loaded,
        })
      }
    },
  })

  const toolCalls: RunAgentResult['toolCalls'] = []
  const conversation: LanguageModelMessage[] = [
    ...(input.history ?? []),
    { role: 'user', content: input.userMessage },
  ]

  try {
    for (let turn = 0; turn < maxTurns; turn++) {
      input.onProgress?.({
        phase: 'thinking',
        turn: turn + 1,
        message: turn === 0 ? 'Analyzing…' : `Thinking (step ${turn + 1})…`,
      })

      const response = await session.prompt(conversation, { signal: input.signal })
      const toolCall = parseToolCall(response)

      if (toolCall) {
        toolCalls.push({ name: toolCall.name, arguments: toolCall.arguments })
        input.onProgress?.({ phase: 'tool', toolName: toolCall.name, status: 'start' })
        const toolResult = await executeSiteAiTool(toolCall.name, toolCall.arguments)
        input.onProgress?.({ phase: 'tool', toolName: toolCall.name, status: 'done' })
        conversation.push({ role: 'assistant', content: response })
        conversation.push({
          role: 'user',
          content: `Tool result for ${toolCall.name}:\n${toolResult}\n\nContinue or write the final answer as plain prose (no tool markers).`,
        })
        continue
      }

      const finalText = stripToolMarkers(response)
      if (finalText.length >= 8) {
        return { finalText, toolCalls, turns: turn + 1 }
      }

      conversation.push({ role: 'assistant', content: response })
      conversation.push({
        role: 'user',
        content: 'Please give a short final answer in plain prose, or call a tool if you still need facts.',
      })
    }

    return {
      finalText: 'I could not finish within the tool-call budget. Try a narrower question.',
      toolCalls,
      turns: maxTurns,
    }
  } finally {
    session.destroy()
  }
}
