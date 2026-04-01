import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
}: ButtonProps) {
  const className = clsx(
    "inline-flex items-center gap-2 text-sm uppercase tracking-wide transition",
    {
      "text-white hover:opacity-70": variant === "primary",
      "text-white/40 hover:text-white/70": variant === "ghost",
    }
  );

  // 👉 If href exists → render <a>
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  // 👉 Otherwise → render <button>
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}