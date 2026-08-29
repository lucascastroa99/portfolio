# AGENTS.md — Biome Config

## Scope

Rules and architecture specific to packages/biome-config. See the root AGENTS.md for repository-wide conventions.

## Context

Shared Biome (2.5) lint and format configuration for the entire monorepo. Consumed by all apps and packages via `extends: ["@repo/biome-config/base.json"]` / `extends: ["@repo/biome-config"]`.

## Architecture

```
base.json        # Shared Biome config (schema https://biomejs.dev/schemas/2.5.11/schema.json)
                 # - files.includes: **/*.{js,jsx,ts,tsx,css} (excludes .git, .turbo, node_modules, dist, build, coverage)
                 # - assist.organizeImports: on
                 # - linter: recommended + correctness/noUnusedVariables|noUnusedImports error, style/useConst|useForOf error, suspicious/noExplicitAny warn, performance/noDelete warn, nursery/useSortedClasses warn
                 # - formatter: space 2, lineWidth 100, double quotes, semicolons always, trailingCommas all
                 # - css.parser.tailwindDirectives: true
                 # - overrides: **/*.test.* suspicions noExplicitAny off
package.json     # Package metadata (private, type module)
```

**Dependency flow:**
```
all apps/packages → @repo/biome-config
```

## Rules

- **No app-specific overrides** — keep config universal across the monorepo.
- **Update carefully** — changes affect all packages.
- **Test before committing** — run `pnpm biome:check` at root level.

## Related

- Parent: ../AGENTS.md
