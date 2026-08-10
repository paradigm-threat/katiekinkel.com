# katiekinkel.com

Personal site for **Katie Kinkel** — AI QA, evaluation & operations specialist.

**LinkedIn:** [linkedin.com/in/katie-kinkel](https://www.linkedin.com/in/katie-kinkel/)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- `next-themes` (light / dark / system)
- Vercel deploy · domain `katiekinkel.com`
- Brand mark: `KK` monogram (`app/icon.png`, `app/favicon.ico`, `public/icons/*`) — rebuild with `python scripts/build-icons.py`

## Scripts

```bash
npm install
npm run generate:resume      # full résumé → DOCX + PDF (LibreOffice)
npm run generate:ai-resume   # AI QA one-pager → DOCX + PDF (LibreOffice)
npm run dev
npm run build
```

Resume generators embed the LinkedIn profile URL from the script headers (`https://www.linkedin.com/in/katie-kinkel/`). The live site uses `linkedinUrl` in `lib/content.ts` for header, hero, contact, and JSON-LD.

## Resume downloads

- [`/Katie-Kinkel-AI-QA-Resume.pdf`](./public/Katie-Kinkel-AI-QA-Resume.pdf) · [DOCX](./public/Katie-Kinkel-AI-QA-Resume.docx)
- [`/Katie-Kinkel-Resume.pdf`](./public/Katie-Kinkel-Resume.pdf) · [DOCX](./public/Katie-Kinkel-Resume.docx)

Use **Print** in the header for a résumé-only print layout.

## Branch

Default branch: **`main`** (GitLab).
