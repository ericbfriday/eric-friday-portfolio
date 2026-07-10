import { createFileRoute } from "@tanstack/react-router";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { createLayoutCookie } from "@/lib/layouts";
import { MagazineLayout } from "@/components/layouts/magazine";

export const Route = createFileRoute("/magazine")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(contributionQueryOptions),
  headers: () => ({
    "Set-Cookie": createLayoutCookie("magazine"),
  }),
  component: Magazine,
});

function Magazine() {
  return <MagazineLayout />;
}
