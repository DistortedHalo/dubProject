import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";



export function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 text-sm uppercase tracking-wide transition",
        {
          // default (Submit brief)
          "text-white hover:opacity-70": variant === "primary",

          // Learn More style
          "text-white/40 hover:text-white/70": variant === "ghost",
        }
      )}
    >
      {children}
    </button>
  );
}