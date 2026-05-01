"use client";

import { useEffect, useMemo, useState } from "react";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { ShelfCard } from "@/components/molecules/ShelfCard";
import { BookCard } from "@/components/molecules/BookCard";
import { ShelfForm } from "@/components/organisms/ShelfForm";
import { useBooksStore } from "@/store/book.store";
import { useShelvesStore } from "@/store/shelf.store";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getBooksByShelf, getExistingGenres } from "@/utils/shelf";
import type { Shelf, ShelfFormStatus } from "@/types/shelf";

export default function ShelvesPage() {
  const loadBooks = useBooksStore((state) => state.loadBooks);
  const books = useBooksStore((state) => state.books);

  const loadShelves = useShelvesStore((state) => state.loadShelves);
  const shelves = useShelvesStore((state) => state.shelves);
  const deleteShelf = useShelvesStore((state) => state.deleteShelf);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingShelfId, setEditingShelfId] = useState<string | null>(null);
  const [selectedShelfId, setSelectedShelfId] = useState<string | null>(null);

  const { isAuthenticated } = useRequireAuth();

  useEffect(() => {
    loadBooks();
    loadShelves();
  }, [loadBooks, loadShelves]);

  const existingGenres = useMemo(() => getExistingGenres(books), [books]);

  const editingShelf = editingShelfId
    ? shelves.find((shelf) => shelf.id === editingShelfId) ?? null
    : null;

  const selectedShelf = selectedShelfId
    ? shelves.find((shelf) => shelf.id === selectedShelfId) ?? null
    : null;

  const selectedShelfBooks = selectedShelf
    ? getBooksByShelf(books, selectedShelf)
    : [];

  function handleDeleteShelf(shelf: Shelf) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a estante "${shelf.name}"?`
    );

    if (!confirmed) return;

    deleteShelf(shelf.id);

    if (selectedShelfId === shelf.id) {
      setSelectedShelfId(null);
    }

    if (editingShelfId === shelf.id) {
      setEditingShelfId(null);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <AppTemplate>
        <div className="space-y-8">
          <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Estantes
              </h1>

              <p className="mt-2 max-w-2xl text-zinc-600">
                Crie estantes automáticas por gênero e/ou estado de leitura.
                Os livros entram nelas sozinhos conforme os dados cadastrados.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setIsCreateOpen(true)}
            >
              Nova estante
            </Button>
          </section>

          {shelves.length === 0 ? (
            <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
              <h2 className="text-lg font-semibold text-zinc-900">
                Nenhuma estante criada ainda
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Comece criando uma estante por gênero, por exemplo “Drama”, ou
                por estado, como “Dropados”.
              </p>
            </section>
          ) : (
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {shelves.map((shelf) => {
                const shelfBooks = getBooksByShelf(books, shelf);

                return (
                  <ShelfCard
                    key={shelf.id}
                    shelf={shelf}
                    booksCount={shelfBooks.length}
                    onOpen={() => setSelectedShelfId(shelf.id)}
                    onEdit={() => {
                      setSelectedShelfId(null);
                      setEditingShelfId(shelf.id);
                    }}
                    onDelete={() => handleDeleteShelf(shelf)}
                  />
                );
              })}
            </section>
          )}
        </div>
      </AppTemplate>

      {isCreateOpen ? (
        <Modal
          title="Nova estante"
          description="Defina as regras de preenchimento automático."
          onClose={() => setIsCreateOpen(false)}
          maxWidthClass="max-w-3xl"
        >
          <ShelfForm
            books={books}
            existingGenres={existingGenres}
            onSuccess={() => {
              loadShelves();
              setIsCreateOpen(false);
            }}
          />
        </Modal>
      ) : null}

      {editingShelf ? (
        <Modal
          title="Editar estante"
          description="Atualize as regras de preenchimento automático."
          onClose={() => setEditingShelfId(null)}
          maxWidthClass="max-w-3xl"
        >
        <ShelfForm
          books={books} 
          mode="edit"
          shelfId={editingShelf.id}
          existingGenres={existingGenres}
          initialData={{
            name: editingShelf.name,
            mode: editingShelf.mode === "manual" ? "manual" : "rule", 

            genres: editingShelf.rules
              .filter((r) => r.field === "genre")
              .map((r) => r.value)
              .join(", "),

            status:
              (editingShelf.rules.find((r) => r.field === "status")?.value ?? "") as ShelfFormStatus,

            matchMode: editingShelf.matchMode,

            bookIds: editingShelf.bookIds ?? [],
          }}
          onSuccess={() => {
            loadShelves();
            setEditingShelfId(null);
          }}
        />
        </Modal>
      ) : null}

      {selectedShelf ? (
        <Modal
          title={selectedShelf.name}
          description={`${selectedShelfBooks.length} ${
            selectedShelfBooks.length === 1
              ? "livro encontrado"
              : "livros encontrados"
          } nesta estante.`}
          onClose={() => setSelectedShelfId(null)}
          maxWidthClass="max-w-5xl"
        >
          {selectedShelfBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
              <h2 className="text-lg font-semibold text-zinc-900">
                Nenhum livro nesta estante
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Quando algum livro corresponder às regras dessa estante, ele
                aparecerá aqui automaticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {selectedShelfBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
}