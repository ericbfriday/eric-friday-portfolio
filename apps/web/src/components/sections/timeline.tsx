// Starter render — a dense dated list matching the ledger's mono rhythm.
import { timeline } from "@portfolio/content";
import { Section } from "../section";

export function Timeline() {
  return (
    <Section
      id="timeline"
      no="05"
      title="Timeline"
      intro="Recent milestones, newest first."
    >
      <ol className="relative space-y-8 border-l border-[var(--line)] pl-6">
        {timeline.map((e) => (
          <li key={`${e.when}-${e.title}`} className="reveal relative">
            <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--green)] bg-[var(--paper)]" />
            <div className="font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
              {e.when}
            </div>
            <h3 className="mt-1 font-serif text-[19px] font-medium">{e.title}</h3>
            <p className="mt-1.5 max-w-[var(--measure)] text-[var(--ink-soft)]">
              {e.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
