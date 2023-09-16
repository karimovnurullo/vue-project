import { defineStore } from "pinia";
import type { State } from "./store";
import { HomeService, Mappers, Types } from "@/modules/home";

const useStore = defineStore("storeId", {
  state: (): State => ({
    book: {
      id: "",
      title: "",
      description: "",
      pageCount: 0,
      publishedDate: "",
      publisher: "",
      language: "",
      previewLink: "",
      image: "",
      authors: [],
      downloadPdf: "",
      accessDownloadPdf: false,
      selfLink: "",
    },
    books: [],
    similarBooks: [],
    loading: true,
  }),
  actions: {
    async getBooks(search = "programming") {
      try {
        const { data } = await HomeService.GetBooks(search || "");
        this.books = data.items.map((book: Types.IEntity.Book) =>
          Mappers.Book(book)
        );
        this.loading = false;
      } catch (error: any) {
        console.log(error?.message);
      }
    },
    async getBook(bookId: string | string[]) {
      if (this.books.length > 0) {
        const [filteredBook] = this.books.filter((book) => book.id === bookId);
        this.book = filteredBook;
      } else {
        try {
          const { data } = await HomeService.GetBook(bookId);
          this.book = Mappers.Book(data);
          this.loading = false;
          // this.getBooks(localStorage.getItem("search") || "programming");
        } catch (error: any) {
          console.log(error?.message);
        }
      }
    },
    async getSimilarBook(search: string) {
      try {
        const { data } = await HomeService.GetSimilarBooks(search);
        this.similarBooks = data.items.map((book: Types.IEntity.Book) =>
          Mappers.Book(book)
        );
      } catch (error: any) {
        console.log(error?.message);
      }
    },
  },
});
export default useStore;
