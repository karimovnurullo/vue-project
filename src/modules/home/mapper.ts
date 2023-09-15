import get from "lodash/get";
import type { Types } from ".";

export const Book = (item: any) => ({
  id: get(item, "id") || "",
  title: get(item, "volumeInfo.title") || "No title",
  description: get(item, "volumeInfo.description") || "No description",
  pageCount: get(item, "volumeInfo.pageCount") || "No pages",
  publishedDate: get(item, "volumeInfo.publishedDate") || "",
  publisher: get(item, "volumeInfo.publisher") || "No publisher",
  language: get(item, "volumeInfo.language") || "No language",
  previewLink: get(item, "volumeInfo.previewLink") || "",
  image: get(item, "volumeInfo.imageLinks.thumbnail") || "",
  authors: get(item, "volumeInfo.authors") || ["No authors"],
  downloadPdf: get(item, "accessInfo.pdf.acsTokenLink") || "",
  accessDownloadPdf: get(item, "accessInfo.pdf.isAvailable") || Boolean,
  selfLink: get(item, "selfLink") || Boolean,
});
