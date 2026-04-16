import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import type { Book, CreateBookPayload, ReadingStatus } from "@/types/book";

const BOOKS_KEY = "books";

function resolveBookStatus(
  startedAt: string,
  finishedAt: string
): ReadingStatus {
  if (startedAt && finishedAt) return "finalizado";
  if (startedAt && !finishedAt) return "lendo";
  return "não_iniciado";
}

export const booksService = {
  getAll(): Book[] {
    return storage.get<Book[]>(BOOKS_KEY) ?? [];
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
      status: resolveBookStatus(data.startedAt, data.finishedAt),
      createdAt: now,
      updatedAt: now,
    };

    storage.set(BOOKS_KEY, [...books, newBook]);
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
      status: resolveBookStatus(data.startedAt, data.finishedAt),
      updatedAt: new Date().toISOString(),
    };

    const updatedBooks = books.map((book) =>
      book.id === id ? updatedBook : book
    );

    storage.set(BOOKS_KEY, updatedBooks);
    return updatedBook;
  },

  delete(id: string): void {
    const books = this.getAll();
    const exists = books.some((book) => book.id === id);
    
    if (!exists) {
      throw new Error("Livro não encontrado.");
    }
    
    const filteredBooks = books.filter((book) => book.id !== id);
    storage.set(BOOKS_KEY, filteredBooks);
  },
};