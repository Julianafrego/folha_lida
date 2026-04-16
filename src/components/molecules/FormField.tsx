import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FormField({
  label,
  id,
  error,
  className = "",
  ...props
}: FormFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id}>{label}</Label>

      <Input
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