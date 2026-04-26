import type { Book, ReadingStatus } from "@/types/book";

export const READING_STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: "não_iniciado", label: "Não iniciado" },
  { value: "lendo", label: "Lendo" },
  { value: "finalizado", label: "Finalizado" },
  { value: "dropado", label: "Dropado" },
];

export function getReadingStatusLabel(status: ReadingStatus): string {
  return (
    READING_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    status
  );
}

export function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function bookHasGenre(book: Book, genre: string): boolean {
  const normalizedGenre = normalizeText(genre);

  return book.genres.some((bookGenre) => normalizeText(bookGenre) === normalizedGenre);
}
