type ContactLinkName =
  | "github"
  | "linkedin"
  | "email"
  | "phone"
  | "whatsapp"
  | "telegram"
  | "tally";

type ResumeLanguage = "en" | "pt";

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, string>) => void;
    };
  }
}

function trackContactLink(link: ContactLinkName): void {
  if (typeof window === "undefined") return;
  window.umami?.track("contact-link-click", { link });
}

function trackResumeDownload(language: ResumeLanguage): void {
  if (typeof window === "undefined") return;
  window.umami?.track("resume-download", { language });
}

export type { ContactLinkName, ResumeLanguage };
export { trackContactLink, trackResumeDownload };
