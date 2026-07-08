// Starter render — extend with the "typographic cloud" treatment (direction C) if desired.
import { skills } from "@portfolio/content";
import { Badge } from "@portfolio/ui/components/badge";
import { Section } from "../section";

export function Skills() {
  return (
    <Section
      id="skills"
      no="02"
      title="Skills & Competencies"
      intro="Disciplines that meet at the browser: shipping frontend platforms, securing the identity & supply chain underneath them, and building the AI/MCP tooling layered on top."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.label} className="reveal">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--green)]">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
