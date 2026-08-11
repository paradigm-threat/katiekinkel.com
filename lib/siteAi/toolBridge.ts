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

export function toolResultToText(result: CallToolResult): string {
  if (result.isError) {
    const block = result.content?.find((c) => c.type === 'text')
    const text = block && 'text' in block && typeof block.text === 'string' ? block.text : 'Tool error'
    return `Error: ${text}`
  }
  const block = result.content?.find((c) => c.type === 'text')
  if (block && 'text' in block && typeof block.text === 'string' && block.text) {
    return block.text
  }
  return JSON.stringify(result.structuredContent ?? result.content, null, 2)
}

export async function executeSiteAiTool(
  name: string,
  args: Record<string, unknown>,
): Promise<string> {
  if (!WEBMCP_TOOL_NAMES.includes(name)) {
    return `Error: tool "${name}" is not allowed`
  }
  const handler = HANDLERS[name]
  if (!handler) return `Error: tool "${name}" is not available`
  return toolResultToText(await handler(args ?? {}))
}

export const TOOL_CALL_START = '<<<TOOL_CALL>>>'
export const TOOL_CALL_END = '<<<END_TOOL_CALL>>>'

function parseToolCallJson(jsonSlice: string): SiteAiToolCall | null {
  try {
    const parsed = JSON.parse(jsonSlice) as { name?: string; arguments?: Record<string, unknown>; args?: Record<string, unknown> }
    if (!parsed.name || typeof parsed.name !== 'string') return null
    return {
      name: parsed.name,
      arguments: parsed.arguments ?? parsed.args ?? {},
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
    return parseToolCallJson(trimmed)
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
