import { StatCard } from "@/components/molecules/StatCard";

type DashboardSummaryProps = {
  totalBooks: number;
  finishedBooks: number;
  totalNotes: number;
  pagesReadThisYear: number;
};

export function DashboardSummary({
  totalBooks,
  finishedBooks,
  totalNotes,
  pagesReadThisYear,
}: DashboardSummaryProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total de livros"
        value={totalBooks}
        helper="Livros cadastrados na biblioteca"
      />

      <StatCard
        label="Finalizados"
        value={finishedBooks}
        helper="Livros concluídos"
      />

      <StatCard
        label="Notas de leitura"
        value={totalNotes}
        helper="Registros e reflexões salvas"
      />

      <StatCard
        label="Páginas lidas"
        value={pagesReadThisYear}
        helper="Páginas concluídas neste ano"
      />
    </section>
  );
}