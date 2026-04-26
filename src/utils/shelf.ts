import type { Book } from "@/types/book";
import type { Shelf, ShelfRule } from "@/types/shelf";
import { bookHasGenre, getReadingStatusLabel, normalizeText } from "@/utils/book";

export function bookMatchesShelfRule(book: Book, rule: ShelfRule): boolean {
  if (rule.field === "genre") {
    return bookHasGenre(book, rule.value);
  }

  if (rule.field === "status") {
    return book.status === rule.value;
  }

  return false;
}

export function getBooksByShelf(books: Book[], shelf: Shelf): Book[] {
  if (shelf.rules.length === 0) return [];

  return books.filter((book) => {
    if (shelf.matchMode === "all") {
      return shelf.rules.every((rule) => bookMatchesShelfRule(book, rule));
    }

    return shelf.rules.some((rule) => bookMatchesShelfRule(book, rule));
  });
}

export function getShelfRuleLabel(rule: ShelfRule): string {
  if (rule.field === "genre") {
    return `Gênero: ${rule.value}`;
  }

  return `Status: ${getReadingStatusLabel(rule.value as Book["status"])}`;
}

export function getExistingGenres(books: Book[]): string[] {
  const genres = new Map<string, string>();

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      const normalizedGenre = normalizeText(genre);
      if (!genres.has(normalizedGenre)) {
        genres.set(normalizedGenre, genre);
      }
    });
  });

  return [...genres.values()].sort((a, b) => a.localeCompare(b));
}
