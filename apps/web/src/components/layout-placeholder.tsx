import { Link } from "@tanstack/react-router";
import { Button } from "@portfolio/ui/components/button";
import type { LayoutId } from "@/lib/layouts";
import { ScrollProgress } from "./scroll-progress";
import { SiteHeader } from "./site-header";

const copy = {
  book: {
    title: "Book layout is in progress",
    body: "This route is wired for the prose-first Book direction while the full layout work continues.",
  },
  magazine: {
    title: "Magazine layout is in progress",
    body: "This route is ready for the editorial Magazine direction and currently uses the shared layout shell.",
  },
  terminal: {
    title: "Terminal layout is in progress",
    body: "This route is reserved for the command-line portfolio direction and currently uses the shared layout shell.",
  },
} satisfies Record<Exclude<LayoutId, "merged">, { title: string; body: string }>;

export function LayoutPlaceholder({
  layout,
}: {
  layout: Exclude<LayoutId, "merged">;
}) {
  const content = copy[layout];

  return (
    <>
      <ScrollProgress />
      <SiteHeader activeLayout={layout} />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col justify-center px-7 py-20">
        <p className="kicker">Portfolio direction</p>
        <h1 className="mt-4 text-5xl leading-none text-[var(--ink)] md:text-7xl">
          {content.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-[var(--ink-soft)]">
          {content.body}
        </p>
        <Button asChild className="mt-8 w-fit">
          <Link to="/merged">View Merged</Link>
        </Button>
      </main>
    </>
  );
}
