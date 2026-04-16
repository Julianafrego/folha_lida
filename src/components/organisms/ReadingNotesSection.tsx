import { Button } from "@/components/atoms/Button";
import { ReadingNoteCard } from "@/components/molecules/ReadingNoteCard";
import type { ReadingNote } from "@/types/reading-note";

type ReadingNotesSectionProps = {
  notes: ReadingNote[];
  onAddNote: () => void;
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
};

export function ReadingNotesSection({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
}: ReadingNotesSectionProps) {
  return (
    <section className="bg-white p-8 lg:p-10">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-violet-900">
              Notas de leitura
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Registre citações, comentários e reflexões sobre o livro.
            </p>
          </div>

          <Button type="button" variant="primary" onClick={onAddNote}>
            Adicionar nota
          </Button>
        </div>

        {notes.length === 0 ? (
          <div className="rounded-2xl bg-zinc-50 p-6 text-center text-zinc-500">
            Nenhuma nota cadastrada ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <ReadingNoteCard
                key={note.id}
                note={note}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}