import { DEMO_CONFESSION, getFactSheet, searchFacts } from '@/lib/agent/factSheet'
import { evaluationCriteria } from '@/lib/content'
import {
  clampString,
  MAX_SCORE_DRAFT_CHARS,
  MAX_SEARCH_QUERY_CHARS,
} from '@/lib/siteAi/limits'
import { toolErrorResult, toolJsonResult } from '@/lib/webmcp/toolResult'

export function executeGetProfileSummary() {
  const s = getFactSheet()
  return toolJsonResult({
    name: s.name,
    jobTitle: s.jobTitle,
    email: s.email,
    linkedinUrl: s.linkedinUrl,
    siteUrl: s.siteUrl,
    availability: s.availability,
    objective: s.objective,
    summary: s.summary,
    reliabilityRefrain: s.reliabilityRefrain,
    heroSubheadline: s.heroSubheadline,
  })
}

export function executeGetWorkHistory() {
  return toolJsonResult({ experience: getFactSheet().experience })
}

export function executeGetJobByCompany(args: Record<string, unknown>) {
  const keyword = clampString(args.keyword ?? args.company ?? '', MAX_SEARCH_QUERY_CHARS)
    .trim()
    .toLowerCase()
  if (!keyword) return toolErrorResult('Provide keyword or company')
  const jobs = getFactSheet().experience.filter(
    (j) =>
      j.company.toLowerCase().includes(keyword) ||
      j.title.toLowerCase().includes(keyword) ||
      j.description.toLowerCase().includes(keyword),
  )
  return toolJsonResult({ keyword, jobs, count: jobs.length })
}

export function executeGetEducation() {
  return toolJsonResult({ education: getFactSheet().education, also: getFactSheet().also })
}

export function executeGetSkillsAndTools() {
  const s = getFactSheet()
  return toolJsonResult({
    surfaces: s.surfaces,
    modelFamilies: s.modelFamilies,
    capabilities: s.capabilities,
    techFocus: s.techFocus,
    siteStack: s.siteStack,
    siteStackQuip: s.siteStackQuip,
  })
}

export function executeGetSpotifyQaProof() {
  const s = getFactSheet()
  const spotifyJobs = s.experience.filter((j) =>
    /spotify|24-7|intouch/i.test(`${j.company} ${j.description}`),
  )
  const caseStudy = s.caseStudies.find((c) => /spotify/i.test(c.title))
  return toolJsonResult({
    spotifyProofLine: s.spotifyProofLine,
    jobs: spotifyJobs,
    caseStudy: caseStudy ?? null,
  })
}

export function executeGetResumeLinks() {
  return toolJsonResult({ resumeLinks: getFactSheet().resumeLinks })
}

export function executeSearchFacts(args: Record<string, unknown>) {
  const query = clampString(args.query ?? '', MAX_SEARCH_QUERY_CHARS).trim()
  if (query.length < 2) return toolErrorResult('query must be at least 2 characters')
  return toolJsonResult(searchFacts(query))
}

export function executeListEvaluationCriteria() {
  return toolJsonResult({ criteria: getFactSheet().evaluationCriteria })
}

export function executeListCaseStudies() {
  return toolJsonResult({
    caseStudies: getFactSheet().caseStudies.map((c) => ({
      title: c.title,
      flagship: !!c.flagship,
      metric: c.metric ?? null,
    })),
  })
}

export function executeGetCaseStudy(args: Record<string, unknown>) {
  const title = clampString(args.title ?? args.name ?? '', MAX_SEARCH_QUERY_CHARS)
    .trim()
    .toLowerCase()
  if (!title) return toolErrorResult('Provide title')
  const found = getFactSheet().caseStudies.find((c) => c.title.toLowerCase().includes(title))
  if (!found) return toolErrorResult(`No case study matching "${title}"`)
  return toolJsonResult(found)
}

export function executeGetHirePitch() {
  const s = getFactSheet()
  return toolJsonResult({
    jobTitle: s.jobTitle,
    availability: s.availability,
    objective: s.objective,
    email: s.email,
    linkedinUrl: s.linkedinUrl,
    hireSection: '#hire',
  })
}

export function executeNavigateToSection(args: Record<string, unknown>) {
  const section = clampString(args.section ?? args.id ?? '', 64)
    .trim()
    .replace(/^#/, '')
    .toLowerCase()
  const allowed = ['evaluation', 'proof', 'hire', 'models', 'ai', 'top', 'stack']
  if (!allowed.includes(section)) {
    return toolErrorResult(`section must be one of: ${allowed.join(', ')}`)
  }
  if (typeof window !== 'undefined') {
    const el = document.getElementById(section === 'top' ? 'top' : section)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.location.hash = section === 'top' ? '' : `#${section}`
  }
  return toolJsonResult({ navigated: true, section: `#${section}` })
}

export function executeExplainThisDemo() {
  const s = getFactSheet()
  return toolJsonResult({
    confession: DEMO_CONFESSION,
    orderedBy: s.demo.orderedBy,
    stack: s.demo.stack,
  })
}

export function executeScoreSampleOutput(args: Record<string, unknown>) {
  const text = clampString(args.text ?? args.draft ?? '', MAX_SCORE_DRAFT_CHARS).trim()
  if (text.length < 20) {
    return toolErrorResult('Provide a draft of at least 20 characters in text')
  }
  const criteria = evaluationCriteria.map((c) => {
    let note = 'Needs human judgment'
    let hintScore: number | null = null
    if (c.title === 'Completeness') {
      hintScore = text.length > 200 ? 4 : text.length > 80 ? 3 : 2
      note = `Draft length ${text.length} chars`
    }
    if (c.title === 'Formatting') {
      const hasLists = /^[-*]|\d+\./m.test(text) || text.includes('\n')
      hintScore = hasLists ? 4 : 3
      note = hasLists ? 'Has structure markers' : 'Mostly prose'
    }
    if (c.title === 'Hallucinations') {
      const suspicious = /as an ai|i made up|fake citation|doi:10\.\d+/i.test(text)
      hintScore = suspicious ? 1 : null
      note = suspicious
        ? 'Possible hallucination markers — flag for human review'
        : 'No crude markers; still requires human factual check'
    }
    return { criterion: c.title, description: c.body, hintScore, note }
  })
  return toolJsonResult({
    label: 'Portfolio evaluation exercise — heuristic hints only; Katie’s judgment is the product',
    draftPreview: text.slice(0, 400),
    criteria,
  })
}

export function executeOpenCaseStudy(args: Record<string, unknown>) {
  const nav = executeNavigateToSection({ section: 'proof' })
  const title = clampString(args.title ?? '', MAX_SEARCH_QUERY_CHARS).trim()
  return toolJsonResult({
    ...(nav.structuredContent as object),
    openedProofSection: true,
    requestedTitle: title || null,
    hint: 'Case studies are listed in #proof — use get_case_study for full text.',
  })
}
