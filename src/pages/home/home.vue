<template name="Home">
  <div :class="$style.container">
    <Navbar :isSearch="true" :isback="false" />
    <div v-if="store.error">{{ store.error }}</div>
    <div v-else :class="$style.wrapper">
      <Loader v-if="store.loading" />
      <Book v-else v-for="(book, idx) in store.books" :book="book" :key="idx" />
      <div
        v-if="!store.loading && store.books.length < 1"
        :class="$style.notFound"
      >
        <!-- v-if="!store.loading && store.books.length === 0" -->
        Not found books
      </div>
    </div>
    <div :class="$style.pagination" v-if="!store.error && !store.loading">
      <button :disabled="store.pageCount === 1" @click="prevPage">Prev</button>
      <button>{{ store.pageCount }}</button>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Navbar, Book, Loader } from "@/components";
import { useStore } from "@/store";

const store = useStore();

const prevPage = () => {
  store.pageCount--;
  store.getPagination(localStorage.getItem("search")!);
};
const nextPage = () => {
  store.pageCount++;
  store.getPagination(localStorage.getItem("search")!);
};

onMounted(() => {
  store.getPagination(localStorage.getItem("search")!);
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
