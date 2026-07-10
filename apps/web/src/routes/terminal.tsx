import { createFileRoute } from "@tanstack/react-router";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { TerminalLayout } from "@/components/layouts/terminal";
import { createLayoutCookie } from "@/lib/layouts";

export const Route = createFileRoute("/terminal")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(contributionQueryOptions),
  headers: () => ({
    "Set-Cookie": createLayoutCookie("terminal"),
  }),
  component: Terminal,
});

function Terminal() {
  return <TerminalLayout />;
}
