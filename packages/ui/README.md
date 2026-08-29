# @repo/ui

Shared UI component library — Radix UI + Base UI primitives, 53 shadcn/ui components, app shell, providers, and `cn()` utility.

## Installation

This package is private (`workspace:*`). Install via monorepo:

```bash
pnpm install
```

Consumed by `apps/web` via `workspace:*`. No direct publish.

## Exports

| Import | Path | Description |
|--------|------|-------------|
| `@repo/ui` | `src/components/*.tsx` | App components: `AppHeader`, `AppLayout`, `MobileMenu`, `LanguageSelector`, `ThemeToggle`, `DownloadResume`, `NavigationLinks`, `renderWithBold`, etc. |
| `@repo/ui/shadcn/*` | `src/components/ui/*.tsx` | 53 shadcn primitives: `Button`, `Card`, `Dialog`, `Sheet`, `Skeleton`, `Sonner`, `Tooltip`, `Sidebar`, etc. |
| `@repo/ui/libraries/*` | `src/libraries/*.ts` | Utilities: `cn()` (clsx + twMerge) |
| `@repo/ui/providers/*` | `src/providers/*.tsx` | `ThemeProvider` (class light/dark), `ProgressProvider` (top-loader) |
| `@repo/ui/globals.css` | `src/styles/globals.css` | Design tokens, CSS variables |
| `@repo/ui/base.css` | `src/styles/base.css` | Base Tailwind imports |

## Usage

```tsx
import { AppLayout } from "@repo/ui/components/app-layout";
import { Button } from "@repo/ui/shadcn/button";
import { cn } from "@repo/ui/libraries/utils";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import "@repo/ui/globals.css";
```

## Adding a Component

```bash
# From packages/ui
pnpm dlx shadcn@latest add <component>
```

Committed source — edit the generated file directly for customization.

## Styling

Tokens live in `globals.css`. `apps/web/src/styles.css` imports `@repo/ui/globals.css` + `tailwindcss` + `tw-animate-css` + `@repo/ui/base.css` and configures `@source` to scan `@repo/ui` for class extraction.

## Rules

- Framework-agnostic — no app routes/state.
- No business logic — UI only.
- Radix/Base ensure a11y baseline.
- Use `temporal-polyfill` via `@repo/shared` helpers, not `date-fns`/`Date`.

See [AGENTS.md](./AGENTS.md) for full architecture and conventions.
