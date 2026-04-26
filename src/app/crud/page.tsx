"use client";

import { useEffect, useMemo, useState } from "react";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { Button } from "@/components/atoms/Button";
import { BookForm } from "@/components/organisms/BookForm";
import { BookList } from "@/components/organisms/BookList";
import { BooksFilters } from "@/components/organisms/BookFIlters";
import { Modal } from "@/components/molecules/Modal";
import { useBooksStore } from "@/store/book.store";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { ReadingStatus } from "@/types/book";

export default function CrudPage() {
  const loadBooks = useBooksStore((state) => state.loadBooks);
  const books = useBooksStore((state) => state.books);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | ReadingStatus>("todos");
  const [createdAtOrder, setCreatedAtOrder] = useState<"recentes" | "antigos">(
    "recentes"
  );
  const [itemsPerPage, setItemsPerPage] = useState<6 | 12 | 24>(6);
  const [currentPage, setCurrentPage] = useState(1);

  const { isAuthenticated } = useRequireAuth();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesStatus =
          statusFilter === "todos" ? true : book.status === statusFilter;

        const matchesSearch = book.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return createdAtOrder === "recentes" ? dateB - dateA : dateA - dateB;
      });
  }, [books, searchTerm, statusFilter, createdAtOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / itemsPerPage));

  const paginatedBooks = useMemo(() => {
    return filteredBooks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredBooks, currentPage, itemsPerPage]);

  function resetToFirstPage() {
    setCurrentPage(1);
  }

  
  if (!isAuthenticated) {
      return null;
  }

  return (
    <>
      <AppTemplate>
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Biblioteca</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Registre sua experiência de leitura.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setIsFormOpen(true)}
            >
              Cadastrar livro
            </Button>
          </div>

          <BooksFilters
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              resetToFirstPage();
            }}
            statusFilter={statusFilter}
            onStatusChange={(value) => {
              setStatusFilter(value);
              resetToFirstPage();
            }}
            createdAtOrder={createdAtOrder}
            onCreatedAtOrderChange={(value) => {
              setCreatedAtOrder(value);
              resetToFirstPage();
            }}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              resetToFirstPage();
            }}
          />

          <div>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900">
              Lista de livros
            </h2>
            <BookList books={paginatedBooks} />
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>

              <span className="text-sm text-zinc-600">
                Página {currentPage} de {totalPages}
              </span>

              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          ) : null}
        </div>
      </AppTemplate>

      {isFormOpen ? (
        <Modal
          title="Novo registro de livro"
          description="Preencha as informações da sua leitura."
          onClose={() => setIsFormOpen(false)}
          maxWidthClass="max-w-5xl"
        >
          <BookForm onSuccess={() => setIsFormOpen(false)} />
        </Modal>
      ) : null}
    </>
  );
}