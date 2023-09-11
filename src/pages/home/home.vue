<template name="Home">
  <!-- <div :class="$style.container">
    <Navbar />
    <div :class="$style.todo">
      <form
        :class="$style.nav"
        @submit.prevent="edit ? handleEditForm() : handleSubmit()"
      >
        <input v-model="text" type="text" placeholder="Todo" />
        <button v-text="edit ? 'Edit' : 'Add'"></button>
      </form>
      <main>
        <TodoItem
          v-for="todo in list"
          :key="todo.id"
          :todo="todo"
          :handleDelete="handleDelete"
          :handleEdit="handleEdit"
        />
      </main>
    </div>
  </div> -->
  <div :class="$style.container">
    <Navbar />
    <div :class="$style.wrapper">
      <Book v-for="book in books" :book="book" :key="book.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Navbar, Book } from "../../components";
const books = ref([]);
const search = ref("programming");
const startIndex = ref(1);

const getBooks = async () => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.value}}&maxResults=40&startIndex=1`
    );
    books.value = data.items;
    console.log("Salom");
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(() => {
  getBooks();
});
</script>

<style scoped module>
@import "./home.module.scss";
</style>
