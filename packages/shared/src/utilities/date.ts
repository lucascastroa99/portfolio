import { Temporal } from "temporal-polyfill";

const MONTH_ABBREVIATIONS: Record<string, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
};

/**
 * Formats a YYYY-MM date string into a short month abbreviation + year.
 * Examples: "2024-12" → "Dez 2024" (pt), "Dec 2024" (en)
 */
export function formatDate(date: string, locale: string): string {
  try {
    const lang = locale === "pt" ? "pt" : "en";
    const plainDate = Temporal.PlainDate.from(`${date}-01`);
    const monthIndex = plainDate.month - 1;
    const month = MONTH_ABBREVIATIONS[lang]?.[monthIndex];
    return `${month} ${plainDate.year}`;
  } catch {
    return date;
  }
}

/**
 * Calculates the human-readable duration between two YYYY-MM dates.
 * Returns localized string like "2 years, 3 months" / "2 anos, 3 meses".
 */
export function getDuration(start: string, end: string, locale: string): string {
  try {
    const startDate = Temporal.PlainDate.from(start);
    const endDate = end === "present" ? Temporal.Now.plainDateISO() : Temporal.PlainDate.from(end);

    const diff = startDate.until(endDate, { largestUnit: "month" });
    const totalMonths = diff.months + diff.years * 12 + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const rtfLocale = locale === "pt" ? "pt-BR" : "en-US";
    const rtf = new Intl.RelativeTimeFormat(rtfLocale, {
      numeric: "auto",
      style: "long",
    });

    const parts: string[] = [];
    if (years > 0) {
      parts.push(
        rtf
          .format(years, "year")
          .replace(/^(in\s+|.*?\s+)?/i, "")
          .trim(),
      );
    }
    if (months > 0) {
      parts.push(
        rtf
          .format(months, "month")
          .replace(/^(in\s+|.*?\s+)?/i, "")
          .trim(),
      );
    }

    return parts.join(", ");
  } catch {
    return "";
  }
}
