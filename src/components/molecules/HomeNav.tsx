import Link from "next/link";

export function HomeNav() {
  return (
    <nav className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
      >
        Entrar
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-purple-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-900"
      >
        Cadastrar
      </Link>
    </nav>
  );
}