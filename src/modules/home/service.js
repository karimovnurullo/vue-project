import axios from "axios";
const API_KEY = "AIzaSyCK7pxRUj7--NN8XgKdO0vi0B8YZZ1VAEw";

export const GetBooks = (search) =>
  axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=1&key=${API_KEY}`
  );
export const GetBook = (bookId) =>
  axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
