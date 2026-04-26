"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { getReadingStatusLabel } from "@/utils/book";
import type { Book } from "@/types/book";

type BookDetailsSectionProps = {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
};

export function BookDetailsSection({
  book,
  onEdit,
  onDelete,
}: BookDetailsSectionProps) {
  const router = useRouter();

  return (
    <section className="bg-violet-50 p-8 lg:p-10">
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-800 transition hover:text-violet-950"
        >
          <span className="text-4xl cursor-pointer"> ← </span>
          
        </button>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-violet-900">
            {book.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {book.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-800"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-zinc-800">Páginas:</span>{" "}
              {book.totalPages}
            </p>

            <p>
              <span className="font-semibold text-zinc-800">Nota:</span>{" "}
              {book.rating}/5
            </p>

            <p>
              <span className="font-semibold text-zinc-800">Início:</span>{" "}
              {book.startedAt || "Não informado"}
            </p>

            <p>
              <span className="font-semibold text-zinc-800">Fim:</span>{" "}
              {book.finishedAt || "Não informado"}
            </p>

            <p>
              <span className="font-semibold text-zinc-800">Estado:</span>{" "}
              {getReadingStatusLabel(book.status)}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-violet-900">
              Descrição
            </h2>

            <p className="leading-relaxed text-zinc-700">
              {book.description || "Sem descrição."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={onEdit}>
              Editar livro
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onDelete}
            >
              Excluir livro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}