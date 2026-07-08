export type Domain =
  | "AppSec"
  | "Frontend"
  | "MatchSync"
  | "MatchSource"
  | "CIBMTR"
  | "Platform"
  | "AI / LLM"
  | "Gene/HLA";

export interface NavItem {
  no: string;
  id: string;
  label: string;
}

export interface Project {
  no: string;
  meta: string;
  title: string;
  body: string;
  pull?: string;
  tags: string[];
  /** Optional terminal/registry artifact panel */
  panel?: { title: string; lines: string[] };
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface LeadershipItem {
  title: string;
  body: string;
  quote?: string;
}

export interface LedgerRow {
  name: string;
  domain: Domain;
  commits: number;
  latest: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  accent: "green" | "blue";
}

export interface TimelineEntry {
  when: string;
  title: string;
  body: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}
