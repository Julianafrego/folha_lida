import { ShelfRule } from '@/types/shelf'
import type { ReadingStatus } from '@/types/book'
import { READING_STATUS_OPTIONS } from '@/utils/book'
import { Select } from '../atoms/Select'

type Props = {
  value: ShelfRule
  onChange: (rule: ShelfRule) => void
}

export default function ShelfRuleBuilder({ value, onChange }: Props) {
  const handleFieldChange = (field: ShelfRule['field']) => {
    if (field === 'status') {
      onChange({ field: 'status', value: 'lendo' }) 
    } else {
      onChange({ field: 'genre', value: '' })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      
      {/* FIELD */}
      <Select
        value={value.field}
        onChange={(e) =>
          handleFieldChange(e.target.value as ShelfRule['field'])
        }
      >
        <option value="status">Status</option>
        <option value="genre">Gênero</option>
      </Select>

      {/* VALUE */}
      {value.field === 'status' && (
        <select
          value={value.value}
          onChange={(e) =>
            onChange({
              field: 'status',
              value: e.target.value as ReadingStatus,
            })
          }
        >
          {READING_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {value.field === 'genre' && (
        <input
          value={value.value}
          onChange={(e) =>
            onChange({
              field: 'genre',
              value: e.target.value,
            })
          }
        />
      )}
    </div>
  )
}