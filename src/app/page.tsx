import { HomeHeader } from "@/components/organisms/HomeHeader";
import { HomeSection } from "@/components/organisms/HomeSection";
import { FeatureCard } from "@/components/molecules/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <HomeHeader />

      <HomeSection />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-3">
        <FeatureCard
          title="Cadastre livros"
          description="Monte sua biblioteca com título, gênero, status e descrição."
        />

        <FeatureCard
          title="Salve notas de leitura"
          description="Registre citações, comentários e reflexões sobre cada obra."
        />

        <FeatureCard
          title="Acompanhe métricas"
          description="Visualize gráficos e resumos do seu progresso de leitura."
        />
      </section>
    </main>
  );
}