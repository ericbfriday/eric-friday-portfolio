export const LAYOUT_COOKIE_NAME = "ebf-layout";
export const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const layouts = [
  {
    id: "book",
    label: "Book",
    path: "/book",
    description: "Prose-first portfolio direction.",
  },
  {
    id: "magazine",
    label: "Magazine",
    path: "/magazine",
    description: "Editorial portfolio direction.",
  },
  {
    id: "merged",
    label: "Merged",
    path: "/merged",
    description: "Current live portfolio presentation.",
  },
  {
    id: "terminal",
    label: "Terminal",
    path: "/terminal",
    description: "Command-line portfolio direction.",
  },
] as const;

export type LayoutId = (typeof layouts)[number]["id"];
export type LayoutPath = (typeof layouts)[number]["path"];

export const DEFAULT_LAYOUT_ID: LayoutId = "book";

export const DEFAULT_LAYOUT =
  layouts.find((layout) => layout.id === DEFAULT_LAYOUT_ID) ?? layouts[0];

export function getLayoutById(id: string | undefined) {
  return layouts.find((layout) => layout.id === id) ?? DEFAULT_LAYOUT;
}

export function getLayoutByPath(path: LayoutPath) {
  return layouts.find((layout) => layout.path === path) ?? DEFAULT_LAYOUT;
}

export function createLayoutCookie(layoutId: LayoutId) {
  return `${LAYOUT_COOKIE_NAME}=${layoutId}; Path=/; SameSite=Lax; Max-Age=${LAYOUT_COOKIE_MAX_AGE}`;
}
