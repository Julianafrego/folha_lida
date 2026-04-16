import { Brand } from "@/components/atoms/Brand";
import { HomeNav } from "@/components/molecules/HomeNav";

export function HomeHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Brand />
        <HomeNav />
      </div>
    </header>
  );
}