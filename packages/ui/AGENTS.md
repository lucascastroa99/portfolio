# AGENTS.md — UI

## Scope

Rules and architecture specific to packages/ui. See the root AGENTS.md for repository-wide conventions.

## Context

Shared UI component library built on Radix UI + Base UI primitives and 53 shadcn/ui components. Consumed by the web app (and any future app). Provides the design system, app shell, providers, and utility helpers.

## Architecture

```
src/
├── components/
│   ├── ui/                      # 53 shadcn/ui primitives (shadcn add <component> in packages/ui)
│   │   accordion.tsx, alert-dialog.tsx, alert.tsx, aspect-ratio.tsx, avatar.tsx, badge.tsx, breadcrumb.tsx,
│   │   button-group.tsx, button.tsx, calendar.tsx, card.tsx, carousel.tsx, chart.tsx, checkbox.tsx,
│   │   collapsible.tsx, combobox.tsx, command.tsx, context-menu.tsx, date-picker.tsx, dialog.tsx,
│   │   direction.tsx, drawer.tsx, dropdown-menu.tsx, empty.tsx, field.tsx, form.tsx, hover-card.tsx,
│   │   input-group.tsx, input-otp.tsx, input.tsx, item.tsx, kbd.tsx, label.tsx, menubar.tsx,
│   │   native-select.tsx, navigation-menu.tsx, pagination.tsx, popover.tsx, progress.tsx, radio-group.tsx,
│   │   resizable.tsx, scroll-area.tsx, select.tsx, separator.tsx, sheet.tsx, sidebar.tsx (19.9K),
│   │   skeleton.tsx, slider.tsx, sonner.tsx, spinner.tsx, switch.tsx, table.tsx, tabs.tsx, textarea.tsx,
│   │   toggle-group.tsx, toggle.tsx, tooltip.tsx
│   ├── app-header.tsx           # Sticky header: MobileMenu + NavigationLinks + LanguageSelector + ThemeToggle + DownloadResume
│   ├── app-footer.tsx           # Footer: copyright, made-with, privacy-policy/terms links, social
│   ├── app-layout.tsx           # Layout: <AppHeader /> + <main id="main-content"> + <AppFooter />
│   ├── app-logo.tsx             # Logo (symbol.webp + brand)
│   ├── app-sidebar.tsx          # Sidebar nav (Radix sidebar composition)
│   ├── navigation-links.tsx     # Nav links from @repo/shared/constants/navigation (NAV_ITEMS)
│   ├── mobile-menu.tsx          # Sheet-based mobile nav (6.2K, most complex app component)
│   ├── language-selector.tsx    # Paraglide useLocaleChange + dropdown (1.9K)
│   ├── theme-toggle.tsx         # next-themes-like toggle via ThemeProvider useTheme (1.6K)
│   ├── download-resume.tsx      # Dropdown: RESUME_OPTIONS en/pt PDFs + trackResumeDownload
│   ├── render-bold.tsx          # renderWithBold(): **bold** markdown-ish → <strong>
│   ├── confirm-dialog.tsx       # AlertDialog confirm/cancel with loading state
│   ├── empty-state.tsx          # Empty placeholder with icon/title/description
│   ├── error-message.tsx        # Inline error display
│   ├── error-page.tsx           # Full-page error boundary (used in __root errorComponent)
│   ├── not-found.tsx            # 404 page (used in __root notFoundComponent)
│   ├── page-header.tsx          # Shared page title slot (if used by features)
│   └── form-submit-button.tsx   # Submit button with loading state
├── libraries/
│   └── utils.ts                 # cn() → clsx + twMerge (hotspot: fan_in 253)
├── providers/
│   ├── theme-provider.tsx       # ThemeProvider + useTheme (class attribute light/dark)
│   └── progress-provider.tsx    # ProgressProvider + useProgress (top-loader, used by RouterAdapter)
└── styles/
    ├── base.css                 # Base Tailwind imports
    └── globals.css              # CSS variables, tokens, light/dark defaults (imported via apps/web/styles.css)
```

**Exports (package.json):**

| Import | Path |
|--------|------|
| `@repo/ui` | `src/components/*.tsx` (app components) |
| `@repo/ui/shadcn/*` | `src/components/ui/*.tsx` (primitives) |
| `@repo/ui/libraries/*` | `src/libraries/*.ts` |
| `@repo/ui/providers/*` | `src/providers/*.tsx` |
| `@repo/ui/globals.css` | `src/styles/globals.css` |
| `@repo/ui/base.css` | `src/styles/base.css` |

**Dependency flow:**
```
web → @repo/ui → @repo/assets, @repo/shared, @repo/i18n
```

**Component patterns:**
- CVA (Class Variance Authority) for variant-based styling
- Radix UI + Base UI primitives for accessible, unstyled bases
- shadcn/ui pre-styled compositions adapted to project tokens
- `cn()` (clsx + twMerge) for className merging; Iconify (`@iconify-icon/react`) for skill/social icons; `lucide-react` for app icons
- Providers are `class` attribute theming and top-loader progress — framework-agnostic, no data fetching

## Rules

- **Framework-agnostic:** Components work in any React app. No app routes or app state dependencies.
- **No business logic:** UI layer only — no API calls, no data fetching, no server state.
- **Accessible by default:** Radix/Base primitives ensure baseline a11y (keyboard, focus, ARIA).
- **Add components via shadcn/ui CLI:** `pnpm dlx shadcn@latest add <component>` in `packages/ui/` — committed source, not node_modules.
- **No `date-fns` or native `Date`:** Use `temporal-polyfill` via `@repo/shared` helpers (`formatDate`, `plainDateToDate`, etc.).
- **Component API:** Accept `className` prop for style overrides. Use `cva` for variants. Forward refs where appropriate. Export `ComponentNameProps` via `React.ComponentPropsWithoutRef`.
- **No nuqs/Query coupling:** UI must not import `nuqs` or `@tanstack/react-query` — those were removed. Future URL/query state belongs in `apps/web`.
- **Styles:** Tokens live in `globals.css`; `apps/web/src/styles.css` imports `@repo/ui/globals.css` + `tailwindcss` + `tw-animate-css` + `@repo/ui/base.css`.

## Related

- Parent: ../AGENTS.md
