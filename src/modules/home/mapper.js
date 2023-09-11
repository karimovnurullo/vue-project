import get from "lodash/get";

import { boolean } from "yup";

export const Book = (item) => ({
  id: get(item, "id") || "",
  title: get(item, "volumeInfo.title") || "",
  description: get(item, "volumeInfo.description") || "",
  pageCount: get(item, "volumeInfo.pageCount") || "",
  date: get(item, "volumeInfo.publishedDate") || "",
  language: get(item, "volumeInfo.language") || "",
  previewLink: get(item, "volumeInfo.previewLink") || "",
  image: get(item, "volumeInfo.imageLinks.thumbnail") || "",
  authors: get(item, "volumeInfo.authors") || [],
  downloadPdf: get(item, "accessInfo.pdf.acsTokenLink") || "",
  accessDownloadPdf: get(item, "accessInfo.pdf.isAvailable") || boolean,
  selfLink: get(item, "selfLink") || boolean,
});
