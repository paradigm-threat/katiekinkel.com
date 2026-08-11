/**
 * One-page AI QA résumé → public/Katie-Kinkel-AI-QA-Resume.docx + PDF
 * Run: node scripts/generate-ai-qa-resume.mjs
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
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

const sectionHeading = (title) =>
  new Paragraph({
    spacing: { before: 240, after: 60 },
    border: { bottom: { color: PRIMARY, space: 1, value: BorderStyle.SINGLE, size: 10 } },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        color: PRIMARY,
        size: 22,
        characterSpacing: 40,
      }),
    ],
  })

const bullet = (text) =>
  new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [muted(`•  ${text}`, { size: 18 })],
  })

const doc = new Document({
  creator: 'Katie Kinkel',
  title: 'Katie Kinkel – AI QA Resume',
  description: 'AI QA, Evaluation & Operations Specialist',
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 20, color: BLACK },
        paragraph: { spacing: { line: 260 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 540, bottom: 540, left: 720, right: 720 } },
      },
      children: [
        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: 'Katie Kinkel', bold: true, size: 44, color: BLACK })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({
              text: 'AI QA, Evaluation & Operations Specialist',
              size: 22,
              color: MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            link('katiekinkel.com', 'https://katiekinkel.com'),
            muted('   ·   '),
            link('ktkinkel@gmail.com', 'mailto:ktkinkel@gmail.com'),
            muted('   ·   '),
            link('LinkedIn', 'https://www.linkedin.com/in/katie-kinkel/'),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            bold('Available: ', { size: 18 }),
            muted(
              'Remote · Part-time · Contract · AI evaluation / QA / operations',
              { size: 18 },
            ),
          ],
        }),
        new Paragraph({
          spacing: { before: 40, after: 80 },
          children: [
            new TextRun({
              text: 'AI generates; Katie evaluates, corrects, organizes, and ships. Human-in-the-loop review is the quality gate.',
              size: 18,
              color: MUTED,
              italics: true,
            }),
          ],
        }),
        sectionHeading('Focus'),
        bullet('LLM evaluation: instruction following, factual accuracy, completeness, tone, formatting, hallucinations, edge cases, multi-output comparison'),
        bullet('Human-in-the-loop QA on AI drafts before anything ships'),
        bullet('AI-assisted operations: minutes, trackers, briefs, research, prototypes'),
        sectionHeading('Selected experience'),
        new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [
            bold('Independent AI QA & Evaluation Specialist', { size: 20 }),
            muted('  ·  Remote  ·  2025 – Present', { size: 17 }),
          ],
        }),
        bullet(
          'Evaluates model output with rubrics; designs draft→review workflows in Cursor, Copilot, and ChatGPT.',
        ),
        bullet(
          'Turns messy notes into verified minutes, action trackers, and stakeholder-ready docs.',
        ),
        new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [
            bold('Independent community & operations support', { size: 20 }),
            muted('  ·  Remote  ·  2022 – 2025', { size: 17 }),
          ],
        }),
        bullet(
          'Neighborhood association minutes, rescue coordination, outreach, and support communications — without AI tools.',
        ),
        new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [
            bold('Creative Support / QA Buddy', { size: 20 }),
            muted('  ·  24-7 Intouch / Spotify  ·  2019 – 2022', { size: 17 }),
          ],
        }),
        bullet(
          'QA audits, alignments, nesting assistance, Guru process feedback; LIO & Marquee ROTAs; maintained CrS Phoenix Hub.',
        ),
        bullet(
          '3+ years Spotify support via 24-7 Intouch (Creative Support L3 → QA Buddy). Human QA only — no AI in this role.',
        ),
        new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [
            bold('Credit Card Fraud Specialist', { size: 20 }),
            muted('  ·  J.P. Morgan Chase  ·  2009 – 2010', { size: 17 }),
          ],
        }),
        bullet('Promoted to L2; procedural quick-sheets; averaged ~125% of quota.'),
        sectionHeading('Tools (families)'),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            muted(
              'Surfaces: Cursor · Copilot · ChatGPT. Families: GPT · Claude · Gemini · Grok · Codex · Composer. Versions rotate; human QA does not.',
              { size: 17 },
            ),
          ],
        }),
        sectionHeading('Education'),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            bold('The Atlanta Art Institute', { size: 18 }),
            muted(' — Media Arts and Animation · 2002 – 2006', { size: 17 }),
          ],
        }),
      ],
    },
  ],
})

const docxPath = path.join(PUBLIC_DIR, 'Katie-Kinkel-AI-QA-Resume.docx')
const buffer = await Packer.toBuffer(doc)
writeFileSync(docxPath, buffer)
console.log(`DOCX written: ${docxPath}`)

console.log('Converting to PDF via LibreOffice…')
try {
  execSync(`libreoffice --headless --convert-to pdf --outdir "${PUBLIC_DIR}" "${docxPath}"`, {
    stdio: 'inherit',
  })
  console.log(`PDF written: ${path.join(PUBLIC_DIR, 'Katie-Kinkel-AI-QA-Resume.pdf')}`)
} catch (e) {
  console.error('LibreOffice conversion failed:', e.message)
  process.exit(1)
}
