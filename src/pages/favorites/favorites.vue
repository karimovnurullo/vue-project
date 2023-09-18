<template name="Home">
  <div :class="$style.container">
    <Navbar :isSearch="false" :isback="true" />
    <div v-if="store.error">{{ store.error }}</div>
    <div v-else :class="$style.wrapper">
      <Book v-for="(book, idx) in store.favorites" :book="book" :key="idx" />
      <div v-if="store.favorites.length < 1" :class="$style.notFound">
        Not found favorite books
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
  // store.getPagination("progamming");
  // store.getBooks(localStorage.getItem("search") || "progamming");
});
</script>

<style scoped module>
@import "./favorites.module.scss";
</style>
