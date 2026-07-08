import { projects } from "@portfolio/content";
import { Badge } from "@portfolio/ui/components/badge";
import { Card } from "@portfolio/ui/components/card";
import { Section } from "../section";

export function SelectedWork() {
  return (
    <Section
      id="work"
      no="01"
      title="Selected Work"
      intro="Engagements that map the threads of my work — securing identity & the supply chain, delivering frontend platforms at scale, and building the AI/MCP tooling other developers' agents depend on."
    >
      <div className="grid gap-5">
        {projects.map((p) => (
          <Card
            key={p.no}
            className="reveal p-7 hover:-translate-y-0.5 hover:border-[var(--green)] md:p-9"
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
              {p.no} · {p.meta}
            </div>
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
              <div>
                <h3 className="font-serif text-[clamp(23px,3vw,29px)] font-medium leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[var(--ink-soft)]">{p.body}</p>
                {p.pull ? (
                  <blockquote className="mt-4 border-l-2 border-[var(--green)] pl-4 font-serif text-[17px] italic text-[var(--ink)]">
                    {p.pull}
                  </blockquote>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              {p.panel ? (
                <pre className="overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--ink)] p-4 font-mono text-[11.5px] leading-relaxed text-[var(--paper)]">
                  <div className="mb-2 text-[var(--muted)]">{p.panel.title}</div>
                  {p.panel.lines.join("\n")}
                </pre>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
