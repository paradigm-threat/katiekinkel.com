# katiekinkel.com — Browser AI (WebMCP + on-device Gemini)

*Last reviewed: 2026-08-10 (America/New_York)*

Self-admitting demo of **WebMCP** + Chrome **Prompt API** (Gemini Nano). Answers about Katie’s résumé / site / work history come from MCP tools over `lib/agent/factSheet.ts` — not model invention.

## Flags

| Env | Effect |
|-----|--------|
| `NEXT_PUBLIC_WEBMCP_ENABLED=1` | Master switch for demo + tool registration |
| `NEXT_PUBLIC_WEBMCP_POLYFILL=1` | Dev: force `@mcp-b/webmcp-polyfill` even if native `modelContext` exists |
| `NEXT_PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN` | Chrome WebMCP origin-trial token (meta `origin-trial`) |

## Detection matrix

| Browser | Prompt API | Native WebMCP | What we do |
|---------|------------|---------------|------------|
| Desktop Chrome with Nano + WebMCP | ready | yes | Native `modelContext`; demo FAB |
| Desktop Chrome with Nano, **no** WebMCP | ready | no | **Install `@mcp-b/webmcp-polyfill`**, register tools, demo FAB |
| Mobile | — | — | Hidden |
| No `LanguageModel` | — | — | Hidden |
| Flag off | — | — | Hidden |

Polyfill enables in-page `registerTool` + Tool Inspector testing. It does **not** equal Gemini-in-Chrome host access (that needs native WebMCP + origin trial). The in-page chat always calls QA handlers through the local tool bridge.

## Fact-sheet rule

Handlers in `lib/webmcp/toolHandlers.ts` only read `getFactSheet()` / `searchFacts()`. System prompt requires tool calls before bio/resume answers.

## Update checklist (stay current)

When Chrome ships built-in AI / WebMCP changes:

1. Re-read https://developer.chrome.com/docs/ai/prompt-api  
2. Re-read https://developer.chrome.com/docs/ai/webmcp  
3. Re-read https://developer.chrome.com/docs/ai/built-in  
4. Bump `@mcp-b/webmcp-polyfill` / `@mcp-b/webmcp-types` if needed (pin major)  
5. Smoke: unsupported browser hides FAB; capable Chrome opens chat; tools list matches `WEBMCP_TOOL_NAMES`  
6. Cherry-pick adapter/init fixes from paradigm-threat-site when their WebMCP stack moves  
7. Update **Last reviewed** date (Eastern)

## Local test

```bash
# .env.local
NEXT_PUBLIC_WEBMCP_ENABLED=1

npm run dev
```

Optional: Chrome Canary + `chrome://flags/#enable-webmcp-testing`, Model Context Tool Inspector extension, `chrome://on-device-internals`.

## Origin trial

Register WebMCP OT for `https://katiekinkel.com` (Chrome 149+) and set `NEXT_PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN` on Vercel.

## Hardening (client demo)

- **No server LLM** — Prompt API + local fact sheet only; tools cannot invent bio facts outside handlers.
- **Allowlisted tools** — `parseToolCall` / `executeSiteAiTool` reject unknown names; args sanitized to primitives with length clamps (`lib/siteAi/limits.ts`).
- **Abort** — Escape / backdrop / Stop abort the in-flight session; agent checks `signal` between turns.
- **Polyfill failures** — `initWebMcp` try/catch; demo stays usable via tool bridge.
- **Detection failures** — never leave the UI stuck on “checking”.
- **Headers** — `Permissions-Policy: tools=(self)`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` in `next.config.ts`.
- **Chat render** — plain text nodes only (no `dangerouslySetInnerHTML`).
