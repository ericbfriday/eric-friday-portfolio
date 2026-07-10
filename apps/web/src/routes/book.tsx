import { createFileRoute } from "@tanstack/react-router";
import { BookLayout } from "@/components/layouts/book";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { createLayoutCookie } from "@/lib/layouts";

export const Route = createFileRoute("/book")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(contributionQueryOptions),
  headers: () => ({
    "Set-Cookie": createLayoutCookie("book"),
  }),
  component: BookLayout,
});
