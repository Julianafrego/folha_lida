import { Input } from "@/components/atoms/Input";
import { READING_STATUS_OPTIONS } from "@/utils/book";
import type { ReadingStatus } from "@/types/book";
import { Select } from "../atoms/Select";

type StatusFilter = "todos" | ReadingStatus;

type BooksFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  createdAtOrder: "recentes" | "antigos";
  onCreatedAtOrderChange: (value: "recentes" | "antigos") => void;
  itemsPerPage: 6 | 12 | 24;
  onItemsPerPageChange: (value: 6 | 12 | 24) => void;
};

export function BooksFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  createdAtOrder,
  onCreatedAtOrderChange,
  itemsPerPage,
  onItemsPerPageChange,
}: BooksFiltersProps) {
  const selectClasses =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-violet-500";

  return (
    <section className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar por nome"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3">
        <Select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          className={selectClasses}
        >
          <option value="todos">Todos os status</option>
          {READING_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <select
          value={createdAtOrder}
          onChange={(event) =>
            onCreatedAtOrderChange(event.target.value as "recentes" | "antigos")
          }
          className={selectClasses}
        >
          <option value="recentes">Criação: mais recentes</option>
          <option value="antigos">Criação: mais antigos</option>
        </select>

        <Select
          value={itemsPerPage}
          onChange={(event) =>
            onItemsPerPageChange(Number(event.target.value) as 6 | 12 | 24)
          }
          className={selectClasses}
        >
          <option value={6}>6 por página</option>
          <option value={12}>12 por página</option>
          <option value={24}>24 por página</option>
        </Select>
      </div>
    </section>
  );
}
