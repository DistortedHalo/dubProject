import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type Props =
  | (SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export function Button(props: Props) {
  const { children, className = "", ...rest } = props;
  const classes = `small-outline-button gap-2 ${className}`;

  if ("href" in props && props.href) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
