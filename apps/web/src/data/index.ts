import profileData from "./profile.json";
import resumeData from "./resume.json";
import type { PersonalData, ResumeData } from "./types";

export const resume: ResumeData = resumeData;
export const personal: PersonalData = profileData;

export type {
  CertificationEntry,
  DateRange,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  LocalizedArray,
  LocalizedString,
  PersonalData,
  ProjectEntry,
  ResumeData,
  SkillCategory,
} from "./types";
