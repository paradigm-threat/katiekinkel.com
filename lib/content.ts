export const email = 'ktkinkel@gmail.com'
export const linkedinUrl = 'https://www.linkedin.com/in/katie-kinkel/'
export const siteUrl = 'https://katiekinkel.com'
export const jobTitle = 'AI QA, Evaluation & Operations Specialist'
export const aiResumePdf = '/Katie-Kinkel-AI-QA-Resume.pdf'
export const fullResumePdf = '/Katie-Kinkel-Resume.pdf'

export const surfaces = ['Cursor', 'Copilot', 'ChatGPT'] as const

/** Family names only — no rotating Claude variants on the main page */
export const modelFamilies = [
  'GPT',
  'Claude',
  'Gemini',
  'Grok',
  'Codex',
  'Composer',
] as const

export const availabilityLine =
  'Open to remote · Part-time · Contract · AI evaluation / QA / operations'

export const heroSubheadline =
  'AI QA, LLM evaluation, human-in-the-loop review, and AI-assisted operations — available for remote part-time and contract work.'

export const spotifyProofLine =
  'Previous QA experience: Spotify support program via 24-7 Intouch.'

export const reliabilityRefrain =
  'AI generates; Katie evaluates, corrects, organizes, and ships.'

export const evaluationCriteria = [
  {
    title: 'Instruction following',
    body: 'Did the model do what was asked — and only what was asked?',
  },
  {
    title: 'Factual accuracy',
    body: 'Are claims checkable and true, or does the draft invent details?',
  },
  {
    title: 'Completeness',
    body: 'Are required sections, fields, and next steps present?',
  },
  {
    title: 'Tone',
    body: 'Is the voice appropriate for the audience and brand?',
  },
  {
    title: 'Formatting',
    body: 'Is structure scannable — headings, lists, links, and layout ready to use?',
  },
  {
    title: 'Hallucinations',
    body: 'Flag invented facts, fake citations, and confident wrong answers.',
  },
  {
    title: 'Edge cases',
    body: 'Probe odd inputs, missing context, and failure modes before ship.',
  },
  {
    title: 'Multi-output comparison',
    body: 'Score several model drafts against the same rubric and pick a winner.',
  },
  {
    title: 'Final human review',
    body: 'The non-negotiable gate: Katie signs off before anything leaves.',
  },
] as const

/** Illustrated hire cards — dark + light assets in /public/assets */
export const valueCards = [
  {
    title: 'AI Evaluation',
    body: 'Rubrics, side-by-side scoring, and clear pass/fail judgment on model output.',
    darkImage: '/assets/icon-ai-evaluation.png',
    lightImage: '/assets/icon-ai-evaluation-light.png',
  },
  {
    title: 'LLM QA',
    body: 'Catch hallucinations, tone misses, incomplete answers, and instruction drift.',
    darkImage: '/assets/icon-llm-qa.png',
    lightImage: '/assets/icon-llm-qa-light.png',
  },
  {
    title: 'AI-Assisted Operations',
    body: 'Turn messy notes and requests into organized trackers, minutes, and briefs.',
    darkImage: '/assets/icon-ai-ops.png',
    lightImage: '/assets/icon-ai-ops-light.png',
  },
  {
    title: 'Human-in-the-Loop Review',
    body: 'Every AI draft gets a human pass. Judgment is the product that ships.',
    darkImage: '/assets/icon-qa-driven.png',
    lightImage: '/assets/icon-qa-driven-light.png',
  },
] as const

export const techFocus = [
  { label: 'AI Evaluation & QA', icon: 'shield' as const },
  { label: 'LLM Workflows', icon: 'bot' as const },
  { label: 'AI Operations', icon: 'folders' as const },
  { label: 'Research', icon: 'search' as const },
  { label: 'Prototyping', icon: 'layout' as const },
  { label: 'Communication', icon: 'message' as const },
] as const

export const skillTags = [
  { label: 'LLM evaluation', icon: 'shield' as const },
  { label: 'Human QA & judgment', icon: 'check' as const },
  { label: 'HITL review', icon: 'target' as const },
  { label: 'Research', icon: 'search' as const },
  { label: 'AI operations', icon: 'folders' as const },
  { label: 'Communication', icon: 'message' as const },
  { label: 'Cursor', icon: 'cursor' as const },
  { label: 'ChatGPT', icon: 'chat' as const },
  { label: 'Claude', icon: 'claude' as const },
] as const

export const values = [
  {
    title: 'Curiosity',
    body: 'Learns new AI tools quickly — then directs them with a clear evaluation plan.',
    icon: 'lightbulb' as const,
  },
  {
    title: 'Ownership',
    body: 'Owns the final product. AI drafts; Katie reviews, corrects, and ships.',
    icon: 'target' as const,
  },
  {
    title: 'Reliability',
    body: 'AI generates; Katie evaluates accuracy, tone, and completeness before anyone depends on it.',
    icon: 'shield' as const,
  },
  {
    title: 'Purpose',
    body: 'Professional and clear — helping teams move faster without losing the human quality gate.',
    icon: 'heart' as const,
  },
] as const

export const highlights = [
  { label: 'Years Spotify CS / QA', value: '3+', icon: 'briefcase' as const },
  { label: 'AI surfaces in daily use', value: '3', icon: 'layers' as const },
  { label: 'Model families in use', value: '6', icon: 'cpu' as const },
  { label: 'Community ops roles', value: '3+', icon: 'users' as const },
] as const

export const capabilities = [
  {
    title: 'AI Evaluation & QA',
    body: 'The #1 capability: score model output against a rubric, catch failures, and decide what ships.',
  },
  {
    title: 'LLM Workflows',
    body: 'Design brief → draft → review loops in Cursor, Copilot, and ChatGPT that stay human-gated.',
  },
  {
    title: 'AI Operations',
    body: 'Structure chaos into agendas, folders, trackers, and follow-ups teams can actually run.',
  },
  {
    title: 'Research',
    body: 'Pull sources fast, compare options, and verify before anyone acts on an AI summary.',
  },
  {
    title: 'Prototyping',
    body: 'Spin up site mockups and copy variants so stakeholders react to something real.',
  },
  {
    title: 'Communication',
    body: 'Minutes, emails, briefs, and stakeholder language — clear, warm, and on-brand.',
  },
] as const

export type CaseStudy = {
  title: string
  flagship?: boolean
  problem: string
  aiUsed: string
  reviewed: string
  result: string
  metric?: string
  images?: { src: string; alt: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'LLM evaluation demo — support email rewrite',
    flagship: true,
    problem:
      'Need a clear customer-support email rewrite that follows instructions, stays factual, and sounds on-brand — without inventing policy details.',
    aiUsed:
      'Same prompt to ChatGPT, Claude, and Gemini. Portfolio evaluation exercise (not client-confidential).',
    reviewed:
      'Scored each draft on instruction following, factual accuracy, completeness, tone, formatting, and hallucinations. Flagged invented policy language and incomplete next steps; improved the prompt and picked a corrected final.',
    result:
      'Documented rubric scores, failure notes, and a shippable final email after human review.',
    images: [
      {
        src: '/assets/cases/llm-eval-rubric.png',
        alt: 'Rubric scoring three model drafts for a support email rewrite',
      },
      {
        src: '/assets/cases/llm-eval-side-by-side.png',
        alt: 'Side-by-side comparison of model outputs with failure flags',
      },
      {
        src: '/assets/cases/llm-eval-final.png',
        alt: 'Final human-reviewed support email ready to ship',
      },
    ],
  },
  {
    title: 'AI-assisted operations — messy notes to verified minutes',
    flagship: true,
    problem:
      'Scattered meeting notes, action items, and side chats needed a single accurate deliverable volunteers could trust.',
    aiUsed: 'ChatGPT + Cursor to draft structured minutes and an action tracker from raw notes.',
    reviewed:
      'Checked names, dates, votes, and owners line by line; removed invented attendees and vague “someone will…” actions; fixed formatting for scannability.',
    result:
      'Verified minutes and a clear follow-up list — AI for speed, human QA for reliability.',
    images: [
      {
        src: '/assets/cases/ops-messy-input.png',
        alt: 'Messy raw notes and request fragments before organization',
      },
      {
        src: '/assets/cases/ops-verified-output.png',
        alt: 'Organized minutes and action tracker after human QA',
      },
    ],
  },
  {
    title: 'Spotify support QA via 24-7 Intouch',
    flagship: true,
    problem:
      'Creative Support needed consistent quality across nesting, process docs, and live work — not just ticket volume.',
    aiUsed: 'N/A (pre-LLM role) — human QA audits, alignments, and process feedback.',
    reviewed:
      'QA audits and alignments, nesting assistance, Guru process feedback, LIO & Marquee ROTAs, and maintenance of the CrS Phoenix Hub team resource.',
    result:
      '3+ years in Spotify CS / QA Buddy path via 24-7 Intouch — quality systems and team resources that held up under review.',
    metric: '3+ years Spotify CS / QA',
  },
  {
    title: 'Legal aid support communications',
    problem:
      'A disabled person needed accurate paperwork and communications without risky AI inventions.',
    aiUsed: 'ChatGPT for first-pass drafts of letters and forms language.',
    reviewed:
      'Line-by-line factual and tone review before anything was sent; corrected incomplete fields and overconfident phrasing.',
    result: 'Reviewed communications that stayed accurate and respectful under human sign-off.',
  },
  {
    title: 'Gordonston Neighborhood Association minutes',
    problem:
      'Association meetings needed reliable minutes on a volunteer timeline.',
    aiUsed: 'AI for speed on first drafts of minutes and agendas.',
    reviewed:
      'Human QA for accuracy of motions, attendance, and action owners before publishing.',
    result: 'Clear, neighbor-friendly minutes maintained as GNA secretary.',
  },
  {
    title: 'Local cat rescue coordination',
    problem:
      'Rescue logistics and outreach notes were easy to drop under volunteer load.',
    aiUsed: 'AI-assisted drafting for outreach notes and coordination lists.',
    reviewed:
      'Verified details, contacts, and next steps so volunteers could move without missing care items.',
    result: 'Faster day-to-day coordination with fewer dropped details.',
  },
  {
    title: 'Website prototypes & proofreading',
    problem:
      'Stakeholders needed something real to react to — not another vague brief.',
    aiUsed: 'Cursor / Copilot / ChatGPT for site prototypes and copy variants.',
    reviewed:
      'Proofreading and UX clarity pass so pages ship clean, readable, and on-message.',
    result: 'Prototypes ready for feedback with a human quality gate.',
  },
]

export const experience = [
  {
    title: 'Independent AI QA & Evaluation Specialist',
    company: 'Independent',
    location: 'Remote / Savannah area',
    duration: '2022 – Present',
    description:
      'LLM evaluation, human-in-the-loop review, and AI-assisted operations. Uses Cursor, GitHub Copilot, and ChatGPT for research, drafting, QA, prototyping, and ops — with human review as the quality gate on every deliverable.',
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
  'AI QA, Evaluation & Operations Specialist with 3+ years of Spotify support QA via 24-7 Intouch. Evaluates LLM output for instruction following, accuracy, tone, and hallucinations — then organizes AI-assisted ops work so teams can ship with confidence.'

export const objective =
  'Available for remote part-time and contract work in AI QA, LLM evaluation, human-in-the-loop review, and AI-assisted operations.'

export const missionQuote =
  'AI generates; Katie evaluates, corrects, organizes, and ships — human judgment is the quality gate.'
