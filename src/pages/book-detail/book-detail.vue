<template>
  <div :class="$style.bookDetail">
    <Navbar :handleSearch="handleSearch" :result="result" :isSearch="false" />
    <div :class="$style.goHome" @click="handleHoHome">Go Home</div>
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
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { Navbar, Loader } from "../../components";
import { Mappers } from "../../modules/home";
const router = useRouter();

const props = defineProps({
  book: Object,
});

const bookId = useRoute().params.id;

let book = ref({});
let loading = ref(true);

const getBook = async () => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );
    loading.value = false;
    book.value = Mappers.Book(data);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
const handleHoHome = () => {
  router.push("/");
};
onMounted(() => {
  getBook();
});
</script>
<style scoped module>
@import "./book-detail.module.scss";
</style>
