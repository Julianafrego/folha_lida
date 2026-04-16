"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { TextareaField } from "@/components/molecules/TextareaField";
import { RatingField } from "@/components/molecules/RatingFIeld";
import { useBooksStore } from "@/store/book.store";
import type { CreateBookPayload, Rating } from "@/types/book";

type BookFormData = {
  title: string;
  genres: string;
  totalPages: string;
  startedAt: string;
  finishedAt: string;
  rating: string;
  description: string;
};

type BookFormProps = {
  mode?: "create" | "edit";
  bookId?: string;
  initialData?: BookFormData;
  onSuccess?: () => void;
};

type FormErrors = {
  title?: string;
  genres?: string;
  totalPages?: string;
  rating?: string;
};

const emptyFormData: BookFormData = {
  title: "",
  genres: "",
  totalPages: "",
  startedAt: "",
  finishedAt: "",
  rating: "1",
  description: "",
};

export function BookForm({
  mode = "create",
  bookId,
  initialData,
  onSuccess,
}: BookFormProps) {
  const createBook = useBooksStore((state) => state.createBook);
  const updateBook = useBooksStore((state) => state.updateBook);

  const [formData, setFormData] = useState<BookFormData>(
    initialData ?? emptyFormData
  );
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

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

    if (!formData.title.trim()) {
      newErrors.title = "Informe o título do livro.";
    }

    if (!formData.genres.trim()) {
      newErrors.genres = "Informe pelo menos um gênero.";
    }

    if (!formData.totalPages || Number(formData.totalPages) <= 0) {
      newErrors.totalPages = "Informe um número de páginas válido.";
    }

    const ratingNumber = Number(formData.rating);
    if (ratingNumber < 1 || ratingNumber > 5) {
      newErrors.rating = "A nota deve estar entre 1 e 5.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildPayload(): CreateBookPayload {
    return {
      title: formData.title.trim(),
      genres: formData.genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
      totalPages: Number(formData.totalPages),
      startedAt: formData.startedAt,
      finishedAt: formData.finishedAt,
      rating: Number(formData.rating) as Rating,
      description: formData.description.trim(),
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    try {
      const payload = buildPayload();

      if (mode === "edit") {
        if (!bookId) {
          throw new Error("ID do livro não informado para edição.");
        }

        updateBook(bookId, payload);
      } else {
        createBook(payload);
        setFormData(emptyFormData);
      }

      setErrors({});
      onSuccess?.();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao salvar livro."
      );
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-6">
          <FormField
            id="title"
            name="title"
            label="Título"
            placeholder="Ex. Jogos Vorazes"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              id="genres"
              name="genres"
              label="Gêneros"
              placeholder="Ex. Suspense, Distopia..."
              value={formData.genres}
              onChange={handleChange}
              error={errors.genres}
            />

            <FormField
              id="totalPages"
              name="totalPages"
              label="Número de páginas"
              type="number"
              placeholder="Ex. 450"
              value={formData.totalPages}
              onChange={handleChange}
              error={errors.totalPages}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 rounded-2xl bg-zinc-50 p-6 md:grid-cols-2">
          <FormField
            id="startedAt"
            name="startedAt"
            label="Início da leitura"
            type="date"
            value={formData.startedAt}
            onChange={handleChange}
            className="bg-white"
          />

          <FormField
            id="finishedAt"
            name="finishedAt"
            label="Fim da leitura"
            type="date"
            value={formData.finishedAt}
            onChange={handleChange}
            className="bg-white"
          />
        </section>

        <section className="space-y-6">
          <RatingField
            label="Nota (1 a 5)"
            value={formData.rating}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                rating: value,
              }))
            }
            error={errors.rating}
          />

          <TextareaField
            id="description"
            name="description"
            label="Descrição"
            rows={5}
            placeholder="Sinopse, opinião geral ou observações sobre o livro..."
            value={formData.description}
            onChange={handleChange}
          />
        </section>

        {formError ? (
          <p className="text-sm font-medium text-red-600">{formError}</p>
        ) : null}

        <footer className="flex items-center justify-end gap-4 border-t border-zinc-100 pt-6">
          <Button type="submit" variant="primary">
            {mode === "edit" ? "Salvar alterações" : "Salvar"}
          </Button>
        </footer>
      </form>
    </div>
  );
}