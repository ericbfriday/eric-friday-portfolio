import { useEffect, useState } from "react";
import { nav } from "@portfolio/content";
import type { LayoutId } from "@/lib/layouts";
import { LayoutSwitcher } from "./layout-switcher";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ activeLayout }: { activeLayout: LayoutId }) {
  const [active, setActive] = useState<string>(nav[0]?.id ?? "");

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[var(--content-max)] items-center justify-between px-7">
        <a
          href="#top"
          className="font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--ink-soft)]"
        >
          Eric&nbsp;Friday <span className="text-[var(--muted)]">· FE · AppSec · AI</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--ink-soft)] transition-colors hover:text-[var(--green)]"
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
                  active === item.id ? "bg-[var(--green)]" : "bg-[var(--line)]"
                }`}
              />
              {item.label.split(" ")[0]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LayoutSwitcher activeLayout={activeLayout} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
