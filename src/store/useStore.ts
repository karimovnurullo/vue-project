import { defineStore } from "pinia";
import type { State } from "./store";
import { HomeService, Mappers, Types } from "@/modules/home";
import axios from "axios";

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
    favorites: [],
    loading: true,
    pageCount: 1,
    error: "",
  }),
  actions: {
    async getBooks(search = "programming") {
      this.loading = true;
      try {
        const { data } = await HomeService.GetBooks(search || "");
        this.books = data.items.map((book: Types.IEntity.Book) =>
          Mappers.Book(book)
        );
        this.loading = false;
      } catch (error: any) {
        console.log(error?.message);
        this.error = "Books fetching error";
      }
    },
    async getBook(bookId: string | string[]) {
      this.loading = true;
      try {
        const { data } = await HomeService.GetBook(bookId);
        this.book = Mappers.Book(data);
        this.loading = false;
      } catch (error: any) {
        console.log(error?.message);
        this.error = "Book fetching error";
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
        this.error = error?.message;
        this.error = "Similar books fetching error";
      }
    },

    async getPagination(search = "programming") {
      this.loading = true;
      try {
        const { data } = await HomeService.GetPagination(
          search,
          this.pageCount
        );

        this.books = data.items.map((book: Types.IEntity.Book) =>
          Mappers.Book(book)
        );

        this.loading = false;
      } catch (error: any) {
        console.log(error?.message);
        this.error = "Books fetching error";
      }
    },
    addFavorite(bookId: string) {
      const oldBooks = [...this.books];
      const bookIdx = oldBooks.findIndex((book) => book.id === bookId);
      this.favorites.push(oldBooks[bookIdx]);
    },
    removeFavorite(bookId: string) {
      const oldFavorites = [...this.favorites];
      const bookIdx = oldFavorites.findIndex((book) => book.id === bookId);
      this.favorites = oldFavorites.splice(bookIdx, 1);
    },
    findFavorite(bookId: string) {
      const oldFavorites = [...this.favorites];
      const bookIdx = oldFavorites.findIndex((book) => book.id === bookId);
      return oldFavorites[bookIdx];
    },
  },
});
export default useStore;
