<template name="Home">
  <div :class="$style.container">
    <Navbar
      :isSearch="true"
      :isback="false"
      :handleSearch="handleSearch"
      :favorites="store.favorites"
      :user="user!"
    />
    <!-- <div v-if="store.notFound">Not found books</div> -->
    <div v-if="!store.loading && store.notFound" :class="$style.notFound">
      Not found books
    </div>
    <div v-else :class="$style.wrapper">
      <Loader v-if="store.loading" />
      <Book v-else v-for="(book, idx) in store.books" :book="book" :key="idx" />
    </div>
    <div :class="$style.pagination" v-if="!store.loading && !store.notFound">
      <button :disabled="store.pageCount === 1" @click="prevPage">Prev</button>
      <button>{{ store.pageCount }}</button>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Navbar, Book, Loader } from "@/components";
import { useStore } from "@/store";
import { getSession } from "@/modules/session";

const store = useStore();
const user = ref<string | null>(getSession());

const prevPage = () => {
  store.pageCount--;
  store.getBook(localStorage.getItem("search")!);
};
const nextPage = () => {
  store.pageCount++;
  store.getBooks(localStorage.getItem("search")!);
};
const handleSearch = async (searchValue: string) => {
  const value = searchValue.trim();
  if (value === "") {
    searchValue = "";
  }
  store.getBooks(value);
  store.pageCount = 1;
  localStorage.setItem("search", value);
};

onMounted(() => {
  store.getBooks(localStorage.getItem("search")!);
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
