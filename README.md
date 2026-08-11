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
npm run dev
npm run build
```

Site contact links use `linkedinUrl` and `email` from `lib/content.ts`.

## Browser AI demo (WebMCP + on-device Gemini)

Progressive FAB when the visitor’s desktop Chrome exposes the Prompt API. Answers about Katie’s résumé/history come from QA MCP tools over `lib/agent/factSheet.ts`. See [docs/BROWSER_AI.md](docs/BROWSER_AI.md).

```bash
# .env.local
NEXT_PUBLIC_WEBMCP_ENABLED=1
```

## Branch

Default branch: **`main`** (GitLab).
