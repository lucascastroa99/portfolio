import { Fragment } from "react";

/**
 * Renders text with **bold** markers as <strong> elements.
 * Splits on double asterisks and alternates between plain and bold segments.
 */
export function renderWithBold(text: string) {
  const parts = text.split("**");
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={`bold-${part}`}>{part}</strong>
    ) : (
      <Fragment key={`plain-${part}`}>{part}</Fragment>
    ),
  );
}
