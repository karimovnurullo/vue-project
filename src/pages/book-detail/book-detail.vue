<template>
  <div :class="$style.bookDetail">
    <Navbar :isSearch="false" />
    <div :class="$style.goHome" @click="handleGoHome">Go Home</div>
    <div :class="$style.wrapper">
      <Loader v-if="loading" />
      <template v-else>
        <div :class="$style.imgBox">
          <img :src="book.image" alt="" />
        </div>
        <div :class="$style.contentBox">
          <h2 :class="$style.title">{{ book.title }}</h2>
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
            <div :class="$style.content">
              {{ book.language?.toUpperCase() }}
            </div>
          </div>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Pages:</div>
            <div :class="$style.content">{{ book.pageCount }}</div>
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
      </template>
    </div>
    <h3 :class="$style.similar">Similar books</h3>
    <div :class="$style.books">
      <Book v-for="book in books" :book="book" :key="book.id" :reload="true" />
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Navbar, Loader, Book } from "../../components";
import { Mappers, HomeService } from "../../modules/home";

const props = defineProps({
  book: Object,
});
const bookId = useRoute().params.id;
const router = useRouter();

let book = ref({});
const books = ref([]);
let loading = ref(true);
const search = ref("");

const getBook = async () => {
  try {
    const { data } = await HomeService.GetBook(bookId);
    loading.value = false;
    book.value = Mappers.Book(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getBooks = async () => {
  try {
    search.value = JSON.parse(localStorage.getItem("search")) || "";
    const { data } = await HomeService.GetBooks(search.value);
    const shuffledData = shuffleArray(data.items);
    books.value = shuffledData;
  } catch (error) {
    console.log(error.message);
  }
};

const handleGoHome = () => {
  router.push("/");
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

onMounted(() => {
  getBook();
  getBooks();
  search.value = JSON.parse(localStorage.getItem("search")) || "";
});
</script>
<style scoped module>
@import "./book-detail.module.scss";
</style>
