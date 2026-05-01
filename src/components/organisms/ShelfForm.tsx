"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { useShelvesStore } from "@/store/shelf.store";
import type { Book } from "@/types/book";
import type { CreateShelfPayload, ShelfFormStatus, ShelfMatchMode } from "@/types/shelf";

import ShelfModeSelector from "@/components/molecules/ShelfModeSelector"
import BookPicker from "@/components/molecules/BookPicker"
import ShelfRuleSection from "@/components/molecules/ShelfRuleSection";

type ShelfFormData = {
  name: string
  mode: 'manual' | 'rule'   
  
  // regra
  genres: string
  status: ShelfFormStatus
  matchMode: ShelfMatchMode

  // manual
  bookIds: string[]        
}

type ShelfFormProps = {
  mode?: "create" | "edit";
  shelfId?: string;
  initialData?: ShelfFormData;
  existingGenres?: string[];
  onSuccess?: () => void;
  books: Book[];
};

type FormErrors = {
  name?: string;
  rules?: string;
};

const emptyFormData: ShelfFormData = {
  name: '',
  mode: 'rule',
  genres: '',
  status: '',
  matchMode: 'all',
  bookIds: []
}

export function ShelfForm({
  mode = "create",
  shelfId,
  initialData,
  existingGenres = [],
  onSuccess,
  books, 
}: ShelfFormProps){
  const createShelf = useShelvesStore((state) => state.createShelf);
  const updateShelf = useShelvesStore((state) => state.updateShelf);

  const [formData, setFormData] = useState<ShelfFormData>(
    initialData ?? emptyFormData
  );
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function normalizeInitialData(data: ShelfFormData): ShelfFormData {
    return {
      ...data,
      mode: data.mode === 'manual' ? 'manual' : 'rule',
    }
  }

  useEffect(() => {
    if (initialData) {
      setFormData(normalizeInitialData(initialData))
    } else {
      setFormData(emptyFormData)
    }
  }, [initialData])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Informe o nome da estante.'
    }

    if (formData.mode === 'rule') {
      if (!formData.genres.trim() && !formData.status) {
        newErrors.rules = 'Escolha pelo menos um gênero ou estado.'
      }
    }

    if (formData.mode === 'manual') {
      if (formData.bookIds.length === 0) {
        newErrors.rules = 'Selecione pelo menos um livro.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  function buildPayload(): CreateShelfPayload {
    if (formData.mode === 'manual') {
      return {
        name: formData.name.trim(),
        mode: 'manual',
        bookIds: formData.bookIds,
        rules: [],
        matchMode: 'all',
      }
    }

    const genreRules = formData.genres
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean)
      .map((g) => ({ field: 'genre' as const, value: g }))

    const statusRules = formData.status
      ? [{ field: 'status' as const, value: formData.status }]
      : []

    return {
      name: formData.name.trim(),
      mode: 'rule',
      matchMode: formData.matchMode,
      rules: [...genreRules, ...statusRules],
      bookIds: [],
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    try {
      const payload = buildPayload();

      if (mode === "edit") {
        if (!shelfId) {
          throw new Error("ID da estante não informado para edição.");
        }

        updateShelf(shelfId, payload);
      } else {
        createShelf(payload);
        setFormData(emptyFormData);
      }

      setErrors({});
      onSuccess?.();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao salvar estante."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        name="name"
        label="Nome da estante"
        placeholder="Ex. Drama, Livros dropados, Fantasia finalizada..."
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />


      <ShelfModeSelector
        value={formData.mode}
        onChange={(mode) =>
          setFormData((prev) => ({
            ...prev,
            mode,
            ...(mode === 'manual'
              ? { genres: '', status: '' }
              : { bookIds: [] }),
          }))
        }
      />

      {formData.mode === 'rule' && (
        <ShelfRuleSection
          formData={formData}
          setFormData={setFormData}
          existingGenres={existingGenres}
          errors={errors}
        />
      )}

      {formData.mode === 'manual' && (
        <BookPicker
          books={books}
          selected={formData.bookIds}
          onChange={(ids) =>
            setFormData((prev) => ({ ...prev, bookIds: ids }))
          }
        />
      )}

      {formError ? (
        <p className="text-sm font-medium text-red-600">{formError}</p>
      ) : null}

      <footer className="flex justify-end border-t border-zinc-100 pt-6">
        <Button type="submit" variant="primary">
          {mode === "edit" ? "Salvar alterações" : "Criar estante"}
        </Button>
      </footer>
    </form>
  );
}
