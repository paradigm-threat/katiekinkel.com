export const email = 'ktkinkel@gmail.com'
export const linkedinUrl = 'https://www.linkedin.com/in/katie-k-92602250/'
export const siteUrl = 'https://katiekinkel.com'

export const surfaces = ['Cursor', 'Copilot', 'ChatGPT'] as const

export const modelFamilies = [
  'GPT',
  'Codex',
  'Claude Opus',
  'Claude Sonnet',
  'Claude Fable',
  'Claude Haiku',
  'Gemini',
  'Grok',
  'Composer',
] as const

export const focusItems = [
  { title: 'Human QA on AI output', icon: 'shield' as const },
  { title: 'LLM-assisted workflows', icon: 'bot' as const },
  { title: 'Ops & organization', icon: 'folders' as const },
  { title: 'Prototypes & proofreading', icon: 'layout' as const },
] as const

/** Illustrated value cards — dark + light assets in /public/assets */
export const valueCards = [
  {
    title: 'Problem Solver',
    body: 'I break down messy requests into clear steps — then verify the result before anyone depends on it.',
    darkImage: '/assets/icon-problem-solver.png',
    lightImage: '/assets/icon-problem-solver-light.png',
  },
  {
    title: 'Builder',
    body: 'I spin up website prototypes, docs, and process sketches so stakeholders can react to something real.',
    darkImage: '/assets/icon-builder.png',
    lightImage: '/assets/icon-builder-light.png',
  },
  {
    title: 'QA Driven',
    body: 'Spotify QA Buddy instincts: every AI draft gets a human pass. Judgment is the product.',
    darkImage: '/assets/icon-qa-driven.png',
    lightImage: '/assets/icon-qa-driven-light.png',
  },
  {
    title: 'Collaborative',
    body: 'I thrive across support hubs, neighborhood minutes, and rescue ops — clear communication everyone can follow.',
    darkImage: '/assets/icon-collaboration.png',
    lightImage: '/assets/icon-collaboration-light.png',
  },
] as const

export const techFocus = [
  { label: 'AI-assisted drafting', icon: 'bot' as const },
  { label: 'Human QA & review', icon: 'shield' as const },
  { label: 'UX polish', icon: 'layout' as const },
  { label: 'Ops & organization', icon: 'folders' as const },
  { label: 'Research & docs', icon: 'search' as const },
  { label: 'Stakeholder comms', icon: 'message' as const },
] as const

export const skillTags = [
  { label: 'Cursor', icon: 'cursor' as const },
  { label: 'GitHub Copilot', icon: 'copilot' as const },
  { label: 'ChatGPT', icon: 'chat' as const },
  { label: 'Claude', icon: 'claude' as const },
  { label: 'Gemini', icon: 'gemini' as const },
  { label: 'Grok', icon: 'grok' as const },
  { label: 'QA & nesting', icon: 'check' as const },
  { label: 'Research', icon: 'search' as const },
  { label: 'Prototyping', icon: 'spark' as const },
  { label: 'Minutes & docs', icon: 'file' as const },
  { label: 'Ops hygiene', icon: 'cpu' as const },
  { label: 'Stakeholder comms', icon: 'message' as const },
] as const

export const values = [
  {
    title: 'Curiosity',
    body: 'Jumps into new AI tools eagerly — and learns the underlying workflow well enough to direct them.',
    icon: 'lightbulb' as const,
  },
  {
    title: 'Ownership',
    body: 'Owns the final product. AI drafts; Katie reviews, corrects, and ships.',
    icon: 'target' as const,
  },
  {
    title: 'Quality',
    body: 'Every AI draft gets a human QA pass — accuracy, tone, and UX checked before anything ships.',
    icon: 'rocket' as const,
  },
  {
    title: 'Purpose',
    body: 'Professional and enthusiastic — helping people and organizations get organized without losing the human touch.',
    icon: 'heart' as const,
  },
] as const

export const highlights = [
  { label: 'Years at Spotify CS / QA', value: '3+', icon: 'briefcase' as const },
  { label: 'AI surfaces in daily use', value: '3', icon: 'layers' as const },
  { label: 'Model families fluent in', value: '9+', icon: 'cpu' as const },
  { label: 'Community ops roles', value: '3+', icon: 'users' as const },
] as const

export const capabilities = [
  {
    title: 'Organization',
    body: 'Structure chaos into agendas, folders, trackers, and follow-ups that teams can actually run.',
  },
  {
    title: 'Research',
    body: 'Pull sources fast, compare options, and surface what matters — then verify before anyone acts on it.',
  },
  {
    title: 'QA & validation',
    body: 'The non-negotiable step: every AI draft gets a human pass. That judgment is the product.',
  },
  {
    title: 'Prototyping',
    body: 'Spin up website mockups, copy variants, and process sketches so stakeholders can react to something real.',
  },
  {
    title: 'Communication',
    body: 'Minutes, emails, briefs, and neighbor-friendly language — clear, warm, and on-brand.',
  },
  {
    title: 'Ops & tech hygiene',
    body: 'Scan, organize, and optimize computers and files so the tools get out of the way of the work.',
  },
] as const

export const proofItems = [
  {
    title: 'Legal aid support',
    body: 'Helped a disabled person navigate paperwork and communications with AI-assisted drafting — always reviewed line by line before anything was sent.',
  },
  {
    title: 'Neighborhood secretary',
    body: 'As secretary of the Gordonston Neighborhood Association, wrote and maintained meeting minutes with AI for speed and human QA for accuracy.',
  },
  {
    title: 'Local cat rescue',
    body: 'Helped organize rescue logistics, outreach notes, and day-to-day coordination so volunteers could move faster without dropping details.',
  },
  {
    title: 'Computer & file systems',
    body: 'Scanning, organizing, and optimizing machines — pairing advanced AI tools with careful verification so nothing important gets lost.',
  },
  {
    title: 'Website prototypes',
    body: 'Generating site prototypes and doing fast proofreading passes so pages ship clean, readable, and on-message.',
  },
] as const

export const experience = [
  {
    title: 'AI-augmented generalist',
    company: 'Independent',
    location: 'Remote / Savannah area',
    duration: '2022 – Present',
    description:
      'Uses Cursor, GitHub Copilot, and ChatGPT for research, drafting, QA, prototyping, and operations. Builds websites, writes association minutes, supports community and caretaking workflows, and treats human review as the quality gate on every deliverable.',
  },
  {
    title: 'Creative Support / QA Buddy',
    company: '24-7 Intouch / Spotify',
    location: 'Phoenix, AZ',
    duration: '2019 – 2022',
    description:
      'Started on @SpotifyCares (Khoros), promoted to Creative Support L3 (Salesforce), then QA Buddy. Ran LIO & Marquee ROTAs, built and maintained the CrS Phoenix Hub, gave Guru process feedback, and performed QA audits, alignments, and nesting assistance.',
  },
  {
    title: 'Independent Tutor',
    company: 'Odyssey Services / independent',
    location: 'AZ / NV / UT',
    duration: '2015 – 2018',
    description:
      'Tutored students K–college across subjects while following IEPs. Held tutoring certifications for Arizona, Nevada, and Utah.',
  },
  {
    title: 'Credit Card Fraud Specialist',
    company: 'J.P. Morgan Chase',
    location: 'Arizona',
    duration: '2009 – 2010',
    description:
      'Inbound/outbound fraud calls with secure data access. Promoted to L2, created procedural quick-sheets for the floor, beta-tested in-house software, averaged ~125% of quota.',
  },
  {
    title: 'Seasonal Ticket Sales',
    company: 'Pittsburgh Symphony Orchestra',
    location: 'Pittsburgh, PA',
    duration: '2001 – 2002',
    description:
      'Scripted cold outbound calls to past seasonal-ticket subscribers. Hourly plus commission sales downtown.',
  },
] as const

export const education = [
  {
    school: 'The Atlanta Art Institute',
    degree: 'Media Arts and Animation',
    duration: '2002 – 2006',
  },
] as const

export const also = [
  {
    title: 'Arizona Friends of Homeless',
    duration: '2017 – ',
    description: 'Outreach coordinator, Facebook & tech admin, event planning, resource lists.',
  },
  {
    title: 'Harkins Theatres',
    duration: '2018',
    description: 'Online ticketing stress testing and feedback for seating-chart UX.',
  },
  {
    title: 'SNESology',
    duration: '2011 – 2013',
    description: 'Created and maintained social media for a themed musical project / blog.',
  },
] as const

export const summary =
  'Personable, motivated problem-solver who resolves issues with grace. After Spotify Creative Support and QA Buddy work, deepened fluency with AI tools for virtually every organizational skill companies need — always with a human QA pass before anything ships.'

export const objective =
  'I strive for excellence, appreciate context, and want to share a positive experience with my team — now amplified by AI, grounded by review.'

export const missionQuote =
  'I use AI to draft faster, then apply human QA so the UX is clear, accurate, and ready to ship.'
