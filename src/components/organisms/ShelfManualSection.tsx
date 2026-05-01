import { Book } from '@/types/book'
import BookPicker from '@/components/molecules/BookPicker'
import { Label } from '@/components/atoms/Label'

type Props = {
  books: Book[]
  selected: string[]
  onChange: (ids: string[]) => void
}

export default function ShelfManualSection({ books, selected, onChange }: Props) {
  return (
    <section className="rounded-2xl bg-zinc-50 p-6">
      <Label>Selecionar livros</Label>

      <BookPicker
        books={books}
        selected={selected}
        onChange={onChange}
      />
    </section>
  )
}