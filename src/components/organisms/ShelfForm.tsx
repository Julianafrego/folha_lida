"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { FormField } from "@/components/molecules/FormField";
import { useShelvesStore } from "@/store/shelf.store";
import { READING_STATUS_OPTIONS } from "@/utils/book";
import type { CreateShelfPayload, ShelfFormStatus, ShelfMatchMode } from "@/types/shelf";

type ShelfFormData = {
  name: string;
  genres: string;
  status: ShelfFormStatus;
  matchMode: ShelfMatchMode;
};

type ShelfFormProps = {
  mode?: "create" | "edit";
  shelfId?: string;
  initialData?: ShelfFormData;
  existingGenres?: string[];
  onSuccess?: () => void;
};

type FormErrors = {
  name?: string;
  rules?: string;
};

const emptyFormData: ShelfFormData = {
  name: "",
  genres: "",
  status: "",
  matchMode: "all",
};

const selectClasses =
  "w-full rounded-xl bg-zinc-100 px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 focus:bg-white focus:ring-violet-200";

export function ShelfForm({
  mode = "create",
  shelfId,
  initialData,
  existingGenres = [],
  onSuccess,
}: ShelfFormProps) {
  const createShelf = useShelvesStore((state) => state.createShelf);
  const updateShelf = useShelvesStore((state) => state.updateShelf);

  const [formData, setFormData] = useState<ShelfFormData>(
    initialData ?? emptyFormData
  );
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(initialData ?? emptyFormData);
  }, [initialData]);

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
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Informe o nome da estante.";
    }

    if (!formData.genres.trim() && !formData.status) {
      newErrors.rules = "Escolha pelo menos um gênero ou um estado.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildPayload(): CreateShelfPayload {
    const genreRules = formData.genres
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean)
      .map((genre) => ({ field: "genre" as const, value: genre }));

    const statusRules = formData.status
      ? [{ field: "status" as const, value: formData.status }]
      : [];

    return {
      name: formData.name.trim(),
      matchMode: formData.matchMode,
      rules: [...genreRules, ...statusRules],
    };
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

      <section className="grid grid-cols-1 gap-6 rounded-2xl bg-zinc-50 p-6 md:grid-cols-2">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="genres">Gênero(s)</Label>
          <input
            id="genres"
            name="genres"
            list="shelf-genres"
            placeholder="Ex. Drama, Romance"
            value={formData.genres}
            onChange={handleChange}
            className="w-full rounded-xl bg-white px-4 py-3 text-zinc-900 outline-none ring-1 ring-transparent transition-all duration-200 placeholder:text-zinc-400 focus:ring-violet-200"
          />
          <datalist id="shelf-genres">
            {existingGenres.map((genre) => (
              <option key={genre} value={genre} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="status">Estado</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`${selectClasses} bg-white`}
          >
            <option value="">Nenhum estado específico</option>
            {READING_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1 md:col-span-2">
          <Label htmlFor="matchMode">Como combinar as regras (Gênero e Estado)</Label>
          <select
            id="matchMode"
            name="matchMode"
            value={formData.matchMode}
            onChange={handleChange}
            className={`${selectClasses} bg-white`}
          >
            <option value="all">Cumprir todas as regras</option>
            <option value="any">Cumprir qualquer regra</option>
          </select>
          <p className="text-xs text-zinc-500">
            Ex.: gênero Drama + estado Finalizado com “todas” mostra apenas dramas finalizados. Com “qualquer”, mostra dramas ou livros finalizados.
          </p>
        </div>

        {errors.rules ? (
          <p role="alert" className="text-sm font-medium text-red-600 md:col-span-2">
            {errors.rules}
          </p>
        ) : null}
      </section>

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
