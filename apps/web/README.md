# Web

SSR-first TanStack Start frontend for Lucas Castro's personal portfolio (bilingual pt/en) — deployed as a Cloudflare Worker (`portfolio-web`).

## 🚀 Getting Started

```bash
# From monorepo root
pnpm --filter web dev

# Or from apps/web
pnpm dev
```

The dev server runs at [http://localhost:3030](http://localhost:3030) (`VITE_WEB_APP_PORT`, default 3030).

## ⚙️ Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_UMAMI_WEBSITE_ID` | Umami Cloud website ID | Yes | — |
| `VITE_WEB_APP_PORT` | Vite dev server port | No | `3030` |
| `VITE_WEB_DEVTOOLS_PORT` | TanStack devtools port | No | `5030` |

See `src/config/env.client.ts`, `src/config/env.server.ts` and `@repo/env` (`packages/env/src/schemas/web.schema.ts`) for the validated Zod schemas. See `.env.example` for a template.

## ▶️ Usage

- **Port:** 3030 (server) / 5030 (devtools)
- **Framework:** TanStack Start 1.168 (React 19, Vite 8)
- **Routing:** TanStack Router (file-based, `routeTree.gen.ts`)
- **Styling:** TailwindCSS 4 + `tw-animate-css` + `@repo/ui` tokens (`class` dark/light)
- **Data:** Static typed JSON (`src/data/profile.json` + `resume.json`) — no API, no query lib
- **Analytics:** Umami Cloud cookieless (`cloud.umami.is/script.js`)

```bash
pnpm dev               # Start dev server (Vite + Cloudflare)
pnpm build             # Production build (Vite)
pnpm preview           # Preview built output
pnpm biome:check       # Biome linting (extends @repo/biome-config)
pnpm typescript:check  # Type checking (strict)
```

## 🚢 Deployment

- **Target:** Cloudflare Worker `portfolio-web` (`wrangler.jsonc` — `nodejs_compat`, `2025-09-24`)
- **Build:** `pnpm --filter=web build` → `dist/client/` (worker assets)
- **Deploy:** `pnpm deploy:web` (root script: `turbo build && wrangler deploy`)
- **`publicDir`:** `../../packages/assets/public` (favicons, manifest, documents PDFs) served by Vite
- **Env:** Set `VITE_UMAMI_WEBSITE_ID` in the Worker.

See [AGENTS.md](./AGENTS.md) for full architecture details.
