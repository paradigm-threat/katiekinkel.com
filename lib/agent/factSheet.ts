import {
  also,
  availabilityLine,
  capabilities,
  caseStudies,
  education,
  email,
  evaluationCriteria,
  experience,
  heroSubheadline,
  jobTitle,
  linkedinUrl,
  modelFamilies,
  objective,
  reliabilityRefrain,
  siteStack,
  siteStackQuip,
  siteUrl,
  spotifyProofLine,
  summary,
  surfaces,
  techFocus,
} from '@/lib/content'

export const DEMO_CONFESSION =
  'I’m an on-page demo of WebMCP and Chrome’s on-device Gemini (Prompt API) on this Next.js portfolio. I answer questions about Katie and this site using structured facts from MCP tools on the page.'

export type FactSheet = {
  name: string
  jobTitle: string
  email: string
  linkedinUrl: string
  siteUrl: string
  availability: string
  heroSubheadline: string
  objective: string
  summary: string
  reliabilityRefrain: string
  spotifyProofLine: string
  surfaces: readonly string[]
  modelFamilies: readonly string[]
  capabilities: { title: string; body: string }[]
  techFocus: { label: string }[]
  siteStack: string[]
  siteStackQuip: string
  experience: {
    title: string
    company: string
    location: string
    duration: string
    description: string
  }[]
  education: { school: string; degree: string; duration: string }[]
  also: { title: string; duration: string; description: string }[]
  evaluationCriteria: { title: string; body: string }[]
  caseStudies: {
    title: string
    flagship?: boolean
    problem: string
    aiUsed: string
    reviewed: string
    result: string
    metric?: string
  }[]
  resumeLinks: { label: string; path: string }[]
  demo: {
    confession: string
    stack: string[]
    orderedBy: string
  }
}

export function getFactSheet(): FactSheet {
  return {
    name: 'Katie Kinkel',
    jobTitle,
    email,
    linkedinUrl,
    siteUrl,
    availability: availabilityLine,
    heroSubheadline,
    objective,
    summary,
    reliabilityRefrain,
    spotifyProofLine,
    surfaces: [...surfaces],
    modelFamilies: [...modelFamilies],
    capabilities: capabilities.map((c) => ({ title: c.title, body: c.body })),
    techFocus: techFocus.map((t) => ({ label: t.label })),
    siteStack: [...siteStack],
    siteStackQuip,
    experience: experience.map((j) => ({ ...j })),
    education: education.map((e) => ({ ...e })),
    also: also.map((a) => ({ ...a })),
    evaluationCriteria: evaluationCriteria.map((c) => ({ ...c })),
    caseStudies: caseStudies.map((c) => ({
      title: c.title,
      flagship: c.flagship,
      problem: c.problem,
      aiUsed: c.aiUsed,
      reviewed: c.reviewed,
      result: c.result,
      metric: c.metric,
    })),
    resumeLinks: [
      { label: 'AI QA one-pager PDF', path: '/Katie-Kinkel-AI-QA-Resume.pdf' },
      { label: 'Full résumé PDF', path: '/Katie-Kinkel-Resume.pdf' },
    ],
    demo: {
      confession: DEMO_CONFESSION,
      stack: [...siteStack],
      orderedBy:
        'This portfolio uses Next.js with an in-browser AI demo (WebMCP + Chrome Prompt API). When the browser has the Prompt API but not native WebMCP, the page loads @mcp-b/webmcp-polyfill so tools still register for the demo.',
    },
  }
}

/** Keyword search across the fact sheet for “did she do X?” style questions. */
export function searchFacts(query: string): { matches: string[]; query: string } {
  const q = query.trim().toLowerCase()
  if (q.length < 2) {
    return { matches: [], query }
  }
  const sheet = getFactSheet()
  const haystacks: string[] = [
    sheet.summary,
    sheet.objective,
    sheet.spotifyProofLine,
    sheet.jobTitle,
    ...sheet.experience.map(
      (j) => `${j.title} ${j.company} ${j.location} ${j.duration} ${j.description}`,
    ),
    ...sheet.education.map((e) => `${e.school} ${e.degree} ${e.duration}`),
    ...sheet.also.map((a) => `${a.title} ${a.duration} ${a.description}`),
    ...sheet.capabilities.map((c) => `${c.title} ${c.body}`),
    sheet.siteStackQuip,
    ...sheet.siteStack,
    ...sheet.demo.stack,
    ...sheet.caseStudies.map(
      (c) => `${c.title} ${c.problem} ${c.aiUsed} ${c.reviewed} ${c.result}`,
    ),
    ...sheet.evaluationCriteria.map((c) => `${c.title} ${c.body}`),
    ...sheet.surfaces,
    ...sheet.modelFamilies,
  ]

  const tokens = q.split(/\s+/).filter(Boolean)
  const matches = haystacks.filter((line) => tokens.every((t) => line.toLowerCase().includes(t)))

  return {
    query,
    matches: matches.slice(0, 25),
  }
}
