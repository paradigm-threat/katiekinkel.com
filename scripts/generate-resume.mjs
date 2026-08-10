/**
 * Generates public/Katie-Kinkel-Resume.docx then converts to PDF via LibreOffice.
 * Run: npm run generate:resume
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  TabStopType,
  UnderlineType,
  ExternalHyperlink,
} from 'docx'
import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

const PRIMARY = '3B7A68'
const MUTED = '5B6B66'
const BLACK = '111827'

const bold = (text, opts = {}) => new TextRun({ text, bold: true, ...opts })
const muted = (text, opts = {}) => new TextRun({ text, color: MUTED, size: 18, ...opts })
const primary = (text, opts = {}) => new TextRun({ text, color: PRIMARY, bold: true, ...opts })
const link = (text, url) =>
  new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text,
        color: PRIMARY,
        underline: { type: UnderlineType.SINGLE },
        size: 18,
      }),
    ],
  })

const hRule = () =>
  new Paragraph({
    border: { bottom: { color: 'D1D5DB', space: 1, value: BorderStyle.SINGLE, size: 6 } },
    spacing: { before: 60, after: 60 },
  })

const sectionHeading = (title) =>
  new Paragraph({
    spacing: { before: 280, after: 60 },
    border: { bottom: { color: PRIMARY, space: 1, value: BorderStyle.SINGLE, size: 10 } },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        color: PRIMARY,
        size: 24,
        characterSpacing: 40,
      }),
    ],
  })

const experienceItem = ({ title, company, location, duration, description }) => [
  new Paragraph({
    spacing: { before: 180, after: 20 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
    children: [
      bold(title, { size: 22, color: BLACK }),
      new TextRun({ text: '\t' }),
      new TextRun({ text: duration, color: MUTED, size: 17, italics: true }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 40 },
    children: [primary(company, { size: 18 }), muted('  ·  '), muted(location)],
  }),
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: description, size: 18, color: MUTED })],
  }),
]

const doc = new Document({
  creator: 'Katie Kinkel',
  title: 'Katie Kinkel – Resume',
  description: 'AI QA, Evaluation & Operations Specialist',
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 20, color: BLACK },
        paragraph: { spacing: { line: 276 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } },
      },
      children: [
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: 'Katie Kinkel', bold: true, size: 52, color: BLACK })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: 'AI QA, Evaluation & Operations Specialist',
              size: 24,
              color: MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 160 },
          children: [
            link('katiekinkel.com', 'https://katiekinkel.com'),
            muted('   ·   '),
            link('ktkinkel@gmail.com', 'mailto:ktkinkel@gmail.com'),
            muted('   ·   '),
            link('LinkedIn', 'https://www.linkedin.com/in/katie-kinkel/'),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 160 },
          children: [
            new TextRun({
              text: 'AI QA, Evaluation & Operations Specialist with 3+ years of Spotify support QA via 24-7 Intouch. Evaluates LLM output for instruction following, accuracy, tone, and hallucinations — then organizes AI-assisted ops work so teams can ship with confidence.',
              size: 19,
              color: MUTED,
              italics: true,
            }),
          ],
        }),
        hRule(),
        sectionHeading('Experience'),
        ...experienceItem({
          title: 'Independent AI QA & Evaluation Specialist',
          company: 'Independent',
          location: 'Remote / Savannah area',
          duration: '2022 – Present',
          description:
            'LLM evaluation, human-in-the-loop review, and AI-assisted operations. Uses Cursor, GitHub Copilot, and ChatGPT for research, drafting, QA, prototyping, and ops — with human review as the quality gate on every deliverable.',
        }),
        ...experienceItem({
          title: 'Creative Support / QA Buddy',
          company: '24-7 Intouch / Spotify',
          location: 'Phoenix, AZ',
          duration: '2019 – 2022',
          description:
            'Started on @SpotifyCares (Khoros), promoted to Creative Support L3 (Salesforce), then QA Buddy. Ran LIO & Marquee ROTAs, built and maintained the CrS Phoenix Hub, gave Guru process feedback, and performed QA audits, alignments, and nesting assistance.',
        }),
        ...experienceItem({
          title: 'Independent Tutor',
          company: 'Odyssey Services / independent',
          location: 'AZ / NV / UT',
          duration: '2015 – 2018',
          description:
            'Tutored students K–college across subjects while following IEPs. Held tutoring certifications for Arizona, Nevada, and Utah.',
        }),
        ...experienceItem({
          title: 'Credit Card Fraud Specialist',
          company: 'J.P. Morgan Chase',
          location: 'Arizona',
          duration: '2009 – 2010',
          description:
            'Inbound/outbound fraud calls with secure data access. Promoted to L2, created procedural quick-sheets for the floor, beta-tested in-house software, averaged ~125% of quota.',
        }),
        ...experienceItem({
          title: 'Seasonal Ticket Sales',
          company: 'Pittsburgh Symphony Orchestra',
          location: 'Pittsburgh, PA',
          duration: '2001 – 2002',
          description:
            'Scripted cold outbound calls to past seasonal-ticket subscribers. Hourly plus commission sales downtown.',
        }),
        sectionHeading('Education'),
        new Paragraph({
          spacing: { before: 160, after: 20 },
          tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
          children: [
            bold('The Atlanta Art Institute', { size: 22 }),
            new TextRun({ text: '\t' }),
            new TextRun({ text: '2002 – 2006', color: MUTED, size: 17, italics: true }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [muted('Media Arts and Animation')],
        }),
        sectionHeading('Also'),
        new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [
            bold('Arizona Friends of Homeless', { size: 20 }),
            muted('  ·  2017 –  '),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            muted(
              'Outreach coordinator, Facebook & tech admin, event planning, resource lists.',
            ),
          ],
        }),
        new Paragraph({
          spacing: { before: 40, after: 20 },
          children: [bold('Harkins Theatres', { size: 20 }), muted('  ·  2018')],
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            muted('Online ticketing stress testing and feedback for seating-chart UX.'),
          ],
        }),
        new Paragraph({
          spacing: { before: 40, after: 20 },
          children: [bold('SNESology', { size: 20 }), muted('  ·  2011 – 2013')],
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            muted('Created and maintained social media for a themed musical project / blog.'),
          ],
        }),
        sectionHeading('Tools & models'),
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            muted(
              'Surfaces: Cursor · Copilot · ChatGPT. Families: GPT · Claude · Gemini · Grok · Codex · Composer. Versions rotate; human QA does not.',
            ),
          ],
        }),
      ],
    },
  ],
})

const docxPath = path.join(PUBLIC_DIR, 'Katie-Kinkel-Resume.docx')
const buffer = await Packer.toBuffer(doc)
writeFileSync(docxPath, buffer)
console.log(`DOCX written: ${docxPath}`)

console.log('Converting to PDF via LibreOffice…')
try {
  execSync(`libreoffice --headless --convert-to pdf --outdir "${PUBLIC_DIR}" "${docxPath}"`, {
    stdio: 'inherit',
  })
  console.log(`PDF written: ${path.join(PUBLIC_DIR, 'Katie-Kinkel-Resume.pdf')}`)
} catch (e) {
  console.error('LibreOffice conversion failed:', e.message)
  process.exit(1)
}
