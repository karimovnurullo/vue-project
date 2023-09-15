<template>
  <div :class="$style.bookDetail">
    <Navbar :isSearch="false" :isback="true" />
    <!-- <div :class="$style.goHome" @click="handleGoHome">Go Home</div> -->
    <div :class="$style.wrapper">
      <Loader v-if="loading" />
      <template v-else>
        <div :class="$style.imgBox">
          <img :src="book.image ? book.image : noImage" alt="" />
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
          <p v-html="book.description" :class="$style.description"></p>
        </div>
      </template>
    </div>
    <h3 :class="$style.similar">Similar books</h3>
    <div :class="$style.books">
      <Book v-for="book in books" :book="book" :key="book.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted, watch, type PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Navbar, Loader, Book } from "@/components";
import { Mappers, HomeService, Types } from "@/modules/home";
import noImage from "@/assets/images/no-image.png";

const props = defineProps({
  book: { type: Object as PropType<Types.IEntity.Book> },
});
const route = useRoute();
const router = useRouter();

let book = ref<Types.IEntity.Book>({} as Types.IEntity.Book);
const books = ref<Types.IEntity.Book[]>([]);
let loading = ref(true);
const search = ref("");

const getBook = async () => {
  try {
    const { data } = await HomeService.GetBook(route.params.id);
    loading.value = false;
    book.value = Mappers.Book(data.items[0]);
    search.value = book.value.title;
    getSimilarBooks();
  } catch (error: any) {
    console.log(error.message);
  }
};

const getSimilarBooks = async () => {
  try {
    const { data } = await HomeService.GetSimilarBooks(
      search.value.split(" ")[0]
    );
    books.value = data.items as Types.IEntity.Book[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const handleGoHome = () => {
  router.push("/");
};

watch(
  () => route.params.id,
  () => {
    // getBook();
    // getSimilarBooks();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);
onMounted(() => {
  // getBook();
  search.value = JSON.parse(localStorage.getItem("search")!) || "";
});
</script>

<style scoped module>
@import "./book-detail.module.scss";
</style>
