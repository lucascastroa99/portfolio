# AGENTS.md — Assets

## Scope

Rules and architecture specific to packages/assets. See the root AGENTS.md for repository-wide conventions.

## Context

Static assets package — images, favicons, and public documents. Consumed by `web` and `ui` (images) and served directly via Vite `publicDir`.

## Architecture

```
images/                    # Consumed via @repo/assets/images/*
├── en.svg, es.svg, pt.svg # Flag SVGs (used by LanguageSelector)
├── symbol.webp            # Memoji / brand symbol (300x300, used in HeroSection)
└── tally-logo.png         # Tally logo (used in SocialLinks TallyLink)

public/                    # Served as-is by apps/web (vite.config.ts publicDir: ../../packages/assets/public)
├── favicon.ico
├── favicon.svg
├── favicon-96x96.png
├── apple-touch-icon.png   # 180x180
├── web-app-manifest-192x192.png + web-app-manifest-512x512.png
├── manifest.json
└── documents/
    ├── LucasCastro_FullStackDeveloper_Resume.pdf      # English CV (RESUME_OPTIONS enUS)
    └── LucasCastro_DesenvolvedorFullStack_Curriculo.pdf # Portuguese CV (RESUME_OPTIONS ptBR)
```

**Vite wiring:**
```ts
// apps/web/vite.config.ts
const sharedPublicDir = resolve(import.meta.dirname, "../../packages/assets/public");
defineConfig({ publicDir: sharedPublicDir, ... })
```

**Dependency flow:**
```
web, ui → @repo/assets
```

## Rules

- **No runtime logic** — static assets only (no JS/TS in this package).
- **No dependencies** — keep it lightweight (only `@repo/biome-config` dev).
- **Optimize assets** — compress images/audio before committing.
- **Consistent naming** — `kebab-case` for all file names.
- **Prefer SVG** for vector graphics; use WebP for raster where possible.
- **Public files** in `public/` are served as-is by consuming apps via `publicDir` — do not duplicate in `apps/web/public`.
- **CV PDFs bilingual** — filenames must stay in sync with `@repo/shared/constants/social-links.ts` `RESUME_OPTIONS` (enUS/ptBR).

## Related

- Parent: ../AGENTS.md
