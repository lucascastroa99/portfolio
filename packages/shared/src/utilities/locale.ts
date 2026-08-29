/**
 * Localized value types for bilingual data (English/Portuguese).
 */

export type LocalizedString = {
  en: string;
  pt: string;
};

export type LocalizedArray = {
  en: string[];
  pt: string[];
};

export type DateRange = {
  start: string;
  end: string;
};

/**
 * Resolves a localized value based on the current locale.
 * Works with both string and string[] localized fields.
 *
 * Maps the configured "pt" locale to Portuguese, everything else to English.
 */
export function local<T extends LocalizedString | LocalizedArray>(
  value: T,
  locale: string,
): T extends LocalizedString ? string : string[] {
  const lang = locale === "pt" ? "pt" : "en";
  return value[lang as keyof typeof value] as T extends LocalizedString ? string : string[];
}
