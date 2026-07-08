import type {
  ContactLink,
  LeadershipItem,
  LedgerRow,
  NavItem,
  Project,
  SkillGroup,
  Stat,
  TimelineEntry,
} from "./types";

export const identity = {
  name: "Eric B. Friday",
  kicker: "Portfolio · Frontend · AppSec · AI Tooling",
  role: "Senior Frontend & Application Security Engineer — NMDP / CIBMTR",
  monogram: "FE · AppSec · AI",
  intro:
    "I build and harden the software that connects patients to life-saving cell therapies. Four threads run through the work: owning NMDP's Okta identity libraries and an org-wide supply-chain security program; shipping frontend platforms at scale across Biotherapies, MatchSync, and CIBMTR; building production MCP servers and AI developer tooling; and acting as the de-facto security reviewer and pattern-decider across teams.",
} as const;

export const nav: NavItem[] = [
  { no: "01", id: "work", label: "Selected Work" },
  { no: "02", id: "skills", label: "Skills & Competencies" },
  { no: "03", id: "leadership", label: "Leadership & Review" },
  { no: "04", id: "map", label: "Contribution Map" },
  { no: "05", id: "timeline", label: "Timeline" },
  { no: "06", id: "contact", label: "Contact" },
];

export const projects: Project[] = [
  {
    no: "01",
    meta: "AppSec / DevOps · sole owner",
    title: "npm Supply-Chain Security Program",
    body: "A self-directed, org-wide hardening effort. npmrc-research defines registry-compliance standards; frontend-security-audit operationalizes them as a package-manager-aware auditor running 5 adaptive PASS/WARN/FAIL checks across 58+ repos on scheduled CI scans.",
    pull: "Lockfile health, registry config, deterministic installs, version pinning — enforced continuously, reported by email.",
    tags: ["npm · yarn · pnpm", "CI scans", "ADRs"],
    panel: {
      title: "frontend-security-audit",
      lines: [
        "$ fsa run --all            # 58 repos",
        "scanning repositories…",
        "✔ lockfile-health          PASS  52",
        "▲ registry-config          WARN   4",
        "✖ deterministic-install    FAIL   2",
        "✔ ci-registry-usage        PASS  55",
        "✔ version-pinning          PASS  49",
        "report emailed · next run scheduled ▋",
      ],
    },
  },
  {
    no: "02",
    meta: "AI / LLM Tooling · self-directed program",
    title: "AI Developer Productivity & MCP Servers",
    body: "@nmdp/jira-mcp — a production Model Context Protocol server published to NMDP's private Nexus registry, exposing 89 tools across 5 domain servers. Alongside it: a 5-server API-discovery pipeline, an AWS Bedrock HLA-extraction PoC, and Kiro/Claude agent ecosystems — infrastructure other developers' AI agents depend on.",
    pull: "Not “used Copilot” — built the tooling that makes Jira, APIs, and clinical documents operable by any MCP-aware agent.",
    tags: ["Model Context Protocol", "TypeScript · Effect", "AWS Bedrock"],
    panel: {
      title: "@nmdp/jira-mcp · nexus",
      lines: [
        "$ mcp list --server jira    # 89 tools",
        "jira-core-mcp       47 tools",
        "jira-agile-mcp      19 tools",
        "jira-dev-mcp        15 + 4 prompts",
        "jira-context-mcp     8 + resources",
        "ESM · Node 22+ · Zod · Biome · pnpm-only",
        "published → nexus.nmdp.org ▋",
      ],
    },
  },
  {
    no: "03",
    meta: "AppSec · ~150 commits",
    title: "SEL — Secure Enterprise Login",
    body: "NMDP's shared Okta library for SPAs — SSO, session & token management, authn/authz. I rewrote the core wrapper in TypeScript (tsup + Nx), ran the Angular 18→19 migrations, and authored the canonical OIDC guidance — “how to do auth at NMDP.”",
    tags: ["Okta", "OIDC / SSO", "TypeScript"],
  },
  {
    no: "04",
    meta: "Frontend · ~315 commits",
    title: "Biotherapies — “Unite”",
    body: "My largest single-codebase contribution: an Angular / UI-Router app for the cell-collection & donor-order workflow. Order carts, day-of-collection task handling, ISBT-128 fields, cancellation flows, admin APIs, plus extensive AngularJS→Angular cleanup.",
    tags: ["Angular", "UI-Router", "ISBT-128"],
  },
  {
    no: "05",
    meta: "AI / Tooling · owns",
    title: "API Discovery Pipeline",
    body: "An end-to-end API-discovery pipeline built as 5 cooperating MCP servers — capture → infer → validate → mock → document — driven by a supervisor state machine with a validation→refinement feedback loop. Effect Schema, RFC 9457 errors, property-based testing, plus custom Kiro agents.",
    tags: ["Bun · Effect", "OpenAPI · WireMock", "Schemathesis"],
  },
  {
    no: "06",
    meta: "Gene/HLA · AI/ML PoC",
    title: "HLA Extraction PoC",
    body: "An AWS Bedrock service extracting HLA typing data from medical documents — multi-model comparison (Nova, Claude 3, Llama 3), confidence scoring, a human-validation workflow, and Form 2005 generation. Connects the AppSec/frontend skill set to the Gene/HLA domain.",
    tags: ["AWS Bedrock", "Express · TS", "PostgreSQL · S3"],
  },
  {
    no: "07",
    meta: "CIBMTR · active 2026-06",
    title: "CIBMTR Reporting App",
    body: "An Angular SMART-on-FHIR app retrieving EHR data into the CIBMTR FHIR server. I led a phased auth-hardening campaign: tokens moved to sessionStorage, PKCE, idle & absolute session caps, issuer validation with an origin allowlist, and BroadcastChannel cross-tab sync.",
    tags: ["SMART-on-FHIR", "PKCE", "Session hardening"],
  },
  {
    no: "08",
    meta: "CIBMTR · research & POC",
    title: "SSR Viability Engagement",
    body: "Architecture research to move FHIR calls server-side — eliminating CORS/CSP/iframe failures at transplant centers and keeping tokens off the browser. Three Dockerized POCs and shared libraries: @cibmtr/session-store (AES-256-GCM) and a Playwright e2e suite.",
    tags: ["Next.js / Hono", "React Router 7", "Playwright"],
  },
  {
    no: "09",
    meta: "MatchSync · ~150 commits combined",
    title: "MatchSync Platform — IFA & PMT",
    body: "Across International Forms Automation and the Property Management Tool: OIDC RP & auth-config libraries, the Next.js 14→15 upgrade, CSP reporting, security-header fixes, Better Auth role-based tRPC procedures, session-termination polling, and SonarQube remediation — a recurring better-auth architectural thread.",
    tags: ["Next.js 15", "Better Auth", "tRPC · Prisma", "CSP"],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Frontend & Platform",
    items: [
      "TypeScript",
      "Angular & AngularJS→Angular",
      "Next.js 14 / 15 · React 19",
      "Nx monorepos",
      "UI-Router · tRPC · Prisma",
      "SSR — Next · Hono · RR7",
    ],
  },
  {
    label: "AI / LLM Engineering",
    items: [
      "Model Context Protocol (MCP)",
      "Production MCP servers",
      "AWS Bedrock · multi-model",
      "Effect · Zod schemas",
      "Kiro / Claude agents",
      "Multi-agent orchestration",
    ],
  },
  {
    label: "Security & Identity",
    items: [
      "Okta · OIDC / SSO",
      "SMART-on-FHIR · PKCE",
      "Session hardening",
      "CSP & security headers",
      "Better Auth",
      "npm supply-chain auditing",
    ],
  },
  {
    label: "Quality & DevOps",
    items: [
      "Playwright E2E",
      "Zod validation",
      "SonarQube",
      "CI/CD security scans",
      "Docker · Helm · K8s",
      "ADRs · AES-256-GCM",
    ],
  },
  {
    label: "Healthcare Domain",
    items: [
      "FHIR R4",
      "Cell-collection workflows",
      "Donor order management",
      "HLA / genotyping",
      "ISBT-128",
      "CIBMTR reporting",
    ],
  },
];

export const leadership: LeadershipItem[] = [
  {
    title: "Designated security reviewer",
    body: "Named reviewer on the CRA team's most security-sensitive frontend work — CSP & security-header configuration for iframe EPIC embedding (MR !378). The team's go-to authority on CSP and auth.",
  },
  {
    title: "The pattern-decider",
    quote:
      "To my mind, it is a bad idea to pass setters from useState to the inner component. @efriday do you agree?",
    body: "Colleagues defer to him on React patterns and service architecture — the readonly + asObservable pattern was rolled out across all services on his guidance.",
  },
  {
    title: "Mentorship through review",
    body: "Deliberately routes junior engineers through review as a knowledge-transfer mechanism — authoring MRs and assigning them as reviewer (PMT !3), then handing off ownership once they're up to speed.",
  },
  {
    title: "Enterprise-architecture communication",
    body: "The SSR engagement produced an SBAR, a 349-line architecture review for enterprise architects, a stakeholder deck, and 5,000+ lines of comparative research — translating deep technical work into executive-readable recommendations.",
  },
];

export const ledger: LedgerRow[] = [
  { name: "Biotherapies “Unite”", domain: "Frontend", commits: 315, latest: "2026-02" },
  { name: "SEL — Okta Login", domain: "AppSec", commits: 150, latest: "2026-02" },
  { name: "Intl. Forms Automation", domain: "MatchSync", commits: 115, latest: "2026-02" },
  { name: "Okta SEL Widget", domain: "AppSec", commits: 51, latest: "2025-09" },
  { name: "Property Mgmt Tool", domain: "MatchSync", commits: 34, latest: "2026-01" },
  { name: "MatchSource", domain: "MatchSource", commits: 25, latest: "2026-05" },
  { name: "SearchLite DevOps", domain: "MatchSync", commits: 17, latest: "2026-01" },
  { name: "CIBMTR Reporting App", domain: "CIBMTR", commits: 16, latest: "2026-06" },
  { name: "Frontend Security Audit", domain: "AppSec", commits: 13, latest: "2026-05" },
  { name: "npmrc-research", domain: "AppSec", commits: 13, latest: "2026-05" },
  { name: "Hackathon — Forms Engine", domain: "MatchSync", commits: 11, latest: "2024-10" },
  { name: "IT / Metrics Dashboard", domain: "Platform", commits: 5, latest: "2025-11" },
  { name: "HML Dashboard", domain: "Platform", commits: 4, latest: "2026-03" },
  { name: "SSR Viability Sandbox", domain: "CIBMTR", commits: 4, latest: "2026-03" },
];

export const ledgerFilters = [
  "All",
  "AppSec",
  "Frontend",
  "MatchSync",
  "MatchSource",
  "CIBMTR",
  "Platform",
] as const;

export const stats: Stat[] = [
  { value: 773, label: "Authored commits", accent: "green" },
  { value: 89, label: "MCP tools shipped", accent: "blue" },
  { value: 7, label: "Product domains", accent: "green" },
  { value: 58, suffix: "+", label: "Repos audited", accent: "blue" },
];

export const timeline: TimelineEntry[] = [
  { when: "2026 · JUN", title: "CRA SMART-on-FHIR auth-hardening", body: "PKCE, idle & absolute session caps, issuer validation, origin allowlist, and timeout-driven token revocation — with comprehensive test coverage." },
  { when: "2026 · MAY", title: "Supply-chain audit operationalized", body: "Adaptive PASS/WARN/FAIL checks rolled out across 58+ repositories on scheduled CI scans — sole owner." },
  { when: "2026 · MAR", title: "@nmdp/jira-mcp published to Nexus", body: "A production MCP server — 89 tools across 5 domain servers — published to NMDP's private Nexus registry. ESM, Node 22+, Zod-validated, pnpm-only, with a secret-detection CI pipeline." },
  { when: "2026 · Q1", title: "SSR viability engagement", body: "Three Dockerized POCs plus shared libraries — server-side sessions, FHIR Zod schemas, and a cross-POC Playwright suite." },
  { when: "2026 · Q1", title: "PMT — Better Auth integration", body: "Role-based tRPC procedures, session-termination polling, and an admin “stop impersonation” banner on Next.js 15 / React 19." },
  { when: "2025 · Q3", title: "Okta SEL Widget", body: "A yarn-workspaces monorepo with a custom Okta authorization server — the transition vehicle for the SEL library." },
  { when: "2025 · Q2", title: "SEL core rewritten in TypeScript", body: "Rebuilt the Okta wrapper with tsup bundling and deeper Nx integration." },
  { when: "2025 · Q1", title: "API Discovery Pipeline (5 MCP servers)", body: "An end-to-end capture→infer→validate→mock→document pipeline driven by a supervisor state machine — built on Bun + Effect with custom Kiro agents." },
  { when: "2024 · Q4", title: "Hackathon — forms engine", body: "Prototyped the MatchSync forms-automation engine that fed into IFA." },
];

export const contact = {
  headline: "Let's build something secure & well-made.",
  blurb:
    "Open to conversations about frontend platform engineering, application security, and identity.",
  /** email assembled at runtime so it never sits whole in the markup */
  emailParts: ["ericfriday", "@", "gmail", ".", "com"] as const,
  links: [
    { label: "GitHub", value: "/ericbfriday", href: "https://github.com/ericbfriday" },
    { label: "LinkedIn", value: "in/ericfriday", href: "https://www.linkedin.com/in/ericfriday" },
  ] satisfies ContactLink[],
};
