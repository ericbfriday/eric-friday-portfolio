import { nav } from "@portfolio/content";

export function ContentsList() {
  return (
    <ol className="reveal mx-auto mt-16 max-w-[560px] space-y-0">
      {nav.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="group flex items-baseline gap-3 border-t border-[var(--line)] py-3.5 transition-colors last:border-b hover:text-[var(--green)]"
          >
            <span className="font-mono text-[12px] text-[var(--muted)]">
              {item.no}
            </span>
            <span className="font-serif text-[19px]">{item.label}</span>
            <span className="mx-2 flex-1 self-center border-b border-dotted border-[var(--line)]" />
            <span className="font-mono text-[12px] text-[var(--muted)] transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
