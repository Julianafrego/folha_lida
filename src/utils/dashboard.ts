import type { Book } from "@/types/book";
import type { ReadingNote } from "@/types/reading-note";

type ChartItem = {
  label: string;
  value: number;
};

type MonthlyChartItem = {
  month: string;
  value: number;
};

export function getDashboardSummary(books: Book[], notes: ReadingNote[]) {
  const currentYear = new Date().getFullYear();

  const totalBooks = books.length;
  const finishedBooks = books.filter(
    (book) => book.status === "finalizado"
  ).length;
  const totalNotes = notes.length;

  const pagesReadThisYear = books.reduce((total, book) => {
    if (!book.finishedAt) return total;

    const finishedDate = new Date(book.finishedAt);

    if (Number.isNaN(finishedDate.getTime())) return total;
    if (finishedDate.getFullYear() !== currentYear) return total;

    return total + book.totalPages;
  }, 0);

  return {
    totalBooks,
    finishedBooks,
    totalNotes,
    pagesReadThisYear,
  };
}

export function getTopGenres(books: Book[]): ChartItem[] {
  const genreCount = new Map<string, number>();

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      genreCount.set(genre, (genreCount.get(genre) ?? 0) + 1);
    });
  });

  return [...genreCount.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

export function getTopAnnotatedBooks(
  books: Book[],
  notes: ReadingNote[]
): ChartItem[] {
  const notesByBookId = new Map<string, number>();

  notes.forEach((note) => {
    notesByBookId.set(note.bookId, (notesByBookId.get(note.bookId) ?? 0) + 1);
  });

  return books
    .map((book) => ({
      label: book.title,
      value: notesByBookId.get(book.id) ?? 0,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

export function getFinishedBooksByMonth(books: Book[]): MonthlyChartItem[] {
  const currentYear = new Date().getFullYear();

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const monthCount = new Array(12).fill(0);

  books.forEach((book) => {
    if (!book.finishedAt) return;

    const date = new Date(book.finishedAt);

    if (Number.isNaN(date.getTime())) return;
    if (date.getFullYear() !== currentYear) return;

    const monthIndex = date.getMonth();
    monthCount[monthIndex] += 1;
  });

  return months.map((month, index) => ({
    month,
    value: monthCount[index],
  }));
}