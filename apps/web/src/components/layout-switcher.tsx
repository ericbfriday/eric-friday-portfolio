import { BookOpen, Check, Columns3, Layers3, Terminal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@portfolio/ui/components/button";
import {
  Popout,
  PopoutContent,
  PopoutTrigger,
} from "@portfolio/ui/components/popout";
import { cn } from "@portfolio/ui/lib/utils";
import { layouts, type LayoutId } from "@/lib/layouts";

const icons = {
  book: BookOpen,
  magazine: Columns3,
  merged: Layers3,
  terminal: Terminal,
} satisfies Record<LayoutId, typeof BookOpen>;

export function LayoutSwitcher({ activeLayout }: { activeLayout: LayoutId }) {
  const active = layouts.find((layout) => layout.id === activeLayout);
  const ActiveIcon = icons[activeLayout];

  return (
    <Popout>
      <PopoutTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Select layout${active ? `, current layout is ${active.label}` : ""}`}
          className="rounded-full"
        >
          <ActiveIcon className="h-4 w-4" />
        </Button>
      </PopoutTrigger>
      <PopoutContent aria-label="Portfolio layout selector">
        <div className="px-2 py-1.5 font-mono text-[11px] uppercase text-[var(--muted)]">
          Layout
        </div>
        <div className="grid gap-1">
          {layouts.map((layout) => {
            const Icon = icons[layout.id];
            const isActive = layout.id === activeLayout;

            return (
              <Link
                key={layout.id}
                to={layout.path}
                className={cn(
                  "flex items-start gap-3 rounded-[calc(var(--radius)-2px)] px-2 py-2 text-left outline-none transition-colors hover:bg-[var(--paper-2)] focus-visible:ring-2 focus-visible:ring-[var(--green)]",
                  isActive && "bg-[var(--green-soft)]",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-xs uppercase text-[var(--ink)]">
                    {layout.label}
                  </span>
                  <span className="block text-sm leading-snug text-[var(--ink-soft)]">
                    {layout.description}
                  </span>
                </span>
                {isActive ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </PopoutContent>
    </Popout>
  );
}
