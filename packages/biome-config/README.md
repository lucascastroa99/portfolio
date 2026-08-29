# @repo/biome-config

Shared Biome (2.5) lint + format configuration for the monorepo.

## Structure

```
base.json      # Shared config (extendable)
package.json   # Package metadata
```

## Usage

In any app/package `biome.json`:

```json
{
  "extends": ["@repo/biome-config/base.json"],
  "files": {
    "includes": ["!!**/src/routeTree.gen.ts", "!!**/.tanstack", "!!**/.output"]
  }
}
```

Then:

```bash
pnpm biome:check          # root: turbo delegates to all packages (organizeImports, lint, format)
pnpm --filter=web biome:check  # single package
```

## Config Highlights

- **Files:** `**/*.{js,jsx,ts,tsx,css}`; excludes `.git`, `.turbo`, `node_modules`, `dist`, `build`, `coverage`
- **Assist:** `organizeImports: on`
- **Linter:** `recommended` + `correctness/noUnusedVariables|noUnusedImports:error`, `style/useConst:error`, `suspicious/noExplicitAny:warn`, `nursery/useSortedClasses:warn`
- **Formatter:** space indent 2, lineWidth 100, double quotes, semicolons always, `trailingCommas: all`
- **CSS:** `tailwindDirectives: true`
- **Overrides:** `**/*.test.*` → `noExplicitAny: off`

## Rules

- No app-specific overrides — keep universal.
- Test at root with `pnpm biome:check` before committing.

See [AGENTS.md](./AGENTS.md) for full conventions.
