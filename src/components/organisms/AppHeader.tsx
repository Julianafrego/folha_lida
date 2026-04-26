"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { HeaderNavLink } from "@/components/molecules/HeaderNavLInk";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/crud" className="text-xl font-bold text-purple-800">
            Folha Lida
          </Link>

          <nav className="flex items-center gap-3">
            <HeaderNavLink
              href="/crud"
              label="Registros"
              isActive={pathname === "/crud"}
            />
            <HeaderNavLink
              href="/shelves"
              label="Estantes"
              isActive={pathname === "/shelves"}
            />
            <HeaderNavLink
              href="/dashboard"
              label="Dashboard"
              isActive={pathname === "/dashboard"}
            />

          </nav>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}