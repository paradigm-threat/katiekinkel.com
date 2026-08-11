import type { CallToolResult } from '@mcp-b/webmcp-types'
import { WEBMCP_TOOL_NAMES } from '@/lib/webmcp/registerTools'
import {
  executeExplainThisDemo,
  executeGetCaseStudy,
  executeGetEducation,
  executeGetHirePitch,
  executeGetJobByCompany,
  executeGetProfileSummary,
  executeGetResumeLinks,
  executeGetSkillsAndTools,
  executeGetSpotifyQaProof,
  executeGetWorkHistory,
  executeListCaseStudies,
  executeListEvaluationCriteria,
  executeNavigateToSection,
  executeOpenCaseStudy,
  executeScoreSampleOutput,
  executeSearchFacts,
} from '@/lib/webmcp/toolHandlers'
import { sanitizeToolArgs, truncateForModel } from '@/lib/siteAi/limits'

export type SiteAiToolCall = {
  name: string
  arguments: Record<string, unknown>
}

type ToolHandler = (args: Record<string, unknown>) => CallToolResult | Promise<CallToolResult>

const HANDLERS: Record<string, ToolHandler> = {
  get_profile_summary: () => executeGetProfileSummary(),
  get_work_history: () => executeGetWorkHistory(),
  get_job_by_company: executeGetJobByCompany,
  get_education: () => executeGetEducation(),
  get_skills_and_tools: () => executeGetSkillsAndTools(),
  get_spotify_qa_proof: () => executeGetSpotifyQaProof(),
  get_resume_links: () => executeGetResumeLinks(),
  search_facts: executeSearchFacts,
  list_evaluation_criteria: () => executeListEvaluationCriteria(),
  list_case_studies: () => executeListCaseStudies(),
  get_case_study: executeGetCaseStudy,
  get_hire_pitch: () => executeGetHirePitch(),
  navigate_to_section: executeNavigateToSection,
  explain_this_demo: () => executeExplainThisDemo(),
  open_case_study: executeOpenCaseStudy,
  score_sample_output: executeScoreSampleOutput,
}

const ALLOWED = new Set(WEBMCP_TOOL_NAMES)

export function toolResultToText(result: CallToolResult): string {
  if (result.isError) {
    const block = result.content?.find((c) => c.type === 'text')
    const text = block && 'text' in block && typeof block.text === 'string' ? block.text : 'Tool error'
    return truncateForModel(`Error: ${text}`)
  }
  const block = result.content?.find((c) => c.type === 'text')
  if (block && 'text' in block && typeof block.text === 'string' && block.text) {
    return truncateForModel(block.text)
  }
  return truncateForModel(JSON.stringify(result.structuredContent ?? result.content, null, 2))
}

export async function executeSiteAiTool(
  name: string,
  args: Record<string, unknown>,
): Promise<string> {
  if (!ALLOWED.has(name) || !(name in HANDLERS)) {
    return `Error: tool "${name}" is not allowed`
  }
  const handler = HANDLERS[name]
  try {
    const safeArgs = sanitizeToolArgs(args ?? {})
    return toolResultToText(await handler(safeArgs))
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'tool failed'
    return `Error: ${msg}`
  }
}

export const TOOL_CALL_START = '<<<TOOL_CALL>>>'
export const TOOL_CALL_END = '<<<END_TOOL_CALL>>>'

const MAX_TOOL_CALL_JSON = 16_000

function parseToolCallJson(jsonSlice: string): SiteAiToolCall | null {
  if (jsonSlice.length > MAX_TOOL_CALL_JSON) return null
  try {
    const parsed = JSON.parse(jsonSlice) as {
      name?: string
      arguments?: Record<string, unknown>
      args?: Record<string, unknown>
    }
    if (!parsed.name || typeof parsed.name !== 'string') return null
    if (!ALLOWED.has(parsed.name)) return null
    const rawArgs = parsed.arguments ?? parsed.args ?? {}
    if (!rawArgs || typeof rawArgs !== 'object' || Array.isArray(rawArgs)) {
      return { name: parsed.name, arguments: {} }
    }
    return {
      name: parsed.name,
      arguments: sanitizeToolArgs(rawArgs as Record<string, unknown>),
    }
  } catch {
    return null
  }
}

export function parseToolCall(text: string): SiteAiToolCall | null {
  const trimmed = text.trim()
  const startIdx = trimmed.indexOf(TOOL_CALL_START)
  const endIdx = trimmed.indexOf(TOOL_CALL_END)
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return parseToolCallJson(trimmed.slice(startIdx + TOOL_CALL_START.length, endIdx).trim())
  }
  const fenced = trimmed.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
  if (fenced?.[1]) {
    const parsed = parseToolCallJson(fenced[1])
    if (parsed) return parsed
  }
  if (trimmed.startsWith('{') && trimmed.includes('"name"')) {
    return parseToolCallJson(trimmed.slice(0, MAX_TOOL_CALL_JSON))
  }
  return null
}

export function stripToolMarkers(text: string): string {
  const startIdx = text.indexOf(TOOL_CALL_START)
  const endIdx = text.indexOf(TOOL_CALL_END)
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return `${text.slice(0, startIdx)}${text.slice(endIdx + TOOL_CALL_END.length)}`.trim()
  }
  return text.trim()
}
