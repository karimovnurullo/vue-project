import { defineStore } from "pinia";
import type { State } from "./store";
import { HomeService, Mappers, Types } from "@/modules/home";
import axios from "axios";

const FAVORITES_KEY = "favorites";

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
    favorites: JSON.parse(localStorage.getItem(FAVORITES_KEY)!) || [],
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
      const bookToAdd = oldBooks.find((book) => book.id === bookId);

      if (bookToAdd) {
        this.favorites.push(bookToAdd);
        this.updateLocalStorage();
      }
    },

    removeFavorite(bookId: string) {
      const bookIdx = this.favorites.findIndex((book) => book.id === bookId);

      if (bookIdx !== -1) {
        this.favorites.splice(bookIdx, 1);
        this.updateLocalStorage();
      }
    },

    updateLocalStorage() {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites));
    },

    findFavorite(bookId: string) {
      const oldFavorites = [...this.favorites];
      const bookIdx = oldFavorites.findIndex((book) => book.id === bookId);
      return oldFavorites[bookIdx];
    },
  },
});
export default useStore;
