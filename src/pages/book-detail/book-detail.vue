<template>
  <div :class="$style.bookDetail">
    <Navbar :isSearch="false" :isback="true" :user="user!" />
    <div :class="$style.wrapper">
      <Loader v-if="store.loading" />
      <template v-else>
        <div :class="$style.imgBox">
          <img :src="store.book?.image ? store.book.image : noImage" alt="" />
        </div>
        <div :class="$style.contentBox">
          <h2 :class="$style.title">{{ store.book?.title }}</h2>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Authors:</div>
            <div :class="$style.authors">
              <div
                :class="$style.content"
                v-for="author in store.book?.authors"
              >
                {{ author }},
              </div>
            </div>
          </div>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Publisher:</div>
            <div :class="$style.content">{{ store.book?.publisher }}</div>
          </div>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Published Date:</div>
            <div :class="$style.content">{{ store.book?.publishedDate }}</div>
          </div>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Language:</div>
            <div :class="$style.content">
              {{ store.book?.language?.toUpperCase() }}
            </div>
          </div>
          <div :class="$style.bookInfo">
            <div :class="$style.name">Pages:</div>
            <div :class="$style.content">{{ store.book?.pageCount }}</div>
          </div>
          <div :class="$style.buttons">
            <a
              :href="store.book?.previewLink"
              :class="$style.button"
              target="_blank"
              >Preview PDF</a
            >
            <a
              :href="store.book?.downloadPdf"
              :class="$style.button"
              v-if="store.book?.accessDownloadPdf === true"
              >Download PDF</a
            >
            <div :class="$style.disable" v-else="store.book?.accessDownloadPdf">
              Download PDF
            </div>
          </div>
          <p v-html="store.book?.description" :class="$style.description"></p>
        </div>
      </template>
    </div>
    <h3 :class="$style.similar">Similar books</h3>
    <div v-if="!store.loading && store.notFound">Not found similar books</div>
    <div :class="$style.books" v-else>
      <Book v-for="book in store.similarBooks" :book="book" :key="book.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Navbar, Loader, Book } from "@/components";
import noImage from "@/assets/images/no-image.png";
import { useStore } from "@/store";
import { getSession } from "@/modules/session";

const route = useRoute();
const store = useStore();
const search = ref("");
const user = ref<string | null>(getSession());

watch(
  () => route.params.id,
  () => {
    store.getBook(route.params.id);
    store.getSimilarBook(search.value.split(" ")[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

if (!store.loading) store.getSimilarBook(store.book?.title?.split(" ")[0]);
onMounted(() => {
  window.scrollTo({ top: 0 });
  store.getBook(route.params.id);
});
</script>

<style scoped module>
@import "./book-detail.module.scss";
</style>
