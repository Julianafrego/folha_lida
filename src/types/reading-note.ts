export type ReadingNote = {
  id: string;
  bookId: string;
  page: number;
  quote: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateReadingNotePayload = Omit<
  ReadingNote,
  "id" | "createdAt" | "updatedAt"
>;