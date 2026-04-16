"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { TextareaField } from "@/components/molecules/TextareaField";
import { useReadingNotesStore } from "@/store/reading-note.store";
import type { CreateReadingNotePayload } from "@/types/reading-note";

type ReadingNoteFormData = {
  page: string;
  quote: string;
  comment: string;
};

type ReadingNoteFormProps = {
  mode?: "create" | "edit";
  noteId?: string;
  bookId: string;
  initialData?: ReadingNoteFormData;
  onSuccess?: () => void;
};

type FormErrors = {
  page?: string;
  quote?: string;
  comment?: string;
};

const emptyFormData: ReadingNoteFormData = {
  page: "",
  quote: "",
  comment: "",
};

export function ReadingNoteForm({
  mode = "create",
  noteId,
  bookId,
  initialData,
  onSuccess,
}: ReadingNoteFormProps) {
  const createNote = useReadingNotesStore((state) => state.createNote);
  const updateNote = useReadingNotesStore((state) => state.updateNote);

  const [formData, setFormData] = useState<ReadingNoteFormData>(
    initialData ?? emptyFormData
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setFormData(initialData ?? emptyFormData);
  }, [initialData]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors: FormErrors = {};

    if (!formData.page || Number(formData.page) <= 0) {
      newErrors.page = "Informe uma página válida.";
    }

    if (!formData.quote.trim()) {
      newErrors.quote = "Informe o trecho.";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Informe o comentário.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildPayload(): CreateReadingNotePayload {
    return {
      bookId,
      page: Number(formData.page),
      quote: formData.quote.trim(),
      comment: formData.comment.trim(),
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    try {
      const payload = buildPayload();

      if (mode === "edit") {
        if (!noteId) {
          throw new Error("ID da nota não informado para edição.");
        }

        updateNote(noteId, payload);
      } else {
        createNote(payload);
        setFormData(emptyFormData);
      }

      setErrors({});
      onSuccess?.();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao salvar nota."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="page"
        name="page"
        label="Página"
        type="number"
        placeholder="Ex. 42"
        value={formData.page}
        onChange={handleChange}
        error={errors.page}
      />

      <TextareaField
        id="quote"
        name="quote"
        label="Trecho"
        rows={4}
        placeholder="Digite o trecho do livro..."
        value={formData.quote}
        onChange={handleChange}
        error={errors.quote}
      />

      <TextareaField
        id="comment"
        name="comment"
        label="Comentário"
        rows={5}
        placeholder="Escreva sua reflexão sobre esse trecho..."
        value={formData.comment}
        onChange={handleChange}
        error={errors.comment}
      />

      {formError ? (
        <p className="text-sm font-medium text-red-600">{formError}</p>
      ) : null}

      <footer className="flex items-center justify-end gap-4 border-t border-zinc-100 pt-6">
        <Button type="submit" variant="primary">
          {mode === "edit" ? "Salvar alterações" : "Salvar nota"}
        </Button>
      </footer>
    </form>
  );
}