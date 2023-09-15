<template name="Home">
  <div :class="$style.container">
    <Navbar
      :handleSearch="handleSearch"
      :result="result"
      :isSearch="true"
      :isback="false"
    />
    <div :class="$style.wrapper">
      <Loader v-if="loading" />
      <!-- <div v-if="loading" :class="$style.loader">Loading...</div> -->
      <Book v-else v-for="book in books" :book="book" :key="book.id" />
      <div v-if="result === 0 && !loading" :class="$style.notFound">
        Not found books
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Navbar, Book, Loader } from "@/components";
import { HomeService, Types } from "@/modules/home";

const books = ref<Types.IEntity.Book[]>([]);
const result = ref(0);
const loading = ref(true);
let search = ref("programming");

const getBooks = async () => {
  try {
    const { data } = await HomeService.GetBooks(search.value);
    books.value = data.items;
    loading.value = false;
    result.value = data.items ? data.items.length : 0;
  } catch (error: any) {
    console.log(error.message);
  }
};

const handleSearch = async (value: string) => {
  search.value = value;
};

onMounted(() => {
  // getBooks();
});

watch(search, () => {
  if (!search.value) {
    search.value = "programming";
    localStorage.setItem("search", JSON.stringify(search.value));
  }

  // getBooks();
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
