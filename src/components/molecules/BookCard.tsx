"use client";

import Link from "next/link";
import { getReadingStatusLabel } from "@/utils/book";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-violet-200 hover:shadow-md"
    >
      <article>
        <h3 className="text-lg font-semibold text-zinc-900">{book.title}</h3>

        <p className="mt-1 text-sm text-zinc-600">
          Gêneros: {book.genres.join(", ")}
        </p>

        <p className="mt-1 text-sm text-zinc-600">
          Páginas: {book.totalPages}
        </p>

        <p className="mt-1 text-sm text-zinc-600">
          Nota: {book.rating}/5
        </p>

        <p className="mt-1 text-sm text-zinc-600">
          Estado: {getReadingStatusLabel(book.status)}
        </p>
      </article>
    </Link>
  );
}
