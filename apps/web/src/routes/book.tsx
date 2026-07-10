import { createFileRoute } from "@tanstack/react-router";
import { LayoutPlaceholder } from "@/components/layout-placeholder";
import { createLayoutCookie } from "@/lib/layouts";

export const Route = createFileRoute("/book")({
  headers: () => ({
    "Set-Cookie": createLayoutCookie("book"),
  }),
  component: Book,
});

function Book() {
  return <LayoutPlaceholder layout="book" />;
}