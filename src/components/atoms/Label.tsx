import type { LabelHTMLAttributes, PropsWithChildren } from "react";

type LabelProps = PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>;

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}