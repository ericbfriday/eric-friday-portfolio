import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[1px] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink-soft)]",
        green:
          "border-transparent bg-[var(--green-soft)] text-[var(--green)]",
        blue: "border-transparent bg-[var(--blue-soft)] text-[var(--blue)]",
        outline: "border-[var(--line)] text-[var(--ink-soft)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
