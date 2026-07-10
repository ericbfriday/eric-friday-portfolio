import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  contact,
  identity,
  leadership,
  projects,
  skills,
  timeline,
} from "@portfolio/content";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { useReveal } from "@/components/use-reveal";

const commands = [
  { label: "help", href: "#top" },
  { label: "work", href: "#work" },
  { label: "skills", href: "#skills" },
  { label: "leadership", href: "#leadership" },
  { label: "ledger", href: "#map" },
  { label: "timeline", href: "#timeline" },
  { label: "contact", href: "#contact" },
];

export function TerminalLayout() {
  useReveal();

  return (
    <>
      <ScrollProgress />
      <SiteHeader activeLayout="terminal" />
      <main className="bg-[var(--paper)] font-mono">
        <TerminalHero />
        <TerminalWork />
        <TerminalSkills />
        <TerminalLeadership />
        <TerminalLedger />
        <TerminalTimeline />
        <TerminalContact />
      </main>
    </>
  );
}

function TerminalHero() {
  return (
    <section
      id="top"
      className="border-b border-[var(--line)] bg-[var(--paper)]"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-7 py-20 md:py-28">
        <ShellFrame label="portfolio-session">
          <CommandLine command="help" />
          <div className="reveal is-visible grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-[var(--green)]">
                {identity.kicker}
              </p>
              <h1 className="mt-5 font-mono text-[clamp(44px,9vw,92px)] font-semibold leading-none tracking-normal text-[var(--ink)]">
                {identity.name}
              </h1>
              <p className="mt-5 max-w-[760px] text-[clamp(16px,2.3vw,24px)] leading-8 text-[var(--ink-soft)]">
                {identity.role}
              </p>
              <p className="mt-7 max-w-[var(--measure)] font-serif text-[18px] leading-8 text-[var(--ink-soft)]">
                {identity.intro}
              </p>
            </div>
            <CommandStrip />
          </div>
        </ShellFrame>
      </div>
    </section>
  );
}

function TerminalWork() {
  return (
    <TerminalSection
      id="work"
      no="01"
      title="Selected Work"
      command="open work"
      output="filesystem work listing"
    >
      <div className="grid gap-5">
        {projects.map((project) => (
          <article
            key={project.no}
            className="reveal border border-[var(--line)] bg-[var(--card)] p-5 md:p-6"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[18px] font-semibold leading-7 text-[var(--ink)]">
                ./work/{slug(project.title)}/
              </h3>
              <span className="text-[11px] uppercase tracking-[1.4px] text-[var(--muted)]">
                {project.no} / {project.meta}
              </span>
            </div>
            <dl className="mt-5 grid gap-4 md:grid-cols-[110px_1fr]">
              <TerminalField label="role">{project.meta}</TerminalField>
              <TerminalField label="system">{project.body}</TerminalField>
              <TerminalField label="impact">
                {project.pull ?? project.tags.join(" / ")}
              </TerminalField>
              <TerminalField label="evidence">
                {project.tags.join(" / ")}
              </TerminalField>
            </dl>
            {project.panel ? (
              <pre className="mt-5 overflow-x-auto border border-[var(--line)] bg-[var(--ink)] p-4 text-[11.5px] leading-6 text-[var(--paper)]">
                <div className="mb-2 text-[var(--muted)]">
                  {project.panel.title}
                </div>
                {project.panel.lines.join("\n")}
              </pre>
            ) : null}
          </article>
        ))}
      </div>
    </TerminalSection>
  );
}

function TerminalSkills() {
  return (
    <TerminalSection
      id="skills"
      no="02"
      title="Skills & Competencies"
      command="list skills"
      output="grouped capability list"
      alt
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group) => (
          <section
            key={group.label}
            className="reveal border border-[var(--line)] bg-[var(--paper)] p-5"
          >
            <h3 className="text-[12px] uppercase tracking-[1.5px] text-[var(--green)]">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--line)] px-3 py-1.5 text-[11px] leading-none text-[var(--ink-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TerminalSection>
  );
}

function TerminalLeadership() {
  return (
    <TerminalSection
      id="leadership"
      no="03"
      title="Leadership & Review"
      command="cat leadership"
      output="review and decision signals"
    >
      <div className="grid gap-5">
        {leadership.map((item) => (
          <article
            key={item.title}
            className="reveal border-l-2 border-[var(--green)] bg-[var(--card)] px-5 py-4"
          >
            <h3 className="text-[13px] uppercase tracking-[1.5px] text-[var(--green)]">
              {item.title}
            </h3>
            {item.quote ? (
              <blockquote className="mt-3 font-serif text-[22px] italic leading-8 text-[var(--ink)]">
                "{item.quote}"
              </blockquote>
            ) : null}
            <p className="mt-3 font-serif text-[17px] leading-8 text-[var(--ink-soft)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </TerminalSection>
  );
}

function TerminalLedger() {
  const { data } = useSuspenseQuery(contributionQueryOptions);
  const max = useMemo(
    () => Math.max(...data.rows.map((row) => row.commits)),
    [data.rows],
  );

  return (
    <TerminalSection
      id="map"
      no="04"
      title="Contribution Map"
      command="query ledger"
      output={`${data.rows.length} rows returned`}
      alt
    >
      <div className="reveal grid gap-3 md:grid-cols-4">
        {data.stats.map((stat) => (
          <div key={stat.label} className="border-t-2 border-[var(--line)] pt-3">
            <div
              className="text-[clamp(28px,5vw,44px)] font-semibold leading-none"
              style={{
                color:
                  stat.accent === "green" ? "var(--green)" : "var(--blue)",
              }}
            >
              {stat.value}
              {stat.suffix}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[1.3px] text-[var(--muted)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-8 overflow-hidden border border-[var(--line)]">
        <div className="hidden grid-cols-[0.8fr_1.3fr_0.9fr_0.7fr] gap-4 border-b border-[var(--ink)] bg-[var(--card)] px-4 py-3 text-[10px] uppercase tracking-[1.5px] text-[var(--muted)] md:grid">
          <span>area</span>
          <span>evidence</span>
          <span>impact</span>
          <span className="text-right">signal</span>
        </div>
        {data.rows.map((row) => (
          <div
            key={row.name}
            className="grid gap-3 border-b border-[var(--line)] px-4 py-4 last:border-b-0 md:grid-cols-[0.8fr_1.3fr_0.9fr_0.7fr] md:items-center"
          >
            <div className="text-[11px] uppercase tracking-[1.3px] text-[var(--green)]">
              {row.domain}
            </div>
            <div className="font-serif text-[17px] leading-7 text-[var(--ink)]">
              {row.name}
            </div>
            <div>
              <div className="h-1.5 bg-[var(--line)]">
                <div
                  className="h-full bg-[var(--green)]"
                  style={{ width: `${(row.commits / max) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-[var(--ink-soft)]">
                {row.commits} authored commits
              </div>
            </div>
            <div className="text-left text-[11px] text-[var(--muted)] md:text-right">
              {row.latest}
            </div>
          </div>
        ))}
      </div>
    </TerminalSection>
  );
}

function TerminalTimeline() {
  return (
    <TerminalSection
      id="timeline"
      no="05"
      title="Timeline"
      command="history timeline"
      output="recent milestones"
    >
      <ol className="grid gap-5">
        {timeline.map((entry) => (
          <li
            key={`${entry.when}-${entry.title}`}
            className="reveal grid gap-3 border-t border-[var(--line)] pt-5 md:grid-cols-[130px_1fr]"
          >
            <div className="text-[11px] uppercase tracking-[1.4px] text-[var(--green)]">
              {entry.when}
            </div>
            <div>
              <h3 className="font-serif text-[22px] font-medium leading-7 text-[var(--ink)]">
                {entry.title}
              </h3>
              <p className="mt-2 font-serif text-[17px] leading-8 text-[var(--ink-soft)]">
                {entry.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </TerminalSection>
  );
}

function TerminalContact() {
  const emailRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const address = contact.emailParts.join("");
    if (emailRef.current) {
      emailRef.current.setAttribute("href", `mailto:${address}`);
      emailRef.current.textContent = address;
    }
  }, []);

  return (
    <TerminalSection
      id="contact"
      no="06"
      title="Contact"
      command="contact --links"
      output="available channels"
      alt
    >
      <div className="reveal border border-[var(--line)] bg-[var(--card)] p-6 md:p-8">
        <p className="font-serif text-[clamp(32px,6vw,64px)] leading-none text-[var(--ink)]">
          {contact.headline}
        </p>
        <p className="mt-5 max-w-[var(--measure)] font-serif text-[18px] leading-8 text-[var(--ink-soft)]">
          {contact.blurb}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            ref={emailRef}
            href="#"
            className="border border-[var(--ink)] px-4 py-2 text-[12px] uppercase tracking-[1px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            email
          </a>
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--ink)] px-4 py-2 text-[12px] uppercase tracking-[1px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              {link.label} / {link.value}
            </a>
          ))}
        </div>
      </div>
    </TerminalSection>
  );
}

function TerminalSection({
  id,
  no,
  title,
  command,
  output,
  children,
  alt,
}: {
  id: string;
  no: string;
  title: string;
  command: string;
  output: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-b border-[var(--line)] ${
        alt ? "bg-[var(--paper-2)]" : "bg-[var(--paper)]"
      }`}
    >
      <div className="mx-auto max-w-[var(--content-max)] px-7 py-20 md:py-24">
        <ShellFrame label={`${no}.${id}`}>
          <CommandLine command={command} />
          <div className="reveal mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[1.8px] text-[var(--green)]">
                {no}
              </div>
              <h2 className="mt-2 font-serif text-[clamp(30px,5vw,48px)] font-medium leading-tight text-[var(--ink)]">
                {title}
              </h2>
            </div>
            <div className="text-[11px] uppercase tracking-[1.3px] text-[var(--muted)]">
              {output}
            </div>
          </div>
          {children}
        </ShellFrame>
      </div>
    </section>
  );
}

function ShellFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-[var(--ink)] bg-[var(--paper)]">
      <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[10px] uppercase tracking-[1.5px] text-[var(--muted)]">
        <span>{label}</span>
        <span>ready</span>
      </div>
      <div className="p-5 md:p-7">{children}</div>
    </div>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <div className="mb-6 flex min-w-0 items-baseline gap-2 text-[13px]">
      <span className="text-[var(--green)]">visitor@portfolio</span>
      <span className="text-[var(--muted)]">:</span>
      <span className="text-[var(--blue)]">~</span>
      <span className="text-[var(--muted)]">$</span>
      <span className="min-w-0 break-words text-[var(--ink)]">{command}</span>
    </div>
  );
}

function CommandStrip() {
  return (
    <nav
      aria-label="Terminal commands"
      className="border border-[var(--line)] bg-[var(--card)] p-4"
    >
      <div className="text-[10px] uppercase tracking-[1.5px] text-[var(--muted)]">
        commands
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {commands.map((command) => (
          <a
            key={command.label}
            href={command.href}
            className="whitespace-nowrap border border-[var(--line)] px-3 py-2 text-[11px] text-[var(--ink-soft)] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            $ {command.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function TerminalField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <dt className="text-[11px] uppercase tracking-[1.4px] text-[var(--green)]">
        {label}
      </dt>
      <dd className="font-serif text-[16px] leading-7 text-[var(--ink-soft)]">
        {children}
      </dd>
    </>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
