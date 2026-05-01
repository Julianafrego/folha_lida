import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 focus:bg-white focus:ring-violet-200 ${className}`}
      {...props}
    />
  );
}