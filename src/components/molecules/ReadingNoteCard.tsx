import { Button } from "@/components/atoms/Button";
import type { ReadingNote } from "@/types/reading-note";

type ReadingNoteCardProps = {
  note: ReadingNote;
  onEdit: (noteId: string) => void;
  onDelete: (noteId: string) => void;
};

export function ReadingNoteCard({
  note,
  onEdit,
  onDelete,
}: ReadingNoteCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-800">
            Página {note.page}
          </p>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Trecho
            </h3>
            <p className="mt-1 italic leading-relaxed text-zinc-700">
              {note.quote || "Sem trecho."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Comentário
            </h3>
            <p className="mt-1 leading-relaxed text-zinc-700">
              {note.comment || "Sem comentário."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onEdit(note.id)}
          >
            Editar
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete(note.id)}
          >
            Excluir
          </Button>
        </div>
      </div>
    </article>
  );
}