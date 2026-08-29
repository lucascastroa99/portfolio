# @repo/assets

Static assets — images, favicons, and public documents.

## Structure

```
images/
├── en.svg, es.svg, pt.svg   # Flag SVGs (LanguageSelector)
├── symbol.webp              # Memoji / brand symbol 300x300 (HeroSection)
└── tally-logo.png           # Tally logo (SocialLinks)

public/                      # Served via Vite publicDir (apps/web/vite.config.ts)
├── favicon.ico, favicon.svg, favicon-96x96.png, apple-touch-icon.png
├── web-app-manifest-192x192.png, web-app-manifest-512x512.png
├── manifest.json
└── documents/
    ├── LucasCastro_FullStackDeveloper_Resume.pdf
    └── LucasCastro_DesenvolvedorFullStack_Curriculo.pdf
```

## Usage

```ts
import memoji from "@repo/assets/images/symbol.webp";
import tallyLogo from "@repo/assets/images/tally-logo.png";
```

```ts
// vite.config.ts — publicDir wiring
const sharedPublicDir = resolve(import.meta.dirname, "../../packages/assets/public");
defineConfig({ publicDir: sharedPublicDir });
```

## Rules

- Static assets only — no runtime logic, minimal deps.
- Compress images before committing. Prefer SVG/WebP.
- `public/` is served as-is — do not duplicate in `apps/web/public`.
- CV PDFs must stay in sync with `RESUME_OPTIONS` in `@repo/shared/constants/social-links.ts`.

See [AGENTS.md](./AGENTS.md) for full conventions.
