import { createFileRoute } from "@tanstack/react-router";
import { LayoutPlaceholder } from "@/components/layout-placeholder";
import { createLayoutCookie } from "@/lib/layouts";

export const Route = createFileRoute("/magazine")({
  headers: () => ({
    "Set-Cookie": createLayoutCookie("magazine"),
  }),
  component: Magazine,
});

function Magazine() {
  return <LayoutPlaceholder layout="magazine" />;
}
