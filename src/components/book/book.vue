<template>
  <div :class="$style.book">
    <div :class="$style.imgBox">
      <img :src="book.image" alt="" />
    </div>
    <div :class="$style.contentBox">
      <h3 :class="$style.title">{{ book.title }}</h3>
      <p :class="$style.description">{{ book.description }}</p>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-globe"></i>
          <div>{{ book.language }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-book-open"></i>
          <div>{{ book.pageCount }}</div>
        </div>
      </div>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-user"></i>
          <div :class="$style.author">{{ book.authors[0] }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-calendar"></i>
          <div>{{ book && book.date.slice(0, 4) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { Mappers } from "../../modules/home";

const props = defineProps({
  book: Object,
});

const book = Mappers.Book(props.book);
</script>
<style module scoped>
@import "./book.module.scss";
</style>
