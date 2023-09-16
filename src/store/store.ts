import type { Types } from "@/modules/home";

export interface State {
  book: Types.IEntity.Book;
  books: Types.IEntity.Book[];
  similarBooks: Types.IEntity.Book[];
  loading: boolean;
}
