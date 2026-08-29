/**
 * Application name — single source of truth for page titles.
 * Change this when cloning the template for a new project.
 */
export const APP_NAME = "Lucas Castro";

/**
 * Generates a meta descriptor with a formatted page title.
 *
 * - `withSiteTitle()` → `{ meta: [{ title: "Lucas Castro" }] }`
 * - `withSiteTitle("Home")` → `{ meta: [{ title: "Home | Lucas Castro" }] }`
 */
export function withSiteTitle(title?: string) {
  return {
    meta: [{ title: title ? `${title} | ${APP_NAME}` : APP_NAME }],
  };
}
