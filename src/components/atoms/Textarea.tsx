import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-violet-200 resize-none ${className}`}
      {...props}
    />
  );
}