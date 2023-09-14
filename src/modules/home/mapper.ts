import get from "lodash/get";
import type { Types } from ".";

export const Book = (item: Types.IEntity.Book) => ({
  id: get(item, "id") || "",
  title: get(item, "volumeInfo.title") || "",
  description: get(item, "volumeInfo.description") || "",
  pageCount: get(item, "volumeInfo.pageCount") || "",
  publishedDate: get(item, "volumeInfo.publishedDate") || "",
  publisher: get(item, "volumeInfo.publisher") || "",
  language: get(item, "volumeInfo.language") || "",
  previewLink: get(item, "volumeInfo.previewLink") || "",
  image: get(item, "volumeInfo.imageLinks.thumbnail") || "",
  authors: get(item, "volumeInfo.authors") || [],
  downloadPdf: get(item, "accessInfo.pdf.acsTokenLink") || "",
  accessDownloadPdf: get(item, "accessInfo.pdf.isAvailable") || Boolean,
  selfLink: get(item, "selfLink") || Boolean,
});
