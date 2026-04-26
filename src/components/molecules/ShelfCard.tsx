"use client";

import { Button } from "@/components/atoms/Button";
import { getReadingStatusLabel } from "@/utils/book";
import type { ReadingStatus } from "@/types/book";
import type { Shelf } from "@/types/shelf";

type ShelfCardProps = {
  shelf: Shelf;
  booksCount: number;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ShelfCard({
  shelf,
  booksCount,
  onOpen,
  onEdit,
  onDelete,
}: ShelfCardProps) {
  const genreRules = shelf.rules.filter((rule) => rule.field === "genre");
  const statusRules = shelf.rules.filter((rule) => rule.field === "status");

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen();
          }
        }}
        className="cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">{shelf.name}</h2>

            <p className="mt-1 text-sm text-zinc-500">
              {booksCount} {booksCount === 1 ? "livro na estante" : "livros na estante"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {genreRules.map((rule) => (
            <span
              key={`genre-${rule.value}`}
              className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800"
            >
              {rule.value}
            </span>
          ))}

          {statusRules.map((rule) => (
            <span
              key={`status-${rule.value}`}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800"
            >
              Estado: {getReadingStatusLabel(rule.value as ReadingStatus)}
            </span>
          ))}

          {shelf.rules.length > 1 ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {shelf.matchMode === "all" ? "Todas as regras" : "Qualquer regra"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button type="button" variant="secondary" onClick={onEdit}>
          Editar
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onDelete}
        >
          Excluir
        </Button>
      </div>
    </article>
  );
}