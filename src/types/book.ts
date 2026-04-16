export type ReadingStatus = "não_iniciado" | "lendo" | "finalizado";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Book = {
  id: string;
  title: string;
  genres: string[];
  totalPages: number;
  startedAt: string;
  finishedAt: string;
  rating: Rating;
  description: string;
  status: ReadingStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateBookPayload = Omit<
  Book,
  "id" | "createdAt" | "updatedAt" | "status"
>;