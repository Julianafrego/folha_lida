import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import { authService } from "@/services/auth.service";
import type { Book, CreateBookPayload, ReadingStatus } from "@/types/book";

function getBooksKey(): string {
  const user = authService.getStoredUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  return `books:${user.id}`;
}

function resolveLegacyBookStatus(
  startedAt: string,
  finishedAt: string
): ReadingStatus {
  if (startedAt && finishedAt) return "finalizado";
  if (startedAt && !finishedAt) return "lendo";
  return "não_iniciado";
}

function normalizeBook(book: Book): Book {
  return {
    ...book,
    status: book.status ?? resolveLegacyBookStatus(book.startedAt, book.finishedAt),
  };
}

export const booksService = {
  getAll(): Book[] {
    const books = storage.get<Book[]>(getBooksKey()) ?? [];
    return books.map(normalizeBook);
  },

  getById(id: string): Book | null {
    const books = this.getAll();
    return books.find((book) => book.id === id) ?? null;
  },

  create(data: CreateBookPayload): Book {
    const books = this.getAll();
    const now = new Date().toISOString();

    const newBook: Book = {
      id: uuid(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    storage.set(getBooksKey(), [...books, newBook]);
    return newBook;
  },

  update(id: string, data: CreateBookPayload): Book {
    const books = this.getAll();
    const existingBook = books.find((book) => book.id === id);

    if (!existingBook) {
      throw new Error("Livro não encontrado.");
    }

    const updatedBook: Book = {
      ...existingBook,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const updatedBooks = books.map((book) =>
      book.id === id ? updatedBook : book
    );

    storage.set(getBooksKey(), updatedBooks);
    return updatedBook;
  },

  delete(id: string): void {
    const books = this.getAll();
    const exists = books.some((book) => book.id === id);

    if (!exists) {
      throw new Error("Livro não encontrado.");
    }

    const filteredBooks = books.filter((book) => book.id !== id);
    storage.set(getBooksKey(), filteredBooks);
  },
};
