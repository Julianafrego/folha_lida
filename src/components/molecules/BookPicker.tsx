import { useState } from 'react'
import { Book } from '@/types/book'
import { Input } from '../atoms/Input'

type Props = {
  books: Book[]
  selected: string[]
  onChange: (ids: string[]) => void
}

export default function BookPicker({ books, selected, onChange }: Props) {
  const [search, setSearch] = useState('')

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(i => i !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div>
      <Input
        placeholder="Buscar livro..."
        value={search}
        onChange={e => setSearch(e.target.value)}

      />

      <div className="max-h-60 overflow-auto mt-2 ml-2 rounded p-2">
        {filtered.map(book => (
          <div key={book.id}>
            <label className="flex items-center gap-2 text-black/50">
              <input
                type="checkbox"
                checked={selected.includes(book.id)}
                onChange={() => toggle(book.id)}
              />
              {book.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}