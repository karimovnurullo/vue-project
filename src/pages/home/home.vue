<template name="Home">
  <div :class="$style.container">
    <Navbar :handleSearch="handleSearch" :result="result" :isSearch="true" />
    <div :class="$style.wrapper">
      <Book v-for="book in books" :book="book" :key="book.id" />
      <div v-if="result === 0" :class="$style.notFound">Not found books</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { Navbar, Book } from "../../components";
const API_KEY = ref("AIzaSyCK7pxRUj7--NN8XgKdO0vi0B8YZZ1VAEw");
const books = ref([]);
const result = ref(0);
const search = ref("programming");

const getBooks = async () => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.value}&maxResults=40&startIndex=1&key=${API_KEY.value}`
    );
    books.value = data.items;
    result.value = data.items ? data.items.length : 0;
  } catch (error) {
    console.log(error.message);
  }
};

const handleSearch = async (value) => {
  search.value = value;
};

onMounted(() => {
  getBooks();
});
watch(search, () => {
  getBooks();
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
