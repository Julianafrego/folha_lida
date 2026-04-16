"use client";

import Link from "next/link";

type HeaderNavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

export function HeaderNavLink({
  href,
  label,
  isActive = false,
}: HeaderNavLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        isActive
          ? "bg-violet-100 text-violet-900"
          : "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      {label}
    </Link>
  );
}