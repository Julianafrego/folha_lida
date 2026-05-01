import { Label } from "@/components/atoms/Label"
import { READING_STATUS_OPTIONS } from "@/utils/book"
import type { ShelfFormStatus, ShelfMatchMode } from "@/types/shelf"
import { Input } from "../atoms/Input"
import { Select } from "@/components/atoms/Select";

type ShelfFormData = {
  name: string
  mode: 'manual' | 'rule'
  genres: string
  status: ShelfFormStatus
  matchMode: ShelfMatchMode
  bookIds: string[]
}

type FormErrors = {
  name?: string
  rules?: string
}

type Props = {
  formData: ShelfFormData
  setFormData: React.Dispatch<React.SetStateAction<ShelfFormData>>
  existingGenres: string[]
  errors: FormErrors
} 

export default function ShelfRuleSection({
  formData,
  setFormData,
  existingGenres,
  errors,
}: Props) {
  return (
    <section className="grid grid-cols-1 gap-6 rounded-2xl bg-zinc-50 p-6 md:grid-cols-2">

      {/* GENRES */}
      <div className="flex flex-col space-y-1">
        <Label>Gênero(s)</Label>
        <Input
          list="genres"
          value={formData.genres}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              genres: e.target.value,
            }))
          }
        />
        <datalist id="genres">
          {existingGenres.map((g) => (
            <option key={g} value={g} />
          ))}
        </datalist>
      </div>

      {/* STATUS */}
      <div className="flex flex-col space-y-1">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value as ShelfFormStatus, 
            }))
          }
        >
          <option value="">Nenhum</option>
          {READING_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>

      {/* MATCH MODE */}
      <div className="md:col-span-2">
        <Label>Como combinar as regras</Label>
        <Select
          value={formData.matchMode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              matchMode: e.target.value as ShelfMatchMode,
            }))
          }        
        >
          <option value="all">Cumprir todas as regras</option>
          <option value="any">Cumprir qualquer regra</option>
        </Select>
        <Label className="ml-2 mt-2">
          Ex.: gênero Drama + estado Finalizado com “todas” mostra apenas dramas finalizados. Com “qualquer”, mostra dramas ou livros finalizados
        </Label>
      </div>

      {errors.rules && (
        <p className="text-red-600">{errors.rules}</p>
      )}
    </section>
  )
}