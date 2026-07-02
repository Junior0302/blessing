"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-amber text-cream hover:bg-amber-light shadow-soft hover:shadow-card border border-amber/20",
  secondary:
    "bg-cream/10 text-cream hover:bg-cream/15 border border-cream/20 backdrop-blur-sm",
  ghost: "bg-transparent text-cream hover:bg-cream/8 border border-transparent",
  outline:
    "bg-transparent text-cream border border-cream/30 hover:border-amber/60 hover:text-amber-light",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-sm tracking-widest",
  lg: "px-8 py-4 text-sm tracking-[0.2em]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-body font-medium uppercase transition-all duration-300 ease-out rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
