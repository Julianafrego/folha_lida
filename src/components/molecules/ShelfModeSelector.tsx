type Props = {
  value: 'manual' | 'rule'
  onChange: (v: 'manual' | 'rule') => void
}

export default function ShelfModeSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-4">
      <label className="text-black/80 gap-1 flex items-center">
        <input
          type="radio"
          checked={value === 'manual'}
          onChange={() => onChange('manual')}
        />
        Manual
      </label>

      <label className="text-black/80 gap-1 flex items-center">
        <input
          type="radio"
          checked={value === 'rule'}
          onChange={() => onChange('rule')}
        />
        Por regra
      </label>
    </div>
  )
}