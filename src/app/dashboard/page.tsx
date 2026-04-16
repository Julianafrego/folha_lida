"use client";

import { useEffect } from "react";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { DashboardSummary } from "@/components/organisms/DashboardSumary";
import { HorizontalBarChart } from "@/components/organisms/HorizontalBarChart";
import { VerticalBarChart } from "@/components/organisms/VerticalBarChart";
import { useBooksStore } from "@/store/book.store";
import { useReadingNotesStore } from "@/store/reading-note.store";
import {
  getDashboardSummary,
  getTopGenres,
  getTopAnnotatedBooks,
  getFinishedBooksByMonth,
} from "@/utils/dashboard";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function DashboardPage() {
  const loadBooks = useBooksStore((state) => state.loadBooks);
  const books = useBooksStore((state) => state.books);

  const loadNotes = useReadingNotesStore((state) => state.loadNotes);
  const notes = useReadingNotesStore((state) => state.notes);

  useEffect(() => {
    loadBooks();
    loadNotes();
  }, [loadBooks, loadNotes]);

  const topGenres = getTopGenres(books);
  const topAnnotatedBooks = getTopAnnotatedBooks(books, notes);
  const finishedBooksByMonth = getFinishedBooksByMonth(books).map((item) => ({
    label: item.month,
    value: item.value,
  }));

  const { totalBooks, finishedBooks, totalNotes, pagesReadThisYear } =
    getDashboardSummary(books, notes);

  const {isAuthenticated} = useRequireAuth();
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppTemplate>
      <div className="space-y-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="mt-2 text-zinc-600">
            Acompanhe métricas da sua biblioteca, seus gêneros mais lidos e o
            ritmo das leituras concluídas.
          </p>
        </section>

        <DashboardSummary
          totalBooks={totalBooks}
          finishedBooks={finishedBooks}
          totalNotes={totalNotes}
          pagesReadThisYear={pagesReadThisYear}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <HorizontalBarChart
            title="Top 5 gêneros"
            description="Gêneros mais frequentes na sua biblioteca"
            items={topGenres}
          />

          <HorizontalBarChart
            title="Livros com mais anotações"
            description="Obras que geraram mais registros de leitura"
            items={topAnnotatedBooks}
          />
        </div>

        <VerticalBarChart
          title="Livros lidos por mês"
          description="Quantidade de leituras concluídas ao longo do ano."
          items={finishedBooksByMonth}
          emptyMessage="Nenhum livro finalizado ainda."
        />
      </div>
    </AppTemplate>
  );
}