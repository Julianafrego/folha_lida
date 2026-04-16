"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { BookForm } from "@/components/organisms/BookForm";
import { BookDetailsSection } from "@/components/organisms/BookDetailsSection";
import { ReadingNotesSection } from "@/components/organisms/ReadingNotesSection";
import { ReadingNoteForm } from "@/components/organisms/ReadingNoteForm";
import { Modal } from "@/components/molecules/Modal";
import { useBooksStore } from "@/store/book.store";
import { useReadingNotesStore } from "@/store/reading-note.store";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const loadBooks = useBooksStore((state) => state.loadBooks);
  const books = useBooksStore((state) => state.books);
  const deleteBook = useBooksStore((state) => state.deleteBook);

  const loadNotesByBookId = useReadingNotesStore(
    (state) => state.loadNotesByBookId
  );
  const notes = useReadingNotesStore((state) => state.notes);
  const deleteNote = useReadingNotesStore((state) => state.deleteNote);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const { isAuthenticated } = useRequireAuth();

  const bookId = String(params.id);

  useEffect(() => {
    loadBooks();
    loadNotesByBookId(bookId);
  }, [loadBooks, loadNotesByBookId, bookId]);

  const book = books.find((item) => item.id === bookId);

  const editingNote = editingNoteId
    ? notes.find((note) => note.id === editingNoteId) ?? null
    : null;

  useEffect(() => {
    if (books.length > 0 && !book) {
      router.push("/crud");
    }
  }, [books, book, router]);

  if (!book) {
    return null;
  }

  function handleDeleteBook() {
    if (!book) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este livro?"
    );

    if (!confirmed) return;

    deleteBook(book.id);
    router.push("/crud");
  }

  function handleAddNote() {
    setIsCreateNoteOpen(true);
  }

  function handleEditNote(noteId: string) {
    setEditingNoteId(noteId);
  }

  function handleDeleteNote(noteId: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta nota?"
    );

    if (!confirmed) return;

    deleteNote(noteId);
    if (book) {
      loadNotesByBookId(book.id);
    }
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <AppTemplate>
        <div className="grid min-h-[70vh] grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-[1.1fr_1.4fr]">
          <BookDetailsSection
            book={book}
            onEdit={() => setIsEditOpen(true)}
            onDelete={handleDeleteBook}
          />

          <ReadingNotesSection
            notes={notes}
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </AppTemplate>

      {isEditOpen ? (
        <Modal
          title="Editar livro"
          description="Atualize as informações do livro."
          onClose={() => setIsEditOpen(false)}
          maxWidthClass="max-w-5xl"
        >
          <BookForm
            mode="edit"
            bookId={book.id}
            initialData={{
              title: book.title,
              genres: book.genres.join(", "),
              totalPages: String(book.totalPages),
              startedAt: book.startedAt,
              finishedAt: book.finishedAt,
              rating: String(book.rating),
              description: book.description,
            }}
            onSuccess={() => {
              loadBooks();
              setIsEditOpen(false);
            }}
          />
        </Modal>
      ) : null}

      {editingNote ? (
        <Modal
          title="Editar nota de leitura"
          description="Atualize o trecho e seu comentário."
          onClose={() => setEditingNoteId(null)}
          maxWidthClass="max-w-3xl"
        >
          <ReadingNoteForm
            mode="edit"
            noteId={editingNote.id}
            bookId={book.id}
            initialData={{
              page: String(editingNote.page),
              quote: editingNote.quote,
              comment: editingNote.comment,
            }}
            onSuccess={() => {
              loadNotesByBookId(book.id);
              setEditingNoteId(null);
            }}
          />
        </Modal>
      ) : null}

      {isCreateNoteOpen ? (
        <Modal
          title="Nova nota de leitura"
          description="Registre um trecho e sua reflexão sobre ela."
          onClose={() => setIsCreateNoteOpen(false)}
          maxWidthClass="max-w-3xl"
        >
          <ReadingNoteForm
            mode="create"
            bookId={book.id}
            onSuccess={() => {
              loadNotesByBookId(book.id);
              setIsCreateNoteOpen(false);
            }}
          />
        </Modal>
      ) : null}
    </>
  );
}