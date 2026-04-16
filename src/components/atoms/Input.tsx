import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-violet-200 ${className}`}
      {...props}
    />
  );
}