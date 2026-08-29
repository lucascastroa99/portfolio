export const NAV_ITEMS = [
  { href: "/", localeKey: "home" },
  { href: "/about", localeKey: "about" },
  { href: "/experience", localeKey: "experience" },
  { href: "/education", localeKey: "education" },
  { href: "/contact", localeKey: "contact" },
] as const;

export const LANGUAGES_ARRAY = [
  { code: "en-us", name: "English", flag: "circle-flags:us" },
  { code: "pt-br", name: "Português", flag: "circle-flags:br" },
] as const;

export const RESUME_OPTIONS = {
  enUS: {
    url: "/documents/LucasCastro_FullStackDeveloper_Resume.pdf",
    flag: "circle-flags:us",
    label: "English",
  },
  ptBR: {
    url: "/documents/LucasCastro_DesenvolvedorFullStack_Curriculo.pdf",
    flag: "circle-flags:br",
    label: "Português",
  },
} as const;
