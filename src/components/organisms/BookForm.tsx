"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { FormField } from "@/components/molecules/FormField";
import { TextareaField } from "@/components/molecules/TextareaField";
import { RatingField } from "@/components/molecules/RatingFIeld";
import { useBooksStore } from "@/store/book.store";
import { READING_STATUS_OPTIONS } from "@/utils/book";
import type { CreateBookPayload, Rating, ReadingStatus } from "@/types/book";

type BookFormData = {
  title: string;
  genres: string;
  totalPages: string;
  startedAt: string;
  finishedAt: string;
  rating: string;
  description: string;
  status: ReadingStatus;
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
  status?: string;
  finishedAt?: string;
};

const emptyFormData: BookFormData = {
  title: "",
  genres: "",
  totalPages: "",
  startedAt: "",
  finishedAt: "",
  rating: "1",
  description: "",
  status: "não_iniciado",
};

const selectClasses =
  "w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 focus:bg-white focus:ring-violet-200";

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    if (!formData.status) {
      newErrors.status = "Informe o estado da leitura.";
    }

    if (formData.status === "não_iniciado" && (formData.startedAt || formData.finishedAt)) {
      newErrors.status = "Livro não iniciado não deve ter data de leitura.";
    }

    if (formData.status === "lendo" && formData.finishedAt) {
      newErrors.status = "Livro em leitura não deve ter data final.";
    }

    if (formData.startedAt && formData.finishedAt) {
      const startedDate = new Date(formData.startedAt).getTime();
      const finishedDate = new Date(formData.finishedAt).getTime();

      if (finishedDate < startedDate) {
        newErrors.finishedAt = "A data final não pode ser anterior à data inicial.";
      }
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
      status: formData.status,
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

        <section className="grid grid-cols-1 gap-6 rounded-2xl bg-zinc-50 p-6 md:grid-cols-3">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="status">Estado da leitura</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${selectClasses} bg-white ${
                errors.status ? "ring-1 ring-red-300 focus:ring-red-300" : ""
              }`}
            >
              {READING_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status ? (
              <p role="alert" className="mt-1 text-sm font-medium text-red-600">
                {errors.status}
              </p>
            ) : null}
          </div>

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
            error={errors.finishedAt}
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
