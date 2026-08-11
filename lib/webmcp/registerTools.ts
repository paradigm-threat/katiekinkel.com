import type { InputSchema, ToolDescriptor } from '@mcp-b/webmcp-types'
import { getModelContext } from '@/lib/webmcp/modelContext'
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

type AnyTool = ToolDescriptor<Record<string, unknown>, unknown, string>

function wrap(
  name: string,
  description: string,
  inputSchema: InputSchema,
  execute: (args: Record<string, unknown>) => unknown,
  readOnly = true,
): AnyTool {
  return {
    name,
    description,
    inputSchema,
    annotations: { readOnlyHint: readOnly },
    execute: async (args) => execute(args ?? {}),
  }
}

const TOOLS: AnyTool[] = [
  wrap('get_profile_summary', 'Katie profile: title, contact, availability, summary (fact sheet only).', {
    type: 'object',
    properties: {},
  }, () => executeGetProfileSummary()),

  wrap('get_work_history', 'Full work history from the fact sheet.', {
    type: 'object',
    properties: {},
  }, () => executeGetWorkHistory()),

  wrap('get_job_by_company', 'Filter work history by company or keyword (e.g. Spotify, Chase).', {
    type: 'object',
    properties: {
      keyword: { type: 'string', description: 'Company or keyword' },
      company: { type: 'string', description: 'Alias for keyword' },
    },
  }, executeGetJobByCompany),

  wrap('get_education', 'Education and also-section entries from the fact sheet.', {
    type: 'object',
    properties: {},
  }, () => executeGetEducation()),

  wrap('get_skills_and_tools', 'Surfaces, model families, capabilities, tech focus, site stack.', {
    type: 'object',
    properties: {},
  }, () => executeGetSkillsAndTools()),

  wrap('get_spotify_qa_proof', 'Spotify support QA via 24-7 Intouch — fact sheet only.', {
    type: 'object',
    properties: {},
  }, () => executeGetSpotifyQaProof()),

  wrap('get_resume_links', 'Public résumé PDF paths on katiekinkel.com.', {
    type: 'object',
    properties: {},
  }, () => executeGetResumeLinks()),

  wrap('search_facts', 'Keyword search over the structured fact sheet.', {
    type: 'object',
    properties: {
      query: { type: 'string', minLength: 2 },
    },
    required: ['query'],
  }, executeSearchFacts),

  wrap('list_evaluation_criteria', 'Katie’s AI evaluation criteria list.', {
    type: 'object',
    properties: {},
  }, () => executeListEvaluationCriteria()),

  wrap('list_case_studies', 'Titles of portfolio case studies.', {
    type: 'object',
    properties: {},
  }, () => executeListCaseStudies()),

  wrap('get_case_study', 'Full case study by title substring.', {
    type: 'object',
    properties: {
      title: { type: 'string' },
      name: { type: 'string' },
    },
  }, executeGetCaseStudy),

  wrap('get_hire_pitch', 'Availability and how to hire / contact Katie.', {
    type: 'object',
    properties: {},
  }, () => executeGetHirePitch()),

  wrap('navigate_to_section', 'Scroll the page to a section id.', {
    type: 'object',
    properties: {
      section: {
        type: 'string',
        enum: ['evaluation', 'proof', 'hire', 'models', 'ai', 'top', 'stack'],
      },
      id: { type: 'string' },
    },
  }, executeNavigateToSection),

  wrap('explain_this_demo', 'Explain the in-page WebMCP + on-device Gemini demo and site stack.', {
    type: 'object',
    properties: {},
  }, () => executeExplainThisDemo()),

  wrap('open_case_study', 'Navigate to #proof and return case-study hint.', {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
  }, executeOpenCaseStudy),

  wrap(
    'score_sample_output',
    'Heuristic portfolio rubric hints on a pasted draft (not a substitute for Katie’s QA).',
    {
      type: 'object',
      properties: {
        text: { type: 'string', minLength: 20 },
        draft: { type: 'string' },
      },
    },
    executeScoreSampleOutput,
  ),
]

let registered = false

export function registerAllWebMcpTools(): void {
  if (registered) return
  const ctx = getModelContext()
  if (!ctx) return
  for (const tool of TOOLS) {
    try {
      ctx.registerTool(tool as ToolDescriptor & { inputSchema: InputSchema })
    } catch (e) {
      console.warn(`[WebMCP] failed to register ${tool.name}`, e)
    }
  }
  registered = true
}

export function resetWebMcpRegistrationForTests(): void {
  registered = false
}

export const WEBMCP_TOOL_NAMES = TOOLS.map((t) => t.name)
