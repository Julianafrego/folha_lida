import { create } from "zustand";
import { booksService } from "@/services/book.service";
import type { Book, CreateBookPayload } from "@/types/book";

type BooksState = {
  books: Book[];
  loadBooks: () => void;
  createBook: (data: CreateBookPayload) => Book;
  updateBook: (id: string, data: CreateBookPayload) => Book;
  deleteBook: (id: string) => void;
};

export const useBooksStore = create<BooksState>((set) => ({
  books: [],

  loadBooks: () => {
    const books = booksService.getAll();
    set({ books });
  },

  createBook: (data) => {
    const newBook = booksService.create(data);
    set({ books: booksService.getAll() });
    return newBook;
  },

  updateBook: (id, data) => {
    const updatedBook = booksService.update(id, data);
    set({ books: booksService.getAll() });
    return updatedBook;
  },

  deleteBook: (id) => {
    booksService.delete(id);
    set({ books: booksService.getAll() });
  },
}));