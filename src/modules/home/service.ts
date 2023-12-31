import axios from "axios";
import type { Api } from "./types";
// const API_KEY = "AIzaSyCK7pxRUj7--NN8XgKdO0vi0B8YZZ1VAEw";
// const API_KEY = "AIzaSyDKgz9YsM5dtASkMHIwSagLJD3ixK7qwuw";
const API_KEY = "AIzaSyBoyt1h7Rb0VLFmkFMdIO1EqLnE3OUaTtg";
// const API_KEY = "AIzaSyBAZjkwMnxWAguj6RJasKjYatW1Jy03WJ0";
// const API_KEY = "AIzaSyBeQ6_NM_ksHwEVbe15suG_d7TUEg8bmps";
// const API_KEY = "AIzaSyADn6svODymac5b_K-OUDYh2QKkWiyWV80";

export const GetBook = (bookId: Api.Book.Single.Request) =>
  axios.get<Api.Book.Single.Respons>(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  );
export const GetSimilarBooks = (bookTitle: Api.Book.Similar.Request) =>
  axios.get<Api.Book.Similar.Respons>(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&maxResults=40&startIndex=1`
  );

export const GetBooks = ({ search, startIdx }: Api.Book.List.Request) =>
  axios.get<Api.Book.List.Respons>(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20&startIndex=${startIdx}`
  );
// export const GetBook = (bookId: Api.Book.Single.Request) =>
//   axios.get<Api.Book.Single.Respons>(
//     `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
//   );
// export const GetSimilarBooks = (bookTitle: Api.Book.Similar.Request) =>
//   axios.get<Api.Book.Similar.Respons>(
//     `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&maxResults=40&startIndex=1&key=${API_KEY}`
//   );

// export const GetBooks = ({ search, startIdx }: Api.Book.List.Request) =>
//   axios.get<Api.Book.List.Respons>(
//     `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20&startIndex=${startIdx}&key=${API_KEY}`
//   );
