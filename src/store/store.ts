import type { Types } from "@/modules/home";

export interface State {
  book: Types.IEntity.Book;
  books: Types.IEntity.Book[];
  similarBooks: Types.IEntity.Book[];
  favorites: Types.IEntity.Book[];
  loading: boolean;
  pageCount: number;
  error: string;
}
