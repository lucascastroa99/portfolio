import { setLocale } from "@repo/i18n/runtime";
import { useCallback, useTransition } from "react";

/**
 * Hook that provides a locale change function via Paraglide.
 * Sets the locale cookie and reloads the page to apply the change.
 */
export function useLocaleChange() {
  const [isPending, startTransition] = useTransition();

  const changeLocale = useCallback((newLocale: string) => {
    startTransition(() => {
      setLocale(newLocale as "en" | "pt");
    });
  }, []);

  return { changeLocale, isPending };
}
