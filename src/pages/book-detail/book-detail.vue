<template>
  <div :class="$style.bookDetail">
    <Navbar :handleSearch="handleSearch" :result="result" />
    <div :class="$style.wrapper">
      <div :class="$style.imgBox">
        <img :src="book.image" alt="" />
      </div>
      <div :class="$style.contentBox">
        <h2 :class="$style.title">{{ book.title }}</h2>
        <!-- <BookInfo :data="book.authors" /> -->
        <div :class="$style.bookInfo">
          <div :class="$style.name">Authors:</div>
          <div :class="$style.authors">
            <div :class="$style.content" v-for="author in book.authors">
              {{ author }},
            </div>
          </div>
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Publisher:</div>
          <div :class="$style.content">{{ book.publisher }}</div>
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Published Date:</div>
          <div :class="$style.content">{{ book.publishedDate }}</div>
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Language:</div>
          <div :class="$style.content">{{ book.language.toUpperCase() }}</div>
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Pages:</div>
          <div :class="$style.content">{{ book.pageCount }}</div>
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Preview PDF:</div>
          <a :href="book.previewLink" target="_blank" :class="$style.href"
            >Link</a
          >
        </div>
        <div :class="$style.bookInfo">
          <div :class="$style.name">Download PDF:</div>
          <a :href="book.downloadPdf" target="_blank" :class="$style.href"
            >Link</a
          >
        </div>
        <div :class="$style.buttons">
          <a :href="book.previewLink" :class="$style.button" target="_blank"
            >Preview PDF</a
          >
          <a
            :href="book.downloadPdf"
            :class="$style.button"
            v-if="book.accessDownloadPdf === true"
            >Download PDF</a
          >
          <div :class="$style.disable" v-else="book.accessDownloadPdf">
            Download PDF
          </div>
        </div>
        <p :class="$style.description">{{ book.description }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { Navbar, BookInfo } from "../../components";
import { Mappers } from "../../modules/home";

const props = defineProps({
  book: Object,
});

// const book = Mappers.Book(props.book);

const book = Mappers.Book({
  kind: "books#volume",
  id: "xIlyOiGOC6EC",
  etag: "SHvPfdQupWc",
  selfLink: "https://www.googleapis.com/books/v1/volumes/xIlyOiGOC6EC",
  volumeInfo: {
    title: "Introduction to Functional Programming Using Haskell",
    authors: ["Richard Bird", "Richard Bird", "Richard Bird"],
    publisher: "Pearson Educación",
    publishedDate: "1998",
    description:
      "After the success of the first edition, Introduction to Functional Programming using Haskell has been thoroughly updated and revised to provide a complete grounding in the principles and techniques of programming with functions. The second edition uses the popular language Haskell to express functional programs. There are new chapters on program optimisation, abstract datatypes in a functional setting, and programming in a monadic style. There are complete new case studies, and many new exercises. As in the first edition, there is an emphasis on the fundamental techniques for reasoning about functional programs, and for deriving them systematically from their specifications. The book is self-contained, assuming no prior knowledge of programming and is suitable as an introductory undergraduate text for first- or second-year students.",
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "8483221764",
      },
      {
        type: "ISBN_13",
        identifier: "9788483221761",
      },
    ],
    readingModes: {
      text: false,
      image: true,
    },
    pageCount: 382,
    printType: "BOOK",
    categories: ["Computer programming"],
    averageRating: 5,
    ratingsCount: 2,
    maturityRating: "NOT_MATURE",
    allowAnonLogging: false,
    contentVersion: "0.6.5.0.preview.1",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=xIlyOiGOC6EC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=xIlyOiGOC6EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    language: "en",
    previewLink:
      "http://books.google.co.uz/books?id=xIlyOiGOC6EC&printsec=frontcover&dq=programming&hl=&cd=2&source=gbs_api",
    infoLink:
      "http://books.google.co.uz/books?id=xIlyOiGOC6EC&dq=programming&hl=&source=gbs_api",
    canonicalVolumeLink:
      "https://books.google.com/books/about/Introduction_to_Functional_Programming_U.html?hl=&id=xIlyOiGOC6EC",
  },
  saleInfo: {
    country: "UZ",
    saleability: "NOT_FOR_SALE",
    isEbook: false,
  },
  accessInfo: {
    country: "UZ",
    viewability: "PARTIAL",
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: "ALLOWED",
    epub: {
      isAvailable: false,
    },
    pdf: {
      isAvailable: true,
      acsTokenLink:
        "http://books.google.co.uz/books/download/Introduction_to_Functional_Programming_U-sample-pdf.acsm?id=xIlyOiGOC6EC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
    },
    webReaderLink:
      "http://play.google.com/books/reader?id=xIlyOiGOC6EC&hl=&source=gbs_api",
    accessViewStatus: "SAMPLE",
    quoteSharingAllowed: false,
  },
  searchInfo: {
    textSnippet:
      "After the success of the first edition, Introduction to Functional Programming using Haskell has been thoroughly updated and revised to provide a complete grounding in the principles and techniques of programming with functions.",
  },
});
</script>
<style scoped module>
@import "./book-detail.module.scss";
</style>
