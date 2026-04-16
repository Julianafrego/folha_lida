import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseButtonProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseButtonProps & {
  href: string;
};

type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button({
  children,
  className = "",
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-violet-900 to-purple-700 text-white shadow-lg shadow-violet-200 hover:scale-[1.01] hover:shadow-violet-300 active:scale-[0.99]",
    secondary:
      "border border-violet-200 bg-white text-violet-900 hover:bg-violet-50",
    ghost:
      "bg-transparent text-violet-800 hover:bg-violet-50 hover:text-violet-700",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const { type = "button", ...buttonProps } = nativeProps;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}