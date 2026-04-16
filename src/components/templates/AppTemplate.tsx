import type { PropsWithChildren } from "react";
import { AppHeader } from "@/components/organisms/AppHeader";

export function AppTemplate({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <main className="px-6 py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}