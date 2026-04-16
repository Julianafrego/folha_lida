import type { TextareaHTMLAttributes } from "react";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/Textarea";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextareaField({
  label,
  id,
  error,
  className = "",
  ...props
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id}>{label}</Label>

      <Textarea
        id={id}
        className={`${className} ${
          error
            ? "ring-1 ring-red-300 focus:ring-red-300"
            : ""
        }`}
        {...props}
      />

      {error ? (
        <p role="alert" className="mt-1 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}