<template name="Home">
  <div :class="$style.container">
    <Navbar :isSearch="true" :isback="false" />
    <div :class="$style.wrapper">
      <Loader v-if="store.loading" />
      <Book v-else v-for="book in store.books" :book="book" :key="book.id" />
      <div
        v-if="!store.loading && store.books.length === 0"
        :class="$style.notFound"
      >
        Not found books
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Navbar, Book, Loader } from "@/components";
import { useStore } from "@/store";

const store = useStore();

onMounted(() => {
  store.getBooks(localStorage.getItem("search") || "progamming");
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
