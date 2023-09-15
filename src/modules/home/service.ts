import axios from "axios";
// const API_KEY = "AIzaSyCK7pxRUj7--NN8XgKdO0vi0B8YZZ1VAEw";
const API_KEY = "AIzaSyDKgz9YsM5dtASkMHIwSagLJD3ixK7qwuw";

export const GetBooks = (search: string) =>
  axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=1&key=${API_KEY}`
  );
export const GetBook = (bookId: string | string[]) =>
  axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${bookId}&key=${API_KEY}`
  );
