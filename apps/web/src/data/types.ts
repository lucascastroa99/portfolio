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

export type ExperienceEntry = {
  company: string;
  position: LocalizedString;
  date: DateRange;
  location: LocalizedString;
  highlights: LocalizedArray;
};

export type ProjectEntry = {
  name: string;
  highlights: LocalizedArray;
  date: DateRange;
};

export type EducationEntry = {
  institution: LocalizedString;
  area: LocalizedString;
  date: DateRange;
  location: LocalizedString;
};

export type CertificationEntry = {
  institution: string;
  area: string;
  url: string;
  date: DateRange;
  score: LocalizedString;
};

export type SkillCategory = {
  label: LocalizedString;
  details: string | LocalizedString;
};

export type LanguageEntry = {
  label: LocalizedString;
  level: LocalizedString;
};

export type ResumeData = {
  summary: LocalizedString;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  skills: SkillCategory[];
  languages: LanguageEntry[];
};

export type PersonalData = {
  firstname: string;
  lastname: string;
  location: LocalizedString;
  phone: string;
  website: string;
  email: string;
  github: string;
  linkedin: string;
  position: LocalizedString;
};
